"use client";

import type { ReactNode } from "react";

/**
 * Âncora interna com rolagem controlada.
 *
 * - `instant`: salta direto ao alvo (sem animar por todas as seções no
 *   caminho) — para destinos distantes, como do hero ao seletor no fim do
 *   catálogo. Sem `instant`, rolagem suave (respeitando prefers-reduced-motion).
 * - O recuo do Header vem de `scroll-padding-top` (globals.css) e do
 *   `scroll-margin-top` do alvo; o hash é atualizado e o foco vai ao alvo.
 * - Sem JS continua sendo um link âncora comum.
 */
export default function AnchorLink({
  href,
  className,
  instant = false,
  children,
}: {
  href: string;
  className?: string;
  instant?: boolean;
  children: ReactNode;
}) {
  const onClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(href.replace(/^#/, ""));
    if (!target) return;
    event.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: instant || reduce ? "instant" : "smooth", block: "start" });
    history.replaceState(null, "", href);
    // Foco no destino (teclado/leitor de tela) sem nova rolagem.
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  };

  return (
    <a className={className} href={href} onClick={onClick}>
      {children}
    </a>
  );
}
