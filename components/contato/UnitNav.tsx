"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./contato.module.css";

export type UnitNavItem = { id: string; title: string };

type Props = {
  items: UnitNavItem[];
  ariaLabel: string;
  progressLabel: string;
  /** Ex.: "Unidade {index} de {total}: {title}" */
  progressTemplate: string;
};

/**
 * Navegação sticky das unidades com indicador de progresso.
 *
 * - `pos` é a posição contínua na sequência de unidades: 0 = a primeira
 *   seção alcançou a linha de ancoragem (logo abaixo de Header + esta barra),
 *   N-1 = a última. Entre duas unidades interpola linearmente.
 * - A barra amarela preenche (pos + 1) / N: ao alcançar a última unidade
 *   fica 100% cheia e regride ao rolar para cima. Antes da primeira unidade
 *   fica vazia.
 * - Clique usa scrollIntoView (respeita `scroll-margin-top` das seções); o
 *   indicador acompanha porque é derivado do scroll, não do clique.
 */
export default function UnitNav({ items, ariaLabel, progressLabel, progressTemplate }: Props) {
  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [pos, setPos] = useState(-1);

  const total = items.length;

  const update = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;
    const header = document.querySelector<HTMLElement>(".site-header");
    const anchorLine = (header?.getBoundingClientRect().bottom ?? 0) + nav.offsetHeight + 3;

    const tops = items.map((item) => document.getElementById(item.id)?.getBoundingClientRect().top ?? Infinity);

    let next: number;
    if (tops[0] > anchorLine) {
      next = -1;
    } else {
      let i = 0;
      while (i < total - 1 && tops[i + 1] <= anchorLine) i += 1;
      if (i >= total - 1) {
        next = total - 1;
      } else {
        const span = tops[i + 1] - tops[i];
        const t = span > 0 ? Math.min(1, Math.max(0, (anchorLine - tops[i]) / span)) : 0;
        next = i + t;
      }
    }
    setPos((prev) => (Math.abs(prev - next) < 0.002 ? prev : next));
  }, [items, total]);

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

  const activeIndex = pos < 0 ? 0 : Math.min(total - 1, Math.round(pos));
  const reached = pos >= 0;
  const fill = reached ? Math.min(1, (pos + 1) / total) : 0;

  // Mantém a unidade ativa visível quando a lista rola na horizontal (mobile).
  useEffect(() => {
    const list = listRef.current;
    if (!list || list.scrollWidth <= list.clientWidth) return;
    const el = list.children[activeIndex] as HTMLElement | undefined;
    if (!el) return;
    const target = el.offsetLeft - (list.clientWidth - el.offsetWidth) / 2;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollTo({ left: Math.max(0, target), behavior: reduce ? "auto" : "smooth" });
  }, [activeIndex]);

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
    <nav ref={navRef} className={styles.unitNav} aria-label={ariaLabel}>
      <div className={styles.unitNavInner}>
        <ul ref={listRef} className={styles.unitNavList}>
          {items.map((item, index) => {
            const current = reached && index === activeIndex;
            return (
              <li key={item.id} className={styles.unitNavItem}>
                <a
                  className={styles.unitNavLink}
                  href={`#${item.id}`}
                  aria-current={current ? "location" : undefined}
                  data-active={current ? "true" : undefined}
                  onClick={(event) => onClick(event, item.id)}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
      <div
        className={styles.unitProgress}
        role="progressbar"
        aria-label={progressLabel}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={reached ? activeIndex + 1 : 0}
        aria-valuetext={reached ? progressTemplate
            .replace("{index}", String(activeIndex + 1))
            .replace("{total}", String(total))
            .replace("{title}", items[activeIndex].title) : undefined}
      >
        <span className={styles.unitProgressFill} style={{ transform: `scaleX(${fill})` }} />
      </div>
    </nav>
  );
}
