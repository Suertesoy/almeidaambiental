import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import type { LockupTokens } from "../lib/responsive-type";
import { contentWidth } from "../lib/responsive-type";
import { ChevronDownIcon } from "./icons";

/**
 * Primitivos de LAYOUT DE FLUXO (flex column) usados pela composição
 * mobile+tablet (<1024px) das dobras da Home.
 *
 * `MfFrame` é uma coluna flex (`height:100%`) alinhada à esquerda por
 * padrão (nome/subtítulo/corpo, fiel ao Figma 393px); `MfTitle`/`MfActions`
 * recentralizam a si mesmos via `align-self` (ver `.mf-frame > .mf-d-title`
 * em app/globals.css), exceto nas dobras de fechamento/impacto
 * (`align="left"`), onde o título também fica à esquerda. A partir de
 * 600px, `data-tablet-align` espelha a direção editorial esquerda/direita
 * do desktop.
 *
 * REGIÕES, não uma coluna de margins encadeados: a distância entre o bloco
 * do TOPO (nome/subtítulo) e o título, e entre o título e o bloco de BAIXO
 * (corpo/CTA), é feita por `MfRegion` — um espaçador `flex-grow` — em vez
 * de `marginTop`. Isso ancora o topo e o fundo de cada dobra às respectivas
 * extremidades da seção (o bloco de baixo nunca "sobe" só porque o título
 * ficou mais baixo, nem "desce" da tela em viewports baixas antes de todo
 * o espaço livre entre as regiões ter sido consumido) e preserva a
 * PROPORÇÃO do espaço acima/abaixo do título medida no Figma, em vez de
 * forçar centralização exata. Gaps pequenos e internos a uma região (nome→
 * subtítulo, corpo→CTA, corpo 1→corpo 2) continuam `marginTop` normal via
 * `rhythm()` — só as duas costuras entre regiões viram `MfRegion`.
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

/** Espaçador elástico entre duas REGIÕES de uma dobra (topo↔título,
 *  título↔bloco de baixo) — cresce/encolhe para absorver a folga vertical
 *  da viewport, com `weight` proporcional ao gap medido no Figma entre as
 *  duas regiões (não precisa ser convertido pra %: só a RAZÃO entre os
 *  dois `MfRegion` de uma dobra importa). `min-height:0` deixa encolher
 *  até 0 em viewports muito baixas antes de qualquer região ser cortada. */
export function MfRegion({ weight }: { weight: number }) {
  return <div aria-hidden="true" style={{ flex: `${weight} 1 0px`, minHeight: 0 }} />;
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
  value: ReactNode;
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
