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

const PROCESS_STEPS = ["Diagnóstico", "Coleta", "Triagem", "Trituração", "Descaracterização", "Destinação"];

/* Rota serpenteada do bloco de processo (ver home.module.css, comentário em
   `.processFlow`). Coordenadas em viewBox 0 0 100 100 — percentuais
   literais do container, por isso funcionam com preserveAspectRatio="none"
   em qualquer largura sem recálculo. Ordem semântica das 6 etapas
   (Diagnóstico…Destinação) é sempre a do <ol>/PROCESS_STEPS; a rota
   reorganiza a ORDEM VISUAL via grid-column/grid-row em CSS (ver
   .processSteps nth-child), nunca reordenando o DOM.
   Desktop: 3 colunas × 2 linhas — linha 1 esquerda→direita (Diagnóstico,
   Coleta, Triagem), dobra à direita, linha 2 direita→esquerda (Trituração,
   Descaracterização, Destinação).
   Mobile/tablet: 2 colunas × 3 linhas — linha 1 esquerda→direita
   (Diagnóstico, Coleta), dobra à direita, linha 2 direita→esquerda
   (Triagem, Trituração), dobra à esquerda, linha 3 esquerda→direita
   (Descaracterização, Destinação). */
const PROCESS_DESKTOP_ROUTE_D =
  "M 10.67 25 L 16.67 25 L 74.33 25 Q 83.33 25 83.33 34 L 83.33 66 Q 83.33 75 74.33 75 L 16.67 75 L 10.67 75";
const PROCESS_DESKTOP_CHEVRONS = [
  { d: "M 64.67 22.5 L 68.67 25 L 64.67 27.5" },
  { d: "M 35.33 77.5 L 31.33 75 L 35.33 72.5" },
];
const PROCESS_MOBILE_ROUTE_D =
  "M 25 16.67 L 67 16.67 Q 75 16.67 75 24.67 L 75 42 Q 75 50 67 50 L 33 50 Q 25 50 25 58 L 25 75.33 Q 25 83.33 33 83.33 L 75 83.33";
const PROCESS_MOBILE_CHEVRONS = [
  { d: "M 47.5 14.67 L 51.5 16.67 L 47.5 18.67" },
  { d: "M 47.5 81.33 L 51.5 83.33 L 47.5 85.33" },
];

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
      <section className={`${styles.section} ${styles.toneStone} ${styles.watermarkSurface}`}>
        <BrandWatermark mode="light" className={styles.processWatermark} />
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
                <Link className={`${styles.btn} ${styles.btnOutlineOnLight}`} href="/almeida-ambiental">
                  Conheça Almeida Ambiental
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal className={styles.processFlow}>
            <svg
              className={`${styles.processPath} ${styles.processPathDesktop}`}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path className={styles.processRouteShadow} d={PROCESS_DESKTOP_ROUTE_D} transform="translate(1.5, 1.8)" />
              <path className={styles.processRoute} d={PROCESS_DESKTOP_ROUTE_D} />
              {PROCESS_DESKTOP_CHEVRONS.map((c) => (
                <path key={c.d} className={styles.processChevron} d={c.d} />
              ))}
            </svg>
            <svg
              className={`${styles.processPath} ${styles.processPathMobile}`}
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path className={styles.processRouteShadow} d={PROCESS_MOBILE_ROUTE_D} transform="translate(1.5, 1.8)" />
              <path className={styles.processRoute} d={PROCESS_MOBILE_ROUTE_D} />
              {PROCESS_MOBILE_CHEVRONS.map((c) => (
                <path key={c.d} className={styles.processChevron} d={c.d} />
              ))}
            </svg>

            <ol className={styles.processSteps}>
              {PROCESS_STEPS.map((step, index) => {
                const StepIcon = PROCESS_STEP_ICONS[index];
                return (
                  <li key={step} className={styles.processStep}>
                    <p className={styles.processLabel}>{step}</p>
                    <StepIcon className={styles.processIcon} />
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Almeida Equipamentos / tecnologia ---------------- */}
      <section className={`${styles.section} ${styles.toneStoneAlt} ${styles.watermarkSurface}`}>
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
      <section className={`${styles.section} ${styles.toneCarvao}`}>
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
                <Link className={`${styles.btn} ${styles.btnOutlineOnDark}`} href="/almeida-equipamentos">
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
      <section className={`${styles.section} ${styles.toneStone} ${styles.watermarkSurface}`}>
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
      <section className={`${styles.section} ${styles.toneForest} ${styles.watermarkSurface}`}>
        <BrandWatermark mode="dark" className={styles.saturnoAtuacaoWatermark} />
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
                <Link className={`${styles.btn} ${styles.btnOutlineOnDark}`} href="/saturno-ambiental">
                  Conheça Saturno Ambiental
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Impacto positivo 2025 ---------------- */}
      <section
        className={`${styles.section} ${styles.toneCarvao} ${styles.watermarkSurface}`}
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
      <section className={`${styles.section} ${styles.toneForest} ${styles.manifesto}`}>
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
