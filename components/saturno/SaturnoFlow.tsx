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
      "Fluxo operacional da Saturno Ambiental: 01 Coleta de resíduos segue para 02 Triagem e classificação. Da triagem, o material segue pelo caminho direto para 03 Enfardamento ou passa pelo tratamento opcional de trituração ou descaracterização antes do enfardamento, seguindo então para 04 Destinação.",
    step01: "01",
    step02: "02",
    step03: "03",
    step04: "04",
    directPath: "Caminho direto",
    optionalBadge: "Tratamento opcional",
    optionalTitle: "Trituração ou descaracterização",
  },
  en: {
    ariaLabel: "Four-stage operational flow with optional treatment",
    srSummary:
      "Saturno Ambiental operational flow: 01 Waste collection moves to 02 Sorting and classification. From sorting, material follows the direct path to 03 Baling or goes through optional shredding or destruction treatment before baling, then continues to 04 Final destination.",
    step01: "01",
    step02: "02",
    step03: "03",
    step04: "04",
    directPath: "Direct path",
    optionalBadge: "Optional treatment",
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

      {/* NÍVEL 1: Esquerda -> Direita (01 Coleta -> 02 Triagem) */}
      <div className={styles.levelRow}>
        <article className={`${styles.stageCard} ${styles.delay0}`}>
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

        <div className={styles.hConnectorRight} aria-hidden="true">
          <span className={styles.hLine} />
          <svg
            className={styles.arrowRight}
            viewBox="0 0 12 12"
            width="12"
            height="12"
            fill="none"
          >
            <path
              d="M2.5 2L9.5 6L2.5 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <article className={`${styles.stageCard} ${styles.delay1}`}>
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
      </div>

      {/* NÍVEL 2: Retorno Direita -> Esquerda com bifurcação (Caminho direto + Tratamento opcional) */}
      <div className={`${styles.returnZone} ${styles.delay2}`}>
        {/* Trilhos da serpentina no desktop */}
        <div className={styles.serpentineRails} aria-hidden="true">
          {/* Haste vertical descendo da 02 Triagem (direita) */}
          <span className={styles.stemRight} />
          {/* Caminho direto contínuo (Direita -> Esquerda) */}
          <div className={styles.directTrack}>
            <span className={styles.directLine} />
            <svg
              className={styles.arrowLeft}
              viewBox="0 0 12 12"
              width="12"
              height="12"
              fill="none"
            >
              <path
                d="M9.5 2L2.5 6L9.5 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {/* Haste vertical descendo para 03 Enfardamento (esquerda) */}
          <span className={styles.stemLeft}>
            <svg
              className={styles.arrowDown}
              viewBox="0 0 12 12"
              width="12"
              height="12"
              fill="none"
            >
              <path
                d="M2 2.5L6 9.5L10 2.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        {/* Rótulo do caminho direto */}
        <div className={styles.directBadgeRow}>
          <span className={styles.directMobileRail} aria-hidden="true" />
          <span className={styles.directBadge}>{t.directPath}</span>
        </div>

        {/* Ramo paralelo tracejado: Tratamento Opcional */}
        <div className={styles.optionalRow}>
          <div className={styles.branchConnectorRight} aria-hidden="true">
            <span className={styles.dashedElbowRight} />
          </div>

          <article className={styles.optionalCard}>
            <div className={styles.optionalHeader}>
              <span className={styles.optionalIcon} aria-hidden="true">
                <ProcessTrituracaoIcon className={styles.iconSvg} />
              </span>
              <span className={styles.optionalBadge}>{t.optionalBadge}</span>
            </div>
            <h3 className={styles.optionalTitle}>{t.optionalTitle}</h3>
            <p className={styles.optionalHeadline}>{trituracao.headline}</p>
            <p className={styles.optionalCopy}>{trituracao.copy}</p>
          </article>

          <div className={styles.branchConnectorLeft} aria-hidden="true">
            <span className={styles.dashedElbowLeft} />
          </div>
        </div>
      </div>

      {/* NÍVEL 3: Esquerda -> Direita (03 Enfardamento -> 04 Destinação) */}
      <div className={styles.levelRow}>
        <article className={`${styles.stageCard} ${styles.delay3}`}>
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

        <div className={styles.hConnectorRight} aria-hidden="true">
          <span className={styles.hLine} />
          <svg
            className={styles.arrowRight}
            viewBox="0 0 12 12"
            width="12"
            height="12"
            fill="none"
          >
            <path
              d="M2.5 2L9.5 6L2.5 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <article className={`${styles.stageCard} ${styles.delay4}`}>
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
