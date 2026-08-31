/**
 * Registro central das quatro marcas do Grupo Almeida — fonte única de
 * nome acessível, rota e variantes oficiais de logo (ver
 * public/brand/logos/, cópias planas dos arquivos oficiais entregues em
 * public/brand/LOGO COMPLETO-... — a pasta original permanece intacta
 * como biblioteca-fonte; o código só referencia estas cópias para evitar
 * espaços/hífens duplos em path). Consumido por Header (contexto do
 * header + seletor do menu) e por HomePage (assinatura das três
 * primeiras dobras de empresa).
 */

export type BrandId = "grupo-almeida" | "almeida-ambiental" | "almeida-equipamentos" | "saturno-ambiental";

export type BrandLogoVariant = "original" | "branca" | "preta";

export type Brand = {
  id: BrandId;
  name: string;
  href: string;
  logos: Record<BrandLogoVariant, string>;
};

export const BRANDS: Record<BrandId, Brand> = {
  "grupo-almeida": {
    id: "grupo-almeida",
    name: "Grupo Almeida",
    href: "/",
    logos: {
      original: "/brand/logos/grupo-almeida-original.svg",
      branca: "/brand/logos/grupo-almeida-branca.svg",
      preta: "/brand/logos/grupo-almeida-preta.svg",
    },
  },
  "almeida-ambiental": {
    id: "almeida-ambiental",
    name: "Almeida Ambiental",
    href: "/almeida-ambiental",
    logos: {
      original: "/brand/logos/almeida-ambiental-original.svg",
      branca: "/brand/logos/almeida-ambiental-branca.svg",
      preta: "/brand/logos/almeida-ambiental-preta.svg",
    },
  },
  "almeida-equipamentos": {
    id: "almeida-equipamentos",
    name: "Almeida Equipamentos",
    href: "/almeida-equipamentos",
    logos: {
      original: "/brand/logos/almeida-equipamentos-original.svg",
      branca: "/brand/logos/almeida-equipamentos-branca.svg",
      preta: "/brand/logos/almeida-equipamentos-preta.svg",
    },
  },
  "saturno-ambiental": {
    id: "saturno-ambiental",
    name: "Saturno Ambiental",
    href: "/saturno-ambiental",
    logos: {
      original: "/brand/logos/saturno-ambiental-original.svg",
      branca: "/brand/logos/saturno-ambiental-branca.svg",
      preta: "/brand/logos/saturno-ambiental-preta.svg",
    },
  },
};

/** Ordem oficial de exibição no menu expandido (Seção 5 da rodada de identidade). */
export const BRAND_ORDER: BrandId[] = [
  "grupo-almeida",
  "almeida-ambiental",
  "almeida-equipamentos",
  "saturno-ambiental",
];

/**
 * Contexto do header (Seção 3/4): qual marca representa a rota atual.
 * Sem sub-rotas dentro de cada empresa hoje, mas usa startsWith para não
 * quebrar se alguma for adicionada depois. Qualquer rota fora das três
 * empresas (Home, /contato, /historia, protótipos /home2-4) cai no Grupo
 * Almeida.
 */
export function getActiveBrandId(pathname: string): BrandId {
  if (pathname.startsWith("/almeida-ambiental")) return "almeida-ambiental";
  if (pathname.startsWith("/almeida-equipamentos")) return "almeida-equipamentos";
  if (pathname.startsWith("/saturno-ambiental")) return "saturno-ambiental";
  return "grupo-almeida";
}
