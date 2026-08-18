"use client";

import styles from "./historia.module.css";
import Highlighted from "./Highlighted";
import { useReveal } from "./useReveal";
import type { TimelineEvent } from "../../lib/historia-data";

/**
 * Um marco da timeline. O HTML preserva a ordem cronológica por conta
 * própria (Seção 27) — a régua/linha é reforço visual, não a única forma
 * de entender a sequência. `side` só importa em desktop (>=1024px); no
 * mobile todo evento cai na mesma coluna de conteúdo (Seção 17).
 */
export default function TimelineEventRow({ event }: { event: TimelineEvent }) {
  const { ref, active } = useReveal<HTMLElement>();
  const sideClass = event.side === "left" ? styles.eventRowLeft : "";
  const monumentalClass = event.monumental ? styles.eventMonumental : "";

  return (
    <article
      ref={ref}
      className={`${styles.eventRow} ${active ? styles.eventRowActive : ""} ${sideClass} ${monumentalClass}`}
    >
      <span className={styles.eventMarker} aria-hidden="true">
        <span className={styles.eventDot} />
      </span>

      <div className={styles.eventBody}>
        <h3 className={styles.eventYear}>{event.year}</h3>
        {event.dateLabel && <p className={styles.eventDateLabel}>{event.dateLabel}</p>}
        {event.location && (
          <p className={styles.eventLocation}>
            <span>{event.location}</span>
          </p>
        )}
        <p className={styles.eventText}>
          <Highlighted text={event.description} terms={event.highlights} />
        </p>
      </div>

      {event.image && (
        <div className={styles.eventImageWrap}>
          <img
            src={event.image.src}
            alt={event.image.alt}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: event.image.orientation === "portrait" ? "center 30%" : "center" }}
          />
          {event.image.sourceType === "illustrative" && (
            <span className={styles.illustrativeTag}>Imagem ilustrativa</span>
          )}
        </div>
      )}
    </article>
  );
}
