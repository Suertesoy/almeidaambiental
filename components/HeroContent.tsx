import { WhatsAppIcon } from "./icons";
import { lockup } from "../lib/responsive-type";
import { MfActions, MfBottom, MfButton, MfCenter, MfFrame, MfLabel, MfScrollHint, MfTitle } from "./MobileDobra";
import { DActionsRow, DButton, DFrame, DHint, DTitle } from "./DesktopDobra";

/**
 * Dobra 1 (Hero). Dois blocos independentes:
 * - Desktop (>=1024px, `.desktop-only`): composição editorial especial
 *   (regra 13 da tarefa) — "Grupo Almeida" / "40 anos" / headline formam
 *   um único bloco centralizado (`.d-hero-main`, flex:1 dentro de
 *   `DFrame`, mesmo raciocínio de região CENTER das demais dobras); os
 *   dois CTAs (`.d-hero-actions`) e o `DHint` seguem em fluxo normal
 *   abaixo dele — nada posicionado via `top` percentual.
 * - Mobile+tablet (<1024px, `.mobile-fidelity`): composição PRÓPRIA
 *   (`MfFrame variant="hero"`, regra 8 da tarefa — não governada pelo
 *   mesmo padding-top das dobras institucionais). Estrutura fiel à
 *   referência anexada, de cima para baixo:
 *     header → 96px fixos (regra 3) → "Grupo Almeida" → 16px fixos
 *     (regra 4) → "40 anos" → espaço flexível (`MfCenter`, respiro
 *     editorial) → headline ALINHADA À ESQUERDA (regra 5, única exceção
 *     de alinhamento da Home) → bloco inferior (`MfBottom`) com os dois
 *     CTAs a 8px fixos um do outro (regra 6, gap explícito, não o clamp
 *     responsivo padrão) → 32px fixos (regra 27, `.mf-scrollhint`) até
 *     "Role para baixo" + chevron.
 */

export default function HeroContent({ onAdvance }: { onAdvance: () => void }) {
  return (
    <>
      {/* ---------------- Desktop (>=1024px): composição editorial ---------------- */}
      <div className="desktop-only d-stage">
        <DFrame>
          <div className="d-hero-main">
            <p className="d-hero-name">Grupo Almeida</p>
            <p className="d-hero-years">40 anos</p>
            <DTitle
              centerX
              maxWidth="1000px"
              align="center"
              fontSize="clamp(60px, 3vw + 3.4svh, 78px)"
              lineHeight={0.92}
              letterSpacing="-1px"
              lines={[
                [{ text: "TRANSFORMANDO" }],
                [{ text: "RESÍDUO" }],
                [{ text: "EM " }, { text: "RESULTADO", gold: true }],
              ]}
            />
          </div>

          <DActionsRow>
            {/* Número/link oficial do WhatsApp ainda não confirmado nesta etapa. */}
            <DButton variant="primary">
              <WhatsAppIcon />
              Falar com o Grupo Almeida
            </DButton>
            <DButton variant="secondary" href="#section-02">
              Conheça nossa história
            </DButton>
          </DActionsRow>

          <DHint label="Role para baixo" onAdvance={onAdvance} />
        </DFrame>
      </div>

      {/* ---------------- Mobile+tablet (<1024px): composição própria da Hero ---------------- */}
      <div className="mobile-fidelity mf-hero-frame">
        <MfFrame variant="hero">
          {/* Grupo Almeida → 16px fixos (regra 4, não `rhythm()`) → 40 anos,
              bloco centralizado, distinto da headline (que fica sozinha em
              `MfCenter`, alinhada à esquerda). */}
          <div className="mf-hero-top">
            <MfLabel tokens={lockup(29, 30, 9.28)}>Grupo Almeida</MfLabel>
            <p className="mf-hero-years" style={lockup(60, 30, -2.4)}>
              40 anos
            </p>
          </div>

          {/* Espaço flexível (regra 9: respiro editorial, não compactado)
              antes da headline — única headline da Home alinhada à
              esquerda (regra 5). Sem node de headline dedicado no Figma
              nesta rodada (a arte de fundo já compõe "TRANSFORMANDO
              RESÍDUO EM RESULTADO"); valores mantidos da calibração
              anterior por falta de referência tipográfica nova. */}
          <MfCenter align="left">
            <MfTitle
              align="left"
              refWidth={335}
              tokens={lockup(35, 30, -1)}
              lines={[
                [{ text: "TRANSFORMANDO" }],
                [{ text: "RESÍDUO" }],
                [{ text: "EM " }, { text: "RESULTADO", gold: true }],
              ]}
            />
          </MfCenter>

          <MfBottom align="left">
            {/* 8px fixos entre os dois CTAs (regra 6) — gap explícito, não
                o clamp responsivo padrão de `.mf-d-actions`. */}
            <MfActions gap="8px">
              <MfButton variant="primary">
                <WhatsAppIcon />
                Falar com o Grupo Almeida
              </MfButton>
              <MfButton variant="secondary" href="#section-02">
                Conheça nossa história
              </MfButton>
            </MfActions>
          </MfBottom>
        </MfFrame>

        {/* 32px fixos do fim do segundo CTA até aqui (regra 7,
            `.mf-scrollhint`). */}
        <MfScrollHint label="Role para baixo" onAdvance={onAdvance} />
      </div>
    </>
  );
}
