"use client";

import { useRef } from "react";
import Link from "next/link";
import styles from "./home4.module.css";
import { WhatsAppIcon } from "../icons";
import SectionMedia from "../shared/SectionMedia";
import Reveal from "../shared/Reveal";
import { CountUpMetric, useEnterOnce } from "../AnimatedMetric";
import { IMPACT_METRICS } from "../shared/impactMetrics";

const POSTER = "/images/home-video-poster.webp";

const CHAPTERS = [
  { number: "01", label: "Almeida Ambiental", href: "#home4-almeida-ambiental" },
  { number: "02", label: "Almeida Equipamentos", href: "#home4-almeida-equipamentos" },
  { number: "03", label: "Saturno Ambiental", href: "#home4-saturno-ambiental" },
  { number: "04", label: "Impacto", href: "#home4-impacto" },
  { number: "05", label: "Grupo Almeida", href: "#home4-grupo-almeida" },
];

const PROCESS_STEPS = ["Diagnóstico", "Coleta", "Triagem", "Trituração", "Descaracterização"];

/**
 * Home 4 — Industrial Editorial / Annual Report.
 *
 * Página editorial contínua (sem scroll snap, sem "uma dobra = uma
 * viewport", sem cards como estrutura principal — ver home4.module.css).
 * Ritmo vem de tipografia, número, linha e espaço negativo: hero com "40"
 * como elemento gráfico + janela fotográfica (não full screen), índice de
 * capítulos, cinco capítulos (Ambiental / Equipamentos / Saturno / Impacto
 * / Manifesto) separados por uma faixa de processo tipográfica, e um
 * "ledger" editorial de métricas em vez do grid de cards usado em
 * /home2 e /home3. Copy 100% reaproveitada das propostas existentes —
 * apenas reorganizada.
 */
export default function Home4Page() {
  const ledgerRef = useRef<HTMLDivElement>(null);
  const ledgerActive = useEnterOnce([ledgerRef]);

  return (
    <div className={styles.page} data-page="home4">
      {/* ---------------- Hero editorial ---------------- */}
      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroGrid}>
            <Reveal className={styles.heroMark}>
              <p className={styles.heroMarkLabel}>Grupo Almeida</p>
              <div className={styles.heroYears}>
                <p className={styles.heroYearsNumber}>40</p>
                <p className={styles.heroYearsWord}>anos</p>
              </div>
            </Reveal>

            <Reveal className={styles.heroMedia}>
              <SectionMedia imageSrc={POSTER} alt="Operação do Grupo Almeida" objectPosition="center 40%" />
            </Reveal>

            <Reveal className={styles.heroCopy}>
              <h1 className={styles.heroHeadline}>
                TRANSFORMANDO
                <br />
                RESÍDUO
                <br />
                EM <span className={styles.gold}>RESULTADO</span>
              </h1>
              <div className={styles.ctaRow}>
                <a className={`${styles.btn} ${styles.btnPrimary}`} href="#home4-almeida-ambiental">
                  <WhatsAppIcon />
                  Falar com o Grupo Almeida
                </a>
                <a className={`${styles.btn} ${styles.btnOutline}`} href="#home4-grupo-almeida">
                  Conheça nossa história
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Índice de capítulos ---------------- */}
      <section className={styles.indexBand}>
        <div className={styles.container}>
          <nav className={styles.indexList} aria-label="Capítulos">
            {CHAPTERS.map((chapter) => (
              <a key={chapter.href} className={styles.indexItem} href={chapter.href}>
                <span className={styles.indexNumber} aria-hidden="true">
                  {chapter.number}
                </span>
                <span className={styles.indexLabel}>{chapter.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* ---------------- Capítulo 01 — Almeida Ambiental ---------------- */}
      <section id="home4-almeida-ambiental" className={styles.section}>
        <div className={styles.container}>
          <Reveal>
            <div className={styles.chapterHead}>
              <p className={styles.chapterNumeral} aria-hidden="true">01</p>
              <div className={styles.chapterHeadText}>
                <p className={styles.eyebrow}>Almeida Ambiental</p>
                <p className={styles.kicker}>Diagnóstico · Coleta · Triagem · Trituração · Descaracterização</p>
              </div>
            </div>
            <hr className={styles.hr} />
          </Reveal>

          <Reveal className={styles.chapterIntro}>
            <h2 className={styles.chapterHeadlineLg}>
              RESÍDUOS GANHAM
              <br />
              UM NOVO DESTINO
            </h2>
            <p className={styles.body}>
              Há quatro décadas, conhecimento técnico e experiência operacional se encontram na gestão
              responsável de resíduos.
            </p>
          </Reveal>

          <Reveal className={styles.chapterRow}>
            <div className={styles.chapterMedia}>
              <SectionMedia imageSrc={POSTER} alt="Operação da Almeida Ambiental" objectPosition="center 55%" />
            </div>
            <div className={styles.chapterText}>
              <h3 className={styles.chapterHeadlineLg}>
                <span className={styles.gold}>EFICIÊNCIA</span> EM CADA ETAPA DO PROCESSO
              </h3>
              <p className={styles.body}>
                Da coleta à destinação, a Almeida Ambiental reúne estrutura, tecnologia e experiência para
                transformar resíduos em valor, com mais eficiência logística, segurança e responsabilidade
                ambiental.
              </p>
              <div className={styles.ctaRow}>
                <Link className={`${styles.btn} ${styles.btnOutline}`} href="/almeida-ambiental">
                  Conheça Almeida Ambiental
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Faixa de processo ---------------- */}
      <section className={`${styles.section} ${styles.toneCarvao} ${styles.processStrip}`}>
        <div className={styles.container}>
          <Reveal>
            <ol className={styles.processList}>
              {PROCESS_STEPS.map((step, index) => (
                <li key={step} className={styles.processItem}>
                  <span className={styles.processIndex} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className={styles.processLabel}>{step}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Capítulo 02 — Almeida Equipamentos ---------------- */}
      <section id="home4-almeida-equipamentos" className={`${styles.section} ${styles.toneCard}`}>
        <div className={styles.container}>
          <Reveal>
            <div className={styles.chapterHead}>
              <p className={styles.chapterNumeral} aria-hidden="true">02</p>
              <div className={styles.chapterHeadText}>
                <p className={styles.eyebrow}>Almeida Equipamentos</p>
                <p className={styles.kicker}>Compactadores · Prensas · Trituradores · Containers</p>
              </div>
            </div>
            <hr className={styles.hr} />
          </Reveal>

          <Reveal className={styles.chapterIntro}>
            <h2 className={styles.chapterHeadlineLg}>
              <span className={styles.gold}>TECNOLOGIA</span> QUE NASCEU DA PRÓPRIA OPERAÇÃO
            </h2>
            <p className={styles.body}>
              Criada para aperfeiçoar os processos do Grupo Almeida, a Almeida Equipamentos transforma décadas
              de experiência no setor em tecnologia aplicada à gestão de resíduos.
            </p>
          </Reveal>

          <Reveal className={`${styles.chapterRow} ${styles.reverse}`}>
            <div className={`${styles.chapterMedia} ${styles.mediaDuotone}`}>
              <SectionMedia
                imageSrc={POSTER}
                alt="Detalhe operacional da Almeida Equipamentos"
                objectPosition="left 40%"
              />
            </div>
            <div className={styles.chapterText}>
              <h3 className={styles.chapterHeadlineLg}>
                ENGENHARIA PARA MOVIMENTAR <span className={styles.gold}>MAIS COM MENOS</span>
              </h3>
              <p className={styles.body}>
                Compactadores, prensas e tecnologias desenvolvidas para diferentes materiais, volumes e
                realidades operacionais.
              </p>
              <p className={styles.body}>Conhecimento de campo conectado a tecnologias internacionais.</p>
              <div className={styles.ctaRow}>
                <Link className={`${styles.btn} ${styles.btnOutline}`} href="/almeida-equipamentos">
                  Conheça Almeida Equipamentos
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Capítulo 03 — Saturno Ambiental ---------------- */}
      <section id="home4-saturno-ambiental" className={`${styles.section} ${styles.toneOliveLight}`}>
        <div className={styles.container}>
          <Reveal>
            <p className={styles.saturnoNumeral} aria-hidden="true">03</p>
          </Reveal>

          <Reveal className={styles.saturnoGrid}>
            <div className={styles.saturnoText}>
              <p className={styles.eyebrow}>Saturno Ambiental</p>
              <p className={styles.kicker}>Gestão de Resíduos · Cartonagem · Consultoria</p>
              <p className={styles.saturnoLocation}>Blumenau · Vale do Itajaí</p>
              <h2 className={styles.chapterHeadlineLg}>
                <span className={styles.emphasis}>EXPERIÊNCIA</span> REGIONAL.
                <br />
                FORÇA DE GRUPO.
              </h2>
              <h3 className={styles.chapterHeadlineLg}>
                GESTÃO AMBIENTAL QUE <span className={styles.emphasis}>VAI ALÉM</span> DA COLETA
              </h3>
              <p className={styles.body}>
                Coleta, triagem, trituração, cartonagem e consultoria ambiental fazem parte de uma atuação
                construída para unir eficiência operacional e responsabilidade ambiental.
              </p>
              <div className={styles.ctaRow}>
                <Link className={`${styles.btn} ${styles.btnPrimary}`} href="/saturno-ambiental">
                  Conheça Saturno Ambiental
                </Link>
              </div>
            </div>
            <div className={styles.saturnoMedia}>
              <SectionMedia imageSrc={POSTER} alt="Presença regional da Saturno Ambiental" objectPosition="center 50%" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Capítulo 04 — Impacto (ledger) ---------------- */}
      <section id="home4-impacto" className={styles.section} ref={ledgerRef}>
        <div className={styles.container}>
          <Reveal>
            <div className={styles.chapterHead}>
              <p className={styles.chapterNumeral} aria-hidden="true">04</p>
              <div className={styles.chapterHeadText}>
                <p className={styles.eyebrow}>Impacto</p>
              </div>
            </div>
          </Reveal>

          <Reveal className={styles.ledgerIntro}>
            <p className={styles.ledgerHeadline}>
              Cada resíduo processado vira um número que a <span className={styles.gold}>natureza reconhece.</span>
            </p>
          </Reveal>

          <Reveal>
            <div className={styles.ledgerGrid}>
              {IMPACT_METRICS.map((metric) => (
                <div key={metric.label} className={styles.ledgerRow}>
                  <span className={styles.ledgerValue}>
                    <CountUpMetric
                      target={metric.target}
                      format={metric.format}
                      suffix={metric.suffix}
                      display={metric.display}
                      active={ledgerActive}
                    />
                  </span>
                  <span className={styles.ledgerRule} aria-hidden="true" />
                  <span className={styles.ledgerLabel}>{metric.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Capítulo 05 — Manifesto final ---------------- */}
      <section id="home4-grupo-almeida" className={`${styles.section} ${styles.toneCarvao}`}>
        <div className={styles.container}>
          <Reveal className={styles.chapterHead}>
            <p className={styles.chapterNumeral} aria-hidden="true">05</p>
            <div className={styles.chapterHeadText}>
              <p className={styles.eyebrow}>Grupo Almeida</p>
            </div>
          </Reveal>

          <Reveal className={styles.manifestoGrid}>
            <div>
              <h2 className={styles.manifestoHeadline}>
                O QUE COMEÇOU COM PAPEL E PAPELÃO HOJE CONECTA <span className={styles.gold}>OPERAÇÃO,</span>{" "}
                TECNOLOGIA E SUSTENTABILIDADE.
              </h2>
              <p className={styles.manifestoBody}>Há 40 anos transformando o presente, pensando no futuro.</p>
              <div className={styles.ctaRow}>
                <Link className={`${styles.btn} ${styles.btnOnDark}`} href="/contato">
                  Entre em contato com o Grupo Almeida
                </Link>
              </div>
            </div>
            <div className={styles.manifestoMedia}>
              <SectionMedia imageSrc={POSTER} alt="Grupo Almeida" objectPosition="center 45%" />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
