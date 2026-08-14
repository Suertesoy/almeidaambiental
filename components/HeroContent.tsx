import { ChevronDownIcon, WhatsAppIcon } from "./icons";

export default function HeroContent() {
  return (
    <div className="hero-frame">
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
  );
}
