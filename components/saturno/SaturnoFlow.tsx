"use client";

import { useEffect, useRef } from "react";
import styles from "./saturno-flow.module.css";
import {
  ProcessColetaIcon,
  ProcessDestinacaoIcon,
  ProcessEnfardamentoIcon,
  ProcessTriagemIcon,
  ProcessTrituracaoIcon,
} from "../icons";
import type { Frente } from "../../lib/saturno-data";
import type { Locale } from "../../lib/i18n/locale";

export type SaturnoFlowProps = {
  locale: Locale;
  coleta: Frente;
  triagem: Frente;
  trituracao: Frente;
  enfardamento: Frente;
  destinacao: Frente;
};

const COPY = {
  pt: {
    directPath: "Caminho direto",
    optionalLabel: "Tratamento opcional · conforme necessidade",
    ariaSummary:
      "Fluxo operacional da Saturno Ambiental: Coleta e Triagem. A partir da Triagem, o material segue diretamente para o Enfardamento ou passa por tratamento opcional de Trituração e Descaracterização quando necessário antes do Enfardamento, seguindo para a Destinação.",
  },
  en: {
    directPath: "Direct path",
    optionalLabel: "Optional treatment · as needed",
    ariaSummary:
      "Saturno Ambiental operational flow: Collection and Sorting. From Sorting, materials either move directly to Baling or undergo optional Shredding and Destruction when needed before Baling, then proceed to Disposal.",
  },
} as const;

/**
 * Frentes de atuação da Saturno Ambiental com bifurcação após a Triagem:
 * - Caminho direto: Coleta → Triagem → Enfardamento → Destinação.
 * - Caminho com tratamento opcional: Coleta → Triagem → Trituração ou
 *   Descaracterização (quando necessário) → Enfardamento → Destinação.
 */
export default function SaturnoFlow({
  locale,
  coleta,
  triagem,
  trituracao,
  enfardamento,
  destinacao,
}: SaturnoFlowProps) {
  const t = COPY[locale];
  const rootRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.25, rootMargin: "0px 0px -6% 0px" }
    );
    items.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      delete root.dataset.live;
    };
  }, []);

  const mainSteps: Array<{
    frente: Frente;
    num: string;
    Icon: typeof ProcessColetaIcon;
    gridClass: string;
    directAfter?: boolean;
    isLast?: boolean;
  }> = [
    { frente: coleta, num: "01", Icon: ProcessColetaIcon, gridClass: styles.step1 },
    { frente: triagem, num: "02", Icon: ProcessTriagemIcon, gridClass: styles.step2, directAfter: true },
    { frente: enfardamento, num: "03", Icon: ProcessEnfardamentoIcon, gridClass: styles.step3 },
    { frente: destinacao, num: "04", Icon: ProcessDestinacaoIcon, gridClass: styles.step4, isLast: true },
  ];

  return (
    <div ref={rootRef} className={styles.flowWrap} role="group" aria-label={t.ariaSummary}>
      <p className={styles.srOnly}>{t.ariaSummary}</p>

      <ol className={styles.flow}>
        {mainSteps.map(({ frente, num, Icon, gridClass, directAfter, isLast }) => (
          <li key={frente.id} className={`${styles.step} ${gridClass}`} data-step>
            <div className={styles.rail} aria-hidden="true">
              <span className={styles.tile}>
                <Icon className={styles.icon} />
              </span>
              {!isLast && (
                <span className={`${styles.connector} ${directAfter ? styles.connectorDirect : ""}`}>
                  {directAfter && <span className={styles.directBadge}>{t.directPath}</span>}
                </span>
              )}
            </div>
            <div className={styles.body}>
              <p className={styles.eyebrow}>
                <span className={styles.index}>{num}</span>
                {frente.eyebrow}
              </p>
              <h3 className={styles.headline}>{frente.headline}</h3>
              <p className={styles.copy}>{frente.copy}</p>
            </div>
          </li>
        ))}

        {/* Caminho opcional entre Triagem (02) e Enfardamento (03) */}
        <li className={styles.optionalBranch} data-step>
          <div className={styles.optionalCard}>
            <div className={styles.optionalHeader}>
              <span className={styles.optionalTile} aria-hidden="true">
                <ProcessTrituracaoIcon className={styles.optionalIcon} />
              </span>
              <div>
                <p className={styles.optionalTag}>{t.optionalLabel}</p>
                <p className={styles.optionalEyebrow}>{trituracao.eyebrow}</p>
              </div>
            </div>
            <h3 className={styles.optionalHeadline}>{trituracao.headline}</h3>
            <p className={styles.optionalCopy}>{trituracao.copy}</p>
          </div>
        </li>
      </ol>
    </div>
  );
}
