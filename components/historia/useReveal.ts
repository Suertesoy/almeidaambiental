"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Mesma técnica de components/shared/Reveal.tsx (IntersectionObserver,
 * dispara uma única vez), mas devolvendo `ref`/`active` em vez de embrulhar
 * em componente — usada pelos marcadores de ano da timeline de /historia,
 * que precisam aplicar o estado "ativo" tanto ao texto quanto ao marcador
 * na régua, dois elementos irmãos que não cabem dentro de um único wrapper.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.35) {
  const ref = useRef<T>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, active };
}
