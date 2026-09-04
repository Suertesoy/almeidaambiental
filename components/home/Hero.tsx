"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./home.module.css";
import { HERO_POSTER_DATA_URI } from "../../lib/hero-poster";
import { ChevronDownIcon } from "../icons";
import BrandMark from "../shared/BrandMark";
import { BRANDS } from "../../lib/brands";

const VIDEO_SRC = "/videos/Video_Almeida_15_seg.mp4";

/**
 * Hero cinematográfico da nova Home: vídeo cru, sem overlay verde, existe
 * somente nesta primeira dobra. Sem sincronização com scroll e sem seeks
 * programáticos — a única coisa que a visibilidade da seção controla é
 * play/pause (IntersectionObserver), para não gastar ciclos com o vídeo
 * decodificando fora de tela.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const handleChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.readyState >= 2) {
      setVideoReady(true);
      return;
    }
    const markReady = () => setVideoReady(true);
    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", markReady);
    return () => {
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("canplay", markReady);
    };
  }, [reducedMotion]);

  // Pausa/retoma conforme o Hero entra e sai da viewport — nunca em resposta
  // à posição de scroll dentro da seção, só à visibilidade dela.
  useEffect(() => {
    if (reducedMotion) return;
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className={styles.hero} aria-label="Grupo Almeida — 40 anos">
      <div
        className={`${styles.heroPoster}${videoReady ? ` ${styles.heroPosterHidden}` : ""}`}
        style={{ backgroundImage: `url(${HERO_POSTER_DATA_URI})` }}
        aria-hidden="true"
      />

      {!reducedMotion && (
        <video
          ref={videoRef}
          className={styles.heroVideo}
          src={VIDEO_SRC}
          poster={HERO_POSTER_DATA_URI}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        />
      )}

      {/* Único tratamento neutro sobre o vídeo: gradiente preto localizado no
          terço inferior, só para apoiar a leitura do texto — não recolore o
          vídeo, não é overlay verde, não cobre a imagem inteira. */}
      <div className={styles.heroScrim} aria-hidden="true" />

      <div className={styles.heroContent}>
        {/* Feedback da cliente (rodada "presença de marca"): o pequeno bloco
            textual "Grupo Almeida / 40 anos" dava lugar à logo completa
            oficial — presença de marca real na entrada do Hero, sem
            competir com a headline abaixo. */}
        <BrandMark brand={BRANDS["grupo-almeida"]} variant="branca" className={styles.heroBrandMark} />
        {/* Sem quebra de linha forçada (regra 13 da tarefa): o texto flui e
            reorganiza as linhas conforme a largura de cada viewport, em vez
            de reproduzir as mesmas quebras do desktop no mobile. */}
        <h1 className={styles.heroHeadline}>
          TRANSFORMANDO RESÍDUO EM <span className={styles.gold}>RESULTADO</span>
        </h1>
        {/* /historia é a experiência editorial de storytelling cronológico
            (1985–2026) — navegação client-side via next/link, não mais uma
            âncora dentro da própria Home. */}
        <Link className={styles.heroCta} href="/historia">
          Conheça nossa história
        </Link>
      </div>

      <a className={styles.heroScrollHint} href="#almeida-ambiental">
        <span>Role para baixo</span>
        <ChevronDownIcon />
      </a>
    </section>
  );
}
