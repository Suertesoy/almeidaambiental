import styles from "./MaterialGrid.module.css";
import IllustrativeBadge from "./IllustrativeBadge";
import type { EditorialImage } from "../../lib/media";

export type MaterialGridProps = {
  materials: string[];
  image: EditorialImage;
  /** "tags" = pílulas soltas (mosaico, hoje sem uso — mantido por
   *  compatibilidade); "index" = lista numerada em colunas (Saturno);
   *  "editorial" = lista tipográfica em duas colunas, sem numeração/pill
   *  (Almeida Ambiental) — mesma lista de materiais em todas, composição
   *  visual distinta para as páginas não repetirem o mesmo bloco. */
  variant?: "tags" | "index" | "editorial";
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
        {image.sourceType !== "archive" && <IllustrativeBadge />}
      </div>

      {variant === "tags" && (
        <ul className={styles.tagsList}>
          {materials.map((material) => (
            <li key={material}>{material}</li>
          ))}
        </ul>
      )}

      {variant === "index" && (
        <ul className={styles.indexList}>
          {materials.map((material, index) => (
            <li key={material} className={styles.indexItem}>
              <span className={styles.indexNumber}>{String(index + 1).padStart(2, "0")}</span>
              <span>{material}</span>
            </li>
          ))}
        </ul>
      )}

      {variant === "editorial" && (
        <ul className={styles.editorialList}>
          {materials.map((material) => (
            <li key={material} className={styles.editorialItem}>
              {material}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
