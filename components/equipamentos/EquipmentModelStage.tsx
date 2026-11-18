"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./equipment-model-viewer.module.css";
import type { Equipment3DConfig } from "../../lib/equipamentos-3d";
import type { Locale } from "../../lib/i18n/locale";

const EquipmentModelCanvas = dynamic(() => import("./EquipmentModelCanvas"), {
  ssr: false,
});

export type EquipmentModelStageProps = {
  config: Equipment3DConfig;
  locale: Locale;
  /** "home" | "catalog" | "gallery" para ajustar respiro. */
  variant?: "home" | "catalog" | "gallery";
  /** Rotação inicial lenta e controlada (para ao menor toque). */
  autoRotate?: boolean;
  /** Classe extra opcional para o wrapper raiz. */
  className?: string;
};

const COPY = {
  pt: {
    controlsHelp: "Use o mouse, toque ou setas do teclado para girar e R para reiniciar a vista.",
  },
  en: {
    controlsHelp: "Use mouse, touch, or arrow keys to rotate and R to reset view.",
  },
} as const;

/**
 * Visualizador 3D interativo simplificado para o catálogo e detalhe do produto:
 * sem botões ou avisos escritos; descoberta natural via cursor/toque,
 * acessibilidade completa por teclado e fallback automático com poster.
 */
export default function EquipmentModelStage({
  config,
  locale,
  variant = "catalog",
  autoRotate = false,
  className,
}: EquipmentModelStageProps) {
  const t = COPY[locale];
  const rootRef = useRef<HTMLDivElement>(null);

  const [shouldMountCanvas, setShouldMountCanvas] = useState(false);
  const [readyKey, setReadyKey] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [resetSignal, setResetSignal] = useState(0);
  const [keyboardCommand, setKeyboardCommand] = useState<{
    seq: number;
    dAz: number;
    dEl: number;
  } | null>(null);

  const isReady = readyKey === config.glbUrl;
  const hasError = errorKey === config.glbUrl;

  useEffect(() => {
    setResetSignal(0);
  }, [config.glbUrl]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || shouldMountCanvas) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldMountCanvas(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldMountCanvas(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldMountCanvas]);

  const handleReady = useCallback(() => {
    setReadyKey(config.glbUrl);
  }, [config.glbUrl]);

  const handleError = useCallback(() => {
    setErrorKey(config.glbUrl);
  }, [config.glbUrl]);

  const handleUserInteract = useCallback(() => {}, []);

  const handleReset = useCallback(() => {
    setResetSignal((n) => n + 1);
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (hasError || !isReady) return;
      const step = 0.16;
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          setKeyboardCommand((prev) => ({ seq: (prev?.seq ?? 0) + 1, dAz: step, dEl: 0 }));
          break;
        case "ArrowRight":
          event.preventDefault();
          setKeyboardCommand((prev) => ({ seq: (prev?.seq ?? 0) + 1, dAz: -step, dEl: 0 }));
          break;
        case "ArrowUp":
          event.preventDefault();
          setKeyboardCommand((prev) => ({ seq: (prev?.seq ?? 0) + 1, dAz: 0, dEl: -step * 0.7 }));
          break;
        case "ArrowDown":
          event.preventDefault();
          setKeyboardCommand((prev) => ({ seq: (prev?.seq ?? 0) + 1, dAz: 0, dEl: step * 0.7 }));
          break;
        case "r":
        case "R":
        case "Home":
          event.preventDefault();
          handleReset();
          break;
      }
    },
    [hasError, isReady, handleReset]
  );

  const variantClass =
    variant === "home"
      ? styles.rootHome
      : variant === "catalog"
        ? styles.rootCatalog
        : "";

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${variantClass} ${className ?? ""}`}
      tabIndex={!hasError ? 0 : undefined}
      role="region"
      aria-label={`${config.label[locale]}. ${t.controlsHelp}`}
      onKeyDown={handleKeyDown}
    >
      {/* Poster estático imediato e fallback automático */}
      <div
        className={`${styles.posterLayer} ${
          !hasError && isReady ? styles.posterLayerHidden : ""
        }`}
        aria-hidden={!hasError && isReady ? "true" : undefined}
      >
        <img
          src={config.posterUrl}
          alt={config.posterAlt[locale]}
          className={styles.posterImage}
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Canvas 3D carregado sob demanda */}
      {shouldMountCanvas && !hasError && (
        <EquipmentModelCanvas
          key={config.glbUrl}
          config={config}
          autoRotate={autoRotate}
          resetSignal={resetSignal}
          keyboardCommand={keyboardCommand}
          onReady={handleReady}
          onError={handleError}
          onUserInteract={handleUserInteract}
          className={`${styles.canvasLayer} ${isReady ? styles.canvasLayerReady : ""}`}
        />
      )}

      {/* Identificação discreta quando o modelo representa uma variante específica */}
      {config.modelBadge && (
        <span className={styles.modelBadge}>{config.modelBadge}</span>
      )}
    </div>
  );
}
