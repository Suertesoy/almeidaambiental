import type { EditorialImage } from "../../lib/media";

export type EditorialPictureProps = {
  image: EditorialImage;
  className?: string;
  priority?: boolean;
  /** Sobrescreve o enquadramento definido no dado (raro — prefira o dado). */
  objectPosition?: string;
};

/**
 * Um slot de imagem editorial preparado para a captação real.
 *
 * Quando o dado traz `mobileSrc`, o navegador escolhe a composição de
 * mobile abaixo de 768px — composição própria, não recorte do desktop.
 * Quando não traz, o mesmo arquivo atende os dois breakpoints e o
 * enquadramento fica por conta de `objectPosition`. A proporção do slot é
 * sempre do CSS de quem consome, nunca do arquivo: trocar a foto ilustrativa
 * por fotografia real não muda o layout.
 */
export default function EditorialPicture({
  image,
  className,
  priority = false,
  objectPosition,
}: EditorialPictureProps) {
  const position = objectPosition ?? image.objectPosition ?? "center";

  return (
    <picture>
      {image.mobileSrc && <source media="(max-width: 767px)" srcSet={image.mobileSrc} />}
      <img
        src={image.src}
        alt={image.alt}
        className={className}
        style={{ objectPosition: position }}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </picture>
  );
}
