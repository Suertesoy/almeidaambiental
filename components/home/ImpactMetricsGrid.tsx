"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Locale } from "../../lib/i18n/locale";
import {
  IMPACT_METRICS,
  IMPACT_TEXT,
  formatImpactNumber,
  getProjectedValue,
} from "../../lib/impact-projection";
import styles from "./home.module.css";

const COUNT_MS = 1400;
const TICK_MS = 250;
const A11Y_NOTE: Record<Locale, string> = {
  pt: "Estimativa acumulada, atualizada automaticamente com base nos dados operacionais de janeiro a setembro de 2026.",
  en: "Accumulated estimate, automatically updated based on operating data from January to September 2026.",
};

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** "ssr": 1ª renderização (servidor e cliente), determinística no valor oficial.
 *  "idle": montado, aguardando a seção entrar (parte de zero).
 *  "counting": count-up de entrada, alvo = valor projetado de cada frame.
 *  "live": valor projetado, recalculado a cada TICK_MS pelo relógio absoluto. */
type Phase = "ssr" | "idle" | "counting" | "live";

/**
 * Quatro indicadores de impacto: count-up de entrada que termina no valor
 * projetado do instante (sem salto) e depois segue vivo. O valor é sempre
 * derivado de Date.now() — nunca acumulado por tick — e o relógio pausa com
 * a aba oculta, recalculando ao voltar. Parte animada é aria-hidden; o texto
 * acessível é estático (valor oficial), então não há anúncios contínuos.
 */
export default function ImpactMetricsGrid({ locale, active }: { locale: Locale; active: boolean }) {
  const [phase, setPhase] = useState<Phase>("ssr");
  const [progress, setProgress] = useState(0);
  const [nowMs, setNowMs] = useState(0);
  const text = IMPACT_TEXT[locale];
  const noteId = useId();
  const startedRef = useRef(false);
  const phaseRef = useRef<Phase>("ssr");
  phaseRef.current = phase;

  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Pós-mount: reduced-motion vai direto ao valor projetado; senão parte de zero.
  useEffect(() => {
    if (reduced()) {
      setNowMs(Date.now());
      setPhase("live");
    } else {
      setPhase("idle");
    }
  }, []);

  // Entrada única: count-up cujo alvo é o valor projetado de cada frame.
  useEffect(() => {
    if (!active || startedRef.current || phaseRef.current !== "idle") return;
    startedRef.current = true;
    setPhase("counting");
    let rafId = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / COUNT_MS, 1);
      setNowMs(Date.now());
      if (t >= 1) {
        setPhase("live");
        return;
      }
      setProgress(easeOutCubic(t));
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [active, phase !== "ssr"]);

  // Relógio vivo: pausa com a aba oculta e recalcula na hora ao voltar.
  useEffect(() => {
    if (phase !== "live") return;
    let id = 0;
    const tick = () => setNowMs(Date.now());
    const start = () => {
      tick();
      id = window.setInterval(tick, TICK_MS);
    };
    const onVisibility = () => {
      window.clearInterval(id);
      if (!document.hidden) start();
    };
    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [phase]);

  return (
    <div className={styles.metricsGrid} role="group" aria-describedby={noteId}>
      {/* Descrição estável (não é live region): os números animados são
          aria-hidden, então leitores de tela nunca recebem um valor diferente
          do exibido nem anúncios a cada atualização. */}
      <span id={noteId} className="sr-only">
        {A11Y_NOTE[locale]}
      </span>
      {IMPACT_METRICS.map((metric) => {
        const { label, unit } = text[metric.id];
        const projected = phase === "ssr" ? metric.baseline : getProjectedValue(metric, nowMs);
        const value =
          phase === "idle" ? 0 : phase === "counting" ? projected * progress : projected;
        return (
          <div key={metric.id} className={styles.metricItem}>
            {/* Número e unidade formam um conjunto só (mesma linha de base). */}
            <span className={styles.metricValue}>
              <span aria-hidden="true" className={styles.metricNumber}>
                {formatImpactNumber(metric, value, locale)}
              </span>
              {unit && (
                <span aria-hidden="true" className={styles.metricUnit}>
                  {unit}
                </span>
              )}
            </span>
            <span className={styles.metricLabel}>{label}</span>
          </div>
        );
      })}
    </div>
  );
}
