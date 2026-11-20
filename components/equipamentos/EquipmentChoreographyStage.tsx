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
 * - Coreografia AUTOMÁTICA de 3 posições (anterior · destaque · próximo), na
 *   mesma escala relativa dos modelos. Sem rotação manual, sem toque e sem
 *   teclado: é uma apresentação visual, e a página rola livremente por cima
 *   dela. A rotação interativa pertence ao catálogo técnico
 *   (EquipmentModelStage), que é outro componente.
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

  const current = configs[activeIndex] ?? configs[0];
  if (!current) return null;

  const showStaticOnly = reducedMotion || hasError;

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${styles.rootChoreography} ${variant === "home" ? styles.rootHome : ""} ${className ?? ""}`}
      role="region"
      aria-label={
        locale === "en"
          ? `Equipment showcase: ${current.displayName[locale]}`
          : `Apresentação dos equipamentos: ${current.displayName[locale]}`
      }
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
          onReady={handleReady}
          onError={handleError}
          onActiveChange={handleActiveChange}
          className={`${styles.canvasChoreography} ${
            isReady ? styles.canvasChoreographyReady : ""
          }`}
        />
      )}

      {/* Legenda tipográfica discreta acompanhando o equipamento em destaque */}
      {/* No hero a legenda visual é removida (apresentação limpa dos modelos);
          o nome do equipamento em destaque segue disponível para leitores de tela. */}
      <div
        className={`${styles.choreographyCaption} ${variant === "hero" ? styles.srOnly : ""} ${
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
