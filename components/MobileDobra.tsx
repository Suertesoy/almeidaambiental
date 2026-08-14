import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { mf } from "../lib/mobile-fit";
import { ChevronDownIcon } from "./icons";

/**
 * Primitivos de posicionamento absoluto usados só pela composição mobile
 * (<1024px) das dobras da Home — cada instância recebe suas próprias
 * coordenadas (ver especificação numérica em app/globals.css e nas seções
 * 14 a 22 da tarefa que originou este arquivo). Nunca deriva posição de
 * irmãos: cada elemento é absoluto com seu próprio `top`.
 *
 * Regra de escala (lib/mobile-fit.ts): `mf()` só é aplicado a left/width/
 * font-size (grandezas horizontais). top/bottom/height/line-height/
 * letter-spacing permanecem literais, exatamente como especificado.
 */

type Segment = { text: string; gold?: boolean };
type TitleLine = Segment[];

function renderLine(line: TitleLine, keyPrefix: string) {
  return line.map((seg, i) =>
    seg.gold ? (
      <em key={`${keyPrefix}-${i}`} className="mf-d-title-gold">
        {seg.text}
      </em>
    ) : (
      <span key={`${keyPrefix}-${i}`}>{seg.text}</span>
    )
  );
}

export function MfLabel({
  top,
  centerX,
  fontSize,
  lineHeight,
  letterSpacing,
  children,
}: {
  top: number;
  centerX: number;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  children: ReactNode;
}) {
  const style: CSSProperties = {
    top: `${top}px`,
    left: mf(centerX),
    transform: "translateX(-50%)",
    fontSize: mf(fontSize),
    lineHeight: `${lineHeight}px`,
    letterSpacing: `${letterSpacing}px`,
  };
  return (
    <p className="mf-d-label" style={style}>
      {children}
    </p>
  );
}

export function MfSubtitle({
  top,
  centerX,
  fontSize,
  lineHeight,
  letterSpacing = 0,
  className = "mf-d-subtitle",
  children,
}: {
  top: number;
  centerX: number;
  fontSize: number;
  lineHeight: number;
  letterSpacing?: number;
  className?: string;
  children: ReactNode;
}) {
  const style: CSSProperties = {
    top: `${top}px`,
    left: mf(centerX),
    transform: "translateX(-50%)",
    fontSize: mf(fontSize),
    lineHeight: `${lineHeight}px`,
    letterSpacing: `${letterSpacing}px`,
  };
  return (
    <p className={className} style={style}>
      {children}
    </p>
  );
}

export function MfTitle({
  top,
  left,
  width,
  fontSize,
  lineHeight,
  letterSpacing,
  lines,
  plain = false,
  semibold = true,
}: {
  top: number;
  left: number;
  width: number;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  lines: TitleLine[];
  plain?: boolean;
  semibold?: boolean;
}) {
  const style: CSSProperties = {
    top: `${top}px`,
    left: mf(left),
    width: mf(width),
    fontSize: mf(fontSize),
    lineHeight: `${lineHeight}px`,
    letterSpacing: `${letterSpacing}px`,
    textTransform: plain ? "none" : "uppercase",
    fontWeight: semibold ? 600 : 700,
  };
  return (
    <h2 className="mf-d-title" style={style}>
      {lines.map((line, i) => (
        <span key={i}>{renderLine(line, String(i))}</span>
      ))}
    </h2>
  );
}

export function MfBody({
  top,
  left,
  width,
  fontSize,
  lineHeight,
  letterSpacing,
  nowrap = false,
  children,
}: {
  top: number;
  left: number;
  width: number;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  nowrap?: boolean;
  children: ReactNode;
}) {
  const style: CSSProperties = {
    top: `${top}px`,
    left: mf(left),
    width: mf(width),
    fontSize: mf(fontSize),
    lineHeight: `${lineHeight}px`,
    letterSpacing: `${letterSpacing}px`,
    whiteSpace: nowrap ? "nowrap" : "normal",
  };
  return (
    <p className="mf-d-body" style={style}>
      {children}
    </p>
  );
}

export function MfButton({
  top,
  left,
  width = 335,
  height = 52,
  variant,
  href,
  disabled,
  children,
}: {
  top: number;
  left: number;
  width?: number;
  height?: number;
  variant: "primary" | "secondary";
  href?: string;
  disabled?: boolean;
  children: ReactNode;
}) {
  const style: CSSProperties = {
    top: `${top}px`,
    left: mf(left),
    width: mf(width),
    height: `${height}px`,
  };
  const className = `mf-btn ${variant === "primary" ? "mf-btn-primary" : "mf-btn-secondary"}`;
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

export function MfScrollHint({ bottom = 22 }: { bottom?: number }) {
  return (
    <>
      <div className="mf-bottom-fade" aria-hidden="true" />
      <div className="mf-d-arrow" style={{ bottom: `${bottom}px` }} aria-hidden="true">
        <ChevronDownIcon />
      </div>
    </>
  );
}

export function MfMetric({
  top,
  value,
  label,
}: {
  top: number;
  value: string;
  label: string;
}) {
  return (
    <div className="mf-d-metric" style={{ top: `${top}px` }}>
      <p className="mf-d-metric-value">{value}</p>
      <p className="mf-d-metric-label">{label}</p>
    </div>
  );
}
