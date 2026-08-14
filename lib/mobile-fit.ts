const REFERENCE_VIEWPORT = 393;
const FLOOR_VIEWPORT = 360;

function scaleClamp(px: number): string {
  const floorPx = +((px * FLOOR_VIEWPORT) / REFERENCE_VIEWPORT).toFixed(2);
  const vw = +((px / REFERENCE_VIEWPORT) * 100).toFixed(4);
  return `clamp(${floorPx}px, ${vw}vw, ${px}px)`;
}

export function mf(px: number): string {
  return scaleClamp(px);
}
