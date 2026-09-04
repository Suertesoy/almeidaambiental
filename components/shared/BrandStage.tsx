import type { ReactNode } from "react";
import styles from "./BrandStage.module.css";

type BrandStageProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Primitiva mínima para as dobras de entrada de empresa (Ambiental,
 * Equipamentos, Saturno na Home): substitui o slot que antes tinha uma
 * fotografia por uma área de respiro dedicada à logo grande — sem card,
 * borda, sombra ou fundo próprio, só centralização óptica. `className`
 * carrega a posição no grid do chamador (ex.: grid-area da dobra); a logo
 * específica e a cor de fundo continuam decisão de quem consome.
 */
export default function BrandStage({ children, className }: BrandStageProps) {
  return <div className={`${styles.stage}${className ? ` ${className}` : ""}`}>{children}</div>;
}
