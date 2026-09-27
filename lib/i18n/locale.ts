/**
 * Tipo central de idioma do site. `pt` é o padrão histórico (rotas sem
 * prefixo); `en` vive sob o prefixo `/en` (ver lib/i18n/routes.ts).
 */
export type Locale = "pt" | "en";

/** Verdadeiro para "/en" e qualquer rota abaixo dele ("/en/historia" etc.). */
export function isEnPathname(pathname: string): boolean {
  return pathname === "/en" || pathname.startsWith("/en/");
}

/** Deriva o locale a partir do pathname atual — fonte da verdade é a URL. */
export function localeFromPathname(pathname: string): Locale {
  return isEnPathname(pathname) ? "en" : "pt";
}
