"use client";

import styles from "./historia.module.css";
import TimelineEventRow from "./TimelineEventRow";
import { useLineProgress } from "./useLineProgress";
import { CHAPTER_META, TIMELINE_EVENTS, type Chapter } from "../../lib/historia-data";

const TONE_CLASS: Record<string, string> = {
  stone: styles.chapterStone,
  stoneAlt: styles.chapterStoneAlt,
  forest: styles.chapterForest,
};

/**
 * Um capítulo (ORIGEM, EVOLUÇÃO, EXPANSÃO ou NOVO CICLO): cabeçalho +
 * segmento próprio da régua/linha dourada. Os segmentos ficam lado a lado
 * no fluxo normal do documento, então a linha lê como um traço contínuo
 * mesmo sendo um <div> por capítulo (ver useLineProgress.ts).
 */
export default function ChapterSection({ chapter }: { chapter: Chapter }) {
  const meta = CHAPTER_META[chapter];
  const events = TIMELINE_EVENTS.filter((event) => event.chapter === chapter);
  const railRef = useLineProgress<HTMLDivElement>();

  return (
    <section className={`${styles.chapter} ${TONE_CLASS[meta.tone]}`} aria-labelledby={`chapter-${chapter}`}>
      <div className={styles.container}>
        <div className={styles.chapterLayout}>
          <header className={styles.chapterHead}>
            <span className={styles.chapterIndex}>{meta.index} / 04</span>
            <p className={styles.eyebrow}>{meta.eyebrow}</p>
            <h2 id={`chapter-${chapter}`} className={styles.chapterHeadline}>
              {meta.headline}
            </h2>
          </header>

          <div className={styles.spine}>
            <div ref={railRef} className={styles.rail} aria-hidden="true">
              <div className={styles.railTrack} />
              <div className={styles.railFill} />
            </div>

            {events.map((event) => (
              <TimelineEventRow key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
