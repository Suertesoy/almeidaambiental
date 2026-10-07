import type { Locale } from "./i18n/locale";

/**
 * Impacto Positivo — estimativa acumulada (Home).
 *
 * NÃO é telemetria. É o acumulado oficial de um fechamento operacional da
 * Almeida, projetado pela média diária do próprio período.
 *
 * PRÓXIMA ATUALIZAÇÃO OFICIAL: edite só este bloco —
 *   • IMPACT_BASELINE_AT   → instante UTC em que o período fechado termina
 *                            (dia seguinte ao último dia incluído)
 *   • IMPACT_BASELINE_DAYS → nº de dias do período usado na média
 *   • `baseline` de cada item de IMPACT_METRICS → acumulado oficial
 * e atualize o texto do período em `IMPACT_NOTE` (components/home/HomePage.tsx).
 * Nenhum componente React precisa mudar.
 *
 * Fonte: Calculadora_Ambiental_Acumulado_2026.xlsx (01/01/2026 a 30/09/2026,
 * INCLUSIVE — o dia 30/09 já está no acumulado oficial; por isso a projeção
 * começa à 00:00 UTC de 01/10/2026, e a média é baseline ÷ 273 dias).
 * Referência temporal em UTC (não depende do fuso do visitante).
 */
export const IMPACT_BASELINE_AT = "2026-10-01T00:00:00Z";
export const IMPACT_BASELINE_DAYS = 273;

export type ImpactMetricId = "trees" | "materials" | "co2" | "water";

export interface ImpactMetricDef {
  id: ImpactMetricId;
  /** Acumulado oficial na data-base, na unidade abaixo. */
  baseline: number;
  /** Casas decimais exibidas (0 = número inteiro, truncado). */
  fractionDigits: number;
}

export const IMPACT_METRICS: readonly ImpactMetricDef[] = [
  { id: "trees", baseline: 557603, fractionDigits: 0 },
  { id: "materials", baseline: 36217.742, fractionDigits: 3 },
  { id: "co2", baseline: 61432.27, fractionDigits: 3 },
  { id: "water", baseline: 957765723, fractionDigits: 0 },
];

/** Rótulo e unidade por idioma — os dados físicos são os mesmos. */
export const IMPACT_TEXT: Record<Locale, Record<ImpactMetricId, { label: string; unit: string }>> = {
  pt: {
    trees: { label: "árvores preservadas", unit: "" },
    materials: { label: "materiais reciclados", unit: "t" },
    co2: { label: "CO₂ evitado", unit: "t" },
    water: { label: "água economizada", unit: "litros" },
  },
  en: {
    trees: { label: "trees preserved", unit: "" },
    materials: { label: "materials recycled", unit: "t" },
    co2: { label: "CO₂ avoided", unit: "t" },
    water: { label: "water saved", unit: "liters" },
  },
};

const NUMBER_LOCALE: Record<Locale, string> = { pt: "pt-BR", en: "en-US" };
const MS_PER_DAY = 86_400_000;
const BASELINE_MS = Date.parse(IMPACT_BASELINE_AT);

/**
 * Valor projetado em `nowMs` (epoch ms): baseline + decorrido × taxa.
 * Sempre derivado do tempo absoluto (sem acumular ticks, sem drift).
 * Antes da data-base nunca fica abaixo do acumulado oficial.
 */
export function getProjectedValue(metric: ImpactMetricDef, nowMs: number): number {
  const ratePerMs = metric.baseline / IMPACT_BASELINE_DAYS / MS_PER_DAY;
  const elapsedMs = Math.max(0, nowMs - BASELINE_MS);
  return metric.baseline + elapsedMs * ratePerMs;
}

/** Número formatado no locale, sem unidade. Inteiros são truncados (nunca "uma árvore e meia"). */
export function formatImpactNumber(metric: ImpactMetricDef, value: number, locale: Locale): string {
  const digits = metric.fractionDigits;
  const factor = 10 ** digits;
  const shown = digits === 0 ? Math.floor(value) : Math.round(value * factor) / factor;
  return shown.toLocaleString(NUMBER_LOCALE[locale], {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}
