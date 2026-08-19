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

export type RegionContact = {
  id: "sao-jose" | "araquari-joinville" | "blumenau";
  eyebrow: string;
  headline: string;
  description: string;
  cnpjLabel: string;
  cnpj: string;
  addressLines?: string[];
  mapHref?: string;
  channels: Channel[];
  /** Nota curta e neutra — nunca linguagem de "estrutura operacional". */
  note?: string;
};

const mapsQuery = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

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
    channels: [
      { label: "Atendimento", display: "(48) 3259-4444", href: "https://wa.me/554832594444", action: "whatsapp" },
      { label: "Logística", display: "(48) 99946-6066", href: "https://wa.me/5548999466066", action: "whatsapp" },
    ],
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
    channels: [
      { label: "Telefone", display: "(47) 3323-8441", href: "tel:+554733238441", action: "call" },
      { label: "WhatsApp", display: "(48) 98464-9289", href: "https://wa.me/5548984649289", action: "whatsapp" },
    ],
  },
];

/** Anchors regionais reutilizados pelos CTAs de outras páginas — única
 *  fonte de verdade para não duplicar "/contato#..." espalhado pelo site. */
export const CONTACT_ANCHORS = {
  saoJose: "/contato#sao-jose",
  araquariJoinville: "/contato#araquari-joinville",
  blumenau: "/contato#blumenau",
};
