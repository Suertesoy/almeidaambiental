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
};

export type Equipment3DConfig = {
  /** ID correspondente ao catálogo em lib/equipamentos-data.ts. */
  productId: string;
  /** Pasta estável em public/models/equipamentos/. */
  assetSlug: "apv-100" | "compactador-fuso" | "compactador-hidraulico" | "prensa-horizontal";
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
      pt: "Prensa Horizontal",
      en: "Horizontal Baler",
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
    label: {
      pt: "Modelo 3D interativo da Prensa Horizontal Austropressen com esteira de alimentação",
      en: "Interactive 3D model of the Austropressen Horizontal Baler with feed conveyor",
    },
    posterAlt: {
      pt: "Prensa Horizontal Austropressen em perspectiva de três quartos, com esteira de alimentação inclinada e canal de saída dos fardos",
      en: "Austropressen Horizontal Baler in three-quarter perspective, with inclined feed conveyor and bale output channel",
    },
  },
};

export function getEquipment3DConfig(productId: string): Equipment3DConfig | null {
  return EQUIPMENT_3D_MODELS[productId] ?? null;
}

/**
 * Ordem da coreografia compartilhada (Home e Hero de Almeida Equipamentos).
 * Novos equipamentos aprovados entram nesta sequência apenas por configuração.
 * "prensas-horizontais" já está em EQUIPMENT_3D_MODELS, mas fica fora da sequência
 * até a avaliação das proporções no catálogo; para ativar, basta incluir o id aqui.
 */
export const CHOREOGRAPHY_SEQUENCE: string[] = [
  "compactador-fuso",
  "apv-90-100",
  "compactador-hidraulico",
];

export function getChoreographyConfigs(): Equipment3DConfig[] {
  return CHOREOGRAPHY_SEQUENCE.map((id) => EQUIPMENT_3D_MODELS[id]).filter(
    (item): item is Equipment3DConfig => Boolean(item)
  );
}
