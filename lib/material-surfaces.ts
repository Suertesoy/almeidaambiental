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
 * ESTADO ATUAL DOS ASSETS — LEIA ANTES DE MEXER
 * ------------------------------------------------------------
 * `desktop` e `mobile` estão `null` em todas as superfícies porque o
 * conector MCP do Magnific está BLOQUEADO por OAuth e nenhuma imagem foi
 * gerada nesta rodada.
 *
 * Nada foi substituído por stock, por imagem de banco ou por outro
 * arquivo já existente no repositório: uma textura emprestada de outra
 * seção seria exatamente o tipo de preenchimento que esta rodada existe
 * para eliminar. Enquanto o par de arquivos não existir, MaterialSurface
 * renderiza a superfície sólida + símbolo e mais nada — a composição
 * continua íntegra, apenas sem a camada material.
 *
 * Para concluir: gerar os pares com os prompts abaixo (eles são a fonte
 * da verdade dos prompts, não um resumo), otimizar para WebP nas
 * dimensões indicadas, salvar nos caminhos indicados e trocar `null`
 * pelos caminhos. Nenhuma outra mudança de código é necessária — os
 * pontos de âncora na Home, na Saturno e na Almeida Ambiental já estão
 * montados e passam a exibir a textura sozinhos.
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
    desktop: null, // → /materialidade/ambiental-materia-desktop.webp
    mobile: null, //  → /materialidade/ambiental-materia-mobile.webp
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
    desktop: null, // → /materialidade/saturno-hero-desktop.webp
    mobile: null, //  → /materialidade/saturno-hero-mobile.webp
    tone: "saturno",
    intensity: "medium",
    /* Sem símbolo — mesma regra de "ambiental-materia" acima. As duas
       dobras que usam esta superfície (dobra 6 da Home e Hero de
       /saturno-ambiental) já ancoram uma metade de fronteira. */
    usage:
      "Home, dobra 6 (Saturno / presença regional) e Hero de /saturno-ambiental. É a materialidade que substitui a fotografia de sede que a Saturno não tem — matéria, não endereço.",
    ratio: { desktop: "16:9", mobile: "4:5" },
    size: { desktop: [1920, 1080], mobile: [1080, 1350] },
    prompt: {
      desktop:
        "Editorial material study of recyclable industrial materials transformed into an abstract landscape, compressed corrugated cardboard fibers, layered paper pulp textures, shredded clean paper edges and subtle recycled polymer fragments arranged in a controlled geometric composition, tactile raw fibers, compression lines and cartonage materiality, subtle circular flow suggested by material arrangement rather than icons, deep dark brand background balanced with natural kraft cardboard, warm stone and restrained Saturno tones, sophisticated contemporary industrial sustainability aesthetic, realistic macro material photography, directional soft studio light, rich texture, strong depth, calm premium institutional mood, generous negative space for typography, wide 16:9 composition, no leaves, no plants, no recycling symbol, no factory, no building, no workers, no vehicles, no logos, no text, no fake environmental facility, no glossy luxury objects, no golden rings",
      mobile:
        "Vertical editorial macro material landscape made of transformed paper and recyclable materials, compressed cardboard edges, paper fibers, cartonage textures, subtle clean shredded recycled fragments and matte industrial surfaces flowing through the composition, realistic tactile fibers and compression marks, dark restrained Saturno palette balanced with warm kraft and stone tones, subtle sense of circular transformation created through the arrangement of material, sophisticated institutional industrial aesthetic, soft directional studio lighting, strong vertical depth, focal material toward lower and side areas with negative space for typography, portrait 4:5, no leaves, no plants, no recycling icon, no building, no factory, no workers, no vehicles, no logos, no text, no glossy luxury styling, no gold rings",
    },
  },

  "saturno-fluxo": {
    id: "saturno-fluxo",
    desktop: null, // → /materialidade/saturno-fluxo.webp
    mobile: null, //  → /materialidade/saturno-fluxo.webp (mesma peça, 4:3)
    tone: "carvao",
    intensity: "strong",
    usage:
      "/saturno-ambiental, capítulo de fechamento \"Saturno + Grupo Almeida\". Segunda e ÚLTIMA imagem conceitual da página — a Seção 17 da rodada limita a Saturno a duas grandes imagens conceituais, e CARTONAGEM_IMAGE (material real, caixas) não conta como conceitual.",
    ratio: { desktop: "4:3", mobile: "4:3" },
    size: { desktop: [1600, 1200], mobile: [1600, 1200] },
    prompt: {
      desktop:
        "Extreme close-up editorial photography of processed recyclable material surfaces, geometric layers of compressed paper fiber, corrugated cardboard, cartonage edges, shredded clean paper and subtle recyclable fragments forming a directional abstract flow, tactile real material detail, carefully organized rather than chaotic, matte surfaces, deep shadows, restrained institutional palette derived from charcoal, natural kraft, warm stone and Saturno brand tones, contemporary Swiss editorial composition, strong geometry and negative space, no location, no building, no people, no vehicles, no machines, no leaves, no globe, no recycling symbols, no text, no logos, no luxury pedestal, no gold",
      mobile:
        "Extreme close-up editorial photography of processed recyclable material surfaces, geometric layers of compressed paper fiber, corrugated cardboard, cartonage edges, shredded clean paper and subtle recyclable fragments forming a directional abstract flow, tactile real material detail, carefully organized rather than chaotic, matte surfaces, deep shadows, restrained institutional palette derived from charcoal, natural kraft, warm stone and Saturno brand tones, contemporary Swiss editorial composition, strong geometry and negative space, no location, no building, no people, no vehicles, no machines, no leaves, no globe, no recycling symbols, no text, no logos, no luxury pedestal, no gold",
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
 * Mesmo estado de bloqueio das superfícies: pares ainda `null` porque o
 * Magnific está fora, e nenhuma imagem é emprestada no lugar. Os
 * consumidores mantêm em cena o asset que já exibiam (ver o
 * `interimImage` de MaterialAtlas.tsx e IMG_EQUIPAMENTOS_ENGENHARIA em
 * HomePage.tsx) até que o par próprio exista.
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
    desktop: null, // → /materialidade/material-atlas-desktop.webp
    mobile: null, //  → /materialidade/material-atlas-mobile.webp
    alt: "Composição editorial vista de cima com as famílias de material recicláveis trabalhadas pelo Grupo Almeida: papelão, papel, plásticos, metais, madeira e demais categorias organizadas em zonas distintas",
    ratio: { desktop: "3:2", mobile: "4:5" },
    size: { desktop: [1800, 1200], mobile: [1080, 1350] },
    prompt: {
      desktop:
        "Top-down editorial still life of clean recyclable material families arranged as a sophisticated visual atlas, tactile corrugated cardboard, stacked kraft paper and newspaper edges, clean transparent and colored plastic fragments, PET material, matte aluminum and steel pieces, clear glass texture, natural wood offcuts and other recyclable material categories arranged in distinct but connected zones, realistic industrial material textures, carefully curated geometric composition, sophisticated museum-like material study rather than trash, restrained deep forest green, charcoal, warm stone and kraft palette, soft directional studio lighting, subtle shadows, editorial Swiss design sensibility, image edges blending naturally into a warm stone or deep green webpage background, large 3:2 composition, no text, no labels, no recycling symbols, no people, no factory, no garbage dump, no dirty waste, no plants, no leaves, no greenwashing imagery",
      mobile:
        "Vertical top-down editorial material atlas composed of clean recyclable material families, tactile corrugated cardboard, paper and newspaper layers, clean plastic fragments, PET texture, aluminum and steel pieces, clear glass, wood and other visually distinct recyclable materials arranged in controlled geometric zones, sophisticated curated industrial still life, realistic texture, restrained forest green, charcoal, kraft and warm stone palette, soft directional studio light, strong central composition readable on a phone screen, portrait 4:5, no text, no labels, no icons, no people, no factory, no garbage pile, no dirty waste, no leaves, no plants, no eco cliché",
    },
  },

  "equipamentos-engenharia": {
    desktop: null, // → /materialidade/equipamentos-engenharia-desktop.webp
    mobile: null, //  → /materialidade/equipamentos-engenharia-mobile.webp
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
