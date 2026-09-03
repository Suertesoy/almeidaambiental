import styles from "./MaterialSurface.module.css";
import { MATERIAL_SURFACES, type MaterialSurfaceId } from "../../lib/material-surfaces";

/**
 * Os mesmos dois arquivos de símbolo isolado que BrandWatermark e
 * BrandBoundaryMark já consomem. Não existe outro símbolo vetorial no
 * repositório e nenhum é gerado aqui.
 */
const SYMBOL_SRC = {
  white: "/brand/simbolo-grupo-almeida-white.svg",
  color: "/brand/simbolo-grupo-almeida-color.svg",
} as const;

const TONE_CLASS = {
  forest: styles.forest,
  carvao: styles.carvao,
  saturno: styles.saturno,
  stoneAlt: styles.stoneAlt,
} as const;

const INTENSITY_CLASS = {
  soft: styles.soft,
  medium: styles.medium,
  strong: styles.strong,
} as const;

/**
 * MATERIAL SURFACE — camada de materialidade de uma dobra âncora.
 *
 * Não é um wrapper: renderiza uma CAMADA DE FUNDO absoluta dentro de uma
 * seção que já tem o seu tom (`.toneForest`, `.toneCarvao`, ...). Foi
 * desenhada assim de propósito — a seção continua dona do seu tom, dos
 * seus papéis de texto (--role-*) e do seu espaçamento, e adicionar
 * materialidade a uma dobra existente é uma linha, sem reorganizar JSX,
 * sem mudar hierarquia e sem mexer no que a rodada anterior estabeleceu.
 *
 * ---------------- Como imagem e fundo viram uma coisa só ----------------
 * A textura entra com `mix-blend-mode: luminosity`: a matéria contribui
 * SÓ com claro/escuro, e o matiz continua sendo o da superfície. É a
 * diferença entre uma fotografia colada sobre a seção e uma superfície
 * que por acaso tem matéria dentro. Por cima vem um véu do próprio tom,
 * com alfa mínimo fixado por intensidade (ver o módulo CSS) — a matéria
 * nunca clareia a superfície além do ponto em que o texto perde contraste.
 *
 * ---------------- Empilhamento ----------------
 * `data-layer="background"` é o contrato com `boundarySurface`
 * (BrandBoundaryMark.module.css): a regra que empurra o conteúdo real da
 * seção para z-index 1 exclui explicitamente esta camada, então a ordem de
 * pintura fica textura → símbolo de fronteira → conteúdo. Sem o atributo,
 * a textura subiria para a mesma camada do conteúdo e cobriria a
 * assinatura de fronteira.
 *
 * ---------------- Enquanto não houver asset ----------------
 * Quando o par desktop/mobile ainda é `null` em lib/material-surfaces.ts
 * (hoje: todos, ver o cabeçalho de lá), nenhuma imagem é renderizada e
 * nenhuma outra é emprestada no lugar. Sobra a superfície sólida da seção
 * com o símbolo grande e cortado — que já é uma composição válida, só sem
 * a camada material. É por isso que o componente pode ser montado nos
 * pontos âncora antes dos arquivos existirem.
 *
 * Decorativo de ponta a ponta: `aria-hidden`, sem interação, `alt` vazio.
 */
export default function MaterialSurface({
  surface,
  className,
}: {
  surface: MaterialSurfaceId;
  className?: string;
}) {
  const asset = MATERIAL_SURFACES[surface];
  const hasTexture = Boolean(asset.desktop && asset.mobile);
  const { symbol } = asset;

  return (
    <div
      data-layer="background"
      aria-hidden="true"
      className={`${styles.layer} ${TONE_CLASS[asset.tone]} ${INTENSITY_CLASS[asset.intensity]} ${
        className ?? ""
      }`}
    >
      {hasTexture && (
        <picture className={styles.texture}>
          <source media="(max-width: 767px)" srcSet={asset.mobile!} />
          <img src={asset.desktop!} alt="" draggable={false} loading="lazy" decoding="async" />
        </picture>
      )}

      {/* O véu existe mesmo sem textura: é ele que garante que o dia em que
          o asset entrar, o contraste do texto não mude junto. */}
      <span className={styles.veil} />

      {symbol && (
        <img
          src={SYMBOL_SRC[symbol.variant]}
          alt=""
          draggable={false}
          className={`${styles.symbol} ${symbol.side === "left" ? styles.left : styles.right}`}
          style={
            {
              "--ms-symbol-scale": symbol.scale,
              "--ms-symbol-bleed": symbol.bleed,
            } as React.CSSProperties
          }
        />
      )}
    </div>
  );
}
