import type { Brand, BrandLogoVariant } from "../../lib/brands";

type BrandMarkProps = {
  brand: Brand;
  variant: BrandLogoVariant;
  className?: string;
};

/**
 * Logo oficial de uma marca do Grupo Almeida (Seção 18 da rodada de
 * identidade): marca + variante, sem posição/tamanho — quem consome
 * (Header, menu, dobras da Home) define isso via `className`. `alt` é
 * sempre o nome da marca, nunca vazio: em todo lugar que este componente
 * aparece a logo substitui um rótulo textual (contexto do header, item de
 * navegação ou eyebrow de seção), então carrega significado real, não é
 * decorativa.
 */
export default function BrandMark({ brand, variant, className }: BrandMarkProps) {
  return <img src={brand.logos[variant]} alt={brand.name} className={className} />;
}
