import styles from "./IllustrativeBadge.module.css";
import type { Locale } from "../../lib/i18n/locale";
import { dict } from "../../lib/i18n/dictionary";

type Position = "bottom-right" | "bottom-left" | "top-right";

const POSITION_CLASS: Record<Position, string> = {
  "bottom-right": styles.bottomRight,
  "bottom-left": styles.bottomLeft,
  "top-right": styles.topRight,
};

/**
 * Microlegenda única para sinalizar imagem/visualização não fotográfica.
 * Substitui as 4 implementações duplicadas que existiam antes (CompanyHero,
 * MaterialAtlas, ProductRotation, e um <span style={{...}}> cru dentro de
 * EquipamentosPage) — mesmo texto configurável, mesma escala discreta em
 * todo o site. `label` explícito sobrescreve o texto padrão por locale.
 */
export default function IllustrativeBadge({
  label,
  position = "bottom-right",
  locale = "pt",
}: {
  label?: string;
  position?: Position;
  locale?: Locale;
}) {
  return (
    <span className={`${styles.badge} ${POSITION_CLASS[position]}`}>{label ?? dict(locale).illustrativeImage}</span>
  );
}
