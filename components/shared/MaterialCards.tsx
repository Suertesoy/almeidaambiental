import styles from "./MaterialCards.module.css";
import { MATERIAL_ICONS } from "../icons";
import { CORE_MATERIALS, translateMaterial } from "../../lib/materials";
import type { Locale } from "../../lib/i18n/locale";

export type MaterialCardsTone = "ambiental" | "saturno";

/**
 * ============================================================
 * MATERIAL CARDS — coleção visual, não inventário
 * ============================================================
 *
 * Substitui o Material Atlas (imagem grande + lista tipográfica em formato
 * de tabela) nas duas páginas que exibem a mesma lista validada de
 * materiais (lib/materials.ts, CORE_MATERIALS — fonte única, nenhum nome
 * acrescentado, removido ou reescrito aqui).
 *
 * Cada item é primeiro SÍMBOLO, depois NOME: ícone grande e centralizado,
 * nome embaixo, muito espaço negativo. Sem descrição, sem número, sem
 * categoria, sem "Saiba mais" — os cards são informativos, não clicáveis,
 * por isso `<ul>/<li>` simples, nunca `<button>`.
 *
 * `tone` aplica a superfície tonal do território que hospeda o grid
 * (ver MaterialCards.module.css): "ambiental" para a área clara da Almeida
 * Ambiental, "saturno" para a superfície escura/quente do território
 * Saturno. Mesmo componente, tema visual por empresa.
 */
export default function MaterialCards({ tone, locale }: { tone: MaterialCardsTone; locale: Locale }) {
  return (
    <ul className={`${styles.grid} ${styles[tone]}`}>
      {CORE_MATERIALS.map((material) => {
        const Icon = MATERIAL_ICONS[material];
        return (
          <li key={material} className={styles.card}>
            {Icon && <Icon className={styles.icon} />}
            <span className={styles.name}>{translateMaterial(material, locale)}</span>
          </li>
        );
      })}
    </ul>
  );
}
