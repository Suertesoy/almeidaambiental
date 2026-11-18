"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type { Equipment3DConfig } from "../../lib/equipamentos-3d";

export type EquipmentModelCanvasProps = {
  config: Equipment3DConfig;
  autoRotate?: boolean;
  paused?: boolean;
  resetSignal: number;
  keyboardCommand?: { seq: number; dAz: number; dEl: number } | null;
  onReady: () => void;
  onError: () => void;
  onUserInteract: () => void;
  className?: string;
};

/**
 * Cria o ambiente de estúdio calibrado a partir de
 * assets-3d-almeida/_pipeline/visualizador/estudio.js:
 * sala neutra + softbox no teto + faixas laterais + rebatedor frontal.
 */
function createStudioEnvironment(renderer: THREE.WebGLRenderer): THREE.Texture {
  const envScene = new THREE.Scene();
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];

  const roomGeo = new THREE.BoxGeometry(14, 8, 14);
  const roomMat = new THREE.MeshBasicMaterial({ color: 0xb4b7bc, side: THREE.BackSide });
  geometries.push(roomGeo);
  materials.push(roomMat);
  const room = new THREE.Mesh(roomGeo, roomMat);
  room.position.y = 3;
  envScene.add(room);

  const floorGeo = new THREE.PlaneGeometry(14, 14);
  const floorMat = new THREE.MeshBasicMaterial({ color: 0x9c9fa3 });
  geometries.push(floorGeo);
  materials.push(floorMat);
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.98;
  envScene.add(floor);

  const addPanel = (
    w: number,
    h: number,
    intensity: number,
    pos: [number, number, number],
    target: [number, number, number]
  ) => {
    const geo = new THREE.PlaneGeometry(w, h);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(1, 1, 1).multiplyScalar(intensity),
      side: THREE.DoubleSide,
    });
    geometries.push(geo);
    materials.push(mat);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...pos);
    mesh.lookAt(...target);
    envScene.add(mesh);
  };

  addPanel(6, 4, 5.5, [0, 6.8, 0.5], [0, 0, 0]);
  addPanel(1.2, 5, 4.0, [-6.5, 2.5, 2.5], [0, 1, 0]);
  addPanel(1.2, 5, 2.4, [6.5, 2.5, -1.5], [0, 1, 0]);
  addPanel(7, 2.5, 2.6, [0, 1.6, 6.8], [0, 1, 0]);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTexture = pmrem.fromScene(envScene, 0.02).texture;
  pmrem.dispose();

  for (const geo of geometries) geo.dispose();
  for (const mat of materials) mat.dispose();

  return envTexture;
}

/**
 * Calcula a posição e o alvo iniciais da câmera a partir do bounding box
 * real do equipamento e do aspect ratio atual do container.
 */
function computeFraming(
  boxSize: THREE.Vector3,
  aspect: number,
  config: Equipment3DConfig["camera"]
) {
  const azRad = THREE.MathUtils.degToRad(config.azimuthDeg);
  const elRad = THREE.MathUtils.degToRad(config.elevationDeg);
  const fovRad = THREE.MathUtils.degToRad(config.fov);

  const dir = new THREE.Vector3(
    Math.sin(azRad) * Math.cos(elRad),
    Math.sin(elRad),
    Math.cos(azRad) * Math.cos(elRad)
  ).normalize();

  const worldUp = new THREE.Vector3(0, 1, 0);
  const right = new THREE.Vector3().crossVectors(worldUp, dir).normalize();
  const up = new THREE.Vector3().crossVectors(dir, right).normalize();

  const hx = boxSize.x / 2;
  const hy = boxSize.y / 2;
  const hz = boxSize.z / 2;

  let maxHalfW = 0;
  let maxHalfH = 0;
  let maxHalfD = 0;

  for (const sx of [-1, 1]) {
    for (const sy of [-1, 1]) {
      for (const sz of [-1, 1]) {
        const corner = new THREE.Vector3(sx * hx, sy * hy, sz * hz);
        maxHalfW = Math.max(maxHalfW, Math.abs(corner.dot(right)));
        maxHalfH = Math.max(maxHalfH, Math.abs(corner.dot(up)));
        maxHalfD = Math.max(maxHalfD, Math.abs(corner.dot(dir)));
      }
    }
  }

  const tanHalfFov = Math.tan(fovRad / 2);
  const safeAspect = Math.max(aspect, 0.55);
  const distV = maxHalfH / tanHalfFov;
  const distH = maxHalfW / (tanHalfFov * safeAspect);
  const distance = Math.max(distV, distH) * config.padding + maxHalfD * 0.35;

  const target = new THREE.Vector3(0, boxSize.y * (0.5 + (config.targetYOffsetRatio ?? 0)), 0);
  const position = target.clone().addScaledVector(dir, distance);

  return { position, target, distance };
}

function disposeObjectTree(root: THREE.Object3D) {
  root.traverse((obj) => {
    if (obj instanceof THREE.Mesh) {
      obj.geometry?.dispose();
      const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
      for (const mat of materials) {
        if (!mat) continue;
        for (const value of Object.values(mat)) {
          if (value instanceof THREE.Texture) {
            value.dispose();
          }
        }
        mat.dispose();
      }
    }
  });
}

export default function EquipmentModelCanvas({
  config,
  autoRotate = false,
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
    renderer.domElement.style.touchAction = "pan-y";

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

    const positionStudioLights = () => {
      const target = controls.target;
      const toCam = camera.position.clone().sub(target);
      if (toCam.lengthSq() < 1e-6) return;
      toCam.normalize();
      const side = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), toCam).normalize();
      keyLight.position
        .copy(target)
        .addScaledVector(toCam, 3.5)
        .addScaledVector(side, -2.2)
        .add(new THREE.Vector3(0, 6, 0));
      keyLight.target.position.copy(target);
      rimLight.position
        .copy(target)
        .addScaledVector(toCam, -4)
        .addScaledVector(side, 2.5)
        .add(new THREE.Vector3(0, 3, 0));
      rimLight.target.position.copy(target);
    };

    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.065;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.rotateSpeed = 0.72;
    controls.minPolarAngle = Math.PI * 0.12;
    controls.maxPolarAngle = Math.PI * 0.485;
    controls.autoRotate = Boolean(autoRotate && !prefersReducedMotion && !userInteractedRef.current);
    controls.autoRotateSpeed = 0.55;

    const handleControlStart = () => {
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

        root.position.set(-center.x, -box.min.y, -center.z);
        modelGroup.add(root);

        const currentAspect =
          Math.max(container.clientWidth, 1) / Math.max(container.clientHeight, 1);
        const framing = computeFraming(size, currentAspect, config.camera);
        camera.position.copy(framing.position);
        controls.target.copy(framing.target);
        controls.minDistance = framing.distance * 0.7;
        controls.maxDistance = framing.distance * 1.4;
        controls.update();

        initialPoseRef.current = {
          position: framing.position.clone(),
          target: framing.target.clone(),
        };
        positionStudioLights();

        // Carrega sombra de contato assada sem bloquear a apresentação do modelo
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
            shadowMesh.position.y = 0.001;
            shadowMesh.renderOrder = -1;
            modelGroup.add(shadowMesh);
          },
          undefined,
          () => {
            // Sombra de contato é opcional; se falhar, o modelo continua íntegro
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

      if (boxSize) {
        const framing = computeFraming(boxSize, nextAspect, config.camera);
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
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    const animate = () => {
      if (disposed) return;
      rafId = window.requestAnimationFrame(animate);

      if (!isVisible || pausedRef.current) return;

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
      positionStudioLights();
      renderer.render(scene, camera);
    };
    rafId = window.requestAnimationFrame(animate);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      controls.removeEventListener("start", handleControlStart);
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
  }, [config, autoRotate]);

  // Resetar para vista inicial
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

  // Rotação acessível por teclado
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
