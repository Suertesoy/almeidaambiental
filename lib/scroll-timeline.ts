/**
 * Configuração central da timeline de scroll -> vídeo da Home.
 *
 * Edite APENAS os tempos abaixo para ajustar os pontos das nove dobras.
 * Os valores são segundos decimais do vídeo (ex.: 3.07 = 3,07s, não frame 7;
 * confirmado via mp4 box (mdhd/stts): 30fps, 450 frames, 15s de duração —
 * a notação "M:FF" usada na entrega de design não se aplica aqui, os nomes
 * dos arquivos exportados do Figma eram apenas timestamps de captura de
 * tela, não timecodes do vídeo).
 *
 * Cada tempo abaixo foi conferido pixel a pixel: os frames do vídeo real
 * (extraídos em grade fina via Playwright) foram comparados com os
 * screenshots de referência embutidos no Figma (página "04 · UI", frame
 * "Frame 11") para cada dobra. Único ponto que exigia esse ajuste:
 * "section-06" (Saturno Ambiental, dobra 1) estava em 10.00s, tempo que cai
 * dentro do trecho da esteira/rampa dentro do galpão — o caminhão da
 * Saturno em ambiente externo (referência real da dobra) está por volta de
 * 7.80s, entre o gancho do container (dobra 5, 7.28s) e o trecho de
 * containers empilhados (dobra 7, 11.12s).
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
  { id: "section-06", time: 7.8 },
  { id: "section-07", time: 11.12 },
  { id: "section-08", time: 12.17 },
  { id: "section-09", time: 14.2 },
];
