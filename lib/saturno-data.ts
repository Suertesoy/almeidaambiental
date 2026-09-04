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
export const CARTONAGEM_IMAGE = img(
  "saturno-ambiental",
  "cartonagem",
  "/saturno-ambiental/cartonagem-caixas.webp",
  "Caixas de papelão novas e usadas organizadas em diferentes tamanhos dentro de galpão"
);

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
  id: "coleta" | "triagem" | "trituracao" | "destinacao" | "cartonagem" | "gestao-ambiental";
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
    headline: "Segurança e descaracterização quando o material exige.",
    copy: "Materiais sigilosos e determinados resíduos podem exigir descaracterização antes da destinação. A Saturno dispõe de soluções de processamento para preparar esses materiais de maneira mais segura e eficiente.",
  },
  {
    id: "destinacao",
    eyebrow: "Destinação",
    headline: "O ciclo se completa com o encaminhamento correto.",
    copy: "Depois de classificado e processado, cada material segue para a destinação adequada, de acordo com sua composição — fechando a cadeia iniciada na coleta.",
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
