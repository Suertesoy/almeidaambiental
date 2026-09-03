/**
 * Lista nominal de materiais trabalhados pela Almeida Ambiental e pela
 * Saturno Ambiental — vem do material institucional do site anterior
 * (Seções 14 e 28 da tarefa). Mesma lista nas duas páginas; não inventar
 * categorias novas para preencher layout (AGENT_RULES_SITE.md, Regra 5).
 */
export const CORE_MATERIALS = [
  "Papelão",
  "Papel branco",
  "Gráfica colorida",
  "Sacos de cimento",
  "Jornal",
  "Plástico",
  "Tetra Pak",
  "Documentos sigilosos",
  "Madeira",
  "Alumínio",
  "Ferro",
  "Resíduo orgânico",
] as const;

export type CoreMaterial = (typeof CORE_MATERIALS)[number];

/* ==========================================================
   FAMÍLIAS DE MATERIAL — organização de leitura, não dado novo
   ==========================================================

   O Material Atlas (components/shared/MaterialAtlas.tsx) precisa que
   alguém bata o olho e perceba "a empresa trabalha com muitos tipos de
   material". Doze nomes soltos numa grade não produzem essa leitura: doze
   itens equidistantes leem como doze itens equidistantes, seja qual for o
   assunto.

   O agrupamento abaixo é uma decisão de APRESENTAÇÃO sobre a lista
   validada — não é conteúdo novo e precisa ser lido como tal:

     · nenhum material foi acrescentado;
     · nenhum material foi removido;
     · nenhum nome foi reescrito — o texto exibido é exatamente a string
       de CORE_MATERIALS, que continua sendo a fonte da verdade;
     · a única informação criada é o RÓTULO da família, e ele nunca
       substitui um nome de material na interface: aparece como cabeçalho
       acima dos nomes, que continuam todos visíveis.

   Se o responsável pelo projeto não quiser os rótulos de família, basta o
   Atlas renderizar `CORE_MATERIALS` direto — nada mais depende disto.

   Vidro não existe aqui de propósito: aparece no prompt da imagem do
   Atlas (que representa famílias de recicláveis genericamente), mas NÃO
   está na lista validada do Grupo Almeida, então não pode virar texto.
*/

export type MaterialFamilyId = "papel" | "plastico" | "metal" | "madeira-organico" | "outros";

const FAMILY_OF: Partial<Record<CoreMaterial, MaterialFamilyId>> = {
  "Papelão": "papel",
  "Papel branco": "papel",
  "Gráfica colorida": "papel",
  "Sacos de cimento": "papel",
  "Jornal": "papel",
  "Documentos sigilosos": "papel",
  "Plástico": "plastico",
  "Tetra Pak": "plastico",
  "Alumínio": "metal",
  "Ferro": "metal",
  "Madeira": "madeira-organico",
  "Resíduo orgânico": "madeira-organico",
};

const FAMILY_LABEL: Record<MaterialFamilyId, string> = {
  papel: "Papel e papelão",
  plastico: "Plásticos e embalagens",
  metal: "Metais",
  "madeira-organico": "Madeira e orgânicos",
  outros: "Outros materiais",
};

const FAMILY_ORDER: MaterialFamilyId[] = ["papel", "plastico", "metal", "madeira-organico", "outros"];

export type MaterialFamily = {
  id: MaterialFamilyId;
  label: string;
  items: string[];
};

/**
 * Famílias derivadas de CORE_MATERIALS, nunca escritas à mão.
 *
 * O `?? "outros"` é a garantia estrutural de que a apresentação não pode
 * perder um material: se alguém acrescentar um nome em CORE_MATERIALS e
 * esquecer de classificá-lo, ele aparece em "Outros materiais" em vez de
 * sumir silenciosamente do Atlas. Famílias que ficarem vazias não são
 * renderizadas — hoje "outros" está vazia e não aparece.
 */
export const MATERIAL_FAMILIES: MaterialFamily[] = FAMILY_ORDER.map((id) => ({
  id,
  label: FAMILY_LABEL[id],
  items: CORE_MATERIALS.filter((material) => (FAMILY_OF[material] ?? "outros") === id),
})).filter((family) => family.items.length > 0);
