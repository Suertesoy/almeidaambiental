import type { CoreMaterial } from "./materials";

/**
 * Correspondência material → equipamento usada pelo seletor de /almeida-equipamentos.
 *
 * REGRA: só entra aqui uma relação que tenha suporte EXPLÍCITO em
 * `idealFor` (lib/equipamentos-data.ts), e a evidência citada abaixo é
 * exatamente o item documentado. Nada é inferido pelo nome da máquina nem
 * por "tipo parecido de material".
 *
 * Lacunas conhecidas (não recomendar sem validação técnica):
 *  - APV 90/100 documenta "Papel" (genérico) e "Têxteis". Os tipos
 *    específicos "Papel branco", "Jornal" e "Gráfica colorida" NÃO estão
 *    documentados para a APV → sem correspondência até confirmação.
 *  - Nenhum equipamento documenta: Sacos de cimento, Documentos sigilosos,
 *    Alumínio, Ferro, Resíduo orgânico.
 *  - Compactador Hidráulico documenta "Resíduos industriais" e "Materiais
 *    com maior geração de líquidos" — categorias, não materiais do Atlas.
 *  - Contêineres Almeida, Prensas Horizontais: aplicações descrevem operação
 *    (roll-on/roll-off, grandes volumes), não materiais.
 */
export type MaterialMatch = {
  productId: string;
  /** Item de `idealFor` que sustenta a relação (texto documentado). */
  evidence: { pt: string; en: string };
};

export const MATERIAL_MATCHES: Partial<Record<CoreMaterial, MaterialMatch[]>> = {
  "Papelão": [
    { productId: "compactador-fuso", evidence: { pt: "Papelão", en: "Cardboard" } },
    { productId: "apv-90", evidence: { pt: "Papelão", en: "Cardboard" } },
    { productId: "apv-100", evidence: { pt: "Papelão", en: "Cardboard" } },
    { productId: "k70", evidence: { pt: "Papelão", en: "Cardboard" } },
  ],
  "Plástico": [
    { productId: "compactador-fuso", evidence: { pt: "Plástico", en: "Plastic" } },
    { productId: "apv-90", evidence: { pt: "Plásticos", en: "Plastics" } },
    { productId: "apv-100", evidence: { pt: "Plásticos", en: "Plastics" } },
    { productId: "k70", evidence: { pt: "Plásticos", en: "Plastics" } },
    { productId: "crocodile", evidence: { pt: "Copos plásticos, Garrafas PET", en: "Plastic cups, PET bottles" } },
  ],
  "Madeira": [{ productId: "compactador-fuso", evidence: { pt: "Madeira", en: "Wood" } }],
  "Tetra Pak": [{ productId: "crocodile", evidence: { pt: "Embalagens Tetra Pak", en: "Tetra Pak packaging" } }],
};

export type ProductMatchResult = {
  productId: string;
  materials: { material: CoreMaterial; evidence: string }[];
};

/** Agrupa as correspondências por equipamento (mais materiais atendidos primeiro). */
export function matchProducts(selected: CoreMaterial[], locale: "pt" | "en"): {
  products: ProductMatchResult[];
  unmatched: CoreMaterial[];
  singleProductCoversAll: boolean;
} {
  const byProduct = new Map<string, ProductMatchResult>();
  const unmatched: CoreMaterial[] = [];

  for (const material of selected) {
    const matches = MATERIAL_MATCHES[material];
    if (!matches || matches.length === 0) {
      unmatched.push(material);
      continue;
    }
    for (const match of matches) {
      const entry = byProduct.get(match.productId) ?? { productId: match.productId, materials: [] };
      entry.materials.push({ material, evidence: match.evidence[locale] });
      byProduct.set(match.productId, entry);
    }
  }

  const products = [...byProduct.values()].sort((a, b) => b.materials.length - a.materials.length);
  const matchedCount = selected.length - unmatched.length;
  const singleProductCoversAll =
    unmatched.length === 0 && products.length > 0 && products[0].materials.length === matchedCount;

  return { products, unmatched, singleProductCoversAll };
}
