import type { Locale } from "./i18n/locale";

export type Equipment3DCameraConfig = {
  /** Ângulo horizontal inicial em graus (perspectiva 3/4). */
  azimuthDeg: number;
  /** Ângulo vertical inicial em graus acima do horizonte. */
  elevationDeg: number;
  /** Campo de visão vertical da câmera em graus. */
  fov: number;
  /** Fator de respiro em torno do bounding box (1.0 = justo, 1.25 = editorial). */
  padding: number;
  /** Deslocamento vertical relativo do alvo em relação ao centro do bounding box. */
  targetYOffsetRatio?: number;
  /**
   * Catálogo: pivô da rotação no piso (metros), relativo ao centro do bounding
   * box. Só para equipamentos muito assimétricos, cujo centro geométrico cai no
   * vazio. Ausente = centro do bounding box.
   */
  pivot?: { x: number; z: number };
  /**
   * Catálogo: enquadra pelos pontos extremos da geometria em vez dos cantos do
   * bounding box (que num equipamento em "T" são espaço vazio e o afastariam).
   */
  fitToGeometry?: boolean;
  /** Catálogo: faixa de elevação permitida em torno da inicial (graus). */
  elevationRangeDeg?: { below: number; above: number };
  /** Catálogo em palco estreito: vista inicial e fração do quadro próprias. */
  mobile?: { azimuthDeg: number; fill: number };
};

/**
 * Apresentação própria na coreografia, para equipamentos cuja proporção foge das
 * demais. Ausente = regra padrão (escala nativa, câmera do modelo, giro comum).
 */
export type EquipmentChoreographyConfig = {
  /** Escala visual UNIFORME (não deforma): só na coreografia, nunca no catálogo. */
  scale: number;
  azimuthDeg: number;
  elevationDeg: number;
  /** Orientação do modelo no palco e amplitude da oscilação (graus). */
  yawDeg: number;
  swayDeg: number;
  /** Pivô no piso, em metros nativos, relativo ao centro do bounding box. */
  pivot: { x: number; z: number };
  targetYOffsetRatio: number;
  /** Fração da largura/altura do palco que o equipamento em destaque pode ocupar. */
  fillWidth: number;
  fillHeight: number;
  /** Como vizinho: fração máxima visível e recuo em profundidade (metros de cena). */
  sideVisibleFrac: number;
  sideDepth: number;
};

export type Equipment3DConfig = {
  /** ID correspondente ao catálogo em lib/equipamentos-data.ts. */
  productId: string;
  /** Pasta estável em public/models/equipamentos/. */
  assetSlug: "apv-100" | "compactador-fuso" | "compactador-hidraulico" | "prensa-horizontal" | "heger-crocodile";
  glbUrl: string;
  posterUrl: string;
  contactShadowUrl: string;
  contactShadowSize: {
    width: number;
    depth: number;
  };
  /** Intensidade da iluminação de estúdio (baseada em estudio.js). */
  environmentIntensity: number;
  /**
   * Ajuste fino da coreografia: quando este modelo é o vizinho da DIREITA do
   * protagonista, ele é empurrado para FORA do quadro (direita) esta fração da
   * largura útil do palco — menos porção visível, mesma escala, sem salto
   * (o deslocamento cresce junto com a aproximação do slot lateral).
   */
  choreographyRightNudge?: number;
  choreography?: EquipmentChoreographyConfig;
  /** Nome editorial exibido na legenda discreta da coreografia. */
  displayName: Record<Locale, string>;
  camera: Equipment3DCameraConfig;
  label: Record<Locale, string>;
  posterAlt: Record<Locale, string>;
};

export const EQUIPMENT_3D_MODELS: Record<string, Equipment3DConfig> = {
  "compactador-fuso": {
    productId: "compactador-fuso",
    assetSlug: "compactador-fuso",
    glbUrl: "/models/equipamentos/compactador-fuso/modelo.glb",
    posterUrl: "/models/equipamentos/compactador-fuso/poster.webp",
    contactShadowUrl: "/models/equipamentos/compactador-fuso/sombra-contato.png",
    contactShadowSize: { width: 2.6, depth: 2.0 },
    environmentIntensity: 1.75,
    displayName: {
      pt: "Compactador de Fuso",
      en: "Screw Compactor",
    },
    camera: {
      azimuthDeg: 36,
      elevationDeg: 18,
      fov: 26,
      padding: 1.32,
      targetYOffsetRatio: 0.02,
    },
    label: {
      pt: "Modelo 3D interativo do Compactador de Fuso",
      en: "Interactive 3D model of the Screw Compactor",
    },
    posterAlt: {
      pt: "Compactador de Fuso em perspectiva de três quartos mostrando o funil aberto e o conjunto mecânico",
      en: "Screw Compactor in three-quarter perspective showing the open hopper and mechanical assembly",
    },
  },
  "apv-90-100": {
    productId: "apv-90-100",
    assetSlug: "apv-100",
    glbUrl: "/models/equipamentos/apv-100/modelo.glb",
    posterUrl: "/models/equipamentos/apv-100/poster.webp",
    contactShadowUrl: "/models/equipamentos/apv-100/sombra-contato.png",
    contactShadowSize: { width: 2.6, depth: 2.0 },
    environmentIntensity: 1.8,
    displayName: {
      pt: "Prensa APV 100",
      en: "APV 100 Baler",
    },
    camera: {
      azimuthDeg: 34,
      elevationDeg: 10,
      fov: 25,
      padding: 1.34,
      targetYOffsetRatio: 0.0,
    },
    label: {
      pt: "Modelo 3D interativo da Prensa Vertical APV 100",
      en: "Interactive 3D model of the APV 100 Vertical Baler",
    },
    posterAlt: {
      pt: "Prensa Vertical APV 100 em perspectiva de três quartos",
      en: "APV 100 Vertical Baler in three-quarter perspective",
    },
  },
  "compactador-hidraulico": {
    productId: "compactador-hidraulico",
    assetSlug: "compactador-hidraulico",
    choreographyRightNudge: 0.05,
    glbUrl: "/models/equipamentos/compactador-hidraulico/modelo.glb",
    posterUrl: "/models/equipamentos/compactador-hidraulico/poster.webp",
    contactShadowUrl: "/models/equipamentos/compactador-hidraulico/sombra-contato.png",
    contactShadowSize: { width: 2.6, depth: 2.0 },
    environmentIntensity: 1.75,
    displayName: {
      pt: "Compactador Hidráulico",
      en: "Hydraulic Compactor",
    },
    camera: {
      azimuthDeg: 40,
      elevationDeg: 14,
      fov: 26,
      padding: 1.3,
      targetYOffsetRatio: 0.02,
    },
    label: {
      pt: "Modelo 3D interativo do Compactador Hidráulico",
      en: "Interactive 3D model of the Hydraulic Compactor",
    },
    posterAlt: {
      pt: "Compactador Hidráulico em perspectiva de três quartos",
      en: "Hydraulic Compactor in three-quarter perspective",
    },
  },
  // Instalação completa (prensa + esteira), bem maior que as demais: pivô próprio
  // no eixo da prensa e enquadramento pela geometria. A variante do fabricante
  // não foi comprovada: não citar modelo nem medidas.
  "prensas-horizontais": {
    productId: "prensas-horizontais",
    assetSlug: "prensa-horizontal",
    glbUrl: "/models/equipamentos/prensa-horizontal/modelo.glb",
    posterUrl: "/models/equipamentos/prensa-horizontal/poster.webp",
    contactShadowUrl: "/models/equipamentos/prensa-horizontal/sombra-contato.png",
    contactShadowSize: { width: 15, depth: 12 },
    environmentIntensity: 1.75,
    displayName: {
      pt: "Prensa Horizontal Austropressen",
      en: "Austropressen Horizontal Baler",
    },
    camera: {
      azimuthDeg: -36,
      elevationDeg: 26,
      fov: 26,
      padding: 1.3,
      targetYOffsetRatio: -0.11,
      pivot: { x: 0, z: -1.8 },
      fitToGeometry: true,
      elevationRangeDeg: { below: 14, above: 8 },
    },
    // A câmera da coreografia fica do mesmo lado dos demais (az ~36–40); o giro de
    // 74° do modelo mostra a vista do catálogo (-36°): canal, corpo e curva da esteira.
    // A 0,46 ela fica da altura do compactador hidráulico, em vez de 12 m ao lado
    // de máquinas de 1,6 m.
    choreography: {
      scale: 0.46,
      azimuthDeg: 38,
      elevationDeg: 18,
      yawDeg: 74,
      swayDeg: 10,
      pivot: { x: -0.25, z: -1.98 },
      targetYOffsetRatio: -0.142,
      fillWidth: 0.87,
      fillHeight: 0.86,
      sideVisibleFrac: 0.42,
      sideDepth: 4.2,
    },
    label: {
      pt: "Modelo 3D interativo da Prensa Horizontal Austropressen com esteira de alimentação",
      en: "Interactive 3D model of the Austropressen Horizontal Baler with feed conveyor",
    },
    posterAlt: {
      pt: "Prensa Horizontal Austropressen em perspectiva de três quartos, com esteira de alimentação inclinada e canal de saída dos fardos",
      en: "Austropressen Horizontal Baler in three-quarter perspective, with inclined feed conveyor and bale output channel",
    },
  },
  // Reconstruída a partir da máquina real fotografada na Almeida. A variante do
  // fabricante não foi comprovada e a escala é estimada: não citar modelo nem medidas.
  // Painel à esquerda e conjunto vermelho à direita: só azimutes positivos moderados
  // mostram os dois sem que um encubra o outro ou a tremonha esconda o painel.
  crocodile: {
    productId: "crocodile",
    assetSlug: "heger-crocodile",
    glbUrl: "/models/equipamentos/heger-crocodile/modelo.glb",
    posterUrl: "/models/equipamentos/heger-crocodile/poster.webp",
    contactShadowUrl: "/models/equipamentos/heger-crocodile/sombra-contato.png",
    contactShadowSize: { width: 5.4, depth: 3.0 },
    environmentIntensity: 1.65,
    displayName: {
      pt: "Heger Crocodile",
      en: "Heger Crocodile",
    },
    camera: {
      azimuthDeg: 26,
      elevationDeg: 13,
      fov: 26,
      padding: 1.3,
      targetYOffsetRatio: -0.01,
      fitToGeometry: true,
      elevationRangeDeg: { below: 8, above: 14 },
      mobile: { azimuthDeg: 32, fill: 0.94 },
    },
    // Câmera do mesmo lado dos demais; o giro de 12° ± 12° deixa a vista entre 14° e
    // 38° da frente do modelo: abre a tremonha e o conjunto vermelho, painel sempre livre.
    choreography: {
      scale: 1,
      azimuthDeg: 38,
      elevationDeg: 13,
      yawDeg: 12,
      swayDeg: 12,
      pivot: { x: 0, z: 0 },
      targetYOffsetRatio: 0,
      fillWidth: 0.84,
      fillHeight: 0.86,
      sideVisibleFrac: 0.42,
      sideDepth: 1.2,
    },
    label: {
      pt: "Modelo 3D interativo da Heger Crocodile",
      en: "Interactive 3D model of the Heger Crocodile",
    },
    posterAlt: {
      pt: "Heger Crocodile em perspectiva de três quartos, com tremonha, painel elétrico lateral, canal horizontal e conjunto mecânico vermelho",
      en: "Heger Crocodile in three-quarter perspective, with hopper, side electrical cabinet, horizontal channel and red mechanical assembly",
    },
  },
};

export function getEquipment3DConfig(productId: string): Equipment3DConfig | null {
  return EQUIPMENT_3D_MODELS[productId] ?? null;
}

/**
 * Ordem da coreografia compartilhada (Home e Hero de Almeida Equipamentos).
 * Novos equipamentos aprovados entram nesta sequência apenas por configuração.
 */
export const CHOREOGRAPHY_SEQUENCE: string[] = [
  "compactador-fuso",
  "apv-90-100",
  "compactador-hidraulico",
  "prensas-horizontais",
  "crocodile",
];

export function getChoreographyConfigs(): Equipment3DConfig[] {
  return CHOREOGRAPHY_SEQUENCE.map((id) => EQUIPMENT_3D_MODELS[id]).filter(
    (item): item is Equipment3DConfig => Boolean(item)
  );
}
