import { ChevronDownIcon, WhatsAppIcon } from "./icons";
import { mf } from "../lib/mobile-fit";
import { MfButton, MfTitle } from "./MobileDobra";

/**
 * Dobra 1 (Hero). Dois blocos independentes:
 * - Desktop (>=1024px, `.desktop-only`): mecanismo genérico em grid da
 *   Decisão 25, intocado.
 * - Mobile (<1024px, `.mobile-fidelity`): prancheta de coordenadas por
 *   elemento da Decisão 26, referência 393px (ver AGENT_RULES/DECISOES).
 */
export default function HeroContent() {
  return (
    <>
      {/* ---------------- Desktop (>=1024px): inalterado ---------------- */}
      <div className="desktop-only hero-frame">
        <div className="dobra-top">
          <p className="dobra-eyebrow">Grupo Almeida</p>
          <p className="dobra-hero-years">40 anos</p>
        </div>

        <div className="dobra-center">
          <h1 className="dobra-title dobra-title-lg">
            <span>TRANSFORMANDO</span>
            <span>RESÍDUO</span>
            <span>
              EM <em className="dobra-title-gold">RESULTADO</em>
            </span>
          </h1>
        </div>

        <div className="dobra-bottom">
          <div className="dobra-actions">
            {/* Número/link oficial do WhatsApp ainda não confirmado nesta etapa. */}
            <button type="button" className="dobra-btn dobra-btn-primary">
              <WhatsAppIcon />
              Falar com o Grupo Almeida
            </button>
            <a href="#section-02" className="dobra-btn dobra-btn-secondary">
              Conheça nossa história
            </a>
          </div>
          <div className="dobra-scroll-indicator" aria-hidden="true">
            <span>Role para baixo</span>
            <ChevronDownIcon />
          </div>
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
