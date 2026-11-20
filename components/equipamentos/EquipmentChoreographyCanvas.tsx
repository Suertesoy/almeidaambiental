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
  /** Permite girar o equipamento central por arraste (mouse/toque) e tocar nos laterais. */
  interactive?: boolean;
  /** Comando de teclado: dir -1 = anterior, +1 = próximo. */
  command?: { seq: number; dir: -1 | 1 } | null;
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
  userYaw: number;
};

const HOLD_MS = 3600;
const MOVE_MS = 1100;
const IDLE_AFTER_INTERACTION_MS = 6000;
const SIDE_RADIUS_RATIO = 0.56;
const SWAY_RAD = THREE.MathUtils.degToRad(14);
const BASE_YAW = -THREE.MathUtils.degToRad(8);
const DRAG_RAD_PER_PX = 0.008;
const TAP_SLOP_PX = 7;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
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
    shadowMesh.userData.isShadow = true;
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
    userYaw: 0,
  };
}

/**
 * Carrossel espacial de três posições: anterior (esquerda), em destaque
 * (centro) e próximo (direita, espiando). Todos os modelos ficam na mesma
 * cena e são posicionados por uma coordenada contínua `c` (índice fracionário
 * do item em destaque): rel = índice − c, em anel. Isso garante que o antigo
 * protagonista desliza para a esquerda (nunca some) e que o que sai pela
 * esquerda reaparece pela direita fora da tela — sem cortes bruscos.
 *
 * Interação: arrastar horizontalmente gira o equipamento central (OrbitControls
 * não é usado porque o palco é um carrossel; a rotação é yaw direto). O canvas
 * usa `touch-action: pan-y`, então a rolagem vertical da página continua livre.
 * Um toque (sem arraste) num equipamento lateral o traz para o centro.
 */
export default function EquipmentChoreographyCanvas({
  configs,
  paddingMultiplier = 1.0,
  interactive = true,
  command = null,
  onReady,
  onError,
  onActiveChange,
  className,
}: EquipmentChoreographyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const callbacksRef = useRef({ onReady, onError, onActiveChange });
  callbacksRef.current = { onReady, onError, onActiveChange };
  const commandRef = useRef(command);
  commandRef.current = command;
  const stepRef = useRef<((dir: -1 | 1) => void) | null>(null);

  useEffect(() => {
    if (command) stepRef.current?.(command.dir);
  }, [command]);

  useEffect(() => {
    const container = containerRef.current;
    const n = configs.length;
    if (!container || n === 0) return;

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
    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.touchAction = interactive ? "pan-y" : "auto";
    container.appendChild(canvas);

    renderer.setSize(Math.max(container.clientWidth, 1), Math.max(container.clientHeight, 1), false);

    const scene = new THREE.Scene();
    const envTexture = createStudioEnvironment(renderer);
    scene.environment = envTexture;

    const camera = new THREE.PerspectiveCamera(
      configs[0].camera.fov,
      Math.max(container.clientWidth, 1) / Math.max(container.clientHeight, 1),
      0.05,
      120
    );
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.35);
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.45);
    scene.add(keyLight, keyLight.target, rimLight, rimLight.target);

    const loader = new GLTFLoader();
    const texLoader = new THREE.TextureLoader();
    const models: (PreparedModel | null)[] = new Array(n).fill(null);

    // Estado do carrossel
    let c = 0; // coordenada contínua do item em destaque
    let moveFrom = 0;
    let moveTo = 0;
    let moveElapsed = 0;
    let moving = false;
    let holdElapsed = 0;
    let idleUntil = 0;
    let lastActive = -1;
    let swayClock = 0;
    let lastFrameTime = performance.now();

    const wrap = (v: number) => ((v % n) + n) % n;
    // rel em [-n/2, n/2)
    const relOf = (index: number) => {
      let r = index - wrap(c);
      if (r >= n / 2) r -= n;
      if (r < -n / 2) r += n;
      return r;
    };

    const framingFor = (model: PreparedModel, aspect: number) => {
      const framing = computeFraming(model.boxSize, aspect, model.config.camera, paddingMultiplier);
      const fovRad = THREE.MathUtils.degToRad(model.config.camera.fov);
      const halfW = framing.distance * Math.tan(fovRad / 2) * aspect;
      return { ...framing, halfW };
    };

    const step = (dir: -1 | 1) => {
      if (moving) return;
      const loadedAll = models.every(Boolean);
      const target = Math.round(c) + dir;
      if (!loadedAll && !models[wrap(target)]) return;
      moveFrom = c;
      moveTo = Math.round(c) + dir;
      moveElapsed = 0;
      moving = true;
    };
    stepRef.current = (dir) => {
      idleUntil = performance.now() + IDLE_AFTER_INTERACTION_MS;
      step(dir);
    };

    models.forEach((_, i) => {
      loadPreparedModel(loader, texLoader, configs[i], i)
        .then((prepared) => {
          if (disposed) {
            disposeObjectTree(prepared.group);
            return;
          }
          models[i] = prepared;
          prepared.group.visible = false;
          scene.add(prepared.group);
          if (i === 0 && !readySignaled) {
            readySignaled = true;
            callbacksRef.current.onActiveChange(0);
            callbacksRef.current.onReady();
          }
        })
        .catch(() => {
          if (i === 0 && !disposed) callbacksRef.current.onError();
        });
    });

    const resizeObserver = new ResizeObserver(() => {
      if (disposed) return;
      renderer.setSize(Math.max(container.clientWidth, 1), Math.max(container.clientHeight, 1), false);
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries[0]?.isIntersecting ?? true;
        if (visible && !isVisible) lastFrameTime = performance.now();
        isVisible = visible;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // ---------- Interação: arraste gira o central; toque traz o lateral ----------
    const raycaster = new THREE.Raycaster();
    const pointer = { id: -1, startX: 0, startY: 0, lastX: 0, dragging: false, decided: false, target: null as PreparedModel | null };

    const centerModel = () => {
      const idx = wrap(Math.round(c));
      return models[idx];
    };

    const pickModelAt = (clientX: number, clientY: number): PreparedModel | null => {
      const rect = canvas.getBoundingClientRect();
      const ndc = new THREE.Vector2(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -(((clientY - rect.top) / rect.height) * 2 - 1)
      );
      raycaster.setFromCamera(ndc, camera);
      let best: { model: PreparedModel; dist: number } | null = null;
      for (const m of models) {
        if (!m || !m.group.visible) continue;
        const hits = raycaster.intersectObject(m.group, true).filter((h) => !h.object.userData.isShadow);
        if (hits.length && (!best || hits[0].distance < best.dist)) best = { model: m, dist: hits[0].distance };
      }
      return best?.model ?? null;
    };

    const onPointerDown = (e: PointerEvent) => {
      if (!interactive || pointer.id !== -1 || (e.pointerType === "mouse" && e.button !== 0)) return;
      pointer.id = e.pointerId;
      pointer.startX = pointer.lastX = e.clientX;
      pointer.startY = e.clientY;
      pointer.dragging = false;
      pointer.decided = false;
      pointer.target = pickModelAt(e.clientX, e.clientY);
      idleUntil = performance.now() + IDLE_AFTER_INTERACTION_MS;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!interactive) return;
      if (pointer.id === -1) {
        // Cursor de "mão" só sobre algo clicável/arrastável
        if (e.pointerType === "mouse") {
          const hit = pickModelAt(e.clientX, e.clientY);
          canvas.style.cursor = hit ? (hit === centerModel() ? "grab" : "pointer") : "default";
        }
        return;
      }
      if (e.pointerId !== pointer.id) return;
      const dx = e.clientX - pointer.startX;
      const dy = e.clientY - pointer.startY;
      if (!pointer.decided && Math.hypot(dx, dy) > TAP_SLOP_PX) {
        pointer.decided = true;
        // Só captura o gesto se for majoritariamente horizontal e começou no equipamento central
        pointer.dragging = Math.abs(dx) > Math.abs(dy) && pointer.target === centerModel();
        if (pointer.dragging) {
          try {
            canvas.setPointerCapture(e.pointerId);
          } catch {
            /* captura é opcional */
          }
          canvas.style.cursor = "grabbing";
        }
      }
      if (pointer.dragging) {
        const model = centerModel();
        if (model) model.userYaw += (e.clientX - pointer.lastX) * DRAG_RAD_PER_PX;
        idleUntil = performance.now() + IDLE_AFTER_INTERACTION_MS;
      }
      pointer.lastX = e.clientX;
    };

    const endPointer = (e: PointerEvent, cancelled: boolean) => {
      if (e.pointerId !== pointer.id) return;
      const wasTap = !pointer.decided && !cancelled;
      const target = pointer.target;
      pointer.id = -1;
      pointer.dragging = false;
      canvas.style.cursor = "default";
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        /* já liberado */
      }
      if (wasTap && target && target !== centerModel()) {
        const rel = relOf(target.index);
        stepRef.current?.(rel < 0 ? -1 : 1);
      }
    };
    const onPointerUp = (e: PointerEvent) => endPointer(e, false);
    const onPointerCancel = (e: PointerEvent) => endPointer(e, true);

    if (interactive) {
      canvas.addEventListener("pointerdown", onPointerDown);
      canvas.addEventListener("pointermove", onPointerMove);
      canvas.addEventListener("pointerup", onPointerUp);
      canvas.addEventListener("pointercancel", onPointerCancel);
    }

    const animate = (now: number) => {
      if (disposed) return;
      rafId = window.requestAnimationFrame(animate);

      const dt = Math.min(now - lastFrameTime, 80);
      lastFrameTime = now;
      if (!isVisible) return;

      const anyLoaded = models.some(Boolean);
      if (!anyLoaded) return;

      swayClock += dt;

      // --- avanço do carrossel ---
      if (moving) {
        moveElapsed += dt;
        const p = Math.min(moveElapsed / MOVE_MS, 1);
        c = moveFrom + (moveTo - moveFrom) * easeInOutCubic(p);
        if (p >= 1) {
          c = moveTo;
          moving = false;
          holdElapsed = 0;
        }
      } else if (pointer.id === -1 && now >= idleUntil) {
        holdElapsed += dt;
        if (holdElapsed >= HOLD_MS) {
          holdElapsed = 0;
          step(1);
        }
      }

      const aspect = Math.max(container.clientWidth, 1) / Math.max(container.clientHeight, 1);
      const nearest = wrap(Math.round(c));
      if (nearest !== lastActive && models[nearest]) {
        lastActive = nearest;
        callbacksRef.current.onActiveChange(nearest);
      }

      // --- câmera: interpola entre o enquadramento dos dois itens vizinhos de c ---
      const i0 = wrap(Math.floor(c));
      const i1 = wrap(i0 + 1);
      const t = c - Math.floor(c);
      const m0 = models[i0] ?? models[nearest] ?? models.find(Boolean)!;
      const m1 = models[i1] ?? m0;
      const f0 = framingFor(m0, aspect);
      const f1 = framingFor(m1, aspect);
      const pos = f0.position.clone().lerp(f1.position, t);
      const tgt = f0.target.clone().lerp(f1.target, t);
      const fov = THREE.MathUtils.lerp(m0.config.camera.fov, m1.config.camera.fov, t);
      const env = THREE.MathUtils.lerp(m0.config.environmentIntensity, m1.config.environmentIntensity, t);
      const halfW = THREE.MathUtils.lerp(f0.halfW, f1.halfW, t);
      const rxzC = THREE.MathUtils.lerp(m0.rxz, m1.rxz, t);

      camera.fov = fov;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      camera.position.copy(pos);
      camera.lookAt(tgt);
      scene.environmentIntensity = env;
      positionStudioLights(camera, tgt, keyLight, rimLight);

      // --- posição, escala e giro de cada modelo ---
      for (const m of models) {
        if (!m) continue;
        const rel = relOf(m.index);
        const abs = Math.min(Math.abs(rel), 1);
        // Escala lateral normalizada pelo tamanho do protagonista: um equipamento
        // grande (hidráulico) e um pequeno (fuso) ficam com pegada visual parecida
        // e sempre subordinada ao centro.
        const sideScale = THREE.MathUtils.clamp((SIDE_RADIUS_RATIO * rxzC) / m.rxz, 0.5, 0.8);
        const s = THREE.MathUtils.lerp(1, sideScale, abs);

        // Distância do centro até a posição lateral: só uma fatia do vizinho
        // aparece (≈40% da largura dele), sem encostar no protagonista.
        const sideRxz = m.rxz * sideScale;
        const innerEdge = Math.max(rxzC * 0.92, halfW - sideRxz * 0.8);
        const slot = innerEdge + sideRxz;
        const dir = rel < 0 ? -1 : 1;
        const x = Math.abs(rel) <= 1 ? rel * slot : dir * slot * (1 + (Math.abs(rel) - 1) * 1.3);

        m.group.visible = true;
        m.group.position.set(x, 0, 0);
        m.group.scale.setScalar(s);

        // Giro: centro oscila suavemente (+ yaw do usuário); laterais ficam quietos.
        const centerWeight = 1 - abs;
        if (centerWeight < 0.5) m.userYaw *= 1 - Math.min(dt / 500, 1) * 0.5;
        const sway = Math.sin(swayClock / 2400) * SWAY_RAD * centerWeight;
        m.group.rotation.y = BASE_YAW + sway + m.userYaw;
      }

      renderer.render(scene, camera);
    };

    rafId = window.requestAnimationFrame(animate);

    return () => {
      disposed = true;
      stepRef.current = null;
      window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerCancel);
      for (const m of models) {
        if (m) {
          scene.remove(m.group);
          disposeObjectTree(m.group);
        }
      }
      scene.environment = null;
      envTexture.dispose();
      renderer.dispose();
      if (canvas.parentNode === container) container.removeChild(canvas);
    };
  }, [configs, paddingMultiplier, interactive]);

  return <div ref={containerRef} className={className} />;
}
