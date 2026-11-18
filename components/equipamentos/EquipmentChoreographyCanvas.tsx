"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { Equipment3DConfig } from "../../lib/equipamentos-3d";
import {
  computeFraming,
  createStudioEnvironment,
  disposeObjectTree,
  positionStudioLights,
} from "../../lib/three-studio";

export type EquipmentChoreographyCanvasProps = {
  configs: Equipment3DConfig[];
  /** Multiplicador de enquadramento para ajustar dimensão entre Home e Hero. */
  paddingMultiplier?: number;
  onReady: () => void;
  onError: () => void;
  onActiveChange: (index: number) => void;
  className?: string;
};

type PreparedModel = {
  index: number;
  config: Equipment3DConfig;
  group: THREE.Group;
  boxSize: THREE.Vector3;
  rxz: number;
};

const HOLD_MS = 3200;
const TRANSITION_MS = 1000;
const CYCLE_MS = HOLD_MS + TRANSITION_MS;
const ROTATION_SWEEP_RAD = THREE.MathUtils.degToRad(26);

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

async function loadPreparedModel(
  loader: GLTFLoader,
  texLoader: THREE.TextureLoader,
  config: Equipment3DConfig,
  index: number
): Promise<PreparedModel> {
  const gltf = await loader.loadAsync(config.glbUrl);
  const root = gltf.scene;
  const box = new THREE.Box3().setFromObject(root);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());

  root.position.set(-center.x, -box.min.y, -center.z);

  const group = new THREE.Group();
  group.add(root);

  try {
    const shadowTex = await texLoader.loadAsync(config.contactShadowUrl);
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
      opacity: 0.88,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.001;
    shadowMesh.renderOrder = -1;
    group.add(shadowMesh);
  } catch {
    // Sombra de contato é opcional
  }

  return {
    index,
    config,
    group,
    boxSize: size,
    rxz: Math.hypot(size.x / 2, size.z / 2),
  };
}

export default function EquipmentChoreographyCanvas({
  configs,
  paddingMultiplier = 1.0,
  onReady,
  onError,
  onActiveChange,
  className,
}: EquipmentChoreographyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const callbacksRef = useRef({ onReady, onError, onActiveChange });
  callbacksRef.current = { onReady, onError, onActiveChange };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || configs.length === 0) return;

    let disposed = false;
    let rafId = 0;
    let isVisible = true;
    let readySignaled = false;

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

    container.appendChild(renderer.domElement);

    const width = Math.max(container.clientWidth, 1);
    const height = Math.max(container.clientHeight, 1);
    renderer.setSize(width, height, false);

    const scene = new THREE.Scene();
    const envTexture = createStudioEnvironment(renderer);
    scene.environment = envTexture;

    const camera = new THREE.PerspectiveCamera(configs[0].camera.fov, width / height, 0.05, 120);
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.35);
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.45);
    scene.add(keyLight, keyLight.target, rimLight, rimLight.target);

    const loader = new GLTFLoader();
    const texLoader = new THREE.TextureLoader();

    let active: PreparedModel | null = null;
    let next: PreparedModel | null = null;
    let nextLoadingIndex: number | null = null;
    let nextPeekProgress = 1;
    let cycleElapsedMs = 0;
    let lastFrameTime = performance.now();

    const getFramingFor = (model: PreparedModel) => {
      const w = Math.max(container.clientWidth, 1);
      const h = Math.max(container.clientHeight, 1);
      const aspect = w / h;
      const framing = computeFraming(
        model.boxSize,
        aspect,
        model.config.camera,
        paddingMultiplier
      );
      const fovRad = THREE.MathUtils.degToRad(model.config.camera.fov);
      const visibleHalfW = framing.distance * Math.tan(fovRad / 2) * aspect;
      // Posiciona o próximo modelo parcialmente visível na borda direita, sem invadir o centro
      const lateralOffset = Math.max(visibleHalfW * 0.96 + model.rxz * 0.34, model.rxz * 1.85);
      return { ...framing, aspect, lateralOffset };
    };

    const applyCameraPose = (
      fov: number,
      aspect: number,
      position: THREE.Vector3,
      target: THREE.Vector3,
      envIntensity: number
    ) => {
      camera.fov = fov;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      camera.position.copy(position);
      camera.lookAt(target);
      scene.environmentIntensity = envIntensity;
      positionStudioLights(camera, target, keyLight, rimLight);
    };

    const ensureNextLoaded = (currentIndex: number) => {
      if (configs.length < 2) return;
      const targetIndex = (currentIndex + 1) % configs.length;
      if (nextLoadingIndex === targetIndex || next?.index === targetIndex) return;
      nextLoadingIndex = targetIndex;

      loadPreparedModel(loader, texLoader, configs[targetIndex], targetIndex)
        .then((prepared) => {
          if (disposed) {
            disposeObjectTree(prepared.group);
            return;
          }
          if (next) {
            scene.remove(next.group);
            disposeObjectTree(next.group);
          }
          next = prepared;
          nextPeekProgress = 0;
          if (active) {
            const framing = getFramingFor(active);
            prepared.group.position.x = framing.lateralOffset * 1.4;
          }
          scene.add(prepared.group);
        })
        .catch(() => {
          nextLoadingIndex = null;
        });
    };

    loadPreparedModel(loader, texLoader, configs[0], 0)
      .then((first) => {
        if (disposed) {
          disposeObjectTree(first.group);
          return;
        }
        active = first;
        scene.add(first.group);

        const framing = getFramingFor(first);
        applyCameraPose(
          first.config.camera.fov,
          framing.aspect,
          framing.position,
          framing.target,
          first.config.environmentIntensity
        );

        callbacksRef.current.onActiveChange(0);
        renderer.render(scene, camera);

        if (!readySignaled) {
          readySignaled = true;
          callbacksRef.current.onReady();
        }
        ensureNextLoaded(0);
      })
      .catch(() => {
        if (!disposed) callbacksRef.current.onError();
      });

    const resizeObserver = new ResizeObserver(() => {
      if (disposed) return;
      const w = Math.max(container.clientWidth, 1);
      const h = Math.max(container.clientHeight, 1);
      renderer.setSize(w, h, false);
      if (active) {
        const framing = getFramingFor(active);
        applyCameraPose(
          active.config.camera.fov,
          framing.aspect,
          framing.position,
          framing.target,
          active.config.environmentIntensity
        );
      }
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? true;
        if (visible && !isVisible) {
          lastFrameTime = performance.now();
        }
        isVisible = visible;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    const animate = (now: number) => {
      if (disposed) return;
      rafId = window.requestAnimationFrame(animate);

      const dt = Math.min(now - lastFrameTime, 80);
      lastFrameTime = now;

      if (!isVisible || !active) return;

      cycleElapsedMs += dt;

      // Só inicia o deslocamento de saída quando o próximo modelo estiver em cena
      if (cycleElapsedMs >= HOLD_MS && configs.length > 1 && !next) {
        cycleElapsedMs = HOLD_MS - 16;
        ensureNextLoaded(active.index);
      }

      if (cycleElapsedMs >= CYCLE_MS && next) {
        scene.remove(active.group);
        disposeObjectTree(active.group);

        active = next;
        active.group.position.x = 0;
        next = null;
        nextLoadingIndex = null;
        cycleElapsedMs = 0;

        callbacksRef.current.onActiveChange(active.index);
        ensureNextLoaded(active.index);
      }

      const activeFraming = getFramingFor(active);

      // Rotação suave do equipamento central
      const rotProgress = Math.min(cycleElapsedMs / CYCLE_MS, 1);
      active.group.rotation.y =
        -ROTATION_SWEEP_RAD * 0.3 + ROTATION_SWEEP_RAD * easeInOutCubic(rotProgress);

      if (cycleElapsedMs >= HOLD_MS && next) {
        const t = easeInOutCubic(Math.min((cycleElapsedMs - HOLD_MS) / TRANSITION_MS, 1));
        const nextFraming = getFramingFor(next);
        const span = Math.max(activeFraming.lateralOffset, nextFraming.lateralOffset);

        active.group.position.x = -t * span;
        next.group.position.x = (1 - t) * span;
        next.group.rotation.y = -ROTATION_SWEEP_RAD * 0.3;

        const interpPos = activeFraming.position.clone().lerp(nextFraming.position, t);
        const interpTarget = activeFraming.target.clone().lerp(nextFraming.target, t);
        const interpFov = THREE.MathUtils.lerp(
          active.config.camera.fov,
          next.config.camera.fov,
          t
        );
        const interpEnv = THREE.MathUtils.lerp(
          active.config.environmentIntensity,
          next.config.environmentIntensity,
          t
        );

        applyCameraPose(interpFov, activeFraming.aspect, interpPos, interpTarget, interpEnv);
      } else {
        active.group.position.x = 0;
        applyCameraPose(
          active.config.camera.fov,
          activeFraming.aspect,
          activeFraming.position,
          activeFraming.target,
          active.config.environmentIntensity
        );

        if (next) {
          nextPeekProgress = Math.min(nextPeekProgress + dt / 550, 1);
          const peekEase = easeOutCubic(nextPeekProgress);
          const startX = activeFraming.lateralOffset * 1.4;
          next.group.position.x = THREE.MathUtils.lerp(startX, activeFraming.lateralOffset, peekEase);
          next.group.rotation.y = -ROTATION_SWEEP_RAD * 0.3;
        }
      }

      renderer.render(scene, camera);
    };

    rafId = window.requestAnimationFrame(animate);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (active) {
        scene.remove(active.group);
        disposeObjectTree(active.group);
      }
      if (next) {
        scene.remove(next.group);
        disposeObjectTree(next.group);
      }
      scene.environment = null;
      envTexture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [configs, paddingMultiplier]);

  return <div ref={containerRef} className={className} />;
}
