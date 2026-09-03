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
  DETALHE_MECANICO_IMAGE,
  FEIRA_IMAGE,
  PRODUCTS,
  MATERIAL_ASSOCIATIONS,
  PARTNERS,
} from "../../lib/equipamentos-data";
import { CONTACT_ANCHORS } from "../../lib/contact-data";

const MODALITIES = ["Compra", "Locação", "Consignação"];

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
export default function EquipamentosPage() {
  return (
    <div className={styles.page} data-page="almeida-equipamentos">
      <CompanyHero
        eyebrow="Almeida Equipamentos"
        title="Tecnologia para movimentar menos volume e mais eficiência."
        lede="Equipamentos para compactação, prensagem, desidratação e armazenagem desenvolvidos a partir de necessidades reais da gestão de resíduos."
        subcopy="Tecnologias internacionais, produção própria e experiência operacional dentro do Grupo Almeida."
        image={HERO_IMAGE}
        primaryCta={{ label: "Conheça as tecnologias", href: "#produtos" }}
        secondaryCta={{ label: "Encontre a solução para sua operação", href: CONTACT_ANCHORS.saoJose }}
      />

      {/* ---------------- Posicionamento ---------------- */}
      <section className={`${shared.section} ${shared.toneStone} ${boundarySurface}`}>
        <BrandBoundaryMark boundary="equipamentos-catalogo" half="leaving" surface="onLight" />
        <div className={shared.container}>
          <div className={`${shared.duo} ${shared.duoMediaRight} ${shared.duoMediaNarrow}`}>
            <div className={shared.duoContent}>
              <h2 className={shared.headline}>Equipamentos escolhidos por quem também vive a operação.</h2>
              <p className={shared.body}>
                A Almeida Equipamentos nasceu da proximidade entre tecnologia e gestão de resíduos. O conhecimento
                construído na operação ambiental permite avaliar não apenas a máquina, mas o que ela muda em espaço,
                transporte, produtividade e rotina.
              </p>
              <ul className={styles.modalityTags}>
                {MODALITIES.map((modality) => (
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
              <EditorialPicture image={DETALHE_MECANICO_IMAGE} />
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
          <p className={`${shared.eyebrow} ${shared.eyebrowAccent}`}>Catálogo técnico</p>
          <h2 id="produtos-heading" className={shared.headline}>
            Seis tecnologias. Comece pela que se parece com a sua operação.
          </h2>
          <p className={shared.body}>
            Escolha um equipamento para ver galeria, aplicação, benefícios e as especificações confirmadas pelo
            fabricante.
          </p>

          <ProductExplorer />
        </div>
      </section>

      {/* ---------------- Eficiência que aparece no transporte ---------------- */}
      <LogisticsEfficiency />

      {/* ---------------- Qual tecnologia para qual material ---------------- */}
      <section className={`${shared.section} ${shared.toneForest}`}>
        <div className={shared.container}>
          <h2 className={shared.headline}>O equipamento começa pelo material, não pela máquina.</h2>
          <p className={shared.body}>
            Volume, densidade, umidade, espaço disponível e frequência de coleta mudam completamente a solução. Por
            isso, a escolha começa entendendo a operação.
          </p>
          <div className={styles.matrixGrid}>
            {MATERIAL_ASSOCIATIONS.map((assoc) => {
              const MaterialIcon = MATERIAL_ICONS[assoc.material];
              return (
                <div key={assoc.material} className={styles.matrixItem}>
                  <div className={styles.matrixHead}>
                    {MaterialIcon && <MaterialIcon className={styles.matrixIcon} />}
                    <p className={styles.matrixMaterial}>{assoc.material}</p>
                  </div>
                  <p className={styles.matrixProducts}>
                    {assoc.products
                      .map((id) => PRODUCTS.find((product) => product.id === id)?.name)
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
              );
            })}
          </div>
          <div className={`${shared.ctaRow} ${styles.matrixCtaRow}`}>
            <Link className={`${shared.btn} ${shared.btnOutlineOnDark}`} href={CONTACT_ANCHORS.saoJose}>
              Descrever minha operação
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- Parcerias internacionais ---------------- */}
      <section className={`${shared.section} ${shared.toneStone}`}>
        <div className={shared.container}>
          <p className={`${shared.eyebrow} ${shared.eyebrowAccent}`}>Parcerias internacionais</p>
          <h2 className={shared.headline}>Tecnologia internacional aplicada à experiência brasileira.</h2>
          <div className={styles.partnersMedia}>
            <EditorialPicture image={FEIRA_IMAGE} />
            <IllustrativeBadge />
          </div>
          <p className={shared.body}>
            A presença histórica do Grupo Almeida em contato com tecnologias europeias — incluindo a feira IFAT, em
            Munique, referência mundial em soluções ambientais — é parte relevante do posicionamento da Almeida
            Equipamentos.
          </p>
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
          <p className={`${shared.eyebrow} ${shared.eyebrowAccent}`}>Tecnologia em operação real</p>
          <h2 className={shared.headline}>
            Antes de chegar ao catálogo, cada tecnologia já opera dentro do próprio grupo.
          </h2>
          <p className={shared.body}>
            Os mesmos equipamentos apresentados aqui sustentam a operação diária da Almeida Ambiental — coleta,
            triagem e trituração em escala real, não em teoria. É essa proximidade entre quem vende a tecnologia e
            quem também vive a operação que orienta cada recomendação.
          </p>
          <div className={shared.ctaRow}>
            <Link className={`${shared.btn} ${shared.btnOutlineOnLight}`} href="/almeida-ambiental">
              Conheça a Almeida Ambiental
            </Link>
          </div>
        </div>
      </section>

      <EditorialCTA
        headline="A melhor máquina é a que faz sentido para a sua operação."
        body="Conte qual material você processa, o volume aproximado e o espaço disponível. A equipe da Almeida Equipamentos pode orientar a solução mais adequada."
        cta={{ label: "Falar com a Almeida Equipamentos", href: CONTACT_ANCHORS.saoJose }}
        tone="carvao"
      />
    </div>
  );
}
