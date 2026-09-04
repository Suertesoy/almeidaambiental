"use client";

import { useState } from "react";
import styles from "./MaterialAtlas.module.css";
import IllustrativeBadge from "./IllustrativeBadge";
import { MATERIAL_ICONS } from "../icons";
import { MATERIAL_FAMILIES } from "../../lib/materials";
import { MATERIAL_IMAGES } from "../../lib/material-surfaces";
import type { EditorialImage } from "../../lib/media";

/**
 * ============================================================
 * MATERIAL ATLAS — a diversidade de material como matéria, não como grade
 * ============================================================
 *
 * O bloco de materiais funcionava (todos os nomes legíveis, ícone
 * reconhecível, lista completa) e continuava visualmente pobre: doze
 * itens equidistantes leem como doze itens equidistantes, seja qual for o
 * assunto. Quem bate o olho não conclui "trabalham com muitos tipos de
 * material" — conclui "tem uma lista aqui".
 *
 * O Atlas troca a grade por uma composição assimétrica: uma peça grande
 * de matéria e, ao lado dela, a lista tipográfica organizada por família
 * (ver MATERIAL_FAMILIES em lib/materials.ts — agrupamento de leitura
 * sobre a lista validada, sem acrescentar nem remover nenhum nome).
 *
 * ---------------- O que continua sendo verdade ----------------
 * O texto HTML é a fonte exata. A imagem representa FAMÍLIAS de material,
 * não os doze itens um a um, e nada na interface sugere que ela seja um
 * inventário: não existe hotspot sobre a imagem, não existe número
 * apontando para uma região dela e nenhum nome é ancorado a um pedaço da
 * fotografia. Inventar essa correspondência seria afirmar uma precisão que
 * a imagem não tem.
 *
 * A interação é a inversa e é honesta: tocar um material destaca aquele
 * material NA LISTA. É um recurso de leitura de lista, não um mapa da
 * imagem.
 *
 * ---------------- Enquanto não houver o par do Atlas ----------------
 * O par do Atlas em MATERIAL_IMAGES ainda é `null` porque o conector do Magnific
 * está bloqueado (ver o cabeçalho de lib/material-surfaces.ts).
 *
 * `interimImage` existe só para essa janela, e a distinção importa:
 *
 *   · NÃO é uma imagem emprestada de outra seção para preencher vão. É
 *     exatamente o asset que a página JÁ exibia neste mesmo bloco antes
 *     desta rodada. Mantê-lo evita que uma mudança de direção de arte
 *     apague conteúdo existente enquanto o substituto não chega.
 *   · Continua sendo uma CENA ilustrativa, não matéria editorial — por
 *     isso recebe IllustrativeBadge, ao contrário do par do Atlas, que
 *     será materialidade e não receberá.
 *
 * Quando o par entrar em MATERIAL_IMAGES, ele passa na frente
 * automaticamente e `interimImage` pode sair das chamadas.
 *
 * Sem nenhum dos dois (caso da Saturno, que não tem fotografia legítima
 * para este bloco), a lista assume a largura inteira em composição
 * própria — ausência de imagem é uma composição válida.
 */
export default function MaterialAtlas({
  interimImage,
  dark = false,
  showImage = true,
}: {
  interimImage?: EditorialImage;
  dark?: boolean;
  /**
   * A Saturno usa a mesma lista de materiais (mesma fonte de dados), mas
   * não pode repetir a MESMA fotografia grande do Atlas da Almeida
   * Ambiental — leria como a página copiando a outra (correção de direção
   * de arte, Seção 20). `showImage={false}` força o layout sem mídia
   * mesmo quando o par MATERIAL_IMAGES existe; quem chama assim entra com
   * a própria materialidade por trás (ver SaturnoPage.tsx).
   */
  showImage?: boolean;
}) {
  const [active, setActive] = useState<string | null>(null);
  const atlas = MATERIAL_IMAGES["material-atlas"];
  const atlasPair = showImage && Boolean(atlas.desktop && atlas.mobile);
  const hasImage = atlasPair || (showImage && Boolean(interimImage));

  return (
    <div
      className={`${styles.atlas} ${hasImage ? "" : styles.atlasNoMedia} ${dark ? styles.dark : ""}`}
    >
      {atlasPair ? (
        <figure className={styles.media}>
          <picture>
            <source media="(max-width: 767px)" srcSet={atlas.mobile!} />
            <img src={atlas.desktop!} alt={atlas.alt} loading="lazy" decoding="async" />
          </picture>
        </figure>
      ) : (
        showImage && interimImage && (
          <figure className={styles.media}>
            <img src={interimImage.src} alt={interimImage.alt} loading="lazy" decoding="async" />
            {interimImage.sourceType !== "archive" && <IllustrativeBadge />}
          </figure>
        )
      )}

      <div className={styles.index}>
        {MATERIAL_FAMILIES.map((family) => (
          <section key={family.id} className={styles.family}>
            <h3 className={styles.familyLabel}>
              {family.label}
              <span className={styles.familyCount}>{String(family.items.length).padStart(2, "0")}</span>
            </h3>
            <ul className={styles.familyList}>
              {family.items.map((material) => {
                const MaterialIcon = MATERIAL_ICONS[material];
                const isActive = active === material;
                return (
                  <li key={material}>
                    <button
                      type="button"
                      className={`${styles.item} ${isActive ? styles.itemActive : ""}`}
                      aria-pressed={isActive}
                      onClick={() => setActive(isActive ? null : material)}
                    >
                      {MaterialIcon && <MaterialIcon className={styles.itemIcon} />}
                      <span className={styles.itemName}>{material}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
