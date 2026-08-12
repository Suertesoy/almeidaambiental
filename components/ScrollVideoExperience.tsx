"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SCROLL_STOPS, buildTimeline, getVideoTimeAt } from "../lib/scroll-timeline";
import HeroContent from "./HeroContent";
import { ChevronDownIcon } from "./icons";

const VIDEO_SRC = "/videos/Video_Almeida_15_seg.mp4";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function ScrollVideoExperience() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const [reducedMotion, setReducedMotion] = useState(false);
  const timeline = useRef(buildTimeline()).current;

  // Detecta prefers-reduced-motion antes da pintura, para minimizar troca visual.
  useLayoutEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const handleChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  // Controla o vídeo pelo scroll: só recalcula em resposta a eventos de scroll/resize,
  // throttlado a uma atualização por frame via requestAnimationFrame.
  useEffect(() => {
    if (reducedMotion) return;

    const wrapper = wrapperRef.current;
    const stage = stageRef.current;
    const video = videoRef.current;
    if (!wrapper || !stage || !video) return;

    let rafId = 0;
    let lastVideoTime = -1;

    const update = () => {
      rafId = 0;

      const wrapperRect = wrapper.getBoundingClientRect();
      const stageHeight = stage.getBoundingClientRect().height;
      const totalScrollable = Math.max(wrapperRect.height - stageHeight, 0);
      const scrolledPx = clamp(-wrapperRect.top, 0, totalScrollable);
      const progress = totalScrollable > 0 ? scrolledPx / totalScrollable : 0;
      const scrolledVh = progress * timeline.totalVh;

      const time = getVideoTimeAt(scrolledVh, timeline.checkpoints);
      if (video.readyState >= 1 && Math.abs(time - lastVideoTime) > 0.01) {
        video.currentTime = time;
        lastVideoTime = time;
      }

      const fadeStart = timeline.dwellVh * 0.6;
      const fadeEnd = timeline.dwellVh;
      const heroOpacity = clamp(1 - (scrolledVh - fadeStart) / Math.max(fadeEnd - fadeStart, 1), 0, 1);

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

    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    };

    update();
    video.addEventListener("loadedmetadata", update);
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      video.removeEventListener("loadedmetadata", update);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion, timeline]);

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
    <div
      ref={wrapperRef}
      className="scroll-track"
      style={{ height: `${100 + timeline.totalVh}svh` }}
    >
      <div ref={stageRef} className="scroll-stage">
        <video
          ref={videoRef}
          className="hero-video"
          src={VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        />
        <div className="hero-overlay" aria-hidden="true" />
        <div ref={heroRef} className="hero-content-layer">
          <HeroContent />
        </div>
        <div ref={indicatorRef} className="scroll-indicator" aria-hidden="true">
          <span>ROLE PARA BAIXO</span>
          <ChevronDownIcon />
        </div>
      </div>
      {SCROLL_STOPS.map((stop, index) => (
        <div
          key={stop.id}
          id={stop.id}
          className="scroll-anchor"
          style={{ top: `${timeline.anchorsVh[index]}svh` }}
        />
      ))}
    </div>
  );
}
