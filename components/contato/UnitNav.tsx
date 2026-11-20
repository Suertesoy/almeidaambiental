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
  // `pos` = índice da unidade atual + fração já percorrida dentro dela (0–N).
  // -1 = a primeira unidade ainda não alcançou a barra.
  const [pos, setPos] = useState(-1);

  const total = items.length;

  const update = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;
    const header = document.querySelector<HTMLElement>(".site-header");
    const anchorLine = (header?.getBoundingClientRect().bottom ?? 0) + nav.offsetHeight + 3;

    const rects = items.map((item) => document.getElementById(item.id)?.getBoundingClientRect());
    if (rects.some((r) => !r)) return;

    let next = -1;
    if (rects[0]!.top <= anchorLine) {
      let i = 0;
      while (i < total - 1 && rects[i + 1]!.top <= anchorLine) i += 1;
      const r = rects[i]!;
      // A última unidade "termina" quando seu fim encosta no rodapé da tela
      // (ela não consegue rolar além disso), então o denominador é menor.
      const denom = Math.max(1, i === total - 1 ? r.height - (window.innerHeight - anchorLine) : r.height);
      next = i + Math.min(1, Math.max(0, (anchorLine - r.top) / denom));
    }
    setPos((prev) => (Math.abs(prev - next) < 0.001 ? prev : next));
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

  const reached = pos >= 0;
  const activeIndex = reached ? Math.min(total - 1, Math.floor(pos)) : 0;
  const fill = reached ? Math.min(1, pos / total) : 0;

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
        <ul className={styles.unitNavList}>
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
        aria-valuemax={100}
        aria-valuenow={Math.round(fill * 100)}
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
