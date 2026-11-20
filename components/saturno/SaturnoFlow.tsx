"use client";

import { useEffect, useRef } from "react";
import styles from "./saturno-flow.module.css";
import { PROCESS_STEP_ICONS } from "../icons";
import type { Frente } from "../../lib/saturno-data";

/** Ícone por frente = mesmo ícone da etapa equivalente do processo (components/icons.tsx). */
const ICON_INDEX: Record<string, number> = { coleta: 1, triagem: 2, trituracao: 3, destinacao: 5 };

/**
 * Frentes de atuação como sequência: ícone grande + conector que "acende"
 * até a etapa seguinte conforme cada item entra na viewport. Revelação
 * discreta (opacidade/translate curtos, uma vez por item); sem JS ou com
 * prefers-reduced-motion tudo nasce visível e conectado.
 */
export default function SaturnoFlow({ frentes }: { frentes: Frente[] }) {
  const rootRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
    root.dataset.live = "true";
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.in = "true";
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" }
    );
    items.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      delete root.dataset.live;
    };
  }, []);

  return (
    <ol ref={rootRef} className={styles.flow}>
      {frentes.map((frente, index) => {
        const Icon = PROCESS_STEP_ICONS[ICON_INDEX[frente.id] ?? 0];
        const isLast = index === frentes.length - 1;
        return (
          <li key={frente.id} className={styles.step} data-step>
            <div className={styles.rail} aria-hidden="true">
              <span className={styles.tile}>{Icon && <Icon className={styles.icon} />}</span>
              {!isLast && <span className={styles.connector} />}
            </div>
            <div className={styles.body}>
              <p className={styles.eyebrow}>
                <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
                {frente.eyebrow}
              </p>
              <h3 className={styles.headline}>{frente.headline}</h3>
              <p className={styles.copy}>{frente.copy}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
