/**
 * ============================================================
 * MATERIALIDADE — terceira camada da regra de imagem do site
 * ============================================================
 *
 * O site já tinha duas camadas declaradas (ver lib/media.ts e
 * AGENT_RULES_SITE.md):
 *
 *   REALIDADE   — quando mostramos a empresa. Só acervo real.
 *   ABSTRAÇÃO   — quando explicamos uma ideia.
 *
 * Esta rodada acrescenta a terceira:
 *
 *   MATERIALIDADE — quando queremos criar identidade visual.
 *
 * Uma superfície material NÃO afirma "esta é uma instalação do Grupo
 * Almeida". Ela é matéria editorial: macro de papelão, fibra de papel,
 * metal usinado, plástico triturado, superfície prensada. Por isso pode
 * ser gerada por IA legitimamente — não há fato sendo afirmado, e nenhuma
 * dessas imagens recebe legenda de registro documental.
 *
 * Consequência prática, e é ela que separa esta camada das outras duas:
 * uma superfície material nunca leva IllustrativeBadge. O badge existe
 * para avisar que uma CENA é uma visualização ilustrativa e não uma
 * fotografia da operação. Uma textura de papelão não representa cena
 * nenhuma — marcá-la sugeriria que alguém poderia confundi-la com o
 * registro de um lugar.
 *
 * ------------------------------------------------------------
 * SÍMBOLO NUNCA VEM DENTRO DA IMAGEM
 * ------------------------------------------------------------
 * A imagem gerada é SOMENTE matéria. O símbolo oficial entra por cima,
 * como SVG, via MaterialSurface — nunca desenhado pela IA, nunca
 * rasterizado, nunca "logo gerada". Assim a geometria permanece fiel ao
 * arquivo oficial, a opacidade e a posição continuam ajustáveis, a
 * variante clara/escura pode ser trocada e o mesmo asset é reutilizado
 * em qualquer superfície.
 *
 * ------------------------------------------------------------
 * ESTADO ATUAL DOS ASSETS
 * ------------------------------------------------------------
 * Gerados via Magnific/MCP (rodada "materialidade-assets-finais", branch
 * feature/materialidade-assets-finais) e otimizados para WebP em
 * public/materialidade/. Os prompts abaixo continuam sendo a fonte da
 * verdade do que foi pedido a cada geração — nenhum deles foi resumido ou
 * descaracterizado para a geração final; a única exceção documentada é o
 * par de `material-atlas`, cujo texto abaixo teve "PET material" e "clear
 * glass texture" removidos porque vidro não está na lista real de
 * materiais (lib/materials.ts) e a Seção 6 da rodada proíbe enriquecer a
 * imagem com um material que não existe nos dados. O prompt efetivamente
 * enviado ao gerador para esse par (após duas rejeições por vidro/símbolo
 * de reciclagem/celular) descreve um "material specification board" sem a
 * palavra "recyclable" repetida — ver o relatório da rodada para o texto
 * exato de cada tentativa.
 */

/** Superfície cromática de base — casa com os tons já existentes em globals.css. */
export type MaterialTone = "forest" | "carvao" | "saturno" | "stoneAlt";

/**
 * Quanto da textura atravessa o véu cromático.
 *
 * `soft` mantém a superfície quase sólida (a matéria só se insinua nas
 * bordas), `strong` deixa a matéria dominar. Em qualquer intensidade o
 * véu é calculado para que o texto por cima continue legível — ver
 * MaterialSurface.module.css, onde cada nível tem o alfa mínimo do véu
 * fixado junto com a superfície, não escolhido caso a caso.
 */
export type MaterialIntensity = "soft" | "medium" | "strong";

export type MaterialSymbol = {
  /**
   * Variante do arquivo oficial do SÍMBOLO ISOLADO em public/brand/ —
   * nunca redesenhado, nunca rasterizado, nunca gerado.
   *
   * Não existe campo `brand` aqui de propósito: BrandBoundaryMark.tsx já
   * verificou que o bloco de símbolo dentro das quatro assinaturas
   * oficiais (public/brand/logos/*.svg) é byte-a-byte o mesmo desenho, ou
   * seja, "o símbolo da Saturno" e "o símbolo do Grupo" são oficialmente
   * a mesma peça. Um campo de marca aqui sugeriria uma escolha de arquivo
   * que não existe — o que muda entre superfícies é só a variante
   * clara/colorida, e essa depende do tom, não da empresa.
   */
  variant: "white" | "color";
  side: "left" | "right";
  /** Largura do símbolo como fração da largura da superfície. */
  scale: number;
  /**
   * Corte deliberado: fração da própria altura que o símbolo extrapola
   * para fora da superfície. É o que faz a peça atravessar a mudança de
   * superfície em vez de ficar centrada como um carimbo.
   */
  bleed: number;
};

export type MaterialSurfaceAsset = {
  id: string;
  /** null enquanto o asset não existir no repositório. Ver cabeçalho. */
  desktop: string | null;
  mobile: string | null;
  tone: MaterialTone;
  intensity: MaterialIntensity;
  symbol?: MaterialSymbol;
  /** Onde esta superfície é usada — documentação, não texto de interface. */
  usage: string;
  /** Proporção de cada composição. Mobile NÃO é recorte do desktop. */
  ratio: { desktop: string; mobile: string };
  /** Dimensão alvo em px, para gerar e otimizar sem adivinhar. */
  size: { desktop: [number, number]; mobile: [number, number] };
  /** Prompt exato de cada composição — fonte da verdade para (re)gerar. */
  prompt: { desktop: string; mobile: string };
};

export type MaterialSurfaceId = "ambiental-materia" | "saturno-hero" | "saturno-fluxo";

export const MATERIAL_SURFACES: Record<MaterialSurfaceId, MaterialSurfaceAsset> = {
  "ambiental-materia": {
    id: "ambiental-materia",
    desktop: "/materialidade/ambiental-materia-desktop.webp",
    mobile: "/materialidade/ambiental-materia-mobile.webp",
    tone: "forest",
    intensity: "medium",
    /* Sem símbolo aqui, e a razão vale como regra — UM SÍMBOLO POR
       SUPERFÍCIE. Esta dobra já hospeda a metade de saída da fronteira
       "ambiental-equipamentos", ou seja, o símbolo oficial já atravessa a
       borda dela. Um segundo símbolo, maior e por trás, não reforça a
       assinatura: some com ela. Ampliado a meia largura da dobra, o
       desenho perde a leitura de marca e as curvas passam a ler como
       formas orgânicas soltas — exatamente o vocabulário que a rodada
       mandou não copiar da referência botânica.

       A materialidade continua entregando o princípio da Seção 4 (símbolo
       grande, baixa opacidade, cortado, atravessando a mudança de
       superfície): quem faz isso é BrandBoundaryMark, que é literalmente
       um símbolo cortado pela troca de superfície. Reservar `symbol` para
       superfícies materiais SEM fronteira. */
    usage:
      "Home, dobra 3 (Almeida Ambiental / capacidade operacional) — a dobra que hospeda o Process Ribbon. A dobra 2 permanece sólida, para que a materialidade seja alternância e não fundo padrão.",
    ratio: { desktop: "16:9", mobile: "4:5" },
    size: { desktop: [1920, 1080], mobile: [1080, 1350] },
    prompt: {
      desktop:
        "Editorial macro material photography of recyclable industrial materials arranged as a sophisticated abstract surface, compressed corrugated cardboard fibers, layered kraft paper edges, clean shredded polymer fragments, subtle steel mesh and matte processed material textures, deep forest green and charcoal color treatment with natural warm kraft undertones, realistic tactile fibers, compression marks, subtle depth, controlled directional studio lighting, premium contemporary industrial editorial aesthetic, strong shadow areas and large negative space for typography, visually dense material mainly toward the right and lower part of the composition, cinematic wide 16:9 framing, no factory, no people, no trucks, no machines, no logos, no text, no leaves, no plants, no recycling symbol, no globe, no eco clichés, no glossy luxury objects, no gold rings",
      mobile:
        "Vertical editorial macro material photography of transformed recyclable materials, deep layers of corrugated cardboard fibers, kraft paper, clean shredded polymer fragments and subtle metal texture, realistic tactile surfaces, compression marks, deep forest green and charcoal treatment with warm natural kraft undertones, sophisticated industrial editorial mood, directional soft light, material concentrated through the lower and side areas with negative space available for interface content, portrait 4:5, no factory, no people, no vehicles, no machinery, no logos, no text, no leaves, no plants, no recycling icon, no globe, no eco cliché, no luxury pedestal",
    },
  },

  "saturno-hero": {
    id: "saturno-hero",
    desktop: "/materialidade/saturno-hero-desktop.webp",
    mobile: "/materialidade/saturno-hero-mobile.webp",
    tone: "saturno",
    intensity: "medium",
    /* Sem símbolo — mesma regra de "ambiental-materia" acima. As duas
       dobras que usam esta superfície (dobra 6 da Home e Hero de
       /saturno-ambiental) já ancoram uma metade de fronteira. */
    usage:
      "Home, dobra 6 (Saturno / presença regional) e Hero de /saturno-ambiental. É a materialidade que substitui a fotografia de sede que a Saturno não tem — matéria, não endereço.",
    ratio: { desktop: "16:9", mobile: "4:5" },
    size: { desktop: [1920, 1080], mobile: [1080, 1350] },
    /* Prompt abaixo é a versão que efetivamente gerou o par publicado —
       não a primeira tentativa. As duas primeiras rodadas usavam "warm
       stone" como palavra de cor de paleta e o gerador leu "stone" ao pé
       da letra (uma pedra real apareceu na composição); a versão mobile
       também trouxe uma aliança de ouro dentro do rolo de papelão, na
       cara do "no gold rings" do negativo. Ver relatório da rodada
       "materialidade-assets-finais" para as tentativas rejeitadas. */
    prompt: {
      desktop:
        "Editorial material study of recyclable industrial materials transformed into an abstract landscape, compressed corrugated cardboard fibers, layered paper pulp textures, shredded clean paper edges and subtle recycled polymer fragments arranged in a controlled geometric composition on a plain seamless surface, tactile raw fibers, compression lines and cartonage materiality, directional flowing arrangement of material rather than icons or symbols, deep dark brand background balanced with natural kraft cardboard and warm neutral sand tones, restrained Saturno palette, sophisticated contemporary industrial sustainability aesthetic, realistic macro material photography, directional soft studio light, rich texture, strong depth, calm premium institutional mood, generous negative space for typography, wide 16:9 composition, only paper and cardboard based materials, no leaves, no plants, no recycling symbol, no factory, no building, no workers, no vehicles, no logos, no text, no lettering, no typography, no brand name, no fake environmental facility, no glossy luxury objects, no jewelry, no ring, no gold, no gemstone, no pedestal, no stone, no rock, no pebble, no marble, no mineral",
      mobile:
        "Vertical editorial macro material landscape made of transformed paper and recyclable materials, compressed cardboard edges, paper fibers, cartonage textures, subtle clean shredded recycled fragments and matte industrial surfaces flowing through the composition, realistic tactile fibers and compression marks, dark restrained Saturno palette balanced with warm kraft and sand neutral tones, directional flowing arrangement of material suggesting transformation, sophisticated institutional industrial aesthetic, soft directional studio lighting, strong vertical depth, focal material toward lower and side areas with negative space for typography, portrait 4:5, no leaves, no plants, no recycling icon, no building, no factory, no workers, no vehicles, no logos, no text, no lettering, no typography, no brand name, no glossy luxury styling, no jewelry, no ring, no gold, no gemstone, no pedestal, no stone, no rock, no marble",
    },
  },

  "saturno-fluxo": {
    id: "saturno-fluxo",
    desktop: "/materialidade/saturno-fluxo.webp",
    mobile: "/materialidade/saturno-fluxo.webp", // mesma peça, 4:3
    tone: "carvao",
    intensity: "strong",
    usage:
      "/saturno-ambiental, capítulo de fechamento \"Saturno + Grupo Almeida\", e Home, dobra 7 (Saturno / atuação) — reaproveitada nesta rodada como a peça editorial legítima que substitui saturno-fardos.webp (ver Seção 9 da rodada). Na Home entra como imagem emoldurada (SectionMedia), não como MaterialSurface de fundo.",
    ratio: { desktop: "4:3", mobile: "4:3" },
    size: { desktop: [1600, 1200], mobile: [1600, 1200] },
    /* Mesma correção de "stone"/texto da nota acima: a primeira geração
       trouxe uma pedra de mármore no canto e o texto "Satur..." impresso
       em rasterização, apesar do negativo original já pedir "no text". */
    prompt: {
      desktop:
        "Extreme close-up editorial photography of processed recyclable material surfaces, geometric layers of compressed paper fiber, corrugated cardboard, cartonage edges, shredded clean paper and subtle recyclable fragments forming a directional abstract flow, tactile real material detail, carefully organized rather than chaotic, matte surfaces, deep shadows, restrained institutional palette derived from charcoal, natural kraft and warm neutral sand tones, contemporary Swiss editorial composition, strong geometry and negative space, no location, no building, no people, no vehicles, no machines, no leaves, no globe, no recycling symbols, no text, no lettering, no typography, no logos, no brand name, no signage, no luxury pedestal, no gold, no jewelry, no ring, no gemstone, no stone, no rock, no marble",
      mobile:
        "Extreme close-up editorial photography of processed recyclable material surfaces, geometric layers of compressed paper fiber, corrugated cardboard, cartonage edges, shredded clean paper and subtle recyclable fragments forming a directional abstract flow, tactile real material detail, carefully organized rather than chaotic, matte surfaces, deep shadows, restrained institutional palette derived from charcoal, natural kraft and warm neutral sand tones, contemporary Swiss editorial composition, strong geometry and negative space, no location, no building, no people, no vehicles, no machines, no leaves, no globe, no recycling symbols, no text, no lettering, no typography, no logos, no brand name, no signage, no luxury pedestal, no gold, no jewelry, no ring, no gemstone, no stone, no rock, no marble",
    },
  },
};

/**
 * ============================================================
 * IMAGENS MATERIAIS — matéria como OBJETO editorial, não como superfície
 * ============================================================
 *
 * A diferença em relação a MATERIAL_SURFACES importa e é o que decide
 * onde cada asset pode ser usado:
 *
 *   MaterialSurface  é FUNDO. Entra em luminosity sob um véu do tom da
 *                    seção, recebe o símbolo por cima e nunca pode
 *                    aparecer sobre uma superfície de tom diferente do
 *                    seu — o véu precisa ser da mesma cor do fundo.
 *
 *   MaterialImage    é PEÇA. Ocupa um slot de imagem da composição, com
 *                    a sua própria moldura, e por isso funciona sobre
 *                    qualquer superfície: uma macro de aço escura é um
 *                    ótimo objeto editorial sobre pedra clara, e seria
 *                    um péssimo véu de fundo dela.
 *
 * Foi exatamente esse o caso da engenharia da Almeida Equipamentos: a
 * dobra dela na Home é pedra clara, e a Seção 5 da rodada pede a macro
 * "como grande elemento editorial" — peça, não fundo. Transformá-la em
 * superfície obrigaria a escurecer a dobra inteira e desmontaria o corte
 * sólido de território entre as empresas, que a rodada pediu para
 * preservar.
 *
 * Pares gerados nesta rodada (ver cabeçalho do arquivo). MaterialAtlas.tsx
 * e HomePage.tsx já leem `desktop`/`mobile` primeiro e só caem para
 * `interimImage`/IMG_EQUIPAMENTOS_ENGENHARIA quando o par está ausente —
 * nenhuma mudança de código foi necessária nesses consumidores.
 */

export type MaterialImageAsset = {
  desktop: string | null;
  mobile: string | null;
  alt: string;
  ratio: { desktop: string; mobile: string };
  size: { desktop: [number, number]; mobile: [number, number] };
  prompt: { desktop: string; mobile: string };
};

export type MaterialImageId = "material-atlas" | "equipamentos-engenharia";

export const MATERIAL_IMAGES: Record<MaterialImageId, MaterialImageAsset> = {
  "material-atlas": {
    desktop: "/materialidade/material-atlas-desktop.webp",
    mobile: "/materialidade/material-atlas-mobile.webp",
    alt: "Composição editorial vista de cima com as famílias de material recicláveis trabalhadas pelo Grupo Almeida: papelão, papel, plásticos, metais, madeira e demais categorias organizadas em zonas distintas",
    ratio: { desktop: "3:2", mobile: "4:5" },
    size: { desktop: [1800, 1200], mobile: [1080, 1350] },
    /* Único par gerado com modelo diferente (imagen-nano-banana-2 em vez
       de seedream-4-5): o modelo padrão da rodada ignorava os negativos e
       inseria vidro, símbolo de reciclagem, lajes de pedra e até um
       smartphone/tabela nutricional legível, mesmo com "no glass"/"no
       recycling symbol"/"no text" explícitos — cinco gerações rejeitadas
       ao todo (ver relatório da rodada). O prompt abaixo é a versão final
       que passou no gate: descreve um "material specification board" sem
       repetir a palavra "recyclable" (gatilho aparente dos clichês) e
       nomeia só famílias compatíveis com CORE_MATERIALS (lib/materials.ts)
       — sem vidro, sem PET nomeado, sem pedra. */
    prompt: {
      desktop:
        "Overhead flat-lay editorial material specification board for an industrial recycling company, arranged on a solid deep forest green surface: a stack of plain kraft paper sheets, a sheet of corrugated cardboard, a small stack of colored printed paper offcuts, a folded stack of blank newsprint sheets with soft grey printed texture and no legible headlines, an open corrugated cardboard box, a pile of clean clear and colored plastic sheet fragments, a few flattened laminated carton (Tetra Pak style) fragments, a small stack of wood offcuts, a brushed aluminum sheet, a few pieces of scrap iron and steel, each material in its own clean zone with visible gaps between zones, realistic industrial material textures, soft directional studio lighting, subtle shadows, restrained palette of deep forest green, graphite grey and warm kraft, editorial Swiss design sensibility, sample board / material library aesthetic, 3:2 composition, no recycling symbol or arrows icon, no text, no legible words, no logos, no people, no factory, no garbage pile, no dirty waste, no plants, no leaves, no glass, no stone, no rock, no marble, no concrete slab, no ceramic, no phone, no smartphone, no electronic device, no screen",
      mobile:
        "Vertical overhead flat-lay editorial material specification board for an industrial recycling company on a solid deep forest green surface, arranged as a clean 3x3 grid of material samples with visible gaps between cells: kraft paper sheets, folded blank newsprint sheets with soft grey texture and no legible headlines, wood offcuts, colored printed paper offcuts with corrugated cardboard (abstract color blocks, no legible text), a small pile of folded opaque and semi-transparent colored plastic packaging offcuts with soft rounded edges (no sharp broken edges, not glass-like), a brushed aluminum sheet, more blank newsprint, flattened plain laminated carton (Tetra Pak style) fragments in muted solid colors with no printed labels or text, scrap iron and steel pieces, realistic industrial material textures, soft directional studio lighting, restrained palette of deep forest green, graphite grey and warm kraft, editorial Swiss design sensibility, sample board aesthetic, portrait 4:5, no recycling symbol or arrows icon, no text, no legible words, no nutrition label, no barcode, no product packaging text, no logos, no people, no factory, no garbage pile, no dirty waste, no plants, no leaves, no glass, no broken glass, no glass shards, no stone, no rock, no marble, no concrete, no ceramic, no phone, no smartphone, no electronic device, no screen",
    },
  },

  "equipamentos-engenharia": {
    desktop: "/materialidade/equipamentos-engenharia-desktop.webp",
    mobile: "/materialidade/equipamentos-engenharia-mobile.webp",
    alt: "Macro editorial de engenharia industrial pesada: componentes de aço forjado, detalhes hidráulicos e geometria usinada em aço grafite",
    ratio: { desktop: "16:9", mobile: "4:5" },
    size: { desktop: [1920, 1080], mobile: [1080, 1350] },
    prompt: {
      desktop:
        "Extreme close-up editorial macro photography of heavy industrial mechanical engineering, precision forged steel components, part of a compression screw shaft, hydraulic piston details, machined gear teeth and structural fasteners arranged as an abstract mechanical composition, brushed dark steel, graphite metal, matte industrial surfaces, subtle dark olive reflections, extremely clean precision engineering, dramatic controlled studio rim light, deep charcoal shadows, tactile material detail, sophisticated European industrial design language, premium technical editorial photography, strong negative space on the left for typography, wide cinematic composition, 16:9, realistic materials, no full machine visible, no factory environment, no people, no logos, no text, no futuristic science fiction, no chrome luxury aesthetic, no gold, no steampunk, no dirt, no smoke",
      mobile:
        "Editorial macro photography of precision heavy industrial engineering, large forged steel compression component and hydraulic mechanical details emerging from deep charcoal shadow, brushed graphite steel, machined edges and gear geometry, subtle dark olive reflections, controlled studio rim lighting, tactile realistic metal, sophisticated technical editorial image, strong vertical composition with the mechanical focal point concentrated in the middle and lower third, generous dark negative space around the subject for interface content, 4:5 portrait, no full machine, no factory, no people, no logos, no text, no science fiction, no steampunk, no shiny luxury chrome, no gold, no smoke",
    },
  },
};
