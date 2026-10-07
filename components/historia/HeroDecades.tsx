import styles from "./historia.module.css";
import { ChevronDownIcon } from "../icons";
import IllustrativeBadge from "../shared/IllustrativeBadge";
import { HERO_IMAGE, HERO_IMAGE_EN } from "../../lib/historia-data";
import type { Locale } from "../../lib/i18n/locale";

const COPY = {
  pt: {
    ariaLabel: "Grupo Almeida — 1985, o início de uma história de quatro décadas",
    eyebrow: "Grupo Almeida · Nossa história",
    headline: "Uma família deixa Chapecó rumo a São José.",
    lede: "Começava ali uma história que atravessaria quatro décadas.",
    scrollHint: "Role para percorrer nossa história",
  },
  en: {
    ariaLabel: "Grupo Almeida — 1985, the beginning of a four-decade story",
    eyebrow: "Grupo Almeida · Our story",
    headline: "A family leaves Chapecó for São José.",
    lede: "A story that would span four decades began there.",
    scrollHint: "Scroll to follow our story",
  },
} as const;

/**
 * Abertura cinematográfica: 1985 ocupa quase toda a primeira dobra. O H1
 * é "1985" + a frase (o ano é visual e semântico, não um <p> solto), e a
 * frase fica num corpo maior que qualquer H2. O lede não repete os fatos
 * do evento de 1985 (galpão, prensa, caminhonete) — eles abrem a timeline.
 * Só a foto principal carrega com prioridade.
 */
export default function HeroDecades({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const heroImage = locale === "en" ? HERO_IMAGE_EN : HERO_IMAGE;

  return (
    <section className={styles.hero} aria-label={t.ariaLabel}>
      <img
        src={heroImage.src}
        alt={heroImage.alt}
        className={styles.heroImage}
        fetchPriority="high"
        loading="eager"
        decoding="async"
      />
      <div className={styles.heroScrim} aria-hidden="true" />
      <div className={styles.heroSurfaceCue} aria-hidden="true" />

      <div className={styles.heroContent}>
        <p className={styles.heroEyebrow}>{t.eyebrow}</p>
        <h1 className={styles.heroTitle}>
          <span className={styles.heroYear}>1985</span>
          <span className={styles.srOnly}>. </span>
          <span className={styles.heroHeadline}>{t.headline}</span>
        </h1>
        <p className={styles.heroLede}>{t.lede}</p>
      </div>

      <div className={styles.heroHint} aria-hidden="true">
        <span>{t.scrollHint}</span>
        <ChevronDownIcon />
      </div>

      <IllustrativeBadge position="top-right" locale={locale} />
    </section>
  );
}
