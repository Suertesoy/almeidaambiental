import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "./icons";

/**
 * Primitivos da composição editorial DESKTOP (>=1024px).
 * Independente do mobile (components/MobileDobra.tsx) — não importado nem
 * reaproveitado aqui de propósito, para não criar acoplamento entre os
 * dois sistemas.
 *
 * Arquitetura: `.d-stage` (ver app/globals.css) é a área útil de cada
 * dobra. Dentro dela, `DFrame` é uma coluna flex com três regiões reais —
 * não mais um `top` percentual isolado por elemento:
 *
 *   DTop   — nome/subtítulo institucional, ancorado a header+40px.
 *   DMain  — grid REAL de 12 colunas (CSS Grid), flex:1 (todo o espaço
 *            restante). A headline (`DTitle`) se centraliza sozinha nesse
 *            espaço (align-self:center, nunca empurrada pelo body); o
 *            cluster body+CTA (`DBottomCluster`) fica encostado no fim
 *            (align-self:end) — os dois nunca dependem um do outro.
 *   DHint  — indicador de rolagem, 40px abaixo do fim de DMain, sem caixa
 *            isolada atrás (o fade é full-width, ver `.d-bottom-fade`).
 *
 * `colA`/`colB` viram `grid-column` (linhas 1..13 de um grid de 12
 * colunas) — a mesma numeração conceitual que a antiga gridX() já usava,
 * então as escolhas horizontais de cada dobra não mudaram, só deixaram de
 * precisar de left/width calculados a mão.
 */

type Segment = { text: string; gold?: boolean; green?: boolean };
type TitleLine = Segment[];

function renderLine(line: TitleLine, keyPrefix: string) {
  return line.map((seg, i) => {
    if (seg.gold) {
      return (
        <em key={`${keyPrefix}-${i}`} className="d-title-gold">
          {seg.text}
        </em>
      );
    }
    if (seg.green) {
      return (
        <em key={`${keyPrefix}-${i}`} className="d-title-green">
          {seg.text}
        </em>
      );
    }
    return <span key={`${keyPrefix}-${i}`}>{seg.text}</span>;
  });
}

/** Área útil da dobra: fade decorativo full-width (atrás de toda a região
 *  inferior, não uma caixa isolada atrás do chevron) + as três regiões
 *  (DTop/DMain/DHint) em coluna flex, altura total do stage. */
export function DFrame({ children }: { children: ReactNode }) {
  return (
    <div className="d-frame">
      <div className="d-bottom-fade" aria-hidden="true" />
      {children}
    </div>
  );
}

/** Região TOP: nome institucional. Mesmo grid de 12 colunas de `DMain`,
 *  para as bordas horizontais baterem entre as regiões. */
export function DTop({ children }: { children: ReactNode }) {
  return <div className="d-top">{children}</div>;
}

/** Região CENTER+BOTTOM: grid real de 12 colunas ocupando todo o espaço
 *  entre DTop e DHint. `DTitle`/`DBottomCluster`/`DImpactCluster` são os
 *  únicos filhos esperados aqui. */
export function DMain({ children }: { children: ReactNode }) {
  return <div className="d-main">{children}</div>;
}

type GridPlacement =
  | { colA: number; colB: number; centerX?: false }
  | { centerX: true; colA?: undefined; colB?: undefined };

function gridColumnStyle(placement: GridPlacement): CSSProperties {
  if (placement.centerX) {
    return { gridColumn: "1 / 13", justifySelf: "center" };
  }
  return { gridColumn: `${placement.colA} / ${placement.colB}` };
}

export function DNameBlock({
  align = "left",
  name,
  services,
  ...placement
}: { align?: "left" | "right"; name: string; services?: string } & GridPlacement) {
  const style: CSSProperties = {
    ...gridColumnStyle(placement),
    alignItems: align === "right" ? "flex-end" : "flex-start",
    textAlign: align,
  };
  return (
    <div className="d-name-block" style={style}>
      <p className="d-name">{name}</p>
      {services ? <p className="d-services">{services}</p> : null}
    </div>
  );
}

/** Headline — sempre a região CENTER (`.d-title` já define
 *  align-self:center via CSS, independente da altura do body ao lado). */
export function DTitle({
  align = "left",
  maxWidth,
  fontSize,
  lineHeight,
  letterSpacing,
  lines,
  plain = false,
  ...placement
}: {
  align?: "left" | "right" | "center";
  maxWidth?: string;
  fontSize: string;
  lineHeight: number;
  letterSpacing?: string;
  lines: TitleLine[];
  plain?: boolean;
} & GridPlacement) {
  const style: CSSProperties = {
    ...gridColumnStyle(placement),
    maxWidth,
    fontSize,
    lineHeight,
    letterSpacing,
    textAlign: align,
    alignItems: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
  };
  return (
    <h2 className={`d-title${plain ? " d-title-plain" : ""}`} style={style}>
      {lines.map((line, i) => (
        <span key={i}>{renderLine(line, String(i))}</span>
      ))}
    </h2>
  );
}

/** Cluster BOTTOM (body + CTA, ou só body): um único item de grid
 *  (align-self:end via CSS) — garante "body/CTA a 40px do chevron"
 *  sempre, com ou sem botão, sem depender da altura da headline. */
export function DBottomCluster({
  align = "left",
  maxWidth = "440px",
  children,
  ...placement
}: {
  align?: "left" | "right" | "center";
  maxWidth?: string;
  children: ReactNode;
} & GridPlacement) {
  const style: CSSProperties = {
    ...gridColumnStyle(placement),
    maxWidth,
    alignItems: align === "right" ? "flex-end" : align === "center" ? "center" : "flex-start",
    textAlign: align,
  };
  return (
    <div className="d-bottom-cluster" style={style}>
      {children}
    </div>
  );
}

export function DBody({
  marginTop,
  fontSize,
  nowrap = false,
  children,
}: {
  marginTop?: string;
  fontSize?: string;
  nowrap?: boolean;
  children: ReactNode;
}) {
  const style: CSSProperties = {
    marginTop,
    fontSize,
    whiteSpace: nowrap ? "nowrap" : "normal",
  };
  return (
    <p className="d-body" style={style}>
      {children}
    </p>
  );
}

/** Wrapper do(s) botão(ões) dentro do cluster inferior — 8px fixos acima
 *  dele (regra 9 da tarefa), mesmo padrão de `MfActions` no mobile. */
export function DActions({ children }: { children: ReactNode }) {
  return <div className="d-actions">{children}</div>;
}

export function DButton({
  variant,
  href,
  disabled,
  children,
}: {
  variant: "primary" | "secondary";
  href?: string;
  disabled?: boolean;
  children: ReactNode;
}) {
  const className = `d-btn ${variant === "primary" ? "d-btn-primary" : "d-btn-secondary"}`;
  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={className} disabled={disabled}>
      {children}
    </button>
  );
}

/** Linha de ações da Hero (dois CTAs lado a lado, fluxo normal — não é
 *  mais um item posicionado via top/gridX). */
export function DActionsRow({ children }: { children: ReactNode }) {
  return <div className="d-actions-row">{children}</div>;
}

/** Indicador de rolagem — região HINT: sempre 40px abaixo do fim de
 *  `DMain` (margin-top fixo em `.d-hint`), sem caixa/fade retangular
 *  isolada atrás (regra 12 da tarefa). `label` cobre o "Role para baixo"
 *  da Hero — mesmo componente, sem lógica duplicada. */
export function DHint({
  label,
  isLast = false,
  onAdvance,
}: {
  label?: string;
  isLast?: boolean;
  onAdvance: () => void;
}) {
  return (
    <div className="d-hint">
      <button
        type="button"
        className="d-scroll-indicator"
        onClick={onAdvance}
        aria-label={isLast ? "Ir para o rodapé" : "Ir para a próxima seção"}
      >
        {label ? <span aria-hidden="true">{label}</span> : null}
        <ChevronDownIcon />
      </button>
    </div>
  );
}

/** Cluster da Dobra 9 (Impacto): métricas 2×2 + CTA no mesmo bloco
 *  (align-self:center via CSS — não há região TOP nessa dobra, então o
 *  cluster acompanha o mesmo peso vertical da headline ao lado). */
export function DImpactCluster({ children, ...placement }: { children: ReactNode } & GridPlacement) {
  const style: CSSProperties = gridColumnStyle(placement);
  return (
    <div className="d-impact-cluster" style={style}>
      {children}
    </div>
  );
}

export function DMetricsGrid({ metrics }: { metrics: Array<{ value: ReactNode; label: string }> }) {
  return (
    <ul className="d-metrics">
      {metrics.map((m) => (
        <li key={m.label}>
          <p className="d-metric-value">{m.value}</p>
          <p className="d-metric-label">{m.label}</p>
        </li>
      ))}
    </ul>
  );
}
