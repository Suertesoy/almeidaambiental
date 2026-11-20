import Link from "next/link";
import shared from "../shared/company-page.module.css";
import styles from "./saturno.module.css";
import CompanyHero from "../shared/CompanyHero";
import MaterialCards from "../shared/MaterialCards";
import EditorialCTA from "../shared/EditorialCTA";
import BrandBoundaryMark, { boundarySurface } from "../shared/BrandBoundaryMark";
import MaterialSurface from "../shared/MaterialSurface";
import IllustrativeBadge from "../shared/IllustrativeBadge";
import Reveal from "../shared/Reveal";
import SaturnoFlow from "./SaturnoFlow";
import { BENEFIT_ICONS, PROCESS_STEP_ICONS } from "../icons";
import { FRENTES, FRENTES_EN, type Frente } from "../../lib/saturno-data";
import { CONTACT_ANCHORS } from "../../lib/contact-data";
import { localizeHref } from "../../lib/i18n/routes";
import type { Locale } from "../../lib/i18n/locale";

/** Ícones (já existentes no site) para os itens de escopo da Gestão Ambiental
 *  que não são siglas; siglas curtas (PGRS, PGRSS, PAE) viram selos. A ordem
 *  segue a dos itens em lib/saturno-data.ts. */
const GESTAO_ICONS = [
  BENEFIT_ICONS["Acabamento industrial resistente"], // condicionantes de licenças
  BENEFIT_ICONS["Operação prática"], // planos e programas
  PROCESS_STEP_ICONS[0], // palestras e treinamentos
  BENEFIT_ICONS["Preparação para reciclagem"], // educação ambiental
  PROCESS_STEP_ICONS[1], // orientações MTR
];

function pickFrentes(frentes: Frente[]) {
  return {
    compact: frentes.filter((f) => f.id === "coleta" || f.id === "triagem" || f.id === "trituracao" || f.id === "destinacao"),
    cartonagem: frentes.find((f) => f.id === "cartonagem")!,
    gestaoAmbiental: frentes.find((f) => f.id === "gestao-ambiental")!,
  };
}

const COPY = {
  pt: {
    heroEyebrow: "Saturno Ambiental · Grupo Almeida",
    heroTitle: "Presença regional, experiência compartilhada.",
    heroLede:
      "Em Blumenau e no Vale do Itajaí, a Saturno Ambiental reúne serviços de gestão de resíduos, estrutura operacional e soluções ambientais conectadas à experiência do Grupo Almeida.",
    heroPrimaryCta: "Conheça nossas soluções",
    heroSecondaryCta: "Falar com a Saturno Ambiental",
    positioningHeadline: "Gestão ambiental próxima de quem precisa.",
    positioningBody:
      "Coleta, classificação, processamento, cartonagem e serviços técnicos ambientais na mesma empresa, com a proximidade de quem conhece a rotina das operações da região.",
    servicesEyebrow: "Como atua",
    servicesHeadline: "Da coleta à destinação, uma operação em sequência.",
    materialsHeadline: "Materiais que fazem parte da operação.",
    groupEyebrow: "Estrutura compartilhada",
    groupHeadline: "No Grupo Almeida desde 2022, com identidade própria.",
    groupBody:
      "Ao integrar o Grupo Almeida, a Saturno passou a compartilhar experiência, tecnologia e estrutura com as demais empresas em Santa Catarina, sem perder a proximidade e o reconhecimento construídos no Vale do Itajaí.",
    groupCta: "Conheça o Grupo Almeida",
    finalHeadline: "Gestão ambiental começa entendendo a realidade da operação.",
    finalBody: "Conte o que sua empresa gera, onde está e qual desafio precisa resolver.",
    finalCta: "Falar com a Saturno Ambiental",
  },
  en: {
    heroEyebrow: "Saturno Ambiental · Grupo Almeida",
    heroTitle: "Regional presence, shared experience.",
    heroLede:
      "In Blumenau and the Vale do Itajaí region, Saturno Ambiental brings together waste management services, operational capacity and environmental solutions backed by Grupo Almeida's experience.",
    heroPrimaryCta: "See our solutions",
    heroSecondaryCta: "Talk to Saturno Ambiental",
    positioningHeadline: "Environmental management close to those who need it.",
    positioningBody:
      "Collection, classification, processing, cardboard packaging and technical environmental services under one roof, with the closeness of a team that knows how local operations run.",
    servicesEyebrow: "How it works",
    servicesHeadline: "From collection to disposal, one operation in sequence.",
    materialsHeadline: "Materials handled in the operation.",
    groupEyebrow: "Shared structure",
    groupHeadline: "In Grupo Almeida since 2022, with its own identity.",
    groupBody:
      "By joining Grupo Almeida, Saturno began sharing experience, technology and infrastructure with the group's other companies in Santa Catarina, without losing the closeness and recognition it built in the Vale do Itajaí region.",
    groupCta: "See Grupo Almeida",
    finalHeadline: "Environmental management starts with understanding your operation.",
    finalBody: "Tell us what your company generates, where it's located and what challenge needs solving.",
    finalCta: "Talk to Saturno Ambiental",
  },
} as const;

/**
 * Refino por capítulos (feature/refino-saturno): dois capítulos entre Hero e
 * CTA. (1) Oliva: posicionamento regional → como atua → Cartonagem → Gestão
 * Ambiental (open/middle/middle/close). (2) Carvão: Materiais + Saturno no
 * Grupo, numa seção só. O vínculo com o Grupo é dito uma vez, no fim; o
 * posicionamento fala só da relevância regional. Os comentários abaixo
 * descrevem rodadas anteriores e valem como histórico.
 *
 * /saturno-ambiental — identidade regional própria conectada ao Grupo
 * Almeida (Seção 19 em diante): Hero → posicionamento (integração em 2022)
 * → três frentes compartilhadas em tratamento compacto → Cartonagem e
 * Gestão Ambiental como capítulos próprios (exclusivos da Saturno) →
 * materiais → Saturno + Grupo Almeida → CTA final. Não copia a arquitetura
 * da Almeida Ambiental: onde ela é operacional/logística, a Saturno é
 * regional/consultiva.
 *
 * Rodada de refino editorial — território sem fotografia: não há captação
 * prevista da instalação atual da Saturno, e o prédio de hoje não
 * representa o padrão que o Grupo está construindo. As imagens geradas que
 * afirmavam sede, linha de triagem e equipe saíram (ver o cabeçalho de
 * lib/saturno-data.ts) e não foram trocadas por outras: fotografar a
 * Almeida e chamar de Saturno seria o mesmo erro com outro arquivo.
 *
 * O que ficou no lugar não é ausência — é a direção da página: Hero
 * tipográfico sobre a superfície própria da marca (--color-saturno-deep, a
 * MESMA cor que a Saturno já ocupa na Home, não uma cor por página), uma
 * faixa de metadados validados, o símbolo atravessando a fronteira
 * "saturno-territorio" e, daí para baixo, geometria, espaçamento e
 * conteúdo. A única fotografia da página é a Cartonagem, porque mostra
 * material — caixas de papelão — e não uma instalação.
 *
 * Consolidação de territórios (branch feature/territorios-visuais-
 * continuos): Posicionamento, Frentes, Cartonagem e Gestão Ambiental eram
 * quatro seções alternando pedra clara / pedra clara-alt / pedra clara /
 * verde floresta (a cor da Almeida AMBIENTAL, não da Saturno!) — nenhuma
 * delas a materialidade própria que o Hero já estabelece. As quatro agora
 * vivem dentro de .saturnoTerritory, com a MESMA MaterialSurface
 * ("saturno-hero", tone "saturno" — já calibrado para
 * --color-saturno-deep, o mesmo fundo de --toneSaturno) atravessando
 * todas. Cartonagem mantém sua fotografia real como peça editorial
 * dentro do ambiente, não como seção à parte. Materiais e o fechamento
 * (toneCarvao + saturno-fluxo) continuam como estavam — um fechamento
 * mais escuro dentro da mesma família de tons frios e baixa luminância,
 * não uma volta à pedra clara.
 */
export default function SaturnoPage({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const { compact: compactFrentes, cartonagem, gestaoAmbiental } = pickFrentes(locale === "en" ? FRENTES_EN : FRENTES);

  return (
    <div className={styles.page} data-page="saturno-ambiental">
      <CompanyHero
        locale={locale}
        eyebrow={t.heroEyebrow}
        title={t.heroTitle}
        lede={t.heroLede}
        video={{
          src: "/videos/captacao-2026/papelao-e-trator.mp4",
          poster: "/images/captacao-2026/papelao-e-trator-poster.webp",
          label:
            locale === "en"
              ? "Real waste handling and unloading operation at Grupo Almeida"
              : "Movimentação e descarregamento real de resíduos no Grupo Almeida",
        }}
        imagePosition="50% 48%"
        mobileImagePosition="52% 48%"
        scrimTone="saturno"
        boundary={{ id: "saturno-territorio", surface: "onDark" }}
        primaryCta={{ label: t.heroPrimaryCta, href: "#frentes" }}
        secondaryCta={{ label: t.heroSecondaryCta, href: localizeHref(CONTACT_ANCHORS.blumenau, locale) }}
      />

      {/* `boundarySurface` em cada `section` abaixo (mesmo quando não hospeda
          nenhuma BrandBoundaryMark) é o contrato de empilhamento que
          MaterialSurface exige — sem `position: relative` + `z-index: 0` na
          section, o texto estático pinta ATRÁS da textura posicionada, não
          na frente dela. */}
      {/* Capítulo 1 (oliva): Saturno na região → como atua → Cartonagem →
          Gestão Ambiental. Quatro seções, UM capítulo (open / middle /
          middle / close), com a mesma MaterialSurface atravessando todas.
          Entre elas só o respiro interno; o respiro cheio fica nas pontas. */}
      <div className={`${shared.toneSaturno} ${styles.saturnoTerritory}`}>
        <MaterialSurface surface="saturno-hero" />

        {/* Posicionamento regional: o que torna a Saturno relevante AQUI.
            A tese do vínculo com o Grupo mora só no capítulo final. */}
        <section className={`${shared.chapterOpen} ${boundarySurface}`}>
          <BrandBoundaryMark boundary="saturno-territorio" half="entering" surface="onDark" />
          <div className={shared.container}>
            <div className={styles.splitGrid}>
              <Reveal>
                <h2 className={shared.headline}>{t.positioningHeadline}</h2>
              </Reveal>
              <Reveal style={{ transitionDelay: "70ms" }}>
                <p className={`${shared.body} ${styles.splitCopy}`}>{t.positioningBody}</p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Como atua: Coleta → Triagem → Trituração → Destinação, em régua. */}
        <section id="frentes" className={`${shared.chapterMiddle} ${boundarySurface}`}>
          <div className={shared.container}>
            <Reveal>
              <p className={`${shared.eyebrow} ${shared.eyebrowAccent}`}>{t.servicesEyebrow}</p>
              <h2 className={shared.headline}>{t.servicesHeadline}</h2>
            </Reveal>
            <Reveal style={{ transitionDelay: "80ms" }}>
              <SaturnoFlow frentes={compactFrentes} />
            </Reveal>
          </div>
        </section>

        {/* Cartonagem: a única fotografia da página (material, não sede).
            A imagem é ilustrativa e leva o badge. */}
        <section className={`${shared.chapterMiddle} ${boundarySurface}`}>
          <div className={shared.container}>
            <div className={`${shared.duo} ${shared.duoMediaLeft} ${shared.duoEven}`}>
              <Reveal className={`${shared.duoMedia} ${shared.duoMediaLandscape}`}>
                <img src={cartonagem.image!.src} alt={cartonagem.image!.alt} loading="lazy" decoding="async" />
                <IllustrativeBadge position="bottom-right" locale={locale} />
              </Reveal>
              <Reveal className={shared.duoContent} style={{ transitionDelay: "80ms" }}>
                <p className={`${shared.eyebrow} ${shared.eyebrowAccent}`}>{cartonagem.eyebrow}</p>
                <h2 className={shared.headline}>{cartonagem.headline}</h2>
                <p className={shared.body}>{cartonagem.copy}</p>
                {cartonagem.tags && (
                  <ul className={shared.tagRow}>
                    {cartonagem.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                )}
                <div className={shared.ctaRow}>
                  <Link className={`${shared.btn} ${shared.btnSolidGold}`} href={localizeHref(cartonagem.cta!.href, locale)}>
                    {cartonagem.cta!.label}
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Gestão Ambiental: frente consultiva, fecha o capítulo. */}
        <section className={`${shared.chapterClose} ${boundarySurface}`}>
          <div className={shared.container}>
            <div className={styles.splitGrid}>
              <Reveal>
                <p className={`${shared.eyebrow} ${shared.eyebrowAccent}`}>{gestaoAmbiental.eyebrow}</p>
                <h2 className={shared.headline}>{gestaoAmbiental.headline}</h2>
              </Reveal>
              <Reveal className={styles.splitCopy} style={{ transitionDelay: "80ms" }}>
                <p className={shared.body}>{gestaoAmbiental.copy}</p>
                {gestaoAmbiental.tags && (
                  <div className={styles.gestaoScope}>
                    <ul className={styles.gestaoItems}>
                      {gestaoAmbiental.tags
                        .filter((tag) => tag.length > 5)
                        .map((tag, i) => {
                          const Icon = GESTAO_ICONS[i];
                          return (
                            <li key={tag} className={styles.gestaoItem}>
                              {Icon && <Icon className={styles.gestaoIcon} />}
                              <span>{tag}</span>
                            </li>
                          );
                        })}
                    </ul>
                    <ul className={styles.gestaoSeals}>
                      {gestaoAmbiental.tags
                        .filter((tag) => tag.length <= 5)
                        .map((tag) => (
                          <li key={tag} className={styles.gestaoSeal}>
                            {tag}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
                <div className={shared.ctaRow}>
                  <Link className={`${shared.btn} ${shared.btnSolidGold}`} href={localizeHref(gestaoAmbiental.cta!.href, locale)}>
                    {gestaoAmbiental.cta!.label}
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </div>

      {/* Capítulo 2 (carvão): Materiais + Saturno no Grupo, um território
          contínuo numa seção só. Sem MaterialSurface: a matéria já foi dada
          pelo capítulo oliva. A separação semântica é o <div> interno; a
          visual, só um filete e o respiro interno. */}
      <section className={`${shared.chapter} ${shared.toneCarvao} ${boundarySurface}`}>
        <div className={shared.container}>
          <Reveal>
            <h2 className={shared.headline}>{t.materialsHeadline}</h2>
          </Reveal>
          <Reveal className={styles.materialsBlock} style={{ transitionDelay: "80ms" }}>
            <MaterialCards tone="saturno" locale={locale} />
          </Reveal>

          <div className={styles.groupBlock}>
            <div className={styles.splitGrid}>
              <Reveal>
                <p className={`${shared.eyebrow} ${shared.eyebrowAccent}`}>{t.groupEyebrow}</p>
                <h2 className={shared.headline}>{t.groupHeadline}</h2>
              </Reveal>
              <Reveal className={styles.splitCopy} style={{ transitionDelay: "80ms" }}>
                <p className={shared.body}>{t.groupBody}</p>
                <div className={shared.ctaRow}>
                  <Link className={shared.btnEditorial} href={localizeHref("/historia", locale)}>
                    {t.groupCta}
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <EditorialCTA
        headline={t.finalHeadline}
        body={t.finalBody}
        cta={{ label: t.finalCta, href: localizeHref(CONTACT_ANCHORS.blumenau, locale) }}
        tone="forest"
      />
    </div>
  );
}
