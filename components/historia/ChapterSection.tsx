"use client";

import styles from "./historia.module.css";
import TimelineEventRow from "./TimelineEventRow";
import { useLineProgress } from "./useLineProgress";
import {
  CHAPTER_META,
  CHAPTER_META_EN,
  TIMELINE_EVENTS,
  TIMELINE_EVENTS_EN,
  type Chapter,
  type TimelineEvent,
} from "../../lib/historia-data";
import type { Locale } from "../../lib/i18n/locale";

const TONE_CLASS: Record<string, string> = {
  stone: styles.chapterStone,
  stoneAlt: styles.chapterStoneAlt,
  forest: styles.chapterForest,
};

/**
 * Agrupa os eventos em pares (esquerda | direita), na ordem cronológica.
 * O primeiro evento não forma par com outro evento: ele divide a primeira
 * linha com o cabeçalho do capítulo (ver ChapterSection). Um número ímpar
 * sobrando deixa o último evento sozinho, no lado esquerdo.
 */
function toPairs(events: TimelineEvent[]) {
  const pairs: TimelineEvent[][] = [];
  for (let i = 0; i < events.length; i += 2) pairs.push(events.slice(i, i + 2));
  return pairs;
}

/**
 * Um capítulo (ORIGEM, EVOLUÇÃO, EXPANSÃO ou NOVO CICLO): um segmento
 * próprio da régua/linha dourada, com o cabeçalho na coluna esquerda da
 * primeira linha e os eventos em pares abaixo. Os segmentos ficam lado a
 * lado no fluxo normal do documento, então a linha lê como um traço
 * contínuo mesmo sendo um <div> por capítulo (ver useLineProgress.ts).
 */
export default function ChapterSection({ chapter, locale }: { chapter: Chapter; locale: Locale }) {
  const meta = (locale === "en" ? CHAPTER_META_EN : CHAPTER_META)[chapter];
  const events = (locale === "en" ? TIMELINE_EVENTS_EN : TIMELINE_EVENTS).filter((event) => event.chapter === chapter);
  const [lead, ...rest] = events;
  const railRef = useLineProgress<HTMLDivElement>();

  return (
    <section className={`${styles.chapter} ${TONE_CLASS[meta.tone]}`} aria-labelledby={`chapter-${chapter}`}>
      <div className={styles.container}>
        <div className={styles.bridge} aria-hidden="true">
          <span className={styles.bridgeLine} />
        </div>

        <div className={styles.spine}>
          <div ref={railRef} className={styles.rail} aria-hidden="true">
            <div className={styles.railTrack} />
            <div className={styles.railFill} />
          </div>

          <div className={`${styles.pair} ${styles.pairLead}`}>
            <header className={styles.chapterHead}>
              <span className={styles.chapterIndex}>{meta.index} / 04</span>
              <p className={styles.eyebrow}>{meta.eyebrow}</p>
              <h2 id={`chapter-${chapter}`} className={styles.chapterHeadline}>
                {meta.headline}
              </h2>
            </header>
            {lead && <TimelineEventRow event={lead} locale={locale} side="right" />}
          </div>

          {toPairs(rest).map((pair) => (
            <div key={pair[0].id} className={styles.pair}>
              <TimelineEventRow event={pair[0]} locale={locale} side="left" />
              {pair[1] && <TimelineEventRow event={pair[1]} locale={locale} side="right" />}
            </div>
          ))}
        </div>

        <div className={styles.bridge} aria-hidden="true">
          <span className={styles.bridgeLine} />
        </div>
      </div>
    </section>
  );
}
