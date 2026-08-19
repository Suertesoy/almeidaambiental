import styles from "./MaterialGrid.module.css";
import type { EditorialImage } from "../../lib/media";

export type MaterialGridProps = {
  materials: string[];
  image: EditorialImage;
  /** "tags" = pílulas soltas (mosaico); "index" = lista numerada em colunas
   *  (mais sóbria) — mesma lista de materiais, composição visual distinta
   *  para não repetir o mesmo bloco entre Almeida Ambiental e Saturno. */
  variant?: "tags" | "index";
  dark?: boolean;
};

/**
 * Bloco obrigatório de materiais (Seções 14/28 da tarefa): fotografia
 * editorial + todos os nomes de material legíveis nominalmente — nunca só
 * ícones. A lista em si vem de `lib/*-data.ts` (fonte institucional), este
 * componente só decide a composição visual.
 */
export default function MaterialGrid({ materials, image, variant = "tags", dark = false }: MaterialGridProps) {
  return (
    <div className={`${styles.layout} ${dark ? styles.dark : ""}`}>
      <div className={styles.media}>
        <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
        {image.sourceType !== "archive" && <span className={styles.illustrativeTag}>Imagem ilustrativa</span>}
      </div>

      {variant === "tags" ? (
        <ul className={styles.tagsList}>
          {materials.map((material) => (
            <li key={material}>{material}</li>
          ))}
        </ul>
      ) : (
        <ul className={styles.indexList}>
          {materials.map((material, index) => (
            <li key={material} className={styles.indexItem}>
              <span className={styles.indexNumber}>{String(index + 1).padStart(2, "0")}</span>
              <span>{material}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
