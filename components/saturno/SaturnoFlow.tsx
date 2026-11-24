"use client";

import { useEffect, useRef } from "react";
import styles from "./saturno-flow.module.css";
import {
  ProcessColetaIcon,
  ProcessDestinacaoIcon,
  ProcessEnfardamentoIcon,
  ProcessTriagemIcon,
  ProcessTrituracaoIcon,
} from "../icons";
import type { Frente } from "../../lib/saturno-data";
import type { Locale } from "../../lib/i18n/locale";

export type SaturnoFlowProps = {
  locale: Locale;
  coleta: Frente;
  triagem: Frente;
  trituracao: Frente;
  enfardamento: Frente;
  destinacao: Frente;
};

const COPY = {
  pt: {
    ariaLabel: "Fluxo operacional em quatro etapas com tratamento opcional",
    srSummary:
      "Fluxo operacional da Saturno Ambiental: 01 Coleta de resíduos segue para 02 Triagem e classificação. Da triagem, o material segue continuamente para 03 Enfardamento ou, quando necessário, passa pela ramificação opcional 02.1 Trituração ou descaracterização antes do enfardamento, seguindo então para 04 Destinação.",
    step01: "01",
    step02: "02",
    step03: "03",
    step04: "04",
    optionalTag: "02.1 · Tratamento opcional",
    optionalTitle: "Trituração ou descaracterização",
  },
  en: {
    ariaLabel: "Four-stage operational flow with optional treatment",
    srSummary:
      "Saturno Ambiental operational flow: 01 Waste collection moves to 02 Sorting and classification. From sorting, material flows continuously to 03 Baling or, when needed, takes the optional branch 02.1 Shredding or destruction before returning to baling, then continues to 04 Final destination.",
    step01: "01",
    step02: "02",
    step03: "03",
    step04: "04",
    optionalTag: "02.1 · Optional treatment",
    optionalTitle: "Shredding or destruction",
  },
} as const;

export function SaturnoFlow({
  locale,
  coleta,
  triagem,
  trituracao,
  enfardamento,
  destinacao,
}: SaturnoFlowProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const t = COPY[locale];

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add(styles.revealed);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add(styles.revealed);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={rootRef}
      className={styles.flowRoot}
      role="region"
      aria-label={t.ariaLabel}
    >
      <p className={styles.srOnly}>{t.srSummary}</p>

      <div className={styles.diagram}>
        {/* 01 Coleta */}
        <article className={`${styles.stageCard} ${styles.stage1}`}>
          <div className={styles.stageHeader}>
            <span className={styles.stageNumber}>{t.step01}</span>
            <span className={styles.stageIcon} aria-hidden="true">
              <ProcessColetaIcon className={styles.iconSvg} />
            </span>
          </div>
          <p className={styles.stageEyebrow}>{coleta.eyebrow}</p>
          <h3 className={styles.stageTitle}>{coleta.headline}</h3>
          <p className={styles.stageCopy}>{coleta.copy}</p>
        </article>

        <span className={`${styles.conn} ${styles.conn1}`} aria-hidden="true" />

        {/* 02 Triagem */}
        <article className={`${styles.stageCard} ${styles.stage2}`}>
          <div className={styles.stageHeader}>
            <span className={styles.stageNumber}>{t.step02}</span>
            <span className={styles.stageIcon} aria-hidden="true">
              <ProcessTriagemIcon className={styles.iconSvg} />
            </span>
          </div>
          <p className={styles.stageEyebrow}>{triagem.eyebrow}</p>
          <h3 className={styles.stageTitle}>{triagem.headline}</h3>
          <p className={styles.stageCopy}>{triagem.copy}</p>
        </article>

        {/* Ligação contínua principal entre 02 Triagem e 03 Enfardamento */}
        <span className={`${styles.conn} ${styles.conn2}`} aria-hidden="true" />

        {/* 02.1 Ramificação tracejada opcional entre Triagem e Enfardamento */}
        <div className={styles.optionalBranch}>
          <span className={styles.branchLegIn} aria-hidden="true" />
          <article className={styles.optionalCard}>
            <div className={styles.optionalHeader}>
              <span className={styles.optionalIcon} aria-hidden="true">
                <ProcessTrituracaoIcon className={styles.iconSvg} />
              </span>
              <span className={styles.optionalTag}>{t.optionalTag}</span>
            </div>
            <h3 className={styles.optionalTitle}>{t.optionalTitle}</h3>
            <p className={styles.optionalCopy}>{trituracao.copy}</p>
          </article>
          <span className={styles.branchLegOut} aria-hidden="true" />
        </div>

        {/* 03 Enfardamento */}
        <article className={`${styles.stageCard} ${styles.stage3}`}>
          <div className={styles.stageHeader}>
            <span className={styles.stageNumber}>{t.step03}</span>
            <span className={styles.stageIcon} aria-hidden="true">
              <ProcessEnfardamentoIcon className={styles.iconSvg} />
            </span>
          </div>
          <p className={styles.stageEyebrow}>{enfardamento.eyebrow}</p>
          <h3 className={styles.stageTitle}>{enfardamento.headline}</h3>
          <p className={styles.stageCopy}>{enfardamento.copy}</p>
        </article>

        <span className={`${styles.conn} ${styles.conn3}`} aria-hidden="true" />

        {/* 04 Destinação */}
        <article className={`${styles.stageCard} ${styles.stage4}`}>
          <div className={styles.stageHeader}>
            <span className={styles.stageNumber}>{t.step04}</span>
            <span className={styles.stageIcon} aria-hidden="true">
              <ProcessDestinacaoIcon className={styles.iconSvg} />
            </span>
          </div>
          <p className={styles.stageEyebrow}>{destinacao.eyebrow}</p>
          <h3 className={styles.stageTitle}>{destinacao.headline}</h3>
          <p className={styles.stageCopy}>{destinacao.copy}</p>
        </article>
      </div>
    </div>
  );
}

export default SaturnoFlow;
