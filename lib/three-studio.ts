import * as THREE from "three";
import type { Equipment3DConfig } from "./equipamentos-3d";

/**
 * Cria o ambiente de estúdio calibrado a partir de
 * assets-3d-almeida/_pipeline/visualizador/estudio.js:
 * sala neutra + softbox no teto + faixas laterais + rebatedor frontal.
 */
export function createStudioEnvironment(renderer: THREE.WebGLRenderer): THREE.Texture {
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
 * Posiciona as luzes key e rim em relação à câmera e ao alvo,
 * preservando a leitura de geometria e volume do estudo original.
 */
export function positionStudioLights(
  camera: THREE.Camera,
  target: THREE.Vector3,
  keyLight: THREE.DirectionalLight,
  rimLight: THREE.DirectionalLight
) {
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
}

/**
 * Calcula posição e alvo da câmera garantindo que o equipamento não corte
 * em nenhum ângulo de rotação horizontal (360°) nem em viewports estreitas.
 */
export function computeFraming(
  boxSize: THREE.Vector3,
  aspect: number,
  cameraConfig: Equipment3DConfig["camera"],
  paddingMultiplier = 1.0
) {
  const azRad = THREE.MathUtils.degToRad(cameraConfig.azimuthDeg);
  const elRad = THREE.MathUtils.degToRad(cameraConfig.elevationDeg);
  const fovRad = THREE.MathUtils.degToRad(cameraConfig.fov);

  const dir = new THREE.Vector3(
    Math.sin(azRad) * Math.cos(elRad),
    Math.sin(elRad),
    Math.cos(azRad) * Math.cos(elRad)
  ).normalize();

  const rxz = Math.hypot(boxSize.x / 2, boxSize.z / 2);
  const ry = boxSize.y / 2;
  const maxHalfW = rxz;
  const maxHalfH = Math.max(ry, ry * Math.cos(elRad) + rxz * Math.sin(elRad));

  const tanHalfFov = Math.tan(fovRad / 2);
  const safeAspect = Math.max(aspect, 0.55);
  const distV = maxHalfH / tanHalfFov;
  const distH = maxHalfW / (tanHalfFov * safeAspect);
  const basePadding = cameraConfig.padding * paddingMultiplier;
  const responsivePadding = aspect < 1.15 ? basePadding * 1.12 : basePadding;
  const distance = Math.max(distV, distH) * responsivePadding + rxz * 0.65;

  const target = new THREE.Vector3(
    0,
    boxSize.y * (0.5 + (cameraConfig.targetYOffsetRatio ?? 0)),
    0
  );
  const position = target.clone().addScaledVector(dir, distance);

  return { position, target, distance };
}

/**
 * Libera geometrias, materiais e texturas de uma subárvore Three.js.
 */
export function disposeObjectTree(root: THREE.Object3D) {
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

/**
 * Enquadramento justo para o visualizador INTERATIVO do catálogo.
 *
 * Diferente de `computeFraming` (usado pela coreografia, que continua
 * intocado), aqui a distância não vem de uma folga multiplicativa fixa: é a
 * MENOR distância em que os 8 cantos da caixa envolvente (mais pontos extras,
 * ex.: a sombra de contato) ficam dentro de `fill` da meia-largura/meia-altura
 * do quadro — em TODOS os azimutes (varredura de 360°) e nas elevações
 * informadas, com projeção em perspectiva exata (profundidade de cada ponto).
 * Resultado: o equipamento ocupa a fração pretendida do palco no pior ângulo e
 * não é cortado ao girar, sem depender de um fator de segurança grosseiro.
 */
export function computeFitFraming(
  boxSize: THREE.Vector3,
  aspect: number,
  cameraConfig: Equipment3DConfig["camera"],
  opts: { fill: number; elevationsDeg: number[]; extraPoints?: THREE.Vector3[]; azimuthStepDeg?: number }
) {
  const fovRad = THREE.MathUtils.degToRad(cameraConfig.fov);
  const tanV = Math.tan(fovRad / 2);
  const tanH = tanV * Math.max(aspect, 0.4);
  const target = new THREE.Vector3(0, boxSize.y * (0.5 + (cameraConfig.targetYOffsetRatio ?? 0)), 0);

  const points: THREE.Vector3[] = [];
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      for (const y of [0, boxSize.y]) {
        points.push(new THREE.Vector3((sx * boxSize.x) / 2, y, (sz * boxSize.z) / 2));
      }
    }
  }
  if (opts.extraPoints) points.push(...opts.extraPoints);
  const rel = points.map((p) => p.clone().sub(target));

  const dir = new THREE.Vector3();
  const right = new THREE.Vector3();
  const up = new THREE.Vector3();
  const worldUp = new THREE.Vector3(0, 1, 0);
  const step = opts.azimuthStepDeg ?? 10;
  let distance = 0;

  for (const elDeg of opts.elevationsDeg) {
    const el = THREE.MathUtils.degToRad(elDeg);
    for (let azDeg = 0; azDeg < 360; azDeg += step) {
      const az = THREE.MathUtils.degToRad(azDeg);
      dir.set(Math.sin(az) * Math.cos(el), Math.sin(el), Math.cos(az) * Math.cos(el)).normalize();
      right.crossVectors(worldUp, dir).normalize();
      up.crossVectors(dir, right).normalize();
      for (const q of rel) {
        const along = q.dot(dir);
        const x = Math.abs(q.dot(right));
        const y = Math.abs(q.dot(up));
        distance = Math.max(distance, along + x / (opts.fill * tanH), along + y / (opts.fill * tanV));
      }
    }
  }

  const azRad = THREE.MathUtils.degToRad(cameraConfig.azimuthDeg);
  const elRad = THREE.MathUtils.degToRad(cameraConfig.elevationDeg);
  const startDir = new THREE.Vector3(
    Math.sin(azRad) * Math.cos(elRad),
    Math.sin(elRad),
    Math.cos(azRad) * Math.cos(elRad)
  ).normalize();
  const position = target.clone().addScaledVector(startDir, distance);
  return { position, target, distance };
}
