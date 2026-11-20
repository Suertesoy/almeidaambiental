"use client";

import { useCallback, useRef, useState } from "react";
import { flushSync } from "react-dom";
import shared from "../shared/company-page.module.css";
import styles from "./product-explorer.module.css";
import ProductDetail from "./ProductDetail";
import EquipmentModelStage from "./EquipmentModelStage";
import IllustrativeBadge from "../shared/IllustrativeBadge";
import { getEquipment3DConfig } from "../../lib/equipamentos-3d";
import type { Product } from "../../lib/equipamentos-data";
import type { Locale } from "../../lib/i18n/locale";

const COPY = {
  pt: {
    viewDetails: "Ver detalhes",
    viewDetailsOf: (name: string) => `Ver detalhes de ${name}`,
    applications: "Aplicações",
    benefits: "Benefícios",
  },
  en: {
    viewDetails: "View details",
    viewDetailsOf: (name: string) => `View details for ${name}`,
    applications: "Applications",
    benefits: "Benefits",
  },
} as const;

function withViewTransition(mutate: () => void) {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (typeof doc.startViewTransition === "function" && !prefersReducedMotion) {
    doc.startViewTransition(() => flushSync(mutate));
  } else {
    mutate();
  }
}

/**
 * Vitrine editorial do catálogo Almeida Equipamentos.
 *
 * Apresenta os seis equipamentos com protagonismo visual:
 * - Os três modelos com GLB validado recebem apresentação 3D com rotação
 *   suave automática e fundo transparente integrado à superfície da página.
 * - Os demais preservam suas mídias estáticas em composição igualmente ampla.
 * - No mobile, cada bloco segue a ordem: identificação → visual amplo →
 *   descrição, aplicações, benefícios e specs comprovadas → "Ver detalhes".
 * - No desktop, alterna a assimetria entre visual e coluna editorial.
 */
export default function ProductExplorer({ locale, products }: { locale: Locale; products: Product[] }) {
  const t = COPY[locale];
  const [detail, setDetail] = useState<Product | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openDetail = useCallback((product: Product, trigger: HTMLElement | null) => {
    triggerRef.current = trigger;
    withViewTransition(() => setDetail(product));
  }, []);

  const closeDetail = useCallback(() => {
    withViewTransition(() => setDetail(null));
    triggerRef.current?.focus();
    triggerRef.current = null;
  }, []);

  return (
    <>
      <div className={styles.showcase}>
        {products.map((product, index) => {
          const model3D = getEquipment3DConfig(product.id);
          const isReverse = index % 2 === 1;

          return (
            <article
              key={product.id}
              className={`${styles.showcaseItem} ${isReverse ? styles.showcaseItemReverse : ""}`}
            >
              <header className={styles.itemHeader}>
                <div className={styles.itemMetaRow}>
                  <span className={styles.itemIndex}>
                    {String(index + 1).padStart(2, "0")}
                    <span className={styles.itemIndexTotal}>
                      / {String(products.length).padStart(2, "0")}
                    </span>
                  </span>
                  <span className={styles.itemManufacturer}>{product.manufacturer}</span>
                </div>
                <h3 className={styles.itemName}>{product.name}</h3>
                <p className={styles.itemHeadline}>{product.headline}</p>
              </header>

              <div className={styles.itemMediaWrap}>
                {model3D ? (
                  <div className={`${styles.itemMedia} ${styles.itemMedia3D}`}>
                    <EquipmentModelStage
                      config={model3D}
                      locale={locale}
                      variant="catalog"
                      autoRotate
                    />
                  </div>
                ) : (
                  <div className={styles.itemMedia}>
                    <img
                      src={product.image.src}
                      alt={product.image.alt}
                      loading="lazy"
                      decoding="async"
                      className={!detail ? styles.transitionHero : undefined}
                    />
                    <IllustrativeBadge locale={locale} position="bottom-right" />
                  </div>
                )}

                {model3D?.modelCaption && (
                  <p className={styles.modelCaption}>{model3D.modelCaption[locale]}</p>
                )}
              </div>

              <div className={styles.itemBody}>
                <p className={styles.itemCopy}>{product.copy}</p>

                <div className={styles.itemHighlights}>
                  <div className={styles.highlightGroup}>
                    <p className={styles.highlightLabel}>{t.applications}</p>
                    <ul className={styles.tagList}>
                      {product.idealFor.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.highlightGroup}>
                    <p className={styles.highlightLabel}>{t.benefits}</p>
                    <ul className={styles.benefitList}>
                      {product.benefits.slice(0, 3).map((benefit) => (
                        <li key={benefit}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {product.confirmedSpecs && product.confirmedSpecs.length > 0 && (
                  <ul className={styles.itemSpecs}>
                    {product.confirmedSpecs.map((spec) => (
                      <li key={spec} className={styles.itemSpec}>
                        {spec}
                      </li>
                    ))}
                  </ul>
                )}

                <div className={styles.itemCta}>
                  <button
                    type="button"
                    className={`${shared.btn} ${shared.btnSolidGold}`}
                    aria-label={t.viewDetailsOf(product.name)}
                    onClick={(event) => openDetail(product, event.currentTarget)}
                  >
                    {t.viewDetails}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <ProductDetail product={detail} onClose={closeDetail} locale={locale} />
    </>
  );
}
