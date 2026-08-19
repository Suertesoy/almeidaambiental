import Link from "next/link";
import shared from "../shared/company-page.module.css";
import styles from "./equipamentos.module.css";
import CompanyHero from "../shared/CompanyHero";
import ProductRotation from "../shared/ProductRotation";
import EditorialCTA from "../shared/EditorialCTA";
import {
  HERO_IMAGE,
  DETALHE_MECANICO_IMAGE,
  FEIRA_IMAGE,
  PRODUCTS,
  MATERIAL_ASSOCIATIONS,
  PARTNERS,
} from "../../lib/equipamentos-data";

const PRODUCT_TONE = [
  shared.toneStone,
  shared.toneStoneAlt,
  shared.toneStone,
  shared.toneStoneAlt,
  shared.toneStone,
  shared.toneStoneAlt,
];

const MODALITIES = ["Compra", "Locação", "Consignação"];

/**
 * /almeida-equipamentos — a mais visual e tecnológica das três páginas
 * (Seção 31 em diante), sem virar loja virtual: sem preço, sem carrinho.
 * Hero técnico → posicionamento (Compra/Locação/Consignação) → navegação
 * interna → seis capítulos de produto (portfólio EXATO, Seção 32) → "qual
 * tecnologia para qual material" → parcerias internacionais → CTA final.
 * O depoimento CTS (Seção 48) não entra: nenhum texto aprovado da autoria
 * original foi localizado no repositório — ver pendências no relatório do
 * checkpoint em vez de inventar a fala.
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
        secondaryCta={{ label: "Encontre a solução para sua operação", href: "/contato" }}
      />

      {/* ---------------- Posicionamento ---------------- */}
      <section className={`${shared.section} ${shared.toneStone}`}>
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
            <div className={`${shared.duoMedia} ${shared.duoMediaSquare}`}>
              <img src={DETALHE_MECANICO_IMAGE.src} alt={DETALHE_MECANICO_IMAGE.alt} loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Navegação interna dos seis produtos ---------------- */}
      <nav className={styles.productNav} aria-label="Tecnologias da Almeida Equipamentos" id="produtos">
        <ul className={styles.productNavList}>
          {PRODUCTS.map((product) => (
            <li key={product.id}>
              <a className={styles.productNavLink} href={`#${product.id}`}>
                {product.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ---------------- Seis capítulos de produto ---------------- */}
      {PRODUCTS.map((product, index) => {
        const sideClass = index % 2 === 0 ? shared.duoMediaRight : shared.duoMediaLeft;

        return (
          <section
            key={product.id}
            id={product.id}
            className={`${styles.productChapter} ${PRODUCT_TONE[index]}`}
            aria-labelledby={`${product.id}-heading`}
          >
            <div className={shared.container}>
              <div className={`${shared.duo} ${sideClass}`}>
                <div className={shared.duoMedia}>
                  <ProductRotation image={product.image} priority={index === 0} />
                </div>

                <div className={shared.duoContent}>
                  <p className={styles.productManufacturer}>{product.manufacturer}</p>
                  <h2 className={styles.productName}>{product.name}</h2>
                  <p className={shared.headline} style={{ fontSize: "clamp(20px, 1.6vw + 12px, 26px)" }}>
                    {product.headline}
                  </p>
                  <p className={shared.body}>{product.copy}</p>

                  <p className={shared.eyebrow}>Ideal para</p>
                  <ul className={shared.tagRow}>
                    {product.idealFor.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <p className={shared.eyebrow}>Benefícios</p>
                  <ul className={shared.tagRow}>
                    {product.benefits.map((benefit) => (
                      <li key={benefit}>{benefit}</li>
                    ))}
                  </ul>

                  {product.confirmedSpecs && (
                    <ul className={styles.specsList}>
                      {product.confirmedSpecs.map((spec) => (
                        <li key={spec}>{spec}</li>
                      ))}
                    </ul>
                  )}

                  <div className={shared.ctaRow}>
                    <Link className={`${shared.btn} ${shared.btnOutlineOnLight}`} href="/contato">
                      Falar sobre {product.name}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ---------------- Qual tecnologia para qual material ---------------- */}
      <section className={`${shared.section} ${shared.toneForest}`}>
        <div className={shared.container}>
          <h2 className={shared.headline}>O equipamento começa pelo material, não pela máquina.</h2>
          <p className={shared.body}>
            Volume, densidade, umidade, espaço disponível e frequência de coleta mudam completamente a solução. Por
            isso, a escolha começa entendendo a operação.
          </p>
          <div className={styles.matrixGrid}>
            {MATERIAL_ASSOCIATIONS.map((assoc) => (
              <div key={assoc.material} className={styles.matrixItem}>
                <p className={styles.matrixMaterial}>{assoc.material}</p>
                <p className={styles.matrixProducts}>
                  {assoc.products
                    .map((id) => PRODUCTS.find((product) => product.id === id)?.name)
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
            ))}
          </div>
          <div className={shared.ctaRow} style={{ marginTop: "clamp(32px, 5vw, 48px)" }}>
            <Link className={`${shared.btn} ${shared.btnOutlineOnDark}`} href="/contato">
              Descrever minha operação
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- Parcerias internacionais ---------------- */}
      <section className={`${shared.section} ${shared.toneStone}`}>
        <div className={shared.container}>
          <p className={shared.eyebrow}>Parcerias internacionais</p>
          <h2 className={shared.headline}>Tecnologia internacional aplicada à experiência brasileira.</h2>
          <div className={styles.partnersMedia}>
            <img src={FEIRA_IMAGE.src} alt={FEIRA_IMAGE.alt} loading="lazy" decoding="async" />
            <span
              style={{
                position: "absolute",
                right: 10,
                bottom: 10,
                padding: "4px 10px",
                background: "rgba(8, 10, 8, 0.62)",
                color: "var(--color-background)",
                fontFamily: "var(--font-inter), var(--font-body)",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                borderRadius: 3,
              }}
            >
              Imagem ilustrativa
            </span>
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
          <p className={shared.eyebrow}>Tecnologia em operação real</p>
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
        cta={{ label: "Falar com a Almeida Equipamentos", href: "/contato" }}
        tone="carvao"
      />
    </div>
  );
}
