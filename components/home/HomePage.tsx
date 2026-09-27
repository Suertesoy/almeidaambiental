"use client";

import { useRef } from "react";
import Link from "next/link";
import styles from "./home.module.css";
import Hero from "./Hero";
import SectionMedia from "../shared/SectionMedia";
import Reveal from "../shared/Reveal";
import BrandBoundaryMark, { boundarySurface } from "../shared/BrandBoundaryMark";
import BrandMark from "../shared/BrandMark";
import BrandStage from "../shared/BrandStage";
import ProcessSteps from "../shared/ProcessSteps";
import MaterialSurface from "../shared/MaterialSurface";
import { BRANDS } from "../../lib/brands";
import { FLOW_STEPS, FLOW_STEPS_EN } from "../../lib/almeida-ambiental-data";
import { CountUpMetric, useEnterOnce } from "../AnimatedMetric";
import { IMPACT_METRICS, IMPACT_METRICS_EN } from "../shared/impactMetrics";
import { MATERIAL_IMAGES, MATERIAL_SURFACES } from "../../lib/material-surfaces";
import { localizeHref } from "../../lib/i18n/routes";
import type { Locale } from "../../lib/i18n/locale";

/* IMG_EQUIPAMENTOS_TECNOLOGIA saiu na rodada de presença de marca: a
   fotografia da dobra de ENTRADA da Almeida Equipamentos deu lugar à logo
   oficial grande (BrandStage abaixo). */
const IMG_EQUIPAMENTOS_ENGENHARIA = "/images/home-variants/equipamentos/equipamentos-detalhe-mecanico.webp";
/* IMG_AMBIENTAL_FROTA: mesmo arquivo que ocupava a dobra de ENTRADA da
   Almeida Ambiental antes da rodada de presença de marca (ver commit
   b6f21ed, const IMG_AMBIENTAL_INTRO). Rodada de refino de brand stage
   (Seção 7): a foto volta, mas com outro papel — não mais na entrada
   (que agora é só marca + posicionamento), e sim na SEGUNDA dobra, ao
   lado de "Eficiência em cada etapa do processo", como evidência visual
   da operação ao lado do Process Flow. Mesmo arquivo, mesmo alt de antes;
   nenhuma imagem nova foi gerada. */
const IMG_AMBIENTAL_FROTA = "/images/home-variants/ambiental/ambiental-logistica-cinematic.webp";
/* Substitui saturno-fardos.webp (rodada "materialidade-assets-finais",
   Seção 9): a foto antiga afirmava "Fardos processados pela Saturno
   Ambiental" sem base — ninguém confirmou que aqueles fardos eram da
   Saturno. No lugar entra a materialidade própria da marca (mesma peça do
   capítulo de fechamento de /saturno-ambiental) como imagem emoldurada,
   não como fotografia de operação. */
const IMG_SATURNO_ATUACAO = MATERIAL_SURFACES["saturno-fluxo"].desktop!;
const IMG_MANIFESTO = "/images/home-variants/editorial/grupo-manifesto.webp";

/**
 * Engenharia da Almeida Equipamentos como PEÇA editorial (Seção 5 da
 * rodada de materialidade: "a imagem macro de engenharia / aço como grande
 * elemento editorial"). Não vira MaterialSurface porque a dobra é pedra
 * clara — véu escuro sobre superfície clara desmontaria o corte sólido de
 * território entre as empresas. Ver o bloco MATERIAL_IMAGES em
 * lib/material-surfaces.ts.
 *
 * Enquanto o par próprio não existir (Magnific bloqueado), a dobra mantém
 * em cena o detalhe mecânico que já exibia — nenhuma imagem nova é
 * emprestada de outra seção para simular a mudança.
 */
const ENGENHARIA_ASSET = MATERIAL_IMAGES["equipamentos-engenharia"];
const ENGENHARIA_ALT = {
  pt: ENGENHARIA_ASSET.desktop ? ENGENHARIA_ASSET.alt : "Detalhe mecânico de equipamento da Almeida Equipamentos",
  en: ENGENHARIA_ASSET.desktop
    ? "Industrial engineering macro detail: forged steel components and machined gray steel geometry"
    : "Mechanical detail of Almeida Equipamentos equipment",
} as const;
const ENGENHARIA = {
  src: ENGENHARIA_ASSET.desktop ?? IMG_EQUIPAMENTOS_ENGENHARIA,
  mobileSrc: ENGENHARIA_ASSET.mobile ?? undefined,
};

const COPY = {
  pt: {
    ambientalEntryHeadlinePrefix: "RESÍDUOS GANHAM UM NOVO ",
    ambientalEntryHeadlineGold: "DESTINO",
    ambientalEntryBody:
      "Há quatro décadas, conhecimento técnico e experiência operacional se encontram na gestão responsável de resíduos.",
    ambientalProcessEyebrow: "Almeida Ambiental",
    ambientalProcessHeadline: "EFICIÊNCIA EM CADA ETAPA DO PROCESSO",
    ambientalProcessBody:
      "Da coleta à destinação, a Almeida Ambiental reúne estrutura, tecnologia e experiência para transformar resíduos em valor, com mais eficiência logística, segurança e responsabilidade ambiental.",
    ambientalProcessCta: "Conheça Almeida Ambiental",
    ambientalFrotaAlt: "Operação logística da Almeida Ambiental",
    ambientalProcessAriaLabel: "Etapas da operação da Almeida Ambiental",
    equipamentosEntryHeadline: "TECNOLOGIA QUE NASCEU DA PRÓPRIA OPERAÇÃO",
    equipamentosEntryBody:
      "Criada para aperfeiçoar os processos do Grupo Almeida, a Almeida Equipamentos transforma décadas de experiência no setor em tecnologia aplicada à gestão de resíduos.",
    equipamentosEyebrow: "Almeida Equipamentos",
    equipamentosHeadline: "Engenharia para movimentar mais com menos",
    equipamentosBody: "Conhecimento de campo conectado a tecnologias internacionais.",
    equipamentosTags: ["Compactadores", "Prensas", "Trituradores", "Containers"],
    equipamentosCta: "Conheça Almeida Equipamentos",
    saturnoLocationLine: "Blumenau · Vale do Itajaí",
    saturnoEntryHeadline: "EXPERIÊNCIA REGIONAL. FORÇA DE GRUPO.",
    saturnoAtuacaoAlt: "Materialidade da Saturno Ambiental: camadas de papel e papelão comprimidos",
    saturnoEyebrow: "Saturno Ambiental",
    saturnoHeadline: "GESTÃO AMBIENTAL QUE VAI ALÉM DA COLETA",
    saturnoBody:
      "Coleta, triagem, trituração, cartonagem e consultoria ambiental fazem parte de uma atuação construída para unir eficiência operacional e responsabilidade ambiental.",
    saturnoTags: ["Gestão de Resíduos", "Cartonagem", "Consultoria"],
    saturnoCta: "Conheça Saturno Ambiental",
    impactEyebrow: "Impacto Positivo · 2025",
    impactHeadline: "CADA RESÍDUO PROCESSADO VIRA UM NÚMERO QUE A NATUREZA RECONHECE.",
    impactReportCta: "Ver Relatório de Sustentabilidade 2025",
    manifestoAlt: "Grupo Almeida",
    manifestoHeadline: "O que começou com papel e papelão hoje conecta operação, tecnologia e sustentabilidade.",
    manifestoBody: "Há 40 anos transformando o presente, pensando no futuro.",
    manifestoCta: "Entre em contato com o Grupo Almeida",
  },
  en: {
    ambientalEntryHeadlinePrefix: "WASTE GETS A NEW ",
    ambientalEntryHeadlineGold: "DESTINATION",
    ambientalEntryBody:
      "For four decades, technical knowledge and operational experience have come together in responsible waste management.",
    ambientalProcessEyebrow: "Almeida Ambiental",
    ambientalProcessHeadline: "EFFICIENCY IN EVERY STEP OF THE PROCESS",
    ambientalProcessBody:
      "From collection to disposal, Almeida Ambiental brings together structure, technology and experience to turn waste into value, with more logistics efficiency, safety and environmental responsibility.",
    ambientalProcessCta: "See Almeida Ambiental",
    ambientalFrotaAlt: "Almeida Ambiental's logistics operation",
    ambientalProcessAriaLabel: "Almeida Ambiental's operating steps",
    equipamentosEntryHeadline: "TECHNOLOGY BORN FROM THE OPERATION ITSELF",
    equipamentosEntryBody:
      "Created to improve Grupo Almeida's processes, Almeida Equipamentos turns decades of industry experience into technology applied to waste management.",
    equipamentosEyebrow: "Almeida Equipamentos",
    equipamentosHeadline: "Engineering to move more with less",
    equipamentosBody: "Field knowledge connected to international technology.",
    equipamentosTags: ["Compactors", "Balers", "Shredders", "Containers"],
    equipamentosCta: "See Almeida Equipamentos",
    saturnoLocationLine: "Blumenau · Vale do Itajaí",
    saturnoEntryHeadline: "REGIONAL EXPERIENCE. GROUP STRENGTH.",
    saturnoAtuacaoAlt: "Saturno Ambiental's materiality: layers of compressed paper and cardboard",
    saturnoEyebrow: "Saturno Ambiental",
    saturnoHeadline: "ENVIRONMENTAL MANAGEMENT THAT GOES BEYOND COLLECTION",
    saturnoBody:
      "Collection, sorting, shredding, cartonage and environmental consulting are all part of an operation built to combine operational efficiency with environmental responsibility.",
    saturnoTags: ["Waste Management", "Cartonage", "Consulting"],
    saturnoCta: "See Saturno Ambiental",
    impactEyebrow: "Positive Impact · 2025",
    impactHeadline: "EVERY BIT OF WASTE PROCESSED BECOMES A NUMBER NATURE RECOGNIZES.",
    impactReportCta: "View 2025 Sustainability Report",
    manifestoAlt: "Grupo Almeida",
    manifestoHeadline: "What began with paper and cardboard today connects operations, technology and sustainability.",
    manifestoBody: "40 years transforming the present, with the future in mind.",
    manifestoCta: "Get in touch with Grupo Almeida",
  },
} as const;

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
export default function HomePage({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const processSteps = (locale === "en" ? FLOW_STEPS_EN : FLOW_STEPS).map((name) => ({ name }));
  const impactMetrics = locale === "en" ? IMPACT_METRICS_EN : IMPACT_METRICS;
  const impactoRef = useRef<HTMLDivElement>(null);
  const impactoActive = useEnterOnce([impactoRef]);

  return (
    <div className={styles.page} data-page="home">
      <Hero locale={locale} />

      {/* ---------------- Almeida Ambiental (território contínuo) ----------------
          Correção de direção de arte (branch feature/correcao-direcao-arte):
          as duas dobras da Almeida Ambiental eram duas seções com o mesmo
          tom sólido, e só a segunda ganhava a textura de materialidade — o
          usuário via "acabou uma imagem de fundo, começou outra" no meio do
          território de uma única empresa. A materialidade agora pertence ao
          TERRITÓRIO (este wrapper), não à dobra: uma única MaterialSurface
          cobre as duas seções por baixo, com `position:absolute; inset:0`
          relativo a este wrapper (ver .ambientalTerritory), e cada `section`
          interna abre mão do próprio `toneForest` sólido — o tom (cor de
          texto, --role-*) continua vindo daqui por herança de custom
          property, só o preenchimento visual passou a ser um só, contínuo.

          A fotografia de "galpão/operação integrada" que ocupava a segunda
          dobra saiu: era uma imagem ilustrativa gerada por IA
          (ambiental-operacao-integrada.webp, ver histórico do arquivo) que
          competia com a materialidade em vez de documentar uma instalação
          real. Não entrou outra imagem no lugar — a superfície material já
          cumpre a função visual da dobra enquanto não existir captação real. */}
      <div className={`${styles.toneForest} ${styles.ambientalTerritory}`}>
        <MaterialSurface surface="ambiental-materia" />

        {/* Rodada de refino de brand stage (Seção 3/4): as três entradas de
            empresa agora compartilham a MESMA lógica no desktop — logo
            grande à esquerda, conteúdo à direita — em vez de alternar
            lado a lado. O ritmo entre as três já vem da troca de marca,
            cor, textura e fundo; a posição da marca não precisa mais
            variar por section. */}
        <section
          id="almeida-ambiental"
          className={`${styles.section} ${styles.ambientalEntrySection} ${boundarySurface}`}
        >
          <BrandBoundaryMark boundary="grupo-ambiental" half="entering" surface="onDark" />
          <div className={styles.container}>
            <Reveal className={`${styles.duo} ${styles.duoMediaLeft}`}>
              <BrandStage className={styles.duoStage}>
                <BrandMark
                  brand={BRANDS["almeida-ambiental"]}
                  variant="branca"
                  className={styles.brandStageLogo}
                />
              </BrandStage>
              <div className={styles.duoContent}>
                <h2 className={styles.headline}>
                  {t.ambientalEntryHeadlinePrefix}
                  <span className={styles.gold}>{t.ambientalEntryHeadlineGold}</span>
                </h2>
                <p className={styles.body}>{t.ambientalEntryBody}</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Rodada de refino de brand stage (Seção 7-9): a fotografia real da
            frota (mesmo arquivo da entrada, antes do commit 7843173) volta
            aqui como peça editorial ao lado do Process Flow — função
            operacional, não mais de assinatura de marca. No mobile, o
            conteúdo textual continua vindo primeiro (.duoContentFirst
            inverte a ordem padrão de .duo só abaixo de 1024px), então a
            foto funciona como pausa visual entre o texto e o Process Flow,
            nunca como abertura da dobra. */}
        <section className={`${styles.section} ${styles.ambientalProcessSection} ${boundarySurface}`}>
          <BrandBoundaryMark boundary="ambiental-equipamentos" half="leaving" surface="onDark" />
          <div className={styles.container}>
            <Reveal className={`${styles.duo} ${styles.duoMediaRight} ${styles.duoContentFirst}`}>
              <div className={styles.duoContent}>
                <p className={styles.eyebrow}>{t.ambientalProcessEyebrow}</p>
                <h2 className={styles.headline}>{t.ambientalProcessHeadline}</h2>
                <p className={styles.body}>{t.ambientalProcessBody}</p>
                <div className={styles.ctaRow}>
                  <Link className={`${styles.btn} ${styles.btnOutlineOnDark}`} href={localizeHref("/almeida-ambiental", locale)}>
                    {t.ambientalProcessCta}
                  </Link>
                </div>
              </div>
              <div className={`${styles.duoMedia} ${styles.duoMediaLandscape}`}>
                <SectionMedia imageSrc={IMG_AMBIENTAL_FROTA} alt={t.ambientalFrotaAlt} objectPosition="center" />
              </div>
            </Reveal>

            <ProcessSteps steps={processSteps} ariaLabel={t.ambientalProcessAriaLabel} />
          </div>
        </section>
      </div>

      {/* ---------------- Almeida Equipamentos / tecnologia ---------------- */}
      <section className={`${styles.section} ${styles.toneStoneAlt} ${boundarySurface}`}>
        <BrandBoundaryMark boundary="ambiental-equipamentos" half="entering" surface="onLight" />
        <div className={styles.container}>
          <Reveal className={`${styles.duo} ${styles.duoMediaLeft}`}>
            {/* Imagem de maquinário saiu (feedback de presença de marca): a
                logo oficial colorida grande entra no lugar, como
                BrandStage — ver Seção 11/13 do pedido da cliente. */}
            <BrandStage className={styles.duoStage}>
              <BrandMark
                brand={BRANDS["almeida-equipamentos"]}
                variant="original"
                className={`${styles.brandStageLogo} ${styles.brandStageLogoEquipamentos}`}
              />
            </BrandStage>
            <div className={styles.duoContent}>
              <h2 className={styles.headline}>{t.equipamentosEntryHeadline}</h2>
              <p className={styles.body}>{t.equipamentosEntryBody}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Almeida Equipamentos / engenharia ----------------
          Rodada de refino de fluxo/materiais (Seções 27-32): a frase
          "Compactadores, prensas e tecnologias desenvolvidas para
          diferentes materiais, volumes e realidades operacionais" saiu por
          repetir, em prosa, exatamente as quatro famílias já listadas
          logo abaixo (.tagRow) — não é perda de informação, é remover
          redundância. O headline vira sentence case só nesta dobra
          (.headlineSentence sobrescreve o text-transform:uppercase padrão
          de .headline, mesmo mecanismo já usado por .manifestoHeadline).
          `.duoEven` troca a proporção de 8fr/4fr (duoMediaNarrow) para
          6fr/6fr — texto e imagem com peso equilibrado no desktop. */}
      <section className={`${styles.section} ${styles.toneStoneAlt} ${boundarySurface}`}>
        <BrandBoundaryMark boundary="equipamentos-saturno" half="leaving" surface="onLight" />
        <div className={styles.container}>
          <Reveal className={`${styles.duo} ${styles.duoMediaRight} ${styles.duoEven}`}>
            <div className={styles.duoContent}>
              <p className={styles.eyebrow}>{t.equipamentosEyebrow}</p>
              <h2 className={`${styles.headline} ${styles.headlineSentence}`}>{t.equipamentosHeadline}</h2>
              <p className={styles.body}>{t.equipamentosBody}</p>
              <ul className={styles.tagRow}>
                {t.equipamentosTags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <div className={styles.ctaRow}>
                <Link className={`${styles.btn} ${styles.btnOutlineOnLight}`} href={localizeHref("/almeida-equipamentos", locale)}>
                  {t.equipamentosCta}
                </Link>
              </div>
            </div>
            <div className={`${styles.duoMedia} ${styles.duoMediaLandscape}`}>
              <SectionMedia
                imageSrc={ENGENHARIA.src}
                mobileSrc={ENGENHARIA.mobileSrc}
                alt={ENGENHARIA_ALT[locale]}
                objectPosition="center"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Saturno Ambiental (território contínuo) ----------------
          Consolidação de territórios (branch feature/territorios-visuais-
          continuos): mesmo problema que a Almeida Ambiental já teve —
          a primeira dobra tinha a materialidade (MaterialSurface
          "saturno-hero") e a segunda ficava só na cor sólida, então o
          usuário via a textura desaparecer exatamente no meio do
          território de uma única empresa. A materialidade passa a
          pertencer ao wrapper (.saturnoTerritory), não à dobra — a mesma
          MaterialSurface cobre as duas por baixo, sem reiniciar.

          A dobra de "atuação" mantém a sua própria fotografia
          (saturno-fluxo, framed) como PEÇA editorial dentro do ambiente —
          não como um segundo fundo de página inteira — exatamente a
          distinção que a rodada pede entre AMBIENTE e ASSET. Não é a
          mesma imagem da dobra anterior (saturno-hero ≠ saturno-fluxo),
          então a variedade continua existindo dentro do mesmo mundo
          visual. */}
      <div className={`${styles.toneStone} ${styles.saturnoTerritory}`}>
        <MaterialSurface surface="saturno-hero" />

        <section className={`${styles.section} ${boundarySurface}`}>
          <BrandBoundaryMark boundary="equipamentos-saturno" half="entering" surface="onDark" />
          <div className={styles.container}>
            {/* Rodada de refino de brand stage (Seção 15): logo à esquerda,
                conteúdo à direita — mesma lógica de Ambiental/Equipamentos,
                sem mais alternância de lado entre as três entradas. */}
            <Reveal className={`${styles.duo} ${styles.duoMediaLeft} ${styles.brandStatement}`}>
              <BrandStage className={styles.duoStage}>
                <BrandMark
                  brand={BRANDS["saturno-ambiental"]}
                  variant="branca"
                  className={styles.brandStageLogo}
                />
              </BrandStage>
              <div className={styles.duoContent}>
                <p className={styles.locationLine}>{t.saturnoLocationLine}</p>
                <h2 className={`${styles.headline} ${styles.headlineMonumental}`}>{t.saturnoEntryHeadline}</h2>
              </div>
            </Reveal>
          </div>
        </section>

        <section className={`${styles.section} ${boundarySurface}`}>
          <BrandBoundaryMark boundary="saturno-impacto" half="leaving" surface="onDark" />
          <div className={styles.container}>
            <Reveal className={`${styles.duo} ${styles.duoMediaLeft} ${styles.duoMediaNarrow}`}>
              <div className={`${styles.duoMedia} ${styles.duoMediaSquare}`}>
                <SectionMedia imageSrc={IMG_SATURNO_ATUACAO} alt={t.saturnoAtuacaoAlt} objectPosition="center" />
              </div>
              <div className={styles.duoContent}>
                <p className={styles.eyebrow}>{t.saturnoEyebrow}</p>
                <h2 className={styles.headline}>{t.saturnoHeadline}</h2>
                <p className={styles.body}>{t.saturnoBody}</p>
                <ul className={styles.tagRow}>
                  {t.saturnoTags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <div className={styles.ctaRow}>
                  <Link className={`${styles.btn} ${styles.btnOutlineOnDark}`} href={localizeHref("/saturno-ambiental", locale)}>
                    {t.saturnoCta}
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </div>

      {/* ---------------- Impacto positivo 2025 ---------------- */}
      <section
        className={`${styles.section} ${styles.toneCarvao} ${boundarySurface}`}
        ref={impactoRef}
      >
        <BrandBoundaryMark boundary="saturno-impacto" half="entering" surface="onDark" />
        <div className={styles.container}>
          <Reveal className={styles.impactHead}>
            <p className={styles.eyebrow}>{t.impactEyebrow}</p>
            <h2 className={styles.headline}>{t.impactHeadline}</h2>
          </Reveal>

          <Reveal>
            <div className={styles.metricsGrid}>
              {impactMetrics.map((metric) => (
                <div key={metric.label} className={styles.metricItem}>
                  <span className={styles.metricValue}>
                    <CountUpMetric
                      target={metric.target}
                      format={metric.format}
                      suffix={metric.suffix}
                      display={metric.display}
                      active={impactoActive}
                      locale={locale}
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
                {t.impactReportCta}
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
              <SectionMedia imageSrc={IMG_MANIFESTO} alt={t.manifestoAlt} objectPosition="center 40%" />
            </div>
            <h2 className={styles.manifestoHeadline}>{t.manifestoHeadline}</h2>
            <p className={styles.body}>{t.manifestoBody}</p>
            <div className={styles.ctaRow}>
              <Link className={`${styles.btn} ${styles.btnOutlineOnDark}`} href={localizeHref("/contato", locale)}>
                {t.manifestoCta}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
