"use client";

import styles from "./historia.module.css";
import Highlighted from "./Highlighted";
import IllustrativeBadge from "../shared/IllustrativeBadge";
import { useReveal } from "./useReveal";
import type { TimelineEvent } from "../../lib/historia-data";
import type { Locale } from "../../lib/i18n/locale";

/**
 * Um marco da timeline. O HTML preserva a ordem cronológica por conta
 * própria — a régua/linha é reforço visual, não a única forma de entender a
 * sequência. `side` só importa a partir de 768px (esquerda ou direita da
 * régua); abaixo disso todo evento cai na mesma coluna, à direita dela.
 * O lado vem da posição no par (ChapterSection), não de `event.side`.
 */
export default function TimelineEventRow({
  event,
  locale,
  side,
}: {
  event: TimelineEvent;
  locale: Locale;
  side: "left" | "right";
}) {
  const { ref, active } = useReveal<HTMLElement>(0.25);
  const sideClass = side === "left" ? styles.sideLeft : styles.sideRight;
  const monumentalClass = event.monumental ? styles.eventMonumental : "";
  /* A cidade só aparece como rótulo quando o texto ainda não a cita. */
  const showLocation = event.location && !event.description.includes(event.location);

  return (
    <article
      ref={ref}
      className={`${styles.eventRow} ${sideClass} ${active ? styles.eventRowActive : ""} ${monumentalClass}`}
    >
      <span className={styles.eventDot} aria-hidden="true" />

      <div className={styles.eventBody}>
        <h3 className={styles.eventYear}>{event.year}</h3>
        {event.dateLabel && <p className={styles.eventDateLabel}>{event.dateLabel}</p>}
        {showLocation && <p className={styles.eventLocation}>{event.location}</p>}
        <p className={styles.eventText}>
          <Highlighted text={event.description} terms={event.highlights} />
        </p>

        {event.image && (
          <div className={styles.eventImageWrap}>
            <img
              src={event.image.src}
              alt={event.image.alt}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: event.image.orientation === "portrait" ? "center 30%" : "center" }}
            />
            {event.image.sourceType === "illustrative" && <IllustrativeBadge locale={locale} />}
          </div>
        )}
      </div>
    </article>
  );
}
