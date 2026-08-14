"use client";

import { useState } from "react";
import Link from "next/link";
import { CloseIcon, HamburgerIcon } from "./icons";

const MENU_ITEMS = [
  { label: "Almeida Ambiental", href: "/almeida-ambiental" },
  { label: "Almeida Equipamentos", href: "/almeida-equipamentos" },
  { label: "Saturno Ambiental", href: "/saturno-ambiental" },
  { label: "Contato", href: "/contato" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        {/* Desktop (>=1024px): inalterado, exceto os assets de marca (logo e
            bandeiras), agora reais — baixados do Figma (design/GUIA_MONTAGEM_FIGMA.md)
            e versionados em public/brand/. */}
        <div className="desktop-only header-inner">
          <Link href="/" className="logo-link" aria-label="Grupo Almeida — página inicial">
            <img src="/brand/logo-grupo-almeida.png" alt="Grupo Almeida" className="logo-image" />
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

        {/* Mobile (<1024px): fiel ao Figma (65px, logo com marca real, toggle
            PT/EN com bandeiras reais em pill, hambúrguer de 3 traços).
            Assets baixados do Figma (design/GUIA_MONTAGEM_FIGMA.md) e
            versionados em public/brand/. Mesmo estado/lógica de menuOpen do
            bloco acima. */}
        <div className="mobile-fidelity mf-header-inner">
          <Link href="/" className="mf-logo" aria-label="Grupo Almeida — página inicial">
            <img src="/brand/logo-grupo-almeida.png" alt="Grupo Almeida" className="mf-logo-image" />
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
          {MENU_ITEMS.map((item) => (
            <li key={item.href} className="menu-item">
              <Link href={item.href} className="menu-link" onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
