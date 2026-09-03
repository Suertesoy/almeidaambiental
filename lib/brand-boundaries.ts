/**
 * Registro das transições narrativas de território do site — as fronteiras
 * onde uma grande área termina e outra empresa/território começa.
 *
 * Não é uma lista de dobras: só entram aqui mudanças de território
 * realmente importantes. Uma dobra que apenas continua o assunto da
 * anterior não recebe assinatura de fronteira.
 *
 * `side` é a única informação compartilhada entre as duas metades de uma
 * mesma fronteira (ver components/shared/BrandBoundaryMark.tsx): as duas
 * precisam usar exatamente o mesmo lado e a mesma largura para que o
 * símbolo leia como UMA peça atravessando a linha de mudança de
 * superfície, e não como dois carimbos soltos. Por isso o lado mora aqui,
 * e não em cada chamada do componente.
 *
 * Ritmo da Home: a alternância esquerda → direita → esquerda → direita não
 * é regra mecânica do sistema, é a decisão de composição desta página —
 * outra página pode repetir um lado se a composição dela pedir.
 */

export type BrandBoundarySide = "left" | "right";

export type BrandBoundaryId =
  /* Home */
  | "grupo-ambiental"
  | "ambiental-equipamentos"
  | "equipamentos-saturno"
  | "saturno-impacto"
  /* Páginas internas — só mudanças narrativas de grande importância */
  | "saturno-territorio"
  | "equipamentos-catalogo"
  | "ambiental-processo";

export type BrandBoundary = {
  side: BrandBoundarySide;
  /** Para que serve esta fronteira — documentação, não texto de interface. */
  note: string;
};

export const BRAND_BOUNDARIES: Record<BrandBoundaryId, BrandBoundary> = {
  "grupo-ambiental": {
    side: "left",
    note: "Home: Hero do Grupo (vídeo) → território da Almeida Ambiental.",
  },
  "ambiental-equipamentos": {
    side: "right",
    note: "Home: Almeida Ambiental (verde floresta) → Almeida Equipamentos (pedra).",
  },
  "equipamentos-saturno": {
    side: "left",
    note: "Home: Almeida Equipamentos (pedra) → Saturno Ambiental (oliva profundo).",
  },
  "saturno-impacto": {
    side: "right",
    note: "Home: Saturno Ambiental → Impacto / fechamento do Grupo (carvão).",
  },
  "saturno-territorio": {
    side: "left",
    note: "/saturno-ambiental: abertura editorial → território material da Saturno.",
  },
  "equipamentos-catalogo": {
    side: "right",
    note: "/almeida-equipamentos: posicionamento → catálogo técnico explorável.",
  },
  /* Acrescentada na auditoria de fronteiras da rodada de materialidade
     (Seção 21): /almeida-ambiental era a única página de empresa sem
     nenhuma assinatura, abaixo da meta de 1 a 3. Esta é a única troca da
     página que atende aos dois critérios ao mesmo tempo — muda o capítulo
     narrativo (o QUE a empresa faz → COMO o resíduo atravessa a operação)
     e muda a superfície de verdade (pedra clara → verde floresta). As
     outras transições da página alternam entre dois claros ou continuam o
     mesmo assunto, e receber assinatura ali transformaria a fronteira em
     pattern decorativo — que é justamente o que a auditoria pediu para
     evitar. */
  "ambiental-processo": {
    side: "left",
    note: "/almeida-ambiental: materiais (pedra) → o percurso do resíduo (verde floresta).",
  },
};
