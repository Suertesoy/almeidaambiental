import Link from "next/link";
import BrandMark from "./shared/BrandMark";
import { BRANDS } from "../lib/brands";

/** O Grupo Almeida é marca/grupo institucional, sem CNPJ próprio — só as
 *  quatro empresas/unidades abaixo têm CNPJ. Não inventar razão social,
 *  endereço ou telefone além do que foi fornecido. */
const COMPANIES = [
  { name: "Almeida Ambiental", location: "São José / SC", cnpj: "04.910.399/0001-07" },
  { name: "Almeida Ambiental", location: "Araquari / Joinville", cnpj: "04.910.399/0002-80" },
  { name: "Almeida Equipamentos", location: "São José / SC", cnpj: "21.263.766/0001-39" },
  { name: "Saturno Ambiental", location: "Blumenau / SC", cnpj: "02.111.538/0001-07" },
];

/**
 * Checkpoint G: Footer recomposto em grid editorial left-aligned (marca ·
 * empresas · links institucionais), mesmo max-width institucional das
 * páginas de empresa (1320px, company-page.module.css) — antes era uma
 * coluna centralizada, alta e isolada do resto do sistema visual. Nenhum
 * dado legal removido/alterado, nenhum accordion no desktop nem no mobile.
 */
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-col footer-col-brand">
            <BrandMark brand={BRANDS["grupo-almeida"]} variant="branca" className="footer-brand-logo" />
          </div>

          <div className="footer-col footer-col-companies">
            <p className="footer-heading">Empresas do Grupo</p>
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

          <nav className="footer-col footer-col-links" aria-label="Links institucionais">
            <p className="footer-heading">Links</p>
            <ul className="footer-links-list">
              {/* "Institucional" e "Política de Privacidade" ainda não têm rota
                  própria definida na arquitetura do site: permanecem como
                  texto até existirem. */}
              <li>
                <span>Institucional</span>
              </li>
              <li>
                <Link href="/contato">Contato</Link>
              </li>
              <li>
                <span>Política de Privacidade</span>
              </li>
            </ul>
          </nav>
        </div>

        <div className="footer-bottom">
          <p className="footer-line">São José · Santa Catarina · Brasil</p>
          <p className="footer-copyright">© Grupo Almeida</p>
        </div>
      </div>
    </footer>
  );
}
