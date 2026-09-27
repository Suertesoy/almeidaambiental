import type { Locale } from "./locale";

/**
 * Fonte única de verdade das URLs bilíngues. Português preserva as rotas
 * existentes sem prefixo; inglês vive sob "/en", com slugs próprios em
 * inglês (não é um espelho mecânico do slug em português) — ver o pedido
 * de arquitetura de URL da tarefa de internacionalização.
 */
export const ROUTE_MAP = {
  home: { pt: "/", en: "/en" },
  historia: { pt: "/historia", en: "/en/history" },
  almeidaAmbiental: { pt: "/almeida-ambiental", en: "/en/almeida-ambiental" },
  almeidaEquipamentos: { pt: "/almeida-equipamentos", en: "/en/almeida-equipamentos" },
  saturnoAmbiental: { pt: "/saturno-ambiental", en: "/en/saturno-ambiental" },
  contato: { pt: "/contato", en: "/en/contact" },
} as const;

export type RouteKey = keyof typeof ROUTE_MAP;

export function routePath(key: RouteKey, locale: Locale): string {
  return ROUTE_MAP[key][locale];
}

function splitHash(href: string): { path: string; hash: string } {
  const index = href.indexOf("#");
  return index === -1 ? { path: href, hash: "" } : { path: href.slice(0, index), hash: href.slice(index) };
}

/**
 * Traduz um href em português (o que os componentes já usam hoje: "/",
 * "/contato", "/contato#sao-jose", `BRANDS[...].href`...) para o
 * equivalente no locale pedido. Hrefs desconhecidos (âncoras internas,
 * "/home2-4", links externos) passam intactos — só as seis rotas
 * bilíngues são traduzidas.
 */
export function localizeHref(ptHref: string, locale: Locale): string {
  if (locale === "pt") return ptHref;
  const { path, hash } = splitHash(ptHref);
  const entry = Object.values(ROUTE_MAP).find((route) => route.pt === path);
  const localizedPath = entry ? entry.en : path;
  return `${localizedPath}${hash}`;
}

/**
 * Caminho equivalente no OUTRO locale, a partir do pathname atual (o que
 * `usePathname()` devolve). Usado pelo toggle PT/EN do Header: a URL atual
 * é sempre a fonte da verdade do idioma. Fora das seis rotas bilíngues
 * (ex.: /home2, /home3, /home4), cai num fallback previsível: soma ou
 * remove o prefixo "/en".
 */
export function getAlternatePath(pathname: string): string {
  for (const route of Object.values(ROUTE_MAP)) {
    if (pathname === route.pt) return route.en;
    if (pathname === route.en) return route.pt;
  }
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const rest = pathname.slice(3);
    return rest === "" ? "/" : rest;
  }
  return `/en${pathname === "/" ? "" : pathname}`;
}
