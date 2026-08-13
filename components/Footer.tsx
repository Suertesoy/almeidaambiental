import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <p className="footer-brand">Grupo Almeida</p>
      <p className="footer-line">Almeida Ambiental · Almeida Equipamentos · Saturno Ambiental</p>
      <p className="footer-line">São José · Santa Catarina · Brasil</p>
      <nav className="footer-nav" aria-label="Links institucionais">
        {/* "Institucional" e "Política de Privacidade" ainda não têm rota própria
            definida na arquitetura do site: permanecem como texto até existirem. */}
        <span>Institucional</span>
        <span aria-hidden="true">·</span>
        <Link href="/contato">Contato</Link>
        <span aria-hidden="true">·</span>
        <span>Política de Privacidade</span>
      </nav>
      <p className="footer-copyright">© Grupo Almeida</p>
    </footer>
  );
}
