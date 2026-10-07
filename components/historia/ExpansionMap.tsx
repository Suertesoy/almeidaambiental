"use client";

import styles from "./historia.module.css";
import { useReveal } from "./useReveal";
import { MAP_LOCATIONS } from "../../lib/historia-data";
import { SC_OUTLINE_PATH, SC_VIEWBOX, TERRITORY_POINTS } from "../../lib/geo-santa-catarina";
import type { Locale } from "../../lib/i18n/locale";

const COPY = {
  pt: {
    mapAriaLabel: "Mapa de Santa Catarina com as cidades onde o Grupo Almeida opera",
    caption:
      "Contorno de Santa Catarina a partir da malha territorial oficial do IBGE. Os pontos marcam a ordem cronológica de chegada do grupo em cada cidade.",
  },
  en: {
    mapAriaLabel: "Map of Santa Catarina with the cities where Grupo Almeida operates",
    caption:
      "Outline of Santa Catarina based on IBGE's official territorial data. The points mark the chronological order in which the group arrived in each city.",
  },
} as const;

/**
 * Mapa de expansão — reaproveita a MESMA malha territorial real do IBGE que
 * TerritoryMap.tsx já usa (ver lib/geo-santa-catarina.ts). Nada é
 * duplicado: o contorno e as coordenadas continuam vivendo só naquele
 * arquivo, e este componente só importa e projeta.
 *
 * Deixou de ser uma seção própria (com eyebrow e headline repetindo a
 * mensagem do capítulo de Expansão): é o lado visual do epílogo, dentro de
 * ClosingChapter. A headline do epílogo é quem fala; o mapa mostra.
 *
 * As cinco cidades de MAP_LOCATIONS (historia-data.ts) são as MESMAS cinco
 * de TERRITORY_POINTS — a coordenada real é resolvida por nome, mas a ordem
 * de renderização, o ano e o atraso escalonado da animação vêm de
 * MAP_LOCATIONS, na ordem cronológica de chegada do grupo.
 */
const REAL_COORDS: Record<string, { x: number; y: number }> = Object.fromEntries(
  TERRITORY_POINTS.map((point) => [point.name, { x: point.x, y: point.y }])
);

/**
 * Ajuste de rótulo por cidade — mesma necessidade que TerritoryMap.tsx já
 * documenta: quatro das cinco localidades ficam no leste do estado, e
 * Joinville/Araquari caem a menos de 27 unidades uma da outra. `side`
 * decide para que lado o texto cresce a partir do ponto; `nameDy`/`yearDy`
 * deslocam o bloco verticalmente quando dois pontos estão perto demais.
 */
const LABEL_LAYOUT: Record<string, { side: "start" | "end"; nameDy: number; yearDy: number }> = {
  "Chapecó": { side: "start", nameDy: 14, yearDy: 40 },
  Joinville: { side: "end", nameDy: -38, yearDy: -12 },
  Araquari: { side: "end", nameDy: 40, yearDy: 66 },
  Blumenau: { side: "end", nameDy: 14, yearDy: 40 },
  "São José": { side: "end", nameDy: 14, yearDy: 40 },
};

export default function ExpansionMap({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const { ref, active } = useReveal<HTMLDivElement>(0.4);

  return (
    <div>
      <div ref={ref} className={styles.mapFrame}>
        <svg
          className={styles.mapSvg}
          viewBox={`0 0 ${SC_VIEWBOX.width} ${SC_VIEWBOX.height}`}
          role="img"
          aria-label={t.mapAriaLabel}
        >
          <path className={styles.mapOutline} d={SC_OUTLINE_PATH} />
          {MAP_LOCATIONS.map((point, index) => {
            const real = REAL_COORDS[point.name];
            const layout = LABEL_LAYOUT[point.name];
            const dx = layout.side === "end" ? -18 : 18;
            return (
              <g
                key={point.name}
                className={`${styles.mapPoint} ${active ? styles.mapPointActive : ""}`}
                style={{ transitionDelay: `${index * 140}ms` }}
              >
                <circle className={styles.mapDot} cx={real.x} cy={real.y} r="8" />
                <text
                  className={styles.mapPointLabel}
                  x={real.x + dx}
                  y={real.y + layout.nameDy}
                  textAnchor={layout.side}
                >
                  {point.name}
                </text>
                <text
                  className={styles.mapPointYear}
                  x={real.x + dx}
                  y={real.y + layout.yearDy}
                  textAnchor={layout.side}
                >
                  {point.year}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <p className={styles.mapCaption}>{t.caption}</p>
    </div>
  );
}
