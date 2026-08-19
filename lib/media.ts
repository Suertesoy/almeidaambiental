/**
 * Tipo central de mídia editorial das páginas de empresa (Almeida Ambiental,
 * Almeida Equipamentos, Saturno Ambiental) — mesmo princípio de
 * `HistoriaImage` em `lib/historia-data.ts`: um único formato para que
 * imagens/vídeos ilustrativos possam ser substituídos por acervo real do
 * Grupo Almeida depois, sem mudar componentes ou estrutura de página.
 */

export type ImageSourceType = "illustrative" | "illustrative-3d" | "archive";

export type Company = "almeida-ambiental" | "almeida-equipamentos" | "saturno-ambiental";

export type EditorialImage = {
  src: string;
  alt: string;
  /** Legenda pública opcional (ex.: "Visualização ilustrativa"). */
  caption?: string;
  sourceType: ImageSourceType;
  company: Company;
  /** Onde/para que esta imagem é usada nesta página (ex.: "hero", "pilar-coleta"). */
  purpose: string;
  orientation?: "landscape" | "portrait";
};

export const img = (
  company: Company,
  purpose: string,
  src: string,
  alt: string,
  orientation: EditorialImage["orientation"] = "landscape"
): EditorialImage => ({
  src,
  alt,
  sourceType: "illustrative",
  company,
  purpose,
  orientation,
});
