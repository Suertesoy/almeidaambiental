import styles from "./historia.module.css";
import { ChevronDownIcon } from "../icons";
import IllustrativeBadge from "../shared/IllustrativeBadge";
import { HERO_IMAGE } from "../../lib/historia-data";

/**
 * Abertura cinematográfica (Seção 6): 1985 ocupa quase toda a primeira
 * dobra. Só a foto principal carrega com prioridade — o resto da página
 * usa lazy loading (Seção 22).
 */
export default function HeroDecades() {
  return (
    <section className={styles.hero} aria-label="Grupo Almeida — 1985, o início de uma história de quatro décadas">
      <img
        src={HERO_IMAGE.src}
        alt={HERO_IMAGE.alt}
        className={styles.heroImage}
        fetchPriority="high"
        loading="eager"
        decoding="async"
      />
      <div className={styles.heroScrim} aria-hidden="true" />
      <div className={styles.heroSurfaceCue} aria-hidden="true" />

      <div className={styles.heroContent}>
        <p className={styles.heroEyebrow}>Grupo Almeida · Nossa história</p>
        <p className={styles.heroYear}>1985</p>
        <h1 className={styles.heroHeadline}>Uma família deixa Chapecó rumo a São José.</h1>
        <p className={styles.heroLede}>
          Em um galpão de 300 m², com uma prensa vertical e uma caminhonete Willys a gasolina, começava uma
          história que atravessaria quatro décadas.
        </p>
      </div>

      <div className={styles.heroHint} aria-hidden="true">
        <span>Role para percorrer nossa história</span>
        <ChevronDownIcon />
      </div>

      <IllustrativeBadge position="top-right" />
    </section>
  );
}
