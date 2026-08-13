/**
 * Configuração central da timeline de scroll -> vídeo da Home.
 *
 * Edite APENAS os tempos abaixo para ajustar os pontos das dez dobras.
 * Os valores são segundos decimais do vídeo (ex.: 2.13 = 2,13s, não frame 13).
 */
export type ScrollStop = {
  id: string;
  time: number;
};

export const SCROLL_STOPS: ScrollStop[] = [
  { id: "section-01", time: 0.0 },
  { id: "section-02", time: 2.13 },
  { id: "section-03", time: 4.03 },
  { id: "section-04", time: 5.09 },
  { id: "section-05", time: 6.13 },
  { id: "section-06", time: 7.04 },
  { id: "section-07", time: 7.28 },
  { id: "section-08", time: 10.21 },
  { id: "section-09", time: 12.1 },
  { id: "section-10", time: 15.0 },
];

/**
 * Cada dobra ocupa exatamente uma altura de viewport (100svh) na faixa de
 * scroll, e o CSS scroll-snap decide onde a página encaixa. O vídeo apenas
 * interpola entre os tempos das duas dobras adjacentes à posição atual.
 */
export function getVideoTimeForPosition(continuousPosition: number): number {
  const maxIndex = SCROLL_STOPS.length - 1;
  const clamped = Math.min(Math.max(continuousPosition, 0), maxIndex);
  const fromIndex = Math.min(Math.floor(clamped), maxIndex - 1 < 0 ? 0 : maxIndex - 1);
  const toIndex = Math.min(fromIndex + 1, maxIndex);
  const progress = clamped - fromIndex;

  const fromTime = SCROLL_STOPS[fromIndex].time;
  const toTime = SCROLL_STOPS[toIndex].time;
  return fromTime + (toTime - fromTime) * progress;
}
