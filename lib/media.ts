/**
 * Tipo central de mídia editorial das páginas de empresa (Almeida Ambiental,
 * Almeida Equipamentos, Saturno Ambiental) — mesmo princípio de
 * `HistoriaImage` em `lib/historia-data.ts`: um único formato para que
 * imagens/vídeos ilustrativos possam ser substituídos por acervo real do
 * Grupo Almeida depois, sem mudar componentes ou estrutura de página.
 *
 * Rodada de refino editorial: o tipo passou a carregar também o que a
 * captação real vai precisar — composição alternativa de mobile, ponto de
 * enquadramento e proporção do slot. Nada disso cria placeholder: quando o
 * campo está ausente, o componente simplesmente não renderiza aquela
 * variante e a composição continua íntegra.
 */

export type ImageSourceType = "illustrative" | "illustrative-3d" | "archive";

export type Company = "almeida-ambiental" | "almeida-equipamentos" | "saturno-ambiental";

export type EditorialImage = {
  src: string;
  /**
   * Composição própria de mobile — não é um recorte automático do desktop.
   * Quando existe, é servida via <picture> abaixo de 768px; quando não
   * existe, o mesmo arquivo atende os dois, enquadrado por `objectPosition`.
   */
  mobileSrc?: string;
  alt: string;
  /** Legenda pública opcional (ex.: "Visualização ilustrativa"). */
  caption?: string;
  sourceType: ImageSourceType;
  company: Company;
  /** Onde/para que esta imagem é usada nesta página (ex.: "hero", "pilar-coleta"). */
  purpose: string;
  orientation?: "landscape" | "portrait";
  /** Enquadramento dentro do slot (object-position). O slot define a proporção. */
  objectPosition?: string;
};

export type ImageOptions = {
  mobileSrc?: string;
  objectPosition?: string;
  sourceType?: ImageSourceType;
  caption?: string;
};

export const img = (
  company: Company,
  purpose: string,
  src: string,
  alt: string,
  orientation: EditorialImage["orientation"] = "landscape",
  options: ImageOptions = {}
): EditorialImage => ({
  src,
  alt,
  sourceType: options.sourceType ?? "illustrative",
  company,
  purpose,
  orientation,
  mobileSrc: options.mobileSrc,
  objectPosition: options.objectPosition,
  caption: options.caption,
});

/**
 * Vídeo opcional de um item de catálogo (funcionamento do equipamento).
 * Enquanto `src` não existir, nenhum componente renderiza área de vídeo —
 * nada de "vídeo em breve".
 */
export type EditorialVideo = {
  src: string;
  poster?: string;
  /** Descrição do que o vídeo mostra — usada como rótulo acessível. */
  label: string;
};
