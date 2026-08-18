"use client";

import { useRef } from "react";
import Link from "next/link";
import styles from "./home3.module.css";
import { WhatsAppIcon } from "../icons";
import SectionMedia from "../shared/SectionMedia";
import Reveal from "../shared/Reveal";
import { CountUpMetric, useEnterOnce } from "../AnimatedMetric";
import { IMPACT_METRICS } from "../shared/impactMetrics";

const IMG_GRUPO_HERO = "/images/home-variants/group/grupo-aerial-clean.webp";
const IMG_AMBIENTAL_CARD = "/images/home-variants/ambiental/ambiental-logistica-clean.webp";
const IMG_EQUIPAMENTOS_CARD = "/images/home-variants/equipamentos/equipamentos-triturador.webp";
const IMG_SATURNO_CARD = "/images/home-variants/saturno/saturno-fardos.webp";
const IMG_EQUIPAMENTOS_SPOTLIGHT = "/images/home-variants/equipamentos/equipamentos-detalhe-mecanico.webp";
const IMG_SATURNO_SPOTLIGHT = "/images/home-variants/saturno/saturno-operacao.webp";

const PROCESS_STEPS = ["Diagnóstico", "Coleta", "Triagem", "Trituração", "Descaracterização"];

export default function Home3Page() {
  const tractionRef = useRef<HTMLDivElement>(null);
  const tractionActive = useEnterOnce([tractionRef]);

  return (
    <div className={styles.page} data-page="home3">
      {/* ---------------- Hero modular ---------------- */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <Reveal>
              <p className={styles.eyebrow}>Grupo Almeida</p>
              <span className={styles.badge}>40 ANOS</span>
              <h1 className={styles.headlineXl}>
                TRANSFORMANDO
                <br />
                RESÍDUO
                <br />
                EM <span className={styles.gold}>RESULTADO</span>
              </h1>
              <p className={styles.body}>Há 40 anos transformando o presente, pensando no futuro.</p>
              <div className={styles.ctaRow}>
                <a className={`${styles.btn} ${styles.btnPrimary}`} href="#home3-ecossistema">
                  <WhatsAppIcon />
                  Falar com o Grupo Almeida
                </a>
                <a className={`${styles.btn} ${styles.btnOutline}`} href="#home3-ecossistema">
                  Conheça nossa história
                </a>
              </div>
            </Reveal>
            <Reveal className={styles.heroMedia}>
              <SectionMedia
                imageSrc={IMG_GRUPO_HERO}
                alt="Vista aérea da unidade operacional do Grupo Almeida"
                objectPosition="center 45%"
                priority
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Faixa de tração / ESG ---------------- */}
      <section className={styles.toneOliveLight}>
        <div className={`${styles.container} ${styles.tractionSection}`} ref={tractionRef}>
          <Reveal>
            <div className={styles.tractionGrid}>
              {IMPACT_METRICS.map((metric) => (
                <div key={metric.label} className={styles.tractionItem}>
                  <span className={styles.tractionValue}>
                    <CountUpMetric
                      target={metric.target}
                      format={metric.format}
                      suffix={metric.suffix}
                      display={metric.display}
                      active={tractionActive}
                    />
                  </span>
                  <span className={styles.tractionLabel}>{metric.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Ecossistema Almeida ---------------- */}
      <section id="home3-ecossistema" className={styles.section}>
        <div className={styles.container}>
          <Reveal className={styles.sectionHead}>
            <p className={styles.eyebrow}>Grupo Almeida</p>
            <h2 className={styles.headlineLg}>O ECOSSISTEMA ALMEIDA</h2>
          </Reveal>

          <div className={styles.cardsGrid}>
            <Reveal className={styles.card}>
              <div className={styles.cardMedia}>
                <SectionMedia imageSrc={IMG_AMBIENTAL_CARD} alt="Almeida Ambiental" objectPosition="center" />
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardKicker}>Diagnóstico · Coleta · Triagem · Trituração · Descaracterização</p>
                <h3 className={styles.cardTitle}>
                  RESÍDUOS GANHAM
                  <br />
                  UM NOVO DESTINO
                </h3>
                <Link className={styles.cardCta} href="/almeida-ambiental">
                  Conheça Almeida Ambiental →
                </Link>
              </div>
            </Reveal>

            <Reveal className={styles.card}>
              <div className={styles.cardMedia}>
                <SectionMedia imageSrc={IMG_EQUIPAMENTOS_CARD} alt="Almeida Equipamentos" objectPosition="center 55%" />
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardKicker}>Compactadores · Prensas · Trituradores · Containers</p>
                <h3 className={styles.cardTitle}>
                  TECNOLOGIA QUE NASCEU
                  <br />
                  DA PRÓPRIA OPERAÇÃO
                </h3>
                <Link className={styles.cardCta} href="/almeida-equipamentos">
                  Conheça Almeida Equipamentos →
                </Link>
              </div>
            </Reveal>

            <Reveal className={styles.card}>
              <div className={styles.cardMedia}>
                <SectionMedia imageSrc={IMG_SATURNO_CARD} alt="Saturno Ambiental" objectPosition="center" />
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardKicker}>Gestão de Resíduos · Cartonagem · Consultoria</p>
                <h3 className={styles.cardTitle}>
                  EXPERIÊNCIA REGIONAL.
                  <br />
                  FORÇA DE GRUPO.
                </h3>
                <Link className={styles.cardCta} href="/saturno-ambiental">
                  Conheça Saturno Ambiental →
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Ciclo operacional ---------------- */}
      <section className={`${styles.section} ${styles.toneCarvao}`}>
        <div className={styles.container}>
          <Reveal className={styles.processHead}>
            <p className={styles.eyebrow}>Almeida Ambiental</p>
            <h2 className={styles.headlineLg}>
              <span className={styles.gold}>EFICIÊNCIA</span> EM CADA ETAPA DO PROCESSO
            </h2>
            <p className={styles.body}>
              Da coleta à destinação, a Almeida Ambiental reúne estrutura, tecnologia e experiência para
              transformar resíduos em valor, com mais eficiência logística, segurança e responsabilidade
              ambiental.
            </p>
          </Reveal>
          <Reveal>
            <ol className={styles.processRow}>
              {PROCESS_STEPS.map((step, index) => (
                <li key={step} className={styles.processStep}>
                  <span className={styles.processIndex}>{String(index + 1).padStart(2, "0")}</span>
                  <p className={styles.processLabel}>{step}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Equipamentos / engenharia ---------------- */}
      <section className={`${styles.section} ${styles.toneCard}`}>
        <div className={styles.container}>
          <Reveal className={styles.spotlightGrid}>
            <div className={styles.spotlightMedia}>
              <SectionMedia imageSrc={IMG_EQUIPAMENTOS_SPOTLIGHT} alt="Detalhe operacional da Almeida Equipamentos" objectPosition="center" />
            </div>
            <div>
              <p className={styles.eyebrow}>Almeida Equipamentos</p>
              <h2 className={styles.headlineLg}>
                ENGENHARIA PARA MOVIMENTAR <span className={styles.gold}>MAIS COM MENOS</span>
              </h2>
              <p className={styles.body}>
                Compactadores, prensas e tecnologias desenvolvidas para diferentes materiais, volumes e
                realidades operacionais. Conhecimento de campo conectado a tecnologias internacionais.
              </p>
              <div className={styles.ctaRow}>
                <Link className={`${styles.btn} ${styles.btnPrimary}`} href="/almeida-equipamentos">
                  Conheça Almeida Equipamentos
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Presença regional ---------------- */}
      <section className={styles.section}>
        <div className={styles.container}>
          <Reveal className={`${styles.spotlightGrid} ${styles.reverse}`}>
            <div>
              <p className={styles.eyebrow}>Saturno Ambiental</p>
              <h2 className={styles.headlineLg}>
                <span className={styles.gold}>EXPERIÊNCIA</span> REGIONAL. FORÇA DE GRUPO.
              </h2>
              <p className={styles.body}>
                Coleta, triagem, trituração, cartonagem e consultoria ambiental fazem parte de uma atuação
                construída para unir eficiência operacional e responsabilidade ambiental.
              </p>
              <ul className={styles.localityList}>
                <li>São José</li>
                <li>Joinville</li>
                <li>Araquari</li>
                <li>Chapecó</li>
                <li>Blumenau</li>
              </ul>
              <div className={styles.ctaRow}>
                <Link className={`${styles.btn} ${styles.btnPrimary}`} href="/saturno-ambiental">
                  Conheça Saturno Ambiental
                </Link>
              </div>
            </div>
            <div className={styles.spotlightMedia}>
              <SectionMedia imageSrc={IMG_SATURNO_SPOTLIGHT} alt="Presença regional da Saturno Ambiental" objectPosition="center 55%" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Fechamento / conversão ---------------- */}
      <section className={`${styles.section} ${styles.toneOlive}`}>
        <div className={styles.container}>
          <Reveal className={styles.closingInner}>
            <h2 className={styles.headlineXl}>
              O QUE COMEÇOU COM PAPEL E PAPELÃO HOJE CONECTA <span className={styles.gold}>OPERAÇÃO,</span>{" "}
              TECNOLOGIA E SUSTENTABILIDADE.
            </h2>
            <p className={styles.body}>Há 40 anos transformando o presente, pensando no futuro.</p>
            <div className={styles.ctaRow}>
              <Link className={`${styles.btn} ${styles.btnOnOlive}`} href="/contato">
                Entre em contato com o Grupo Almeida
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
