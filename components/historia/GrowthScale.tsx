"use client";

import styles from "./historia.module.css";
import { useReveal } from "./useReveal";
import { GROWTH_SCALE } from "../../lib/historia-data";
import type { Locale } from "../../lib/i18n/locale";

const STEP_CLASS = [
  styles.growthStep0,
  styles.growthStep1,
  styles.growthStep2,
  styles.growthStep3,
  styles.growthStep4,
  styles.growthStep5,
];

const COPY = {
  pt: {
    eyebrow: "Uma história em metros quadrados",
    headline: "De 300 m² a 5.500 m²: quatro décadas de escala.",
    numberLocale: "pt-BR",
  },
  en: {
    eyebrow: "A story measured in square meters",
    headline: "From 300 m² to 5,500 m²: four decades of scale.",
    numberLocale: "en-US",
  },
} as const;

function GrowthItem({
  year,
  sqm,
  index,
  numberLocale,
}: {
  year: number;
  sqm: number;
  index: number;
  numberLocale: string;
}) {
  const { ref, active } = useReveal<HTMLDivElement>(0.5);
  return (
    <div
      ref={ref}
      className={`${styles.growthItem} ${active ? styles.growthItemActive : ""} ${STEP_CLASS[index] ?? ""}`}
    >
      <span className={styles.growthYear}>{year}</span>
      <span className={styles.growthValue}>{sqm.toLocaleString(numberLocale)} m²</span>
    </div>
  );
}

/**
 * Subnarrativa tipográfica de crescimento (Seção 9): os mesmos seis marcos
 * de área construída já presentes nos eventos da timeline, aqui isolados
 * numa escala visual — o número cresce de tamanho junto com o metro
 * quadrado, para que o crescimento seja sentido, não só lido.
 */
export default function GrowthScale({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  return (
    <section className={`${styles.growthScale} ${styles.chapterStone}`} aria-labelledby="growth-scale-heading">
      <div className={styles.container}>
        <div className={styles.spineBridgeOuter}>
          <div className={styles.spineBridge} aria-hidden="true">
            <span className={styles.spineBridgeLine} />
          </div>
        </div>

        <div className={styles.growthHead}>
          <p className={styles.eyebrow}>{t.eyebrow}</p>
          <h2 id="growth-scale-heading" className={styles.chapterHeadline}>
            {t.headline}
          </h2>
        </div>
        <div className={styles.growthList}>
          {GROWTH_SCALE.map((item, index) => (
            <GrowthItem key={item.year} year={item.year} sqm={item.sqm} index={index} numberLocale={t.numberLocale} />
          ))}
        </div>

        <div className={styles.spineBridgeOuter}>
          <div className={styles.spineBridge} aria-hidden="true">
            <span className={styles.spineBridgeLine} />
          </div>
        </div>
      </div>
    </section>
  );
}
