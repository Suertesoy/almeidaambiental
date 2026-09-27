"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CloseIcon, HamburgerIcon } from "./icons";
import BrandMark from "./shared/BrandMark";
import { BRANDS, BRAND_ORDER, getActiveBrandId } from "../lib/brands";
import { localeFromPathname } from "../lib/i18n/locale";
import { getAlternatePath, localizeHref } from "../lib/i18n/routes";
import { dict } from "../lib/i18n/dictionary";

/**
 * Itens do menu expandido (Seção 5/6, refinado no item 15 da rodada de
 * refinamento visual): os quatro primeiros são marcas — logo oficial +
 * nome por extenso lado a lado (ver .menu-link-brand/.menu-brand-name em
 * globals.css) — na ordem Grupo Almeida → Ambiental → Equipamentos →
 * Saturno; Contato continua só texto porque não representa uma
 * empresa/marca do grupo.
 */
const BRAND_MENU_ITEMS = BRAND_ORDER.map((id) => ({ kind: "brand" as const, brand: BRANDS[id] }));

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname() || "/";
  const locale = localeFromPathname(pathname);
  const t = dict(locale);
  const activeBrandId = getActiveBrandId(pathname);
  const activeBrand = BRANDS[activeBrandId];
  const alternatePath = getAlternatePath(pathname);

  const menuItems = [
    ...BRAND_MENU_ITEMS,
    { kind: "text" as const, label: t.header.contact, href: localizeHref("/contato", locale) },
  ];

  return (
    <>
      <header className="site-header">
        {/* Desktop (>=1024px): a logo do header passa a representar a
            empresa/página atual (Seção 3/4, ver lib/brands.ts), não mais
            fixamente o Grupo Almeida — sempre a variante branca porque o
            header é escuro (verde floresta) em qualquer contexto. */}
        <div className="desktop-only header-inner">
          <Link href={localizeHref(activeBrand.href, locale)} className="logo-link">
            <BrandMark brand={activeBrand} variant="branca" className="logo-image" />
          </Link>

          <div className="header-right">
            <div className="lang-area" role="group" aria-label={t.header.languageGroupLabel}>
              <Link
                href={locale === "pt" ? pathname : alternatePath}
                className="lang-btn"
                aria-current={locale === "pt" ? "true" : undefined}
              >
                <img src="/brand/flag-br.png" alt="" className="lang-flag" aria-hidden="true" /> PT
              </Link>
              <Link
                href={locale === "en" ? pathname : alternatePath}
                className="lang-btn"
                aria-current={locale === "en" ? "true" : undefined}
              >
                <img src="/brand/flag-us.png" alt="" className="lang-flag" aria-hidden="true" /> EN
              </Link>
            </div>

            <button
              type="button"
              className="hamburger-btn"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? t.header.closeMenu : t.header.openMenu}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>
        </div>

        {/* Mobile (<1024px): mesma lógica contextual do bloco desktop
            acima, mesmo estado/toggle de menuOpen. */}
        <div className="mobile-fidelity mf-header-inner">
          <Link href={localizeHref(activeBrand.href, locale)} className="mf-logo">
            <BrandMark brand={activeBrand} variant="branca" className="mf-logo-image" />
          </Link>

          <div className="mf-header-right">
            <div className="mf-lang-toggle" role="group" aria-label={t.header.languageGroupLabel}>
              <Link
                href={locale === "pt" ? pathname : alternatePath}
                className="mf-lang-btn"
                aria-current={locale === "pt" ? "true" : undefined}
              >
                <img src="/brand/flag-br.png" alt="PT" className="mf-lang-flag" />
              </Link>
              <Link
                href={locale === "en" ? pathname : alternatePath}
                className="mf-lang-btn"
                aria-current={locale === "en" ? "true" : undefined}
              >
                <img src="/brand/flag-us.png" alt="EN" className="mf-lang-flag" />
              </Link>
            </div>

            <button
              type="button"
              className="mf-hamburger"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label={menuOpen ? t.header.closeMenu : t.header.openMenu}
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

      <nav id="site-menu" className="menu-panel" aria-label={t.header.mainMenu} hidden={!menuOpen}>
        <ul className="menu-list">
          {menuItems.map((item) =>
            item.kind === "brand" ? (
              <li key={item.brand.id} className="menu-item">
                <Link
                  href={localizeHref(item.brand.href, locale)}
                  className="menu-link menu-link-brand"
                  aria-current={item.brand.id === activeBrandId ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  <BrandMark brand={item.brand} variant="branca" className="menu-brand-logo" />
                  <span className="menu-brand-name">{item.brand.name}</span>
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
