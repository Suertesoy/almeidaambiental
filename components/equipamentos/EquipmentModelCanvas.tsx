"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type { Equipment3DConfig } from "../../lib/equipamentos-3d";
import {
  collectExtremePoints,
  computeFitFraming,
  createStudioEnvironment,
  disposeObjectTree,
  positionStudioLights,
} from "../../lib/three-studio";

/* ---- Enquadramento (catálogo) ----
   Fração da meia-largura/meia-altura do palco que o equipamento pode ocupar
   NO PIOR ângulo da varredura de 360° (ver computeFitFraming). No ângulo
   típico ele ocupa um pouco menos — por isso o valor é alto. Mobile usa
   menos: palco pequeno e rolagem por toque pedem mais respiro. */
const FIT_FILL_DESKTOP = 0.96;
const FIT_FILL_MOBILE = 0.88;
const MOBILE_STAGE_MAX_WIDTH = 640;
/* Faixa de elevação permitida (arraste, hover e teclado) em relação à
   elevação inicial do modelo. O enquadramento é calculado para ela inteira,
   então nenhuma inclinação permitida corta o equipamento. */
const ELEVATION_BELOW_DEG = 14;
const ELEVATION_ABOVE_DEG = 20;

/* ---- Hover: o cursor empurra o modelo ----
   Cada pixel de movimento do mouse (sem botão) acrescenta rotação PENDENTE;
   a cada frame uma fração dela é aplicada (amortecimento exponencial, TAU).
   Isso dá inércia (continua um instante após o cursor parar e desacelera
   sozinho) e é relativo, então ao entrar, sair ou voltar de um arraste não há
   salto de orientação. */
const HOVER_DEG_PER_PX_AZ = 0.26;
const HOVER_DEG_PER_PX_EL = 0.1;
const HOVER_MAX_PENDING_AZ = 75;
const HOVER_MAX_PENDING_EL = 14;
const HOVER_TAU_MS = 220;
const HOVER_RESUME_DELAY_MS = 280;

export type EquipmentModelCanvasProps = {
  config: Equipment3DConfig;
  autoRotate?: boolean;
  interactive?: boolean;
  paused?: boolean;
  resetSignal: number;
  keyboardCommand?: { seq: number; dAz: number; dEl: number } | null;
  onReady: () => void;
  onError: () => void;
  onUserInteract: () => void;
  className?: string;
};

export default function EquipmentModelCanvas({
  config,
  autoRotate = false,
  interactive = true,
  paused = false,
  resetSignal,
  keyboardCommand,
  onReady,
  onError,
  onUserInteract,
  className,
}: EquipmentModelCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const initialPoseRef = useRef<{ position: THREE.Vector3; target: THREE.Vector3 } | null>(null);
  const resetAnimRef = useRef<{ active: boolean }>({ active: false });
  const userInteractedRef = useRef(false);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  const callbacksRef = useRef({ onReady, onError, onUserInteract });
  callbacksRef.current = { onReady, onError, onUserInteract };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let rafId = 0;
    let isVisible = true;
    let boxSize: THREE.Vector3 | null = null;
    let fitPoints: THREE.Vector3[] | undefined;
    const elevationBelow = config.camera.elevationRangeDeg?.below ?? ELEVATION_BELOW_DEG;
    const elevationAbove = config.camera.elevationRangeDeg?.above ?? ELEVATION_ABOVE_DEG;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      callbacksRef.current.onError();
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.touchAction = interactive ? "pan-y" : "auto";
    if (!interactive) {
      renderer.domElement.style.pointerEvents = "none";
    }

    container.appendChild(renderer.domElement);

    const width = Math.max(container.clientWidth, 1);
    const height = Math.max(container.clientHeight, 1);
    renderer.setSize(width, height, false);

    const scene = new THREE.Scene();
    const envTexture = createStudioEnvironment(renderer);
    scene.environment = envTexture;
    scene.environmentIntensity = config.environmentIntensity;

    const camera = new THREE.PerspectiveCamera(config.camera.fov, width / height, 0.05, 120);
    cameraRef.current = camera;

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.35);
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.45);
    scene.add(keyLight, keyLight.target, rimLight, rimLight.target);

    let needsRender = true;
    const frameFor = (size: THREE.Vector3) => {
      const w = Math.max(container.clientWidth, 1);
      const h = Math.max(container.clientHeight, 1);
      const base = config.camera.elevationDeg;
      const isNarrow = w < MOBILE_STAGE_MAX_WIDTH;
      const mobile = isNarrow ? config.camera.mobile : undefined;
      const cameraConfig = mobile ? { ...config.camera, azimuthDeg: mobile.azimuthDeg } : config.camera;
      return computeFitFraming(size, w / h, cameraConfig, {
        fill: mobile?.fill ?? (isNarrow ? FIT_FILL_MOBILE : FIT_FILL_DESKTOP),
        elevationsDeg: [
          Math.max(2, base - elevationBelow),
          base,
          Math.min(60, base + elevationAbove),
        ],
        fitPoints,
      });
    };

    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enabled = interactive;
    // OrbitControls força `touch-action: none` no canvas, o que prende a rolagem
    // vertical da página sob o dedo. `pan-y` devolve a rolagem e mantém o
    // arraste horizontal para girar.
    if (interactive) renderer.domElement.style.touchAction = "pan-y";
    controls.enableDamping = true;
    controls.dampingFactor = 0.065;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.rotateSpeed = 0.72;
    const baseElevation = config.camera.elevationDeg;
    const elevationLow = Math.max(2, baseElevation - elevationBelow);
    const elevationHigh = Math.min(60, baseElevation + elevationAbove);
    controls.minPolarAngle = THREE.MathUtils.degToRad(90 - elevationHigh);
    controls.maxPolarAngle = THREE.MathUtils.degToRad(90 - elevationLow);
    controls.autoRotate = Boolean(autoRotate && !prefersReducedMotion && !userInteractedRef.current);
    controls.autoRotateSpeed = 0.55;

    // Hover: só mouse real (hover + ponteiro fino), nunca toque, e nunca com
    // movimento reduzido. O arraste (OrbitControls) tem prioridade absoluta: o
    // hover é suspenso durante ele e por um instante depois (inércia do
    // próprio OrbitControls), e nunca soma força ao mesmo tempo.
    const hoverEnabled =
      interactive &&
      !prefersReducedMotion &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const hover = {
      pendingAz: 0,
      pendingEl: 0,
      lastX: 0,
      lastY: 0,
      tracking: false,
      dragging: false,
      resumeAt: 0,
      travelled: 0,
    };
    const canvasEl = renderer.domElement;
    const onHoverMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || hover.dragging || resetAnimRef.current.active) {
        hover.tracking = false;
        return;
      }
      if (hover.tracking) {
        const dx = event.clientX - hover.lastX;
        const dy = event.clientY - hover.lastY;
        hover.pendingAz = THREE.MathUtils.clamp(
          hover.pendingAz + dx * HOVER_DEG_PER_PX_AZ,
          -HOVER_MAX_PENDING_AZ,
          HOVER_MAX_PENDING_AZ
        );
        hover.pendingEl = THREE.MathUtils.clamp(
          hover.pendingEl + dy * HOVER_DEG_PER_PX_EL,
          -HOVER_MAX_PENDING_EL,
          HOVER_MAX_PENDING_EL
        );
        hover.travelled += Math.abs(dx) + Math.abs(dy);
        // A rotação automática lenta cede ao cursor (um único sistema por vez).
        if (hover.travelled > 4 && !userInteractedRef.current) {
          userInteractedRef.current = true;
          controls.autoRotate = false;
          callbacksRef.current.onUserInteract();
        }
      }
      hover.lastX = event.clientX;
      hover.lastY = event.clientY;
      hover.tracking = true;
    };
    const onHoverLeave = () => {
      hover.tracking = false;
    };
    if (hoverEnabled) {
      canvasEl.addEventListener("pointermove", onHoverMove);
      canvasEl.addEventListener("pointerleave", onHoverLeave);
    }
    const handleControlEnd = () => {
      hover.dragging = false;
      hover.tracking = false;
      hover.resumeAt = performance.now() + HOVER_RESUME_DELAY_MS;
    };
    controls.addEventListener("end", handleControlEnd);
    const handleControlChange = () => {
      needsRender = true;
    };
    controls.addEventListener("change", handleControlChange);

    const handleControlStart = () => {
      hover.dragging = true;
      hover.pendingAz = 0;
      hover.pendingEl = 0;
      hover.tracking = false;
      resetAnimRef.current.active = false;
      if (!userInteractedRef.current) {
        userInteractedRef.current = true;
        controls.autoRotate = false;
        callbacksRef.current.onUserInteract();
      }
    };
    controls.addEventListener("start", handleControlStart);

    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    const loader = new GLTFLoader();
    loader.load(
      config.glbUrl,
      (gltf) => {
        if (disposed) {
          disposeObjectTree(gltf.scene);
          return;
        }

        const root = gltf.scene;
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        boxSize = size;

        const pivot = config.camera.pivot ?? { x: 0, z: 0 };
        root.position.set(-center.x - pivot.x, -box.min.y, -center.z - pivot.z);
        modelGroup.add(root);
        if (config.camera.fitToGeometry) fitPoints = collectExtremePoints(root);

        const framing = frameFor(size);
        if (config.camera.fitToGeometry) {
          // Modelo grande = câmera distante: aproxima o plano near para manter a
          // precisão de profundidade (evita cintilação em chapas sobrepostas).
          camera.near = Math.max(camera.near, framing.distance * 0.04);
          camera.updateProjectionMatrix();
        }
        camera.position.copy(framing.position);
        controls.target.copy(framing.target);
        controls.minDistance = framing.distance * 0.7;
        controls.maxDistance = framing.distance * 1.4;
        controls.update();
        needsRender = true;

        initialPoseRef.current = {
          position: framing.position.clone(),
          target: framing.target.clone(),
        };
        positionStudioLights(camera, controls.target, keyLight, rimLight);

        const texLoader = new THREE.TextureLoader();
        texLoader.load(
          config.contactShadowUrl,
          (shadowTex) => {
            if (disposed) {
              shadowTex.dispose();
              return;
            }
            shadowTex.colorSpace = THREE.SRGBColorSpace;
            const shadowGeo = new THREE.PlaneGeometry(
              config.contactShadowSize.width,
              config.contactShadowSize.depth
            );
            const shadowMat = new THREE.MeshBasicMaterial({
              map: shadowTex,
              transparent: true,
              depthWrite: false,
              toneMapped: false,
              opacity: 0.92,
            });
            const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
            shadowMesh.rotation.x = -Math.PI / 2;
            shadowMesh.position.set(-pivot.x, 0.001, -pivot.z);
            shadowMesh.renderOrder = -1;
            modelGroup.add(shadowMesh);
            needsRender = true;
          },
          undefined,
          () => {
            // Sombra de contato opcional
          }
        );

        renderer.render(scene, camera);
        callbacksRef.current.onReady();
      },
      undefined,
      () => {
        if (!disposed) callbacksRef.current.onError();
      }
    );

    const resizeObserver = new ResizeObserver(() => {
      if (disposed) return;
      const w = Math.max(container.clientWidth, 1);
      const h = Math.max(container.clientHeight, 1);
      const nextAspect = w / h;
      camera.aspect = nextAspect;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      needsRender = true;

      if (boxSize) {
        const framing = frameFor(boxSize);
        initialPoseRef.current = {
          position: framing.position.clone(),
          target: framing.target.clone(),
        };
        if (!userInteractedRef.current) {
          camera.position.copy(framing.position);
          controls.target.copy(framing.target);
          controls.update();
        }
      }
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
        if (isVisible) {
          lastFrameTime = performance.now();
          needsRender = true;
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    let lastFrameTime = performance.now();
    const animate = (now: number) => {
      if (disposed) return;
      rafId = window.requestAnimationFrame(animate);

      const dt = Math.min(now - lastFrameTime, 64);
      lastFrameTime = now;
      if (!isVisible || pausedRef.current) return;

      // Hover: aplica uma fração da rotação pendente, no MESMO passo em que
      // o OrbitControls atualiza a câmera (nunca dois laços concorrentes).
      if (
        hoverEnabled &&
        !hover.dragging &&
        now >= hover.resumeAt &&
        (Math.abs(hover.pendingAz) > 0.01 || Math.abs(hover.pendingEl) > 0.01)
      ) {
        const k = 1 - Math.exp(-dt / HOVER_TAU_MS);
        const stepAz = hover.pendingAz * k;
        const stepEl = hover.pendingEl * k;
        hover.pendingAz -= stepAz;
        hover.pendingEl -= stepEl;
        const offset = camera.position.clone().sub(controls.target);
        const spherical = new THREE.Spherical().setFromVector3(offset);
        spherical.theta -= THREE.MathUtils.degToRad(stepAz);
        const nextPhi = spherical.phi - THREE.MathUtils.degToRad(stepEl);
        const clampedPhi = THREE.MathUtils.clamp(nextPhi, controls.minPolarAngle, controls.maxPolarAngle);
        if (clampedPhi !== nextPhi) hover.pendingEl = 0;
        spherical.phi = clampedPhi;
        offset.setFromSpherical(spherical);
        camera.position.copy(controls.target).add(offset);
      }

      if (resetAnimRef.current.active && initialPoseRef.current) {
        camera.position.lerp(initialPoseRef.current.position, 0.14);
        controls.target.lerp(initialPoseRef.current.target, 0.14);
        if (
          camera.position.distanceTo(initialPoseRef.current.position) < 0.01 &&
          controls.target.distanceTo(initialPoseRef.current.target) < 0.01
        ) {
          camera.position.copy(initialPoseRef.current.position);
          controls.target.copy(initialPoseRef.current.target);
          resetAnimRef.current.active = false;
        }
      }

      controls.update();
      // Só redesenha quando algo mudou (câmera, resize, volta à viewport):
      // sem movimento, o laço fica ocioso e não consome GPU.
      if (!needsRender) return;
      needsRender = false;
      positionStudioLights(camera, controls.target, keyLight, rimLight);
      renderer.render(scene, camera);
    };
    rafId = window.requestAnimationFrame(animate);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      controls.removeEventListener("start", handleControlStart);
      controls.removeEventListener("end", handleControlEnd);
      controls.removeEventListener("change", handleControlChange);
      canvasEl.removeEventListener("pointermove", onHoverMove);
      canvasEl.removeEventListener("pointerleave", onHoverLeave);
      controls.dispose();
      disposeObjectTree(modelGroup);
      scene.environment = null;
      envTexture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      controlsRef.current = null;
      cameraRef.current = null;
      initialPoseRef.current = null;
    };
  }, [config, autoRotate, interactive]);

  useEffect(() => {
    if (resetSignal === 0) return;
    const initial = initialPoseRef.current;
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!initial || !camera || !controls) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      camera.position.copy(initial.position);
      controls.target.copy(initial.target);
      controls.update();
    } else {
      resetAnimRef.current.active = true;
    }
  }, [resetSignal]);

  useEffect(() => {
    if (!keyboardCommand) return;
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    resetAnimRef.current.active = false;
    if (!userInteractedRef.current) {
      userInteractedRef.current = true;
      controls.autoRotate = false;
      callbacksRef.current.onUserInteract();
    }

    const offset = camera.position.clone().sub(controls.target);
    const spherical = new THREE.Spherical().setFromVector3(offset);
    spherical.theta += keyboardCommand.dAz;
    spherical.phi = THREE.MathUtils.clamp(
      spherical.phi + keyboardCommand.dEl,
      controls.minPolarAngle,
      controls.maxPolarAngle
    );
    offset.setFromSpherical(spherical);
    camera.position.copy(controls.target).add(offset);
    controls.update();
  }, [keyboardCommand]);

  return <div ref={containerRef} className={className} />;
}
