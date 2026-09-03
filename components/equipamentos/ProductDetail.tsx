"use client";

import { useEffect, useRef } from "react";
import styles from "./product-detail.module.css";
import ProductGallery from "./ProductGallery";
import { CloseIcon, WhatsAppIcon, MATERIAL_ICONS, BENEFIT_ICONS } from "../icons";
import { equipmentWhatsAppHref } from "../../lib/contact-data";
import type { Product } from "../../lib/equipamentos-data";

export type ProductDetailProps = {
  product: Product | null;
  onClose: () => void;
};

/**
 * Experiência ampliada de um equipamento — a terceira etapa da revelação
 * progressiva (descobrir → escolher aprofundar → ver os detalhes).
 *
 * Sobre <dialog> nativo: gestão de foco, Escape, inertização do fundo e
 * camada superior vêm do navegador. `onClose` do próprio elemento cobre
 * tanto o botão de fechar quanto o Escape, então não existe caminho de
 * saída que deixe o estado do explorador dessincronizado.
 *
 * Conteúdo: só o que já está validado no projeto — resumo, "para que
 * serve", "onde faz sentido", benefícios e as specs confirmadas em fonte
 * oficial. Equipamento sem spec confirmada simplesmente não mostra o
 * accordion de especificações; nada é aproximado nem preenchido.
 */
export default function ProductDetail({ product, onClose }: ProductDetailProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (product && !dialog.open) dialog.showModal();
    if (!product && dialog.open) dialog.close();
  }, [product]);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      onClose={onClose}
      aria-label={product ? `Detalhes do equipamento ${product.name}` : "Detalhes do equipamento"}
    >
      {product && (
        <div className={styles.shell}>
          <div className={styles.bar}>
            <span className={styles.barLabel}>Almeida Equipamentos · {product.name}</span>
            <button type="button" className={styles.close} onClick={onClose} aria-label="Fechar detalhes" autoFocus>
              <CloseIcon />
            </button>
          </div>

          <div className={styles.body}>
            <div className={styles.layout}>
              <ProductGallery image={product.image} gallery={product.gallery} video={product.video} />

              <div className={styles.info}>
                <p className={styles.manufacturer}>{product.manufacturer}</p>
                <h2 className={styles.name}>{product.name}</h2>
                <p className={styles.summary}>{product.headline}</p>

                <div className={styles.block}>
                  <p className={styles.blockTitle}>Para que serve</p>
                  <p className={styles.blockBody}>{product.copy}</p>
                </div>

                <div className={styles.block}>
                  <p className={styles.blockTitle}>Onde faz sentido</p>
                  <ul className={styles.iconList}>
                    {product.idealFor.map((item) => {
                      const ItemIcon = MATERIAL_ICONS[item];
                      return (
                        <li key={item} className={styles.iconListItem}>
                          {ItemIcon ? <ItemIcon /> : <span className={styles.iconDot} aria-hidden="true" />}
                          <span>{item}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className={styles.block}>
                  <p className={styles.blockTitle}>Principais benefícios</p>
                  <ul className={styles.iconList}>
                    {product.benefits.map((benefit) => {
                      const BenefitIcon = BENEFIT_ICONS[benefit];
                      return (
                        <li key={benefit} className={styles.iconListItem}>
                          {BenefitIcon ? <BenefitIcon /> : <span className={styles.iconDot} aria-hidden="true" />}
                          <span>{benefit}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {product.confirmedSpecs && product.confirmedSpecs.length > 0 && (
                  <details className={styles.accordion}>
                    <summary className={styles.accordionSummary}>Especificações técnicas</summary>
                    <div className={styles.accordionBody}>
                      <ul className={styles.specList}>
                        {product.confirmedSpecs.map((spec) => (
                          <li key={spec}>{spec}</li>
                        ))}
                      </ul>
                      <p className={styles.specNote}>
                        Especificações confirmadas em material oficial do fabricante. Dimensionamento e
                        configuração final dependem do material, do volume e do espaço da sua operação.
                      </p>
                    </div>
                  </details>
                )}

                <details className={styles.accordion}>
                  <summary className={styles.accordionSummary}>Modalidades de aquisição</summary>
                  <div className={styles.accordionBody}>
                    <ul className={styles.specList}>
                      <li>Compra</li>
                      <li>Locação</li>
                      <li>Consignação</li>
                    </ul>
                  </div>
                </details>

                {/* Ação única do equipamento (nunca vários CTAs competindo):
                    o WhatsApp de Atendimento da matriz já publicado em
                    /contato, com o nome do equipamento viajando junto. */}
                <div className={styles.ctaRow}>
                  <a
                    className={styles.cta}
                    href={equipmentWhatsAppHref(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon />
                    Falar sobre este equipamento
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
