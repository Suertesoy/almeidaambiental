import Link from "next/link";
import styles from "./CompanyHero.module.css";
import IllustrativeBadge from "./IllustrativeBadge";
import MaterialSurface from "./MaterialSurface";
import AmbientVideo from "./AmbientVideo";
import BrandBoundaryMark, {
  boundarySurface,
  type BrandBoundarySurface,
} from "./BrandBoundaryMark";
import type { EditorialImage } from "../../lib/media";
import type { BrandBoundaryId } from "../../lib/brand-boundaries";
import type { MaterialSurfaceId } from "../../lib/material-surfaces";
import type { Locale } from "../../lib/i18n/locale";

export type CompanyHeroCta = {
  label: string;
  href: string;
};

export type CompanyHeroProps = {
  locale: Locale;
  eyebrow: string;
  title: string;
  lede: string;
  subcopy?: string;
  /**
   * Fotografia de abertura. Opcional: quando a empresa não tem — e não
   * pode ter — uma imagem que a represente de verdade, o Hero vira
   * tipográfico em vez de emprestar a fotografia de outra unidade ou
   * exibir uma instalação que não existe.
   */
  image?: EditorialImage;
  /** Vídeo ambiente de abertura (opcional; substitui a fotografia quando presente). */
  video?: {
    src: string;
    poster: string;
    label: string;
  };
  /** Versão mobile otimizada da fotografia principal. */
  mobileImageSrc?: string;
  /** Enquadramento da imagem no desktop e no mobile (CSS object-position). */
  imagePosition?: string;
  mobileImagePosition?: string;
  /** Graduação de cor suave no scrim para integrar ao território da empresa. */
  scrimTone?: "neutral" | "forest" | "saturno";
  /** Superfície do Hero tipográfico. Ignorada quando existe fotografia. */
  surface?: "forest" | "saturno";
  /**
   * Camada de materialidade atrás do Hero tipográfico (ver
   * components/shared/MaterialSurface.tsx).
   *
   * Só se aplica ao Hero SEM fotografia, e a razão é conceitual: quando a
   * empresa não tem imagem que a represente, a alternativa honesta é
   * matéria — papel, fibra, cartonagem — e não uma cena inventada. Um Hero
   * que já tem fotografia da operação não precisa de textura por trás, e
   * empilhar as duas só sujaria a leitura da imagem real.
   */
  material?: MaterialSurfaceId;
  /** Metadados curtos e validados, exibidos só no Hero tipográfico. */
  meta?: string[];
  /** Metade de saída de uma fronteira de território ancorada neste Hero. */
  boundary?: { id: BrandBoundaryId; surface: BrandBoundarySurface };
  /**
   * Logotipo oficial que substitui visualmente eyebrow + tÃ­tulo. O H1 textual
   * continua no HTML (visualmente oculto) para acessibilidade e SEO.
   */
  titleLogo?: { src: string };
  primaryCta: CompanyHeroCta;
  secondaryCta?: CompanyHeroCta;
};

/**
 * Hero de página de empresa.
 *
 * Com fotografia: predominantemente visual (imagem editorial de
 * operação/produto), scrim neutro para leitura, eyebrow + H1 + lede + até
 * dois CTAs — mesmo tratamento do Hero da Home e do Hero de /historia.
 *
 * Sem fotografia: superfície sólida, tipografia como protagonista e uma
 * faixa de metadados validados. Não é um estado degradado — é a decisão
 * para a Saturno Ambiental, que não tem captação prevista da instalação
 * atual e não pode ser representada nem por um prédio gerado nem pela
 * fotografia de outra unidade do Grupo.
 */
export default function CompanyHero({
  locale,
  eyebrow,
  title,
  lede,
  subcopy,
  image,
  video,
  mobileImageSrc,
  imagePosition,
  mobileImagePosition,
  scrimTone = "neutral",
  surface = "forest",
  material,
  meta,
  boundary,
  titleLogo,
  primaryCta,
  secondaryCta,
}: CompanyHeroProps) {
  const editorial = !image && !video;
  const surfaceClass = surface === "saturno" ? styles.surfaceSaturno : styles.surfaceForest;

  return (
    <section
      className={
        editorial
          ? `${styles.hero} ${styles.heroEditorial} ${surfaceClass} ${boundarySurface}`
          : `${styles.hero} ${boundary ? boundarySurface : ""}`
      }
      aria-label={eyebrow}
    >
      {/* Ordem de pintura: materialidade (data-layer="background", z-index 0)
          → símbolo de fronteira (z-index 0, pintado depois) → conteúdo
          (z-index 1). Ver BrandBoundaryMark.module.css. */}
      {editorial && material && <MaterialSurface surface={material} />}

      {boundary && <BrandBoundaryMark boundary={boundary.id} half="leaving" surface={boundary.surface} />}

      {(video || image) && (
        <div className={styles.backdrop} data-layer="background">
          {video ? (
            <AmbientVideo
              src={video.src}
              poster={video.poster}
              ariaLabel={video.label}
              priority
              className={styles.media}
              style={
                {
                  "--hero-pos-desktop": imagePosition ?? "center",
                  "--hero-pos-mobile": mobileImagePosition ?? imagePosition ?? "center",
                } as React.CSSProperties
              }
            />
          ) : (
            image && (
              <>
                <picture>
                  {mobileImageSrc && <source media="(max-width: 767px)" srcSet={mobileImageSrc} />}
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={styles.media}
                    style={
                      {
                        "--hero-pos-desktop": imagePosition ?? "center",
                        "--hero-pos-mobile": mobileImagePosition ?? imagePosition ?? "center",
                      } as React.CSSProperties
                    }
                    loading="eager"
                    fetchPriority="high"
                  />
                </picture>
                {image.sourceType !== "archive" && <IllustrativeBadge position="top-right" locale={locale} />}
              </>
            )
          )}
          <div
            className={`${styles.scrim} ${
              scrimTone === "forest"
                ? styles.scrimForest
                : scrimTone === "saturno"
                  ? styles.scrimSaturno
                  : ""
            }`}
            aria-hidden="true"
          />
        </div>
      )}

      <div className={`${styles.content} ${editorial ? styles.editorialContent : ""} ${titleLogo ? styles.hasTitleLogo : ""}`}>
        {titleLogo ? (
          <>
            <img src={titleLogo.src} alt="" aria-hidden="true" className={styles.titleLogo} />
            <p className={`${styles.eyebrow} ${styles.srOnly}`}>{eyebrow}</p>
            <h1 className={`${styles.title} ${styles.srOnly}`}>{title}</h1>
          </>
        ) : (
          <>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h1 className={styles.title}>{title}</h1>
          </>
        )}
        <p className={styles.lede}>{lede}</p>
        {subcopy && <p className={styles.subcopy}>{subcopy}</p>}

        {editorial && meta && meta.length > 0 && (
          <ul className={styles.meta}>
            {meta.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}

        <div className={styles.ctaRow}>
          <Link className={`${styles.btn} ${styles.btnPrimary}`} href={primaryCta.href}>
            {primaryCta.label}
          </Link>
          {secondaryCta && (
            <Link className={`${styles.btn} ${styles.btnSecondary}`} href={secondaryCta.href}>
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
