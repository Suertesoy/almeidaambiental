"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export type MetricFormat = "integer" | "decimal2";

const COUNT_MS = 1400;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function formatMetric(value: number, format: MetricFormat): string {
  if (format === "decimal2") {
    return value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return Math.round(value).toLocaleString("pt-BR");
}

/** Fica `true` uma única vez, sem resetar, assim que qualquer um dos
 *  elementos observados cruza o threshold — dispara o count-up da dobra 9
 *  quando ela se torna a dobra ativa (decoupled da engine de scroll/vídeo:
 *  observa a própria seção, não a posição contínua do vídeo). */
export function useEnterOnce(refs: Array<RefObject<HTMLElement | null>>, threshold = 0.5): boolean {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (entered) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entered]);

  return entered;
}

/**
 * Número da dobra 9 (impacto) com contagem animada (easeOutCubic, ~1.4s)
 * quando `active` vira true — dispara uma única vez, o chamador não
 * reseta `active` ao subir/descer de novo. Termina exatamente em
 * `display`. Com prefers-reduced-motion, mostra `display` direto, sem
 * contagem. `display` também é o texto lido por leitor de tela (o span
 * animado é aria-hidden, para não gerar dezenas de anúncios).
 */
export function CountUpMetric({
  target,
  format,
  suffix = "",
  display,
  active,
}: {
  target: number;
  format: MetricFormat;
  suffix?: string;
  display: string;
  active: boolean;
}) {
  const [visibleText, setVisibleText] = useState(display);
  const startedRef = useRef(false);

  // Após o mount no cliente, se não houver reduced-motion, parte de zero —
  // mantém o SSR/hidratação consistente (display) e evita depender de
  // matchMedia durante a renderização do servidor.
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisibleText(formatMetric(0, format) + suffix);
    }
  }, [format, suffix]);

  useEffect(() => {
    if (!active || startedRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    startedRef.current = true;

    let rafId = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / COUNT_MS, 1);
      if (t >= 1) {
        setVisibleText(display);
        return;
      }
      setVisibleText(formatMetric(target * easeOutCubic(t), format) + suffix);
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [active, target, format, suffix, display]);

  return (
    <>
      <span aria-hidden="true">{visibleText}</span>
      <span className="sr-only">{display}</span>
    </>
  );
}
