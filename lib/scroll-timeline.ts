/**
 * Configuração central da timeline de scroll -> vídeo da Home.
 *
 * O vídeo atual (`public/videos/Video_Almeida_15_seg.mp4`, 15s, 30fps) é
 * PROVISÓRIO — será substituído por uma peça produzida especificamente para
 * este scrollytelling. Por isso os tempos abaixo não perseguem mais o frame
 * "perfeito" de cada dobra: são uma distribuição aproximadamente regular
 * (progresso normalizado do vídeo), só para testar o RITMO da experiência
 * — ver relação com scroll/vídeo/fade unificados em
 * ScrollVideoExperience.tsx. Quando o vídeo definitivo chegar, é só trocar
 * os `time` abaixo (e o `VIDEO_SRC`).
 *
 * "section-01" (0.80s) não é o início literal do vídeo: ao carregar a Home,
 * o vídeo reproduz automaticamente de 0.00s até este tempo (abertura de
 * ~800ms, ver o efeito de reprodução inicial em ScrollVideoExperience.tsx)
 * e só então a dobra 1 fica estável neste stop — a partir daí ela se
 * comporta como qualquer outro stop.
 */
export type ScrollStop = {
  id: string;
  time: number;
};

export const SCROLL_STOPS: ScrollStop[] = [
  { id: "section-01", time: 0.8 },
  { id: "section-02", time: 2.45 },
  { id: "section-03", time: 4.1 },
  { id: "section-04", time: 5.75 },
  { id: "section-05", time: 7.4 },
  { id: "section-06", time: 9.05 },
  { id: "section-07", time: 10.7 },
  { id: "section-08", time: 12.35 },
  { id: "section-09", time: 14.0 },
];
