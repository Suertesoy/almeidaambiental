"use client";

import { useEffect, useRef, useState } from "react";
import shared from "../shared/company-page.module.css";
import styles from "./equipamentos.module.css";
import { DENSITY_STAGES } from "../../lib/equipamentos-data";

/**
 * Ponte editorial entre os seis produtos e "qual tecnologia para qual
 * material": mostra que compactar não é só reduzir volume, é aproveitar
 * melhor cada transporte. Gráfico conceitual (sem eixos, sem grid, sem
 * biblioteca) — ver DENSITY_STAGES em lib/equipamentos-data.ts para o
 * porquê de não haver kg nas barras.
 */
export default function LogisticsEfficiency() {
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
      className={`${shared.section} ${shared.toneForest} ${styles.densitySection}`}
      aria-labelledby="densidade-heading"
    >
      <div className={shared.container}>
        <p className={`${shared.eyebrow} ${shared.eyebrowAccent}`}>Eficiência logística</p>
        <h2 id="densidade-heading" className={shared.headline}>
          Eficiência que aparece no transporte.
        </h2>
        <p className={shared.body}>
          Quanto maior a densidade, melhor o aproveitamento de espaço, armazenamento e transporte.
        </p>

        <div
          ref={chartRef}
          className={`${styles.densityChart} ${active ? styles.densityChartActive : ""}`}
          role="img"
          aria-label="Gráfico ilustrativo comparando três estágios de densidade de material: solto (baixa densidade), prensado (densidade intermediária) e compactado (alta densidade), com a barra de material compactado visivelmente maior que as demais."
        >
          {DENSITY_STAGES.map((stage) => (
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
              {stage.id === "compactado" && <p className={styles.densityBarRatio}>até 5:1*</p>}
            </div>
          ))}
        </div>

        <p className={styles.densityNote}>
          * Referência técnica do Compactador de Fuso Pöttinger. A relação varia conforme material, equipamento,
          configuração e operação.
        </p>
      </div>
    </section>
  );
}
