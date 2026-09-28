"use client";

import Link from "next/link";
import styles from "./historia.module.css";
import { useReveal } from "./useReveal";
import { EPILOGUE_STATS, EPILOGUE_STATS_EN } from "../../lib/historia-data";
import { localizeHref } from "../../lib/i18n/routes";
import type { Locale } from "../../lib/i18n/locale";

const COPY = {
  pt: {
    headlinePrefix: "O que começou em ",
    headlineUnit: "300 m²",
    headlineSuffix: " hoje conecta cinco unidades em Santa Catarina.",
    closingText:
      "Quatro décadas de investimento em infraestrutura, tecnologia e pessoas transformaram uma pequena operação familiar em um grupo com presença regional, capacidade industrial e atuação integrada em reciclagem, gestão de resíduos, logística ambiental e equipamentos.",
    backToHome: "Voltar para a Home",
  },
  en: {
    headlinePrefix: "What began in ",
    headlineUnit: "300 m²",
    headlineSuffix: " now connects five units across Santa Catarina.",
    closingText:
      "Four decades of investment in infrastructure, technology and people turned a small family operation into a group with regional presence, industrial capacity and integrated work in recycling, waste management, environmental logistics and equipment.",
    backToHome: "Back to Home",
  },
} as const;

/**
 * Fecha a cronologia transformando-a em escala (Seção 13): a linha
 * termina no evento de 2026 (dentro do último capítulo); daqui em diante
 * a página fala de dimensão, não de mais um marco.
 */
export default function Epilogue({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const stats = locale === "en" ? EPILOGUE_STATS_EN : EPILOGUE_STATS;
  const { ref, active } = useReveal<HTMLDivElement>(0.3);

  return (
    <section className={styles.epilogue} aria-labelledby="epilogue-heading">
      <div className={styles.container}>
        <p className={styles.epilogueEyebrow}>1985 → 2026</p>
        <h2 id="epilogue-heading" className={styles.epilogueHeadline}>
          {t.headlinePrefix}
          <span className={styles.nowrapUnit}>{t.headlineUnit}</span>
          {t.headlineSuffix}
        </h2>

        <div ref={ref} className={`${styles.statsGrid} ${active ? styles.statsGridActive : ""}`}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>

        <p className={styles.closingText}>{t.closingText}</p>

        <div className={styles.ctaRow}>
          <Link className={styles.btn} href={localizeHref("/", locale)}>
            {t.backToHome}
          </Link>
        </div>
      </div>
    </section>
  );
}
