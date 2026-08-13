/**
 * Escala responsiva do layout mobile fiel ao Figma (referência 393px).
 *
 * Os valores de largura/posição/tamanho de fonte da tarefa foram medidos
 * para 393px. Em vez de escalar a página inteira com transform (proibido
 * pela tarefa), cada dimensão usa clamp(): entre 360px e 393px de
 * viewport ela encolhe proporcionalmente ao vw (evitando overflow
 * horizontal e preservando a composição), e a partir de 393px fica travada
 * no valor exato do Figma — nunca cresce em telas maiores (394 a 430px).
 */
const REFERENCE_VIEWPORT = 393;
const FLOOR_VIEWPORT = 360;

function scaleClamp(px: number): string {
  const floorPx = +((px * FLOOR_VIEWPORT) / REFERENCE_VIEWPORT).toFixed(2);
  const vw = +((px / REFERENCE_VIEWPORT) * 100).toFixed(4);
  return `clamp(${floorPx}px, ${vw}vw, ${px}px)`;
}

/** Para largura, posição (marginLeft) e tamanho de fonte — sempre valores
 *  positivos nesta Home. */
export function mf(px: number): string {
  return scaleClamp(px);
}
