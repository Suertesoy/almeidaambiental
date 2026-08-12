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
 * Quanto de scroll (em unidades "svh") a dobra 1 reserva antes do vídeo
 * começar a avançar. Dá espaço para ler o conteúdo da primeira dobra.
 */
const DWELL_VH = 70;

/** Quantos "svh" de scroll cada segundo de vídeo consome nas transições. */
const VH_PER_SECOND = 40;

/**
 * Piso mínimo de scroll por transição, para transições muito curtas
 * (ex.: dobra 6 -> 7, de apenas 0,24s) não ficarem impossíveis de controlar.
 */
const MIN_TRANSITION_VH = 40;

export type TimelineCheckpoint = {
  vh: number;
  time: number;
};

export type Timeline = {
  /** Checkpoints em ordem crescente de "vh" percorrido. */
  checkpoints: TimelineCheckpoint[];
  /** "vh" total de scroll percorrido até o fim da timeline. */
  totalVh: number;
  /** "vh" reservado ao repouso da dobra 1. */
  dwellVh: number;
  /** Posição em "vh" (a partir do topo da faixa de scroll) de cada uma das dez dobras. */
  anchorsVh: number[];
};

export function buildTimeline(): Timeline {
  const checkpoints: TimelineCheckpoint[] = [
    { vh: 0, time: SCROLL_STOPS[0].time },
    { vh: DWELL_VH, time: SCROLL_STOPS[0].time },
  ];

  let cumulative = DWELL_VH;
  for (let i = 1; i < SCROLL_STOPS.length; i += 1) {
    const delta = SCROLL_STOPS[i].time - SCROLL_STOPS[i - 1].time;
    const vh = Math.max(MIN_TRANSITION_VH, delta * VH_PER_SECOND);
    cumulative += vh;
    checkpoints.push({ vh: cumulative, time: SCROLL_STOPS[i].time });
  }

  const anchorsVh = checkpoints.slice(1).map((checkpoint) => checkpoint.vh);

  return { checkpoints, totalVh: cumulative, dwellVh: DWELL_VH, anchorsVh };
}

/** Interpola o tempo de vídeo (segundos) para uma posição de scroll (em "vh"). */
export function getVideoTimeAt(scrolledVh: number, checkpoints: TimelineCheckpoint[]): number {
  const first = checkpoints[0];
  const last = checkpoints[checkpoints.length - 1];
  if (scrolledVh <= first.vh) return first.time;
  if (scrolledVh >= last.vh) return last.time;

  for (let i = 1; i < checkpoints.length; i += 1) {
    const prev = checkpoints[i - 1];
    const curr = checkpoints[i];
    if (scrolledVh <= curr.vh) {
      const span = curr.vh - prev.vh;
      const ratio = span === 0 ? 0 : (scrolledVh - prev.vh) / span;
      return prev.time + (curr.time - prev.time) * ratio;
    }
  }
  return last.time;
}
