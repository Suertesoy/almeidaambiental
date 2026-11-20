"use client";

import cards from "../shared/MaterialCards.module.css";
import shared from "../shared/company-page.module.css";
import styles from "./product-explorer.module.css";
import EquipmentModelStage from "./EquipmentModelStage";
import IllustrativeBadge from "../shared/IllustrativeBadge";
import { BENEFIT_ICONS, MATERIAL_ICONS, WhatsAppIcon, type FunctionalIconProps } from "../icons";
import { getEquipment3DConfig } from "../../lib/equipamentos-3d";
import { equipmentWhatsAppHref } from "../../lib/contact-data";
import type { Product } from "../../lib/equipamentos-data";
import type { Locale } from "../../lib/i18n/locale";
import type { ReactElement } from "react";

const COPY = {
  pt: {
    description: "Descrição",
    applications: "Aplicações",
    benefits: "Benefícios",
    specs: "Especificações técnicas",
    specNote:
      "Especificações confirmadas em material oficial do fabricante. Dimensionamento e configuração final dependem do material, do volume e do espaço da sua operação.",
    talk: "Falar sobre este equipamento",
    // Provisório: aplicado às seis máquinas até a confirmação comercial com a equipe.
    modalitiesLabel: "Modalidades",
    modalities: ["Compra", "Locação", "Consignação"],
  },
  en: {
    description: "Description",
    applications: "Applications",
    benefits: "Benefits",
    specs: "Technical specifications",
    specNote:
      "Specifications confirmed by the manufacturer. Final sizing and configuration depend on your material, volume and available space.",
    talk: "Ask about this equipment",
    // Provisional: applied to all six machines until the sales team confirms.
    modalitiesLabel: "Available as",
    modalities: ["Purchase", "Rental", "Consignment"],
  },
} as const;

type IconFn = (props: FunctionalIconProps) => ReactElement;

/** Aplicações que não são um material do Atlas reaproveitam o ícone existente
 *  de significado equivalente (sem desenhar ícone novo). */
const APPLICATION_ICON_FALLBACK: Record<string, IconFn | undefined> = {
  "Resíduos industriais": BENEFIT_ICONS["Estrutura fechada"],
  "Industrial waste": BENEFIT_ICONS["Estrutura fechada"],
  "Materiais com maior geração de líquidos": MATERIAL_ICONS["Resíduos úmidos"],
  "Materials with high liquid content": MATERIAL_ICONS["Resíduos úmidos"],
  "Coleta roll-on/roll-off": BENEFIT_ICONS["Estrutura fechada"],
  "Roll-on/roll-off collection": BENEFIT_ICONS["Estrutura fechada"],
  "Fardos de alta densidade": BENEFIT_ICONS["Fardos de alta densidade"],
  "High-density bales": BENEFIT_ICONS["High-density bales"],
};

/**
 * Vitrine editorial do catálogo Almeida Equipamentos.
 *
 * Cada equipamento é um bloco autossuficiente, sem modal, accordion ou botão
 * "Ver detalhes": marca → nome → modalidades → visual (3D interativo quando há GLB) →
 * descrição → aplicações (ícones do Material Atlas) → benefícios (ícones) →
 * especificações técnicas confirmadas → CTA de contato do próprio
 * equipamento. No desktop alterna a assimetria entre visual e coluna editorial.
 * O id de cada <article> é o do produto: o seletor de materiais navega até ele.
 */
export default function ProductExplorer({ locale, products }: { locale: Locale; products: Product[] }) {
  const t = COPY[locale];

  return (
    <div className={styles.showcase}>
      {products.map((product, index) => {
        const model3D = getEquipment3DConfig(product.id);
        const isReverse = index % 2 === 1;
        const hasSpecs = Boolean(product.confirmedSpecs && product.confirmedSpecs.length > 0);

        return (
          <article
            key={product.id}
            id={product.id}
            className={`${styles.showcaseItem} ${isReverse ? styles.showcaseItemReverse : ""}`}
          >
            <header className={styles.itemHeader}>
              {/* Hierarquia: marca → nome do equipamento → modalidades. */}
              <div className={styles.itemMetaRow}>
                <span className={styles.itemManufacturer}>{product.manufacturer}</span>
                <span className={styles.itemIndex}>
                  {String(index + 1).padStart(2, "0")}
                  <span className={styles.itemIndexTotal}>/ {String(products.length).padStart(2, "0")}</span>
                </span>
              </div>
              <h3 className={styles.itemName}>{product.name}</h3>
              <ul className={styles.itemModalities} aria-label={t.modalitiesLabel}>
                {t.modalities.map((modality) => (
                  <li key={modality}>{modality}</li>
                ))}
              </ul>
            </header>

            <div className={styles.itemMediaWrap}>
              {model3D ? (
                <div className={`${styles.itemMedia} ${styles.itemMedia3D}`}>
                  <EquipmentModelStage config={model3D} locale={locale} variant="catalog" autoRotate />
                </div>
              ) : (
                <div className={styles.itemMedia}>
                  <img src={product.image.src} alt={product.image.alt} loading="lazy" decoding="async" />
                  <IllustrativeBadge locale={locale} position="bottom-right" />
                </div>
              )}

              {model3D?.modelCaption && <p className={styles.modelCaption}>{model3D.modelCaption[locale]}</p>}
            </div>

            <div className={styles.itemBody}>
              <section className={styles.block} aria-label={t.description}>
                <p className={styles.blockLabel}>{t.description}</p>
                <p className={styles.itemCopy}>{product.copy}</p>
              </section>

              <section className={styles.block} aria-label={t.applications}>
                <p className={styles.blockLabel}>{t.applications}</p>
                <ul className={styles.appGrid}>
                  {product.idealFor.map((item) => {
                    const Icon = MATERIAL_ICONS[item] ?? APPLICATION_ICON_FALLBACK[item];
                    return (
                      <li key={item} className={styles.appItem}>
                        {Icon && <Icon className={cards.icon} />}
                        <span className={styles.appName}>{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </section>

              <section className={styles.block} aria-label={t.benefits}>
                <p className={styles.blockLabel}>{t.benefits}</p>
                <ul className={styles.benefitGrid}>
                  {product.benefits.map((benefit) => {
                    const Icon = BENEFIT_ICONS[benefit];
                    return (
                      <li key={benefit} className={styles.benefitItem}>
                        {Icon && <Icon className={styles.benefitIcon} />}
                        <span>{benefit}</span>
                      </li>
                    );
                  })}
                </ul>
              </section>

              {hasSpecs && (
                <section className={styles.block} aria-label={t.specs}>
                  <p className={styles.blockLabel}>{t.specs}</p>
                  <ul className={styles.itemSpecs}>
                    {product.confirmedSpecs!.map((spec) => (
                      <li key={spec} className={styles.itemSpec}>
                        {spec}
                      </li>
                    ))}
                  </ul>
                  <p className={styles.specNote}>{t.specNote}</p>
                </section>
              )}

              <div className={styles.itemCta}>
                <a
                  className={`${shared.btn} ${shared.btnSolidGold}`}
                  href={equipmentWhatsAppHref(product.name, locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon />
                  {t.talk}
                </a>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
