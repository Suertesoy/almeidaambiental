"use client";

import { useEffect, useRef } from "react";

/**
 * Progresso de scroll (0–1) de um segmento da linha do tempo, escrito
 * direto como custom property CSS no próprio nó — sem re-render React a
 * cada frame. Um listener passivo por capítulo (4 no total na página
 * inteira), sempre com o trabalho de fato gated por rAF, nunca reflow por
 * scroll event. Cada capítulo tem seu próprio segmento contíguo; como eles
 * ficam um em seguida do outro no fluxo normal do documento, a linha lê
 * como um traço único mesmo sendo várias `<div>` — não um decorativo, é o
 * eixo narrativo da página (Seção 29 da tarefa).
 */
export function useLineProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.style.setProperty("--line-progress", "1");
      return;
    }

    let ticking = false;

    const update = () => {
      ticking = false;
      const rect = node.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const total = rect.height + viewportH * 0.55;
      const traveled = viewportH * 0.8 - rect.top;
      const progress = Math.min(1, Math.max(0, traveled / total));
      node.style.setProperty("--line-progress", progress.toFixed(4));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return ref;
}
