"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ProcessSteps.module.css";
import {
  ProcessColetaIcon,
  ProcessDescaracterizacaoIcon,
  ProcessDestinacaoIcon,
  ProcessDiagnosticoIcon,
  ProcessEnfardamentoIcon,
  ProcessTriagemIcon,
  ProcessTrituracaoIcon,
} from "../icons";
import type { Locale } from "../../lib/i18n/locale";

export type ProcessStep = {
  name: string;
};

type Phase = "ssr" | "idle" | "entered";

const COPY = {
  pt: {
    diagnostico: "Diagnóstico",
    coleta: "Coleta",
    triagem: "Triagem",
    optionalTag: "Tratamento opcional",
    trituracao: "Trituração",
    or: "ou",
    descaracterizacao: "Descaracterização",
    enfardamento: "Enfardamento",
    destinacao: "Destinação",
    ariaSummary:
      "Fluxo operacional: Diagnóstico, Coleta e Triagem. A partir da Triagem, o material segue continuamente para Enfardamento ou passa pelo tratamento opcional de Trituração ou Descaracterização antes do Enfardamento, seguindo para Destinação.",
  },
  en: {
    diagnostico: "Assessment",
    coleta: "Collection",
    triagem: "Sorting",
    optionalTag: "Optional treatment",
    trituracao: "Shredding",
    or: "or",
    descaracterizacao: "Destruction",
    enfardamento: "Baling",
    destinacao: "Disposal",
    ariaSummary:
      "Operational flow: Assessment, Collection and Sorting. From Sorting, material flows continuously to Baling or undergoes optional Shredding or Destruction before returning to Baling, then proceeds to Disposal.",
  },
} as const;

/**
 * PROCESS FLOW — diagrama operacional editorial com ramificação opcional.
 *
 * Diagnóstico → Coleta → Triagem ───────────────────▶ Enfardamento → Destinação
 *                           └── [Tratamento opcional] ──┘
 *                               Trituração ou Descaracterização
 */
export default function ProcessSteps({
  locale = "pt",
  ariaLabel,
}: {
  steps?: ProcessStep[];
  locale?: Locale;
  ariaLabel?: string;
}) {
  const t = COPY[locale];
  const [phase, setPhase] = useState<Phase>("ssr");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    setPhase("idle");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setPhase("entered");
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={styles.root}
      data-phase={phase}
      role="group"
      aria-label={ariaLabel ?? t.ariaSummary}
    >
      <p className={styles.srOnly}>{t.ariaSummary}</p>

      <div className={styles.diagram}>
        {/* Etapa 1: Diagnóstico */}
        <div className={`${styles.node} ${styles.node1}`}>
          <ProcessDiagnosticoIcon className={styles.icon} />
          <span className={styles.name}>{t.diagnostico}</span>
        </div>

        <span className={`${styles.conn} ${styles.conn1}`} aria-hidden="true" />

        {/* Etapa 2: Coleta */}
        <div className={`${styles.node} ${styles.node2}`}>
          <ProcessColetaIcon className={styles.icon} />
          <span className={styles.name}>{t.coleta}</span>
        </div>

        <span className={`${styles.conn} ${styles.conn2}`} aria-hidden="true" />

        {/* Etapa 3: Triagem (ponto de bifurcação) */}
        <div className={`${styles.node} ${styles.node3}`}>
          <ProcessTriagemIcon className={styles.icon} />
          <span className={styles.name}>{t.triagem}</span>
        </div>

        {/* Ligação contínua e ramificação opcional entre Triagem e Enfardamento */}
        <div className={styles.fork}>
          <div className={styles.directLane} aria-hidden="true">
            <span className={styles.directLine} />
            <span className={styles.directArrow} />
          </div>

          <div className={styles.optionalLane}>
            <span className={styles.optionalLabel}>{t.optionalTag}</span>
            <div className={styles.optionalChoices}>
              <span className={styles.optionalItem}>
                <ProcessTrituracaoIcon className={styles.optionalIcon} />
                <span>{t.trituracao}</span>
              </span>
              <span className={styles.optionalOr}>{t.or}</span>
              <span className={styles.optionalItem}>
                <ProcessDescaracterizacaoIcon className={styles.optionalIcon} />
                <span>{t.descaracterizacao}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Etapa 4: Enfardamento (ponto de convergência) */}
        <div className={`${styles.node} ${styles.node4}`}>
          <ProcessEnfardamentoIcon className={styles.icon} />
          <span className={styles.name}>{t.enfardamento}</span>
        </div>

        <span className={`${styles.conn} ${styles.conn4}`} aria-hidden="true" />

        {/* Etapa 5: Destinação */}
        <div className={`${styles.node} ${styles.node5}`}>
          <ProcessDestinacaoIcon className={styles.icon} />
          <span className={styles.name}>{t.destinacao}</span>
        </div>
      </div>
    </div>
  );
}
