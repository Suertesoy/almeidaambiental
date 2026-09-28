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

/**
 * Abertura de /historia. A imagem é uma RECONSTITUIÇÃO gerada, não um
 * registro do acervo — não existe fotografia de 1985 do Grupo Almeida no
 * material aprovado.
 *
 * A tela já dizia isso (IllustrativeBadge no canto do Hero, ver
 * components/historia/HeroDecades.tsx), mas o texto alternativo ainda
 * terminava em "fotografia documental em preto e branco": quem navega por
 * leitor de tela — exatamente quem não vê o selo — ouvia a imagem se
 * apresentar como documento. "Fotografia documental" descrevia o estilo
 * da imagem e era lido como a natureza dela.
 *
 * O preto e branco continua descrito, porque é informação visual real; o
 * que saiu foi a palavra que transformava uma reconstituição em registro
 * histórico (Seção 22 da rodada de materialidade).
 */
export const HERO_IMAGE = img("/historia/hero-1985.webp", "Reconstituição ilustrativa de um pequeno galpão industrial no Sul do Brasil nos anos 1980, com prensa vertical e veículo utilitário estacionado ao lado, em preto e branco");

export const EPILOGUE_STATS = [
  { value: "40+", label: "anos de história" },
  { value: "5", label: "unidades" },
  { value: "5.500 m²", label: "na sede de São José" },
  { value: "3.000 m²", label: "na nova unidade de Araquari" },
];

/* ==========================================================
   VERSÃO EM INGLÊS — mesma cronologia, mesmas datas/números/cidades. Ver
   lib/i18n/locale.ts. GROWTH_SCALE e MAP_LOCATIONS não têm par em inglês:
   são só números e nomes próprios, formatados por locale no componente
   (ver components/historia/GrowthScale.tsx).
   ========================================================== */

export const CHAPTER_META_EN: Record<
  Chapter,
  { index: string; eyebrow: string; headline: string; tone: "stone" | "stoneAlt" | "forest" }
> = {
  origem: {
    index: "01",
    eyebrow: "Origins",
    headline: "The first steps of a story built year after year.",
    tone: "stone",
  },
  evolucao: {
    index: "02",
    eyebrow: "Evolution",
    headline: "Growing also meant transforming the way we operate.",
    tone: "stoneAlt",
  },
  expansao: {
    index: "03",
    eyebrow: "Expansion",
    headline: "From a single operation in São José to a growing presence across Santa Catarina.",
    tone: "stone",
  },
  "novo-ciclo": {
    index: "04",
    eyebrow: "New Cycle",
    headline: "Four decades later, the story keeps being written.",
    tone: "stoneAlt",
  },
};

export const TIMELINE_EVENTS_EN: TimelineEvent[] = [
  {
    id: "1985-fundacao",
    year: 1985,
    dateLabel: "September 1985",
    chapter: "origem",
    description:
      "Almeida is founded in São José, Santa Catarina, starting out of a 300 m² warehouse with one vertical press and one gas-powered Willys pickup truck.",
    highlights: ["300 m²", "one vertical press", "one gas-powered Willys pickup truck"],
    location: "São José",
    areaSqm: 300,
    growthMilestone: true,
    side: "right",
  },
  {
    id: "1986-frota-prensa",
    year: 1986,
    chapter: "origem",
    description: "Almeida adds its first Mercedes-Benz 608 truck and installs a second vertical press.",
    highlights: ["Mercedes-Benz 608", "second vertical press"],
    image: img(
      "/historia/expansao-logistica-1988.webp",
      "Illustrative reconstruction of a late-1980s cargo truck, representing the expansion of Almeida's fleet"
    ),
    side: "left",
  },
  {
    id: "1987-frota",
    year: 1987,
    chapter: "origem",
    description: "The fleet grows with a new Volkswagen 6.90.",
    highlights: ["Volkswagen 6.90"],
    side: "right",
  },
  {
    id: "1990-ampliacao-sao-jose",
    year: 1990,
    chapter: "origem",
    description: "The São José unit grows to 500 m².",
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
    description: "Almeida opens a unit in Blumenau, Santa Catarina.",
    highlights: ["Blumenau"],
    location: "Blumenau",
    side: "left",
  },
  {
    id: "1993-prensa-horizontal",
    year: 1993,
    chapter: "origem",
    description: "Almeida installs its first horizontal baler, producing 400 kg bales.",
    highlights: ["first horizontal baler", "400 kg"],
    image: img(
      "/historia/prensa-fardos-1993.webp",
      "Illustrative reconstruction of an industrial horizontal baler and compacted cardboard bales, 1990s"
    ),
    side: "right",
  },

  {
    id: "1997-roll-on-roll-off",
    year: 1997,
    chapter: "evolucao",
    description: "Almeida adds its first Roll On/Roll Off truck, expanding logistics capacity.",
    highlights: ["Roll On/Roll Off"],
    side: "left",
  },
  {
    id: "1998-triturador",
    year: 1998,
    chapter: "evolucao",
    description: "Almeida installs its first shredder, increasing material processing capacity.",
    highlights: ["first shredder"],
    image: img(
      "/historia/triturador-2000.webp",
      "Illustrative reconstruction of an industrial shredder and recyclable-material processing lines"
    ),
    side: "right",
  },
  {
    id: "1999-novo-galpao",
    year: 1999,
    chapter: "evolucao",
    description: "Almeida builds a new 2,500 m² warehouse.",
    highlights: ["2,500 m²"],
    areaSqm: 2500,
    growthMilestone: true,
    side: "left",
  },
  {
    id: "2001-prensa-importada",
    year: 2001,
    chapter: "evolucao",
    description: "Almeida installs its first imported horizontal baler, producing 800 kg bales.",
    highlights: ["first imported horizontal baler", "800 kg"],
    side: "right",
  },
  {
    id: "2004-ampliacao",
    year: 2004,
    chapter: "evolucao",
    description: "The industrial structure grows to 3,100 m².",
    highlights: ["3,100 m²"],
    areaSqm: 3100,
    growthMilestone: true,
    side: "left",
  },
  {
    id: "2005-segunda-prensa-800",
    year: 2005,
    chapter: "evolucao",
    description: "Almeida installs a second baler for 800 kg bales.",
    highlights: ["800 kg"],
    side: "right",
  },
  {
    id: "2009-prensa-1100",
    year: 2009,
    chapter: "evolucao",
    description: "Almeida installs a new imported baler, producing 1,100 kg bales.",
    highlights: ["1,100 kg"],
    side: "left",
  },
  {
    id: "2010-ampliacao-3500",
    year: 2010,
    chapter: "evolucao",
    description: "The unit expands again, reaching a total built area of 3,500 m².",
    highlights: ["3,500 m²"],
    areaSqm: 3500,
    growthMilestone: true,
    side: "right",
  },
  {
    id: "2012-compactador-pottinger",
    year: 2012,
    chapter: "evolucao",
    description:
      "Almeida installs its first imported screw-type waste compactor, marking the start of its partnership with Pöttinger.",
    highlights: ["imported screw-type waste compactor", "Pöttinger"],
    image: img(
      "/historia/tecnologia-2013.webp",
      "Illustrative reconstruction of an imported industrial compactor, representing the technological modernization of the early 2010s"
    ),
    side: "left",
  },
  {
    id: "2013-prensas-austropressen",
    year: 2013,
    chapter: "evolucao",
    description:
      "Almeida installs its first two-chamber balers, increasing operational efficiency and marking the start of its partnership with Austropressen.",
    highlights: ["two-chamber balers", "Austropressen"],
    side: "right",
  },
  {
    id: "2016-terreno-nova-sede",
    year: 2016,
    chapter: "evolucao",
    description: "Almeida acquires a 10,000 m² plot of land for its new headquarters.",
    highlights: ["10,000 m²"],
    side: "left",
  },

  {
    id: "2020-chapeco",
    year: 2020,
    chapter: "expansao",
    description: "Almeida opens operations in Chapecó, Santa Catarina.",
    highlights: ["Chapecó"],
    location: "Chapecó",
    side: "right",
  },
  {
    id: "2021-inauguracao-sede",
    year: 2021,
    chapter: "expansao",
    description: "Almeida opens its new headquarters, with 5,500 m² of built area.",
    highlights: ["5,500 m²"],
    location: "São José",
    areaSqm: 5500,
    growthMilestone: true,
    side: "left",
  },
  {
    id: "2021-segunda-prensa-1100",
    year: 2021,
    chapter: "expansao",
    description: "Almeida installs a second baler for 1,100 kg bales.",
    highlights: ["1,100 kg"],
    side: "right",
  },
  {
    id: "2022-saturno",
    year: 2022,
    chapter: "expansao",
    description: "Almeida acquires Saturno, in Blumenau, strengthening the group's regional presence.",
    highlights: ["Saturno", "Blumenau"],
    location: "Blumenau",
    side: "left",
  },
  {
    id: "2023-araquari",
    year: 2023,
    chapter: "expansao",
    description: "Almeida opens the Araquari unit, Santa Catarina.",
    highlights: ["Araquari"],
    location: "Araquari",
    side: "right",
  },
  {
    id: "2024-nsc",
    year: 2024,
    chapter: "expansao",
    description: "Almeida acquires NSC, in Joinville, Santa Catarina.",
    highlights: ["NSC", "Joinville"],
    location: "Joinville",
    side: "left",
  },

  {
    id: "2025-terreno-araquari",
    year: 2025,
    chapter: "novo-ciclo",
    description: "Almeida acquires a 10,000 m² plot of land in Araquari, preparing the unit's expansion.",
    highlights: ["10,000 m²", "Araquari"],
    location: "Araquari",
    side: "right",
  },
  {
    id: "2025-terreno-chapeco",
    year: 2025,
    chapter: "novo-ciclo",
    description: "Almeida acquires a 10,000 m² plot of land in Chapecó for future expansion.",
    highlights: ["10,000 m²", "Chapecó"],
    location: "Chapecó",
    side: "left",
  },
  {
    id: "2026-araquari-inauguracao",
    year: 2026,
    chapter: "novo-ciclo",
    description: "Almeida opens its new Araquari unit, with 3,000 m² of built area.",
    highlights: ["3,000 m²"],
    location: "Araquari",
    areaSqm: 3000,
    side: "right",
    monumental: true,
  },
];

export const HERO_IMAGE_EN = img(
  "/historia/hero-1985.webp",
  "Illustrative reconstruction of a small industrial warehouse in southern Brazil in the 1980s, with a vertical press and a utility vehicle parked alongside, in black and white"
);

export const EPILOGUE_STATS_EN = [
  { value: "40+", label: "years of history" },
  { value: "5", label: "units" },
  { value: "5,500 m²", label: "at the São José headquarters" },
  { value: "3,000 m²", label: "at the new Araquari unit" },
];
