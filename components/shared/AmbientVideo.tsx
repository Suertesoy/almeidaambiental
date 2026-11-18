"use client";

import { useEffect, useRef, useState } from "react";

export type AmbientVideoProps = {
  src: string;
  poster: string;
  ariaLabel: string;
  className?: string;
};

/**
 * Reprodutor de vídeo ambiente para processos operacionais reais.
 *
 * - Autoplay mudo, playsInline, loop suave, sem controles aparentes.
 * - Inicia/retoma apenas quando próximo à viewport e pausa ao sair.
 * - Respeita prefers-reduced-motion exibindo o poster estático.
 * - preload="none" evita baixar múltiplos vídeos antes da rolagem.
 */
export default function AmbientVideo({
  src,
  poster,
  ariaLabel,
  className,
}: AmbientVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    if (typeof IntersectionObserver === "undefined") {
      video.play().catch(() => {});
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else if (!video.paused) {
          video.pause();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.05 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion, src]);

  if (reducedMotion) {
    return (
      <img
        src={poster}
        alt={ariaLabel}
        className={className}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      playsInline
      loop
      preload="none"
      disablePictureInPicture
      aria-label={ariaLabel}
      className={className}
    />
  );
}
