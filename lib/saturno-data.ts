/**
 * Fonte de dados da página /saturno-ambiental. Copy transcrita das Seções
 * 19-30 da tarefa. A Saturno passou a integrar o Grupo Almeida em 2022 —
 * fonte da verdade é `lib/historia-data.ts` (evento "2022-saturno") e
 * DECISOES.md, não o material de pesquisa externo que ainda cita 2021.
 * Não afirmar história da marca anterior à aquisição (AGENT_RULES_SITE.md,
 * Regra 5).
 */

import { img } from "./media";
import { CORE_MATERIALS } from "./materials";
import { CONTACT_ANCHORS } from "./contact-data";

/**
 * ---------------- Por que esta página quase não tem fotografia ----------------
 *
 * Não existe captação prevista da instalação atual da Saturno, e o prédio
 * de hoje não representa o padrão que o Grupo está construindo. Enquanto
 * isso for verdade, três imagens geradas que existiam aqui saíram nesta
 * rodada porque não ilustravam um conceito — elas afirmavam fatos:
 *
 *   vale-itajai.webp        — um galpão inventado servindo de sede da
 *                             Saturno no Hero da própria empresa.
 *   triagem-mezanino.webp   — uma linha de triagem apresentada como a
 *                             operação real da Saturno.
 *   consultoria-ambiental.webp — um profissional inexistente passando por
 *                             registro de uma equipe real.
 *
 * Nenhuma foi substituída por outra imagem: emprestar a fotografia de uma
 * unidade da Almeida faria a sede de uma empresa passar pela da outra, e
 * gerar um prédio novo repetiria o mesmo erro com outro arquivo. O
 * território visual da Saturno passa a vir de tipografia, superfície,
 * geometria, símbolo, espaçamento e conteúdo — ver SaturnoPage.tsx.
 *
 * CARTONAGEM_IMAGE fica: mostra o MATERIAL que a Saturno comercializa
 * (caixas de papelão em tamanhos diferentes), não uma instalação, uma
 * equipe ou um endereço. É material, e material a Saturno tem.
 */
export const CARTONAGEM_IMAGE = {
  ...img(
    "saturno-ambiental",
    "cartonagem",
    "/saturno-ambiental/cartonagem2-desktop.webp",
    "Operação de cartonagem da Saturno Ambiental com colaboradora organizando pilhas de caixas de papelão sobre paletes"
  ),
  sourceType: "archive" as const,
};

/**
 * Faixa de metadados do Hero tipográfico. Só o que já está validado em
 * outro lugar do repositório: a região vem da lede da própria página, o
 * ano de integração vem de `lib/historia-data.ts` (evento "2022-saturno") e
 * de DECISOES.md, e o escopo é o resumo das frentes listadas abaixo em
 * FRENTES. Nada de número de funcionários, área, frota ou capacidade —
 * esses dados não existem para a Saturno no material aprovado.
 */
export const HERO_META = [
  "Blumenau · Vale do Itajaí",
  "No Grupo Almeida desde 2022",
  "Resíduos, cartonagem e gestão ambiental",
];

export type Frente = {
  id: "coleta" | "triagem" | "trituracao" | "enfardamento" | "destinacao" | "cartonagem" | "gestao-ambiental";
  eyebrow: string;
  headline: string;
  copy: string;
  tags?: string[];
  cta?: { label: string; href: string };
  image?: ReturnType<typeof img>;
};

export const FRENTES: Frente[] = [
  {
    id: "coleta",
    eyebrow: "Coleta de Resíduos",
    headline: "Coleta conectada à rotina da região.",
    copy: "Volumes, frequência e tipo de material mudam de uma operação para outra. A Saturno estrutura a coleta considerando essas diferenças e direciona os resíduos para as etapas adequadas de classificação e processamento.",
  },
  {
    id: "triagem",
    eyebrow: "Triagem e Classificação",
    headline: "Separar corretamente para aproveitar melhor.",
    copy: "A triagem organiza os materiais conforme composição e destino, criando condições para recuperar valor, reduzir descarte inadequado e encaminhar cada resíduo para a solução correspondente.",
  },
  {
    id: "trituracao",
    eyebrow: "Trituração e Descaracterização",
    headline: "Tratamento opcional quando o material exige.",
    copy: "Quando necessário — como em documentos sigilosos ou resíduos que precisam deixar de ser reconhecíveis —, o material passa por trituração ou descaracterização antes de seguir para o enfardamento.",
  },
  {
    id: "enfardamento",
    eyebrow: "Enfardamento",
    headline: "Compactação em fardos para transporte e destino.",
    copy: "Os materiais triados — ou tratados quando necessário — são compactados em fardos padronizados, otimizando o armazenamento e o transporte até a destinação final.",
  },
  {
    id: "destinacao",
    eyebrow: "Destinação",
    headline: "O ciclo se completa com o encaminhamento correto.",
    copy: "Após o enfardamento, cada material segue para a destinação adequada à sua composição — fechando o ciclo iniciado na coleta.",
  },
  {
    id: "cartonagem",
    eyebrow: "Cartonagem",
    headline: "Papelão que volta para a operação.",
    copy: "A Saturno mantém um setor dedicado à confecção e comercialização de caixas de papelão, com opções novas e usadas em diferentes tamanhos. É uma extensão natural de uma operação que conhece o material desde a recuperação até sua reutilização.",
    tags: ["Diferentes tamanhos e opções conforme disponibilidade"],
    cta: { label: "Consultar tamanhos e estoque", href: CONTACT_ANCHORS.blumenau },
    image: CARTONAGEM_IMAGE,
  },
  {
    id: "gestao-ambiental",
    eyebrow: "Gestão Ambiental",
    headline: "Conhecimento técnico também faz parte da gestão.",
    copy: "Além da operação com resíduos, a Saturno Ambiental presta serviços técnicos especializados para apoiar empresas no atendimento de suas responsabilidades ambientais.",
    tags: [
      "Atendimento a condicionantes de licenças ambientais",
      "Elaboração de planos e programas ambientais",
      "PGRS",
      "PGRSS",
      "PAE",
      "Palestras e treinamentos",
      "Educação ambiental",
      "Orientações relacionadas a programas ambientais e sistemas de MTR",
    ],
    cta: { label: "Conversar sobre Gestão Ambiental", href: CONTACT_ANCHORS.blumenau },
  },
];

export const MATERIALS = [...CORE_MATERIALS];

/* ==========================================================
   VERSÃO EM INGLÊS — mesmo significado, mesmos fatos/números/datas.
   Ver lib/i18n/locale.ts.
   ========================================================== */

export const CARTONAGEM_IMAGE_EN = {
  ...img(
    "saturno-ambiental",
    "cartonagem",
    "/saturno-ambiental/cartonagem2-desktop.webp",
    "Saturno Ambiental cardboard packaging operation with a team member organizing stacked corrugated boxes on pallets"
  ),
  sourceType: "archive" as const,
};

export const HERO_META_EN = [
  "Blumenau · Vale do Itajaí region",
  "Part of Grupo Almeida since 2022",
  "Waste management, cardboard packaging and environmental services",
];

export const FRENTES_EN: Frente[] = [
  {
    id: "coleta",
    eyebrow: "Waste Collection",
    headline: "Collection designed around local operating needs.",
    copy: "Volume, frequency and material type change from one operation to another. Saturno structures collection around these differences and routes waste to the right sorting and processing steps.",
  },
  {
    id: "triagem",
    eyebrow: "Sorting and Classification",
    headline: "Better sorting means better recovery.",
    copy: "Sorting organizes materials by composition and destination, creating the conditions to recover value, reduce improper disposal and route each type of waste to the right solution.",
  },
  {
    id: "trituracao",
    eyebrow: "Shredding and Destruction",
    headline: "Optional treatment when the material requires it.",
    copy: "When needed — such as for confidential documents or waste that must be rendered unrecognizable — materials undergo shredding or destruction before moving on to baling.",
  },
  {
    id: "enfardamento",
    eyebrow: "Baling",
    headline: "Compacted into bales for transport and disposal.",
    copy: "Sorted materials — or those treated when necessary — are compacted into standardized bales, optimizing storage and transport to final disposal.",
  },
  {
    id: "destinacao",
    eyebrow: "Disposal",
    headline: "Every material ends up where it should.",
    copy: "After baling, each material moves on to the proper disposal channel suited to its composition — closing the chain that starts with collection.",
  },
  {
    id: "cartonagem",
    eyebrow: "Cardboard Packaging",
    headline: "Cardboard returned to productive use.",
    copy: "Saturno runs a dedicated unit that makes and sells cardboard boxes, with new and used options in different sizes. It's a natural extension of work Saturno already does — handling material from recovery through to reuse.",
    tags: ["Different sizes and options, subject to availability"],
    cta: { label: "Ask about sizes and stock", href: CONTACT_ANCHORS.blumenau },
    image: CARTONAGEM_IMAGE_EN,
  },
  {
    id: "gestao-ambiental",
    eyebrow: "Environmental Management",
    headline: "Technical know-how is part of the service too.",
    copy: "Beyond waste operations, Saturno Ambiental provides specialized technical services to help companies meet their environmental responsibilities.",
    tags: [
      "Compliance with environmental license conditions",
      "Preparation of environmental plans and programs",
      "PGRS (Solid Waste Management Plan)",
      "PGRSS (Health Care Waste Management Plan)",
      "PAE (Emergency Action Plan)",
      "Talks and training sessions",
      "Environmental education",
      "Guidance on environmental programs and MTR (waste manifest) systems",
    ],
    cta: { label: "Talk to our environmental management team", href: CONTACT_ANCHORS.blumenau },
  },
];
