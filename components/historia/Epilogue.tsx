"use client";

import Link from "next/link";
import styles from "./historia.module.css";
import { useReveal } from "./useReveal";
import { EPILOGUE_STATS } from "../../lib/historia-data";

/**
 * Fecha a cronologia transformando-a em escala (Seção 13): a linha
 * termina no evento de 2026 (dentro do último capítulo); daqui em diante
 * a página fala de dimensão, não de mais um marco.
 */
export default function Epilogue() {
  const { ref, active } = useReveal<HTMLDivElement>(0.3);

  return (
    <section className={styles.epilogue} aria-labelledby="epilogue-heading">
      <div className={styles.container}>
        <p className={styles.epilogueEyebrow}>1985 → 2026</p>
        <h2 id="epilogue-heading" className={styles.epilogueHeadline}>
          O que começou em <span className={styles.nowrapUnit}>300 m²</span> hoje conecta cinco unidades em Santa
          Catarina.
        </h2>

        <div ref={ref} className={`${styles.statsGrid} ${active ? styles.statsGridActive : ""}`}>
          {EPILOGUE_STATS.map((stat) => (
            <div key={stat.label} className={styles.statItem}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>

        <p className={styles.closingText}>
          Quatro décadas de investimento em infraestrutura, tecnologia e pessoas transformaram uma pequena
          operação familiar em um grupo com presença regional, capacidade industrial e atuação integrada em
          reciclagem, gestão de resíduos, logística ambiental e equipamentos.
        </p>

        <div className={styles.ctaRow}>
          <Link className={styles.btn} href="/">
            Voltar para a Home
          </Link>
        </div>
      </div>
    </section>
  );
}
