"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./equipment-model-viewer.module.css";
import { getChoreographyConfigs } from "../../lib/equipamentos-3d";
import type { Locale } from "../../lib/i18n/locale";

const EquipmentChoreographyCanvas = dynamic(() => import("./EquipmentChoreographyCanvas"), {
  ssr: false,
});

export type EquipmentChoreographyStageProps = {
  locale: Locale;
  variant?: "home" | "hero";
  paddingMultiplier?: number;
  className?: string;
};

/**
 * Apresentação coreografada compartilhada entre o capítulo Almeida Equipamentos
 * na Home e o Hero da página Almeida Equipamentos.
 *
 * - Um único canvas WebGL reutilizável para toda a sequência.
 * - Carrossel de 3 posições (anterior · destaque · próximo). Arrastar na
 *   horizontal gira o equipamento central; tocar num lateral o traz para o
 *   centro; setas do teclado navegam. A rolagem vertical segue livre
 *   (touch-action: pan-y).
 * - Com prefers-reduced-motion: apresenta apenas o poster estático inicial,
 *   sem rotação e sem troca automática.
 */
export default function EquipmentChoreographyStage({
  locale,
  variant = "home",
  paddingMultiplier = 1.0,
  className,
}: EquipmentChoreographyStageProps) {
  const configs = useMemo(() => getChoreographyConfigs(), []);
  const rootRef = useRef<HTMLDivElement>(null);

  const [shouldMount, setShouldMount] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [command, setCommand] = useState<{ seq: number; dir: -1 | 1 } | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || shouldMount) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldMount(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin: "260px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldMount]);

  const handleReady = useCallback(() => setIsReady(true), []);
  const handleError = useCallback(() => setHasError(true), []);
  const handleActiveChange = useCallback((index: number) => setActiveIndex(index), []);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      const dir = event.key === "ArrowRight" ? 1 : -1;
      setCommand((prev) => ({ seq: (prev?.seq ?? 0) + 1, dir }));
    }
  }, []);

  const current = configs[activeIndex] ?? configs[0];
  if (!current) return null;

  const showStaticOnly = reducedMotion || hasError;

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${styles.rootChoreography} ${variant === "home" ? styles.rootHome : ""} ${className ?? ""}`}
      role="region"
      aria-label={
        showStaticOnly
          ? current.label[locale]
          : `${current.label[locale]}. ${locale === "en" ? "Drag to rotate; left and right arrow keys switch equipment." : "Arraste para girar; setas esquerda e direita trocam o equipamento."}`
      }
      tabIndex={showStaticOnly ? undefined : 0}
      onKeyDown={showStaticOnly ? undefined : handleKeyDown}
    >
      {/* Poster inicial e fallback estático para reduced-motion ou ausência de WebGL */}
      <div
        className={`${styles.posterLayer} ${
          !showStaticOnly && isReady ? styles.posterLayerHidden : ""
        }`}
        aria-hidden={!showStaticOnly && isReady ? "true" : undefined}
      >
        <img
          src={configs[0].posterUrl}
          alt={configs[0].posterAlt[locale]}
          className={styles.posterImage}
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Canvas único compartilhado */}
      {shouldMount && !showStaticOnly && (
        <EquipmentChoreographyCanvas
          configs={configs}
          paddingMultiplier={paddingMultiplier}
          command={command}
          onReady={handleReady}
          onError={handleError}
          onActiveChange={handleActiveChange}
          className={`${styles.canvasChoreography} ${
            isReady ? styles.canvasChoreographyReady : ""
          }`}
        />
      )}

      {/* Legenda tipográfica discreta acompanhando o equipamento em destaque */}
      <div
        className={`${styles.choreographyCaption} ${
          !showStaticOnly && !isReady ? styles.choreographyCaptionHidden : ""
        }`}
        aria-live="polite"
      >
        <span className={styles.choreographyIndex}>
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
        <span>{current.displayName[locale]}</span>
      </div>
    </div>
  );
}
