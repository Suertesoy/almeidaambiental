"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { SCROLL_STOPS } from "../lib/scroll-timeline";
import HeroContent from "./HeroContent";
import {
  Section02Content,
  Section03Content,
  Section04Content,
  Section05Content,
  Section06Content,
  Section07Content,
  Section08Content,
  Section09Content,
} from "./HomeSections";
import { ChevronDownIcon } from "./icons";

/** Conteúdo das dobras 2 a 9, na mesma ordem de SCROLL_STOPS.slice(1). */
const SECTION_CONTENT = [
  Section02Content,
  Section03Content,
  Section04Content,
  Section05Content,
  Section06Content,
  Section07Content,
  Section08Content,
  Section09Content,
];

const VIDEO_SRC = "/videos/Video_Almeida_15_seg.mp4";

/** Acima deste tempo real de trecho (segundos), a descida usa playbackRate
 *  maior que 1x para não ficar lenta demais — sempre limitado a
 *  MAX_PLAYBACK_RATE, para preservar a sensação de vídeo real em vez de um
 *  salto. Trechos mais curtos que isso tocam na velocidade natural (1x). */
const MAX_TRANSITION_SECONDS = 1.8;
const MAX_PLAYBACK_RATE = 2;

/** Duração (ms) da interpolação de currentTime usada na subida, já que
 *  <video> não tem reprodução reversa nativa confiável. */
const BACKWARD_DURATION_MIN_MS = 320;
const BACKWARD_DURATION_MAX_MS = 900;
const BACKWARD_MS_PER_SECOND = 260;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Descida: reprodução sequencial real do próprio <video> (play → observa
 *  currentTime via rAF → pausa e corrige exatamente no tempo alvo). */
function playForward(
  video: HTMLVideoElement,
  fromTime: number,
  toTime: number,
  isCancelled: () => boolean
): Promise<void> {
  return new Promise((resolve) => {
    const duration = Math.max(toTime - fromTime, 0);
    const rate =
      duration > MAX_TRANSITION_SECONDS
        ? Math.min(duration / MAX_TRANSITION_SECONDS, MAX_PLAYBACK_RATE)
        : 1;

    const finish = () => {
      video.pause();
      video.currentTime = toTime;
      video.playbackRate = 1;
      resolve();
    };

    if (Math.abs(video.currentTime - fromTime) > 0.03) {
      video.currentTime = fromTime;
    }
    video.playbackRate = rate;

    let rafId = 0;
    const watch = () => {
      if (isCancelled()) {
        cancelAnimationFrame(rafId);
        return;
      }
      if (video.currentTime >= toTime - 0.01 || video.ended) {
        finish();
        return;
      }
      rafId = requestAnimationFrame(watch);
    };

    const playAttempt = video.play();
    if (playAttempt && typeof playAttempt.then === "function") {
      playAttempt
        .then(() => {
          if (isCancelled()) return;
          rafId = requestAnimationFrame(watch);
        })
        .catch((error) => {
          // Não silenciar: o motivo real da rejeição precisa aparecer no console.
          console.warn("[ScrollVideoExperience] video.play() rejeitado na descida:", error);
          finish();
        });
    } else {
      rafId = requestAnimationFrame(watch);
    }
  });
}

/** Subida: sem reprodução reversa nativa, interpola currentTime via rAF
 *  (vídeo pausado) com easing suave até o tempo alvo. */
function interpolateBackward(
  video: HTMLVideoElement,
  fromTime: number,
  toTime: number,
  isCancelled: () => boolean
): Promise<void> {
  return new Promise((resolve) => {
    video.pause();
    const distance = Math.abs(toTime - fromTime);
    const durationMs = clamp(
      distance * BACKWARD_MS_PER_SECOND,
      BACKWARD_DURATION_MIN_MS,
      BACKWARD_DURATION_MAX_MS
    );
    const startTimestamp = performance.now();

    const step = (now: number) => {
      if (isCancelled()) return;
      const progress = clamp((now - startTimestamp) / durationMs, 0, 1);
      const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      video.currentTime = fromTime + (toTime - fromTime) * eased;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        video.currentTime = toTime;
        resolve();
      }
    };

    requestAnimationFrame(step);
  });
}

export default function ScrollVideoExperience() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  /** Dobra cujo tempo de vídeo já está confirmado (reprodução concluída e
   *  currentTime corrigido). Fonte de verdade da "dobra atual" do vídeo —
   *  independente da posição de scroll, que só decide o próximo destino. */
  const videoStopIndexRef = useRef(0);
  /** Trava única: enquanto uma transição de vídeo está em andamento, nenhum
   *  novo destino é aceito (nem por wheel, nem por scroll/touch). */
  const isTransitioningRef = useRef(false);
  const cancelActiveTransitionRef = useRef<(() => void) | null>(null);

  const [reducedMotion, setReducedMotion] = useState(false);

  // Detecta prefers-reduced-motion antes da pintura, para minimizar troca visual.
  useLayoutEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const handleChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  // Move o vídeo até a dobra "targetIndex", tocando para frente (descida,
  // reprodução real) ou interpolando para trás (subida). Compartilhada pelo
  // wheel handler (desktop) e pela detecção de cruzamento de scroll abaixo
  // (touch/mobile e qualquer outra navegação, ex.: link "#section-02").
  const transitionTo = useCallback((targetIndex: number) => {
    const video = videoRef.current;
    if (!video) return;

    const fromIndex = videoStopIndexRef.current;
    if (targetIndex === fromIndex || isTransitioningRef.current) return;

    isTransitioningRef.current = true;
    let cancelled = false;
    const isCancelled = () => cancelled;
    cancelActiveTransitionRef.current = () => {
      cancelled = true;
    };

    const fromTime = SCROLL_STOPS[fromIndex].time;
    const toTime = SCROLL_STOPS[targetIndex].time;
    const run = targetIndex > fromIndex ? playForward : interpolateBackward;

    run(video, fromTime, toTime, isCancelled).then(() => {
      if (!cancelled) {
        videoStopIndexRef.current = targetIndex;
      }
      isTransitioningRef.current = false;
      cancelActiveTransitionRef.current = null;
    });
  }, []);

  useEffect(() => {
    return () => {
      cancelActiveTransitionRef.current?.();
    };
  }, []);

  // Inicializa o decoder de vídeo (essencial em mobile): sem um play() real
  // confirmado, alguns navegadores mobile nunca desenham o primeiro frame
  // nem os seeks seguintes — só o overlay verde fica visível. `loadeddata`
  // sozinho não é suficiente: em conexões móveis/Data Saver o navegador pode
  // nunca carregar dados do vídeo sem uma interação real do usuário, então
  // também iniciamos a partir do primeiro toque/scroll/tecla genuíno. A
  // reprodução é pausada assim que confirmada, sem parecer autoplay.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;
    let primed = false;
    const interactionEvents: Array<keyof WindowEventMap> = [
      "touchstart",
      "pointerdown",
      "wheel",
      "keydown",
      "scroll",
    ];

    const removeInteractionListeners = () => {
      interactionEvents.forEach((type) => window.removeEventListener(type, attemptPrime));
    };

    function attemptPrime() {
      if (cancelled || primed || !video) return;
      const restoreTime = video.currentTime;
      video.muted = true;
      const playAttempt = video.play();
      if (playAttempt && typeof playAttempt.then === "function") {
        playAttempt
          .then(() => {
            if (cancelled) return;
            primed = true;
            video.pause();
            video.currentTime = restoreTime;
            removeInteractionListeners();
          })
          .catch((error) => {
            // Não silenciar: precisamos do motivo real da rejeição em desenvolvimento.
            console.warn("[ScrollVideoExperience] video.play() rejeitado ao inicializar o decoder:", error);
          });
      }
    }

    if (video.readyState >= 2) {
      attemptPrime();
    } else {
      video.addEventListener("loadeddata", attemptPrime, { once: true });
    }
    interactionEvents.forEach((type) =>
      window.addEventListener(type, attemptPrime, { once: true, passive: true })
    );

    return () => {
      cancelled = true;
      video.removeEventListener("loadeddata", attemptPrime);
      removeInteractionListeners();
    };
  }, [reducedMotion]);

  // Trava de intenção para o mouse/trackpad (wheel): garante que cada gesto
  // avance no máximo uma dobra por vez. A página se move via scrollIntoView
  // (nativo, suave) e o vídeo é disparado no mesmo instante (transitionTo),
  // para que os dois se movam juntos em vez do conteúdo aparecer só depois
  // do vídeo terminar. Não intercepta toque: no mobile, o CSS Scroll Snap
  // nativo resolve isso sozinho e o vídeo é disparado pela detecção de
  // cruzamento no efeito abaixo.
  useEffect(() => {
    if (reducedMotion) return;

    const onWheel = (event: WheelEvent) => {
      if (isTransitioningRef.current) {
        event.preventDefault();
        return;
      }

      const direction = event.deltaY > 0 ? 1 : event.deltaY < 0 ? -1 : 0;
      if (direction === 0) return;

      const currentIndex = videoStopIndexRef.current;
      const targetIndex = clamp(currentIndex + direction, 0, SCROLL_STOPS.length - 1);
      if (targetIndex === currentIndex) return;

      const targetSection = sectionRefs.current[targetIndex];
      if (!targetSection) return;

      event.preventDefault();
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      transitionTo(targetIndex);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [reducedMotion, transitionTo]);

  // Fade discreto do conteúdo de cada dobra (posição contínua de scroll) +
  // gatilho do vídeo para qualquer navegação não coberta pelo wheel acima
  // (touch/swipe no mobile, teclado, links âncora como "#section-02"): ao
  // cruzar a metade do caminho até a dobra vizinha, dispara a mesma
  // transição de vídeo, sempre uma dobra por vez.
  useEffect(() => {
    if (reducedMotion) return;

    let rafId = 0;
    let sectionHeight = window.innerHeight;

    const measureSectionHeight = () => {
      const first = sectionRefs.current[0];
      sectionHeight = first ? first.getBoundingClientRect().height : window.innerHeight;
    };

    const applyHeroOpacity = (continuousPosition: number) => {
      // Conteúdo da dobra 1 permanece visível na maior parte da transição
      // e só se apaga no último trecho, ao se aproximar da dobra 2.
      const heroOpacity = clamp(1 - (continuousPosition - 0.6) / 0.4, 0, 1);
      if (heroRef.current) {
        heroRef.current.style.opacity = String(heroOpacity);
        const isHidden = heroOpacity <= 0.02;
        heroRef.current.style.pointerEvents = isHidden ? "none" : "auto";
        if (isHidden) heroRef.current.setAttribute("inert", "");
        else heroRef.current.removeAttribute("inert");
      }
      if (indicatorRef.current) {
        indicatorRef.current.style.opacity = String(heroOpacity);
      }
    };

    const applyContentOpacity = (continuousPosition: number) => {
      contentRefs.current.forEach((el, i) => {
        if (!el) return;
        // Conteúdo i corresponde à dobra (i + 2), ancorada na posição (i + 1).
        const distance = Math.abs(continuousPosition - (i + 1));
        const opacity = clamp(1 - distance, 0, 1);
        el.style.opacity = String(opacity);
        const isHidden = opacity <= 0.02;
        el.style.pointerEvents = isHidden ? "none" : "auto";
        if (isHidden) el.setAttribute("inert", "");
        else el.removeAttribute("inert");
      });
    };

    const update = () => {
      rafId = 0;
      if (sectionHeight <= 0) measureSectionHeight();

      const continuousPosition = clamp(window.scrollY / sectionHeight, 0, SCROLL_STOPS.length - 1);

      applyHeroOpacity(continuousPosition);
      applyContentOpacity(continuousPosition);

      if (!isTransitioningRef.current) {
        const current = videoStopIndexRef.current;
        const rawTarget = clamp(Math.round(continuousPosition), 0, SCROLL_STOPS.length - 1);
        if (rawTarget !== current) {
          // Nunca mais de uma dobra por vez, mesmo que o scroll bruto sugira
          // um salto maior (ex.: fling muito rápido no touch).
          transitionTo(current + Math.sign(rawTarget - current));
        }
      }
    };

    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    };

    const onResize = () => {
      measureSectionHeight();
      onScrollOrResize();
    };

    measureSectionHeight();
    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion, transitionTo]);

  if (reducedMotion) {
    return (
      <section className="hero-static" aria-label="Grupo Almeida">
        <video
          ref={videoRef}
          className="hero-video"
          src={VIDEO_SRC}
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-content-layer">
          <HeroContent />
        </div>
        {SCROLL_STOPS.slice(1).map((stop) => (
          <div key={stop.id} id={stop.id} className="scroll-anchor-static" />
        ))}
      </section>
    );
  }

  return (
    <>
      <div className="video-layer" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero-video"
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
        />
        <div className="hero-overlay" />
      </div>

      <div className="snap-container">
        <section
          id={SCROLL_STOPS[0].id}
          className="snap-section snap-section-hero"
          ref={(el) => {
            sectionRefs.current[0] = el;
          }}
        >
          <div ref={heroRef} className="hero-content-layer">
            <HeroContent />
          </div>
          <div ref={indicatorRef} className="scroll-indicator" aria-hidden="true">
            <span>ROLE PARA BAIXO</span>
            <ChevronDownIcon />
          </div>
        </section>

        {SCROLL_STOPS.slice(1).map((stop, i) => {
          const SectionContent = SECTION_CONTENT[i];
          return (
            <section
              key={stop.id}
              id={stop.id}
              className="snap-section"
              ref={(el) => {
                sectionRefs.current[i + 1] = el;
              }}
            >
              <div
                className="hero-content-layer"
                ref={(el) => {
                  contentRefs.current[i] = el;
                }}
              >
                <SectionContent />
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
