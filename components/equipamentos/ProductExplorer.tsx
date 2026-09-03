"use client";

import { useCallback, useRef, useState } from "react";
import shared from "../shared/company-page.module.css";
import styles from "./product-explorer.module.css";
import ProductDetail from "./ProductDetail";
import { PRODUCTS, type Product } from "../../lib/equipamentos-data";

/**
 * Catálogo técnico explorável da Almeida Equipamentos.
 *
 * Substitui os seis capítulos de produto em sequência vertical (nome,
 * promessa, texto, "ideal para", benefícios, specs e CTA, tudo aberto de
 * uma vez, seis vezes) por descoberta primeiro e profundidade sob demanda.
 *
 * Mobile: cada equipamento aparece como imagem grande + nome + uma frase +
 * "Ver detalhes"; tocar abre a experiência completa em tela cheia.
 *
 * Desktop: os mesmos itens viram a coluna esquerda de um master-detail —
 * selecionar troca a imagem grande, o nome e o resumo com uma transição
 * curta; "Ver detalhes" abre a mesma experiência ampliada. Não é o mobile
 * esticado nem um celular gigante no meio da tela.
 *
 * O breakpoint é lido no clique (não na renderização) para não introduzir
 * divergência entre servidor e cliente: no desktop o toque seleciona; no
 * mobile, onde não existe palco para receber a seleção, o mesmo toque já
 * abre o detalhe.
 */
export default function ProductExplorer() {
  const [selected, setSelected] = useState<Product>(PRODUCTS[0]);
  const [detail, setDetail] = useState<Product | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openDetail = useCallback((product: Product, trigger: HTMLElement | null) => {
    triggerRef.current = trigger;
    setDetail(product);
  }, []);

  const closeDetail = useCallback(() => {
    setDetail(null);
    // Devolve o foco a quem abriu — o <dialog> nativo cuida do resto.
    triggerRef.current?.focus();
    triggerRef.current = null;
  }, []);

  const handleItemClick = (product: Product, event: React.MouseEvent<HTMLButtonElement>) => {
    setSelected(product);
    const isDesktop =
      typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) openDetail(product, event.currentTarget);
  };

  return (
    <>
      <div className={styles.explorer}>
        <div className={styles.master}>
          {/* Bloco do selecionado — só desktop. No mobile essa informação
              já vive dentro de cada cartão da lista. */}
          <div className={styles.selected}>
            <div key={selected.id} className={styles.swap}>
              <p className={styles.selectedManufacturer}>{selected.manufacturer}</p>
              <h3 className={styles.selectedName}>{selected.name}</h3>
              <p className={styles.selectedSummary}>{selected.headline}</p>
            </div>
            <div className={styles.selectedCta}>
              <button
                type="button"
                className={`${shared.btn} ${shared.btnOutlineOnLight}`}
                onClick={(event) => openDetail(selected, event.currentTarget)}
              >
                Ver detalhes de {selected.name}
              </button>
            </div>
          </div>

          <ul className={styles.list}>
            {PRODUCTS.map((product) => (
              <li key={product.id}>
                <button
                  type="button"
                  className={styles.itemButton}
                  aria-current={product.id === selected.id ? "true" : undefined}
                  onClick={(event) => handleItemClick(product, event)}
                >
                  <span className={styles.cardMedia}>
                    <img
                      src={product.image.src}
                      alt={product.image.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  <span className={styles.itemManufacturer}>{product.manufacturer}</span>
                  <span className={styles.itemName}>{product.name}</span>
                  <span className={styles.itemSummary}>{product.headline}</span>
                  <span className={styles.itemCue}>Ver detalhes</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.stage} aria-hidden="true">
          <div className={styles.stageMedia}>
            <img
              key={selected.id}
              className={styles.swap}
              src={selected.image.src}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>

      <ProductDetail product={detail} onClose={closeDetail} />
    </>
  );
}
