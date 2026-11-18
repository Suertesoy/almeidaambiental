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
  /** "home" | "catalog" | "gallery" para ajustar respiro do HUD. */
  variant?: "home" | "catalog" | "gallery";
  /** Rotação inicial lenta e controlada (para ao menor toque). */
  autoRotate?: boolean;
  /** Classe extra opcional para o wrapper raiz. */
  className?: string;
};

const COPY = {
  pt: {
    dragHint: "Arraste para explorar",
    loading: "Carregando 3D",
    resetView: "Vista inicial",
    resetViewAria: "Retornar à orientação inicial do equipamento",
    staticMode: "Imagem",
    staticModeAria: "Alternar para visualização estática",
    interactiveMode: "Ver em 3D",
    interactiveModeAria: "Ativar visualização 3D interativa",
    controlsHelp: "Use o mouse, toque ou setas do teclado para girar e R para reiniciar a vista.",
  },
  en: {
    dragHint: "Drag to explore",
    loading: "Loading 3D",
    resetView: "Reset view",
    resetViewAria: "Return equipment to initial orientation",
    staticMode: "Image",
    staticModeAria: "Switch to static image view",
    interactiveMode: "View in 3D",
    interactiveModeAria: "Enable interactive 3D view",
    controlsHelp: "Use mouse, touch, or arrow keys to rotate and R to reset view.",
  },
} as const;

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
  const [staticMode, setStaticMode] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);
  const [keyboardCommand, setKeyboardCommand] = useState<{
    seq: number;
    dAz: number;
    dEl: number;
  } | null>(null);

  const isReady = readyKey === config.glbUrl;
  const hasError = errorKey === config.glbUrl;
  const showInteractive = !staticMode && !hasError;

  // Reinicia estados visuais quando troca de equipamento
  useEffect(() => {
    setInteracted(false);
    setResetSignal(0);
  }, [config.glbUrl]);

  // Só inicializa o canvas 3D quando o palco se aproxima da viewport
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

  const handleUserInteract = useCallback(() => {
    setInteracted(true);
  }, []);

  const handleReset = useCallback(() => {
    setResetSignal((n) => n + 1);
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!showInteractive || !isReady) return;
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
    [showInteractive, isReady, handleReset]
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
      tabIndex={showInteractive ? 0 : undefined}
      role="region"
      aria-label={`${config.label[locale]}. ${t.controlsHelp}`}
      onKeyDown={handleKeyDown}
    >
      {/* Poster estático imediato antes do WebGL e como alternativa estática */}
      <div
        className={`${styles.posterLayer} ${
          showInteractive && isReady ? styles.posterLayerHidden : ""
        }`}
        aria-hidden={showInteractive && isReady ? "true" : undefined}
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
      {shouldMountCanvas && showInteractive && (
        <EquipmentModelCanvas
          key={config.glbUrl}
          config={config}
          autoRotate={autoRotate}
          paused={staticMode}
          resetSignal={resetSignal}
          keyboardCommand={keyboardCommand}
          onReady={handleReady}
          onError={handleError}
          onUserInteract={handleUserInteract}
          className={`${styles.canvasLayer} ${isReady ? styles.canvasLayerReady : ""}`}
        />
      )}

      {/* Indicador discreto de carregamento */}
      {shouldMountCanvas && showInteractive && !isReady && (
        <div className={styles.loadingPill} aria-live="polite">
          <span className={styles.loadingDot} aria-hidden="true" />
          <span>{t.loading}</span>
        </div>
      )}

      {/* HUD discreto: dica + controles acessíveis */}
      <div className={styles.hud}>
        {showInteractive && (
          <span className={`${styles.hint} ${interacted ? styles.hintFaded : ""}`} aria-hidden="true">
            <OrbitIcon />
            <span>{t.dragHint}</span>
          </span>
        )}

        <div className={styles.controls}>
          {showInteractive && isReady && (
            <button
              type="button"
              className={styles.controlBtn}
              onClick={handleReset}
              aria-label={t.resetViewAria}
            >
              <ResetIcon />
              <span>{t.resetView}</span>
            </button>
          )}

          {!hasError && (
            <button
              type="button"
              className={styles.controlBtn}
              onClick={() => setStaticMode((prev) => !prev)}
              aria-pressed={staticMode}
              aria-label={staticMode ? t.interactiveModeAria : t.staticModeAria}
            >
              <span>{staticMode ? t.interactiveMode : t.staticMode}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function OrbitIcon() {
  return (
    <svg
      className={styles.controlBtnIcon}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <ellipse cx="8" cy="8" rx="6.2" ry="2.8" />
      <path d="M5.6 10.6 3.9 10.7 4.7 12.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg
      className={styles.controlBtnIcon}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M3.2 7.2A5 5 0 1 1 4.5 11.4" strokeLinecap="round" />
      <path d="M3.2 3.8v3.5h3.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
