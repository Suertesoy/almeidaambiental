"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ProcessSteps.module.css";
import { PROCESS_STEP_ICONS } from "../icons";

export type ProcessStep = {
  name: string;
};

/** "ssr": render determinístico, tudo visível (sem JS ou reduced-motion).
 *  "idle": montado, aguardando entrar no viewport (etapas ocultas).
 *  "entered": revelado uma única vez, em sequência. */
type Phase = "ssr" | "idle" | "entered";

/**
 * PROCESS FLOW — o processo como sequência finita.
 *
 * Diagnóstico → Coleta → Triagem → Trituração → Descaracterização →
 * Destinação. FIM: não existe Destinação → Diagnóstico, então não há loop,
 * duplicação da sequência nem conector depois da última etapa.
 *
 * Papel visual: FECHAMENTO do capítulo (uma régua fina no topo e uma linha
 * compacta de ícone + nome), não uma experiência própria.
 *
 * Movimento: uma única entrada ao chegar no viewport — as etapas aparecem em
 * sequência (esquerda → direita) e cada conector "desenha" até a próxima.
 * Não é carrossel nem marquee: nada se move depois da entrada e não há
 * interação. Com prefers-reduced-motion (ou sem JS) a sequência já nasce
 * inteira e legível.
 *
 * Layout: >= 1100px uma linha com conectores; abaixo, grade de 2 (mobile) ou
 * 3 (tablet) colunas em ordem de leitura, cada célula com régua superior —
 * sem scroll horizontal e sem conectores soltos no fim de uma linha.
 */
export default function ProcessSteps({
  steps,
  ariaLabel = "Etapas da operação",
}: {
  steps: ProcessStep[];
  ariaLabel?: string;
}) {
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
      { threshold: 0.35 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className={styles.root} data-phase={phase} role="group" aria-label={ariaLabel}>
      <ol className={styles.sequence}>
        {steps.map((step, index) => {
          const StepIcon = PROCESS_STEP_ICONS[index];
          const isLast = index === steps.length - 1;
          return (
            <li
              key={step.name}
              className={`${styles.step}${isLast ? ` ${styles.stepLast}` : ""}`}
              style={{ "--step-index": index } as React.CSSProperties}
            >
              <span className={styles.stepBody}>
                {StepIcon && <StepIcon className={styles.icon} />}
                <span className={styles.name}>{step.name}</span>
              </span>
              {!isLast && <span className={styles.connector} aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
