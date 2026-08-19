import styles from "./IllustrativeBadge.module.css";

type Position = "bottom-right" | "bottom-left" | "top-right";

const POSITION_CLASS: Record<Position, string> = {
  "bottom-right": styles.bottomRight,
  "bottom-left": styles.bottomLeft,
  "top-right": styles.topRight,
};

/**
 * Microlegenda única para sinalizar imagem/visualização não fotográfica.
 * Substitui as 4 implementações duplicadas que existiam antes (CompanyHero,
 * MaterialGrid, ProductRotation, e um <span style={{...}}> cru dentro de
 * EquipamentosPage) — mesmo texto configurável, mesma escala discreta em
 * todo o site.
 */
export default function IllustrativeBadge({
  label = "Imagem ilustrativa",
  position = "bottom-right",
}: {
  label?: string;
  position?: Position;
}) {
  return <span className={`${styles.badge} ${POSITION_CLASS[position]}`}>{label}</span>;
}
