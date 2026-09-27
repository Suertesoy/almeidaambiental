"use client";

import { useEffect, useRef, useState } from "react";
import shared from "../shared/company-page.module.css";
import styles from "./equipamentos.module.css";
import { DENSITY_STAGES, DENSITY_STAGES_EN } from "../../lib/equipamentos-data";
import type { Locale } from "../../lib/i18n/locale";

const COPY = {
  pt: {
    eyebrow: "Eficiência logística",
    headline: "Eficiência que aparece no transporte.",
    body: "Quanto maior a densidade, melhor o aproveitamento de espaço, armazenamento e transporte.",
    chartAriaLabel:
      "Gráfico ilustrativo comparando três estágios de densidade de material: solto (baixa densidade), prensado (densidade intermediária) e compactado (alta densidade), com a barra de material compactado visivelmente maior que as demais.",
    ratioLabel: "até 5:1*",
    note: "* Referência técnica do Compactador de Fuso Pöttinger. A relação varia conforme material, equipamento, configuração e operação.",
  },
  en: {
    eyebrow: "Logistics efficiency",
    headline: "Efficiency that shows up in transport.",
    body: "The higher the density, the better the use of space, storage and transport.",
    chartAriaLabel:
      "Illustrative chart comparing three stages of material density: loose (low density), baled (intermediate density) and compacted (high density), with the compacted material bar visibly larger than the others.",
    ratioLabel: "up to 5:1*",
    note: "* Technical reference for the Pöttinger Screw Compactor. The ratio varies according to material, equipment, configuration and operation.",
  },
} as const;

/**
 * Ponte editorial entre os seis produtos e "qual tecnologia para qual
 * material": mostra que compactar não é só reduzir volume, é aproveitar
 * melhor cada transporte. Gráfico conceitual (sem eixos, sem grid, sem
 * biblioteca) — ver DENSITY_STAGES em lib/equipamentos-data.ts para o
 * porquê de não haver kg nas barras.
 *
 * Consolidação de territórios (Seção 11 da rodada): usava toneForest —
 * a cor de identidade da Almeida AMBIENTAL, não da Equipamentos, que
 * pediu para ser "um único ambiente claro e contínuo". Passa a usar a
 * mesma superfície stone das seções vizinhas.
 */
export default function LogisticsEfficiency({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const densityStages = locale === "en" ? DENSITY_STAGES_EN : DENSITY_STAGES;
  const chartRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = chartRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`${shared.section} ${shared.toneStone} ${styles.densitySection}`}
      aria-labelledby="densidade-heading"
    >
      <div className={shared.container}>
        <p className={`${shared.eyebrow} ${shared.eyebrowAccent}`}>{t.eyebrow}</p>
        <h2 id="densidade-heading" className={shared.headline}>
          {t.headline}
        </h2>
        <p className={shared.body}>{t.body}</p>

        <div
          ref={chartRef}
          className={`${styles.densityChart} ${active ? styles.densityChartActive : ""}`}
          role="img"
          aria-label={t.chartAriaLabel}
        >
          {densityStages.map((stage) => (
            <div key={stage.id} className={styles.densityBar} aria-hidden="true">
              <div className={styles.densityBarTrack}>
                <span
                  className={styles.densityBarFill}
                  style={{ ["--bar-scale" as string]: stage.scale }}
                  data-stage={stage.id}
                />
              </div>
              <p className={styles.densityBarLabel}>{stage.label}</p>
              <p className={styles.densityBarTag}>{stage.density}</p>
              {/* Checkpoint C (Seção 16): "até 5:1" vira anotação do gráfico,
                  ligada visualmente só à barra de material compactado — o
                  * remete à nota técnica abaixo, que mantém o número preso
                  ao Compactador de Fuso (ver comentário em
                  lib/equipamentos-data.ts sobre por que as três barras não
                  têm um número comparável entre si). */}
              {stage.id === "compactado" && <p className={styles.densityBarRatio}>{t.ratioLabel}</p>}
            </div>
          ))}
        </div>

        <p className={styles.densityNote}>{t.note}</p>
      </div>
    </section>
  );
}
