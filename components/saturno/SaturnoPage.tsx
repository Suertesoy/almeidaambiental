import Link from "next/link";
import shared from "../shared/company-page.module.css";
import styles from "./saturno.module.css";
import CompanyHero from "../shared/CompanyHero";
import MaterialCards from "../shared/MaterialCards";
import EditorialCTA from "../shared/EditorialCTA";
import BrandBoundaryMark, { boundarySurface } from "../shared/BrandBoundaryMark";
import MaterialSurface from "../shared/MaterialSurface";
import { FRENTES, FRENTES_EN, HERO_META, HERO_META_EN, type Frente } from "../../lib/saturno-data";
import { CONTACT_ANCHORS } from "../../lib/contact-data";
import { localizeHref } from "../../lib/i18n/routes";
import type { Locale } from "../../lib/i18n/locale";

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
    positioningBody1:
      "A presença da Saturno no Vale do Itajaí fortalece a capacidade regional do Grupo Almeida sem apagar a identidade construída pela empresa em Blumenau. A atuação combina coleta, classificação, processamento, cartonagem e serviços técnicos ambientais.",
    positioningBody2Strong: "Desde 2022, a Saturno integra o Grupo Almeida",
    positioningBody2Rest: ", ampliando a presença do grupo no Vale do Itajaí.",
    servicesEyebrow: "Serviços",
    servicesHeadline: "Gestão de resíduos com linguagem própria da região.",
    materialsHeadline: "Materiais que fazem parte da operação.",
    groupBadge: "Saturno Ambiental · Grupo Almeida",
    groupHeadline: "Uma marca regional conectada a uma estrutura maior.",
    groupBody:
      "A integração da Saturno ao Grupo Almeida amplia a capacidade de compartilhar experiência, tecnologia e estrutura entre diferentes regiões de Santa Catarina, preservando a proximidade e o reconhecimento construídos pela marca no Vale do Itajaí.",
    groupCta: "Conheça o Grupo Almeida",
    finalHeadline: "Gestão ambiental começa entendendo a realidade da operação.",
    finalBody: "Conte o que sua empresa gera, onde está e qual desafio precisa resolver.",
    finalCta: "Falar com a Saturno Ambiental",
  },
  en: {
    heroEyebrow: "Saturno Ambiental · Grupo Almeida",
    heroTitle: "Regional presence, shared experience.",
    heroLede:
      "In Blumenau and the Vale do Itajaí region, Saturno Ambiental brings together waste management services, operational structure and environmental solutions connected to Grupo Almeida's experience.",
    heroPrimaryCta: "See our solutions",
    heroSecondaryCta: "Talk to Saturno Ambiental",
    positioningHeadline: "Environmental management close to the people who need it.",
    positioningBody1:
      "Saturno's presence in the Vale do Itajaí region strengthens Grupo Almeida's regional capacity without erasing the identity the company built in Blumenau. Its work combines collection, classification, processing, cartonage and technical environmental services.",
    positioningBody2Strong: "Saturno has been part of Grupo Almeida since 2022",
    positioningBody2Rest: ", expanding the group's presence in the Vale do Itajaí region.",
    servicesEyebrow: "Services",
    servicesHeadline: "Waste management with the region's own language.",
    materialsHeadline: "Materials that are part of the operation.",
    groupBadge: "Saturno Ambiental · Grupo Almeida",
    groupHeadline: "A regional brand connected to a larger structure.",
    groupBody:
      "Saturno's integration into Grupo Almeida expands the group's capacity to share experience, technology and structure across different regions of Santa Catarina, while preserving the closeness and recognition the brand built in the Vale do Itajaí region.",
    groupCta: "See Grupo Almeida",
    finalHeadline: "Environmental management starts with understanding the operation's reality.",
    finalBody: "Tell us what your company generates, where it's located and what challenge needs solving.",
    finalCta: "Talk to Saturno Ambiental",
  },
} as const;

/**
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
  const heroMeta = locale === "en" ? HERO_META_EN : HERO_META;
  const { compact: compactFrentes, cartonagem, gestaoAmbiental } = pickFrentes(locale === "en" ? FRENTES_EN : FRENTES);

  return (
    <div className={styles.page} data-page="saturno-ambiental">
      <CompanyHero
        locale={locale}
        eyebrow={t.heroEyebrow}
        title={t.heroTitle}
        lede={t.heroLede}
        surface="saturno"
        material="saturno-hero"
        meta={heroMeta}
        boundary={{ id: "saturno-territorio", surface: "onDark" }}
        primaryCta={{ label: t.heroPrimaryCta, href: "#frentes" }}
        secondaryCta={{ label: t.heroSecondaryCta, href: localizeHref(CONTACT_ANCHORS.blumenau, locale) }}
      />

      {/* `boundarySurface` em cada `section` abaixo (mesmo quando não hospeda
          nenhuma BrandBoundaryMark) é o contrato de empilhamento que
          MaterialSurface exige — sem `position: relative` + `z-index: 0` na
          section, o texto estático pinta ATRÁS da textura posicionada, não
          na frente dela. */}
      <div className={`${shared.toneSaturno} ${styles.saturnoTerritory}`}>
        <MaterialSurface surface="saturno-hero" />

        {/* ---------------- Posicionamento ---------------- */}
        {/* Metade de entrada da fronteira aberta no Hero: o oliva profundo da
            Saturno termina em corte reto contra o território seguinte (fora
            deste wrapper) e o símbolo atravessa a linha. No desktop,
            "headline lateral" evita que a seção vire uma coluna estreita
            perdida em 1440px (Seção 43). */}
        <section className={`${shared.section} ${boundarySurface}`}>
          <BrandBoundaryMark boundary="saturno-territorio" half="entering" surface="onDark" />
          <div className={shared.container}>
            <div className={styles.positioningGrid}>
              <h2 className={shared.headline}>{t.positioningHeadline}</h2>
              <div className={styles.positioningCopy}>
                <p className={shared.body}>{t.positioningBody1}</p>
                <p className={shared.body}>
                  <strong>{t.positioningBody2Strong}</strong>
                  {t.positioningBody2Rest}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Frentes compartilhadas, tratamento compacto ----------------
            Coleta, Triagem, Trituração/Descaracterização e Destinação — a
            sequência do processo operacional não deve terminar em
            Trituração/Descaracterização (correção 2026-08-20, pedido explícito
            do responsável do projeto). Cartonagem e Gestão Ambiental continuam
            como capítulos próprios abaixo, fora desta grade compacta. */}
        <section id="frentes" className={`${shared.sectionCompact} ${boundarySurface}`}>
          <div className={shared.container}>
            <p className={`${shared.eyebrow} ${shared.eyebrowAccent}`}>{t.servicesEyebrow}</p>
            <h2 className={shared.headline}>{t.servicesHeadline}</h2>
            <div className={styles.frentesCompactGrid}>
              {compactFrentes.map((frente, index) => (
                <div key={frente.id} className={styles.frentesCompactItem}>
                  <span className={styles.frentesCompactIndex}>{String(index + 1).padStart(2, "0")} · {frente.eyebrow}</span>
                  <h3 className={styles.frentesCompactHeadline}>{frente.headline}</h3>
                  <p className={styles.frentesCompactCopy}>{frente.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Cartonagem (exclusiva, capítulo próprio) ---------------- */}
        <section className={`${shared.sectionEditorial} ${boundarySurface}`}>
          <div className={shared.container}>
            <div className={`${shared.duo} ${shared.duoMediaLeft}`}>
              <div className={`${shared.duoMedia} ${shared.duoMediaLandscape}`}>
                <img src={cartonagem.image!.src} alt={cartonagem.image!.alt} loading="lazy" decoding="async" />
              </div>
              <div className={shared.duoContent}>
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
                  <Link className={`${shared.btn} ${shared.btnOutlineOnDark}`} href={localizeHref(cartonagem.cta!.href, locale)}>
                    {cartonagem.cta!.label}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Gestão Ambiental (exclusiva, frente consultiva) ----------------
            Era um duo com a fotografia de um "profissional analisando planta"
            que nunca existiu. Serviço técnico não se prova com a foto de
            alguém segurando papel: o que este bloco tem de concreto são os
            oito itens de escopo, e é a eles que a seção dá o espaço agora —
            headline lateral no desktop (mesma gramática do posicionamento) e
            a lista técnica ocupando a coluna larga em vez de dividir espaço
            com uma imagem ilustrativa. */}
        <section className={`${shared.sectionEditorial} ${boundarySurface}`}>
          <div className={shared.container}>
            <div className={styles.positioningGrid}>
              <div>
                <p className={`${shared.eyebrow} ${shared.eyebrowAccent}`}>{gestaoAmbiental.eyebrow}</p>
                <h2 className={shared.headline}>{gestaoAmbiental.headline}</h2>
              </div>
              <div className={styles.positioningCopy}>
                <p className={shared.body}>{gestaoAmbiental.copy}</p>
                {/* Itens técnicos (Seção 37: PGRS, PGRSS, PAE, treinamentos...)
                    como lista real e estruturada — divisor + um item por
                    linha, não parágrafo contínuo nem pílulas soltas. */}
                {gestaoAmbiental.tags && (
                  <ul className={`${shared.technicalList} ${styles.gestaoTagsList} ${styles.gestaoTagsColumns}`}>
                    {gestaoAmbiental.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                )}
                <div className={shared.ctaRow}>
                  <Link className={`${shared.btn} ${shared.btnOutlineOnDark}`} href={localizeHref(gestaoAmbiental.cta!.href, locale)}>
                    {gestaoAmbiental.cta!.label}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ---------------- Materiais ----------------
          Rodada de refino de fluxo/materiais: a fotografia/materialidade
          gigante (MaterialSurface "saturno-fluxo") que ocupava o fundo
          deste bloco competia com a leitura da lista e funcionava só como
          pano de fundo exclusivo da grade — não é o território Saturno
          (esse é .saturnoTerritory acima, que permanece intocado), então
          removê-la daqui não apaga a materialidade da marca. A seção fica
          headline + respiro + Material Cards, sobre a superfície sólida
          .toneCarvao, com tons quentes/kraft compatíveis com o território
          (ver tone="saturno" em MaterialCards.module.css). */}
      <section className={`${shared.section} ${shared.toneCarvao} ${boundarySurface}`}>
        <div className={shared.container}>
          <h2 className={shared.headline}>{t.materialsHeadline}</h2>
          <div className={styles.materialsBlock}>
            <MaterialCards tone="saturno" locale={locale} />
          </div>
        </div>
      </section>

      {/* ---------------- Saturno + Grupo Almeida ----------------
          Segunda e ÚLTIMA imagem conceitual da página (Seção 17 da rodada).
          Este capítulo de fechamento era superfície de carvão inteiramente
          chapada com uma headline e um parágrafo por cima — o momento certo
          para a materialidade da marca entrar, e longe o bastante da
          fotografia real de cartonagem para não competir com ela. */}
      <section className={`${shared.section} ${shared.toneCarvao} ${boundarySurface}`}>
        <MaterialSurface surface="saturno-fluxo" />
        <div className={shared.container}>
          <span className={styles.groupBadge}>{t.groupBadge}</span>
          <h2 className={shared.headline}>{t.groupHeadline}</h2>
          <p className={shared.body}>{t.groupBody}</p>
          <div className={shared.ctaRow}>
            <Link className={`${shared.btn} ${shared.btnOutlineOnDark}`} href={localizeHref("/historia", locale)}>
              {t.groupCta}
            </Link>
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
