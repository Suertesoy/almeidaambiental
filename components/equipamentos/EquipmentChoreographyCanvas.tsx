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
};

const CYCLE_DURATION_MS = 6000;
const FADE_IN_MS = 750;
const FADE_OUT_MS = 700;
const ROTATION_SWEEP_RAD = THREE.MathUtils.degToRad(36);
const SLIDE_DISTANCE_M = 0.22;

function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2;
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
      opacity: 0.9,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.001;
    shadowMesh.renderOrder = -1;
    group.add(shadowMesh);
  } catch {
    // Sombra de contato é opcional
  }

  return { index, config, group, boxSize: size };
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
    renderer.domElement.style.opacity = "0";

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
    let nextPrepared: PreparedModel | null = null;
    let nextLoadingIndex: number | null = null;
    let cycleElapsedMs = 0;
    let lastFrameTime = performance.now();

    const applyCameraForModel = (model: PreparedModel) => {
      const w = Math.max(container.clientWidth, 1);
      const h = Math.max(container.clientHeight, 1);
      const aspect = w / h;
      camera.fov = model.config.camera.fov;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      scene.environmentIntensity = model.config.environmentIntensity;

      const framing = computeFraming(
        model.boxSize,
        aspect,
        model.config.camera,
        paddingMultiplier
      );
      camera.position.copy(framing.position);
      camera.lookAt(framing.target);
      positionStudioLights(camera, framing.target, keyLight, rimLight);
    };

    const preloadNext = (currentIndex: number) => {
      if (configs.length < 2) return;
      const targetIndex = (currentIndex + 1) % configs.length;
      if (nextLoadingIndex === targetIndex || nextPrepared?.index === targetIndex) return;
      nextLoadingIndex = targetIndex;

      loadPreparedModel(loader, texLoader, configs[targetIndex], targetIndex)
        .then((prepared) => {
          if (disposed) {
            disposeObjectTree(prepared.group);
            return;
          }
          if (nextPrepared) {
            disposeObjectTree(nextPrepared.group);
          }
          nextPrepared = prepared;
        })
        .catch(() => {
          nextLoadingIndex = null;
        });
    };

    // Carrega o primeiro equipamento da sequência
    loadPreparedModel(loader, texLoader, configs[0], 0)
      .then((first) => {
        if (disposed) {
          disposeObjectTree(first.group);
          return;
        }
        active = first;
        scene.add(first.group);
        applyCameraForModel(first);
        callbacksRef.current.onActiveChange(0);
        renderer.render(scene, camera);

        if (!readySignaled) {
          readySignaled = true;
          callbacksRef.current.onReady();
        }
        preloadNext(0);
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
        applyCameraForModel(active);
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

      // Não inicia a transição de saída antes de o próximo GLB estar pronto
      const fadeOutStart = CYCLE_DURATION_MS - FADE_OUT_MS;
      if (cycleElapsedMs >= fadeOutStart && configs.length > 1 && !nextPrepared) {
        cycleElapsedMs = fadeOutStart - 16;
        preloadNext(active.index);
      }

      if (cycleElapsedMs >= CYCLE_DURATION_MS && nextPrepared) {
        scene.remove(active.group);
        disposeObjectTree(active.group);

        active = nextPrepared;
        nextPrepared = null;
        nextLoadingIndex = null;
        cycleElapsedMs = 0;

        scene.add(active.group);
        applyCameraForModel(active);
        callbacksRef.current.onActiveChange(active.index);
        preloadNext(active.index);
      }

      const progress = Math.min(cycleElapsedMs / CYCLE_DURATION_MS, 1);
      const eased = easeInOutSine(progress);
      active.group.rotation.y = -ROTATION_SWEEP_RAD * 0.35 + ROTATION_SWEEP_RAD * eased;

      // Opacidade e deslocamento espacial sutil na entrada e na saída
      let opacity = 1;
      let slideX = 0;

      if (cycleElapsedMs < FADE_IN_MS) {
        const t = easeInOutSine(cycleElapsedMs / FADE_IN_MS);
        opacity = t;
        slideX = (1 - t) * SLIDE_DISTANCE_M;
      } else if (cycleElapsedMs > fadeOutStart && nextPrepared) {
        const t = easeInOutSine(Math.min((cycleElapsedMs - fadeOutStart) / FADE_OUT_MS, 1));
        opacity = 1 - t;
        slideX = -t * SLIDE_DISTANCE_M;
      }

      active.group.position.x = slideX;
      renderer.domElement.style.opacity = String(opacity);
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
      if (nextPrepared) {
        disposeObjectTree(nextPrepared.group);
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
