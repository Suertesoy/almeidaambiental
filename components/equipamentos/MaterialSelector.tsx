"use client";

import { useRef, useState } from "react";
import cards from "../shared/MaterialCards.module.css";
import shared from "../shared/company-page.module.css";
import styles from "./material-selector.module.css";
import { MATERIAL_ICONS } from "../icons";
import { CORE_MATERIALS, translateMaterial, type CoreMaterial } from "../../lib/materials";
import { matchProducts } from "../../lib/equipamentos-materiais";
import { PRODUCTS, PRODUCTS_EN } from "../../lib/equipamentos-data";
import { CONTACT_ANCHORS } from "../../lib/contact-data";
import { localizeHref } from "../../lib/i18n/routes";
import type { Locale } from "../../lib/i18n/locale";

const COPY = {
  pt: {
    headline: "Encontre o equipamento para sua operação",
    guide: "Selecione os materiais que sua operação precisa processar.",
    groupLabel: "Materiais",
    find: "Encontrar equipamentos compatíveis",
    retry: "Tentar novamente",
    selectedCount: (n: number) => (n === 0 ? "Nenhum material selecionado" : n === 1 ? "1 material selecionado" : `${n} materiais selecionados`),
    resultsTitle: "Equipamentos potencialmente compatíveis",
    allInOne: "Um mesmo equipamento atende todos os materiais selecionados.",
    several: "Os materiais selecionados correspondem a equipamentos diferentes.",
    attends: "Materiais atendidos",
    basis: (evidence: string) => `Consta entre as aplicações documentadas: ${evidence}.`,
    viewInCatalog: "Ver no catálogo",
    unmatchedTitle: "Sem correspondência confirmada",
    unmatchedBody:
      "Não há equipamento com compatibilidade documentada para estes materiais. Consulte a equipe técnica para avaliar a sua operação.",
    talk: "Falar com a equipe técnica",
    disclaimer:
      "Indicação preliminar com base nas aplicações documentadas de cada equipamento. A escolha final depende do material, do volume e do espaço da sua operação.",
    noneFound: "Nenhum equipamento com compatibilidade documentada para a seleção.",
  },
  en: {
    headline: "Find the equipment for your operation",
    guide: "Select the materials your operation needs to process.",
    groupLabel: "Materials",
    find: "Find compatible equipment",
    retry: "Try again",
    selectedCount: (n: number) => (n === 0 ? "No materials selected" : n === 1 ? "1 material selected" : `${n} materials selected`),
    resultsTitle: "Potentially compatible equipment",
    allInOne: "A single piece of equipment handles all the selected materials.",
    several: "The selected materials match different pieces of equipment.",
    attends: "Materials handled",
    basis: (evidence: string) => `Listed among the documented applications: ${evidence}.`,
    viewInCatalog: "View in catalog",
    unmatchedTitle: "No confirmed match",
    unmatchedBody:
      "No equipment has documented compatibility with these materials. Talk to the technical team to assess your operation.",
    talk: "Talk to the technical team",
    disclaimer:
      "Preliminary guidance based on each equipment's documented applications. The final choice depends on your material, volume and available space.",
    noneFound: "No equipment with documented compatibility for this selection.",
  },
} as const;

/**
 * Seletor de materiais → equipamentos potencialmente compatíveis.
 *
 * A grade reutiliza as classes de MaterialCards (mesma grade de 12 materiais,
 * mesmos ícones e proporções do Material Atlas da Almeida Ambiental); a única
 * coisa acrescentada é o estado interativo (material-selector.module.css).
 * Regras de correspondência: lib/equipamentos-materiais.ts (só relações com
 * suporte explícito nas aplicações documentadas).
 */
export default function MaterialSelector({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const products = locale === "en" ? PRODUCTS_EN : PRODUCTS;
  const [selected, setSelected] = useState<CoreMaterial[]>([]);
  const [shown, setShown] = useState<CoreMaterial[] | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const toggle = (material: CoreMaterial) => {
    setSelected((prev) => (prev.includes(material) ? prev.filter((m) => m !== material) : [...prev, material]));
  };

  const find = () => {
    // Preserva a ordem canônica dos 12 materiais, independente da ordem de clique.
    setShown(CORE_MATERIALS.filter((m) => selected.includes(m)));
    requestAnimationFrame(() => {
      resultsRef.current?.focus({ preventScroll: true });
      resultsRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
    });
  };

  const reset = () => {
    setSelected([]);
    setShown(null);
    headingRef.current?.focus();
  };

  const result = shown ? matchProducts(shown, locale) : null;
  const nameOf = (id: string) => products.find((p) => p.id === id);

  return (
    <div id="seletor-de-materiais" className={styles.root}>
      <h3 ref={headingRef} tabIndex={-1} className={`${shared.subheading} ${styles.headline}`}>
        {t.headline}
      </h3>
      <p id="material-selector-guide" className={styles.guide}>
        {t.guide}
      </p>

      <ul className={`${cards.grid} ${cards.ambiental} ${styles.grid}`} role="group" aria-labelledby="material-selector-guide">
        {CORE_MATERIALS.map((material) => {
          const Icon = MATERIAL_ICONS[material];
          const isOn = selected.includes(material);
          return (
            <li key={material} className={styles.cell}>
              <button
                type="button"
                className={`${cards.card} ${styles.tile} ${isOn ? styles.tileOn : ""}`}
                aria-pressed={isOn}
                onClick={() => toggle(material)}
              >
                {Icon && <Icon className={cards.icon} />}
                <span className={cards.name}>{translateMaterial(material, locale)}</span>
                <span className={styles.check} aria-hidden="true" />
              </button>
            </li>
          );
        })}
      </ul>

      <p className={styles.count} role="status">
        {t.selectedCount(selected.length)}
      </p>

      <div className={styles.actions}>
        <button type="button" className={`${shared.btn} ${shared.btnSolidGold}`} disabled={selected.length === 0} onClick={find}>
          {t.find}
        </button>
        <button
          type="button"
          className={`${shared.btn} ${shared.btnOutlineOnLight}`}
          disabled={selected.length === 0 && shown === null}
          onClick={reset}
        >
          {t.retry}
        </button>
      </div>

      <div ref={resultsRef} tabIndex={-1} className={styles.results} aria-live="polite">
        {result && (
          <section aria-labelledby="material-results-title" className={styles.resultsInner}>
            <h4 id="material-results-title" className={styles.resultsTitle}>
              {t.resultsTitle}
            </h4>
            {result.products.length > 0 && (
              <p className={styles.resultsLead}>{result.singleProductCoversAll ? t.allInOne : result.products.length > 1 ? t.several : ""}</p>
            )}

            {result.products.length === 0 && <p className={styles.resultsLead}>{t.noneFound}</p>}

            <ul className={styles.resultList}>
              {result.products.map((entry) => {
                const product = nameOf(entry.productId);
                if (!product) return null;
                return (
                  <li key={entry.productId} className={styles.resultItem}>
                    <div className={styles.resultHead}>
                      <p className={styles.resultName}>{product.name}</p>
                      <p className={styles.resultMaker}>{product.manufacturer}</p>
                    </div>
                    <p className={styles.resultLabel}>{t.attends}</p>
                    <ul className={styles.chips}>
                      {entry.materials.map(({ material }) => {
                        const Icon = MATERIAL_ICONS[material];
                        return (
                          <li key={material} className={styles.chip}>
                            {Icon && <Icon className={styles.chipIcon} />}
                            {translateMaterial(material, locale)}
                          </li>
                        );
                      })}
                    </ul>
                    <p className={styles.basis}>
                      {t.basis([...new Set(entry.materials.map((m) => m.evidence))].join("; "))}
                    </p>
                    <a className={styles.catalogLink} href={`#${entry.productId}`}>
                      {t.viewInCatalog}
                      <span aria-hidden="true"> ↓</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            {result.unmatched.length > 0 && (
              <div className={styles.unmatched}>
                <p className={styles.resultLabel}>{t.unmatchedTitle}</p>
                <ul className={styles.chips}>
                  {result.unmatched.map((material) => {
                    const Icon = MATERIAL_ICONS[material];
                    return (
                      <li key={material} className={styles.chip}>
                        {Icon && <Icon className={styles.chipIcon} />}
                        {translateMaterial(material, locale)}
                      </li>
                    );
                  })}
                </ul>
                <p className={styles.basis}>{t.unmatchedBody}</p>
                <a className={`${shared.btn} ${shared.btnOutlineOnLight} ${styles.talk}`} href={localizeHref(CONTACT_ANCHORS.saoJose, locale)}>
                  {t.talk}
                </a>
              </div>
            )}

            <p className={styles.disclaimer}>{t.disclaimer}</p>
          </section>
        )}
      </div>
    </div>
  );
}
