import styles from "./BrandWatermark.module.css";

type Mode = "dark" | "light";

const SRC: Record<Mode, string> = {
  dark: "/brand/simbolo-grupo-almeida-white.svg",
  light: "/brand/simbolo-grupo-almeida-color.svg",
};

const MODE_CLASS: Record<Mode, string> = {
  dark: styles.dark,
  light: styles.light,
};

/**
 * Símbolo do Grupo Almeida como assinatura arquitetônica de fundo — nunca
 * como logo principal. Decorativo, fora da árvore semântica (aria-hidden),
 * sem interação. Tamanho/posição variam por seção via `className` (cada
 * superfície que consome este componente define sua própria classe de
 * posicionamento no módulo CSS local); este arquivo só resolve asset e
 * opacidade por modo de superfície.
 */
export default function BrandWatermark({ mode, className }: { mode: Mode; className?: string }) {
  return (
    <img
      src={SRC[mode]}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={`${styles.watermark} ${MODE_CLASS[mode]} ${className ?? ""}`}
    />
  );
}
