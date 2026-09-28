/**
 * Fonte de dados da página /almeida-ambiental. Copy transcrita das Seções
 * 7-18 da tarefa (aprovada pelo responsável do projeto) — não alterar o
 * sentido do texto institucional aqui. Imagens geradas via Magnific/MCP,
 * `sourceType: "illustrative"`, organizadas para substituição futura por
 * acervo real (ver AGENT_RULES_SITE.md, Regra 5 e pendências em DECISOES.md).
 */

import { img } from "./media";
import { CORE_MATERIALS } from "./materials";

export const HERO_IMAGE = img(
  "almeida-ambiental",
  "hero",
  "/almeida-ambiental/patio-industrial.webp",
  "Pátio industrial de reciclagem com fardos de papelão organizados, empilhadeira em operação e galpão moderno ao fundo"
);

export const POSITIONING_IMAGE = img(
  "almeida-ambiental",
  "posicionamento",
  "/almeida-ambiental/detalhe-classificacao.webp",
  "Detalhe de mãos com luvas de trabalho classificando papelão e papel em esteira de triagem"
);

export const MATERIALS_IMAGE = img(
  "almeida-ambiental",
  "materiais",
  "/almeida-ambiental/materiais-composicao.webp",
  "Composição editorial de matérias-primas recicláveis: papelão, papel, plástico, madeira e metal sobre fundo neutro"
);

export type Pillar = {
  id: "coleta" | "triagem" | "trituracao";
  eyebrow: string;
  headline: string;
  copy: string;
  highlights: string[];
  subcopy?: string;
  image: ReturnType<typeof img>;
};

export const PILLARS: Pillar[] = [
  {
    id: "coleta",
    eyebrow: "Coleta de Resíduos",
    headline: "Coleta planejada para a realidade de cada operação.",
    copy: "A Almeida Ambiental dispõe de estrutura logística para atender diferentes volumes, materiais e rotinas de geração. Contêineres, equipamentos de compactação e uma operação de transporte dimensionada permitem organizar a coleta com mais eficiência, espaço e previsibilidade.",
    highlights: [
      "Contêineres abertos e fechados",
      "Equipamentos de compactação",
      "Operação adaptada ao volume e ao material",
    ],
    image: img(
      "almeida-ambiental",
      "pilar-coleta",
      "/almeida-ambiental/coleta-rollon.webp",
      "Caminhão roll-on/roll-off operando em pátio industrial durante a coleta de resíduos"
    ),
  },
  {
    id: "triagem",
    eyebrow: "Triagem e Classificação",
    headline: "O valor do resíduo começa na separação correta.",
    copy: "Depois da coleta, os materiais passam por processos de triagem e classificação que permitem identificar sua melhor destinação e ampliar seu aproveitamento. A combinação entre experiência operacional e tecnologia ajuda a transformar uma etapa que muitas vezes é tratada como descarte em uma cadeia rastreável de recuperação de materiais.",
    highlights: ["Classificação por tipo de material", "Aproveitamento e direcionamento adequado", "Rastreabilidade da operação"],
    image: img(
      "almeida-ambiental",
      "pilar-triagem",
      "/almeida-ambiental/triagem-esteira.webp",
      "Esteira de triagem industrial com trabalhadores classificando papel, plástico e embalagens"
    ),
  },
  {
    id: "trituracao",
    eyebrow: "Trituração e Descaracterização",
    headline: "Quando o material precisa deixar de ser reconhecível.",
    copy: "Documentos, materiais confidenciais e outros resíduos podem exigir mais do que coleta. A Almeida Ambiental realiza processos de trituração e descaracterização para reduzir volume, proteger informações e preparar materiais para as etapas seguintes da cadeia de reciclagem ou destinação.",
    highlights: [],
    subcopy: "Dependendo do material, a solução é dimensionada previamente pela equipe técnica.",
    image: img(
      "almeida-ambiental",
      "pilar-trituracao",
      "/almeida-ambiental/triturador.webp",
      "Triturador industrial processando papel em fragmentos dentro de galpão"
    ),
  },
];

export const MATERIALS = [...CORE_MATERIALS];

export const FLOW_STEPS = ["Diagnóstico", "Coleta", "Triagem", "Trituração", "Descaracterização", "Destinação"];

export const PRESENCE_LOCATIONS = ["São José", "Chapecó", "Araquari", "Joinville"];

/* ==========================================================
   VERSÃO EM INGLÊS — mesmo significado, mesmos fatos/números/materiais.
   Ver lib/i18n/locale.ts. HERO_IMAGE/POSITIONING_IMAGE/MATERIALS_IMAGE
   compartilham o mesmo arquivo de imagem; só o alt muda de idioma.
   ========================================================== */

export const HERO_IMAGE_EN = img(
  "almeida-ambiental",
  "hero",
  "/almeida-ambiental/patio-industrial.webp",
  "Industrial recycling yard with organized cardboard bales, a forklift in operation and a modern warehouse in the background"
);

export const POSITIONING_IMAGE_EN = img(
  "almeida-ambiental",
  "posicionamento",
  "/almeida-ambiental/detalhe-classificacao.webp",
  "Close-up of gloved hands sorting cardboard and paper on a sorting conveyor belt"
);

export const PILLARS_EN: Pillar[] = [
  {
    id: "coleta",
    eyebrow: "Waste Collection",
    headline: "Collection planned around what each operation actually needs.",
    copy: "Almeida Ambiental has the logistics capabilities to serve different volumes, materials and waste generation patterns. Containers, compaction equipment and a properly sized transport operation make it possible to run collection more efficiently, with better use of space and more predictability.",
    highlights: ["Open and closed containers", "Compaction equipment", "Operation adapted to volume and material"],
    image: img(
      "almeida-ambiental",
      "pilar-coleta",
      "/almeida-ambiental/coleta-rollon.webp",
      "Roll-on/roll-off truck operating in an industrial yard during waste collection"
    ),
  },
  {
    id: "triagem",
    eyebrow: "Sorting and Classification",
    headline: "The value of waste starts with correct separation.",
    copy: "After collection, materials go through sorting and classification processes that identify the most appropriate route for each material and increase how much of it can be recovered. Combining operational experience with technology helps turn a step often treated as disposal into a traceable chain of material recovery.",
    highlights: ["Classification by material type", "Proper recovery and routing", "Operational traceability"],
    image: img(
      "almeida-ambiental",
      "pilar-triagem",
      "/almeida-ambiental/triagem-esteira.webp",
      "Industrial sorting line with workers classifying paper, plastic and packaging"
    ),
  },
  {
    id: "trituracao",
    eyebrow: "Shredding and Destruction",
    headline: "When material needs to become unrecognizable.",
    copy: "Documents, confidential materials and other waste can require more than collection. Almeida Ambiental carries out shredding and destruction processes to reduce volume, protect information and prepare materials for the next steps in the recycling or disposal chain.",
    highlights: [],
    subcopy: "Depending on the material, our technical team sizes the solution in advance.",
    image: img(
      "almeida-ambiental",
      "pilar-trituracao",
      "/almeida-ambiental/triturador.webp",
      "Industrial shredder processing paper into fragments inside a warehouse"
    ),
  },
];

export const FLOW_STEPS_EN = ["Assessment", "Collection", "Sorting", "Shredding", "Destruction", "Disposal"];
