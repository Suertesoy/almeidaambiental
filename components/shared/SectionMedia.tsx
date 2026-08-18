export type SectionMediaProps = {
  imageSrc: string;
  alt: string;
  objectPosition?: string;
  className?: string;
  priority?: boolean;
  /** Preparado para a etapa futura com vídeo — ainda não consumido. */
  videoSrc?: string;
  poster?: string;
};

/**
 * Abstração mínima de mídia de seção, usada por /home2, /home3 e /home4.
 * Hoje renderiza só imagem; quando houver vídeo aprovado, `videoSrc`/`poster`
 * passam a ser lidos aqui sem exigir mudança nas seções que a usam.
 */
export default function SectionMedia({
  imageSrc,
  alt,
  objectPosition = "center",
  className,
  priority = false,
}: SectionMediaProps) {
  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      style={{ objectPosition }}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
