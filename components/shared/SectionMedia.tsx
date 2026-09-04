export type SectionMediaProps = {
  imageSrc: string;
  /**
   * Composição própria de mobile — não é um recorte automático do desktop.
   * Mesmo contrato de `mobileSrc` em lib/media.ts: quando existe, é servida
   * via <picture> abaixo de 768px; quando não existe, o mesmo arquivo
   * atende os dois enquadrado por `objectPosition`, e nenhum elemento
   * extra é renderizado.
   */
  mobileSrc?: string;
  alt: string;
  objectPosition?: string;
  className?: string;
  priority?: boolean;
  /** Preparado para a etapa futura com vídeo — ainda não consumido. */
  videoSrc?: string;
  poster?: string;
};

/**
 * Abstração mínima de mídia de seção, usada pela Home e por /home2-4.
 * Hoje renderiza só imagem; quando houver vídeo aprovado, `videoSrc`/`poster`
 * passam a ser lidos aqui sem exigir mudança nas seções que a usam.
 */
export default function SectionMedia({
  imageSrc,
  mobileSrc,
  alt,
  objectPosition = "center",
  className,
  priority = false,
}: SectionMediaProps) {
  const img = (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      style={{ objectPosition }}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );

  if (!mobileSrc) return img;

  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={mobileSrc} />
      {img}
    </picture>
  );
}
