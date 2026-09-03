/**
 * Fonte de dados única da página /historia. A cronologia (datas, fatos,
 * números) é a fornecida pelo responsável do projeto e não deve ser alterada,
 * unida ou completada com suposições — ver AGENT_RULES_SITE.md, Regra 5.
 *
 * Cada evento carrega no máximo uma imagem (a narrativa usa ~8 fotografias
 * no total, não uma por ano). `image.sourceType` distingue reconstruções
 * ilustrativas (`illustrative`) de registros reais (`archive`) — hoje todas
 * as imagens são `illustrative`, geradas via Magnific/MCP como placeholder,
 * e devem ser substituídas por fotografia real do Grupo Almeida assim que
 * disponível, sem exigir mudança de estrutura aqui.
 *
 * ---------------- Prédios gerados ----------------
 *
 * Rodada de refino editorial: três reconstituições saíram da timeline —
 * a sede de São José (2021), a operação de Blumenau (2022) e a unidade de
 * Araquari (2026). Existe uma diferença de natureza entre reconstituir uma
 * TECNOLOGIA e reconstituir um ENDEREÇO. Um caminhão dos anos 1980, uma
 * prensa horizontal ou um triturador ilustram um tipo de equipamento que
 * realmente entrou na operação naquele ano — a imagem é um exemplo do
 * gênero e continua no lugar, com o selo de ilustrativa.
 *
 * Um prédio, não: existe UM galpão real em Araquari, UMA sede real em São
 * José, UMA instalação real em Blumenau. Colocar ao lado dessas datas um
 * complexo industrial gerado é apresentar como documentação de um imóvel
 * específico algo que nunca foi fotografado — e, no caso de 2022, fazer um
 * prédio inventado passar pela instalação da Saturno. Nenhuma foi
 * substituída por outra imagem: os eventos continuam com data, cidade,
 * área construída e texto íntegros, e a área construída continua no
 * infográfico de evolução (GROWTH_SCALE). Só o prédio falso saiu.
 *
 * Quando houver fotografia real dessas unidades, basta devolver `image`
 * com `sourceType: "archive"` — nada de estrutura muda.
 */

export type ImageSourceType = "illustrative" | "archive";

export type HistoriaImage = {
  src: string;
  alt: string;
  sourceType: ImageSourceType;
  /** Orientação nativa do arquivo, usada para escolher o recorte/aspect-ratio do slot. */
  orientation: "landscape" | "portrait";
};

export type Chapter = "origem" | "evolucao" | "expansao" | "novo-ciclo";

export type TimelineEvent = {
  id: string;
  year: number;
  /** Rótulo textual da data quando é mais específico que o ano (ex.: "Setembro de 1985"). */
  dateLabel?: string;
  chapter: Chapter;
  description: string;
  /** Termos que recebem tratamento tipográfico de destaque dentro de `description`. */
  highlights?: string[];
  image?: HistoriaImage;
  /** Cidade associada, usada pelo mapa de expansão (components/historia/ExpansionMap.tsx). */
  location?: string;
  /** Lado preferencial no desktop (a linha alterna por padrão; usado para casos que pedem ênfase). */
  side?: "left" | "right";
  /** Área construída em m² mencionada no próprio evento (uso tipográfico local, ex.: destaque no texto). */
  areaSqm?: number;
  /** Marca este evento como um dos seis pontos oficiais da subnarrativa de
   *  crescimento (Seção 9) — só 1985, 1990, 1999, 2004, 2010 e 2021. O
   *  evento de 2026 também tem `areaSqm` (3.000 m², citado no seu próprio
   *  texto) mas não integra essa escala de seis marcos. */
  growthMilestone?: boolean;
  /** Evento com mais peso visual — hoje só 2026, o ponto em que a timeline alcança o presente. */
  monumental?: boolean;
};

export const CHAPTER_META: Record<
  Chapter,
  { index: string; eyebrow: string; headline: string; tone: "stone" | "stoneAlt" | "forest" }
> = {
  origem: {
    index: "01",
    eyebrow: "Origem",
    headline: "Os primeiros passos de uma história construída ano após ano.",
    tone: "stone",
  },
  evolucao: {
    index: "02",
    eyebrow: "Evolução",
    headline: "Crescer também significou transformar a forma de operar.",
    tone: "stoneAlt",
  },
  expansao: {
    index: "03",
    eyebrow: "Expansão",
    headline: "De uma operação em São José para uma presença cada vez maior em Santa Catarina.",
    tone: "stone",
  },
  "novo-ciclo": {
    index: "04",
    eyebrow: "Novo Ciclo",
    headline: "Quatro décadas depois, a história continua sendo construída.",
    tone: "stoneAlt",
  },
};

const img = (
  src: string,
  alt: string,
  orientation: HistoriaImage["orientation"] = "landscape"
): HistoriaImage => ({
  src,
  alt,
  sourceType: "illustrative",
  orientation,
});

export const TIMELINE_EVENTS: TimelineEvent[] = [
  // ---------------- ORIGEM (1985–1993) ----------------
  {
    id: "1985-fundacao",
    year: 1985,
    dateLabel: "Setembro de 1985",
    chapter: "origem",
    description:
      "Fundação da Almeida em São José, Santa Catarina. Início das atividades em um galpão de 300 m², com uma prensa vertical e uma caminhonete Willys a gasolina.",
    highlights: ["300 m²", "uma prensa vertical", "uma caminhonete Willys a gasolina"],
    location: "São José",
    areaSqm: 300,
    growthMilestone: true,
    side: "right",
  },
  {
    id: "1986-frota-prensa",
    year: 1986,
    chapter: "origem",
    description:
      "Aquisição do primeiro caminhão Mercedes Benz 608 e instalação da segunda prensa vertical.",
    highlights: ["Mercedes Benz 608", "segunda prensa vertical"],
    image: img("/historia/expansao-logistica-1988.webp", "Reconstituição de caminhão de carga do final dos anos 1980, representando a ampliação da frota da Almeida"),
    side: "left",
  },
  {
    id: "1987-frota",
    year: 1987,
    chapter: "origem",
    description: "Ampliação da frota com a aquisição de um Volkswagen 6.90.",
    highlights: ["Volkswagen 6.90"],
    side: "right",
  },
  {
    id: "1990-ampliacao-sao-jose",
    year: 1990,
    chapter: "origem",
    description: "Ampliação da unidade de São José para 500 m².",
    highlights: ["500 m²"],
    location: "São José",
    areaSqm: 500,
    growthMilestone: true,
    side: "right",
  },
  {
    id: "1990-blumenau",
    year: 1990,
    chapter: "origem",
    description: "Início das operações da unidade de Blumenau, Santa Catarina.",
    highlights: ["Blumenau"],
    location: "Blumenau",
    side: "left",
  },
  {
    id: "1993-prensa-horizontal",
    year: 1993,
    chapter: "origem",
    description:
      "Instalação da primeira prensa horizontal, permitindo a produção de fardos de 400 kg.",
    highlights: ["primeira prensa horizontal", "400 kg"],
    image: img("/historia/prensa-fardos-1993.webp", "Reconstituição de prensa horizontal industrial e fardos de papelão compactado, anos 1990"),
    side: "right",
  },

  // ---------------- EVOLUÇÃO (1997–2016) ----------------
  {
    id: "1997-roll-on-roll-off",
    year: 1997,
    chapter: "evolucao",
    description: "Aquisição do primeiro caminhão Roll On/Roll Off, ampliando a capacidade logística.",
    highlights: ["Roll On/Roll Off"],
    side: "left",
  },
  {
    id: "1998-triturador",
    year: 1998,
    chapter: "evolucao",
    description: "Instalação do primeiro triturador, aumentando a capacidade de processamento dos materiais.",
    highlights: ["primeiro triturador"],
    image: img("/historia/triturador-2000.webp", "Reconstituição de triturador industrial e esteiras de processamento de recicláveis"),
    side: "right",
  },
  {
    id: "1999-novo-galpao",
    year: 1999,
    chapter: "evolucao",
    description: "Construção de um novo galpão com 2.500 m².",
    highlights: ["2.500 m²"],
    areaSqm: 2500,
    growthMilestone: true,
    side: "left",
  },
  {
    id: "2001-prensa-importada",
    year: 2001,
    chapter: "evolucao",
    description:
      "Instalação da primeira prensa horizontal importada, permitindo a produção de fardos de 800 kg.",
    highlights: ["primeira prensa horizontal importada", "800 kg"],
    side: "right",
  },
  {
    id: "2004-ampliacao",
    year: 2004,
    chapter: "evolucao",
    description: "Ampliação da estrutura industrial para 3.100 m².",
    highlights: ["3.100 m²"],
    areaSqm: 3100,
    growthMilestone: true,
    side: "left",
  },
  {
    id: "2005-segunda-prensa-800",
    year: 2005,
    chapter: "evolucao",
    description: "Instalação da segunda prensa para fardos de 800 kg.",
    highlights: ["800 kg"],
    side: "right",
  },
  {
    id: "2009-prensa-1100",
    year: 2009,
    chapter: "evolucao",
    description:
      "Instalação de uma nova prensa importada, permitindo a produção de fardos de 1.100 kg.",
    highlights: ["1.100 kg"],
    side: "left",
  },
  {
    id: "2010-ampliacao-3500",
    year: 2010,
    chapter: "evolucao",
    description: "Nova ampliação da unidade, totalizando 3.500 m² de área construída.",
    highlights: ["3.500 m²"],
    areaSqm: 3500,
    growthMilestone: true,
    side: "right",
  },
  {
    id: "2012-compactador-pottinger",
    year: 2012,
    chapter: "evolucao",
    description:
      "Instalação do primeiro compactador de resíduos por rosca sem fim importado. Esse acontecimento também marca o início da parceria com a Pöttinger.",
    highlights: ["compactador de resíduos por rosca sem fim importado", "Pöttinger"],
    image: img("/historia/tecnologia-2013.webp", "Reconstituição de compactador industrial importado, representando a modernização tecnológica do início dos anos 2010"),
    side: "left",
  },
  {
    id: "2013-prensas-austropressen",
    year: 2013,
    chapter: "evolucao",
    description:
      "Instalação das primeiras prensas de dois compartimentos, aumentando a eficiência operacional. Esse acontecimento também marca o início da parceria com a Austropressen.",
    highlights: ["prensas de dois compartimentos", "Austropressen"],
    side: "right",
  },
  {
    id: "2016-terreno-nova-sede",
    year: 2016,
    chapter: "evolucao",
    description: "Aquisição de um terreno de 10.000 m², destinado à construção da nova sede.",
    highlights: ["10.000 m²"],
    side: "left",
  },

  // ---------------- EXPANSÃO (2020–2024) ----------------
  {
    id: "2020-chapeco",
    year: 2020,
    chapter: "expansao",
    description: "Início das operações na cidade de Chapecó, Santa Catarina.",
    highlights: ["Chapecó"],
    location: "Chapecó",
    side: "right",
  },
  {
    id: "2021-inauguracao-sede",
    year: 2021,
    chapter: "expansao",
    description: "Inauguração da nova sede da empresa, com 5.500 m² de área construída.",
    highlights: ["5.500 m²"],
    /* Sem imagem: ver "prédios gerados" no cabeçalho deste arquivo. */
    location: "São José",
    areaSqm: 5500,
    growthMilestone: true,
    side: "left",
  },
  {
    id: "2021-segunda-prensa-1100",
    year: 2021,
    chapter: "expansao",
    description: "Instalação da segunda prensa para fardos de 1.100 kg.",
    highlights: ["1.100 kg"],
    side: "right",
  },
  {
    id: "2022-saturno",
    year: 2022,
    chapter: "expansao",
    description: "Aquisição da empresa Saturno, em Blumenau, fortalecendo a presença regional.",
    highlights: ["Saturno", "Blumenau"],
    /* Sem imagem: ver "prédios gerados" no cabeçalho deste arquivo. Este
       era o caso mais grave — uma operação gerada fazendo as vezes da
       instalação real da Saturno em Blumenau. */
    location: "Blumenau",
    side: "left",
  },
  {
    id: "2023-araquari",
    year: 2023,
    chapter: "expansao",
    description: "Início das operações da unidade de Araquari, Santa Catarina.",
    highlights: ["Araquari"],
    location: "Araquari",
    side: "right",
  },
  {
    id: "2024-nsc",
    year: 2024,
    chapter: "expansao",
    description: "Aquisição da empresa NSC, em Joinville, Santa Catarina.",
    highlights: ["NSC", "Joinville"],
    location: "Joinville",
    side: "left",
  },

  // ---------------- NOVO CICLO (2025–2026) ----------------
  {
    id: "2025-terreno-araquari",
    year: 2025,
    chapter: "novo-ciclo",
    description: "Aquisição de um terreno de 10.000 m² em Araquari, preparando a expansão da unidade.",
    highlights: ["10.000 m²", "Araquari"],
    location: "Araquari",
    side: "right",
  },
  {
    id: "2025-terreno-chapeco",
    year: 2025,
    chapter: "novo-ciclo",
    description: "Aquisição de um terreno de 10.000 m² em Chapecó, visando futuras ampliações.",
    highlights: ["10.000 m²", "Chapecó"],
    location: "Chapecó",
    side: "left",
  },
  {
    id: "2026-araquari-inauguracao",
    year: 2026,
    chapter: "novo-ciclo",
    description: "Inauguração da nova unidade de Araquari, com 3.000 m² de área construída.",
    highlights: ["3.000 m²"],
    /* Sem imagem: ver "prédios gerados" no cabeçalho deste arquivo. O peso
       visual deste marco vem de `monumental`, não da fotografia. */
    location: "Araquari",
    areaSqm: 3000,
    side: "right",
    monumental: true,
  },
];

/** Seis marcos de área construída (Seção 9) — lidos a partir dos próprios
 *  eventos acima (nenhum número duplicado à mão). */
export const GROWTH_SCALE = TIMELINE_EVENTS.filter((event) => event.growthMilestone).map((event) => ({
  year: event.year,
  sqm: event.areaSqm as number,
}));

/** Cidades do mapa de expansão (Seção 11), na ordem cronológica em que o
 *  grupo chega em cada uma — usada também para o atraso escalonado da
 *  animação de entrada dos pontos. */
export const MAP_LOCATIONS: Array<{ name: string; year: number; x: number; y: number }> = [
  { name: "São José", year: 1985, x: 34, y: 78 },
  { name: "Blumenau", year: 1990, x: 46, y: 58 },
  { name: "Chapecó", year: 2020, x: 10, y: 34 },
  { name: "Araquari", year: 2023, x: 52, y: 16 },
  { name: "Joinville", year: 2024, x: 58, y: 22 },
];

export const HERO_IMAGE = img("/historia/hero-1985.webp", "Reconstituição de pequeno galpão industrial no Sul do Brasil nos anos 1980, com prensa vertical e veículo utilitário estacionado ao lado, fotografia documental em preto e branco");

export const EPILOGUE_STATS = [
  { value: "40+", label: "anos de história" },
  { value: "5", label: "unidades" },
  { value: "5.500 m²", label: "na sede de São José" },
  { value: "3.000 m²", label: "na nova unidade de Araquari" },
];
