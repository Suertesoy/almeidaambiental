/**
 * Configuração central da timeline de scroll -> vídeo da Home.
 *
 * Edite APENAS os tempos abaixo para ajustar os pontos das nove dobras.
 * Os valores são segundos decimais do vídeo (ex.: 2.13 = 2,13s, não frame 13).
 *
 * O trecho entre "section-06" (7.28s) e "section-07" (10.21s) atravessa
 * naturalmente o antigo marcador 7.04s durante a reprodução — ele deixou de
 * ser uma parada de dobra, mas o vídeo não pula esse trecho.
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
  { id: "section-06", time: 7.28 },
  { id: "section-07", time: 10.21 },
  { id: "section-08", time: 12.1 },
  { id: "section-09", time: 15.0 },
];
