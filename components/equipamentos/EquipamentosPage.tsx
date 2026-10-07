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

/*
 * Distribuição das mensagens (rodada de refino de Equipamentos): cada bloco
 * diz uma coisa que o anterior não disse.
 *   Hero         → o que a tecnologia entrega (volume, eficiência)
 *   Posicionamento → como a empresa avalia (a única vez que "operação" é tese)
 *   Catálogo     → o que existe
 *   Como escolher → por que compactar importa (transporte) e por onde começar (material)
 *   Parcerias    → de onde vem a tecnologia
 *   Grupo        → prova de uso (a mesma tecnologia trabalha na Ambiental)
 *   Fechamento   → ação: material, volume e espaço
 */
const COPY = {
  pt: {
    heroEyebrow: "Almeida Equipamentos",
    heroTitle: "Tecnologia para movimentar menos volume com mais eficiência.",
    heroLede:
      "Equipamentos para compactação, prensagem, desidratação e armazenagem desenvolvidos a partir de necessidades reais da gestão de resíduos.",
    heroSubcopy: "Tecnologias internacionais e produção própria do Grupo Almeida.",
    heroPrimaryCta: "Conheça as tecnologias",
    heroSecondaryCta: "Encontre a solução para sua operação",
    positioningHeadline: "Escolher um equipamento é avaliar o que ele muda na operação.",
    positioningBody:
      "A Almeida Equipamentos nasceu da proximidade entre tecnologia e gestão de resíduos. Por isso a conversa vai além da máquina: considera espaço, transporte, produtividade e a rotina de quem opera.",
    catalogEyebrow: "Catálogo técnico",
    catalogHeadline: "Seis tecnologias. Cada uma resolve um tipo de problema.",
    catalogBody:
      "Escolha um equipamento para ver galeria, aplicação, benefícios e as especificações confirmadas pelo fabricante.",
    densityEyebrow: "Como escolher",
    matrixHeadline: "A escolha começa pelo material, não pela máquina.",
    matrixBody:
      "Volume, densidade, umidade, espaço disponível e frequência de coleta mudam a solução. Veja por onde começar para cada material.",
    partnersEyebrow: "Parcerias internacionais",
    partnersHeadline: "Tecnologia internacional aplicada à experiência brasileira.",
    partnersBody:
      "A presença histórica do Grupo Almeida em contato com tecnologias europeias — incluindo a feira IFAT, em Munique, referência mundial em soluções ambientais — é parte relevante do posicionamento da Almeida Equipamentos.",
    crossHeadline: "A mesma tecnologia do catálogo já trabalha dentro do Grupo.",
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
    heroTitle: "Technology that reduces volume and improves operational efficiency.",
    heroLede:
      "Equipment for compaction, baling, dewatering and storage, designed around the practical realities of waste management.",
    heroSubcopy: "International technology and in-house production by Grupo Almeida.",
    heroPrimaryCta: "See the technologies",
    heroSecondaryCta: "Find the solution for your operation",
    positioningHeadline: "Choosing equipment means weighing its impact on your operation.",
    positioningBody:
      "Almeida Equipamentos grew out of the close relationship between technology and waste management. That is why the conversation goes beyond the machine: space, transport, productivity and the daily routine of the people who run it.",
    catalogEyebrow: "Technical catalog",
    catalogHeadline: "Six technologies. Each solves a different kind of problem.",
    catalogBody: "Choose a piece of equipment to see its gallery, application, benefits and manufacturer-confirmed specs.",
    densityEyebrow: "How to choose",
    matrixHeadline: "The choice starts with the material, not the machine.",
    matrixBody:
      "Volume, density, moisture, available space and collection frequency all shape the solution. See where to start for each material.",
    partnersEyebrow: "International partnerships",
    partnersHeadline: "International technology, shaped by Brazilian operational experience.",
    partnersBody:
      "Grupo Almeida has a long history of engagement with European technologies, including through IFAT in Munich, an internationally recognized trade fair for environmental solutions. This international exposure is an important part of Almeida Equipamentos' positioning.",
    crossHeadline: "The same technology in this catalog already works inside the Group.",
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
 * Três capítulos entre o Hero e o fechamento (capítulo é a unidade
 * perceptiva, não o <section> — ver editorial.module.css):
 *
 *   A. O que oferecemos   (pedra)      posicionamento + catálogo explorável
 *   B. Como escolher      (pedra alt.) eficiência de transporte + material → tecnologia
 *   C. De onde vem        (pedra)      parcerias internacionais + prova de uso no Grupo
 *
 * Dentro de cada capítulo o respiro é metade (chapterOpen/chapterClose) e a
 * superfície não muda; o tom só troca quando o capítulo troca. O catálogo
 * (ProductExplorer) é descoberta primeiro, profundidade sob demanda.
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

      {/* ============ Capítulo A — O que oferecemos ============ */}
      <section className={`${shared.chapterOpen} ${shared.toneStone} ${boundarySurface}`}>
        <BrandBoundaryMark boundary="equipamentos-abertura" half="entering" surface="onLight" />
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
            <div className={`${shared.duoMedia} ${styles.positioningMedia}`}>
              <EditorialPicture image={detalheMecanicoImage} />
            </div>
          </div>
        </div>
      </section>

      <section id="produtos" className={`${shared.chapterClose} ${shared.toneStone}`} aria-labelledby="produtos-heading">
        <div className={shared.container}>
          <p className={`${shared.eyebrow} ${shared.eyebrowAccent}`}>{t.catalogEyebrow}</p>
          <h2 id="produtos-heading" className={shared.headline}>
            {t.catalogHeadline}
          </h2>
          <p className={shared.body}>{t.catalogBody}</p>

          <ProductExplorer locale={locale} products={products} />
        </div>
      </section>

      {/* ============ Capítulo B — Como escolher ============ */}
      <LogisticsEfficiency locale={locale} eyebrow={t.densityEyebrow} />

      {/* Material → tecnologia. Responde "para que serve" (por material); o
          catálogo acima responde "o que existe". Sem CTA próprio: o único
          convite à conversa fica no fechamento da página. */}
      <section className={`${shared.chapterClose} ${shared.toneStoneAlt}`}>
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
        </div>
      </section>

      {/* ============ Capítulo C — De onde vem a tecnologia ============ */}
      <section className={`${shared.chapterOpen} ${shared.toneStone}`}>
        <div className={shared.container}>
          <div className={`${shared.duo} ${shared.duoMediaRight} ${shared.duoMediaNarrow}`}>
            <div className={shared.duoContent}>
              <p className={`${shared.eyebrow} ${shared.eyebrowAccent}`}>{t.partnersEyebrow}</p>
              <h2 className={shared.headline}>{t.partnersHeadline}</h2>
              <p className={shared.body}>{t.partnersBody}</p>
              <div className={styles.partnersList}>
                {PARTNERS.map((partner) => (
                  <span key={partner} className={styles.partnerName}>
                    {partner}
                  </span>
                ))}
              </div>
            </div>
            {/* Imagem ilustrativa de feira: aguarda acervo real da IFAT. */}
            <div className={`${shared.duoMedia} ${styles.partnersMedia}`}>
              <EditorialPicture image={feiraImage} />
              <IllustrativeBadge locale={locale} />
            </div>
          </div>
        </div>
      </section>

      <section className={`${shared.chapterClose} ${shared.toneStone}`}>
        <div className={shared.container}>
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
