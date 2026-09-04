"use client";

import { useCallback, useRef, useState } from "react";
import { flushSync } from "react-dom";
import shared from "../shared/company-page.module.css";
import styles from "./product-explorer.module.css";
import ProductDetail from "./ProductDetail";
import { PRODUCTS, type Product } from "../../lib/equipamentos-data";

/**
 * Abrir/fechar o detalhe com a sensação de "a própria imagem cresceu",
 * não um modal aparecendo do nada (Seção 13 da rodada de territórios
 * visuais). View Transitions API quando o navegador suporta e a pessoa
 * não pediu menos movimento — caso contrário, o estado muda direto e o
 * <dialog> abre/fecha exatamente como antes, sem nenhuma diferença visual.
 * `flushSync` é necessário porque a API tira uma "foto" do DOM logo depois
 * do callback: sem ele, o React adiaria o re-render e a transição
 * capturaria o estado antigo. Nenhuma biblioteca nova — só a API nativa.
 */
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
    withViewTransition(() => setDetail(product));
  }, []);

  const closeDetail = useCallback(() => {
    withViewTransition(() => setDetail(null));
    // Devolve o foco a quem abriu — o <dialog> nativo cuida do resto.
    triggerRef.current?.focus();
    triggerRef.current = null;
  }, []);

  const selectedIndex = PRODUCTS.findIndex((product) => product.id === selected.id);

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
                      className={product.id === selected.id && !detail ? styles.transitionHero : undefined}
                    />
                  </span>
                  <span className={styles.itemManufacturer}>{product.manufacturer}</span>
                  <span className={styles.itemName}>{product.name}</span>
                  <span className={styles.itemSummary}>{product.headline}</span>
                  {/* Faixa de informações confirmadas — só existe quando o
                      equipamento realmente tem spec validada em fonte
                      oficial do fabricante (ver lib/equipamentos-data.ts).
                      Sem dado, nenhuma faixa é renderizada: nada de linha
                      vazia nem de número aproximado para emparelhar os
                      cartões. */}
                  {product.confirmedSpecs && product.confirmedSpecs.length > 0 && (
                    <span className={styles.itemSpecs}>
                      {product.confirmedSpecs.map((spec) => (
                        <span key={spec} className={styles.itemSpec}>
                          {spec}
                        </span>
                      ))}
                    </span>
                  )}
                  <span className={styles.itemCue}>Ver detalhes</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Palco: vitrine técnica, não um cartão com a imagem dentro.
            O estúdio é o do PRÓPRIO render — ver o comentário em
            product-explorer.module.css. Por cima dele vêm as marcas de
            canto de desenho técnico e a metadata do equipamento.
            aria-hidden porque tudo aqui duplica, em forma visual, o que o
            bloco .selected já anuncia como texto. */}
        <div className={styles.stage} aria-hidden="true">
          <div className={styles.stageMedia}>
            <span className={`${styles.stageTick} ${styles.tickTl}`} />
            <span className={`${styles.stageTick} ${styles.tickTr}`} />
            <span className={`${styles.stageTick} ${styles.tickBl}`} />
            <span className={`${styles.stageTick} ${styles.tickBr}`} />

            <img
              key={selected.id}
              className={`${styles.stageProduct} ${styles.swap} ${!detail ? styles.transitionHero : ""}`}
              src={selected.image.src}
              alt=""
              loading="lazy"
              decoding="async"
            />

            <span className={styles.stageIndex}>
              {String(selectedIndex + 1).padStart(2, "0")}
              <span className={styles.stageIndexTotal}>/ {String(PRODUCTS.length).padStart(2, "0")}</span>
            </span>
            <span className={styles.stageManufacturer}>{selected.manufacturer}</span>
          </div>
        </div>
      </div>

      <ProductDetail product={detail} onClose={closeDetail} />
    </>
  );
}
