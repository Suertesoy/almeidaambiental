import styles from "./TerritoryMap.module.css";
import { SC_OUTLINE_PATH, SC_VIEWBOX, TERRITORY_POINTS } from "../../lib/geo-santa-catarina";

/**
 * ============================================================
 * TERRITORY MAP — Santa Catarina de verdade
 * ============================================================
 *
 * Substitui o traçado que existia em RegionalMap.tsx: uma silhueta
 * desenhada à mão, com sete curvas, que não correspondia a Santa Catarina
 * e cuja própria legenda precisava avisar "sem escala geográfica exata".
 * Um mapa institucional que pede desculpa por não ser um mapa não está
 * cumprindo função nenhuma.
 *
 * Agora o contorno é a malha oficial do IBGE e os pontos são coordenadas
 * reais, ambos congelados em lib/geo-santa-catarina.ts — ver lá a fonte,
 * a data, a projeção e a validação por point-in-polygon. Nada é buscado
 * em runtime e nenhum geocoding acontece no cliente.
 *
 * ---------------- Os halos NÃO são raio de cobertura ----------------
 * Esta é a decisão mais importante do componente e ela está no desenho,
 * não só no texto:
 *
 *   TODOS os halos têm exatamente o mesmo raio.
 *
 * Um raio operacional real varia de unidade para unidade — é isso que o
 * torna informação. Um halo de tamanho idêntico em todas as localidades
 * não pode ser lido como área atendida, porque nenhuma cobertura real
 * seria idêntica em Chapecó e em Araquari. O halo aqui é marcador de
 * PRESENÇA, e a legenda diz isso com todas as letras.
 *
 * Se um dia existir dado validado de abrangência, ele pode ser
 * representado — mas aí como raio variável e com fonte declarada, que é
 * outra coisa.
 *
 * ---------------- Por que não há nome de cidade sobre o mapa ----------
 * Quatro das cinco localidades ficam no leste do estado, e duas delas
 * (Joinville e Araquari) caem a menos de 10px uma da outra na maior
 * largura em que o mapa é renderizado. Rótulos sobre o desenho ou
 * colidiriam, ou precisariam de linhas-guia cruzando a geografia, ou
 * exigiriam posições diferentes por breakpoint — três formas de piorar o
 * mapa para resolver um problema de tipografia.
 *
 * A saída é a gramática de atlas que o site já usa: pino numerado no mapa,
 * índice numerado ao lado. Os nomes ficam em HTML de verdade — legíveis em
 * qualquer viewport, disponíveis para leitor de tela, e sem competir com o
 * traço fino do contorno.
 *
 * ---------------- O que deliberadamente não existe aqui ----------------
 * Nenhuma linha conectando as localidades: uma linha entre duas unidades
 * lê como rota, e não existe rota logística validada no conteúdo do
 * projeto. Nenhum município além dos cinco já validados. Nenhuma malha
 * municipal, rodovia, relevo ou divisa interna — o assunto é presença, e
 * mapa administrativo cheio de informação é exatamente o que a rodada
 * pediu para evitar.
 */

/** Raio único de presença — ver o bloco acima. Em unidades do viewBox. */
const PRESENCE_HALO = 26;

/**
 * Deslocamento do NÚMERO do pino, em unidades do viewBox.
 *
 * Joinville e Araquari são municípios vizinhos: os dois pontos caem a
 * cerca de 27 unidades um do outro, e os números empilhados em cima
 * deles se encostavam. O deslocamento afasta os dois rótulos em
 * direções opostas SEM mexer no ponto — a coordenada continua sendo a
 * real, e é o ponto, não o número, que marca o lugar.
 *
 * Chaveado por código IBGE (e não por nome) para que uma correção de
 * grafia no conteúdo não desalinhe silenciosamente o mapa.
 */
const LABEL_OFFSET: Record<string, { dx: number; dy: number }> = {
  "4209102": { dx: -26, dy: -6 }, // Joinville — número à esquerda
  "4201307": { dx: 26, dy: 12 }, //  Araquari  — número à direita e abaixo
};

export default function TerritoryMap({
  ariaLabel = "Mapa de Santa Catarina com as localidades onde o Grupo Almeida está presente",
}: {
  ariaLabel?: string;
}) {
  return (
    <div className={styles.frame}>
      <div className={styles.mapArea}>
        {/* Símbolo oficial atrás da geografia — grande, cortado pela moldura
            e em opacidade baixíssima. Fica no sudoeste do quadro, onde o
            estado não passa, então não disputa leitura com o contorno. */}
        <img
          src="/brand/simbolo-grupo-almeida-white.svg"
          alt=""
          aria-hidden="true"
          draggable={false}
          className={styles.symbol}
        />

        <svg
          className={styles.svg}
          viewBox={`0 0 ${SC_VIEWBOX.width} ${SC_VIEWBOX.height}`}
          role="img"
          aria-label={ariaLabel}
        >
          <path className={styles.outline} d={SC_OUTLINE_PATH} />

          {TERRITORY_POINTS.map((point, index) => (
            <g key={point.ibge}>
              <circle
                className={styles.halo}
                cx={point.x}
                cy={point.y}
                r={PRESENCE_HALO}
              />
              <circle
                className={point.brand === "saturno-ambiental" ? styles.dotSaturno : styles.dot}
                cx={point.x}
                cy={point.y}
                r="6"
              />
              <text
                className={styles.pinNumber}
                x={point.x + (LABEL_OFFSET[point.ibge]?.dx ?? 0)}
                y={point.y - 14 + (LABEL_OFFSET[point.ibge]?.dy ?? 0)}
              >
                {String(index + 1).padStart(2, "0")}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <ol className={styles.index}>
        {TERRITORY_POINTS.map((point, index) => (
          <li key={point.ibge} className={styles.indexItem}>
            <span className={styles.indexNumber}>{String(index + 1).padStart(2, "0")}</span>
            <span className={styles.indexBody}>
              <span className={styles.indexName}>{point.name}</span>
              <span
                className={`${styles.indexRole} ${
                  point.brand === "saturno-ambiental" ? styles.indexRoleSaturno : ""
                }`}
              >
                {point.role}
              </span>
            </span>
          </li>
        ))}
      </ol>

      <p className={styles.caption}>
        Contorno de Santa Catarina a partir da malha territorial oficial do IBGE. Os círculos indicam
        presença nas localidades — não representam raio de atendimento.
      </p>
    </div>
  );
}
