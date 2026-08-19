import Reveal from "../shared/Reveal";
import styles from "./almeida-ambiental.module.css";
import { PRESENCE_LOCATIONS } from "../../lib/almeida-ambiental-data";

/**
 * Mapa editorial estático de Santa Catarina para "Presença regional"
 * (Seção 13.4 da tarefa). Reaproveita só as coordenadas/traçado abstrato já
 * validados em lib/historia-data.ts (mesma linguagem cartográfica do site)
 * — não o componente, o mecanismo de scroll-reveal por ponto, nem qualquer
 * outra peça de /historia. Entrada única em fade (Reveal), sem stagger,
 * sem progresso ligado ao scroll. Nomes das cidades vêm de
 * PRESENCE_LOCATIONS (fonte única de conteúdo); só as coordenadas de
 * desenho vivem aqui.
 */
const COORDS: Record<string, { x: number; y: number }> = {
  "São José": { x: 34, y: 78 },
  Chapecó: { x: 10, y: 34 },
  Araquari: { x: 52, y: 16 },
  Joinville: { x: 58, y: 22 },
};

const CITIES = PRESENCE_LOCATIONS.map((name) => ({ name, ...COORDS[name] }));

const SATURNO_POINT = { name: "Blumenau", x: 46, y: 58 };

export default function RegionalMap() {
  return (
    <Reveal className={styles.mapFrame}>
      <svg
        className={styles.mapSvg}
        viewBox="0 0 100 100"
        role="img"
        aria-label="Mapa estilizado de Santa Catarina com a presença da Almeida Ambiental em São José, Chapecó, Araquari e Joinville, e da Saturno Ambiental em Blumenau"
      >
        <path
          className={styles.mapOutline}
          d="M22,14 C42,6 66,12 71,28 C80,47 76,66 64,81 C54,93 33,95 19,84 C6,74 6,50 9,35 C11,21 14,19 22,14 Z"
        />
        {CITIES.map((point) => (
          <g key={point.name} className={styles.mapPoint}>
            <circle className={styles.mapDot} cx={point.x} cy={point.y} r="1.8" />
            <text className={styles.mapPointLabel} x={point.x + 3} y={point.y + 1.2}>
              {point.name}
            </text>
          </g>
        ))}
        <g className={styles.mapPoint}>
          <circle className={styles.mapDotSaturno} cx={SATURNO_POINT.x} cy={SATURNO_POINT.y} r="1.6" />
          <text className={styles.mapPointLabel} x={SATURNO_POINT.x + 3} y={SATURNO_POINT.y + 1.2}>
            {SATURNO_POINT.name}
          </text>
          <text className={styles.mapPointNote} x={SATURNO_POINT.x + 3} y={SATURNO_POINT.y + 4.6}>
            Saturno Ambiental
          </text>
        </g>
      </svg>
      <p className={styles.mapCaption}>Mapa editorial estilizado, sem escala geográfica exata.</p>
      <ul className="sr-only">
        {[...CITIES, SATURNO_POINT].map((point) => (
          <li key={point.name}>{point.name}</li>
        ))}
      </ul>
    </Reveal>
  );
}
