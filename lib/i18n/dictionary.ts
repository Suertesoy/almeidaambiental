import type { Locale } from "./locale";

/**
 * Strings de interface compartilhadas por várias páginas (Header, Footer,
 * botão de "voltar", selo de imagem ilustrativa...). Conteúdo específico de
 * uma única página/domínio fica junto do próprio componente ou arquivo de
 * dados (ver lib/*-data.ts) — este dicionário é só o que se repete.
 */
export const DICTIONARY = {
  pt: {
    header: {
      languageGroupLabel: "Idioma",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
      mainMenu: "Menu principal",
      contact: "Contato",
    },
    footer: {
      groupCompanies: "Empresas do Grupo",
      links: "Links",
      institutionalLinksLabel: "Links institucionais",
      institutional: "Institucional",
      contact: "Contato",
      privacyPolicy: "Política de Privacidade",
      locationLine: "São José · Santa Catarina · Brasil",
    },
    backToHome: "Voltar para a Home",
    illustrativeImage: "Imagem ilustrativa",
  },
  en: {
    header: {
      languageGroupLabel: "Language",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      mainMenu: "Main menu",
      contact: "Contact",
    },
    footer: {
      groupCompanies: "Group Companies",
      links: "Links",
      institutionalLinksLabel: "Institutional links",
      institutional: "About",
      contact: "Contact",
      privacyPolicy: "Privacy Policy",
      locationLine: "São José · Santa Catarina · Brazil",
    },
    backToHome: "Back to Home",
    illustrativeImage: "Illustrative image",
  },
} as const satisfies Record<Locale, unknown>;

export function dict(locale: Locale) {
  return DICTIONARY[locale];
}
