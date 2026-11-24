"use client";

import styles from "./historia.module.css";
import TimelineEventRow from "./TimelineEventRow";
import Reveal from "../shared/Reveal";
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
  const allEvents = locale === "en" ? TIMELINE_EVENTS_EN : TIMELINE_EVENTS;
  const events = allEvents.filter((event) => event.chapter === chapter);
  const [lead, ...rest] = events;
  const railRef = useLineProgress<HTMLDivElement>();

  // Alternância global de fotografias (esquerda → direita → esquerda...) sem reiniciar por capítulo
  let photoIndex = 0;
  const photoSideById = new Map<string, "left" | "right">();
  for (const ev of allEvents) {
    if (ev.image) {
      photoSideById.set(ev.id, photoIndex % 2 === 0 ? "left" : "right");
      photoIndex += 1;
    }
  }

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
            <Reveal className={styles.chapterHeadReveal}>
              <header className={styles.chapterHead}>
                <span className={styles.chapterIndex}>{meta.index} / 04</span>
                <p className={styles.eyebrow}>{meta.eyebrow}</p>
                <h2 id={`chapter-${chapter}`} className={styles.chapterHeadline}>
                  {meta.headline}
                </h2>
              </header>
            </Reveal>
            {lead && <TimelineEventRow event={lead} locale={locale} side="right" />}
          </div>

          {toPairs(rest).map((pair) => {
            const first = pair[0];
            const second = pair[1];
            const firstSide =
              photoSideById.get(first.id) ??
              (second && photoSideById.get(second.id) === "left" ? "right" : "left");
            const secondSide = firstSide === "left" ? "right" : "left";

            return (
              <div key={first.id} className={styles.pair}>
                <TimelineEventRow event={first} locale={locale} side={firstSide} />
                {second && (
                  <TimelineEventRow event={second} locale={locale} side={secondSide} staggered />
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.bridge} aria-hidden="true">
          <span className={styles.bridgeLine} />
        </div>
      </div>
    </section>
  );
}
