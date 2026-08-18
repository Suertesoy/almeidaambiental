"use client";

import styles from "./historia.module.css";
import { useReveal } from "./useReveal";
import { MAP_LOCATIONS } from "../../lib/historia-data";

/**
 * Mapa leve e estilizado (Seção 11) — um SVG próprio, sem biblioteca de
 * mapas e sem pretensão cartográfica: o contorno é uma forma editorial
 * abstrata, não o desenho técnico de Santa Catarina, e a legenda deixa
 * isso explícito. Os pontos entram em cena por ordem cronológica de
 * chegada do grupo em cada cidade, todos com a mesma revelação (dispara
 * uma vez, ao entrar na viewport) — sem depender de posição fina de
 * scroll por ponto, o que exigiria observers demais para o ganho visual.
 */
export default function ExpansionMap() {
  const { ref, active } = useReveal<HTMLDivElement>(0.4);

  return (
    <section className={`${styles.mapSection} ${styles.chapterForest}`} aria-labelledby="map-heading">
      <div className={styles.container}>
        <div className={styles.mapLayout}>
          <div>
            <p className={styles.eyebrow}>Presença em Santa Catarina</p>
            <h2 id="map-heading" className={styles.chapterHeadline}>
              De São José a uma presença cada vez maior no estado.
            </h2>
          </div>

          <div>
            <div ref={ref} className={styles.mapFrame}>
              <svg className={styles.mapSvg} viewBox="0 0 100 100" role="img" aria-label="Mapa estilizado de Santa Catarina com as cidades onde o Grupo Almeida opera">
                <path
                  className={styles.mapOutline}
                  d="M22,14 C42,6 66,12 71,28 C80,47 76,66 64,81 C54,93 33,95 19,84 C6,74 6,50 9,35 C11,21 14,19 22,14 Z"
                />
                {MAP_LOCATIONS.map((point, index) => (
                  <g
                    key={point.name}
                    className={`${styles.mapPoint} ${active ? styles.mapPointActive : ""}`}
                    style={{ transitionDelay: `${index * 140}ms` }}
                  >
                    <circle className={styles.mapDot} cx={point.x} cy={point.y} r="1.8" />
                    <text className={styles.mapPointLabel} x={point.x + 3} y={point.y + 1.2}>
                      {point.name}
                    </text>
                    <text className={styles.mapPointYear} x={point.x + 3} y={point.y + 4.6}>
                      {point.year}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
            <p className={styles.mapCaption}>Mapa editorial estilizado, sem escala geográfica exata.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
