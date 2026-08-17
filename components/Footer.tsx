import Link from "next/link";

/** O Grupo Almeida é marca/grupo institucional, sem CNPJ próprio — só as
 *  quatro empresas/unidades abaixo têm CNPJ. Não inventar razão social,
 *  endereço ou telefone além do que foi fornecido. */
const COMPANIES = [
  { name: "Almeida Ambiental", location: "São José / SC", cnpj: "04.910.399/0001-07" },
  { name: "Almeida Ambiental", location: "Araquari / Joinville", cnpj: "04.910.399/0002-80" },
  { name: "Almeida Equipamentos", location: "São José / SC", cnpj: "21.263.766/0001-39" },
  { name: "Saturno Ambiental", location: "Blumenau / SC", cnpj: "02.111.538/0001-07" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <p className="footer-brand">Grupo Almeida</p>

      <div className="footer-companies">
        <p className="footer-companies-heading">Empresas do Grupo</p>
        <ul className="footer-companies-grid">
          {COMPANIES.map((company) => (
            <li key={`${company.name}-${company.cnpj}`} className="footer-company">
              <p className="footer-company-name">{company.name}</p>
              <p className="footer-company-location">{company.location}</p>
              <p className="footer-company-cnpj">CNPJ {company.cnpj}</p>
            </li>
          ))}
        </ul>
      </div>

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
