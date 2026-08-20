/**
 * Fonte de dados da página /contato.
 *
 * Reconstrução de 2026-08-19: a partir desta versão, os canais publicados
 * aqui vêm EXCLUSIVAMENTE dos dados oficiais fornecidos pelo responsável do
 * projeto para esta tarefa — nunca do site antigo, de buscas externas, de
 * diretórios ou de capturas arquivadas (essas fontes deixaram de ser usadas
 * a partir de agora). Nenhum fax, nenhum e-mail: nenhum dos dois faz parte
 * dos canais oficiais fornecidos, então nenhum aparece na página.
 *
 * Estrutura por região/operação (não mais por empresa) — São José reúne
 * Almeida Ambiental (matriz) e Almeida Equipamentos (mesma estrutura, sem
 * canal próprio); Araquari/Joinville e Blumenau são blocos independentes.
 */

export type Channel = {
  label: string;
  display: string;
  href: string;
  action: "whatsapp" | "call";
};

/** Imagem de mapa editorial estática (Checkpoint E, refinamento mobile
 *  2026-08-20) — recorte regional abstrato, não uma captura de Google
 *  Maps: sem nomes de rua inventados, sem coordenadas de precisão falsa.
 *  Ver Seções 24-27 da tarefa. Gerada via Magnific/MCP, mesmo princípio de
 *  `EditorialImage` (lib/media.ts) mas fora do domínio de página de
 *  empresa — por isso um tipo local em vez de reaproveitar `img()`. */
export type RegionMapImage = { src: string; alt: string };

export type RegionContact = {
  id: "sao-jose" | "araquari-joinville" | "blumenau";
  eyebrow: string;
  headline: string;
  description: string;
  cnpjLabel: string;
  cnpj: string;
  addressLines?: string[];
  mapHref?: string;
  wazeHref?: string;
  mapImage?: RegionMapImage;
  channels: Channel[];
  /** Mensagem pré-preenchida dos botões de WhatsApp desta região (Seção 22
   *  da tarefa) — contextualiza empresa/unidade sempre que o próprio CTA
   *  permite identificá-la. */
  whatsappMessage: string;
  /** Nota curta e neutra — nunca linguagem de "estrutura operacional". */
  note?: string;
};

const mapsQuery = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
const wazeQuery = (query: string) => `https://waze.com/ul?q=${encodeURIComponent(query)}&navigate=yes`;

export const REGIONS: RegionContact[] = [
  {
    id: "sao-jose",
    eyebrow: "Matriz · São José",
    headline: "Grupo Almeida",
    description: "Atendimento da matriz e suporte às operações do Grupo Almeida em São José.",
    cnpjLabel: "CNPJ Almeida Ambiental",
    cnpj: "04.910.399/0001-07",
    addressLines: [
      "Esquina com Rua Francisco Severino de Souza",
      "Rua Governador José Boabaid — Distrito Industrial",
      "São José, SC — CEP 88104-760",
    ],
    mapHref: mapsQuery("Rua Governador José Boabaid, Distrito Industrial, São José, SC, 88104-760"),
    wazeHref: wazeQuery("Rua Governador José Boabaid, Distrito Industrial, São José, SC, 88104-760"),
    mapImage: {
      src: "/contato/mapa-sao-jose.webp",
      alt: "Ilustração editorial abstrata da região de São José, SC, com pin institucional indicando a matriz do Grupo Almeida",
    },
    channels: [
      { label: "Atendimento", display: "(48) 3259-4444", href: "https://wa.me/554832594444", action: "whatsapp" },
      { label: "Logística", display: "(48) 99946-6066", href: "https://wa.me/5548999466066", action: "whatsapp" },
    ],
    whatsappMessage: "Olá! Vim pelo site do Grupo Almeida e gostaria de falar com a Almeida Ambiental em São José.",
    note: "Para Almeida Equipamentos, utilize os canais da matriz em São José.",
  },
  {
    id: "araquari-joinville",
    eyebrow: "Araquari / Joinville",
    headline: "Almeida Ambiental",
    description: "Atendimento da unidade de Araquari / Joinville.",
    cnpjLabel: "CNPJ Almeida Ambiental",
    cnpj: "04.910.399/0002-80",
    channels: [
      { label: "Administrativo", display: "(47) 99949-6299", href: "https://wa.me/5547999496299", action: "whatsapp" },
    ],
    whatsappMessage:
      "Olá! Vim pelo site do Grupo Almeida e gostaria de falar com a Almeida Ambiental em Araquari / Joinville.",
  },
  {
    id: "blumenau",
    eyebrow: "Vale do Itajaí",
    headline: "Saturno Ambiental",
    description: "Serviços ambientais, gestão de resíduos e cartonagem em Blumenau e região.",
    cnpjLabel: "CNPJ Saturno Ambiental",
    cnpj: "02.111.538/0001-07",
    addressLines: ["Rua Marechal Rondon, 510 — Salto Norte", "Blumenau, SC — CEP 89065-200"],
    mapHref: mapsQuery("Rua Marechal Rondon, 510, Salto Norte, Blumenau, SC, 89065-200"),
    wazeHref: wazeQuery("Rua Marechal Rondon, 510, Salto Norte, Blumenau, SC, 89065-200"),
    mapImage: {
      src: "/contato/mapa-blumenau.webp",
      alt: "Ilustração editorial abstrata da região do Vale do Itajaí, Blumenau, SC, com pin institucional indicando a Saturno Ambiental",
    },
    channels: [
      { label: "Telefone", display: "(47) 3323-8441", href: "tel:+554733238441", action: "call" },
      { label: "WhatsApp", display: "(48) 98464-9289", href: "https://wa.me/5548984649289", action: "whatsapp" },
    ],
    whatsappMessage: "Olá! Vim pelo site do Grupo Almeida e gostaria de falar com a Saturno Ambiental em Blumenau.",
  },
];

/** Anchors regionais reutilizados pelos CTAs de outras páginas — única
 *  fonte de verdade para não duplicar "/contato#..." espalhado pelo site. */
export const CONTACT_ANCHORS = {
  saoJose: "/contato#sao-jose",
  araquariJoinville: "/contato#araquari-joinville",
  blumenau: "/contato#blumenau",
};
