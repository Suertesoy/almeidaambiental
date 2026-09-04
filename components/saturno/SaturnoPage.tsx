import Link from "next/link";
import shared from "../shared/company-page.module.css";
import styles from "./saturno.module.css";
import CompanyHero from "../shared/CompanyHero";
import MaterialCards from "../shared/MaterialCards";
import EditorialCTA from "../shared/EditorialCTA";
import BrandBoundaryMark, { boundarySurface } from "../shared/BrandBoundaryMark";
import MaterialSurface from "../shared/MaterialSurface";
import { FRENTES, HERO_META } from "../../lib/saturno-data";
import { CONTACT_ANCHORS } from "../../lib/contact-data";

const COMPACT_FRENTES = FRENTES.filter(
  (f) => f.id === "coleta" || f.id === "triagem" || f.id === "trituracao" || f.id === "destinacao"
);
const CARTONAGEM = FRENTES.find((f) => f.id === "cartonagem")!;
const GESTAO_AMBIENTAL = FRENTES.find((f) => f.id === "gestao-ambiental")!;

/**
 * /saturno-ambiental — identidade regional própria conectada ao Grupo
 * Almeida (Seção 19 em diante): Hero → posicionamento (integração em 2022)
 * → três frentes compartilhadas em tratamento compacto → Cartonagem e
 * Gestão Ambiental como capítulos próprios (exclusivos da Saturno) →
 * materiais → Saturno + Grupo Almeida → CTA final. Não copia a arquitetura
 * da Almeida Ambiental: onde ela é operacional/logística, a Saturno é
 * regional/consultiva.
 *
 * Rodada de refino editorial — território sem fotografia: não há captação
 * prevista da instalação atual da Saturno, e o prédio de hoje não
 * representa o padrão que o Grupo está construindo. As imagens geradas que
 * afirmavam sede, linha de triagem e equipe saíram (ver o cabeçalho de
 * lib/saturno-data.ts) e não foram trocadas por outras: fotografar a
 * Almeida e chamar de Saturno seria o mesmo erro com outro arquivo.
 *
 * O que ficou no lugar não é ausência — é a direção da página: Hero
 * tipográfico sobre a superfície própria da marca (--color-saturno-deep, a
 * MESMA cor que a Saturno já ocupa na Home, não uma cor por página), uma
 * faixa de metadados validados, o símbolo atravessando a fronteira
 * "saturno-territorio" e, daí para baixo, geometria, espaçamento e
 * conteúdo. A única fotografia da página é a Cartonagem, porque mostra
 * material — caixas de papelão — e não uma instalação.
 *
 * Consolidação de territórios (branch feature/territorios-visuais-
 * continuos): Posicionamento, Frentes, Cartonagem e Gestão Ambiental eram
 * quatro seções alternando pedra clara / pedra clara-alt / pedra clara /
 * verde floresta (a cor da Almeida AMBIENTAL, não da Saturno!) — nenhuma
 * delas a materialidade própria que o Hero já estabelece. As quatro agora
 * vivem dentro de .saturnoTerritory, com a MESMA MaterialSurface
 * ("saturno-hero", tone "saturno" — já calibrado para
 * --color-saturno-deep, o mesmo fundo de --toneSaturno) atravessando
 * todas. Cartonagem mantém sua fotografia real como peça editorial
 * dentro do ambiente, não como seção à parte. Materiais e o fechamento
 * (toneCarvao + saturno-fluxo) continuam como estavam — um fechamento
 * mais escuro dentro da mesma família de tons frios e baixa luminância,
 * não uma volta à pedra clara.
 */
export default function SaturnoPage() {
  return (
    <div className={styles.page} data-page="saturno-ambiental">
      <CompanyHero
        eyebrow="Saturno Ambiental · Grupo Almeida"
        title="Presença regional, experiência compartilhada."
        lede="Em Blumenau e no Vale do Itajaí, a Saturno Ambiental reúne serviços de gestão de resíduos, estrutura operacional e soluções ambientais conectadas à experiência do Grupo Almeida."
        surface="saturno"
        material="saturno-hero"
        meta={HERO_META}
        boundary={{ id: "saturno-territorio", surface: "onDark" }}
        primaryCta={{ label: "Conheça nossas soluções", href: "#frentes" }}
        secondaryCta={{ label: "Falar com a Saturno Ambiental", href: CONTACT_ANCHORS.blumenau }}
      />

      {/* `boundarySurface` em cada `section` abaixo (mesmo quando não hospeda
          nenhuma BrandBoundaryMark) é o contrato de empilhamento que
          MaterialSurface exige — sem `position: relative` + `z-index: 0` na
          section, o texto estático pinta ATRÁS da textura posicionada, não
          na frente dela. */}
      <div className={`${shared.toneSaturno} ${styles.saturnoTerritory}`}>
        <MaterialSurface surface="saturno-hero" />

        {/* ---------------- Posicionamento ---------------- */}
        {/* Metade de entrada da fronteira aberta no Hero: o oliva profundo da
            Saturno termina em corte reto contra o território seguinte (fora
            deste wrapper) e o símbolo atravessa a linha. No desktop,
            "headline lateral" evita que a seção vire uma coluna estreita
            perdida em 1440px (Seção 43). */}
        <section className={`${shared.section} ${boundarySurface}`}>
          <BrandBoundaryMark boundary="saturno-territorio" half="entering" surface="onDark" />
          <div className={shared.container}>
            <div className={styles.positioningGrid}>
              <h2 className={shared.headline}>Próxima da operação. Próxima de quem precisa dela.</h2>
              <div className={styles.positioningCopy}>
                <p className={shared.body}>
                  A presença da Saturno no Vale do Itajaí fortalece a capacidade regional do Grupo Almeida sem apagar a
                  identidade construída pela empresa em Blumenau. A atuação combina coleta, classificação, processamento,
                  cartonagem e serviços técnicos ambientais.
                </p>
                <p className={shared.body}>
                  <strong>Desde 2022, a Saturno integra o Grupo Almeida</strong>, ampliando a presença do grupo no Vale do
                  Itajaí.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Frentes compartilhadas, tratamento compacto ----------------
            Coleta, Triagem, Trituração/Descaracterização e Destinação — a
            sequência do processo operacional não deve terminar em
            Trituração/Descaracterização (correção 2026-08-20, pedido explícito
            do responsável do projeto). Cartonagem e Gestão Ambiental continuam
            como capítulos próprios abaixo, fora desta grade compacta. */}
        <section id="frentes" className={`${shared.sectionCompact} ${boundarySurface}`}>
          <div className={shared.container}>
            <p className={`${shared.eyebrow} ${shared.eyebrowAccent}`}>Serviços</p>
            <h2 className={shared.headline}>Gestão de resíduos com linguagem própria da região.</h2>
            <div className={styles.frentesCompactGrid}>
              {COMPACT_FRENTES.map((frente, index) => (
                <div key={frente.id} className={styles.frentesCompactItem}>
                  <span className={styles.frentesCompactIndex}>{String(index + 1).padStart(2, "0")} · {frente.eyebrow}</span>
                  <h3 className={styles.frentesCompactHeadline}>{frente.headline}</h3>
                  <p className={styles.frentesCompactCopy}>{frente.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Cartonagem (exclusiva, capítulo próprio) ---------------- */}
        <section className={`${shared.sectionEditorial} ${boundarySurface}`}>
          <div className={shared.container}>
            <div className={`${shared.duo} ${shared.duoMediaLeft}`}>
              <div className={`${shared.duoMedia} ${shared.duoMediaLandscape}`}>
                <img src={CARTONAGEM.image!.src} alt={CARTONAGEM.image!.alt} loading="lazy" decoding="async" />
              </div>
              <div className={shared.duoContent}>
                <p className={`${shared.eyebrow} ${shared.eyebrowAccent}`}>{CARTONAGEM.eyebrow}</p>
                <h2 className={shared.headline}>{CARTONAGEM.headline}</h2>
                <p className={shared.body}>{CARTONAGEM.copy}</p>
                {CARTONAGEM.tags && (
                  <ul className={shared.tagRow}>
                    {CARTONAGEM.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                )}
                <div className={shared.ctaRow}>
                  <Link className={`${shared.btn} ${shared.btnOutlineOnDark}`} href={CARTONAGEM.cta!.href}>
                    {CARTONAGEM.cta!.label}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- Gestão Ambiental (exclusiva, frente consultiva) ----------------
            Era um duo com a fotografia de um "profissional analisando planta"
            que nunca existiu. Serviço técnico não se prova com a foto de
            alguém segurando papel: o que este bloco tem de concreto são os
            oito itens de escopo, e é a eles que a seção dá o espaço agora —
            headline lateral no desktop (mesma gramática do posicionamento) e
            a lista técnica ocupando a coluna larga em vez de dividir espaço
            com uma imagem ilustrativa. */}
        <section className={`${shared.sectionEditorial} ${boundarySurface}`}>
          <div className={shared.container}>
            <div className={styles.positioningGrid}>
              <div>
                <p className={`${shared.eyebrow} ${shared.eyebrowAccent}`}>{GESTAO_AMBIENTAL.eyebrow}</p>
                <h2 className={shared.headline}>{GESTAO_AMBIENTAL.headline}</h2>
              </div>
              <div className={styles.positioningCopy}>
                <p className={shared.body}>{GESTAO_AMBIENTAL.copy}</p>
                {/* Itens técnicos (Seção 37: PGRS, PGRSS, PAE, treinamentos...)
                    como lista real e estruturada — divisor + um item por
                    linha, não parágrafo contínuo nem pílulas soltas. */}
                {GESTAO_AMBIENTAL.tags && (
                  <ul className={`${shared.technicalList} ${styles.gestaoTagsList} ${styles.gestaoTagsColumns}`}>
                    {GESTAO_AMBIENTAL.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                )}
                <div className={shared.ctaRow}>
                  <Link className={`${shared.btn} ${shared.btnOutlineOnDark}`} href={GESTAO_AMBIENTAL.cta!.href}>
                    {GESTAO_AMBIENTAL.cta!.label}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ---------------- Materiais ----------------
          Rodada de refino de fluxo/materiais: a fotografia/materialidade
          gigante (MaterialSurface "saturno-fluxo") que ocupava o fundo
          deste bloco competia com a leitura da lista e funcionava só como
          pano de fundo exclusivo da grade — não é o território Saturno
          (esse é .saturnoTerritory acima, que permanece intocado), então
          removê-la daqui não apaga a materialidade da marca. A seção fica
          headline + respiro + Material Cards, sobre a superfície sólida
          .toneCarvao, com tons quentes/kraft compatíveis com o território
          (ver tone="saturno" em MaterialCards.module.css). */}
      <section className={`${shared.section} ${shared.toneCarvao} ${boundarySurface}`}>
        <div className={shared.container}>
          <h2 className={shared.headline}>Materiais que fazem parte da operação.</h2>
          <div className={styles.materialsBlock}>
            <MaterialCards tone="saturno" />
          </div>
        </div>
      </section>

      {/* ---------------- Saturno + Grupo Almeida ----------------
          Segunda e ÚLTIMA imagem conceitual da página (Seção 17 da rodada).
          Este capítulo de fechamento era superfície de carvão inteiramente
          chapada com uma headline e um parágrafo por cima — o momento certo
          para a materialidade da marca entrar, e longe o bastante da
          fotografia real de cartonagem para não competir com ela. */}
      <section className={`${shared.section} ${shared.toneCarvao} ${boundarySurface}`}>
        <MaterialSurface surface="saturno-fluxo" />
        <div className={shared.container}>
          <span className={styles.groupBadge}>Saturno Ambiental · Grupo Almeida</span>
          <h2 className={shared.headline}>Uma marca regional conectada a uma estrutura maior.</h2>
          <p className={shared.body}>
            A integração da Saturno ao Grupo Almeida amplia a capacidade de compartilhar experiência, tecnologia e
            estrutura entre diferentes regiões de Santa Catarina, preservando a proximidade e o reconhecimento
            construídos pela marca no Vale do Itajaí.
          </p>
          <div className={shared.ctaRow}>
            <Link className={`${shared.btn} ${shared.btnOutlineOnDark}`} href="/historia">
              Conheça o Grupo Almeida
            </Link>
          </div>
        </div>
      </section>

      <EditorialCTA
        headline="Gestão ambiental começa entendendo a realidade da operação."
        body="Conte o que sua empresa gera, onde está e qual desafio precisa resolver."
        cta={{ label: "Falar com a Saturno Ambiental", href: CONTACT_ANCHORS.blumenau }}
        tone="forest"
      />
    </div>
  );
}
