"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CloseIcon, HamburgerIcon } from "./icons";
import BrandMark from "./shared/BrandMark";
import { BRANDS, BRAND_ORDER, getActiveBrandId } from "../lib/brands";

/**
 * Itens do menu expandido (Seção 5/6): os quatro primeiros são marcas
 * (logo oficial, não texto digitado) na ordem Grupo Almeida → Ambiental →
 * Equipamentos → Saturno; Contato continua texto porque não representa
 * uma empresa/marca do grupo.
 */
const MENU_ITEMS = [
  ...BRAND_ORDER.map((id) => ({ kind: "brand" as const, brand: BRANDS[id] })),
  { kind: "text" as const, label: "Contato", href: "/contato" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname() || "/";
  const activeBrandId = getActiveBrandId(pathname);
  const activeBrand = BRANDS[activeBrandId];

  return (
    <>
      <header className="site-header">
        {/* Desktop (>=1024px): a logo do header passa a representar a
            empresa/página atual (Seção 3/4, ver lib/brands.ts), não mais
            fixamente o Grupo Almeida — sempre a variante branca porque o
            header é escuro (verde floresta) em qualquer contexto. */}
        <div className="desktop-only header-inner">
          <Link href={activeBrand.href} className="logo-link">
            <BrandMark brand={activeBrand} variant="branca" className="logo-image" />
          </Link>

          <div className="header-right">
            <div className="lang-area" role="group" aria-label="Idioma">
              <button type="button" className="lang-btn" aria-current="true">
                <img src="/brand/flag-br.png" alt="" className="lang-flag" aria-hidden="true" /> PT
              </button>
              <button type="button" className="lang-btn">
                <img src="/brand/flag-us.png" alt="" className="lang-flag" aria-hidden="true" /> EN
              </button>
            </div>

            <button
              type="button"
              className="hamburger-btn"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>
        </div>

        {/* Mobile (<1024px): mesma lógica contextual do bloco desktop
            acima, mesmo estado/toggle de menuOpen. */}
        <div className="mobile-fidelity mf-header-inner">
          <Link href={activeBrand.href} className="mf-logo">
            <BrandMark brand={activeBrand} variant="branca" className="mf-logo-image" />
          </Link>

          <div className="mf-header-right">
            <div className="mf-lang-toggle" role="group" aria-label="Idioma">
              <button type="button" className="mf-lang-btn" aria-current="true">
                <img src="/brand/flag-br.png" alt="" className="mf-lang-flag" aria-hidden="true" />
              </button>
              <button type="button" className="mf-lang-btn">
                <img src="/brand/flag-us.png" alt="" className="mf-lang-flag" aria-hidden="true" />
              </button>
            </div>

            <button
              type="button"
              className="mf-hamburger"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <CloseIcon />
              ) : (
                <span className="mf-hamburger-bars" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <nav id="site-menu" className="menu-panel" aria-label="Menu principal" hidden={!menuOpen}>
        <ul className="menu-list">
          {MENU_ITEMS.map((item) =>
            item.kind === "brand" ? (
              <li key={item.brand.id} className="menu-item">
                <Link
                  href={item.brand.href}
                  className="menu-link menu-link-brand"
                  aria-current={item.brand.id === activeBrandId ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  <BrandMark brand={item.brand} variant="branca" className="menu-brand-logo" />
                </Link>
              </li>
            ) : (
              <li key={item.href} className="menu-item">
                <Link href={item.href} className="menu-link" onClick={() => setMenuOpen(false)}>
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>
    </>
  );
}
