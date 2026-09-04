import styles from "./ProcessSteps.module.css";
import { PROCESS_STEP_ICONS, ProcessConnectorIcon } from "../icons";

export type ProcessStep = {
  name: string;
};

/**
 * ============================================================
 * PROCESS FLOW MARQUEE — o processo como movimento, não como dashboard
 * ============================================================
 *
 * Rodada de refino de fluxo/materiais: a versão anterior (microcomposição —
 * traços e blocos representando o estado da matéria a cada etapa, ver
 * histórico deste arquivo) continuava lendo como componente de dashboard —
 * ícone, nome, gráfico abstrato, divisor, próxima etapa. Este componente
 * abandona esse vocabulário inteiro. O que resta é o mínimo possível:
 *
 *   ÍCONE + NOME + CONECTOR
 *
 * ...e o próprio MOVIMENTO como expressão visual — a sequência atravessa a
 * viewport da esquerda para a direita, em loop contínuo, como uma faixa
 * (sem fundo, sem card, sem borda) flutuando no espaço da seção.
 *
 * ---------------- Como o loop funciona ----------------
 * `.track` contém DUAS cópias visuais idênticas da sequência lado a lado
 * (`.sequence`, a real, semântica; `.sequenceCopy`, aria-hidden="true") e
 * anima com `translateX(-50%)` — como as duas cópias têm exatamente a
 * mesma largura, deslocar por metade da largura do track equivale a
 * deslocar por uma sequência inteira, e o quadro final é pixel-idêntico ao
 * quadro inicial: o loop não tem salto perceptível. `width: max-content`
 * no track é o que garante que ele seja exatamente 2x a largura de uma
 * sequência, não 100% de um container que poderia ser menor.
 *
 * Só a primeira cópia é uma <ol> semântica (ordem das etapas reais); a
 * segunda existe só para completar visualmente o loop e não deve ser
 * anunciada por leitor de tela nem alcançável por Tab.
 *
 * ---------------- Interação ----------------
 * Desktop: hover ou foco no viewport pausa a animação. Mobile: nenhum
 * gesto horizontal é exigido — a animação roda sozinha e o scroll vertical
 * da página nunca é interceptado (o marquee não captura eventos de toque).
 *
 * `prefers-reduced-motion: reduce`: a animação para, a cópia duplicada some
 * (`display:none`) e a sequência real vira scroll horizontal nativo — toda
 * a informação continua acessível, só o movimento desaparece.
 *
 * ---------------- Escopo ----------------
 * Este componente representa PROCESSO, e só processo — materiais e
 * equipamentos continuam com a própria linguagem (MaterialCards, peças
 * editoriais). Não virou um componente genérico de lista/carrossel.
 */
function Sequence({ steps, hidden }: { steps: ProcessStep[]; hidden?: boolean }) {
  const Tag = hidden ? "div" : "ol";
  const Item = hidden ? "div" : "li";
  return (
    <Tag className={`${styles.sequence} ${hidden ? styles.sequenceCopy : ""}`} aria-hidden={hidden ? "true" : undefined}>
      {steps.map((step, index) => {
        const StepIcon = PROCESS_STEP_ICONS[index];
        return (
          <Item key={step.name} className={styles.step}>
            {StepIcon && <StepIcon className={styles.icon} />}
            <p className={styles.name}>{step.name}</p>
            <ProcessConnectorIcon className={styles.connector} />
          </Item>
        );
      })}
    </Tag>
  );
}

export default function ProcessSteps({
  steps,
  ariaLabel = "Etapas da operação",
}: {
  steps: ProcessStep[];
  ariaLabel?: string;
}) {
  return (
    <div className={styles.viewport} tabIndex={0} role="group" aria-label={ariaLabel}>
      <div className={styles.track}>
        <Sequence steps={steps} />
        <Sequence steps={steps} hidden />
      </div>
    </div>
  );
}
