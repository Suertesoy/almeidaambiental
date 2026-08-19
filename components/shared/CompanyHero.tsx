import Link from "next/link";
import styles from "./CompanyHero.module.css";
import IllustrativeBadge from "./IllustrativeBadge";
import type { EditorialImage } from "../../lib/media";

export type CompanyHeroCta = {
  label: string;
  href: string;
};

export type CompanyHeroProps = {
  eyebrow: string;
  title: string;
  lede: string;
  subcopy?: string;
  image: EditorialImage;
  primaryCta: CompanyHeroCta;
  secondaryCta?: CompanyHeroCta;
};

/**
 * Hero de página de empresa: predominantemente visual (imagem editorial de
 * operação/produto), eyebrow + H1 + lede + até dois CTAs. Mesmo tratamento
 * de scrim do Hero da Home e do Hero 1985 de /historia — reaproveita a
 * intenção visual, não o componente (cada empresa tem sua própria imagem e
 * copy). Preparado para vídeo sutil no futuro sem mudar a API: por ora
 * renderiza só `image`.
 */
export default function CompanyHero({
  eyebrow,
  title,
  lede,
  subcopy,
  image,
  primaryCta,
  secondaryCta,
}: CompanyHeroProps) {
  return (
    <section className={styles.hero} aria-label={eyebrow}>
      <img src={image.src} alt={image.alt} className={styles.media} loading="eager" fetchPriority="high" />
      <div className={styles.scrim} aria-hidden="true" />
      {image.sourceType !== "archive" && <IllustrativeBadge position="top-right" />}

      <div className={styles.content}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.lede}>{lede}</p>
        {subcopy && <p className={styles.subcopy}>{subcopy}</p>}

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
