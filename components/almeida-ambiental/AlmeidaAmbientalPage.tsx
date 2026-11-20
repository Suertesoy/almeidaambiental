import Link from "next/link";
import shared from "../shared/company-page.module.css";
import styles from "./almeida-ambiental.module.css";
import CompanyHero from "../shared/CompanyHero";
import MaterialCards from "../shared/MaterialCards";
import MaterialSurface from "../shared/MaterialSurface";
import EditorialCTA from "../shared/EditorialCTA";
import ProcessFlowDiagram from "./ProcessFlowDiagram";
import IllustrativeBadge from "../shared/IllustrativeBadge";
import Reveal from "../shared/Reveal";
import BrandBoundaryMark, { boundarySurface } from "../shared/BrandBoundaryMark";
import AmbientVideo from "../shared/AmbientVideo";
import {
  PILLARS,
  PILLARS_EN,
  FLOW_STEPS,
  FLOW_STEPS_EN,
} from "../../lib/almeida-ambiental-data";
import { BRANDS } from "../../lib/brands";
import { CONTACT_ANCHORS } from "../../lib/contact-data";
import { localizeHref } from "../../lib/i18n/routes";
import type { Locale } from "../../lib/i18n/locale";

const PILLAR_SIDE = [shared.duoMediaRight, shared.duoMediaLeft, shared.duoMediaRight];

const COPY = {
  pt: {
    heroEyebrow: "Almeida Ambiental",
    heroTitle: "Gestão de resíduos construída sobre experiência, estrutura e eficiência.",
    heroLede:
      "Desde 1985, a Almeida Ambiental transforma coleta, triagem, processamento e destinação em uma operação integrada para grandes geradores de resíduos.",
    heroPrimaryCta: "Conheça nossas soluções",
    heroSecondaryCta: "Fale com a Almeida Ambiental",
    positioningHeadline: "Recolher não basta: é preciso entender o que vem depois.",
    positioningBody:
      "A experiência construída ao longo de quatro décadas permite à Almeida Ambiental unir estrutura logística, classificação, tecnologia e destinação adequada em uma mesma operação. Cada material exige uma solução diferente. O trabalho começa entendendo essa diferença.",
    pillarCounter: (index: number) => String(index + 1).padStart(2, "0"),
    materialsHeadline: "Diferentes materiais. Diferentes caminhos.",
    materialsBody:
      "A operação evoluiu muito além do papel e papelão que marcaram o início da Almeida. Hoje, a estrutura atende diferentes categorias de resíduos e direciona cada uma conforme suas características.",
    processHeadline: "Do diagnóstico à destinação, uma só operação.",
    processAriaLabel: "Etapas da operação da Almeida Ambiental",
    processDescription:
      "Diagnóstico, Coleta e Triagem. Depois da Triagem, o material segue por Trituração ou por Descaracterização, caminhos alternativos que convergem na Destinação.",
    crossHeadline: "Equipamentos pensados a partir da operação diária.",
    crossBody:
      "A Almeida Equipamentos, empresa do Grupo, leva conhecimento de campo para a tecnologia de compactação, armazenagem e processamento.",
    crossCta: "Conheça a Almeida Equipamentos",
    finalHeadline: "Sua operação gera resíduos. A próxima etapa precisa ser planejada.",
    finalBody: "Converse com a equipe e entenda qual estrutura faz sentido para seu volume, material e rotina.",
    finalCta: "Falar com a Almeida Ambiental",
  },
  en: {
    heroEyebrow: "Almeida Ambiental",
    heroTitle: "Waste management built on experience, structure and efficiency.",
    heroLede:
      "Since 1985, Almeida Ambiental has turned collection, sorting, processing and disposal into an integrated operation for large waste generators.",
    heroPrimaryCta: "See our solutions",
    heroSecondaryCta: "Talk to Almeida Ambiental",
    positioningHeadline: "Collecting isn't enough. What happens next matters just as much.",
    positioningBody:
      "Four decades of experience let Almeida Ambiental bring logistics infrastructure, classification, technology and proper disposal together in a single operation. Every material calls for a different solution. The work starts by understanding that difference.",
    pillarCounter: (index: number) => String(index + 1).padStart(2, "0"),
    materialsHeadline: "Different materials. Different paths.",
    materialsBody:
      "The operation has grown well beyond the paper and cardboard that marked Almeida's beginnings. Today it handles different categories of waste and routes each one according to its characteristics.",
    processHeadline: "From assessment to disposal, in a single operation.",
    processAriaLabel: "Almeida Ambiental's operating steps",
    processDescription:
      "Assessment, Collection and Sorting. After Sorting, material goes through either Shredding or Destruction, alternative paths that converge on Disposal.",
    crossHeadline: "Equipment designed around daily operations.",
    crossBody:
      "Almeida Equipamentos, a Grupo Almeida company, brings field knowledge to compaction, storage and processing technology.",
    crossCta: "See Almeida Equipamentos",
    finalHeadline: "Your operation generates waste. The next step needs to be planned.",
    finalBody: "Talk to the team and find out which solution fits your volume, material and routine.",
    finalCta: "Talk to Almeida Ambiental",
  },
} as const;

/**
 * /almeida-ambiental — "estrutura, processo e capacidade operacional",
 * seguindo a ordem da Seção 7 em diante da tarefa: Hero → posicionamento →
 * três pilares (Coleta/Triagem/Trituração, cada um seu próprio capítulo) →
 * materiais → fluxo do resíduo → presença regional → cross-link para
 * Equipamentos → CTA final. Arquitetura própria desta empresa — não o
 * mesmo template de Saturno/Equipamentos com texto trocado.
 *
 * Consolidação de territórios (branch feature/territorios-visuais-
 * continuos): Posicionamento e os três Pilares eram quatro seções
 * alternando entre dois tons de pedra clara (stone/stoneAlt) — nenhum
 * deles é a cor de identidade da Almeida Ambiental, que na Home é verde
 * floresta profundo + materialidade. Saindo do Hero (fotografia real)
 * direto para pedra clara, a página não lia como "o mesmo mundo visual"
 * da Home. As quatro seções agora vivem dentro de .materialTerritory —
 * MESMA MaterialSurface ("ambiental-materia") atravessando todas, cada
 * uma mantendo sua própria fotografia como peça editorial dentro do
 * ambiente. Materiais (Material Cards, pedra clara) e o fechamento
 * seguem como estavam: a Seção 10 da rodada permite explicitamente uma
 * "área clara editorial dentro do território" sem forçá-la a escuro, e a
 * fronteira "ambiental-processo" (lib/brand-boundaries.ts) continua
 * marcando exatamente essa troca real de superfície antes do Process
 * Ribbon.
 */
export default function AlmeidaAmbientalPage({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const pillars = locale === "en" ? PILLARS_EN : PILLARS;
  const processSteps = locale === "en" ? FLOW_STEPS_EN : FLOW_STEPS;

  return (
    <div className={styles.page} data-page="almeida-ambiental">
      <CompanyHero
        locale={locale}
        eyebrow={t.heroEyebrow}
        title={t.heroTitle}
        lede={t.heroLede}
        video={{
          src: "/videos/captacao-2026/hero-almeida.mp4",
          poster: "/images/captacao-2026/hero-almeida-poster.webp",
          label:
            locale === "en"
              ? "External structure and operations of Almeida Ambiental"
              : "Estrutura externa e operação da Almeida Ambiental",
        }}
        imagePosition="center 50%"
        mobileImagePosition="45% 52%"
        scrimTone="forest"
        titleLogo={{ src: BRANDS["almeida-ambiental"].logos.branca }}
        primaryCta={{ label: t.heroPrimaryCta, href: "#servicos" }}
        secondaryCta={{ label: t.heroSecondaryCta, href: localizeHref(CONTACT_ANCHORS.saoJose, locale) }}
      />

      {/* ---------------- Território material (Posicionamento + Pilares) ----------------
          `boundarySurface` em cada `section` abaixo não é sobre nenhuma
          fronteira de marca aqui dentro — é o contrato de empilhamento que
          MaterialSurface já exige (ver BrandBoundaryMark.module.css/.surface):
          sem `position: relative` + `z-index: 0` na section, o texto (estático,
          sem stacking context próprio) pinta ATRÁS da textura absolutamente
          posicionada, não na frente dela. */}
      <div className={`${shared.toneForest} ${styles.materialTerritory}`}>
        <MaterialSurface surface="ambiental-materia" />

        {/* Capítulo "quem é e como atua": posicionamento + visão geral do
            percurso (Process Flow finito). Os pilares abaixo detalham as
            etapas — o fluxo vem antes como mapa. */}
        <section className={`${shared.chapterOpen} ${boundarySurface}`}>
          <div className={shared.container}>
            <div className={shared.chapterRows}>
              <div className={`${shared.duo} ${shared.duoMediaLeft} ${shared.duoMediaNarrow}`}>
                <Reveal className={`${shared.duoMedia} ${shared.duoMediaLandscape}`}>
                  <AmbientVideo
                    src="/videos/captacao-2026/triagem2.mp4"
                    poster="/images/captacao-2026/triagem2-poster.webp"
                    ariaLabel={
                      locale === "en"
                        ? "Real material sorting and separation operation at Almeida Ambiental"
                        : "Operação real de separação e triagem de materiais na Almeida Ambiental"
                    }
                  />
                </Reveal>
                <Reveal className={shared.duoContent} style={{ transitionDelay: "80ms" }}>
                  <h2 className={shared.headline}>{t.positioningHeadline}</h2>
                  <p className={shared.body}>{t.positioningBody}</p>
                </Reveal>
              </div>

              <Reveal style={{ transitionDelay: "120ms" }}>
                <h3 className={shared.subheading}>{t.processHeadline}</h3>
                <ProcessFlowDiagram steps={[...processSteps]} ariaLabel={t.processAriaLabel} description={t.processDescription} />
              </Reveal>
            </div>
          </div>
        </section>

        {/* Capítulo "como atua": três pilares, um capítulo percebido. */}
        <div id="servicos">
          {pillars.map((pillar, index) => {
            const isLast = index === pillars.length - 1;
            return (
              <section
                key={pillar.id}
                className={`${isLast ? shared.chapterClose : shared.chapterMiddle} ${boundarySurface} ${styles.pillarSection}`}
              >
                {isLast && <BrandBoundaryMark boundary="ambiental-processo" half="leaving" surface="onDark" />}
                <div className={shared.container}>
                  <div className={`${shared.duo} ${PILLAR_SIDE[index]}`}>
                    <Reveal className={`${shared.duoMedia} ${shared.duoMediaLandscape} ${index !== 1 ? styles.pillarBleed : ""}`} style={{ transitionDelay: "80ms" }}>
                      {index === 0 ? (
                        <AmbientVideo
                          src="/videos/captacao-2026/caminhao-coleta.mp4"
                          poster="/images/captacao-2026/caminhao-coleta-poster.webp"
                          ariaLabel={
                            locale === "en"
                              ? "Waste collection truck and driver starting route at Almeida Ambiental"
                              : "Caminhão de coleta e operador iniciando rota na Almeida Ambiental"
                          }
                          style={{ objectPosition: "58% 46%" }}
                        />
                      ) : index === 1 ? (
                        <AmbientVideo
                          src="/videos/captacao-2026/triagem1-almeida.mp4"
                          poster="/images/captacao-2026/triagem1-almeida-poster.webp"
                          ariaLabel={
                            locale === "en"
                              ? "Real sorting and classification operation at Almeida Ambiental"
                              : "Operação real de triagem e classificação na Almeida Ambiental"
                          }
                        />
                      ) : index === 2 ? (
                        <AmbientVideo
                          src="/videos/captacao-2026/trituracao-almeida.mp4"
                          poster="/images/captacao-2026/trituracao-almeida-poster.webp"
                          ariaLabel={
                            locale === "en"
                              ? "Real shredding and destruction operation at Almeida Ambiental"
                              : "Operação real de trituração e descaracterização na Almeida Ambiental"
                          }
                        />
                      ) : (
                        <>
                          <img src={pillar.image.src} alt={pillar.image.alt} loading="lazy" decoding="async" />
                          {pillar.image.sourceType === "illustrative" && <IllustrativeBadge locale={locale} />}
                        </>
                      )}
                    </Reveal>
                    <Reveal className={shared.duoContent}>
                      {/* Um só rótulo acima do título: número + categoria. */}
                      <p className={shared.eyebrow}>
                        <span className={styles.pillarIndex}>{t.pillarCounter(index)}</span>
                        {pillar.eyebrow}
                      </p>
                      <h3 className={shared.headline}>{pillar.headline}</h3>
                      <p className={shared.body}>{pillar.copy}</p>
                      {pillar.highlights.length > 0 && (
                        <ul className={`${shared.tagRow} ${styles.pillarHighlights}`}>
                          {pillar.highlights.map((highlight) => (
                            <li key={highlight}>{highlight}</li>
                          ))}
                        </ul>
                      )}
                      {pillar.subcopy && <p className={shared.body}>{pillar.subcopy}</p>}
                    </Reveal>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* ---------------- Materiais ---------------- */}
      <section className={`${shared.chapter} ${shared.toneStoneAlt} ${boundarySurface}`}>
        <BrandBoundaryMark boundary="ambiental-processo" half="entering" surface="onLight" />
        <div className={shared.container}>
          <Reveal>
            <h2 className={shared.headline}>{t.materialsHeadline}</h2>
            <p className={shared.body}>{t.materialsBody}</p>
          </Reveal>
          {/* Material Cards: a mesma lista validada (lib/materials.ts) como
              coleção visual — ícone primeiro, nome depois. */}
          <Reveal className={styles.atlasBlock} style={{ transitionDelay: "90ms" }}>
            <MaterialCards tone="ambiental" locale={locale} />
          </Reveal>
        </div>
      </section>

      {/* ---------------- Relação com o Grupo: Almeida Equipamentos ---------------- */}
      <section className={`${shared.chapter} ${shared.toneStone}`}>
        <div className={shared.container}>
          <Reveal>
            <h2 className={shared.headline}>{t.crossHeadline}</h2>
            <p className={shared.body}>{t.crossBody}</p>
            <div className={shared.ctaRow}>
              <Link className={`${shared.btn} ${shared.btnSolidGold}`} href={localizeHref("/almeida-equipamentos", locale)}>
                {t.crossCta}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <EditorialCTA
        headline={t.finalHeadline}
        body={t.finalBody}
        cta={{ label: t.finalCta, href: localizeHref(CONTACT_ANCHORS.saoJose, locale) }}
        tone="forest"
      />
    </div>
  );
}
