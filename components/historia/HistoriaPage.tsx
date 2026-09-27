import Link from "next/link";
import styles from "./historia.module.css";
import { ChevronDownIcon } from "../icons";
import HeroDecades from "./HeroDecades";
import ChapterSection from "./ChapterSection";
import GrowthScale from "./GrowthScale";
import ExpansionMap from "./ExpansionMap";
import Epilogue from "./Epilogue";
import { localizeHref } from "../../lib/i18n/routes";
import type { Locale } from "../../lib/i18n/locale";

const COPY = {
  pt: { backAriaLabel: "Voltar para a Home do Grupo Almeida", back: "Voltar para a Home" },
  en: { backAriaLabel: "Back to the Grupo Almeida Home", back: "Back to Home" },
} as const;

/**
 * "Quatro décadas, uma linha contínua." Orquestra a experiência de
 * /historia na ordem narrativa da Seção 4 da tarefa: abertura 1985 →
 * ORIGEM → EVOLUÇÃO → (subnarrativa de crescimento) → EXPANSÃO (com o
 * mapa como quebra de ritmo) → NOVO CICLO → epílogo.
 */
export default function HistoriaPage({ locale }: { locale: Locale }) {
  const t = COPY[locale];

  return (
    <div className={styles.page} data-page="historia">
      <Link className={styles.backFab} href={localizeHref("/", locale)} aria-label={t.backAriaLabel}>
        <ChevronDownIcon />
        <span>{t.back}</span>
      </Link>

      <HeroDecades locale={locale} />

      <ChapterSection chapter="origem" locale={locale} />
      <ChapterSection chapter="evolucao" locale={locale} />
      <GrowthScale locale={locale} />
      <ExpansionMap locale={locale} />
      <ChapterSection chapter="expansao" locale={locale} />
      <ChapterSection chapter="novo-ciclo" locale={locale} />

      <Epilogue locale={locale} />
    </div>
  );
}
