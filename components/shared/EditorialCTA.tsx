import Link from "next/link";
import styles from "./company-page.module.css";

export type EditorialCTAProps = {
  eyebrow?: string;
  headline: string;
  body: string;
  cta: { label: string; href: string };
  tone?: "forest" | "carvao";
};

/**
 * CTA final de página de empresa: fundo sólido escuro, headline editorial,
 * um único CTA. Reaproveita a primitiva `.finalCta` de company-page.module.css
 * (mesmo vocabulário do manifesto final da Home) — cada página só troca
 * texto, tom e destino do link.
 */
export default function EditorialCTA({ eyebrow, headline, body, cta, tone = "forest" }: EditorialCTAProps) {
  const toneClass = tone === "carvao" ? styles.toneCarvao : styles.toneForest;

  return (
    <section className={`${styles.section} ${toneClass} ${styles.finalCta}`}>
      <div className={styles.container}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h2 className={styles.finalCtaHeadline}>{headline}</h2>
        <p className={styles.body}>{body}</p>
        <div className={styles.ctaRow}>
          <Link className={`${styles.btn} ${styles.btnOutlineOnDark}`} href={cta.href}>
            {cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
