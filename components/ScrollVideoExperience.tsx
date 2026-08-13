"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SCROLL_STOPS, getVideoTimeForPosition } from "../lib/scroll-timeline";
import HeroContent from "./HeroContent";
import DevSectionMarker from "./DevSectionMarker";
import { ChevronDownIcon } from "./icons";

const VIDEO_SRC = "/videos/Video_Almeida_15_seg.mp4";

/** Tempo parado (ms) sem eventos de scroll até corrigir o vídeo para o
 *  tempo exato da dobra mais próxima, evitando drift de arredondamento. */
const IDLE_CORRECTION_MS = 140;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function ScrollVideoExperience() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const markerRefs = useRef<Array<HTMLDivElement | null>>([]);

  const [reducedMotion, setReducedMotion] = useState(false);

  // Detecta prefers-reduced-motion antes da pintura, para minimizar troca visual.
  useLayoutEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const handleChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  // Inicializa o decoder de vídeo (principalmente em mobile): sem um play()
  // real, ainda que muted/inline e pausado logo em seguida, alguns
  // navegadores mobile nunca chegam a desenhar o primeiro frame nem os
  // seeks seguintes — só o overlay verde fica visível.
  useEffect(() => {
    if (reducedMotion) return;
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;
    const primeDecoder = () => {
      if (cancelled) return;
      video.muted = true;
      const playAttempt = video.play();
      if (playAttempt && typeof playAttempt.then === "function") {
        playAttempt.then(() => !cancelled && video.pause()).catch(() => {});
      }
    };

    if (video.readyState >= 2) {
      primeDecoder();
    } else {
      video.addEventListener("loadeddata", primeDecoder, { once: true });
    }

    return () => {
      cancelled = true;
      video.removeEventListener("loadeddata", primeDecoder);
    };
  }, [reducedMotion]);

  // Trava de intenção para o mouse/trackpad (wheel): em testes, uma rolagem
  // de wheel muito rápida e sustentada conseguia, em alguns casos, atravessar
  // mais de uma dobra mesmo com scroll-snap-stop: always. Esta trava garante
  // que cada gesto de wheel avance no máximo uma dobra, deixando a rolagem
  // real acontecer via scrollIntoView (nativo, suave) e ignorando o wheel
  // enquanto essa transição ainda está em andamento. Não intercepta toque:
  // no mobile, o CSS Scroll Snap nativo já resolve isso sozinho e continua
  // permitindo o uso natural do scroll.
  useEffect(() => {
    if (reducedMotion) return;

    let isNavigating = false;
    let unlockTimer: ReturnType<typeof setTimeout> | undefined;

    const unlock = () => {
      isNavigating = false;
      if (unlockTimer) clearTimeout(unlockTimer);
      window.removeEventListener("scrollend", unlock);
    };

    const onWheel = (event: WheelEvent) => {
      if (isNavigating) {
        event.preventDefault();
        return;
      }

      const direction = event.deltaY > 0 ? 1 : event.deltaY < 0 ? -1 : 0;
      if (direction === 0) return;

      const sectionHeight =
        sectionRefs.current[0]?.getBoundingClientRect().height || window.innerHeight;
      const currentIndex = clamp(
        Math.round(window.scrollY / sectionHeight),
        0,
        SCROLL_STOPS.length - 1
      );
      const targetIndex = clamp(currentIndex + direction, 0, SCROLL_STOPS.length - 1);
      if (targetIndex === currentIndex) return;

      const targetSection = sectionRefs.current[targetIndex];
      if (!targetSection) return;

      event.preventDefault();
      isNavigating = true;
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });

      window.addEventListener("scrollend", unlock, { once: true });
      unlockTimer = setTimeout(unlock, 1200);
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scrollend", unlock);
      if (unlockTimer) clearTimeout(unlockTimer);
    };
  }, [reducedMotion]);

  // Controla o vídeo e o encaixe visual das dobras a partir do scroll.
  // O CSS (scroll-snap-type: y mandatory + scroll-snap-stop: always em cada
  // dobra) garante o encaixe visual; a trava de wheel acima garante uma
  // dobra por gesto no mouse/trackpad; este efeito só reage à posição de
  // scroll resultante, sem interceptar toque.
  useEffect(() => {
    if (reducedMotion) return;

    const video = videoRef.current;
    if (!video) return;

    let rafId = 0;
    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    let sectionHeight = window.innerHeight;
    let lastVideoTime = -1;

    const measureSectionHeight = () => {
      const first = sectionRefs.current[0];
      sectionHeight = first ? first.getBoundingClientRect().height : window.innerHeight;
    };

    const setVideoTime = (time: number) => {
      if (video.readyState >= 1 && Math.abs(time - lastVideoTime) > 0.005) {
        video.currentTime = time;
        lastVideoTime = time;
      }
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

    const applyMarkerOpacity = (continuousPosition: number) => {
      markerRefs.current.forEach((el, i) => {
        if (!el) return;
        // Marcador i corresponde à dobra (i + 2), ancorada na posição (i + 1).
        const distance = Math.abs(continuousPosition - (i + 1));
        el.style.opacity = String(clamp(1 - distance, 0, 1));
      });
    };

    const scheduleIdleCorrection = (continuousPosition: number) => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        const nearestIndex = clamp(Math.round(continuousPosition), 0, SCROLL_STOPS.length - 1);
        setVideoTime(SCROLL_STOPS[nearestIndex].time);
      }, IDLE_CORRECTION_MS);
    };

    const update = () => {
      rafId = 0;
      if (sectionHeight <= 0) measureSectionHeight();

      const continuousPosition = clamp(window.scrollY / sectionHeight, 0, SCROLL_STOPS.length - 1);

      setVideoTime(getVideoTimeForPosition(continuousPosition));
      applyHeroOpacity(continuousPosition);
      applyMarkerOpacity(continuousPosition);
      scheduleIdleCorrection(continuousPosition);
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
    video.addEventListener("loadedmetadata", update);
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      video.removeEventListener("loadedmetadata", update);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onResize);
      if (rafId) cancelAnimationFrame(rafId);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section className="hero-static" aria-label="Grupo Almeida">
        <video
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

        {SCROLL_STOPS.slice(1).map((stop, i) => (
          <section
            key={stop.id}
            id={stop.id}
            className="snap-section"
            ref={(el) => {
              sectionRefs.current[i + 1] = el;
            }}
          >
            <DevSectionMarker
              ref={(el) => {
                markerRefs.current[i] = el;
              }}
              label={`DOBRA ${String(i + 2).padStart(2, "0")}`}
              time={stop.time}
            />
          </section>
        ))}
      </div>
    </>
  );
}
