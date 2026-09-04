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
 *
 * Reconstrução de arquitetura visual (2026-08-20): os mapas passaram de
 * ilustrações editoriais estáticas (Magnific/MCP) para o Google Maps real,
 * incorporado via iframe sem chave/API (`output=embed` — mesmo mecanismo
 * gratuito por trás do "Incorporar um mapa" do Google Maps, sem Maps Embed
 * API, sem billing). O endereço de Araquari, antes não publicado por falta
 * de validação independente, foi confirmado batendo nome, CNPJ e endereço
 * contra o cadastro público da Receita Federal (CNPJ 04.910.399/0002-80,
 * situação ATIVA, fantasia "ALMEIDA AMBIENTAL", logradouro "RUA ANTONIO
 * AMORIM", número 890, bairro "PORTO GRANDE", município ARAQUARI/SC, CEP
 * 89245-000 — consulta via receitaws.com.br em 2026-08-20) — mesmo
 * endereço apontado pela tarefa, agora com fonte oficial independente.
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
  /** Link externo "Abrir no Google Maps" (busca por nome + endereço). */
  mapHref?: string;
  /** Link externo "Abrir no Waze". */
  wazeHref?: string;
  /** Google Maps real incorporado (iframe, sem chave/API). */
  mapEmbedSrc?: string;
  mapEmbedTitle?: string;
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
/** Embed keyless do Google Maps (sem Maps Embed API, sem chave, sem billing). */
const mapsEmbed = (query: string) => `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

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
    mapHref: mapsQuery("Almeida Ambiental, Rua Governador José Boabaid, Distrito Industrial, São José, SC, 88104-760"),
    wazeHref: wazeQuery("Rua Governador José Boabaid, Distrito Industrial, São José, SC, 88104-760"),
    mapEmbedSrc: mapsEmbed("Almeida Ambiental, Rua Governador José Boabaid, Distrito Industrial, São José, SC, 88104-760"),
    mapEmbedTitle: "Mapa — Almeida Ambiental, São José, SC",
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
    addressLines: ["Rua Antonio Amorim, 890 — Porto Grande", "Araquari, SC — CEP 89245-000"],
    // Sem "Almeida Ambiental" na query (diferente de São José/Blumenau): o
    // nome fantasia aqui casa com mais de um resultado no geocoder do Maps
    // (inclusive uma filial perto de Joinville), o que abria o embed numa
    // vista regional ambígua em vez do endereço exato. O endereço sozinho —
    // já validado contra o cadastro da Receita Federal — resolve preciso.
    mapHref: mapsQuery("Rua Antonio Amorim, 890, Porto Grande, Araquari, SC, 89245-000"),
    wazeHref: wazeQuery("Rua Antonio Amorim, 890, Porto Grande, Araquari, SC, 89245-000"),
    mapEmbedSrc: mapsEmbed("Rua Antonio Amorim, 890, Porto Grande, Araquari, SC, 89245-000"),
    mapEmbedTitle: "Mapa — Almeida Ambiental, Araquari, SC",
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
    mapHref: mapsQuery("Saturno Ambiental, Rua Marechal Rondon, 510, Salto Norte, Blumenau, SC, 89065-200"),
    wazeHref: wazeQuery("Rua Marechal Rondon, 510, Salto Norte, Blumenau, SC, 89065-200"),
    mapEmbedSrc: mapsEmbed("Saturno Ambiental, Rua Marechal Rondon, 510, Salto Norte, Blumenau, SC, 89065-200"),
    mapEmbedTitle: "Mapa — Saturno Ambiental, Blumenau, SC",
    channels: [
      { label: "Telefone", display: "(47) 3323-8441", href: "tel:+554733238441", action: "call" },
      { label: "WhatsApp", display: "(48) 98464-9289", href: "https://wa.me/5548984649289", action: "whatsapp" },
    ],
    whatsappMessage: "Olá! Vim pelo site do Grupo Almeida e gostaria de falar com a Saturno Ambiental em Blumenau.",
  },
];

/**
 * WhatsApp contextual de um equipamento (Almeida Equipamentos).
 *
 * Não é um canal novo: reaproveita exatamente o número de Atendimento da
 * matriz em São José já publicado acima (a Almeida Equipamentos não tem
 * canal próprio — ver `note` da região) e o mesmo mecanismo de mensagem
 * pré-preenchida que /contato usa. A única diferença é que o nome do
 * equipamento selecionado viaja junto com a ação, para que quem atende já
 * saiba do que se trata. Nenhum número, e-mail ou canal é inventado aqui.
 */
const SAO_JOSE = REGIONS.find((region) => region.id === "sao-jose")!;
const SAO_JOSE_WHATSAPP = SAO_JOSE.channels.find((channel) => channel.action === "whatsapp")!;

export const equipmentWhatsAppHref = (equipmentName: string) =>
  `${SAO_JOSE_WHATSAPP.href}?text=${encodeURIComponent(
    `Olá! Vim pelo site do Grupo Almeida e gostaria de falar sobre o equipamento ${equipmentName}.`
  )}`;

/** Anchors regionais reutilizados pelos CTAs de outras páginas — única
 *  fonte de verdade para não duplicar "/contato#..." espalhado pelo site. */
export const CONTACT_ANCHORS = {
  saoJose: "/contato#sao-jose",
  araquariJoinville: "/contato#araquari-joinville",
  blumenau: "/contato#blumenau",
};
