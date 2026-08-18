import type { MetricFormat } from "../AnimatedMetric";

/**
 * Métricas oficiais de impacto ESG (mesmos valores usados na Home 1,
 * dobra 9 — ver components/HomeSections.tsx). Cópia local de dados, não
 * importa de HomeSections.tsx para não acoplar /home2 e /home3 à
 * árvore de componentes da Home 1. Não alterar os números oficiais.
 */
export const IMPACT_METRICS: Array<{
  target: number;
  format: MetricFormat;
  suffix: string;
  display: string;
  label: string;
}> = [
  { target: 818907, format: "integer", suffix: "", display: "818.907", label: "árvores preservadas" },
  { target: 54873, format: "integer", suffix: " t", display: "54.873 t", label: "materiais reciclados" },
  { target: 153114, format: "integer", suffix: " t", display: "153.114 t", label: "CO₂ evitadas" },
  { target: 1.27, format: "decimal2", suffix: " bi", display: "1,27 bi", label: "litros de água economizados" },
];
