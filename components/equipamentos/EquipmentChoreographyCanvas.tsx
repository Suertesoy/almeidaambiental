"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { Equipment3DConfig } from "../../lib/equipamentos-3d";
import {
  collectExtremePoints,
  computeFraming,
  createStudioEnvironment,
  computeYawFraming,
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
  /** Raio da pegada em planta (metade da diagonal X/Z) na escala nativa do GLB. */
  rxz: number;
  /** Pontos extremos na escala da cena, só para modelos com `choreography`. */
  points: THREE.Vector3[] | null;
  /** 0 → 1: entrada pela lateral quando o modelo termina de carregar. */
  entry: number;
};

const HOLD_MS = 3000;
const ENTRY_MS = 900;
/** Quantos equipamentos à frente do destaque ficam preparados. */
const PRELOAD_AHEAD = 2;
const MAX_LOAD_ATTEMPTS = 2;
const MOVE_MS = 1100;
/**
 * Posição mínima da borda interna do vizinho, como fração do raio do
 * protagonista. A caixa envolvente de uma máquina girada termina num CANTO
 * afiado, quase sem massa visível; por isso a borda do vizinho pode entrar
 * levemente no retângulo do protagonista (só nos cantos vazios) em vez de
 * exigir folga, o que faria o lateral sumir em telas estreitas.
 */
const NEIGHBOR_INNER_RATIO = 0.9;
/**
 * Fração da largura do vizinho que fica visível dentro do quadro. Cresce com a
 * proporção do palco: telas estreitas mostram só uma lasca do lateral, telas
 * largas mostram uma parcela maior. Nunca depende de um tamanho de aparelho.
 */
/** Folga do vizinho quando o protagonista tem silhueta real medida (sem cantos vazios). */
const SILHOUETTE_INNER_RATIO = 1.05;
const VISIBLE_FRAC_NARROW = 0.3;
const VISIBLE_FRAC_WIDE = 0.6;
const ASPECT_NARROW = 1.3;
const ASPECT_WIDE = 2.4;
const SWAY_RAD = THREE.MathUtils.degToRad(14);
const BASE_YAW = -THREE.MathUtils.degToRad(8);

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

  const choreo = config.choreography;
  const pivot = choreo?.pivot ?? { x: 0, z: 0 };
  const scale = choreo?.scale ?? 1;
  root.position.set(-center.x - pivot.x, -box.min.y, -center.z - pivot.z);

  const group = new THREE.Group();
  group.add(root);
  const points = choreo
    ? collectExtremePoints(root).map((p) => p.multiplyScalar(scale))
    : null;
  group.scale.setScalar(scale);

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
    shadowMesh.position.set(-pivot.x, 0.001, -pivot.z);
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
    boxSize: size.multiplyScalar(scale),
    rxz: Math.hypot(size.x / 2, size.z / 2),
    points,
    entry: 0,
  };
}

/**
 * Coreografia automática de três posições: anterior (esquerda), em destaque
 * (centro) e próximo (direita, espiando). Todos os modelos vivem na MESMA cena
 * e na MESMA escala (a nativa do GLB, em metros): um equipamento grande
 * continua grande ao lado de um pequeno, em vez de ser normalizado para caber
 * num espaço. Exceção por configuração (`choreography`): uma instalação completa
 * pode ter escala uniforme, orientação e enquadramento próprios. A posição vem de uma coordenada contínua `c` (índice fracionário
 * do item em destaque): rel = índice − c, em anel. O antigo protagonista
 * desliza para a esquerda (nunca some) e o que sai pela esquerda reaparece
 * pela direita, fora do quadro, sem cortes bruscos.
 *
 * Os modelos são dispostos ao longo do eixo LATERAL da câmera (e não do eixo X
 * do mundo): assim ficam todos à mesma distância dela, a escala em tela é a
 * relativa real e a separação visual é exatamente a separação no espaço.
 *
 * Carregamento sob demanda: só o destaque e os próximos (PRELOAD_AHEAD), um por
 * vez; cada modelo tem shaders e texturas preparados antes de entrar em cena.
 *
 * Não há interação manual (arrastar, tocar, teclado): é uma apresentação
 * visual. A rotação interativa do catálogo técnico é outro componente
 * (EquipmentModelCanvas, com OrbitControls) e não é tocada aqui.
 */
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
    canvas.style.touchAction = "auto";
    canvas.style.pointerEvents = "none";
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
      const fovRad = THREE.MathUtils.degToRad(model.config.camera.fov);
      const choreo = model.config.choreography;
      if (choreo && model.points) {
        const fit = computeYawFraming(model.points, model.boxSize.y, aspect, model.config.camera.fov, choreo);
        // Afastamento extra do palco (hero), mantendo a direção da câmera.
        const distance = fit.distance * paddingMultiplier;
        const position = fit.target.clone().addScaledVector(fit.direction, distance);
        const halfW = distance * Math.tan(fovRad / 2) * aspect;
        return { position, target: fit.target, distance, halfW, innerHalf: fit.halfWidth * (SILHOUETTE_INNER_RATIO / NEIGHBOR_INNER_RATIO) };
      }
      const framing = computeFraming(model.boxSize, aspect, model.config.camera, paddingMultiplier);
      const halfW = framing.distance * Math.tan(fovRad / 2) * aspect;
      return { ...framing, halfW, innerHalf: model.rxz };
    };

    const step = (dir: -1 | 1) => {
      if (moving) return;
      let target = Math.round(c) + dir;
      // Um modelo que falhou em definitivo é pulado; um que ainda carrega é esperado.
      for (let k = 1; k < n && attempts[wrap(target)] >= MAX_LOAD_ATTEMPTS && !models[wrap(target)]; k++) {
        target += dir;
      }
      if (!models[wrap(target)]) {
        pumpLoads();
        return;
      }
      if (wrap(target) === wrap(Math.round(c))) return;
      moveFrom = c;
      moveTo = target;
      moveElapsed = 0;
      moving = true;
      pumpLoads();
    };

    // Fila de carregamento: um GLB por vez, só o destaque e os próximos.
    const attempts: number[] = new Array(n).fill(0);
    let loadingIndex = -1;
    let pendingGroup: THREE.Group | null = null;
    const pumpLoads = () => {
      if (disposed || loadingIndex !== -1) return;
      const current = moving ? moveTo : Math.round(c);
      let next = -1;
      for (let k = 0; k <= PRELOAD_AHEAD && next === -1; k++) {
        const i = wrap(current + k);
        if (!models[i] && attempts[i] < MAX_LOAD_ATTEMPTS) next = i;
      }
      if (next === -1) return;
      const i = next;
      loadingIndex = i;
      attempts[i] += 1;
      loadPreparedModel(loader, texLoader, configs[i], i)
        .then(async (prepared) => {
          if (disposed) {
            disposeObjectTree(prepared.group);
            return;
          }
          // Prepara shaders e texturas antes de entrar em cena, para a primeira
          // aparição não travar a animação.
          pendingGroup = prepared.group;
          try {
            prepared.group.traverse((obj) => {
              if (!(obj instanceof THREE.Mesh)) return;
              const mats: THREE.Material[] = Array.isArray(obj.material) ? obj.material : [obj.material];
              for (const mat of mats) {
                for (const value of Object.values(mat)) {
                  if (value instanceof THREE.Texture) renderer.initTexture(value);
                }
              }
            });
            await renderer.compileAsync(prepared.group, camera, scene);
          } catch {
            // Preparação é só otimização: o modelo entra mesmo sem ela.
          }
          if (disposed) return; // já liberado na limpeza (pendingGroup)
          pendingGroup = null;
          if (i === 0) prepared.entry = 1;
          models[i] = prepared;
          prepared.group.visible = false;
          scene.add(prepared.group);
          if (i === 0 && !readySignaled) {
            readySignaled = true;
            lastFrameTime = performance.now();
            callbacksRef.current.onActiveChange(0);
            callbacksRef.current.onReady();
          }
        })
        .catch(() => {
          if (i === 0 && !disposed && attempts[0] >= MAX_LOAD_ATTEMPTS) callbacksRef.current.onError();
        })
        .finally(() => {
          loadingIndex = -1;
          pumpLoads();
        });
    };
    pumpLoads();

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
      } else {
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
      const i0 = wrap(moving ? Math.round(moveFrom) : Math.round(c));
      const i1 = moving ? wrap(moveTo) : i0;
      const t = moving ? (c - moveFrom) / (moveTo - moveFrom) : 0;
      const m0 = models[i0] ?? models[nearest] ?? models.find(Boolean)!;
      const m1 = models[i1] ?? m0;
      const f0 = framingFor(m0, aspect);
      const f1 = framingFor(m1, aspect);
      const pos = f0.position.clone().lerp(f1.position, t);
      const tgt = f0.target.clone().lerp(f1.target, t);
      const fov = THREE.MathUtils.lerp(m0.config.camera.fov, m1.config.camera.fov, t);
      const env = THREE.MathUtils.lerp(m0.config.environmentIntensity, m1.config.environmentIntensity, t);
      const halfW = THREE.MathUtils.lerp(f0.halfW, f1.halfW, t);
      const rxzC = THREE.MathUtils.lerp(f0.innerHalf, f1.innerHalf, t);

      camera.fov = fov;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      camera.position.copy(pos);
      camera.lookAt(tgt);
      scene.environmentIntensity = env;
      positionStudioLights(camera, tgt, keyLight, rimLight);

      // --- posição e giro de cada modelo ---
      // Eixo lateral da câmera no plano do chão: todos os modelos ficam à
      // mesma profundidade, então a escala em tela é a relativa real.
      const backX = pos.x - tgt.x;
      const backZ = pos.z - tgt.z;
      const backLen = Math.hypot(backX, backZ) || 1;
      const rightX = backZ / backLen;
      const rightZ = -backX / backLen;

      // Quanto do vizinho aparece cresce com a proporção do palco.
      const visibleFrac = THREE.MathUtils.lerp(
        VISIBLE_FRAC_NARROW,
        VISIBLE_FRAC_WIDE,
        THREE.MathUtils.clamp((aspect - ASPECT_NARROW) / (ASPECT_WIDE - ASPECT_NARROW), 0, 1)
      );
      // Piso: o vizinho nunca avança além deste ponto sobre o protagonista.
      const minInner = rxzC * NEIGHBOR_INNER_RATIO;

      for (const m of models) {
        if (!m) continue;
        const rel = relOf(m.index);
        const abs = Math.abs(rel);

        // Giro: só o protagonista oscila suavemente; laterais ficam quietos.
        const centerWeight = Math.max(0, 1 - abs);
        const choreo = m.config.choreography;
        const swayRad = choreo ? THREE.MathUtils.degToRad(choreo.swayDeg) : SWAY_RAD;
        const baseYaw = choreo ? THREE.MathUtils.degToRad(choreo.yawDeg) : BASE_YAW;
        const sway = Math.sin(swayClock / 2400) * swayRad * centerWeight;
        const yaw = baseYaw + sway;

        // Meia-largura REAL do modelo projetada no eixo lateral (caixa girada
        // pelo yaw atual), não o raio da pegada: o raio superestima máquinas
        // compridas (o contêiner) e faria a lasca visível desaparecer.
        const cosY = Math.cos(yaw);
        const sinY = Math.sin(yaw);
        const latX = cosY * rightX - sinY * rightZ;
        const latZ = sinY * rightX + cosY * rightZ;
        let low: number;
        let high: number;
        if (m.points) {
          // Silhueta real: num equipamento em "T" a caixa projetada é quase toda
          // vazio e o pivô não fica no meio dela.
          low = Infinity;
          high = -Infinity;
          for (const p of m.points) {
            const lateral = p.x * latX + p.z * latZ;
            if (lateral < low) low = lateral;
            if (lateral > high) high = lateral;
          }
        } else {
          high = (m.boxSize.x / 2) * Math.abs(latX) + (m.boxSize.z / 2) * Math.abs(latZ);
          low = -high;
        }
        const extent = (high - low) / 2;

        // Borda interna do vizinho: deixa visível `visibleFrac` da largura dele,
        // sem nunca invadir o protagonista. Escala do modelo = 1 sempre.
        const frac = choreo ? Math.min(visibleFrac, choreo.sideVisibleFrac) : visibleFrac;
        const innerEdge = Math.max(minInner, halfW - frac * 2 * extent);
        const dir = rel < 0 ? -1 : 1;
        const slot = dir > 0 ? innerEdge - low : innerEdge + high;
        // Além de |rel| = 1 o modelo continua deslizando para fora do quadro
        // (percurso proporcional à largura visível) antes de reaparecer do
        // lado oposto — a troca de lado acontece sempre fora de cena.
        const baseX =
          abs <= 1
            ? rel * slot
            : dir * (slot + (abs - 1) * 2 * (halfW + extent));
        // Ajuste fino por modelo: só como vizinho da direita (rel > 0), e
        // crescendo de 0 (no centro) a 1 (no slot lateral) — contínuo, sem
        // salto na transição. Fração da largura útil do palco (2 * halfW).
        const nudge = (m.config.choreographyRightNudge ?? 0) * 2 * halfW;
        // Recém-carregado: entra deslizando de fora do quadro, sem surgir pronto.
        m.entry = Math.min(1, m.entry + dt / ENTRY_MS);
        const entering = (1 - easeInOutCubic(m.entry)) * Math.min(abs, 1) * dir * (halfW + 2 * extent);
        // Recuo em profundidade como vizinho (0 no destaque). O lateral é
        // compensado para a borda interna continuar no mesmo lugar em tela.
        const depth = (choreo?.sideDepth ?? 0) * Math.min(abs, 1);
        const x =
          (baseX + nudge * THREE.MathUtils.clamp(rel, 0, 1) + entering) * (1 + depth / backLen);

        m.group.visible = abs < 1.95;
        m.group.position.set(
          rightX * x - (backX / backLen) * depth,
          0,
          rightZ * x - (backZ / backLen) * depth
        );
        m.group.rotation.y = yaw;
      }

      renderer.render(scene, camera);
    };

    rafId = window.requestAnimationFrame(animate);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (pendingGroup) disposeObjectTree(pendingGroup);
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
  }, [configs, paddingMultiplier]);

  return <div ref={containerRef} className={className} />;
}
