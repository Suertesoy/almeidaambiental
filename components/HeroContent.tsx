import { WhatsAppIcon } from "./icons";
import { lockup, rhythm } from "../lib/responsive-type";
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
 * - Mobile+tablet (<1024px, `.mobile-fidelity`): layout de fluxo
 *   (`MfFrame`) calibrado a partir da referência 393px do Figma.
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

      {/* ---------------- Mobile+tablet (<1024px): fluxo ---------------- */}
      <div className="mobile-fidelity mf-hero-frame">
        <MfFrame>
          <MfCenter>
            <MfLabel tokens={lockup(29, 30, 9.28)}>Grupo Almeida</MfLabel>

            <p
              style={{
                margin: 0,
                marginTop: rhythm(15),
                whiteSpace: "nowrap",
                fontFamily: "var(--font-display-mf)",
                fontWeight: 600,
                color: "var(--m393-offwhite)",
                ...lockup(60, 30, -2.4),
              }}
            >
              40 anos
            </p>

            {/* Sem node de headline dedicado no Figma nesta rodada (a arte
                de fundo já compõe "TRANSFORMANDO RESÍDUO EM RESULTADO");
                valores mantidos da calibração anterior por falta de
                referência nova. */}
            <MfTitle
              marginTop={rhythm(32)}
              refWidth={335}
              tokens={lockup(35, 30, -1)}
              lines={[
                [{ text: "TRANSFORMANDO" }],
                [{ text: "RESÍDUO" }],
                [{ text: "EM " }, { text: "RESULTADO", gold: true }],
              ]}
            />
          </MfCenter>

          <MfBottom>
            <MfActions>
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

        <MfScrollHint label="Role para baixo" onAdvance={onAdvance} />
      </div>
    </>
  );
}
