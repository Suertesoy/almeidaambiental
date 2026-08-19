import styles from "./ProductRotation.module.css";
import IllustrativeBadge from "./IllustrativeBadge";
import type { EditorialImage } from "../../lib/media";

export type ProductRotationProps = {
  image: EditorialImage;
  /** Preparado para o vídeo/render 3D oficial futuro (Seção 38/65 da
   *  tarefa) — quando existir, passa a ser lido aqui no lugar do render
   *  estático, sem exigir mudança de layout na página que consome este
   *  componente. */
  videoSrc?: string;
  priority?: boolean;
};

/**
 * "Product viewer" ilustrativo de uma tecnologia da Almeida Equipamentos.
 * Hoje: render estático premium (Magnific/MCP) com uma rotação visual sutil
 * em CSS puro, para sugerir a experiência futura sem fingir ser uma
 * rotação 360° real de um modelo 3D — um teste de geração de vídeo
 * turntable (image-to-video, câmera 360Orbit) não produziu rotação visível
 * entre frames, então a página não usa vídeo gerado (ver relatório final).
 * `sourceType: "illustrative-3d"` na origem do dado; a etiqueta pública é a
 * mesma usada para as demais imagens ilustrativas do site.
 */
export default function ProductRotation({ image, videoSrc, priority = false }: ProductRotationProps) {
  return (
    <div className={styles.frame}>
      {videoSrc ? (
        <video
          className={styles.media}
          src={videoSrc}
          poster={image.src}
          muted
          loop
          playsInline
          autoPlay
          preload={priority ? "auto" : "none"}
        />
      ) : (
        <img
          src={image.src}
          alt={image.alt}
          className={`${styles.media} ${styles.image}`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      )}
      <IllustrativeBadge label="Visualização ilustrativa" position="bottom-left" />
    </div>
  );
}
