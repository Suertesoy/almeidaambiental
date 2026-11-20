"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./product-explorer.module.css";

export type ProductNavItem = { id: string; label: string };

/**
 * Guia contextual dos equipamentos do catálogo.
 *
 * - Só existe DURANTE a exploração dos produtos: aparece quando o primeiro
 *   equipamento alcança a linha de ancoragem (logo abaixo do Header + guia) e
 *   some ao voltar acima dele ou ao passar do último. Não aparece no hero nem
 *   no título "Catálogo técnico".
 * - Posicionada com `position: fixed` (não participa do fluxo): aparecer e
 *   sumir não desloca nenhum conteúdo — zero salto de layout.
 * - Sem listener de scroll: tudo vem de IntersectionObserver. O "root" é
 *   reduzido a uma linha de 1px na linha de ancoragem (rootMargin), então
 *   "o equipamento X cruza a linha" é exatamente "o equipamento X é o atual",
 *   e "o conjunto cruza a linha" é "a exploração está em curso". Sem limiar
 *   fracionário, não há flicker perto dos limites; nos vãos entre dois
 *   equipamentos o destaque permanece no anterior.
 * - O item ativo é mantido visível na lista horizontal (rola só a lista).
 * - Links reais (`<a href="#id">`) — teclado e sem JS. Quando oculta, a guia
 *   fica `inert` (fora da ordem de tabulação e da árvore de acessibilidade).
 */
export default function ProductNav({
  items,
  ariaLabel,
  scopeSelector,
}: {
  items: ProductNavItem[];
  ariaLabel: string;
  /** Seletor do wrapper que contém todos os equipamentos. */
  scopeSelector: string;
}) {
  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let observers: IntersectionObserver[] = [];

    const setup = () => {
      observers.forEach((o) => o.disconnect());
      observers = [];
      const nav = navRef.current;
      const scope = document.querySelector<HTMLElement>(scopeSelector);
      if (!nav || !scope) return;

      const header = document.querySelector<HTMLElement>(".site-header");
      const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
      // Linha de ancoragem: abaixo do Header e da guia, no nível do título
      // de um equipamento que acabou de ser alcançado por um clique.
      const line = Math.round(headerBottom + nav.offsetHeight + 24);
      const vh = window.innerHeight;
      const rootMargin = `${-line}px 0px ${-(vh - line - 1)}px 0px`;

      const scopeObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[entries.length - 1];
          if (entry) setVisible(entry.isIntersecting);
        },
        { rootMargin, threshold: 0 }
      );
      scopeObserver.observe(scope);

      const itemObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) setActiveId(entry.target.id);
          }
        },
        { rootMargin, threshold: 0 }
      );
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el) itemObserver.observe(el);
      }
      observers = [scopeObserver, itemObserver];
    };

    setup();
    window.addEventListener("resize", setup);
    return () => {
      window.removeEventListener("resize", setup);
      observers.forEach((o) => o.disconnect());
    };
  }, [items, scopeSelector]);

  // Mantém o item ativo visível na lista (só rola a lista, não a página).
  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!visible || !list || !link || list.scrollWidth <= list.clientWidth) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const left = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
    list.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  }, [activeId, visible]);

  const onClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    target.focus({ preventScroll: true });
  };

  return (
    <nav
      ref={navRef}
      className={`${styles.productNav} ${visible ? styles.productNavVisible : ""}`}
      aria-label={ariaLabel}
      inert={!visible}
    >
      <div className={styles.productNavInner}>
        <ul ref={listRef} className={styles.productNavList}>
          {items.map((item) => {
            const current = item.id === activeId;
            return (
              <li key={item.id} className={styles.productNavItem}>
                <a
                  className={styles.productNavLink}
                  href={`#${item.id}`}
                  aria-current={current ? "location" : undefined}
                  data-active={current ? "true" : undefined}
                  onClick={(event) => onClick(event, item.id)}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
