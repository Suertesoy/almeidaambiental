import { WhatsAppIcon } from "./icons";

export default function HeroContent() {
  return (
    <div className="hero-content">
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
  );
}
