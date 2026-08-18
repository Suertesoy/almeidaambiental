"use client";

import { useRef } from "react";
import Link from "next/link";
import styles from "./home2.module.css";
import { WhatsAppIcon } from "../icons";
import SectionMedia from "../shared/SectionMedia";
import Reveal from "../shared/Reveal";
import { CountUpMetric, useEnterOnce } from "../AnimatedMetric";
import { IMPACT_METRICS } from "../shared/impactMetrics";

const IMG_GRUPO = "/images/home-variants/group/grupo-aerial-cinematic.webp";
const IMG_AMBIENTAL = "/images/home-variants/ambiental/ambiental-logistica-cinematic.webp";
const IMG_EQUIPAMENTOS = "/images/home-variants/equipamentos/equipamentos-compactador.webp";
const IMG_SATURNO = "/images/home-variants/saturno/saturno-galpao.webp";

export default function Home2Page() {
  const impactRef = useRef<HTMLDivElement>(null);
  const impactActive = useEnterOnce([impactRef]);

  return (
    <div className={styles.page} data-page="home2">
      {/* ---------------- Hero ---------------- */}
      <section className={`${styles.section} ${styles.toneCarvao}`}>
        <div className={styles.sectionInner}>
          <div className={`${styles.splitGrid} ${styles.mediaRight}`}>
            <div className={styles.content}>
              <Reveal className={styles.heroContentInner}>
                <p className={styles.eyebrow}>Grupo Almeida</p>
                <p className={styles.years}>40 anos</p>
                <h1 className={styles.headline}>
                  TRANSFORMANDO
                  <br />
                  RESÍDUO
                  <br />
                  EM <span className={styles.gold}>RESULTADO</span>
                </h1>
                <div className={styles.ctaRow}>
                  <a className={`${styles.btn} ${styles.btnPrimary}`} href="#home2-ambiental">
                    <WhatsAppIcon />
                    Falar com o Grupo Almeida
                  </a>
                  <a className={`${styles.btn} ${styles.btnSecondaryOnDark}`} href="#home2-ambiental">
                    Conheça nossa história
                  </a>
                </div>
              </Reveal>
            </div>
            <Reveal className={`${styles.media} ${styles.mediaGradientCarvao}`}>
              <SectionMedia
                imageSrc={IMG_GRUPO}
                alt="Vista aérea da unidade operacional do Grupo Almeida"
                objectPosition="center 42%"
                priority
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Almeida Ambiental ---------------- */}
      <section id="home2-ambiental" className={`${styles.section} ${styles.toneLight}`}>
        <div className={styles.sectionInner}>
          <div className={`${styles.splitGrid} ${styles.mediaRight}`}>
            <Reveal className={styles.content}>
              <p className={styles.eyebrow}>Almeida Ambiental</p>
              <p className={styles.kicker}>Diagnóstico · Coleta · Triagem · Trituração · Descaracterização</p>
              <h2 className={styles.headline}>
                RESÍDUOS GANHAM
                <br />
                UM NOVO <span className={styles.gold}>DESTINO</span>
              </h2>
              <p className={styles.body}>
                Há quatro décadas, conhecimento técnico e experiência operacional se encontram na gestão
                responsável de resíduos.
              </p>
              <div className={styles.ctaRow}>
                <Link className={`${styles.btn} ${styles.btnPrimary}`} href="/almeida-ambiental">
                  Conheça Almeida Ambiental
                </Link>
              </div>
            </Reveal>
            <Reveal>
              <div className={styles.media}>
                <SectionMedia imageSrc={IMG_AMBIENTAL} alt="Operação da Almeida Ambiental" objectPosition="center 40%" />
              </div>
              <div className={styles.calloutCard}>
                <p className={styles.headlineSm}>
                  <span className={styles.gold}>EFICIÊNCIA</span> EM CADA ETAPA DO PROCESSO
                </p>
                <p className={styles.bodySm}>
                  Da coleta à destinação, a Almeida Ambiental reúne estrutura, tecnologia e experiência para
                  transformar resíduos em valor, com mais eficiência logística, segurança e responsabilidade
                  ambiental.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Almeida Equipamentos ---------------- */}
      <section id="home2-equipamentos" className={`${styles.section} ${styles.toneCarvao}`}>
        <div className={styles.sectionInner}>
          <div className={`${styles.splitGrid} ${styles.mediaLeft}`}>
            <Reveal className={`${styles.media} ${styles.mediaDuotone}`}>
              <SectionMedia imageSrc={IMG_EQUIPAMENTOS} alt="Compactador industrial da Almeida Equipamentos" objectPosition="center 55%" />
            </Reveal>
            <Reveal className={styles.content}>
              <p className={styles.eyebrow}>Almeida Equipamentos</p>
              <p className={styles.kicker}>Compactadores · Prensas · Trituradores · Containers</p>
              <h2 className={styles.headline}>
                <span className={styles.gold}>TECNOLOGIA</span> QUE NASCEU DA PRÓPRIA OPERAÇÃO
              </h2>
              <p className={styles.body}>
                Criada para aperfeiçoar os processos do Grupo Almeida, a Almeida Equipamentos transforma
                décadas de experiência no setor em tecnologia aplicada à gestão de resíduos.
              </p>
              <p className={styles.headlineSm}>
                ENGENHARIA PARA MOVIMENTAR <span className={styles.gold}>MAIS COM MENOS</span>
              </p>
              <p className={styles.bodySm}>
                Compactadores, prensas e tecnologias desenvolvidas para diferentes materiais, volumes e
                realidades operacionais. Conhecimento de campo conectado a tecnologias internacionais.
              </p>
              <div className={styles.ctaRow}>
                <Link className={`${styles.btn} ${styles.btnPrimary}`} href="/almeida-equipamentos">
                  Conheça Almeida Equipamentos
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Saturno Ambiental ---------------- */}
      <section id="home2-saturno" className={`${styles.section} ${styles.toneMuted}`}>
        <div className={styles.sectionInner}>
          <div className={`${styles.splitGrid} ${styles.mediaRight}`}>
            <Reveal className={styles.content}>
              <p className={styles.eyebrow}>Saturno Ambiental</p>
              <p className={styles.locationLine}>Blumenau · Vale do Itajaí</p>
              <p className={styles.kicker}>Gestão de Resíduos · Cartonagem · Consultoria</p>
              <h2 className={styles.headline}>
                <span className={styles.gold}>EXPERIÊNCIA</span>
                <br />
                REGIONAL.
                <br />
                FORÇA DE GRUPO.
              </h2>
              <p className={styles.headlineSm}>
                GESTÃO AMBIENTAL QUE <span className={styles.gold}>VAI ALÉM</span> DA COLETA
              </p>
              <p className={styles.body}>
                Coleta, triagem, trituração, cartonagem e consultoria ambiental fazem parte de uma atuação
                construída para unir eficiência operacional e responsabilidade ambiental.
              </p>
              <div className={styles.ctaRow}>
                <Link className={`${styles.btn} ${styles.btnPrimary}`} href="/saturno-ambiental">
                  Conheça Saturno Ambiental
                </Link>
              </div>
            </Reveal>
            <Reveal className={`${styles.media} ${styles.mediaWarm}`}>
              <SectionMedia imageSrc={IMG_SATURNO} alt="Operação regional da Saturno Ambiental em Blumenau" objectPosition="center 55%" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Fechamento institucional ---------------- */}
      <section className={`${styles.section} ${styles.toneCarvao}`}>
        <div className={styles.sectionInner}>
          <Reveal className={styles.closingInner}>
            <h2 className={styles.headline}>
              O QUE COMEÇOU
              <br />
              COM PAPEL E PAPELÃO
              <br />
              HOJE CONECTA
              <br />
              <span className={styles.gold}>OPERAÇÃO,</span> TECNOLOGIA E
              <br />
              SUSTENTABILIDADE.
            </h2>
            <p className={styles.body}>Há 40 anos transformando o presente, pensando no futuro.</p>
            <div className={styles.ctaRow}>
              <Link className={`${styles.btn} ${styles.btnPrimary}`} href="/contato">
                Entre em contato com o Grupo Almeida
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Impacto ---------------- */}
      <section className={`${styles.section} ${styles.toneCarvao}`}>
        <div className={styles.sectionInner} ref={impactRef}>
          <div className={styles.impactTop}>
            <Reveal>
              <h2 className={styles.impactHeadline}>
                Cada resíduo processado vira um número que a{" "}
                <span className={styles.gold}>natureza reconhece.</span>
              </h2>
            </Reveal>
            <Reveal>
              <div className={styles.metricsGrid}>
                {IMPACT_METRICS.map((metric) => (
                  <div key={metric.label} className={styles.metricItem}>
                    <span className={styles.metricValue}>
                      <CountUpMetric
                        target={metric.target}
                        format={metric.format}
                        suffix={metric.suffix}
                        display={metric.display}
                        active={impactActive}
                      />
                    </span>
                    <span className={styles.metricLabel}>{metric.label}</span>
                  </div>
                ))}
              </div>
              <div className={styles.impactActions}>
                <button type="button" className={`${styles.btn} ${styles.btnSecondaryOnDark}`} disabled>
                  Ver Relatório de Sustentabilidade 2025
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
