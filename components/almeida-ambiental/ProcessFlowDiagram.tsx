"use client";

import { useEffect, useRef } from "react";
import styles from "./process-flow.module.css";
import { PROCESS_STEP_ICONS } from "../icons";

/**
 * Diagnóstico → Coleta → Triagem → (Trituração | Descaracterização) → Destinação.
 *
 * Trituração e Descaracterização são caminhos ALTERNATIVOS que partem da
 * Triagem e convergem na Destinação — não etapas sequenciais.
 *
 * Animação: um único progresso P (0–1) derivado da posição do diagrama na
 * viewport (scroll-linked, sem biblioteca). Cada conector e cada nó tem uma
 * janela [from, to] na linha do tempo; o JS só escreve uma custom property
 * (--p) e um atributo (data-state) — nenhum re-render do React por frame.
 * Sem JS, ou com prefers-reduced-motion, o diagrama nasce inteiro aceso
 * (estado padrão do CSS), então o conteúdo é compreensível sem animação.
 *
 * Reversibilidade: o estado visual é função PURA da posição atual de rolagem
 * (P). Nada é marcado como "concluído" de forma permanente. Os elementos são
 * consultados no DOM a cada frame — antes, a lista de nós era capturada uma
 * vez, e como o componente Node era declarado dentro do render, qualquer
 * re-render do pai (ex.: o contador de impacto da Home) remontava os <li>:
 * o loop passava a atualizar nós órfãos e os novos ficavam presos em
 * data-state="current" (amarelos) enquanto as linhas continuavam
 * reversíveis.
 *
 * Mobile: coluna vertical com bifurcação em duas colunas. Desktop (≥900px):
 * mesma sequência na horizontal, com a bifurcação em duas linhas.
 */

type Props = {
  /** [Diagnóstico, Coleta, Triagem, Trituração, Descaracterização, Destinação] */
  steps: string[];
  ariaLabel: string;
  /** Descrição textual do fluxo, só para tecnologias assistivas. */
  description: string;
};

// Janelas da linha do tempo (0–1)
const T = {
  line1: [0.04, 0.22],
  coleta: 0.22,
  line2: [0.26, 0.44],
  triagem: 0.44,
  forkTrunk: [0.48, 0.56],
  forkBar: [0.56, 0.64],
  forkDrops: [0.64, 0.72],
  branches: 0.72,
  mergeDrops: [0.74, 0.82],
  mergeBar: [0.82, 0.88],
  mergeTrunk: [0.88, 0.94],
  destino: 0.94,
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

/** Nó de etapa. Declarado no nível do módulo: identidade estável entre renders. */
function Node({ label, index, at, className = "" }: { label: string; index: number; at: number; className?: string }) {
  const Icon = PROCESS_STEP_ICONS[index];
  return (
    <li className={`${styles.node} ${className}`} data-at={at} data-state="current">
      {Icon && <Icon className={styles.icon} />}
      <span className={styles.name}>{label}</span>
    </li>
  );
}

export default function ProcessFlowDiagram({ steps, ariaLabel, description }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

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
      // Estado dos nós: "current" = último patamar aceso; anteriores = "done".
      // Antes de o diagrama começar a entrar (P = 0) nenhuma etapa está acesa:
      // o estado inicial é restaurado ao voltar ao topo.
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

          {/* Bifurcação: dois caminhos alternativos a partir da Triagem */}
          <li className={`${styles.link} ${styles.fork}`} aria-hidden="true">
            <Line win={T.forkTrunk} dir="v" className={styles.forkTrunk} />
            <Line win={T.forkBar} dir="hc" className={styles.forkBar} />
            <Line win={T.forkDrops} dir="v" className={styles.forkDropA} />
            <Line win={T.forkDrops} dir="v" className={styles.forkDropB} />
          </li>
          <Node label={steps[3]} index={3} at={T.branches} className={styles.nTritura} />
          <Node label={steps[4]} index={4} at={T.branches} className={styles.nDescar} />
          <li className={`${styles.link} ${styles.merge}`} aria-hidden="true">
            <Line win={T.mergeDrops} dir="v" className={styles.mergeDropA} />
            <Line win={T.mergeDrops} dir="v" className={styles.mergeDropB} />
            <Line win={T.mergeBar} dir="hc" className={styles.mergeBar} />
            <Line win={T.mergeTrunk} dir="v" className={styles.mergeTrunk} />
          </li>
          <Node label={steps[5]} index={5} at={T.destino} className={styles.nDestino} />
        </ol>
      </div>
    </div>
  );
}
