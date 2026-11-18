"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type { Equipment3DConfig } from "../../lib/equipamentos-3d";
import {
  computeFraming,
  createStudioEnvironment,
  disposeObjectTree,
  positionStudioLights,
} from "../../lib/three-studio";

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
            shadowMesh.position.y = 0.001;
            shadowMesh.renderOrder = -1;
            modelGroup.add(shadowMesh);
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
