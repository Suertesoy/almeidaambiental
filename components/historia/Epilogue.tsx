"use client";

import styles from "./historia.module.css";
import { useReveal } from "./useReveal";
import { EPILOGUE_STATS, EPILOGUE_STATS_EN } from "../../lib/historia-data";
import type { Locale } from "../../lib/i18n/locale";

const COPY = {
  pt: {
    headlinePrefix: "O que começou em ",
    headlineUnit: "300 m²",
    headlineSuffix: " hoje conecta cinco unidades em Santa Catarina.",
    closingText:
      "Quatro décadas de investimento em infraestrutura, tecnologia e pessoas fizeram de uma operação familiar um grupo integrado em reciclagem, gestão de resíduos, logística ambiental e equipamentos.",
  },
  en: {
    headlinePrefix: "What began in ",
    headlineUnit: "300 m²",
    headlineSuffix: " now connects five units across Santa Catarina.",
    closingText:
      "Four decades of investment in infrastructure, technology and people turned a family operation into a group working across recycling, waste management, environmental logistics and equipment.",
  },
} as const;

/**
 * Lado textual do epílogo (o mapa, ao lado, é ExpansionMap): conclusão da
 * cronologia. A linha termina no evento de 2026; daqui em diante a página
 * fala de dimensão. Os números 5.500 m² e 3.000 m² saíram dos stats — já
 * aparecem na escala e nos eventos. Não há CTA aqui: o retorno à Home é o
 * botão fixo da página, e a continuação são as empresas (ClosingChapter).
 */
export default function Epilogue({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const stats = locale === "en" ? EPILOGUE_STATS_EN : EPILOGUE_STATS;
  const { ref, active } = useReveal<HTMLDivElement>(0.3);

  return (
    <div>
      <p className={styles.epilogueEyebrow}>1985 → 2026</p>
      <h2 id="epilogue-heading" className={styles.epilogueHeadline}>
        {t.headlinePrefix}
        <span className={styles.nowrapUnit}>{t.headlineUnit}</span>
        {t.headlineSuffix}
      </h2>

      <p className={styles.closingText}>{t.closingText}</p>

      <div ref={ref} className={`${styles.statsGrid} ${active ? styles.statsGridActive : ""}`}>
        {stats.map((stat) => (
          <div key={stat.label} className={styles.statItem}>
            <span className={styles.statValue}>{stat.value}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
