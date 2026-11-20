"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./product-explorer.module.css";

export type ProductNavItem = { id: string; label: string };

/**
 * Guia contextual dos equipamentos do catálogo.
 *
 * - Sticky logo abaixo do Header fixo (CSS); solta sozinha ao sair do
 *   wrapper do catálogo (o pai é o `.explorer`).
 * - O item atual é derivado do scroll (último equipamento cujo topo já passou
 *   da linha de ancoragem = Header + esta barra), nunca do clique — então o
 *   destaque acompanha a rolagem em qualquer direção.
 * - O item ativo é mantido visível dentro da lista horizontal rolável
 *   (scroll só da lista, nunca da página).
 * - Links reais (`<a href="#id">`): funcionam por teclado e sem JS. O clique
 *   usa scrollIntoView (respeita `scroll-margin-top` dos artigos e
 *   prefers-reduced-motion) e move o foco para o equipamento.
 */
export default function ProductNav({ items, ariaLabel }: { items: ProductNavItem[]; ariaLabel: string }) {
  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  const update = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;
    const header = document.querySelector<HTMLElement>(".site-header");
    const anchorLine = (header?.getBoundingClientRect().bottom ?? 0) + nav.offsetHeight + 24;
    let current = items[0]?.id ?? "";
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el && el.getBoundingClientRect().top <= anchorLine) current = item.id;
    }
    setActiveId((prev) => (prev === current ? prev : current));
  }, [items]);

  useEffect(() => {
    let frame = 0;
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [update]);

  // Mantém o item ativo visível na lista (só rola a lista, não a página).
  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!list || !link || list.scrollWidth <= list.clientWidth) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const left = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
    list.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  }, [activeId]);

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
    <nav ref={navRef} className={styles.productNav} aria-label={ariaLabel}>
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
    </nav>
  );
}
