/**
 * Configuração central da timeline de scroll -> vídeo da Home.
 *
 * Edite APENAS os tempos abaixo para ajustar os pontos das nove dobras.
 * Os valores são segundos decimais do vídeo (ex.: 3.07 = 3,07s, não frame 7).
 *
 * "section-01" (1.00s) não é o início literal do vídeo: ao carregar a Home,
 * o vídeo reproduz automaticamente de 0.00s até este tempo (ver o efeito de
 * reprodução inicial em ScrollVideoExperience.tsx) e só então a dobra 1 fica
 * estável neste stop — a partir daí ele se comporta como qualquer outro.
 */
export type ScrollStop = {
  id: string;
  time: number;
};

export const SCROLL_STOPS: ScrollStop[] = [
  { id: "section-01", time: 1.0 },
  { id: "section-02", time: 3.07 },
  { id: "section-03", time: 5.17 },
  { id: "section-04", time: 6.17 },
  { id: "section-05", time: 7.28 },
  { id: "section-06", time: 10.0 },
  { id: "section-07", time: 11.12 },
  { id: "section-08", time: 12.17 },
  { id: "section-09", time: 14.2 },
];
