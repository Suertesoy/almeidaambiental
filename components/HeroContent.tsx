import { ChevronDownIcon, WhatsAppIcon } from "./icons";
import { framePaddingTop, lockup, rhythm } from "../lib/responsive-type";
import { MfActions, MfButton, MfFrame, MfLabel, MfScrollHint, MfTitle } from "./MobileDobra";
import { DActionsRow, DButtonInline, DTitle } from "./DesktopDobra";

/**
 * Dobra 1 (Hero). Dois blocos independentes:
 * - Desktop (>=1024px, `.desktop-only`): composição editorial própria
 *   (`.d-stage`, ver components/DesktopDobra.tsx).
 * - Mobile+tablet (<1024px, `.mobile-fidelity`): layout de fluxo
 *   (`MfFrame`) calibrado a partir da referência 393px do Figma, sem
 *   canvas fixo nem coordenadas absolutas por elemento.
 */

export default function HeroContent() {
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

        <div className="d-scroll-indicator" style={{ bottom: "28px" }} aria-hidden="true">
          <span>Role para baixo</span>
          <ChevronDownIcon />
        </div>
      </div>

      {/* ---------------- Mobile+tablet (<1024px): fluxo ---------------- */}
      <div className="mobile-fidelity mf-hero-frame">
        <MfFrame paddingTop={framePaddingTop(236)}>
          <MfLabel tokens={lockup(29, 30, 9.28)}>Grupo Almeida</MfLabel>

          <p
            style={{
              margin: 0,
              marginTop: rhythm(15),
              alignSelf: "center",
              whiteSpace: "nowrap",
              fontFamily: "var(--font-display-mf)",
              fontWeight: 600,
              color: "var(--m393-offwhite)",
              ...lockup(60, 30, -2.4),
            }}
          >
            40 anos
          </p>

          {/* Sem node de headline dedicado no Figma nesta rodada (a arte de
              fundo já compõe "TRANSFORMANDO RESÍDUO EM RESULTADO"); valores
              mantidos da calibração anterior por falta de referência nova. */}
          <MfTitle
            marginTop={rhythm(124)}
            refWidth={335}
            tokens={lockup(35, 30, -1)}
            lines={[
              [{ text: "TRANSFORMANDO" }],
              [{ text: "RESÍDUO" }],
              [{ text: "EM " }, { text: "RESULTADO", gold: true }],
            ]}
          />

          <MfActions marginTop={rhythm(36)}>
            <MfButton variant="primary">
              <WhatsAppIcon />
              Falar com o Grupo Almeida
            </MfButton>
            <MfButton variant="secondary" href="#section-02">
              Conheça nossa história
            </MfButton>
          </MfActions>
        </MfFrame>

        <MfScrollHint bottom={20} label="Role para baixo" />
      </div>
    </>
  );
}
