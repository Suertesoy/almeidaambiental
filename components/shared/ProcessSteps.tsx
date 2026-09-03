import styles from "./ProcessSteps.module.css";
import { PROCESS_STEP_ICONS } from "../icons";

export type ProcessStep = {
  name: string;
  /** Frase curta — só quando existir conteúdo já validado para a etapa. */
  note?: string;
};

/**
 * As seis etapas da operação (Diagnóstico → Coleta → Triagem → Trituração
 * → Descaracterização → Destinação) como lista visual rápida de ler.
 *
 * No mobile é um trilho horizontal com scroll nativo; no desktop as seis
 * etapas aparecem simultaneamente. Em ambos os casos a seção inteira ocupa
 * uma fração da altura que ocupava com os seis cards de imagem.
 *
 * Acessibilidade: o contêiner de scroll é focável e anunciado como grupo,
 * então quem navega por teclado alcança o trilho e rola com as setas — e o
 * scroll é overflow nativo do navegador, que nunca captura o gesto
 * vertical da página. Os ícones são decorativos (o nome da etapa já está
 * em texto), então ficam fora da árvore semântica.
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
              {StepIcon && <StepIcon className={styles.icon} />}
              <p className={styles.name}>{step.name}</p>
              {step.note && <p className={styles.note}>{step.note}</p>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
