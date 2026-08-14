import { ChevronDownIcon, WhatsAppIcon } from "./icons";
import { mf } from "../lib/mobile-fit";
import { MfButton, MfTitle } from "./MobileDobra";
import { DActionsRow, DButtonInline, DTitle } from "./DesktopDobra";

/**
 * Dobra 1 (Hero). Dois blocos independentes:
 * - Desktop (>=1024px, `.desktop-only`): composição editorial própria da
 *   Decisão 27 (`.d-stage`, ver components/DesktopDobra.tsx).
 * - Mobile (<1024px, `.mobile-fidelity`): prancheta de coordenadas por
 *   elemento da Decisão 26, referência 393px — área protegida, não
 *   tocada nesta rodada (ver DECISOES.md).
 */
export default function HeroContent() {
  return (
    <>
      {/* ---------------- Desktop (>=1024px): composição editorial (Decisão 27) ---------------- */}
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
            fontSize: "clamp(72px, 7vw, 104px)",
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
          fontSize="clamp(60px, 5.4vw, 78px)"
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

      {/* ---------------- Mobile (<1024px): prancheta 393px ---------------- */}
      <div className="mobile-fidelity mf-hero-frame">
        <p
          className="mf-d-label"
          style={{
            top: "207px",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: mf(24),
            lineHeight: "30px",
            letterSpacing: "7.2px",
          }}
        >
          Grupo Almeida
        </p>

        <p
          style={{
            position: "absolute",
            margin: 0,
            top: "249px",
            left: "50%",
            transform: "translateX(-50%)",
            width: mf(213),
            fontFamily: "var(--font-display-mf)",
            fontWeight: 600,
            fontSize: mf(60),
            lineHeight: "66px",
            letterSpacing: "-2.4px",
            color: "var(--m393-offwhite)",
            textAlign: "center",
          }}
        >
          40 anos
        </p>

        <MfTitle
          top={455}
          left={29}
          width={335}
          fontSize={35}
          lineHeight={30}
          letterSpacing={-1}
          lines={[
            [{ text: "TRANSFORMANDO" }],
            [{ text: "RESÍDUO" }],
            [{ text: "EM " }, { text: "RESULTADO", gold: true }],
          ]}
        />

        <MfButton top={593} left={29} variant="primary">
          <WhatsAppIcon />
          Falar com o Grupo Almeida
        </MfButton>

        <MfButton top={669} left={29} variant="secondary" href="#section-02">
          Conheça nossa história
        </MfButton>

        <p className="mf-hero-scroll-label">Role para baixo</p>
        <div className="mf-bottom-fade" aria-hidden="true" />
        <div className="mf-d-arrow" style={{ bottom: "22px" }} aria-hidden="true">
          <ChevronDownIcon />
        </div>
      </div>
    </>
  );
}
