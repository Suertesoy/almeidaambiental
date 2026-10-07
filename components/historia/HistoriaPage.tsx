import Link from "next/link";
import styles from "./historia.module.css";
import { ChevronDownIcon } from "../icons";
import HeroDecades from "./HeroDecades";
import ChapterSection from "./ChapterSection";
import ClosingChapter from "./ClosingChapter";
import { localizeHref } from "../../lib/i18n/routes";
import type { Locale } from "../../lib/i18n/locale";

const COPY = {
  pt: { backAriaLabel: "Voltar para a Home do Grupo Almeida", back: "Voltar para a Home" },
  en: { backAriaLabel: "Back to the Grupo Almeida Home", back: "Back to Home" },
} as const;

/**
 * "Quatro décadas, uma linha contínua." Orquestra a experiência de
 * /historia: abertura 1985 → ORIGEM → EVOLUÇÃO → EXPANSÃO → NOVO CICLO
 * (a linha dourada nunca se interrompe) → fechamento único com escala,
 * epílogo + mapa e as empresas do Grupo. O botão fixo é o único retorno à
 * Home da página.
 */
export default function HistoriaPage({ locale }: { locale: Locale }) {
  const t = COPY[locale];

  return (
    <div className={styles.page} data-page="historia">
      <Link
        className={styles.backFab}
        href={localizeHref("/", locale)}
        aria-label={t.backAriaLabel}
        title={t.back}
      >
        <ChevronDownIcon />
      </Link>

      <HeroDecades locale={locale} />

      <ChapterSection chapter="origem" locale={locale} />
      <ChapterSection chapter="evolucao" locale={locale} />
      <ChapterSection chapter="expansao" locale={locale} />
      <ChapterSection chapter="novo-ciclo" locale={locale} />

      <ClosingChapter locale={locale} />
    </div>
  );
}
