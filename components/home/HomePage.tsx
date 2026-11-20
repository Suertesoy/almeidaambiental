"use client";

import { useRef } from "react";
import Link from "next/link";
import styles from "./home.module.css";
import Hero from "./Hero";
import SectionMedia from "../shared/SectionMedia";
import Reveal from "../shared/Reveal";
import BrandBoundaryMark, { boundarySurface } from "../shared/BrandBoundaryMark";
import BrandMark from "../shared/BrandMark";
import ProcessFlowDiagram from "../almeida-ambiental/ProcessFlowDiagram";
import IllustrativeBadge from "../shared/IllustrativeBadge";
import MaterialSurface from "../shared/MaterialSurface";
import EquipmentChoreographyStage from "../equipamentos/EquipmentChoreographyStage";
import AmbientVideo from "../shared/AmbientVideo";
import { BRANDS } from "../../lib/brands";
import { FLOW_STEPS, FLOW_STEPS_EN } from "../../lib/almeida-ambiental-data";
import { useEnterOnce } from "../AnimatedMetric";
import ImpactMetricsGrid from "./ImpactMetricsGrid";
import { MATERIAL_IMAGES, MATERIAL_SURFACES } from "../../lib/material-surfaces";
import { localizeHref } from "../../lib/i18n/routes";
import type { Locale } from "../../lib/i18n/locale";

/* IMG_EQUIPAMENTOS_TECNOLOGIA saiu na rodada de presença de marca: a
   fotografia da dobra de ENTRADA da Almeida Equipamentos deu lugar à logo
   oficial grande (BrandStage abaixo). */
const IMG_EQUIPAMENTOS_ENGENHARIA = "/images/home-variants/equipamentos/equipamentos-detalhe-mecanico.webp";
/* Slot de operação da Almeida Ambiental. Antes: ambiental-logistica-cinematic
   (quadro de vídeo em baixa resolução, estourado, avaliado como o asset mais
   fraco da Home). Agora: pátio industrial da própria página da Ambiental —
   asset existente, composição mais forte (fardos, empilhadeira, galpão).
   Imagem ilustrativa (IA): leva IllustrativeBadge. Candidata prioritária a
   substituição por fotografia real. */
const IMG_AMBIENTAL_OPERACAO = "/almeida-ambiental/patio-industrial.webp";
/* Substitui saturno-fardos.webp (rodada "materialidade-assets-finais",
   Seção 9): a foto antiga afirmava "Fardos processados pela Saturno
   Ambiental" sem base — ninguém confirmou que aqueles fardos eram da
   Saturno. No lugar entra a materialidade própria da marca (mesma peça do
   capítulo de fechamento de /saturno-ambiental) como imagem emoldurada,
   não como fotografia de operação. */
const IMG_SATURNO_ATUACAO = "/images/captacao-2026/foto-forca-de-grupo-desktop.webp";
const IMG_SATURNO_ATUACAO_MOBILE = "/images/captacao-2026/foto-forca-de-grupo-mobile.webp";
const IMG_MANIFESTO = "/images/captacao-2026/foto-ampla-almeida-dentro-galpao-desktop.webp";
const IMG_MANIFESTO_MOBILE = "/images/captacao-2026/foto-ampla-almeida-dentro-galpao-mobile.webp";

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
    ambientalEntryHeadlinePrefix: "Resíduos ganham um novo ",
    ambientalEntryHeadlineGold: "destino",
    ambientalEntryBody:
      "Há quatro décadas, conhecimento técnico e experiência operacional se encontram na gestão responsável de resíduos.",
    ambientalProcessHeadline: "Eficiência em cada etapa do processo",
    ambientalProcessBody:
      "Da coleta à destinação, estrutura, tecnologia e experiência para transformar resíduos em valor, com eficiência logística, segurança e responsabilidade ambiental.",
    ambientalProcessCta: "Conheça Almeida Ambiental",
    ambientalFrotaAlt:
      "Imagem ilustrativa de um pátio industrial de reciclagem com fardos de papelão organizados e empilhadeira",
    ambientalProcessAriaLabel: "Etapas da operação da Almeida Ambiental",
    ambientalProcessDescription:
      "Diagnóstico, Coleta e Triagem. Depois da Triagem, o material segue por Trituração ou por Descaracterização, caminhos alternativos que convergem na Destinação.",
    equipamentosEntryHeadline: "Tecnologia que nasceu da própria operação",
    equipamentosEntryBody:
      "Criada para aperfeiçoar os processos do Grupo Almeida, transforma décadas de experiência no setor em tecnologia aplicada à gestão de resíduos.",
    equipamentosHeadline: "Engenharia para movimentar mais com menos",
    equipamentosBody: "Conhecimento de campo conectado a tecnologias internacionais.",
    equipamentosCta: "Conheça Almeida Equipamentos",
    saturnoLocationLine: "Blumenau · Vale do Itajaí",
    saturnoEntryHeadline: "Experiência regional. Força de grupo.",
    saturnoAtuacaoAlt: "Materialidade da Saturno Ambiental: camadas de papel e papelão comprimidos",
    saturnoHeadline: "Gestão ambiental que vai além da coleta",
    saturnoBody:
      "Coleta, triagem, trituração, cartonagem e consultoria ambiental fazem parte de uma atuação construída para unir eficiência operacional e responsabilidade ambiental.",
    saturnoCta: "Conheça Saturno Ambiental",
    impactTitle: "Impacto positivo",
    impactBadge: "Estimativa",
    impactNote:
      "Estimativa acumulada com base nos dados operacionais de janeiro a setembro de 2026, projetada pela média diária até a próxima atualização oficial.",
    impactHeadline: "Cada resíduo processado vira um número que a natureza reconhece.",
    manifestoAlt:
      "Imagem ilustrativa de um galpão industrial de reciclagem com fardos de papelão empilhados e uma empilhadeira, representando a operação do Grupo",
    manifestoHeadline: "O que começou com papel e papelão hoje conecta operação, tecnologia e sustentabilidade.",
    manifestoBody: "Há 40 anos transformando o presente, pensando no futuro.",
    manifestoCta: "Entre em contato com o Grupo Almeida",
  },
  en: {
    ambientalEntryHeadlinePrefix: "Waste gets a new ",
    ambientalEntryHeadlineGold: "destination",
    ambientalEntryBody:
      "For four decades, technical knowledge and operational experience have come together in responsible waste management.",
    ambientalProcessHeadline: "Efficiency in every step of the process",
    ambientalProcessBody:
      "From collection to disposal, structure, technology and experience to turn waste into value, with logistics efficiency, safety and environmental responsibility.",
    ambientalProcessCta: "See Almeida Ambiental",
    ambientalFrotaAlt:
      "Illustrative image of an industrial recycling yard with organized cardboard bales and a forklift",
    ambientalProcessAriaLabel: "Almeida Ambiental's operating steps",
    ambientalProcessDescription:
      "Assessment, Collection and Sorting. After Sorting, material goes through either Shredding or Destruction, alternative paths that converge on Disposal.",
    equipamentosEntryHeadline: "Technology born from the operation",
    equipamentosEntryBody:
      "Created to improve Grupo Almeida's processes, it turns decades of industry experience into technology applied to waste management.",
    equipamentosHeadline: "Engineering to move more with less",
    equipamentosBody: "Field knowledge, paired with international technology.",
    equipamentosCta: "See Almeida Equipamentos",
    saturnoLocationLine: "Blumenau · Vale do Itajaí",
    saturnoEntryHeadline: "Regional expertise. Backed by Grupo Almeida.",
    saturnoAtuacaoAlt: "Abstract texture of layered, compressed paper and cardboard representing Saturno Ambiental",
    saturnoHeadline: "Environmental management that goes beyond collection",
    saturnoBody:
      "Collection, sorting, shredding, cardboard packaging and environmental consulting come together in an operation built around efficiency and environmental responsibility.",
    saturnoCta: "See Saturno Ambiental",
    impactTitle: "Positive impact",
    impactBadge: "Estimate",
    impactNote:
      "Accumulated estimate based on operating data from January to September 2026, projected using the daily average until the next official update.",
    impactHeadline: "Waste processed. Impact measured.",
    manifestoAlt:
      "Illustrative image of an industrial recycling warehouse with stacked cardboard bales and a forklift, representing the Group's operations",
    manifestoHeadline: "What began with paper and cardboard now connects operations, technology and sustainability.",
    manifestoBody: "Four decades of transformation, with the future in mind.",
    manifestoCta: "Get in touch with Grupo Almeida",
  },
} as const;

/**
 * Home principal — narrativa editorial contínua em capítulos.
 *
 * Cada empresa é UM capítulo (uma <section>, uma superfície, um ritmo
 * interno): entrada de marca → segunda mensagem com imagem → fecho
 * (Process Flow, no caso da Ambiental). Entre as linhas do mesmo capítulo o
 * respiro é --space-chapter-internal; entre capítulos, o cheio. O fechamento
 * (Impacto + Manifesto) também é um único capítulo em carvão.
 *
 * O símbolo do Grupo aparece só como COSTURA entre territórios
 * (BrandBoundaryMark): grupo→ambiental, ambiental→equipamentos,
 * equipamentos→saturno, saturno→impacto. Como cada capítulo é uma seção
 * só, a mesma seção hospeda a metade que entra e a que sai.
 *
 * Eyebrow só onde há categoria/contexto (Impacto). As empresas já são
 * identificadas pela logo grande e pelo CTA, então não repetem o nome.
 */
export default function HomePage({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const processSteps = locale === "en" ? FLOW_STEPS_EN : FLOW_STEPS;
  const impactoRef = useRef<HTMLDivElement>(null);
  const impactoActive = useEnterOnce([impactoRef]);

  return (
    <div className={styles.page} data-page="home">
      <Hero locale={locale} />

      {/* ---------------- Capítulo: Almeida Ambiental ----------------
          Assinatura monocromática branca centralizada → tese editorial →
          operação em duo assimétrico → Process Flow finito. */}
      <div className={`${styles.toneForest} ${styles.ambientalTerritory}`}>
        <MaterialSurface surface="ambiental-materia" />

        <section
          id="almeida-ambiental"
          className={`${styles.companyChapter} ${styles.ambientalEntrySection} ${boundarySurface}`}
        >
          <BrandBoundaryMark boundary="grupo-ambiental" half="entering" surface="onDark" />
          <BrandBoundaryMark boundary="ambiental-equipamentos" half="leaving" surface="onDark" />
          <div className={styles.container}>
            <div className={styles.chapterRows}>
              <div className={styles.chapterHeader}>
                <Reveal className={styles.chapterSignature}>
                  <BrandMark
                    brand={BRANDS["almeida-ambiental"]}
                    variant="branca"
                    className={styles.signatureLogo}
                  />
                </Reveal>
                <Reveal className={styles.chapterIntro} style={{ transitionDelay: "70ms" }}>
                  <h2 className={styles.headline}>
                    {t.ambientalEntryHeadlinePrefix}
                    <span className={styles.gold}>{t.ambientalEntryHeadlineGold}</span>
                  </h2>
                  <p className={styles.body}>{t.ambientalEntryBody}</p>
                </Reveal>
              </div>

              <Reveal className={styles.processHeader} style={{ transitionDelay: "120ms" }}>
                <h3 className={styles.headlineSecondary}>{t.ambientalProcessHeadline}</h3>
              </Reveal>

              <Reveal className={`${styles.duo} ${styles.duoMediaRight}`} style={{ transitionDelay: "120ms" }}>
                <div className={styles.duoContent}>
                  <p className={styles.body}>{t.ambientalProcessBody}</p>
                </div>
                <div className={`${styles.duoMedia} ${styles.duoMediaLandscape}`}>
                  <AmbientVideo
                    src="/videos/captacao-2026/visao-geral.mp4"
                    poster="/images/captacao-2026/visao-geral-poster.webp"
                    ariaLabel={
                      locale === "en"
                        ? "Overview of waste handling and sorting operations at Almeida Ambiental"
                        : "Visão geral da operação de movimentação e triagem de resíduos na Almeida Ambiental"
                    }
                    style={{ objectPosition: "center 54%" }}
                  />
                </div>
              </Reveal>

              {/* Mesmo componente (e mesmo progresso por rolagem) da página
                  Almeida Ambiental — não é uma segunda implementação. */}
              <Reveal>
                <ProcessFlowDiagram
                  steps={[...processSteps]}
                  ariaLabel={t.ambientalProcessAriaLabel}
                  description={t.ambientalProcessDescription}
                />
              </Reveal>

              {/* CTA da empresa: último elemento da seção, amarelo institucional. */}
              <div className={`${styles.ctaRow} ${styles.ctaRowCenter}`}>
                <Link className={`${styles.btn} ${styles.btnSolidGold}`} href={localizeHref("/almeida-ambiental", locale)}>
                  {t.ambientalProcessCta}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ---------------- Capítulo: Almeida Equipamentos ----------------
          Assinatura monocromática preta centralizada → palco amplo preparado
          para o futuro visualizador 3D (usando a mídia atual sem placeholders) →
          rodapé editorial com proposta, categorias e CTA. */}
      <section className={`${styles.companyChapter} ${styles.toneStoneAlt} ${boundarySurface}`}>
        <BrandBoundaryMark boundary="ambiental-equipamentos" half="entering" surface="onLight" />
        <BrandBoundaryMark boundary="equipamentos-saturno" half="leaving" surface="onLight" />
        <div className={styles.container}>
          <div className={styles.chapterRows}>
            <div className={styles.chapterHeader}>
              <Reveal className={styles.chapterSignature}>
                <BrandMark
                  brand={BRANDS["almeida-equipamentos"]}
                  variant="preta"
                  className={`${styles.signatureLogo} ${styles.signatureLogoEquipamentos}`}
                />
              </Reveal>
              <Reveal className={styles.chapterIntro} style={{ transitionDelay: "70ms" }}>
                <h2 className={styles.headline}>{t.equipamentosEntryHeadline}</h2>
                <p className={styles.body}>{t.equipamentosEntryBody}</p>
              </Reveal>
            </div>

            <Reveal className={styles.equipamentosStage} style={{ transitionDelay: "120ms" }}>
              <div className={styles.equipamentosStageFrame} data-stage="3d-ready">
                <EquipmentChoreographyStage locale={locale} variant="home" />
              </div>
            </Reveal>

            <Reveal className={styles.equipamentosFooter} style={{ transitionDelay: "160ms" }}>
              <h3 className={styles.headlineSecondary}>{t.equipamentosHeadline}</h3>
              <p className={styles.body}>{t.equipamentosBody}</p>
              <div className={styles.ctaRow}>
                <Link className={`${styles.btn} ${styles.btnSolidGold}`} href={localizeHref("/almeida-equipamentos", locale)}>
                  {t.equipamentosCta}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Capítulo: Saturno Ambiental ----------------
          Assinatura monocromática branca centralizada → declaração tipográfica
          regional → materialidade e atuação em duo assimétrico. */}
      <div className={`${styles.toneStone} ${styles.saturnoTerritory}`}>
        <MaterialSurface surface="saturno-hero" />

        <section className={`${styles.companyChapter} ${boundarySurface}`}>
          <BrandBoundaryMark boundary="equipamentos-saturno" half="entering" surface="onDark" />
          <BrandBoundaryMark boundary="saturno-impacto" half="leaving" surface="onDark" />
          <div className={styles.container}>
            <div className={styles.chapterRows}>
              <div className={`${styles.chapterHeader} ${styles.saturnoHeader}`}>
                <Reveal className={styles.chapterSignature}>
                  <BrandMark
                    brand={BRANDS["saturno-ambiental"]}
                    variant="branca"
                    className={styles.signatureLogo}
                  />
                </Reveal>
                <Reveal className={`${styles.chapterIntro} ${styles.brandStatement}`} style={{ transitionDelay: "70ms" }}>
                  <p className={styles.locationLine}>{t.saturnoLocationLine}</p>
                  <h2 className={`${styles.headline} ${styles.headlineMonumental}`}>{t.saturnoEntryHeadline}</h2>
                </Reveal>
              </div>

              <Reveal className={`${styles.duo} ${styles.duoMediaLeft} ${styles.duoMediaNarrow}`} style={{ transitionDelay: "120ms" }}>
                <div className={`${styles.duoMedia} ${styles.duoMedia4x3}`}>
                  <AmbientVideo
                    src="/videos/captacao-2026/cada-etapa.mp4"
                    poster="/images/captacao-2026/cada-etapa-poster.webp"
                    ariaLabel={
                      locale === "en"
                        ? "Material unloading and operational movement at Grupo Almeida"
                        : "Movimentação e descarregamento de materiais na operação do Grupo Almeida"
                    }
                    style={{ objectPosition: "56% 52%" }}
                  />
                </div>
                <div className={styles.duoContent}>
                  <h3 className={styles.headlineSecondary}>{t.saturnoHeadline}</h3>
                  <p className={styles.body}>{t.saturnoBody}</p>
                  <div className={styles.ctaRow}>
                    <Link className={`${styles.btn} ${styles.btnSolidGold}`} href={localizeHref("/saturno-ambiental", locale)}>
                      {t.saturnoCta}
                    </Link>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </div>

      {/* ---------------- Fechamento: Impacto + Manifesto ----------------
          Um único capítulo em carvão: números vivos e, logo abaixo, a frase
          do Grupo — não duas páginas consecutivas. */}
      <section className={`${styles.closing} ${styles.toneCarvao} ${boundarySurface}`}>
        <BrandBoundaryMark boundary="saturno-impacto" half="entering" surface="onDark" />
        <div className={styles.container}>
          <div ref={impactoRef}>
            <Reveal className={styles.impactHead}>
              <div className={styles.impactTitleRow}>
                <h2 className={styles.headline}>{t.impactTitle}</h2>
                <span className={styles.impactBadge}>{t.impactBadge}</span>
              </div>
              <p className={styles.impactLede}>{t.impactHeadline}</p>
            </Reveal>

            <Reveal>
              <ImpactMetricsGrid locale={locale} active={impactoActive} />
              <p className={styles.metricsNote}>{t.impactNote}</p>
            </Reveal>
          </div>

          <Reveal className={`${styles.duo} ${styles.duoMediaLeft} ${styles.duoMediaNarrow} ${styles.manifesto}`}>
            <div className={`${styles.duoMedia} ${styles.duoMedia4x3}`}>
              <SectionMedia
                imageSrc={IMG_MANIFESTO}
                mobileSrc={IMG_MANIFESTO_MOBILE}
                alt={
                  locale === "en"
                    ? "Wide interior view of Grupo Almeida operational warehouse with sorting and recycling processes"
                    : "Vista ampla do interior do galpão operacional do Grupo Almeida com processos de triagem e reciclagem"
                }
                objectPosition="center 52%"
              />
            </div>
            <div className={styles.duoContent}>
              <h2 className={styles.headlineSecondary}>{t.manifestoHeadline}</h2>
              <p className={styles.body}>{t.manifestoBody}</p>
              <div className={styles.ctaRow}>
                <Link className={`${styles.btn} ${styles.btnSolidGold}`} href={localizeHref("/contato", locale)}>
                  {t.manifestoCta}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
