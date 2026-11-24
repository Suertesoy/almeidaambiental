"use client";

import { useEffect, useRef } from "react";
import styles from "./process-flow.module.css";
import {
  ProcessColetaIcon,
  ProcessDescaracterizacaoIcon,
  ProcessDestinacaoIcon,
  ProcessDiagnosticoIcon,
  ProcessEnfardamentoIcon,
  ProcessTriagemIcon,
  ProcessTrituracaoIcon,
} from "../icons";

/**
 * Diagnóstico → Coleta → Triagem
 *   ├── Caminho direto ──────────────────────────┐
 *   └── Opcional (conforme necessidade):         ├──▶ Enfardamento → Destinação
 *       Trituração ou Descaracterização ─────────┘
 *
 * Scroll-linked progress (P de 0 a 1) sem re-renders por frame.
 * Sem JS ou com prefers-reduced-motion, o diagrama nasce inteiro aceso.
 */

type Props = {
  /** [Diagnóstico, Coleta, Triagem, Trituração, Descaracterização, Enfardamento, Destinação] */
  steps: string[];
  ariaLabel: string;
  /** Descrição textual do fluxo, só para tecnologias assistivas. */
  description: string;
  locale?: "pt" | "en";
};

const T = {
  line1: [0.04, 0.18],
  coleta: 0.18,
  line2: [0.22, 0.36],
  triagem: 0.36,
  forkTrunk: [0.4, 0.48],
  forkBar: [0.48, 0.55],
  forkDrops: [0.55, 0.62],
  branches: 0.62,
  mergeDrops: [0.64, 0.71],
  mergeBar: [0.71, 0.77],
  mergeTrunk: [0.77, 0.82],
  enfarda: 0.82,
  lineEnd: [0.85, 0.94],
  destino: 0.94,
} as const;

const LABELS = {
  pt: {
    direct: "Caminho direto",
    optional: "Opcional · conforme necessidade",
    or: "ou",
  },
  en: {
    direct: "Direct path",
    optional: "Optional · as needed",
    or: "or",
  },
} as const;

type Win = readonly [number, number];

function Line({ win, dir, className = "" }: { win: Win; dir: "v" | "h" | "hc" | "vc"; className?: string }) {
  return (
    <span
      className={`${styles.line} ${styles[`line_${dir}`]} ${className}`}
      data-from={win[0]}
      data-to={win[1]}
      aria-hidden="true"
    >
      <span className={styles.lineFill} />
    </span>
  );
}

const STEP_ICONS = [
  ProcessDiagnosticoIcon,
  ProcessColetaIcon,
  ProcessTriagemIcon,
  ProcessTrituracaoIcon,
  ProcessDescaracterizacaoIcon,
  ProcessEnfardamentoIcon,
  ProcessDestinacaoIcon,
] as const;

function Node({ label, index, at, className = "" }: { label: string; index: number; at: number; className?: string }) {
  const Icon = STEP_ICONS[index];
  return (
    <li className={`${styles.node} ${className}`} data-at={at} data-state="current">
      {Icon && <Icon className={styles.icon} />}
      <span className={styles.name}>{label}</span>
    </li>
  );
}

export default function ProcessFlowDiagram({ steps, ariaLabel, description, locale = "pt" }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const labels = LABELS[locale];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    root.dataset.live = "true";

    let frame = 0;
    const apply = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.8;
      const span = rect.height + vh * 0.1;
      const P = Math.min(1, Math.max(0, (start - rect.top) / span));

      const lines = root.querySelectorAll<HTMLElement>("[data-from]");
      const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-at]"));

      for (const el of lines) {
        const a = Number(el.dataset.from);
        const b = Number(el.dataset.to);
        el.style.setProperty("--p", String(Math.min(1, Math.max(0, (P - a) / (b - a)))));
      }

      const lit = nodes.map((el) => {
        const at = Number(el.dataset.at);
        return at === 0 ? P > 0 : P >= at;
      });
      let lastLitAt = -1;
      nodes.forEach((el, i) => {
        if (lit[i]) lastLitAt = Math.max(lastLitAt, Number(el.dataset.at));
      });
      nodes.forEach((el, i) => {
        el.dataset.state = !lit[i] ? "idle" : Number(el.dataset.at) === lastLitAt ? "current" : "done";
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
      delete root.dataset.live;
    };
  }, []);

  return (
    <div ref={rootRef} className={styles.root} role="group" aria-label={ariaLabel}>
      <p className={styles.srOnly}>{description}</p>
      <div className={styles.flow} aria-hidden="false">
        <ol className={styles.main}>
          <Node label={steps[0]} index={0} at={0} className={styles.nDiag} />
          <li className={`${styles.link} ${styles.lDiag}`} aria-hidden="true">
            <Line win={T.line1} dir="v" />
          </li>

          <Node label={steps[1]} index={1} at={T.coleta} className={styles.nColeta} />
          <li className={`${styles.link} ${styles.lColeta}`} aria-hidden="true">
            <Line win={T.line2} dir="v" />
          </li>

          <Node label={steps[2]} index={2} at={T.triagem} className={styles.nTriagem} />

          {/* Bifurcação após Triagem: caminho direto ou tratamento opcional */}
          <li className={`${styles.link} ${styles.fork}`} aria-hidden="true">
            <Line win={T.forkTrunk} dir="v" className={styles.forkTrunk} />
            <Line win={T.forkBar} dir="hc" className={styles.forkBar} />
            <Line win={T.forkDrops} dir="v" className={styles.forkDropA} />
            <Line win={T.forkDrops} dir="v" className={styles.forkDropB} />
          </li>

          <li className={`${styles.node} ${styles.nDireto}`} data-at={T.branches} data-state="current">
            <span className={styles.directTag}>{labels.direct}</span>
          </li>

          <li className={`${styles.node} ${styles.nOpcional}`} data-at={T.branches} data-state="current">
            <span className={styles.optionalTag}>{labels.optional}</span>
            <span className={styles.optionalRow}>
              <span className={styles.optionalItem}>
                <ProcessTrituracaoIcon className={styles.optionalIcon} />
                <span>{steps[3]}</span>
              </span>
              <span className={styles.optionalOr}>{labels.or}</span>
              <span className={styles.optionalItem}>
                <ProcessDescaracterizacaoIcon className={styles.optionalIcon} />
                <span>{steps[4]}</span>
              </span>
            </span>
          </li>

          {/* Convergência em Enfardamento */}
          <li className={`${styles.link} ${styles.merge}`} aria-hidden="true">
            <Line win={T.mergeDrops} dir="v" className={styles.mergeDropA} />
            <Line win={T.mergeDrops} dir="v" className={styles.mergeDropB} />
            <Line win={T.mergeBar} dir="hc" className={styles.mergeBar} />
            <Line win={T.mergeTrunk} dir="v" className={styles.mergeTrunk} />
          </li>

          <Node label={steps[5]} index={5} at={T.enfarda} className={styles.nEnfarda} />
          <li className={`${styles.link} ${styles.lEnd}`} aria-hidden="true">
            <Line win={T.lineEnd} dir="v" />
          </li>

          <Node label={steps[6]} index={6} at={T.destino} className={styles.nDestino} />
        </ol>
      </div>
    </div>
  );
}
