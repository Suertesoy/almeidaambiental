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

/** Crop horizontal do vídeo por dobra, só no mobile (<1024px) — no desktop
 *  o object-position continua "center center", sem alteração. Ver
 *  ScrollVideoExperience anterior para a derivação desses valores a partir
 *  dos PNGs de referência do Figma; não recalculado nesta rodada. */
const MOBILE_CROP_X = [50, 56, 48, 51, 50, 52, 46, 51, 52];

function isMobileViewport() {
  return window.matchMedia("(max-width: 1023px)").matches;
}

function applyMobileCrop(video: HTMLVideoElement, index: number) {
  if (!isMobileViewport()) return;
  const x = MOBILE_CROP_X[index] ?? 50;
  video.style.objectPosition = `${x}% center`;
}

/** Margem técnica usada ao levar o vídeo até o fim (footer): definir
 *  currentTime = video.duration pode fazer o navegador tratar o vídeo como
 *  encerrado sem manter o último frame desenhado, então o alvo real é um
 *  instante imediatamente anterior à duração. O footer é tratado como um
 *  décimo "stop" virtual (índice FOOTER_INDEX) nesse tempo. */
const END_OF_VIDEO_EPSILON_SECONDS = 0.08;

/** Duração única de toda transição desktop (roda/vídeo/fade) — meta ~620ms
 *  (faixa aceitável 550–700ms), a mesma para qualquer par de dobras
 *  adjacentes, inclusive dobra 9 ↔ footer: não há mais um motor especial
 *  mais lento para nenhum trecho. */
const ANIMATION_MS = 620;

/** Índice virtual do footer na mesma escala de posição contínua dos 9
 *  SCROLL_STOPS (0..8) — footer = 9. Um único sistema de posição cobre
 *  hero, as 8 dobras e o footer. */
const FOOTER_INDEX = SCROLL_STOPS.length;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/** Easing único, discreto, sem bounce/elastic — usado em toda transição
 *  desktop (a mesma curva serve indo e voltando). */
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Posição vertical (scrollY necessário) de um índice 0..FOOTER_INDEX,
 *  medida ao vivo via getBoundingClientRect — nunca cacheada, então não
 *  precisa de listener de resize dedicado para ficar correta. */
function getPositionY(index: number, sectionEls: Array<HTMLElement | null>): number {
  const el =
    index >= SCROLL_STOPS.length ? document.querySelector<HTMLElement>(".site-footer") : sectionEls[index];
  if (el) return el.getBoundingClientRect().top + window.scrollY;
  return index * window.innerHeight;
}

/** currentTime do vídeo correspondente a um índice 0..FOOTER_INDEX
 *  (FOOTER_INDEX usa o tempo virtual do footer, não um SCROLL_STOP real). */
function getPositionTime(index: number, footerTime: number): number {
  return index >= SCROLL_STOPS.length ? footerTime : SCROLL_STOPS[index].time;
}

/** Posição contínua (0..FOOTER_INDEX, fracionária) da rolagem atual —
 *  fonte única usada tanto para o fade do conteúdo quanto para o
 *  currentTime do vídeo fora de uma transição desktop (touch, teclado,
 *  links âncora). Funciona igual subindo ou descendo: é só uma função da
 *  posição de scroll atual, sem distinção de direção. */
function computeContinuousPosition(sectionEls: Array<HTMLElement | null>, scrollY: number): number {
  const ys: number[] = [];
  for (let i = 0; i <= FOOTER_INDEX; i++) ys.push(getPositionY(i, sectionEls));

  if (scrollY <= ys[0]) return 0;
  if (scrollY >= ys[FOOTER_INDEX]) return FOOTER_INDEX;

  for (let i = 0; i < FOOTER_INDEX; i++) {
    if (scrollY <= ys[i + 1]) {
      const span = ys[i + 1] - ys[i];
      const frac = span > 0 ? (scrollY - ys[i]) / span : 0;
      return i + clamp(frac, 0, 1);
    }
  }
  return FOOTER_INDEX;
}

/** currentTime do vídeo para uma posição contínua fracionária: p = 0 numa
 *  dobra, p = 1 na próxima — o mesmo "p" que também determina a posição da
 *  página (via computeContinuousPosition) e o fade do conteúdo (ver
 *  applyHeroOpacity/applyContentOpacity), então os três nunca dessincronizam. */
function timeForPosition(pos: number, footerTime: number): number {
  const clamped = clamp(pos, 0, FOOTER_INDEX);
  const i0 = Math.min(Math.floor(clamped), FOOTER_INDEX - 1);
  const i1 = i0 + 1;
  const frac = clamped - i0;
  return lerp(getPositionTime(i0, footerTime), getPositionTime(i1, footerTime), frac);
}

function applyHeroOpacity(heroEl: HTMLDivElement | null, continuousPosition: number) {
  if (!heroEl) return;
  // Conteúdo da dobra 1 permanece visível na maior parte da transição e só
  // se apaga no último trecho, ao se aproximar da dobra 2.
  const heroOpacity = clamp(1 - (continuousPosition - 0.6) / 0.4, 0, 1);
  heroEl.style.opacity = String(heroOpacity);
  const isHidden = heroOpacity <= 0.02;
  heroEl.style.pointerEvents = isHidden ? "none" : "auto";
  if (isHidden) heroEl.setAttribute("inert", "");
  else heroEl.removeAttribute("inert");
}

function applyContentOpacity(contentEls: Array<HTMLDivElement | null>, continuousPosition: number) {
  contentEls.forEach((el, i) => {
    if (!el) return;
    // Conteúdo i corresponde à dobra (i + 2), ancorada na posição (i + 1) —
    // também cobre o footer naturalmente: a dobra 9 (i = 7, posição 8) some
    // conforme a posição contínua avança de 8 para FOOTER_INDEX (9).
    const distance = Math.abs(continuousPosition - (i + 1));
    const opacity = clamp(1 - distance, 0, 1);
    el.style.opacity = String(opacity);
    const isHidden = opacity <= 0.02;
    el.style.pointerEvents = isHidden ? "none" : "auto";
    if (isHidden) el.setAttribute("inert", "");
    else el.removeAttribute("inert");
  });
}

/** Abertura da Hero: único uso restante de video.play() real — necessário
 *  para inicializar o decoder em Safari mobile (um seek puro sem play()
 *  prévio pode não desenhar frame nenhum). Toca 0.00s → toTime (~800ms de
 *  vídeo a 1×, dentro da meta de 600–800ms) e pausa exatamente no alvo. */
function playIntro(
  video: HTMLVideoElement,
  toTime: number,
  isCancelled: () => boolean,
  onPlaying?: () => void
): Promise<void> {
  return new Promise((resolve) => {
    const finish = () => {
      video.pause();
      video.currentTime = toTime;
      resolve();
    };

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
          onPlaying?.();
          rafId = requestAnimationFrame(watch);
        })
        .catch((error) => {
          // Não silenciar: o motivo real da rejeição precisa aparecer no console.
          console.warn("[ScrollVideoExperience] video.play() rejeitado na abertura:", error);
          finish();
        });
    } else {
      rafId = requestAnimationFrame(watch);
    }
  });
}

/** Transição discreta desktop: uma única animação rAF controla scroll
 *  (window.scrollTo, não scrollIntoView — nada rodando em paralelo),
 *  video.currentTime e o fade, todos derivados do mesmo progresso 0..1
 *  (easeInOutCubic), em ANIMATION_MS. Cobre dobra↔dobra e dobra 9↔footer
 *  igualmente: fromIndex/toIndex podem ser qualquer posição 0..FOOTER_INDEX. */
function animateTo(
  video: HTMLVideoElement,
  sectionEls: Array<HTMLElement | null>,
  fromIndex: number,
  toIndex: number,
  footerTime: number,
  isCancelled: () => boolean,
  onProgress: (continuousPosition: number) => void
): Promise<void> {
  return new Promise((resolve) => {
    video.pause();
    const fromY = getPositionY(fromIndex, sectionEls);
    const toY = getPositionY(toIndex, sectionEls);
    const fromTime = getPositionTime(fromIndex, footerTime);
    const toTime = getPositionTime(toIndex, footerTime);
    const start = performance.now();

    const step = (now: number) => {
      if (isCancelled()) return;
      const t = clamp((now - start) / ANIMATION_MS, 0, 1);
      const eased = easeInOutCubic(t);

      // behavior:"instant" é obrigatório aqui: a forma scrollTo(x,y) usa
      // behavior "auto", que HERDA o `scroll-behavior:smooth` do CSS
      // (html) — sem isso, cada chamada dentro deste loop rAF disparava
      // sua própria animação suave do navegador por cima da anterior,
      // competindo consigo mesma (é essa a causa do jitter observado na
      // validação). "instant" ignora o scroll-behavior da CSS.
      window.scrollTo({ top: lerp(fromY, toY, eased), left: 0, behavior: "instant" });
      video.currentTime = lerp(fromTime, toTime, eased);
      onProgress(lerp(fromIndex, toIndex, eased));

      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    };

    requestAnimationFrame(step);
  });
}

export default function ScrollVideoExperience() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);

  /** Posição CONFIRMADA (0..FOOTER_INDEX) — atualizada ao final de cada
   *  transição desktop, e continuamente (arredondada) pelo listener de
   *  scroll passivo fora de uma transição. */
  const currentIndexRef = useRef(0);
  /** Trava única: verdadeira durante qualquer escrita programática de
   *  video.currentTime que não pode ser perturbada pelo listener de scroll
   *  passivo — abertura inicial, priming do decoder, ou uma transição
   *  desktop em andamento. Sem fila: um novo gesto de wheel durante a
   *  trava é só ignorado (preventDefault) — a intenção mais recente do
   *  usuário é a que já vai disparar naturalmente assim que a trava cair. */
  const isAnimatingRef = useRef(false);
  const cancelActiveRef = useRef<(() => void) | null>(null);
  const initialPlayedRef = useRef(false);
  const decoderPrimedRef = useRef(false);
  /** currentTime "virtual" do footer (índice FOOTER_INDEX) — video.duration
   *  só fica disponível depois de `loadedmetadata`; até lá, cai no tempo do
   *  último stop real (dobra 9), então o footer nunca fica além do vídeo. */
  const footerTimeRef = useRef(SCROLL_STOPS[SCROLL_STOPS.length - 1].time);

  const [reducedMotion, setReducedMotion] = useState(false);

  // Detecta prefers-reduced-motion antes da pintura, para minimizar troca visual.
  useLayoutEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const handleChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    return () => {
      cancelActiveRef.current?.();
    };
  }, []);

  // Tempo virtual do footer: recalcula assim que a duração real do vídeo
  // estiver disponível (loadedmetadata pode chegar depois do primeiro render).
  useEffect(() => {
    if (reducedMotion) return;
    const video = videoRef.current;
    if (!video) return;

    const updateFooterTime = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        footerTimeRef.current = Math.max(
          SCROLL_STOPS[SCROLL_STOPS.length - 1].time,
          video.duration - END_OF_VIDEO_EPSILON_SECONDS
        );
      }
    };

    updateFooterTime();
    video.addEventListener("loadedmetadata", updateFooterTime);
    return () => video.removeEventListener("loadedmetadata", updateFooterTime);
  }, [reducedMotion]);

  // Abertura da dobra 1 (0.00s → primeiro stop) + priming do decoder no
  // mobile via primeira interação real, caso o play() automático seja
  // bloqueado pelo navegador (a abertura em si não se repete: o fallback só
  // reproduz um play()+pause() silencioso para destravar seeks seguintes).
  useEffect(() => {
    if (reducedMotion) return;
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;
    const isCancelled = () => cancelled;
    const interactionEvents: Array<keyof WindowEventMap> = [
      "touchstart",
      "pointerdown",
      "wheel",
      "keydown",
      "scroll",
    ];

    const removeInteractionListeners = () => {
      interactionEvents.forEach((type) => window.removeEventListener(type, primeOnInteraction));
    };

    function primeOnInteraction() {
      if (cancelled || decoderPrimedRef.current || !video || isAnimatingRef.current) return;
      const restoreTime = getPositionTime(currentIndexRef.current, footerTimeRef.current);
      isAnimatingRef.current = true;
      video.muted = true;
      const playAttempt = video.play();
      if (playAttempt && typeof playAttempt.then === "function") {
        playAttempt
          .then(() => {
            if (cancelled) return;
            decoderPrimedRef.current = true;
            video.pause();
            video.currentTime = restoreTime;
            isAnimatingRef.current = false;
            removeInteractionListeners();
          })
          .catch((error) => {
            console.warn(
              "[ScrollVideoExperience] video.play() rejeitado ao inicializar o decoder via interação:",
              error
            );
            isAnimatingRef.current = false;
          });
      } else {
        isAnimatingRef.current = false;
      }
    }

    function runInitialSegment() {
      if (initialPlayedRef.current || cancelled) return;
      initialPlayedRef.current = true;
      isAnimatingRef.current = true;
      applyMobileCrop(video, 0);
      cancelActiveRef.current = () => {
        cancelled = true;
      };

      playIntro(video, SCROLL_STOPS[0].time, isCancelled, () => {
        decoderPrimedRef.current = true;
        removeInteractionListeners();
      }).then(() => {
        if (!cancelled) {
          currentIndexRef.current = 0;
          applyMobileCrop(video, 0);
        }
        isAnimatingRef.current = false;
        cancelActiveRef.current = null;
      });
    }

    if (video.readyState >= 2) {
      runInitialSegment();
    } else {
      video.addEventListener("loadeddata", runInitialSegment, { once: true });
    }
    interactionEvents.forEach((type) =>
      window.addEventListener(type, primeOnInteraction, { passive: true })
    );

    return () => {
      cancelled = true;
      video.removeEventListener("loadeddata", runInitialSegment);
      removeInteractionListeners();
    };
  }, [reducedMotion]);

  // Mouse/trackpad (desktop): cada gesto muda exatamente uma posição
  // (dobra↔dobra ou dobra 9↔footer), com uma única animação (~620ms)
  // controlando scroll + vídeo + fade juntos. Bloqueia novos gestos
  // enquanto uma transição está em andamento (sem enfileirar). Não
  // intercepta toque: no mobile, o CSS Scroll Snap nativo resolve o gesto e
  // o listener de posição de scroll abaixo mantém o vídeo/fade em sincronia
  // contínua com ele.
  const onWheel = useCallback((event: WheelEvent) => {
    if (isAnimatingRef.current) {
      event.preventDefault();
      return;
    }

    const direction = event.deltaY > 0 ? 1 : event.deltaY < 0 ? -1 : 0;
    if (direction === 0) return;

    const current = currentIndexRef.current;
    const target = clamp(current + direction, 0, FOOTER_INDEX);
    if (target === current) return;

    const video = videoRef.current;
    if (!video) return;

    event.preventDefault();

    isAnimatingRef.current = true;
    let cancelled = false;
    cancelActiveRef.current = () => {
      cancelled = true;
    };

    animateTo(
      video,
      sectionRefs.current,
      current,
      target,
      footerTimeRef.current,
      () => cancelled,
      (pos) => {
        applyHeroOpacity(heroRef.current, pos);
        applyContentOpacity(contentRefs.current, pos);
      }
    ).then(() => {
      if (!cancelled) currentIndexRef.current = target;
      isAnimatingRef.current = false;
      cancelActiveRef.current = null;
    });
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [reducedMotion, onWheel]);

  // Posição contínua de scroll (touch/mobile, teclado, links âncora, e
  // qualquer navegação fora do wheel handler acima): a MESMA posição
  // fracionária alimenta o currentTime do vídeo e o fade do conteúdo, sem
  // distinguir subida de descida — é só uma função de onde a página está
  // agora. Ignorado enquanto uma transição desktop (ou a abertura/priming)
  // já está escrevendo em video.currentTime.
  useEffect(() => {
    if (reducedMotion) return;

    let rafId = 0;

    const update = () => {
      rafId = 0;
      if (isAnimatingRef.current) return;

      const pos = computeContinuousPosition(sectionRefs.current, window.scrollY);
      applyHeroOpacity(heroRef.current, pos);
      applyContentOpacity(contentRefs.current, pos);

      const video = videoRef.current;
      if (video && initialPlayedRef.current) {
        if (isMobileViewport()) {
          applyMobileCrop(video, clamp(Math.round(pos), 0, SCROLL_STOPS.length - 1));
        } else if (video.style.objectPosition) {
          video.style.removeProperty("object-position");
        }
        // Máximo uma escrita de currentTime por frame (rAF já garante isso).
        video.currentTime = timeForPosition(pos, footerTimeRef.current);
      }

      currentIndexRef.current = clamp(Math.round(pos), 0, FOOTER_INDEX);
    };

    const onScrollOrResize = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

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
                className="section-layer"
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
