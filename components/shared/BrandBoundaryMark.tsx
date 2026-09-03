import styles from "./BrandBoundaryMark.module.css";
import { BRAND_BOUNDARIES, type BrandBoundaryId } from "../../lib/brand-boundaries";

/** Metade da fronteira: a seção que termina ou a seção que começa. */
export type BrandBoundaryHalf = "leaving" | "entering";

/** Superfície onde ESTA metade é pintada (não a superfície da outra). */
export type BrandBoundarySurface = "onDark" | "onLight";

/**
 * Os SVGs oficiais do símbolo isolado, já usados por BrandWatermark — não
 * existe outro símbolo vetorial no repositório. Verificado: o bloco de
 * símbolo dentro das assinaturas oficiais de Almeida Ambiental, Almeida
 * Equipamentos e Saturno Ambiental (public/brand/logos/*.svg) é
 * byte-a-byte o mesmo desenho, então "o símbolo da empresa que entra" e "o
 * símbolo do Grupo" são, oficialmente, a mesma peça. Nada é redesenhado,
 * recriado ou rasterizado aqui.
 */
const SRC: Record<BrandBoundarySurface, string> = {
  onDark: "/brand/simbolo-grupo-almeida-white.svg",
  onLight: "/brand/simbolo-grupo-almeida-color.svg",
};

const HALF_CLASS: Record<BrandBoundaryHalf, string> = {
  leaving: styles.leaving,
  entering: styles.entering,
};

/**
 * Classe que a seção hospedeira precisa carregar para conter e recortar
 * uma metade de fronteira. Exportada daqui (em vez de duplicada em cada
 * módulo de página) porque o recorte e a ordem de pintura fazem parte do
 * contrato do componente, não do layout de quem consome.
 */
export const boundarySurface = styles.surface;

/**
 * Assinatura visual de transição entre territórios do Grupo Almeida.
 *
 * Uma fronteira é sempre declarada em DUAS seções adjacentes com o mesmo
 * `boundary`: `half="leaving"` na seção que termina e `half="entering"` na
 * que começa. O lado (esquerda/direita) vem do registro em
 * lib/brand-boundaries.ts justamente para que as duas metades não possam
 * divergir. `surface` é local a cada metade — a mesma fronteira pode ser
 * branca de um lado e colorida do outro, porque cada lado é uma superfície
 * diferente.
 *
 * Uma metade pode aparecer sozinha quando a seção vizinha não pode
 * hospedar a sua (ex.: o Hero em vídeo da Home): o símbolo então emerge da
 * borda em vez de atravessá-la — decisão de composição, não fallback.
 *
 * Decorativo: fora da árvore semântica, sem interação, sempre atrás do
 * conteúdo real da seção.
 */
export default function BrandBoundaryMark({
  boundary,
  half,
  surface,
}: {
  boundary: BrandBoundaryId;
  half: BrandBoundaryHalf;
  surface: BrandBoundarySurface;
}) {
  const { side } = BRAND_BOUNDARIES[boundary];

  return (
    <img
      src={SRC[surface]}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={`${styles.mark} ${HALF_CLASS[half]} ${styles[side]} ${styles[surface]}`}
    />
  );
}
