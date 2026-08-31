"use client";

import { useRef } from "react";
import Link from "next/link";
import styles from "./home.module.css";
import Hero from "./Hero";
import SectionMedia from "../shared/SectionMedia";
import Reveal from "../shared/Reveal";
import BrandWatermark from "../shared/BrandWatermark";
import { CountUpMetric, useEnterOnce } from "../AnimatedMetric";
import { IMPACT_METRICS } from "../shared/impactMetrics";
import { PROCESS_STEP_ICONS } from "../icons";

const IMG_AMBIENTAL_INTRO = "/images/home-variants/ambiental/ambiental-logistica-cinematic.webp";
/* Substituída nesta rodada (Checkpoint B): a imagem anterior
   (ambiental-logistica-editorial.webp, caminhões estacionados em vista
   aérea) tinha baixa qualidade e não comunicava operação integrada. Gerada
   via Magnific/MCP em 4:3 (1760x1328, reamostrada para 1440x1080) —
   arquivo novo e independente porque o antigo continua em uso por
   /home4 (fora de escopo desta tarefa). */
const IMG_AMBIENTAL_PROCESSO = "/images/home-variants/ambiental/ambiental-operacao-integrada.webp";
const IMG_EQUIPAMENTOS_TECNOLOGIA = "/images/home-variants/equipamentos/equipamentos-engenharia.webp";
const IMG_EQUIPAMENTOS_ENGENHARIA = "/images/home-variants/equipamentos/equipamentos-detalhe-mecanico.webp";
const IMG_SATURNO_REGIONAL = "/images/home-variants/saturno/saturno-operacao.webp";
const IMG_SATURNO_ATUACAO = "/images/home-variants/saturno/saturno-fardos.webp";
const IMG_MANIFESTO = "/images/home-variants/editorial/grupo-manifesto.webp";

/* Composição editorial das 6 etapas (ver home.module.css, comentário em
   `.processComposition`) — sem linha, seta ou rota conectando as estações.
   Ordem semântica e ordem visual são sempre a mesma (natural, sem
   serpente): grid 3×2 no desktop, 2×3 no mobile, ambos por ordem direta do
   DOM (grid-auto-flow: row), nunca via nth-child de reposicionamento. */
const PROCESS_STEPS = ["Diagnóstico", "Coleta", "Triagem", "Trituração", "Descaracterização", "Destinação"];

/**
 * Nova Home principal — narrativa editorial contínua (Seção 2 em diante),
 * sem scroll snap, sem interceptação de wheel, sem vídeo sincronizado ao
 * scroll. O único elemento fixo na tela é o Header (ver components/Header.tsx
 * e app/globals.css); o vídeo institucional vive só no Hero (Hero.tsx).
 */
export default function HomePage() {
  const impactoRef = useRef<HTMLDivElement>(null);
  const impactoActive = useEnterOnce([impactoRef]);

  return (
    <div className={styles.page} data-page="home">
      <Hero />

      {/* ---------------- Almeida Ambiental / apresentação ---------------- */}
      <section
        id="almeida-ambiental"
        className={`${styles.section} ${styles.toneForest} ${styles.watermarkSurface}`}
      >
        <BrandWatermark mode="dark" className={styles.apresentacaoWatermark} />
        <div className={styles.container}>
          <Reveal className={`${styles.duo} ${styles.duoMediaRight}`}>
            <div className={styles.duoContent}>
              <p className={styles.eyebrow}>Almeida Ambiental</p>
              <h2 className={styles.headline}>
                RESÍDUOS GANHAM UM NOVO <span className={styles.gold}>DESTINO</span>
              </h2>
              <p className={styles.body}>
                Há quatro décadas, conhecimento técnico e experiência operacional se encontram na gestão
                responsável de resíduos.
              </p>
            </div>
            <div className={`${styles.duoMedia} ${styles.duoMediaLandscape}`}>
              <SectionMedia
                imageSrc={IMG_AMBIENTAL_INTRO}
                alt="Operação logística da Almeida Ambiental"
                objectPosition="center"
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Almeida Ambiental / capacidade operacional ---------------- */}
      <section
        className={`${styles.section} ${styles.toneForest} ${styles.fadeToStoneAlt} ${styles.watermarkSurface}`}
      >
        <BrandWatermark mode="dark" className={styles.processWatermark} />
        <div className={styles.container}>
          <Reveal className={`${styles.duo} ${styles.duoMediaLeft}`}>
            <div className={`${styles.duoMedia} ${styles.duoMedia4x3}`}>
              <SectionMedia
                imageSrc={IMG_AMBIENTAL_PROCESSO}
                alt="Operação integrada de recebimento, triagem e processamento de resíduos na Almeida Ambiental"
                objectPosition="center"
              />
            </div>
            <div className={styles.duoContent}>
              <p className={styles.eyebrow}>Almeida Ambiental</p>
              <h2 className={styles.headline}>EFICIÊNCIA EM CADA ETAPA DO PROCESSO</h2>
              <p className={styles.body}>
                Da coleta à destinação, a Almeida Ambiental reúne estrutura, tecnologia e experiência para
                transformar resíduos em valor, com mais eficiência logística, segurança e responsabilidade
                ambiental.
              </p>
              <div className={styles.ctaRow}>
                <Link className={`${styles.btn} ${styles.btnOutlineOnDark}`} href="/almeida-ambiental">
                  Conheça Almeida Ambiental
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal className={styles.processComposition}>
            <ol className={styles.processSteps}>
              {PROCESS_STEPS.map((step, index) => {
                const StepIcon = PROCESS_STEP_ICONS[index];
                return (
                  <li key={step} className={styles.processStep}>
                    <StepIcon className={styles.processIcon} />
                    <p className={styles.processLabel}>{step}</p>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Almeida Equipamentos / tecnologia ---------------- */}
      <section
        className={`${styles.section} ${styles.toneStoneAlt} ${styles.fadeFromForest} ${styles.watermarkSurface}`}
      >
        <BrandWatermark mode="light" className={styles.equipamentosWatermark} />
        <div className={styles.container}>
          <Reveal className={`${styles.duo} ${styles.duoMediaLeft}`}>
            <div className={`${styles.duoMedia} ${styles.duoMediaLandscape}`}>
              <SectionMedia
                imageSrc={IMG_EQUIPAMENTOS_TECNOLOGIA}
                alt="Engenharia da Almeida Equipamentos"
                objectPosition="center 55%"
              />
            </div>
            <div className={styles.duoContent}>
              <p className={styles.eyebrow}>Almeida Equipamentos</p>
              <h2 className={styles.headline}>TECNOLOGIA QUE NASCEU DA PRÓPRIA OPERAÇÃO</h2>
              <p className={styles.body}>
                Criada para aperfeiçoar os processos do Grupo Almeida, a Almeida Equipamentos transforma
                décadas de experiência no setor em tecnologia aplicada à gestão de resíduos.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Almeida Equipamentos / engenharia ---------------- */}
      <section className={`${styles.section} ${styles.toneStoneAlt} ${styles.fadeToStone}`}>
        <div className={styles.container}>
          <Reveal className={`${styles.duo} ${styles.duoMediaRight} ${styles.duoMediaNarrow}`}>
            <div className={styles.duoContent}>
              <p className={styles.eyebrow}>Almeida Equipamentos</p>
              <h2 className={styles.headline}>ENGENHARIA PARA MOVIMENTAR MAIS COM MENOS</h2>
              <p className={styles.body}>
                Compactadores, prensas e tecnologias desenvolvidas para diferentes materiais, volumes e
                realidades operacionais.
              </p>
              <p className={styles.body}>Conhecimento de campo conectado a tecnologias internacionais.</p>
              <ul className={styles.tagRow}>
                <li>Compactadores</li>
                <li>Prensas</li>
                <li>Trituradores</li>
                <li>Containers</li>
              </ul>
              <div className={styles.ctaRow}>
                <Link className={`${styles.btn} ${styles.btnOutlineOnLight}`} href="/almeida-equipamentos">
                  Conheça Almeida Equipamentos
                </Link>
              </div>
            </div>
            <div className={`${styles.duoMedia} ${styles.duoMediaTall}`}>
              <SectionMedia
                imageSrc={IMG_EQUIPAMENTOS_ENGENHARIA}
                alt="Detalhe mecânico de equipamento da Almeida Equipamentos"
                objectPosition="center"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Saturno Ambiental / presença regional ---------------- */}
      <section
        className={`${styles.section} ${styles.toneStone} ${styles.fadeFromStoneAlt} ${styles.watermarkSurface}`}
      >
        <BrandWatermark mode="light" className={styles.saturnoPresencaWatermark} />
        <div className={styles.container}>
          <Reveal className={`${styles.duo} ${styles.duoMediaRight} ${styles.duoEven}`}>
            <div className={styles.duoContent}>
              <p className={styles.eyebrow}>Saturno Ambiental</p>
              <p className={styles.locationLine}>Blumenau · Vale do Itajaí</p>
              <h2 className={styles.headline}>EXPERIÊNCIA REGIONAL. FORÇA DE GRUPO.</h2>
            </div>
            <div className={`${styles.duoMedia} ${styles.duoMediaLandscape}`}>
              <SectionMedia
                imageSrc={IMG_SATURNO_REGIONAL}
                alt="Operação da Saturno Ambiental em Blumenau"
                objectPosition="center 55%"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Saturno Ambiental / atuação ---------------- */}
      <section
        className={`${styles.section} ${styles.toneStone} ${styles.fadeToCarvao} ${styles.watermarkSurface}`}
      >
        <BrandWatermark mode="light" className={styles.saturnoAtuacaoWatermark} />
        <div className={styles.container}>
          <Reveal className={`${styles.duo} ${styles.duoMediaLeft} ${styles.duoMediaNarrow}`}>
            <div className={`${styles.duoMedia} ${styles.duoMediaSquare}`}>
              <SectionMedia
                imageSrc={IMG_SATURNO_ATUACAO}
                alt="Fardos processados pela Saturno Ambiental"
                objectPosition="center"
              />
            </div>
            <div className={styles.duoContent}>
              <p className={styles.eyebrow}>Saturno Ambiental</p>
              <h2 className={styles.headline}>GESTÃO AMBIENTAL QUE VAI ALÉM DA COLETA</h2>
              <p className={styles.body}>
                Coleta, triagem, trituração, cartonagem e consultoria ambiental fazem parte de uma atuação
                construída para unir eficiência operacional e responsabilidade ambiental.
              </p>
              <ul className={styles.tagRow}>
                <li>Gestão de Resíduos</li>
                <li>Cartonagem</li>
                <li>Consultoria</li>
              </ul>
              <div className={styles.ctaRow}>
                <Link className={`${styles.btn} ${styles.btnOutlineOnLight}`} href="/saturno-ambiental">
                  Conheça Saturno Ambiental
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Impacto positivo 2025 ---------------- */}
      <section
        className={`${styles.section} ${styles.toneCarvao} ${styles.fadeFromStone} ${styles.watermarkSurface}`}
        ref={impactoRef}
      >
        <BrandWatermark mode="dark" className={styles.impactWatermark} />
        <div className={styles.container}>
          <Reveal className={styles.impactHead}>
            <p className={styles.eyebrow}>Impacto Positivo · 2025</p>
            <h2 className={styles.headline}>
              CADA RESÍDUO PROCESSADO VIRA UM NÚMERO QUE A NATUREZA RECONHECE.
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
                      active={impactoActive}
                    />
                  </span>
                  <span className={styles.metricLabel}>{metric.label}</span>
                </div>
              ))}
            </div>

            {/* Relatório de Sustentabilidade 2025 ainda não disponível — ver
                DECISOES.md. Botão desabilitado em vez de link quebrado. */}
            <div className={styles.ctaRow}>
              <button type="button" className={`${styles.btn} ${styles.btnOutlineOnDark}`} disabled>
                Ver Relatório de Sustentabilidade 2025
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Manifesto final ---------------- */}
      <section className={`${styles.section} ${styles.toneCarvao} ${styles.manifesto}`}>
        <div className={styles.container}>
          <Reveal className={styles.manifestoInner}>
            <div className={styles.manifestoMedia}>
              <SectionMedia imageSrc={IMG_MANIFESTO} alt="Grupo Almeida" objectPosition="center 40%" />
            </div>
            <h2 className={styles.manifestoHeadline}>
              O QUE COMEÇOU COM PAPEL E PAPELÃO HOJE CONECTA OPERAÇÃO, TECNOLOGIA E SUSTENTABILIDADE.
            </h2>
            <p className={styles.body}>Há 40 anos transformando o presente, pensando no futuro.</p>
            <div className={styles.ctaRow}>
              <Link className={`${styles.btn} ${styles.btnOutlineOnDark}`} href="/contato">
                Entre em contato com o Grupo Almeida
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
