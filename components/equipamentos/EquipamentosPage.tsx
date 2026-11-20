import Link from "next/link";
import shared from "../shared/company-page.module.css";
import styles from "./equipamentos.module.css";
import EditorialCTA from "../shared/EditorialCTA";
import Reveal from "../shared/Reveal";
import BrandBoundaryMark, { boundarySurface } from "../shared/BrandBoundaryMark";
import LogisticsEfficiency from "./LogisticsEfficiency";
import ProductExplorer from "./ProductExplorer";
import MaterialSelector from "./MaterialSelector";
import EquipmentChoreographyStage from "./EquipmentChoreographyStage";
import { PRODUCTS, PRODUCTS_EN, PARTNERS } from "../../lib/equipamentos-data";
import { BRANDS } from "../../lib/brands";
import { CONTACT_ANCHORS } from "../../lib/contact-data";
import { localizeHref } from "../../lib/i18n/routes";
import type { Locale } from "../../lib/i18n/locale";

/*
 * Distribuição das mensagens (rodada 5): cada bloco diz uma coisa que o
 * anterior não disse, sem repetir explicações que o seletor e o catálogo já
 * dão.
 *   Hero         → marca + o que a tecnologia entrega
 *   Catálogo     → seletor por material + os seis equipamentos
 *   Como escolher → por que compactar importa (transporte)
 *   Parcerias    → de onde vem a tecnologia
 *   Grupo        → prova de uso (a mesma tecnologia trabalha na Ambiental)
 *   Fechamento   → ação: material, volume e espaço
 */
const COPY = {
  pt: {
    heroEyebrow: "Almeida Equipamentos",
    heroTitle: "Menos volume. Mais eficiência.",
    heroLede: "Tecnologia aplicada à movimentação e compactação de resíduos.",
    heroPrimaryCta: "Conheça as tecnologias",
    heroSecondaryCta: "Encontre a solução para sua operação",
    catalogTitle: "Catálogo técnico",
    densityEyebrow: "Como escolher",
    partnersEyebrow: "Parcerias internacionais",
    partnersHeadline: "Tecnologia internacional aplicada à experiência brasileira",
    partnersBody:
      "A presença histórica do Grupo Almeida em contato com tecnologias europeias — incluindo a feira IFAT, em Munique, referência mundial em soluções ambientais — é parte relevante do posicionamento da Almeida Equipamentos.",
    partnersListLabel: "Fabricantes parceiros",
    crossHeadline: "A mesma tecnologia do catálogo já trabalha dentro do grupo",
    crossBody:
      "Na Almeida Ambiental, coleta, triagem e trituração em escala real mostram como cada equipamento se comporta no dia a dia. Esse uso orienta o que a Almeida Equipamentos recomenda.",
    crossCta: "Conheça a Almeida Ambiental",
    finalHeadline: "Diga o material, o volume e o espaço. Ajudamos a encontrar o equipamento certo.",
    finalBody:
      "A equipe da Almeida Equipamentos avalia o seu cenário e orienta a solução, seja por compra, locação ou consignação.",
    finalCta: "Falar com a Almeida Equipamentos",
  },
  en: {
    heroEyebrow: "Almeida Equipamentos",
    heroTitle: "Less volume. More efficiency.",
    heroLede: "Technology applied to waste handling and compaction.",
    heroPrimaryCta: "See the technologies",
    heroSecondaryCta: "Find the solution for your operation",
    catalogTitle: "Technical catalog",
    densityEyebrow: "How to choose",
    partnersEyebrow: "International partnerships",
    partnersHeadline: "International technology, shaped by Brazilian operational experience",
    partnersBody:
      "Grupo Almeida has a long history of engagement with European technologies, including through IFAT in Munich, an internationally recognized trade fair for environmental solutions. This international exposure is an important part of Almeida Equipamentos' positioning.",
    partnersListLabel: "Partner manufacturers",
    crossHeadline: "The same technology in this catalog already works inside the Group",
    crossBody:
      "At Almeida Ambiental, collection, sorting and shredding at full scale show how each piece of equipment performs day to day. That experience shapes what Almeida Equipamentos recommends.",
    crossCta: "See Almeida Ambiental",
    finalHeadline: "Tell us your material, volume and space. We'll help find the right equipment.",
    finalBody:
      "The Almeida Equipamentos team looks at your situation and recommends a solution, whether by purchase, rental or consignment.",
    finalCta: "Talk to Almeida Equipamentos",
  },
} as const;

/**
 * /almeida-equipamentos — a mais técnica das três páginas, sem virar loja
 * virtual: sem preço, sem carrinho, sem quantidade, sem favorito, sem
 * badge promocional.
 *
 * Hero (mesma composição do Hero da Home: logotipo à esquerda, coreografia
 * 3D protagonista, texto e CTAs empilhados na base) → catálogo técnico
 * (seletor de materiais + seis equipamentos) → eficiência no transporte →
 * parcerias internacionais → prova de uso no Grupo → fechamento.
 *
 * Capítulo é a unidade perceptiva, não o <section> (ver editorial.module.css).
 */
export default function EquipamentosPage({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const products = locale === "en" ? PRODUCTS_EN : PRODUCTS;
  const logo = BRANDS["almeida-equipamentos"].logos.preta;

  return (
    <div className={styles.page} data-page="almeida-equipamentos">
      <section className={`${styles.hero} ${shared.toneStone}`} aria-label={t.heroEyebrow}>
        <div className={`${shared.container} ${styles.heroInner}`}>
          <div className={styles.heroGrid}>
            {/* O logotipo oficial substitui visualmente o título; o H1 textual
                segue no HTML, oculto só visualmente. */}
            <div className={styles.heroBrand}>
              <img src={logo} alt="" aria-hidden="true" className={styles.heroLogo} />
              <p className={styles.srOnly}>{t.heroEyebrow}</p>
              <h1 className={styles.srOnly}>{t.heroTitle}</h1>
            </div>

            <div className={styles.heroStage}>
              <EquipmentChoreographyStage locale={locale} variant="hero" paddingMultiplier={1.04} />
            </div>

            <div className={styles.heroCopy}>
              <p className={styles.heroLede}>{t.heroLede}</p>
              <div className={styles.heroCtas}>
                <a className={`${shared.btn} ${shared.btnSolidGold}`} href="#produtos">
                  {t.heroPrimaryCta}
                </a>
                <Link
                  className={`${shared.btn} ${shared.btnOutlineOnLight}`}
                  href={localizeHref(CONTACT_ANCHORS.saoJose, locale)}
                >
                  {t.heroSecondaryCta}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Catálogo técnico ============ */}
      <section
        id="produtos"
        className={`${shared.chapterClose} ${shared.toneStone} ${boundarySurface}`}
        aria-labelledby="produtos-heading"
      >
        <BrandBoundaryMark boundary="equipamentos-abertura" half="entering" surface="onLight" />
        <div className={shared.container}>
          <Reveal className={styles.centerHead}>
            <h2 id="produtos-heading" className={`${shared.headline} ${styles.catalogTitle}`}>
              {t.catalogTitle}
            </h2>
          </Reveal>

          <Reveal className={styles.selectorBlock}>
            <MaterialSelector locale={locale} />
          </Reveal>

          <ProductExplorer locale={locale} products={products} />
        </div>
      </section>

      {/* ============ Como escolher: eficiência no transporte ============ */}
      <LogisticsEfficiency locale={locale} eyebrow={t.densityEyebrow} />

      {/* ============ Parcerias internacionais ============ */}
      <section className={`${shared.chapterOpen} ${shared.toneStone}`}>
        <div className={shared.container}>
          <Reveal className={styles.centerHead}>
            <p className={`${shared.eyebrow} ${shared.eyebrowAccent}`}>{t.partnersEyebrow}</p>
            <h2 className={shared.headline}>{t.partnersHeadline}</h2>
          </Reveal>
          <Reveal className={styles.readBlock} style={{ transitionDelay: "70ms" }}>
            <p className={shared.body}>{t.partnersBody}</p>
          </Reveal>
          <Reveal style={{ transitionDelay: "120ms" }}>
            <ul className={styles.partnersList} aria-label={t.partnersListLabel}>
              {PARTNERS.map((partner) => (
                <li key={partner} className={styles.partnerName}>
                  {partner}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ============ Tecnologia dentro do Grupo ============ */}
      <section className={`${shared.chapterClose} ${shared.toneStone}`}>
        <div className={shared.container}>
          <Reveal>
            <div className={styles.centerHead}>
              <h2 className={shared.headline}>{t.crossHeadline}</h2>
            </div>
            <div className={styles.readBlock}>
              <p className={shared.body}>{t.crossBody}</p>
              <div className={shared.ctaRow}>
                <Link className={`${shared.btn} ${shared.btnSolidGold}`} href={localizeHref("/almeida-ambiental", locale)}>
                  {t.crossCta}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <EditorialCTA
        headline={t.finalHeadline}
        body={t.finalBody}
        cta={{ label: t.finalCta, href: localizeHref(CONTACT_ANCHORS.saoJose, locale) }}
        tone="carvao"
      />
    </div>
  );
}
