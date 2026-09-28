import Link from "next/link";
import shared from "../shared/company-page.module.css";
import styles from "./equipamentos.module.css";
import CompanyHero from "../shared/CompanyHero";
import EditorialCTA from "../shared/EditorialCTA";
import IllustrativeBadge from "../shared/IllustrativeBadge";
import EditorialPicture from "../shared/EditorialPicture";
import BrandBoundaryMark, { boundarySurface } from "../shared/BrandBoundaryMark";
import LogisticsEfficiency from "./LogisticsEfficiency";
import ProductExplorer from "./ProductExplorer";
import { MATERIAL_ICONS } from "../icons";
import {
  HERO_IMAGE,
  HERO_IMAGE_EN,
  DETALHE_MECANICO_IMAGE,
  DETALHE_MECANICO_IMAGE_EN,
  FEIRA_IMAGE,
  FEIRA_IMAGE_EN,
  PRODUCTS,
  PRODUCTS_EN,
  MATERIAL_ASSOCIATIONS,
  MATERIAL_ASSOCIATIONS_EN,
  PARTNERS,
} from "../../lib/equipamentos-data";
import { CONTACT_ANCHORS } from "../../lib/contact-data";
import { localizeHref } from "../../lib/i18n/routes";
import type { Locale } from "../../lib/i18n/locale";

const MODALITIES = { pt: ["Compra", "Locação", "Consignação"], en: ["Purchase", "Rental", "Consignment"] } as const;

const COPY = {
  pt: {
    heroEyebrow: "Almeida Equipamentos",
    heroTitle: "Tecnologia para movimentar menos volume e mais eficiência.",
    heroLede:
      "Equipamentos para compactação, prensagem, desidratação e armazenagem desenvolvidos a partir de necessidades reais da gestão de resíduos.",
    heroSubcopy: "Tecnologias internacionais, produção própria e experiência operacional dentro do Grupo Almeida.",
    heroPrimaryCta: "Conheça as tecnologias",
    heroSecondaryCta: "Encontre a solução para sua operação",
    positioningHeadline: "Equipamentos escolhidos por quem também vive a operação.",
    positioningBody:
      "A Almeida Equipamentos nasceu da proximidade entre tecnologia e gestão de resíduos. O conhecimento construído na operação ambiental permite avaliar não apenas a máquina, mas o que ela muda em espaço, transporte, produtividade e rotina.",
    catalogEyebrow: "Catálogo técnico",
    catalogHeadline: "Seis tecnologias. Comece pela que se parece com a sua operação.",
    catalogBody:
      "Escolha um equipamento para ver galeria, aplicação, benefícios e as especificações confirmadas pelo fabricante.",
    matrixHeadline: "O equipamento começa pelo material, não pela máquina.",
    matrixBody:
      "Volume, densidade, umidade, espaço disponível e frequência de coleta mudam completamente a solução. Por isso, a escolha começa entendendo a operação.",
    matrixCta: "Descrever minha operação",
    partnersEyebrow: "Parcerias internacionais",
    partnersHeadline: "Tecnologia internacional aplicada à experiência brasileira.",
    partnersBody:
      "A presença histórica do Grupo Almeida em contato com tecnologias europeias — incluindo a feira IFAT, em Munique, referência mundial em soluções ambientais — é parte relevante do posicionamento da Almeida Equipamentos.",
    crossEyebrow: "Tecnologia em operação real",
    crossHeadline: "Antes de chegar ao catálogo, cada tecnologia já opera dentro do próprio grupo.",
    crossBody:
      "Os mesmos equipamentos apresentados aqui sustentam a operação diária da Almeida Ambiental — coleta, triagem e trituração em escala real, não em teoria. É essa proximidade entre quem vende a tecnologia e quem também vive a operação que orienta cada recomendação.",
    crossCta: "Conheça a Almeida Ambiental",
    finalHeadline: "A melhor máquina é a que faz sentido para a sua operação.",
    finalBody:
      "Conte qual material você processa, o volume aproximado e o espaço disponível. A equipe da Almeida Equipamentos pode orientar a solução mais adequada.",
    finalCta: "Falar com a Almeida Equipamentos",
  },
  en: {
    heroEyebrow: "Almeida Equipamentos",
    heroTitle: "Technology that reduces volume and improves operational efficiency.",
    heroLede:
      "Equipment for compaction, baling, dewatering and storage, designed around the practical realities of waste management.",
    heroSubcopy: "International technology, in-house production and operational experience within Grupo Almeida.",
    heroPrimaryCta: "See the technologies",
    heroSecondaryCta: "Find the solution for your operation",
    positioningHeadline: "Equipment selected by people who work with these operations every day.",
    positioningBody:
      "Almeida Equipamentos grew out of the close relationship between technology and waste management. That hands-on experience means every recommendation looks beyond the machine itself, to how it affects space requirements, transport, productivity and day-to-day operations.",
    catalogEyebrow: "Technical catalog",
    catalogHeadline: "Six technologies. Start with the one that best matches your operation.",
    catalogBody: "Choose a piece of equipment to see its gallery, application, benefits and manufacturer-confirmed specs.",
    matrixHeadline: "The equipment choice starts with the material, not the machine.",
    matrixBody:
      "Volume, density, moisture, available space and collection frequency all shape the right solution — which is why the process starts with understanding how you work.",
    matrixCta: "Describe my operation",
    partnersEyebrow: "International partnerships",
    partnersHeadline: "International technology, shaped by Brazilian operational experience.",
    partnersBody:
      "Grupo Almeida has a long history of engagement with European technologies, including through IFAT in Munich, an internationally recognized trade fair for environmental solutions. This international exposure is an important part of Almeida Equipamentos' positioning.",
    crossEyebrow: "Field-proven technology",
    crossHeadline: "Every technology in this catalog is already at work inside the group.",
    crossBody:
      "The same equipment featured here is used in Almeida Ambiental's day-to-day operations — collection, sorting and shredding at full scale, not on paper. Every recommendation comes from people who use this technology themselves, not just sell it.",
    crossCta: "See Almeida Ambiental",
    finalHeadline: "The best machine is the one that fits your operation.",
    finalBody:
      "Tell us what material you process, your approximate volume and the space available, and the Almeida Equipamentos team can help you find the right fit.",
    finalCta: "Talk to Almeida Equipamentos",
  },
} as const;

/**
 * /almeida-equipamentos — a mais técnica das três páginas, sem virar loja
 * virtual: sem preço, sem carrinho, sem quantidade, sem favorito, sem
 * badge promocional.
 *
 * Hero técnico → posicionamento (Compra/Locação/Consignação) → catálogo
 * técnico explorável (ProductExplorer, portfólio EXATO de seis itens) →
 * "eficiência que aparece no transporte" → "qual tecnologia para qual
 * material" → parcerias internacionais → cross-link → CTA final.
 *
 * Rodada de refino editorial: os seis capítulos de produto em sequência
 * vertical e a barra sticky de navegação entre eles deram lugar ao
 * explorador de catálogo — descoberta primeiro, profundidade sob demanda
 * (ver ProductExplorer.tsx / ProductDetail.tsx). A fronteira
 * "equipamentos-catalogo" marca a entrada nesse território com o símbolo
 * atravessando o corte entre as duas superfícies.
 */
export default function EquipamentosPage({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const heroImage = locale === "en" ? HERO_IMAGE_EN : HERO_IMAGE;
  const detalheMecanicoImage = locale === "en" ? DETALHE_MECANICO_IMAGE_EN : DETALHE_MECANICO_IMAGE;
  const feiraImage = locale === "en" ? FEIRA_IMAGE_EN : FEIRA_IMAGE;
  const products = locale === "en" ? PRODUCTS_EN : PRODUCTS;
  const materialAssociations = locale === "en" ? MATERIAL_ASSOCIATIONS_EN : MATERIAL_ASSOCIATIONS;
  const modalities = MODALITIES[locale];

  return (
    <div className={styles.page} data-page="almeida-equipamentos">
      <CompanyHero
        locale={locale}
        eyebrow={t.heroEyebrow}
        title={t.heroTitle}
        lede={t.heroLede}
        subcopy={t.heroSubcopy}
        image={heroImage}
        primaryCta={{ label: t.heroPrimaryCta, href: "#produtos" }}
        secondaryCta={{ label: t.heroSecondaryCta, href: localizeHref(CONTACT_ANCHORS.saoJose, locale) }}
      />

      {/* ---------------- Posicionamento ---------------- */}
      <section className={`${shared.section} ${shared.toneStone} ${boundarySurface}`}>
        <BrandBoundaryMark boundary="equipamentos-catalogo" half="leaving" surface="onLight" />
        <div className={shared.container}>
          <div className={`${shared.duo} ${shared.duoMediaRight} ${shared.duoMediaNarrow}`}>
            <div className={shared.duoContent}>
              <h2 className={shared.headline}>{t.positioningHeadline}</h2>
              <p className={shared.body}>{t.positioningBody}</p>
              <ul className={styles.modalityTags}>
                {modalities.map((modality) => (
                  <li key={modality}>{modality}</li>
                ))}
              </ul>
            </div>
            {/* Materialidade mecânica (engenharia/precisão): slot já
                preparado para receber uma composição própria de desktop e
                outra de mobile via `mobileSrc` no dado — ver lib/media.ts.
                Hoje serve a mesma imagem nos dois, enquadrada por
                objectPosition. */}
            <div className={`${shared.duoMedia} ${shared.duoMediaSquare}`}>
              <EditorialPicture image={detalheMecanicoImage} />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Catálogo técnico explorável ---------------- */}
      <section
        id="produtos"
        className={`${shared.section} ${shared.toneStoneAlt} ${boundarySurface}`}
        aria-labelledby="produtos-heading"
      >
        <BrandBoundaryMark boundary="equipamentos-catalogo" half="entering" surface="onLight" />
        <div className={shared.container}>
          <p className={`${shared.eyebrow} ${shared.eyebrowAccent}`}>{t.catalogEyebrow}</p>
          <h2 id="produtos-heading" className={shared.headline}>
            {t.catalogHeadline}
          </h2>
          <p className={shared.body}>{t.catalogBody}</p>

          <ProductExplorer locale={locale} products={products} />
        </div>
      </section>

      {/* ---------------- Eficiência que aparece no transporte ---------------- */}
      <LogisticsEfficiency locale={locale} />

      {/* ---------------- Qual tecnologia para qual material ----------------
          Consolidação de territórios (Seção 11): usava toneForest, a cor
          da Almeida Ambiental — a Equipamentos pediu um único ambiente
          claro e contínuo, sem tons emprestados de outra empresa. */}
      <section className={`${shared.section} ${shared.toneStoneAlt}`}>
        <div className={shared.container}>
          <h2 className={shared.headline}>{t.matrixHeadline}</h2>
          <p className={shared.body}>{t.matrixBody}</p>
          <div className={styles.matrixGrid}>
            {materialAssociations.map((assoc) => {
              const MaterialIcon = MATERIAL_ICONS[assoc.material];
              return (
                <div key={assoc.material} className={styles.matrixItem}>
                  <div className={styles.matrixHead}>
                    {MaterialIcon && <MaterialIcon className={styles.matrixIcon} />}
                    <p className={styles.matrixMaterial}>{assoc.material}</p>
                  </div>
                  <p className={styles.matrixProducts}>
                    {assoc.products
                      .map((id) => products.find((product) => product.id === id)?.name)
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
              );
            })}
          </div>
          <div className={`${shared.ctaRow} ${styles.matrixCtaRow}`}>
            <Link className={`${shared.btn} ${shared.btnOutlineOnDark}`} href={localizeHref(CONTACT_ANCHORS.saoJose, locale)}>
              {t.matrixCta}
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- Parcerias internacionais ---------------- */}
      <section className={`${shared.section} ${shared.toneStone}`}>
        <div className={shared.container}>
          <p className={`${shared.eyebrow} ${shared.eyebrowAccent}`}>{t.partnersEyebrow}</p>
          <h2 className={shared.headline}>{t.partnersHeadline}</h2>
          <div className={styles.partnersMedia}>
            <EditorialPicture image={feiraImage} />
            <IllustrativeBadge locale={locale} />
          </div>
          <p className={shared.body}>{t.partnersBody}</p>
          <div className={styles.partnersList}>
            {PARTNERS.map((partner) => (
              <span key={partner} className={styles.partnerName}>
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Cross-link: Almeida Ambiental ---------------- */}
      <section className={`${shared.section} ${shared.toneStoneAlt}`}>
        <div className={shared.container}>
          <p className={`${shared.eyebrow} ${shared.eyebrowAccent}`}>{t.crossEyebrow}</p>
          <h2 className={shared.headline}>{t.crossHeadline}</h2>
          <p className={shared.body}>{t.crossBody}</p>
          <div className={shared.ctaRow}>
            <Link className={`${shared.btn} ${shared.btnOutlineOnLight}`} href={localizeHref("/almeida-ambiental", locale)}>
              {t.crossCta}
            </Link>
          </div>
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
