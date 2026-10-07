import Link from "next/link";
import styles from "./historia.module.css";
import GrowthScale from "./GrowthScale";
import ExpansionMap from "./ExpansionMap";
import Epilogue from "./Epilogue";
import { localizeHref } from "../../lib/i18n/routes";
import type { Locale } from "../../lib/i18n/locale";

const COPY = {
  pt: {
    ariaLabel: "Fechamento: escala, presença e continuidade",
    nextLabel: "Onde a história continua",
  },
  en: {
    ariaLabel: "Closing: scale, presence and continuity",
    nextLabel: "Where the story continues",
  },
} as const;

const COMPANIES = [
  { href: "/almeida-ambiental", name: "Almeida Ambiental" },
  { href: "/almeida-equipamentos", name: "Almeida Equipamentos" },
  { href: "/saturno-ambiental", name: "Saturno Ambiental" },
] as const;

/**
 * Fechamento contínuo da página: a linha dourada da timeline chega a um nó
 * e, na MESMA superfície escura, a história vira dimensão — escala em m²,
 * depois epílogo + mapa, depois as empresas do Grupo como continuação.
 * Substitui três seções soltas (escala clara, mapa escuro, epílogo escuro)
 * que interrompiam a narrativa antes de ela terminar. A saída é navegação
 * para as empresas, não um botão de volta à Home nem uma ação comercial.
 */
export default function ClosingChapter({ locale }: { locale: Locale }) {
  const t = COPY[locale];

  return (
    <section className={styles.closing} aria-label={t.ariaLabel}>
      <div className={styles.container}>
        <div className={styles.bridge} aria-hidden="true">
          <span className={styles.bridgeLine} />
        </div>
        <div className={styles.closingNode} aria-hidden="true">
          <span />
        </div>

        <GrowthScale locale={locale} />

        <div className={`${styles.closingBlock} ${styles.closingSplit} ${styles.closingSplitEnd}`}>
          <Epilogue locale={locale} />
          <ExpansionMap locale={locale} />
        </div>

        <nav className={styles.closingBlock} aria-label={t.nextLabel}>
          <p className={styles.nextLabel}>{t.nextLabel}</p>
          <ul className={styles.nextLinks}>
            {COMPANIES.map((company) => (
              <li key={company.href}>
                <Link className={styles.nextLink} href={localizeHref(company.href, locale)}>
                  <span>{company.name}</span>
                  <span className={styles.nextArrow} aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
