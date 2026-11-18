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
};

export type Equipment3DConfig = {
  /** ID correspondente ao catálogo em lib/equipamentos-data.ts. */
  productId: string;
  /** Pasta estável em public/models/equipamentos/. */
  assetSlug: "apv-100" | "compactador-fuso" | "compactador-hidraulico";
  glbUrl: string;
  posterUrl: string;
  contactShadowUrl: string;
  contactShadowSize: {
    width: number;
    depth: number;
  };
  /** Intensidade da iluminação de estúdio (baseada em estudio.js). */
  environmentIntensity: number;
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
    camera: {
      azimuthDeg: 36,
      elevationDeg: 18,
      fov: 24,
      padding: 1.22,
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
    camera: {
      azimuthDeg: 34,
      elevationDeg: 10,
      fov: 22,
      padding: 1.22,
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
    glbUrl: "/models/equipamentos/compactador-hidraulico/modelo.glb",
    posterUrl: "/models/equipamentos/compactador-hidraulico/poster.webp",
    contactShadowUrl: "/models/equipamentos/compactador-hidraulico/sombra-contato.png",
    contactShadowSize: { width: 2.6, depth: 2.0 },
    environmentIntensity: 1.75,
    camera: {
      azimuthDeg: 40,
      elevationDeg: 14,
      fov: 25,
      padding: 1.2,
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
};

export function getEquipment3DConfig(productId: string): Equipment3DConfig | null {
  return EQUIPMENT_3D_MODELS[productId] ?? null;
}
