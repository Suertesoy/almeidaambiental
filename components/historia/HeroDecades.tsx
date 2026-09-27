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
    lede: "Em um galpão de 300 m², com uma prensa vertical e uma caminhonete Willys a gasolina, começava uma história que atravessaria quatro décadas.",
    scrollHint: "Role para percorrer nossa história",
  },
  en: {
    ariaLabel: "Grupo Almeida — 1985, the beginning of a four-decade story",
    eyebrow: "Grupo Almeida · Our story",
    headline: "A family leaves Chapecó for São José.",
    lede: "In a 300 m² warehouse, with one vertical press and one gas-powered Willys pickup truck, a story that would span four decades began.",
    scrollHint: "Scroll to follow our story",
  },
} as const;

/**
 * Abertura cinematográfica (Seção 6): 1985 ocupa quase toda a primeira
 * dobra. Só a foto principal carrega com prioridade — o resto da página
 * usa lazy loading (Seção 22).
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
        <p className={styles.heroYear}>1985</p>
        <h1 className={styles.heroHeadline}>{t.headline}</h1>
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
