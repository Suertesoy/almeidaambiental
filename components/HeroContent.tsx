import { WhatsAppIcon } from "./icons";

export default function HeroContent() {
  return (
    <>
      {/* Desktop (>=1024px): inalterado. */}
      <div className="hero-content desktop-only">
        <p className="eyebrow">Há 40 ANOS</p>
        <h1 className="hero-title">
          <span>TRANSFORMANDO</span>
          <span>RESÍDUO EM</span>
          <span className="hero-title-gold">RESULTADO</span>
        </h1>
        <div className="hero-actions">
          {/* Número/link oficial do WhatsApp ainda não confirmado nesta etapa. */}
          <button type="button" className="btn btn-primary">
            <WhatsAppIcon />
            Falar com o Grupo Almeida
          </button>
          <a href="#section-02" className="btn btn-secondary">
            Conheça nossa história
          </a>
        </div>
      </div>

      {/* Mobile (<1024px): fiel ao screenshot — "GRUPO ALMEIDA" e "40 anos"
          são elementos próprios (não um único eyebrow), separados do
          headline de 3 linhas com apenas "RESULTADO" em amarelo. */}
      <div className="mobile-fidelity mf-hero-frame">
        <p className="mf-hero-label">GRUPO ALMEIDA</p>
        <p className="mf-hero-years">40 anos</p>
        <h1 className="mf-hero-title">
          <span>TRANSFORMANDO</span>
          <span>RESÍDUO</span>
          <span>
            EM <em className="mf-hero-title-gold">RESULTADO</em>
          </span>
        </h1>

        <div className="mf-hero-bottom">
          <div className="mf-hero-actions">
            {/* Número/link oficial do WhatsApp ainda não confirmado nesta etapa. */}
            <button type="button" className="mf-btn mf-btn-primary">
              <WhatsAppIcon />
              Falar com o Grupo Almeida
            </button>
            <a href="#section-02" className="mf-btn mf-btn-secondary">
              Conheça nossa história
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
