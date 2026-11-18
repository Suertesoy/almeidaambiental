"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./product-gallery.module.css";
import { CloseIcon } from "../icons";
import EquipmentModelStage from "./EquipmentModelStage";
import IllustrativeBadge from "../shared/IllustrativeBadge";
import { getEquipment3DConfig } from "../../lib/equipamentos-3d";
import type { EditorialImage, EditorialVideo } from "../../lib/media";
import type { Locale } from "../../lib/i18n/locale";

type Slide =
  | { kind: "image"; key: string; image: EditorialImage }
  | { kind: "video"; key: string; video: EditorialVideo };

export type ProductGalleryProps = {
  /** Identificador do equipamento para habilitar o visualizador 3D quando disponível. */
  productId?: string;
  /** Imagem principal — sempre existe. */
  image: EditorialImage;
  /** Fotos adicionais e detalhes. Ausente hoje; nada é renderizado por ela. */
  gallery?: EditorialImage[];
  /** Vídeo de funcionamento. Ausente hoje; nenhuma área de vídeo aparece. */
  video?: EditorialVideo;
  locale: Locale;
};

const COPY = {
  pt: {
    zoomImage: (alt: string) => `Ampliar imagem: ${alt}`,
    viewImage: (n: number) => `Ver imagem ${n}`,
    viewVideo: "Ver vídeo de funcionamento",
    video: "Vídeo",
    zoomedView: "Visualização ampliada",
    closeZoomedView: "Fechar visualização ampliada",
  },
  en: {
    zoomImage: (alt: string) => `Zoom in: ${alt}`,
    viewImage: (n: number) => `View image ${n}`,
    viewVideo: "Watch operation video",
    video: "Video",
    zoomedView: "Zoomed-in view",
    closeZoomedView: "Close zoomed-in view",
  },
} as const;

/**
 * Galeria de um equipamento do catálogo.
 *
 * A estrutura já aceita foto principal + fotos adicionais + detalhes +
 * vídeo; hoje a maioria dos equipamentos tem uma única imagem, então a
 * galeria renderiza exatamente uma imagem — sem miniaturas, sem contador e
 * sem placeholder de mídia que não existe.
 *
 * O trilho é scroll nativo com snap (gesto de toque funciona sem
 * JavaScript e a página continua rolando na vertical). As miniaturas são
 * botões de verdade, então servem também a mouse e teclado. A imagem abre
 * em visualização ampliada num <dialog> nativo — foco, Escape e camada
 * superior por conta do navegador.
 */
export default function ProductGallery({ productId, image, gallery, video, locale }: ProductGalleryProps) {
  const t = COPY[locale];
  const model3D = productId ? getEquipment3DConfig(productId) : null;
  const slides: Slide[] = [
    { kind: "image", key: image.src, image },
    ...(gallery ?? []).map((extra): Slide => ({ kind: "image", key: extra.src, image: extra })),
    ...(video ? [{ kind: "video", key: video.src, video } as Slide] : []),
  ];

  const trackRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDialogElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed, setZoomed] = useState<EditorialImage | null>(null);

  // Trilho e miniaturas são a mesma verdade: rolar sincroniza a miniatura
  // ativa, clicar numa miniatura rola o trilho.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || slides.length < 2) return;

    const onScroll = () => {
      const index = Math.round(track.scrollLeft / track.clientWidth);
      setActiveIndex(Math.max(0, Math.min(slides.length - 1, index)));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [slides.length]);

  useEffect(() => {
    const dialog = lightboxRef.current;
    if (!dialog) return;
    if (zoomed && !dialog.open) dialog.showModal();
    if (!zoomed && dialog.open) dialog.close();
  }, [zoomed]);

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
    setActiveIndex(index);
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.track} ref={trackRef}>
        {slides.map((slide, index) =>
          slide.kind === "image" ? (
            <div
              key={slide.key}
              className={`${styles.slide} ${index === 0 && model3D ? styles.slide3D : ""}`}
            >
              {index === 0 && model3D ? (
                <EquipmentModelStage config={model3D} locale={locale} variant="gallery" />
              ) : (
                <button
                  type="button"
                  className={styles.slideImageButton}
                  onClick={() => setZoomed(slide.image)}
                  aria-label={t.zoomImage(slide.image.alt)}
                >
                  <img src={slide.image.src} alt={slide.image.alt} loading="lazy" decoding="async" />
                  {slide.image.sourceType !== "archive" && <IllustrativeBadge locale={locale} />}
                </button>
              )}
            </div>
          ) : (
            <div key={slide.key} className={styles.slide}>
              {/* Nunca autoplay com som: sem autoplay, sem muted forçado —
                  o visitante decide. `preload="metadata"` evita baixar o
                  vídeo inteiro só por abrir o detalhe. */}
              <video
                src={slide.video.src}
                poster={slide.video.poster}
                controls
                playsInline
                preload="metadata"
                aria-label={slide.video.label}
              />
            </div>
          )
        )}
      </div>

      {model3D?.modelCaption && (
        <p style={{ margin: "8px 0 0", fontSize: "12px", opacity: 0.72 }}>
          {model3D.modelCaption[locale]}
        </p>
      )}

      {slides.length > 1 && (
        <div className={styles.thumbs}>
          {slides.map((slide, index) => (
            <button
              key={slide.key}
              type="button"
              className={styles.thumb}
              aria-current={index === activeIndex ? "true" : undefined}
              aria-label={slide.kind === "image" ? t.viewImage(index + 1) : t.viewVideo}
              onClick={() => goTo(index)}
            >
              {slide.kind === "image" ? (
                <img src={slide.image.src} alt="" aria-hidden="true" loading="lazy" decoding="async" />
              ) : slide.video.poster ? (
                <img src={slide.video.poster} alt="" aria-hidden="true" loading="lazy" decoding="async" />
              ) : (
                <span className={styles.thumbVideoLabel} aria-hidden="true">
                  {t.video}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {image.caption && <p className={styles.caption}>{image.caption}</p>}

      <dialog
        ref={lightboxRef}
        className={styles.lightbox}
        onClose={() => setZoomed(null)}
        aria-label={t.zoomedView}
      >
        {zoomed && (
          <div className={styles.lightboxInner}>
            <button
              type="button"
              className={styles.lightboxClose}
              onClick={() => setZoomed(null)}
              aria-label={t.closeZoomedView}
            >
              <CloseIcon />
            </button>
            <img src={zoomed.src} alt={zoomed.alt} />
          </div>
        )}
      </dialog>
    </div>
  );
}
