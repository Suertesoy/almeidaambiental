import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ChevronDownIcon } from "./icons";

/**
 * Primitivos da composição editorial DESKTOP (>=1024px) — Decisão 27.
 * Independente do mobile (components/MobileDobra.tsx, área protegida da
 * Decisão 26 — não importado nem reaproveitado aqui de propósito, para
 * não criar acoplamento entre os dois sistemas).
 *
 * `.d-stage` (ver app/globals.css) é a área útil de cada dobra:
 * position:relative, altura cheia (calc(100svh - header)). Cada elemento
 * é position:absolute com `top` em porcentagem (sempre relativo à altura
 * inteira do stage) e `left`/`width` calculados por `gridX()` — um grid
 * conceitual de 12 colunas com 24px de gap, sem exigir CSS Grid real.
 */

const GAP_PX = 24;
const COLUMNS = 12;

export function gridX(colA: number, colB: number) {
  const span = colB - colA;
  const leftPct = ((colA - 1) * 100) / COLUMNS;
  const leftPx = ((colA - 1) * GAP_PX) / COLUMNS;
  const widthPct = (span * 100) / COLUMNS;
  const widthPx = (span * GAP_PX) / COLUMNS;
  return {
    left: `calc(${leftPct}% + ${leftPx}px)`,
    width: `calc(${widthPct}% + ${widthPx}px)`,
  };
}

type XPlacement =
  | { colA: number; colB: number; centerX?: false }
  | { centerX: true; colA?: undefined; colB?: undefined };

function xStyle(placement: XPlacement): CSSProperties {
  if (placement.centerX) {
    return { left: "50%", transform: "translateX(-50%)" };
  }
  const { left, width } = gridX(placement.colA, placement.colB);
  return { left, width };
}

type Segment = { text: string; gold?: boolean };
type TitleLine = Segment[];

function renderLine(line: TitleLine, keyPrefix: string) {
  return line.map((seg, i) =>
    seg.gold ? (
      <em key={`${keyPrefix}-${i}`} className="d-title-gold">
        {seg.text}
      </em>
    ) : (
      <span key={`${keyPrefix}-${i}`}>{seg.text}</span>
    )
  );
}

export function DNameBlock({
  top,
  align = "left",
  name,
  services,
  ...placement
}: { top: string; align?: "left" | "right"; name: string; services?: string } & XPlacement) {
  const style: CSSProperties = {
    top,
    ...xStyle(placement),
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

export function DTitle({
  top,
  align = "left",
  maxWidth,
  fontSize,
  lineHeight,
  letterSpacing,
  lines,
  plain = false,
  ...placement
}: {
  top: string;
  align?: "left" | "right" | "center";
  maxWidth?: string;
  fontSize: string;
  lineHeight: number;
  letterSpacing?: string;
  lines: TitleLine[];
  plain?: boolean;
} & XPlacement) {
  const style: CSSProperties = {
    top,
    ...xStyle(placement),
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

export function DBody({
  top,
  align = "left",
  maxWidth = "540px",
  fontSize,
  nowrap = false,
  children,
  ...placement
}: {
  top: string;
  align?: "left" | "right" | "center";
  maxWidth?: string;
  fontSize?: string;
  nowrap?: boolean;
  children: ReactNode;
} & XPlacement) {
  const style: CSSProperties = {
    top,
    ...xStyle(placement),
    maxWidth,
    fontSize,
    textAlign: align,
    whiteSpace: nowrap ? "nowrap" : "normal",
  };
  return (
    <p className="d-body" style={style}>
      {children}
    </p>
  );
}

export function DButton({
  top,
  variant,
  href,
  disabled,
  children,
  ...placement
}: {
  top: string;
  variant: "primary" | "secondary";
  href?: string;
  disabled?: boolean;
  children: ReactNode;
} & XPlacement) {
  const style: CSSProperties = { position: "absolute", top, ...xStyle(placement) };
  const className = `d-btn ${variant === "primary" ? "d-btn-primary" : "d-btn-secondary"}`;
  if (href) {
    return (
      <Link href={href} className={className} style={style}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={className} style={style} disabled={disabled}>
      {children}
    </button>
  );
}

/** Variante sem position:absolute própria — usada como filho de
 *  DActionsRow (Hero: dois CTAs lado a lado em fluxo flex normal). */
export function DButtonInline({
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

export function DActionsRow({ top, children, ...placement }: { top: string; children: ReactNode } & XPlacement) {
  const style: CSSProperties = { position: "absolute", top, ...xStyle(placement) };
  return (
    <div className="d-actions-row" style={style}>
      {children}
    </div>
  );
}

export function DScrollHint() {
  return (
    <>
      <div className="d-scroll-fade" aria-hidden="true" />
      <div className="d-scroll-indicator" style={{ bottom: "28px" }} aria-hidden="true">
        <ChevronDownIcon />
      </div>
    </>
  );
}

export function DMetricsGrid({
  top,
  metrics,
  ...placement
}: { top: string; metrics: Array<{ value: string; label: string }> } & XPlacement) {
  const style: CSSProperties = { top, ...xStyle(placement) };
  return (
    <ul className="d-metrics" style={style}>
      {metrics.map((m) => (
        <li key={m.label}>
          <p className="d-metric-value">{m.value}</p>
          <p className="d-metric-label">{m.label}</p>
        </li>
      ))}
    </ul>
  );
}
