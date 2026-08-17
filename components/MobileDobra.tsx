import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import type { LockupTokens } from "../lib/responsive-type";
import { contentWidth } from "../lib/responsive-type";
import { ChevronDownIcon } from "./icons";

/**
 * Primitivos de LAYOUT DE FLUXO (flex column) usados pela composição
 * mobile+tablet (<1024px) das dobras da Home.
 *
 * `MfFrame` alinha à esquerda por padrão (nome/subtítulo/corpo, fiel ao
 * Figma 393px); `MfTitle`/`MfActions` recentralizam a si mesmos via
 * `align-self` (ver `.mf-frame > .mf-d-title` em app/globals.css), exceto
 * nas dobras de fechamento/impacto (`titleAlign="left"`), onde o título
 * também fica à esquerda. A partir de 600px, `data-tablet-align` espelha
 * a direção editorial esquerda/direita do desktop. Todo o resto é filho
 * em fluxo normal: a ordem no JSX É a ordem visual, e o espaçamento entre
 * blocos vem de `marginTop` (gerado por `rhythm()`/`framePaddingTop()` em
 * lib/responsive-type.ts), não de coordenadas absolutas. Cada dobra
 * continua livre para escolher sua própria combinação de elementos/gaps.
 */

type Segment = { text: string; gold?: boolean; green?: boolean };
type TitleLine = Segment[];

function renderLine(line: TitleLine, keyPrefix: string) {
  return line.map((seg, i) => {
    if (seg.gold) {
      return (
        <em key={`${keyPrefix}-${i}`} className="mf-d-title-gold">
          {seg.text}
        </em>
      );
    }
    if (seg.green) {
      return (
        <em key={`${keyPrefix}-${i}`} className="mf-d-title-green">
          {seg.text}
        </em>
      );
    }
    return <span key={`${keyPrefix}-${i}`}>{seg.text}</span>;
  });
}

export function MfFrame({
  children,
  tabletAlign = "center",
  paddingTop,
}: {
  children: ReactNode;
  tabletAlign?: "center" | "left" | "right";
  paddingTop: string;
}) {
  return (
    <div className="mf-frame" data-tablet-align={tabletAlign} style={{ paddingTop }}>
      {children}
    </div>
  );
}

export function MfLabel({
  marginTop,
  tokens,
  children,
}: {
  marginTop?: string;
  tokens: LockupTokens;
  children: ReactNode;
}) {
  const style: CSSProperties = {
    marginTop,
    fontSize: tokens.fontSize,
    lineHeight: tokens.lineHeight,
    letterSpacing: tokens.letterSpacing,
  };
  return (
    <p className="mf-d-label" style={style}>
      {children}
    </p>
  );
}

export function MfSubtitle({
  marginTop,
  tokens,
  children,
}: {
  marginTop?: string;
  tokens: LockupTokens;
  children: ReactNode;
}) {
  const style: CSSProperties = {
    marginTop,
    fontSize: tokens.fontSize,
    lineHeight: tokens.lineHeight,
    letterSpacing: tokens.letterSpacing,
  };
  return (
    <p className="mf-d-subtitle" style={style}>
      {children}
    </p>
  );
}

export function MfTitle({
  marginTop,
  refWidth,
  widthGrowth,
  tokens,
  lines,
  plain = false,
  align = "center",
}: {
  marginTop?: string;
  refWidth: number;
  /** Multiplicador do teto de largura em tablet (padrão 1.6×). */
  widthGrowth?: number;
  tokens: LockupTokens;
  lines: TitleLine[];
  plain?: boolean;
  /** "center" (padrão, maioria das dobras) ou "left" (fechamento/impacto). */
  align?: "center" | "left";
}) {
  const style: CSSProperties = {
    marginTop,
    width: contentWidth(refWidth, widthGrowth ? { ceilScale: widthGrowth } : undefined),
    fontSize: tokens.fontSize,
    lineHeight: tokens.lineHeight,
    letterSpacing: tokens.letterSpacing,
    textTransform: plain ? "none" : "uppercase",
  };
  return (
    <h2 className="mf-d-title" data-align={align} style={style}>
      {lines.map((line, i) => (
        <span key={i}>{renderLine(line, String(i))}</span>
      ))}
    </h2>
  );
}

export function MfBody({
  marginTop,
  refWidth,
  widthGrowth,
  tokens,
  children,
}: {
  marginTop?: string;
  refWidth: number;
  widthGrowth?: number;
  tokens: LockupTokens;
  children: ReactNode;
}) {
  const style: CSSProperties = {
    marginTop,
    width: contentWidth(refWidth, widthGrowth ? { ceilScale: widthGrowth } : undefined),
    fontSize: tokens.fontSize,
    lineHeight: tokens.lineHeight,
    letterSpacing: tokens.letterSpacing,
  };
  return (
    <p className="mf-d-body" style={style}>
      {children}
    </p>
  );
}

export function MfActions({ marginTop, children }: { marginTop?: string; children: ReactNode }) {
  return (
    <div className="mf-d-actions" style={{ marginTop }}>
      {children}
    </div>
  );
}

export function MfButton({
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
  const className = `mf-btn ${variant === "primary" ? "mf-btn-primary" : "mf-btn-secondary"}`;
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

/* Indicador (fade + seta) fica FLUSH com a base real da dobra — a seta
   fica a `bottom`px do fundo, valor medido no Figma: 10px no indicador
   simples (42px de altura), 20px na Hero (bloco com rótulo "Role para
   baixo", 64px de altura, padding-bottom próprio). Não é uma margem de
   segurança arbitrária. */
export function MfScrollHint({ bottom = 10, label }: { bottom?: number; label?: string }) {
  return (
    <>
      {label ? <p className="mf-hero-scroll-label">{label}</p> : null}
      <div className="mf-bottom-fade" aria-hidden="true" />
      <div className="mf-d-arrow" style={{ bottom: `${bottom}px` }} aria-hidden="true">
        <ChevronDownIcon />
      </div>
    </>
  );
}

export function MfMetrics({
  marginTop,
  gap,
  children,
}: {
  marginTop?: string;
  gap?: string;
  children: ReactNode;
}) {
  return (
    <div className="mf-d-metrics" style={{ marginTop, gap }}>
      {children}
    </div>
  );
}

export function MfMetric({
  value,
  label,
  valueTokens,
  labelTokens,
}: {
  value: string;
  label: string;
  valueTokens: LockupTokens;
  labelTokens: LockupTokens;
}) {
  const valueStyle: CSSProperties = {
    fontSize: valueTokens.fontSize,
    lineHeight: valueTokens.lineHeight,
    letterSpacing: valueTokens.letterSpacing,
  };
  const labelStyle: CSSProperties = {
    fontSize: labelTokens.fontSize,
    lineHeight: labelTokens.lineHeight,
    letterSpacing: labelTokens.letterSpacing,
  };
  return (
    <div className="mf-d-metric">
      <p className="mf-d-metric-value" style={valueStyle}>
        {value}
      </p>
      <p className="mf-d-metric-label" style={labelStyle}>
        {label}
      </p>
    </div>
  );
}
