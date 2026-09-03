"use client";

import styles from "./historia.module.css";
import { useReveal } from "./useReveal";
import { MAP_LOCATIONS } from "../../lib/historia-data";
import { SC_OUTLINE_PATH, SC_VIEWBOX, TERRITORY_POINTS } from "../../lib/geo-santa-catarina";

/**
 * Mapa de expansão (Seção 11) — reaproveita a MESMA malha territorial real
 * do IBGE que TerritoryMap.tsx já usa (ver lib/geo-santa-catarina.ts), em
 * vez do traçado abstrato desenhado à mão que existia aqui antes. Nada é
 * duplicado: o contorno e as coordenadas continuam vivendo só naquele
 * arquivo, e este componente só importa e projeta.
 *
 * As cinco cidades de MAP_LOCATIONS (historia-data.ts) são, felizmente, as
 * MESMAS cinco de TERRITORY_POINTS — por isso a coordenada real de cada
 * uma é resolvida aqui por nome, mas a ordem de renderização, o ano e o
 * atraso escalonado da animação continuam vindo de MAP_LOCATIONS, na ordem
 * cronológica de chegada do grupo. Os pontos entram em cena com a mesma
 * revelação de antes (dispara uma vez, ao entrar na viewport).
 */
const REAL_COORDS: Record<string, { x: number; y: number }> = Object.fromEntries(
  TERRITORY_POINTS.map((point) => [point.name, { x: point.x, y: point.y }])
);

/**
 * Ajuste de rótulo por cidade — mesma necessidade que TerritoryMap.tsx já
 * documenta no próprio cabeçalho: quatro das cinco localidades ficam no
 * leste do estado, e Joinville/Araquari caem a menos de 27 unidades uma da
 * outra. Sem este ajuste, o nome+ano de um ponto passa por cima do outro,
 * e o texto de quem está mais a leste (São José, Araquari) atravessa a
 * borda direita do viewBox. `side` decide para que lado o texto cresce a
 * partir do ponto; `nameDy`/`yearDy` deslocam o bloco verticalmente
 * quando dois pontos estão perto demais para os dois usarem o mesmo lado.
 */
const LABEL_LAYOUT: Record<string, { side: "start" | "end"; nameDy: number; yearDy: number }> = {
  "Chapecó": { side: "start", nameDy: 14, yearDy: 40 },
  Joinville: { side: "end", nameDy: -38, yearDy: -12 },
  Araquari: { side: "end", nameDy: 40, yearDy: 66 },
  Blumenau: { side: "end", nameDy: 14, yearDy: 40 },
  "São José": { side: "end", nameDy: 14, yearDy: 40 },
};

export default function ExpansionMap() {
  const { ref, active } = useReveal<HTMLDivElement>(0.4);

  return (
    <section className={`${styles.mapSection} ${styles.chapterForest}`} aria-labelledby="map-heading">
      <div className={styles.container}>
        <div className={styles.spineBridgeOuter}>
          <div className={styles.spineBridge} aria-hidden="true">
            <span className={styles.spineBridgeLine} />
          </div>
        </div>

        <div className={styles.mapLayout}>
          <div>
            <p className={styles.eyebrow}>Presença em Santa Catarina</p>
            <h2 id="map-heading" className={styles.chapterHeadline}>
              De São José a uma presença cada vez maior no estado.
            </h2>
          </div>

          <div>
            <div ref={ref} className={styles.mapFrame}>
              <svg
                className={styles.mapSvg}
                viewBox={`0 0 ${SC_VIEWBOX.width} ${SC_VIEWBOX.height}`}
                role="img"
                aria-label="Mapa de Santa Catarina com as cidades onde o Grupo Almeida opera"
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
            <p className={styles.mapCaption}>
              Contorno de Santa Catarina a partir da malha territorial oficial do IBGE. Os pontos marcam a ordem
              cronológica de chegada do grupo em cada cidade.
            </p>
          </div>
        </div>

        <div className={styles.spineBridgeOuter}>
          <div className={styles.spineBridge} aria-hidden="true">
            <span className={styles.spineBridgeLine} />
          </div>
        </div>
      </div>
    </section>
  );
}
