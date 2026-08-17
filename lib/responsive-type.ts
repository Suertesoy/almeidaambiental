/**
 * Sistema tipográfico/rítmico fluido da composição mobile+tablet (<1024px)
 * da Home — substitui `lib/mobile-fit.ts` (removido), que só escalava
 * left/width/font-size entre 360 e 393px (a "prancheta" citada na tarefa de
 * reconstrução da responsividade).
 *
 * Ideia central: cada headline/label é um "lockup" calibrado uma única vez
 * na referência 393px (Figma) — font-size, line-height, letter-spacing.
 * font-size vira uma curva fluida em clamp() ANCORADA em 393px (o valor em
 * 393px de largura é exatamente o valor do Figma — fidelidade da Seção 37
 * da tarefa —, não uma aproximação); line-height e letter-spacing deixam
 * de ser valores absolutos e passam a ser RAZÕES do próprio font-size
 * (unitless e `em`), então escalam junto automaticamente sem precisar de
 * três clamp()s independentes — um sistema, não três soltos.
 *
 * O mesmo raciocínio vale para o ritmo vertical: `rhythm()` recebe a
 * distância de referência (medida no frame 393×852) e devolve um
 * clamp(minPx, Xsvh, maxPx) — como Xsvh já é uma fração de 852 (a altura
 * do próprio frame de referência), o valor bate exatamente em 852px de
 * altura e comprime/expande com moderação fora dela, sem nunca
 * desaparecer nem inflar sem limite (Seção 12 da tarefa).
 */

const REFERENCE_WIDTH = 393;
/** Altura de referência do frame calibrado no Figma (393×852). */
const REFERENCE_HEIGHT = 852;

/**
 * clamp() cujo termo fluido é uma reta ancorada em dois pontos
 * (anchorVw, anchorPx) e (floorVw, floorPx) — diferente de um clamp()
 * "ingênuo" (min/max = os próprios extremos da reta), aqui os limites
 * externos do clamp (floorPx/ceilPx) podem ficar além desses dois pontos,
 * então a reta continua crescendo/encolhendo além da âncora até saturar
 * no floor/ceil. Isso garante um valor EXATO em `anchorVw` (a referência
 * do Figma) sem abrir mão de continuar variando fora dela.
 */
function anchoredClamp(
  floorPx: number,
  anchorPx: number,
  ceilPx: number,
  floorVw: number,
  anchorVw: number
): string {
  const slope = (anchorPx - floorPx) / (anchorVw - floorVw);
  const intercept = +(anchorPx - slope * anchorVw).toFixed(4);
  const vw = +(slope * 100).toFixed(4);
  const sign = intercept >= 0 ? "+" : "-";
  const term = intercept === 0 ? `${vw}vw` : `${Math.abs(intercept)}px ${sign} ${vw}vw`;
  const lo = Math.min(floorPx, ceilPx);
  const hi = Math.max(floorPx, ceilPx);
  return `clamp(${lo}px, ${term}, ${hi}px)`;
}

export type LockupTokens = {
  fontSize: string;
  lineHeight: number;
  letterSpacing: string;
};

/**
 * Deriva um lockup tipográfico fluido a partir dos valores calibrados em
 * 393px — em exatamente 393px de largura, `fontSize` resolve para
 * `refFontSizePx` (fidelidade pixel-a-pixel na viewport de calibração).
 * Abaixo/acima disso a curva encolhe/cresce até saturar em floor/ceil.
 */
export function lockup(
  refFontSizePx: number,
  refLineHeightPx: number,
  refLetterSpacingPx: number,
  opts: { floorScale?: number; ceilScale?: number } = {}
): LockupTokens {
  const { floorScale = 0.916, ceilScale = 1.28 } = opts;
  const floor = +(refFontSizePx * floorScale).toFixed(1);
  const ceil = +(refFontSizePx * ceilScale).toFixed(1);
  return {
    fontSize: anchoredClamp(floor, refFontSizePx, ceil, 340, REFERENCE_WIDTH),
    lineHeight: +(refLineHeightPx / refFontSizePx).toFixed(3),
    letterSpacing: `${+(refLetterSpacingPx / refFontSizePx).toFixed(4)}em`,
  };
}

/**
 * Distância vertical fluida entre dois blocos de uma dobra, a partir da
 * distância medida na referência 393×852 (ex.: diferença entre os `top`
 * antigos de dois elementos). Expressa em `svh`, então já é exata em
 * 852px de altura por construção — não é escala proporcional da tela
 * inteira, cada gap tem seu próprio floor/ceil, então dobras com "grande
 * espaço proposital" (ex.: Saturno Ambiental 1) comprimem/expandem no
 * mesmo ritmo relativo entre si, preservando a hierarquia, não o pixel.
 */
export function rhythm(refPx: number, opts: { floorScale?: number; ceilScale?: number } = {}): string {
  const { floorScale = 0.62, ceilScale = 1.55 } = opts;
  const vhShare = +((refPx / REFERENCE_HEIGHT) * 100).toFixed(3);
  const floor = Math.round(refPx * floorScale);
  const ceil = Math.round(refPx * ceilScale);
  return `clamp(${floor}px, ${vhShare}svh, ${ceil}px)`;
}

/** Padding-top do frame: nunca menos que a altura do header + respiro
 *  mínimo, mesmo quando `rhythm()` comprimiria mais que isso numa tela
 *  muito baixa. */
export function framePaddingTop(refTopPx: number): string {
  return `max(calc(var(--header-height) + 16px), ${rhythm(refTopPx)})`;
}

/**
 * Largura máxima fluida de um bloco de texto — ancorada em 393px como o
 * `lockup()` (largura exata da referência em 393px de viewport), cresce
 * até um teto de tablet e encolhe com moderação em telas bem estreitas
 * (360px), em vez de travar em 393px fixos como a prancheta antiga.
 */
export function contentWidth(refWidthPx: number, opts: { floorScale?: number; ceilScale?: number } = {}): string {
  // floorScale >= o floorScale de lockup() (0.916): a largura nunca pode
  // encolher mais rápido que a fonte, senão um título com white-space:
  // nowrap (Seção 18 da tarefa: não deixar o navegador quebrar título por
  // conta própria) passaria a vazar do próprio contêiner em telas estreitas.
  const { floorScale = 0.95, ceilScale = 1.6 } = opts;
  const floor = +(refWidthPx * floorScale).toFixed(1);
  const ceil = +(refWidthPx * ceilScale).toFixed(1);
  return `min(${anchoredClamp(floor, refWidthPx, ceil, 340, REFERENCE_WIDTH)}, 88vw)`;
}
