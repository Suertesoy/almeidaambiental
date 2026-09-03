"use client";

import { useRef } from "react";
import Link from "next/link";
import styles from "./home.module.css";
import Hero from "./Hero";
import SectionMedia from "../shared/SectionMedia";
import Reveal from "../shared/Reveal";
import BrandBoundaryMark, { boundarySurface } from "../shared/BrandBoundaryMark";
import BrandMark from "../shared/BrandMark";
import ProcessSteps from "../shared/ProcessSteps";
import { BRANDS } from "../../lib/brands";
import { FLOW_STEPS } from "../../lib/almeida-ambiental-data";
import { CountUpMetric, useEnterOnce } from "../AnimatedMetric";
import { IMPACT_METRICS } from "../shared/impactMetrics";

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

/* As seis etapas vêm de lib/almeida-ambiental-data.ts (FLOW_STEPS) — mesma
   fonte usada pela página /almeida-ambiental, para que a sequência não
   possa divergir entre as duas. Só o nome da etapa: não existe frase curta
   validada por etapa no conteúdo aprovado, e o componente não inventa uma. */
const PROCESS_STEPS = FLOW_STEPS.map((name) => ({ name }));

/**
 * Nova Home principal — narrativa editorial contínua (Seção 2 em diante),
 * sem scroll snap, sem interceptação de wheel, sem vídeo sincronizado ao
 * scroll. O único elemento fixo na tela é o Header (ver components/Header.tsx
 * e app/globals.css); o vídeo institucional vive só no Hero (Hero.tsx).
 *
 * Rodada de refino editorial: as superfícies terminam em corte reto (nenhum
 * gradiente de transição entre seções) e as quatro trocas de território —
 * Grupo → Ambiental → Equipamentos → Saturno → Impacto — são costuradas
 * pelo símbolo oficial atravessando a linha de corte, alternando de lado a
 * cada fronteira (esquerda / direita / esquerda / direita). Uma fronteira é
 * declarada em duas seções adjacentes com o mesmo id; a única exceção é
 * "grupo-ambiental", cuja metade de saída cairia por cima do vídeo do Hero
 * — ali o símbolo emerge da borda superior da dobra 2 em vez de atravessar.
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
        className={`${styles.section} ${styles.toneForest} ${boundarySurface}`}
      >
        <BrandBoundaryMark boundary="grupo-ambiental" half="entering" surface="onDark" />
        <div className={styles.container}>
          <Reveal className={`${styles.duo} ${styles.duoMediaRight}`}>
            <div className={styles.duoContent}>
              <BrandMark
                brand={BRANDS["almeida-ambiental"]}
                variant="branca"
                className={styles.eyebrowMark}
              />
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
      <section className={`${styles.section} ${styles.toneForest} ${boundarySurface}`}>
        <BrandBoundaryMark boundary="ambiental-equipamentos" half="leaving" surface="onDark" />
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

          <ProcessSteps steps={PROCESS_STEPS} ariaLabel="Etapas da operação da Almeida Ambiental" />
        </div>
      </section>

      {/* ---------------- Almeida Equipamentos / tecnologia ---------------- */}
      <section className={`${styles.section} ${styles.toneStoneAlt} ${boundarySurface}`}>
        <BrandBoundaryMark boundary="ambiental-equipamentos" half="entering" surface="onLight" />
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
              <BrandMark
                brand={BRANDS["almeida-equipamentos"]}
                variant="original"
                className={styles.eyebrowMark}
              />
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
      <section className={`${styles.section} ${styles.toneStoneAlt} ${boundarySurface}`}>
        <BrandBoundaryMark boundary="equipamentos-saturno" half="leaving" surface="onLight" />
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
      <section className={`${styles.section} ${styles.toneStone} ${boundarySurface}`}>
        <BrandBoundaryMark boundary="equipamentos-saturno" half="entering" surface="onDark" />
        <div className={styles.container}>
          <Reveal className={`${styles.duo} ${styles.duoMediaRight} ${styles.duoEven}`}>
            <div className={styles.duoContent}>
              <BrandMark
                brand={BRANDS["saturno-ambiental"]}
                variant="branca"
                className={styles.eyebrowMark}
              />
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
      <section className={`${styles.section} ${styles.toneStone} ${boundarySurface}`}>
        <BrandBoundaryMark boundary="saturno-impacto" half="leaving" surface="onDark" />
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
        className={`${styles.section} ${styles.toneCarvao} ${boundarySurface}`}
        ref={impactoRef}
      >
        <BrandBoundaryMark boundary="saturno-impacto" half="entering" surface="onDark" />
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

      {/* ---------------- Manifesto final ----------------
          Fecha em carvão contra o verde floresta do Footer, em corte reto
          (o antigo .fadeToForest foi removido). Sem fronteira aqui: é o
          mesmo território do bloco de Impacto, não uma troca de empresa. */}
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
