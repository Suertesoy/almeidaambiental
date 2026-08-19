/**
 * Fonte de dados da página /almeida-equipamentos. Portfólio AUTORIZADO e
 * EXATO (Seção 32 da tarefa) — seis itens, nem mais nem menos:
 * Compactador de Fuso, APV 90 e APV 100, Compactador Hidráulico,
 * Contêineres Almeida, Prensas Horizontais Grandes, Crocodile. O catálogo
 * antigo da Almeida NÃO autoriza adicionar nenhum outro modelo (APV 160,
 * 200, 260, 520 etc.) — só serviu para entender funcionamento/aplicação.
 *
 * Specs só aparecem quando confirmadas em fonte oficial do fabricante
 * (pesquisa registrada no relatório final do checkpoint): motor 9–15 kW e
 * relação de compactação até 5:1 do Compactador de Fuso vêm do material
 * oficial Pöttinger (poettinger-oneworld.at). Onde a pesquisa não
 * confirmou um número (ex.: dimensões dos Contêineres Almeida, percentual
 * de líquido retirado pelo Crocodile), a copy fica qualitativa de
 * propósito — não inventar (AGENT_RULES_SITE.md, Regra 5).
 */

import { img } from "./media";

export type Product = {
  id: string;
  name: string;
  manufacturer: string;
  headline: string;
  copy: string;
  idealFor: string[];
  benefits: string[];
  /** Só specs confirmadas em fonte oficial — nunca aproximação inventada. */
  confirmedSpecs?: string[];
  image: ReturnType<typeof img>;
};

export const PRODUCTS: Product[] = [
  {
    id: "compactador-fuso",
    name: "Compactador de Fuso",
    manufacturer: "Pöttinger",
    headline: "Mais material por carga. Menos volume ocupando espaço.",
    copy: "Projetado para grandes volumes, o compactador de fuso utiliza uma rosca de alta força para fragmentar e compactar materiais continuamente. A solução é especialmente interessante quando papelão, plástico ou madeira passam a ocupar espaço demais antes da coleta.",
    idealFor: ["Papelão", "Plástico", "Madeira"],
    benefits: ["Maior densidade de carga", "Redução de volume", "Alimentação de grandes materiais", "Ganho logístico"],
    confirmedSpecs: ["Motorização de 9 a 15 kW", "Relação de compactação de até 5:1"],
    image: img(
      "almeida-equipamentos",
      "produto-compactador-fuso",
      "/almeida-equipamentos/produtos/compactador-fuso.webp",
      "Compactador de fuso industrial isolado em fundo neutro, visualização ilustrativa de produto"
    ),
  },
  {
    id: "apv-90-100",
    name: "APV 90 e APV 100",
    manufacturer: "Austropressen",
    headline: "Compactação vertical onde cada metro quadrado importa.",
    copy: "As prensas APV atendem operações que precisam organizar papel, papelão, têxteis ou plásticos sem dedicar uma grande área ao equipamento. O formato vertical reúne compactação e praticidade em uma solução adequada para operações comerciais e industriais.",
    idealFor: ["Papel", "Papelão", "Têxteis", "Plásticos"],
    benefits: ["Baixo requisito de espaço", "Operação prática", "Formato vertical compacto"],
    image: img(
      "almeida-equipamentos",
      "produto-apv",
      "/almeida-equipamentos/produtos/apv-90-100.webp",
      "Prensa vertical compacta isolada em fundo neutro, visualização ilustrativa de produto"
    ),
  },
  {
    id: "compactador-hidraulico",
    name: "Compactador Hidráulico",
    manufacturer: "Pöttinger",
    headline: "Compactação para resíduos que exigem contenção e força.",
    copy: "O compactador hidráulico combina armazenamento e compactação em uma estrutura integrada. É especialmente adequado a operações que precisam reduzir volume, manter o ambiente organizado e lidar com resíduos que podem exigir maior contenção.",
    idealFor: ["Resíduos industriais", "Materiais com maior geração de líquidos"],
    benefits: ["Armazenamento e compactação integrados", "Estrutura fechada", "Contenção adequada ao material"],
    image: img(
      "almeida-equipamentos",
      "produto-compactador-hidraulico",
      "/almeida-equipamentos/produtos/compactador-hidraulico.webp",
      "Compactador hidráulico fechado isolado em fundo neutro, visualização ilustrativa de produto"
    ),
  },
  {
    id: "conteineres-almeida",
    name: "Contêineres Almeida",
    manufacturer: "Produção própria",
    headline: "Estrutura desenvolvida para trabalhar junto com a operação.",
    copy: "Os contêineres produzidos pela Almeida complementam sistemas de coleta e compactação com uma estrutura pensada para resistência, movimentação e descarga de materiais.",
    idealFor: ["Coleta roll-on/roll-off", "Operações de grande volume"],
    benefits: ["Produção própria do Grupo Almeida", "Geometria pensada para descarregamento", "Acabamento industrial resistente"],
    image: img(
      "almeida-equipamentos",
      "produto-conteineres",
      "/almeida-equipamentos/produtos/conteineres-almeida.webp",
      "Contêiner industrial roll-on/roll-off isolado em fundo neutro, visualização ilustrativa de produto"
    ),
  },
  {
    id: "prensas-horizontais",
    name: "Prensas Horizontais",
    manufacturer: "Austropressen",
    headline: "Alta capacidade para operações que já trabalham em outra escala.",
    copy: "Quando o volume exige processamento contínuo e fardos de alta densidade, as prensas horizontais ampliam a capacidade operacional e reduzem a necessidade de manipulação do material antes do transporte.",
    idealFor: ["Grandes volumes contínuos", "Fardos de alta densidade"],
    benefits: ["Processamento contínuo", "Fardos de alta densidade", "Menos manipulação antes do transporte"],
    image: img(
      "almeida-equipamentos",
      "produto-prensa-horizontal",
      "/almeida-equipamentos/produtos/prensas-horizontais.webp",
      "Prensa horizontal industrial de grande porte isolada em fundo neutro, visualização ilustrativa de produto"
    ),
  },
  {
    id: "crocodile",
    name: "Crocodile",
    manufacturer: "Heger",
    headline: "Menos líquido. Menos peso. Mais eficiência no processamento.",
    copy: "O Crocodile atua na separação de líquidos de diferentes materiais, facilitando etapas posteriores de reciclagem, transporte, armazenamento ou destinação.",
    idealFor: ["Copos plásticos", "Embalagens Tetra Pak", "Garrafas PET", "Lodos específicos"],
    benefits: ["Redução de peso para transporte", "Preparação para reciclagem", "Processo compacto e robusto"],
    image: img(
      "almeida-equipamentos",
      "produto-crocodile",
      "/almeida-equipamentos/produtos/crocodile.webp",
      "Equipamento industrial de desidratação isolado em fundo neutro, visualização ilustrativa de produto"
    ),
  },
];

export type MaterialAssociation = {
  material: string;
  products: string[]; // ids de PRODUCTS
};

/** Associações só onde o material do próprio produto (idealFor) já
 *  sustenta a ligação — nunca prometendo que todo equipamento processa
 *  todo material (Seção 46 da tarefa). */
export const MATERIAL_ASSOCIATIONS: MaterialAssociation[] = [
  { material: "Papelão", products: ["compactador-fuso", "apv-90-100"] },
  { material: "Plástico", products: ["compactador-fuso", "apv-90-100", "crocodile"] },
  { material: "Madeira", products: ["compactador-fuso"] },
  { material: "Resíduos úmidos", products: ["compactador-hidraulico", "crocodile"] },
  { material: "Documentos sigilosos", products: ["compactador-hidraulico"] },
  { material: "Grandes volumes contínuos", products: ["prensas-horizontais", "conteineres-almeida"] },
];

export const HERO_IMAGE = img(
  "almeida-equipamentos",
  "hero",
  "/almeida-equipamentos/hero-compactador.webp",
  "Grande equipamento industrial de compactação integrado a instalação moderna, visualização ilustrativa"
);

export const DETALHE_MECANICO_IMAGE = img(
  "almeida-equipamentos",
  "detalhe-mecanico",
  "/almeida-equipamentos/detalhe-mecanico.webp",
  "Close técnico de estrutura mecânica e painel metálico de equipamento industrial"
);

export const FEIRA_IMAGE = img(
  "almeida-equipamentos",
  "parcerias-internacionais",
  "/almeida-equipamentos/feira-tecnologica.webp",
  "Ambiente conceitual de feira de tecnologia ambiental internacional, ilustrativo"
);

export const PARTNERS = ["Pöttinger", "Austropressen", "Heger"];

/**
 * Seção "Eficiência que aparece no transporte" (ponte editorial entre os
 * seis produtos e "qual tecnologia para qual material"). Pesquisa dedicada
 * em Pöttinger, Austropressen e Heger não encontrou uma relação de
 * capacidade logística comparável e confiável entre os três estágios
 * (solto/prensado/compactado) — nenhuma fonte oficial publica kg por
 * transporte equivalentes entre produtos diferentes, e o catálogo antigo da
 * Almeida (fora do portfólio autorizado, ver header deste arquivo) não
 * conta como fonte. Por isso `scale` é só a proporção ilustrativa da
 * barra (0–1), não um dado medido — nenhum número aparece no rótulo. O
 * único número confirmado (motor/relação de compactação do Compactador de
 * Fuso, "até 5:1", fonte Pöttinger — ver PRODUCTS acima) é citado como nota
 * de apoio abaixo do gráfico, não como valor das três barras.
 */
export type DensityStage = {
  id: string;
  label: string;
  density: string;
  scale: number;
};

export const DENSITY_STAGES: DensityStage[] = [
  { id: "solto", label: "Material solto", density: "Baixa densidade", scale: 0.3 },
  { id: "prensado", label: "Material prensado", density: "Densidade intermediária", scale: 0.62 },
  { id: "compactado", label: "Material compactado", density: "Alta densidade", scale: 1 },
];
