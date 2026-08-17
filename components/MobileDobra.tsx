import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import type { LockupTokens } from "../lib/responsive-type";
import { contentWidth } from "../lib/responsive-type";
import { ChevronDownIcon } from "./icons";

/**
 * Primitivos de LAYOUT DE FLUXO (flex column) usados pela composição
 * mobile+tablet (<1024px) das dobras da Home.
 *
 * `MfFrame` tem TRÊS VARIANTES de `padding-top` (`data-variant`, ver
 * app/globals.css) — medidas fixas a partir do fim real do header, não uma
 * regra genérica única:
 *   - `hero`: header + 96px (Grupo Almeida — regra 3 da tarefa). Composição
 *     própria, não reaproveita a variante institucional.
 *   - `institutional`: header + 72px (título institucional — regra 11).
 *   - `default` (dobras de fechamento/impacto, sem nome/subtítulo): mantém
 *     o valor anterior, header + 40px.
 *
 * Dentro do frame, `MfCenter` (`flex:1`) centraliza a headline sozinha no
 * espaço realmente disponível entre o bloco de cima e o de baixo,
 * independente do tamanho de qualquer um dos dois; `MfBottom` tem altura
 * natural e fica encostado no fim do frame, seguido por `MfScrollHint`
 * (irmão de `MfFrame`, `margin-top: 32px` fixos — regra 27) — o bloco de
 * baixo nunca é calculado a partir da headline, e a headline nunca desliza
 * porque o body/subtítulo mudou de tamanho.
 *
 * A partir de 600px, `data-tablet-align` espelha a direção editorial
 * esquerda/direita do desktop para a headline/CTA — nome+subtítulo
 * institucional permanecem sempre centralizados (regras 13/14), em
 * qualquer largura.
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
  variant = "default",
}: {
  children: ReactNode;
  tabletAlign?: "center" | "left" | "right";
  /** "hero" (header+96px), "institutional" (header+72px) ou "default"
   *  (header+40px, dobras de fechamento/impacto sem nome/subtítulo). */
  variant?: "default" | "hero" | "institutional";
}) {
  return (
    <div className="mf-frame" data-tablet-align={tabletAlign} data-variant={variant}>
      {children}
    </div>
  );
}

/** Bloco NOME + SUBTÍTULO institucional (regras 11–17 da tarefa): largura
 *  alvo de 348px na referência 393px, sempre centralizado horizontalmente
 *  dentro do frame — independente de `tabletAlign` (headline/CTA podem
 *  espelhar esquerda/direita no tablet, mas nome+subtítulo não). */
export function MfInstitutionalTop({ children }: { children: ReactNode }) {
  return <div className="mf-institutional-top">{children}</div>;
}

/** Região CENTER: a headline vive aqui, centralizada no espaço disponível
 *  entre o topo (nome/subtítulo) e o bloco de baixo (`MfBottom`) — nunca
 *  no centro matemático da tela inteira. `align="left"` cobre as dobras
 *  sem nome/subtítulo (fechamento/impacto), onde o título também fica à
 *  esquerda em vez de centralizado. */
export function MfCenter({
  align = "center",
  children,
}: {
  align?: "center" | "left";
  children: ReactNode;
}) {
  return (
    <div className="mf-center" data-align={align}>
      {children}
    </div>
  );
}

/** Região BOTTOM: texto menor + botão (ou só texto), ancorada a partir do
 *  fundo do frame — a distância até o `MfScrollHint` seguinte é fixa
 *  (16px, ver `.mf-scrollhint` em app/globals.css), nunca calculada a
 *  partir da headline. */
export function MfBottom({
  align = "center",
  children,
}: {
  align?: "center" | "left";
  children: ReactNode;
}) {
  return (
    <div className="mf-bottom" data-align={align}>
      {children}
    </div>
  );
}

export function MfLabel({
  tokens,
  children,
}: {
  tokens: LockupTokens;
  children: ReactNode;
}) {
  const style: CSSProperties = {
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

/** Sempre 4px abaixo do título institucional (`.mf-d-subtitle` já define
 *  essa margem fixa em CSS) — não aceita `marginTop` próprio de propósito,
 *  para não reabrir a ambiguidade que essa relação tinha antes. */
export function MfSubtitle({
  tokens,
  children,
}: {
  tokens: LockupTokens;
  children: ReactNode;
}) {
  const style: CSSProperties = {
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
  /** Só usado na Hero, onde a headline soma ao mesmo bloco central de
   *  "Grupo Almeida"/"40 anos" (regra 10 da tarefa) — nas demais dobras a
   *  headline é o único filho de `MfCenter`, sem necessidade de margem. */
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

/** Regra 8 da tarefa: largura sempre igual à do botão (CSS `.mf-d-body`
 *  já fixa `width:100%; max-width:380px`, o mesmo container de
 *  `.mf-d-actions`/`.mf-btn`) e texto sempre `text-align:left`, mesmo
 *  quando o bloco (via `MfBottom`) está centralizado ou à direita. */
export function MfBody({
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
    <p className="mf-d-body" style={style}>
      {children}
    </p>
  );
}

export function MfActions({
  marginTop,
  gap,
  children,
}: {
  marginTop?: string;
  /** Override do gap padrão (clamp 8–16px, ver `.mf-d-actions`). Só a Hero
   *  usa isto: 8px fixos entre os dois CTAs, não responsivo (regra 6). */
  gap?: string;
  children: ReactNode;
}) {
  return (
    <div className="mf-d-actions" style={{ marginTop, gap }}>
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

/** Indicador de rolagem CLICÁVEL (regras 11/13 da tarefa): botão real
 *  (não mais uma div aria-hidden), 44×44 de alvo de toque, focus-visible.
 *  `onAdvance` dispara o MESMO mecanismo de navegação usado pelo wheel
 *  desktop (ver `goToIndex` em ScrollVideoExperience.tsx) — sem lógica
 *  duplicada. */
export function MfScrollHint({
  label,
  isLast = false,
  onAdvance,
}: {
  label?: string;
  isLast?: boolean;
  onAdvance: () => void;
}) {
  return (
    <div className="mf-scrollhint">
      <div className="mf-bottom-fade" aria-hidden="true" />
      {label ? <p className="mf-hero-scroll-label">{label}</p> : null}
      <button
        type="button"
        className="mf-d-arrow"
        onClick={onAdvance}
        aria-label={isLast ? "Ir para o rodapé" : "Ir para a próxima seção"}
      >
        <ChevronDownIcon />
      </button>
    </div>
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
