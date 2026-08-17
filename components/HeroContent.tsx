import { ChevronDownIcon, WhatsAppIcon } from "./icons";
import { lockup, rhythm } from "../lib/responsive-type";
import { MfActions, MfBottom, MfButton, MfCenter, MfFrame, MfLabel, MfScrollHint, MfTitle } from "./MobileDobra";
import { DActionsRow, DButtonInline, DTitle } from "./DesktopDobra";

/**
 * Dobra 1 (Hero). Dois blocos independentes:
 * - Desktop (>=1024px, `.desktop-only`): composição editorial própria
 *   (`.d-stage`, ver components/DesktopDobra.tsx).
 * - Mobile+tablet (<1024px, `.mobile-fidelity`): layout de fluxo
 *   (`MfFrame`) calibrado a partir da referência 393px do Figma, sem
 *   canvas fixo nem coordenadas absolutas por elemento.
 *
 * Composição central (Grupo Almeida / 40 anos / headline) tratada como um
 * bloco único dentro de `MfCenter` (regra 10 da tarefa: mesmo raciocínio
 * TOP/CENTER/BOTTOM do resto das dobras, adaptado — aqui não há um
 * subtítulo institucional separado). Os dois CTAs formam o `MfBottom`; o
 * último botão fica 16px acima do indicador de rolagem via o mesmo
 * `margin-top` fixo de `.mf-scrollhint` usado em todas as outras dobras.
 */

export default function HeroContent({ onAdvance }: { onAdvance: () => void }) {
  return (
    <>
      {/* ---------------- Desktop (>=1024px): composição editorial ---------------- */}
      <div className="desktop-only d-stage">
        <p
          style={{
            position: "absolute",
            margin: 0,
            top: "18%",
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
            fontFamily: "var(--font-display-mf)",
            fontWeight: 600,
            fontSize: "24px",
            letterSpacing: "7.2px",
            textTransform: "uppercase",
            color: "var(--d-name-green)",
          }}
        >
          Grupo Almeida
        </p>

        <p
          style={{
            position: "absolute",
            margin: 0,
            top: "24%",
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
            fontFamily: "var(--font-display-mf)",
            fontWeight: 600,
            fontSize: "clamp(72px, 3.6vw + 4.4svh, 104px)",
            letterSpacing: "-3px",
            color: "var(--d-offwhite)",
          }}
        >
          40 anos
        </p>

        <DTitle
          top="43%"
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

        <DActionsRow top="72%" centerX>
          {/* Número/link oficial do WhatsApp ainda não confirmado nesta etapa. */}
          <DButtonInline variant="primary">
            <WhatsAppIcon />
            Falar com o Grupo Almeida
          </DButtonInline>
          <DButtonInline variant="secondary" href="#section-02">
            Conheça nossa história
          </DButtonInline>
        </DActionsRow>

        <button
          type="button"
          className="d-scroll-indicator"
          style={{ bottom: "28px" }}
          onClick={onAdvance}
          aria-label="Ir para a próxima seção"
        >
          <span aria-hidden="true">Role para baixo</span>
          <ChevronDownIcon />
        </button>
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
