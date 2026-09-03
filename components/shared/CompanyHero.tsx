import Link from "next/link";
import styles from "./CompanyHero.module.css";
import IllustrativeBadge from "./IllustrativeBadge";
import BrandBoundaryMark, {
  boundarySurface,
  type BrandBoundarySurface,
} from "./BrandBoundaryMark";
import type { EditorialImage } from "../../lib/media";
import type { BrandBoundaryId } from "../../lib/brand-boundaries";

export type CompanyHeroCta = {
  label: string;
  href: string;
};

export type CompanyHeroProps = {
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
  /** Superfície do Hero tipográfico. Ignorada quando existe fotografia. */
  surface?: "forest" | "saturno";
  /** Metadados curtos e validados, exibidos só no Hero tipográfico. */
  meta?: string[];
  /** Metade de saída de uma fronteira de território ancorada neste Hero. */
  boundary?: { id: BrandBoundaryId; surface: BrandBoundarySurface };
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
  eyebrow,
  title,
  lede,
  subcopy,
  image,
  surface = "forest",
  meta,
  boundary,
  primaryCta,
  secondaryCta,
}: CompanyHeroProps) {
  const editorial = !image;
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
      {boundary && <BrandBoundaryMark boundary={boundary.id} half="leaving" surface={boundary.surface} />}

      {image && (
        <>
          <img src={image.src} alt={image.alt} className={styles.media} loading="eager" fetchPriority="high" />
          <div className={styles.scrim} aria-hidden="true" />
          {image.sourceType !== "archive" && <IllustrativeBadge position="top-right" />}
        </>
      )}

      <div className={`${styles.content} ${editorial ? styles.editorialContent : ""}`}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
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
