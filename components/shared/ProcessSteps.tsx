import styles from "./ProcessSteps.module.css";
import { PROCESS_STEP_ICONS } from "../icons";

export type ProcessStep = {
  name: string;
  /** Frase curta — só quando existir conteúdo já validado para a etapa. */
  note?: string;
};

/**
 * ============================================================
 * MICROCOMPOSIÇÃO — a matéria mudando de estado, etapa a etapa
 * ============================================================
 *
 * O problema da versão anterior não era a informação: era que ícone +
 * nome + borda é a MESMA apresentação que serve para categoria, para
 * serviço e para processo. Nada ali dizia "isto é uma transformação".
 *
 * Cada etapa ganha uma microcomposição própria construída com um
 * vocabulário mínimo — traços verticais e uma linha de percurso — onde o
 * que muda de uma etapa para a outra é o RITMO dos traços:
 *
 *   Diagnóstico       4 traços esparsos e irregulares  (matéria bruta,
 *                     ainda não medida)
 *   Coleta            os traços se agrupam em três blocos (recolhimento)
 *   Triagem           os grupos ficam regulares e equidistantes (separado
 *                     por tipo)
 *   Trituração        muitos traços curtos e densos (fragmentado)
 *   Descaracterização traços mínimos e todos idênticos (perdeu a forma
 *                     reconhecível — é literalmente o que a etapa faz)
 *   Destinação        os fragmentos voltam a ser dois volumes sólidos
 *                     com cintas (fardo pronto)
 *
 * Não é imagem, não é ilustração e não é ícone repetido: é a mesma
 * matéria contada seis vezes.
 *
 * ---------------- A linha que atravessa ----------------
 * `flow` é [y de entrada, y de saída] no viewBox de cada segmento, e a
 * saída de uma etapa é SEMPRE a entrada da seguinte (46→44→38→30→26→20→16).
 * Como os segmentos encostam um no outro (gap: 0 no CSS), a linha lida no
 * desktop é uma régua única subindo ao longo das seis etapas, não seis
 * traços soltos. A subida não é decorativa: é o resíduo ganhando valor ao
 * longo do percurso.
 *
 * ---------------- Por que só traço vertical ----------------
 * O SVG usa `preserveAspectRatio="none"` para que a linha de percurso
 * toque exatamente as duas bordas do segmento em qualquer largura — sem
 * isso ela não emendaria com a do vizinho. A contrapartida é que o eixo x
 * estica. Todo o vocabulário foi então escolhido para sobreviver a isso:
 * traço vertical não tem largura para esticar, e `vector-effect` mantém a
 * espessura constante. Círculo, diagonal e texto ficariam deformados —
 * por isso não existe nenhum aqui.
 */
type Micro = {
  flow: [number, number];
  /** [x, altura] de cada traço, medidos a partir da base (y = 58). */
  ticks: [number, number][];
  /** Volumes sólidos — só a última etapa tem. [x, largura, altura] */
  blocks?: [number, number, number][];
};

const MICRO: Micro[] = [
  /* Diagnóstico */
  { flow: [46, 44], ticks: [[14, 30], [42, 18], [70, 38], [98, 24]] },
  /* Coleta */
  {
    flow: [44, 38],
    ticks: [[12, 24], [19, 30], [46, 22], [53, 28], [60, 22], [88, 26], [95, 20]],
  },
  /* Triagem */
  {
    flow: [38, 30],
    ticks: [
      [12, 26], [20, 26], [28, 26],
      [52, 26], [60, 26], [68, 26],
      [92, 26], [100, 26], [108, 26],
    ],
  },
  /* Trituração — fragmentos de tamanhos ainda diferentes entre si */
  {
    flow: [30, 26],
    ticks: [
      [10, 19], [17, 9], [24, 17], [31, 8], [38, 15], [45, 10],
      [52, 20], [59, 8], [66, 16], [73, 11], [80, 18], [87, 9],
      [94, 15], [101, 10], [108, 17],
    ],
  },
  /* Descaracterização — mais denso e RIGOROSAMENTE uniforme: nada ali
     tem mais forma própria que o vizinho. É a diferença que separa
     "quebrado em pedaços" de "não é mais reconhecível". */
  {
    flow: [26, 20],
    ticks: [
      [10, 6], [14, 6], [18, 6], [22, 6], [26, 6], [30, 6], [34, 6],
      [38, 6], [42, 6], [46, 6], [50, 6], [54, 6], [58, 6], [62, 6],
      [66, 6], [70, 6], [74, 6], [78, 6], [82, 6], [86, 6], [90, 6],
      [94, 6], [98, 6], [102, 6], [106, 6], [110, 6],
    ],
  },
  /* Destinação */
  {
    flow: [20, 16],
    ticks: [],
    blocks: [
      [16, 38, 26],
      [66, 38, 26],
    ],
  },
];

const BASE = 58;

function StepMicro({ index }: { index: number }) {
  const micro = MICRO[index];
  if (!micro) return null;
  const [entry, exit] = micro.flow;

  return (
    <svg className={styles.micro} viewBox="0 0 120 64" preserveAspectRatio="none" aria-hidden="true">
      {micro.ticks.map(([x, h]) => (
        <line
          key={x}
          className={styles.tick}
          x1={x}
          y1={BASE}
          x2={x}
          y2={BASE - h}
          vectorEffect="non-scaling-stroke"
        />
      ))}

      {micro.blocks?.map(([x, w, h]) => (
        <g key={x}>
          <rect className={styles.block} x={x} y={BASE - h} width={w} height={h} />
          {/* Cintas do fardo */}
          <line
            className={styles.strap}
            x1={x + w * 0.28}
            y1={BASE - h}
            x2={x + w * 0.28}
            y2={BASE}
            vectorEffect="non-scaling-stroke"
          />
          <line
            className={styles.strap}
            x1={x + w * 0.72}
            y1={BASE - h}
            x2={x + w * 0.72}
            y2={BASE}
            vectorEffect="non-scaling-stroke"
          />
        </g>
      ))}

      {/* Percurso: entra na borda esquerda e sai na direita, exatamente na
          altura em que o vizinho continua. */}
      <path
        className={styles.flow}
        d={`M0,${entry} C40,${entry} 80,${exit} 120,${exit}`}
        fill="none"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/**
 * PROCESS RIBBON — as seis etapas da operação (Diagnóstico → Coleta →
 * Triagem → Trituração → Descaracterização → Destinação) como UM sistema
 * dividido em seis momentos, não como seis cartões.
 *
 * A informação continua tão simples quanto era (ícone funcional + nome, e
 * uma frase curta só quando existir conteúdo validado para a etapa — o
 * componente nunca inventa uma). O que mudou é a apresentação: cada
 * segmento encosta no vizinho, a régua horizontal é contínua e a linha de
 * percurso atravessa as seis etapas subindo. Ver o bloco MICRO acima.
 *
 * Mobile: trilho horizontal com ~1,5 segmento visível, scroll nativo, snap
 * suave. Sem autoplay, sem dots, sem setas.
 *
 * Desktop (a partir de 720px): as seis simultâneas em seis colunas — uma
 * régua só. A grade intermediária de 3×2 que existia antes foi removida de
 * propósito: ela quebrava a linha de percurso no fim da primeira fileira,
 * que é justamente o que faz as etapas lerem como um processo único.
 *
 * Acessibilidade: o contêiner de scroll é focável e anunciado como grupo,
 * então quem navega por teclado alcança o trilho e rola com as setas — e o
 * scroll é overflow nativo, que nunca captura o gesto vertical da página.
 * Ícones e microcomposições são decorativos (o nome da etapa já está em
 * texto) e ficam fora da árvore semântica.
 *
 * API inalterada em relação à versão anterior: os dois consumidores
 * (HomePage e AlmeidaAmbientalPage) continuam passando `steps` e
 * `ariaLabel` e não precisaram mudar.
 */
export default function ProcessSteps({
  steps,
  ariaLabel = "Etapas da operação",
}: {
  steps: ProcessStep[];
  ariaLabel?: string;
}) {
  return (
    <div className={styles.scroller} tabIndex={0} role="group" aria-label={ariaLabel}>
      <ol className={styles.list}>
        {steps.map((step, index) => {
          const StepIcon = PROCESS_STEP_ICONS[index];
          return (
            <li key={step.name} className={styles.step}>
              <div className={styles.head}>
                {StepIcon && <StepIcon className={styles.icon} />}
                <p className={styles.name}>{step.name}</p>
                {step.note && <p className={styles.note}>{step.note}</p>}
              </div>
              <StepMicro index={index} />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
