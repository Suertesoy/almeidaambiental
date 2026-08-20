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

export const HERO_IMAGE = img(
  "saturno-ambiental",
  "hero",
  "/saturno-ambiental/vale-itajai.webp",
  "Operação ambiental contemporânea no Vale do Itajaí, galpão industrial cercado por paisagem verde de Santa Catarina"
);

export const CARTONAGEM_IMAGE = img(
  "saturno-ambiental",
  "cartonagem",
  "/saturno-ambiental/cartonagem-caixas.webp",
  "Caixas de papelão novas e usadas organizadas em diferentes tamanhos dentro de galpão"
);

export const GESTAO_AMBIENTAL_IMAGE = img(
  "saturno-ambiental",
  "gestao-ambiental",
  "/saturno-ambiental/consultoria-ambiental.webp",
  "Profissional analisando planta e documentação técnica em ambiente industrial"
);

export const MATERIALS_IMAGE = img(
  "saturno-ambiental",
  "materiais",
  "/saturno-ambiental/triagem-mezanino.webp",
  "Vista elevada de linha de triagem industrial de materiais recicláveis"
);

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
    image: GESTAO_AMBIENTAL_IMAGE,
  },
];

export const MATERIALS = [...CORE_MATERIALS];
