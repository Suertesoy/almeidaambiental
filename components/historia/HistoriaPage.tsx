import Link from "next/link";
import styles from "./historia.module.css";
import { ChevronDownIcon } from "../icons";
import HeroDecades from "./HeroDecades";
import ChapterSection from "./ChapterSection";
import GrowthScale from "./GrowthScale";
import ExpansionMap from "./ExpansionMap";
import Epilogue from "./Epilogue";

/**
 * "Quatro décadas, uma linha contínua." Orquestra a experiência de
 * /historia na ordem narrativa da Seção 4 da tarefa: abertura 1985 →
 * ORIGEM → EVOLUÇÃO → (subnarrativa de crescimento) → EXPANSÃO (com o
 * mapa como quebra de ritmo) → NOVO CICLO → epílogo.
 */
export default function HistoriaPage() {
  return (
    <div className={styles.page} data-page="historia">
      <Link className={styles.backFab} href="/" aria-label="Voltar para a Home do Grupo Almeida">
        <ChevronDownIcon />
        <span>Voltar para a Home</span>
      </Link>

      <HeroDecades />

      <ChapterSection chapter="origem" />
      <ChapterSection chapter="evolucao" />
      <GrowthScale />
      <ExpansionMap />
      <ChapterSection chapter="expansao" />
      <ChapterSection chapter="novo-ciclo" />

      <Epilogue />
    </div>
  );
}
