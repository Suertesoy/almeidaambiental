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
        {/* Desktop (>=1024px): inalterado. */}
        <div className="desktop-only header-inner">
          <Link href="/" className="logo-link" aria-label="Grupo Almeida — página inicial">
            {/* Placeholder de logo: nenhum arquivo oficial do Grupo Almeida foi encontrado
                no projeto. Substituir por vetor real assim que disponível. */}
            Grupo Almeida
          </Link>

          <div className="header-right">
            <div className="lang-area" role="group" aria-label="Idioma">
              <button type="button" className="lang-btn" aria-current="true">
                <span aria-hidden="true">🇧🇷</span> PT
              </button>
              <button type="button" className="lang-btn">
                <span aria-hidden="true">🇺🇸</span> EN
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

        {/* Mobile (<1024px): fiel ao Figma (65px, logo em duas linhas,
            toggle PT/EN pill, hambúrguer de 3 traços). Logo é só texto
            (o emblema/ícone do Figma é um asset que ainda não existe no
            projeto — ver aviso na entrega) e o seletor de idioma usa
            rótulos PT/EN em vez de bandeira (mesma razão: sem asset e
            sem emoji). Mesmo estado/lógica de menuOpen do bloco acima. */}
        <div className="mobile-fidelity mf-header-inner">
          <Link href="/" className="mf-logo" aria-label="Grupo Almeida — página inicial">
            <span className="mf-logo-line1">GRUPO</span>
            <span className="mf-logo-line2">ALMEIDA</span>
          </Link>

          <div className="mf-header-right">
            <div className="mf-lang-toggle" role="group" aria-label="Idioma">
              <button type="button" className="mf-lang-btn" aria-current="true">
                PT
              </button>
              <button type="button" className="mf-lang-btn">
                EN
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
