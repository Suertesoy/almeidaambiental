"use client";

import { useRef } from "react";
import {
  MfActions,
  MfBody,
  MfBottom,
  MfButton,
  MfCenter,
  MfFrame,
  MfInstitutionalTop,
  MfLabel,
  MfMetric,
  MfMetrics,
  MfScrollHint,
  MfSubtitle,
  MfTitle,
} from "./MobileDobra";
import {
  DActions,
  DBody,
  DBottomCluster,
  DButton,
  DFrame,
  DHint,
  DImpactCluster,
  DMain,
  DMetricsGrid,
  DNameBlock,
  DTitle,
  DTop,
} from "./DesktopDobra";
import { CountUpMetric, useEnterOnce, type MetricFormat } from "./AnimatedMetric";
import { lockup, rhythm } from "../lib/responsive-type";

/**
 * Conteúdo real das dobras 2 a 9 da Home (dobra 1 continua em HeroContent.tsx).
 *
 * Cada dobra renderiza dois blocos independentes:
 * - Desktop (>=1024px, `.desktop-only`): `DFrame` com três regiões reais —
 *   `DTop` (nome/subtítulo), `DMain` (grid de 12 colunas onde a headline
 *   se centraliza sozinha e o cluster body+CTA fica encostado no fim) e
 *   `DHint` (chevron, 40px abaixo do fim de `DMain`) — ver
 *   components/DesktopDobra.tsx. Nenhum elemento usa `top` percentual.
 * - Mobile+tablet (<1024px, `.mobile-fidelity`): `MfFrame variant="institutional"`
 *   ancora o título institucional a `header + 72px` fixos (regra 11 da
 *   tarefa). `MfInstitutionalTop` agrupa nome+subtítulo num bloco de 348px
 *   sempre centralizado (regras 12–15); `MfCenter` centraliza a headline
 *   sozinha no espaço disponível; `MfBottom` (corpo/CTA, centralizado —
 *   regra 24) fica encostado no fim, seguido por `MfScrollHint` a 32px
 *   fixos (regra 27) — ver components/MobileDobra.tsx. `onAdvance` dispara
 *   o mesmo mecanismo de transição usado pelo scroll (wheel) — ver
 *   `goToIndex` em ScrollVideoExperience.tsx.
 */

/* fontSize responde a largura E altura (vw + svh) — não só vw — para não
   ficar apertado em notebooks baixos (1280×720, 1366×768) mesmo quando a
   largura sobra. Escala compartilhada por toda headline de dobra (2 a 9,
   inclusive o fechamento — regra 25 da tarefa: uma escala desktop única,
   não recalibrada dobra a dobra). */
const HEADLINE_FONT = { fontSize: "clamp(48px, 2.2vw + 2.6svh, 64px)", lineHeight: 0.98 };

/** Headline mobile das dobras institucionais (2 a 7): base tipográfica
 *  ÚNICA — 35px / 41px / 2% (regras 18–20 da tarefa), não recalibrada
 *  dobra a dobra. As dobras de fechamento/impacto (8/9) preservam sua
 *  própria composição (regra 29) e não usam este token. */
const MOBILE_HEADLINE_TOKENS = lockup(35, 41, 0.7);

/** Body mobile de todas as dobras (regra 23 da tarefa): 16px / 21px / 7%,
 *  base ÚNICA — substitui os tokens por-dobra usados antes. */
const MOBILE_BODY_TOKENS = lockup(16, 21, 1.12);

/** Dobra 9 (Impacto): tokens dos números/labels das métricas mobile. */
const metricValueTokens = lockup(38, 42, 0);
const metricLabelTokens = lockup(13, 15, 0);

/** Dobra 9 (Impacto): valores oficiais das métricas — `target`/`format`
 *  alimentam o count-up (CountUpMetric), `display` é o texto final exato
 *  (também usado por leitor de tela, ver AnimatedMetric.tsx). Não alterar
 *  os números oficiais. */
const IMPACT_METRICS: Array<{
  target: number;
  format: MetricFormat;
  suffix: string;
  display: string;
  label: string;
}> = [
  { target: 818907, format: "integer", suffix: "", display: "818.907", label: "árvores preservadas" },
  { target: 54873, format: "integer", suffix: " t", display: "54.873 t", label: "materiais reciclados" },
  { target: 153114, format: "integer", suffix: " t", display: "153.114 t", label: "CO₂ evitadas" },
  { target: 1.27, format: "decimal2", suffix: " bi", display: "1,27 bi", label: "litros de água economizados" },
];

export function Section02Content({ onAdvance }: { onAdvance: () => void }) {
  return (
    <>
      <div className="desktop-only d-stage">
        <DFrame>
          <DTop>
            <DNameBlock
              colA={1}
              colB={6}
              name="Almeida Ambiental"
              services="Diagnóstico · Coleta · Triagem · Trituração · Descaracterização"
            />
          </DTop>
          <DMain>
            <DTitle
              colA={1}
              colB={8}
              maxWidth="760px"
              align="left"
              {...HEADLINE_FONT}
              lines={[[{ text: "RESÍDUOS GANHAM" }], [{ text: "UM NOVO " }, { text: "DESTINO", gold: true }]]}
            />
            <DBottomCluster colA={9} colB={13} align="left" maxWidth="420px">
              <DBody>
                Há quatro décadas, conhecimento técnico e experiência operacional se encontram na gestão
                responsável de resíduos.
              </DBody>
            </DBottomCluster>
          </DMain>
          <DHint onAdvance={onAdvance} />
        </DFrame>
      </div>

      <div className="mobile-fidelity mf-section-frame">
        <MfFrame variant="institutional" tabletAlign="left">
          <MfInstitutionalTop>
            <MfLabel tokens={lockup(29, 30, 2.61)}>Almeida Ambiental</MfLabel>
            <MfSubtitle tokens={lockup(11.3, 14, -0.11)}>
              Diagnóstico · Coleta · Triagem · Trituração · Descaracterização
            </MfSubtitle>
          </MfInstitutionalTop>
          <MfCenter>
            <MfTitle
              refWidth={348}
              tokens={MOBILE_HEADLINE_TOKENS}
              lines={[[{ text: "RESÍDUOS GANHAM" }], [{ text: "UM NOVO " }, { text: "DESTINO", gold: true }]]}
            />
          </MfCenter>
          <MfBottom>
            <MfBody tokens={MOBILE_BODY_TOKENS}>
              Há quatro décadas, conhecimento técnico e experiência operacional se encontram na gestão
              responsável de resíduos.
            </MfBody>
          </MfBottom>
        </MfFrame>
        <MfScrollHint onAdvance={onAdvance} />
      </div>
    </>
  );
}

export function Section03Content({ onAdvance }: { onAdvance: () => void }) {
  return (
    <>
      <div className="desktop-only d-stage">
        <DFrame>
          <DTop>
            <DNameBlock
              colA={1}
              colB={6}
              name="Almeida Ambiental"
              services="São José · Joinville · Araquari · Chapecó · SC"
            />
          </DTop>
          <DMain>
            <DTitle
              colA={1}
              colB={8}
              maxWidth="760px"
              align="left"
              {...HEADLINE_FONT}
              lines={[
                [{ text: "EFICIÊNCIA", gold: true }, { text: " EM" }],
                [{ text: "CADA ETAPA" }],
                [{ text: "DO PROCESSO" }],
              ]}
            />
            <DBottomCluster colA={8} colB={13} align="left" maxWidth="420px">
              <DBody>
                Da coleta à destinação, a Almeida Ambiental reúne estrutura, tecnologia e experiência para
                transformar resíduos em valor, com mais eficiência logística, segurança e responsabilidade
                ambiental.
              </DBody>
              <DActions>
                <DButton variant="secondary" href="/almeida-ambiental">
                  Conheça Almeida Ambiental
                </DButton>
              </DActions>
            </DBottomCluster>
          </DMain>
          <DHint onAdvance={onAdvance} />
        </DFrame>
      </div>

      <div className="mobile-fidelity mf-section-frame">
        <MfFrame variant="institutional" tabletAlign="left">
          <MfInstitutionalTop>
            <MfLabel tokens={lockup(29, 30, 2.9)}>Almeida Ambiental</MfLabel>
            <MfSubtitle tokens={lockup(13.5, 17, -0.3)}>
              São José · Joinville · Araquari · Chapecó · SC
            </MfSubtitle>
          </MfInstitutionalTop>
          <MfCenter>
            <MfTitle
              refWidth={350}
              tokens={MOBILE_HEADLINE_TOKENS}
              lines={[
                [{ text: "EFICIÊNCIA", gold: true }, { text: " EM" }],
                [{ text: "CADA ETAPA" }],
                [{ text: "DO PROCESSO" }],
              ]}
            />
          </MfCenter>
          <MfBottom>
            <MfBody tokens={MOBILE_BODY_TOKENS}>
              Da coleta à destinação, a Almeida Ambiental reúne estrutura, tecnologia e experiência para
              transformar resíduos em valor, com mais eficiência logística, segurança e responsabilidade
              ambiental.
            </MfBody>
            <MfActions marginTop="8px">
              <MfButton variant="secondary" href="/almeida-ambiental">
                Conheça Almeida Ambiental
              </MfButton>
            </MfActions>
          </MfBottom>
        </MfFrame>
        <MfScrollHint onAdvance={onAdvance} />
      </div>
    </>
  );
}

export function Section04Content({ onAdvance }: { onAdvance: () => void }) {
  return (
    <>
      <div className="desktop-only d-stage">
        <DFrame>
          <DTop>
            <DNameBlock
              colA={7}
              colB={13}
              align="right"
              name="Almeida Equipamentos"
              services="Compactadores · Prensas · Trituradores · Containers"
            />
          </DTop>
          <DMain>
            <DTitle
              colA={5}
              colB={13}
              maxWidth="760px"
              align="right"
              {...HEADLINE_FONT}
              lines={[
                [{ text: "TECNOLOGIA", gold: true }, { text: " QUE" }],
                [{ text: "NASCEU DA" }],
                [{ text: "PRÓPRIA OPERAÇÃO" }],
              ]}
            />
            <DBottomCluster colA={1} colB={6} align="left" maxWidth="480px">
              <DBody>
                Criada para aperfeiçoar os processos do Grupo Almeida, a Almeida Equipamentos transforma
                décadas de experiência no setor em tecnologia aplicada à gestão de resíduos.
              </DBody>
            </DBottomCluster>
          </DMain>
          <DHint onAdvance={onAdvance} />
        </DFrame>
      </div>

      <div className="mobile-fidelity mf-section-frame">
        <MfFrame variant="institutional" tabletAlign="right">
          <MfInstitutionalTop>
            <MfLabel tokens={lockup(26, 27, -0.6)}>Almeida Equipamentos</MfLabel>
            <MfSubtitle tokens={lockup(13, 16, -0.3)}>
              Compactadores · Prensas · Trituradores · Containers
            </MfSubtitle>
          </MfInstitutionalTop>
          <MfCenter>
            <MfTitle
              refWidth={333}
              tokens={MOBILE_HEADLINE_TOKENS}
              lines={[
                [{ text: "TECNOLOGIA", gold: true }, { text: " QUE" }],
                [{ text: "NASCEU DA" }],
                [{ text: "PRÓPRIA OPERAÇÃO" }],
              ]}
            />
          </MfCenter>
          <MfBottom>
            <MfBody tokens={MOBILE_BODY_TOKENS}>
              Criada para aperfeiçoar os processos do Grupo Almeida, a Almeida Equipamentos transforma
              décadas de experiência no setor em tecnologia aplicada à gestão de resíduos.
            </MfBody>
          </MfBottom>
        </MfFrame>
        <MfScrollHint onAdvance={onAdvance} />
      </div>
    </>
  );
}

export function Section05Content({ onAdvance }: { onAdvance: () => void }) {
  return (
    <>
      <div className="desktop-only d-stage">
        <DFrame>
          <DTop>
            <DNameBlock colA={7} colB={13} align="right" name="Almeida Equipamentos" services="São José · SC" />
          </DTop>
          <DMain>
            <DTitle
              colA={6}
              colB={13}
              maxWidth="760px"
              align="right"
              {...HEADLINE_FONT}
              lines={[[{ text: "ENGENHARIA PARA" }], [{ text: "MOVIMENTAR" }], [{ text: "MAIS COM MENOS", gold: true }]]}
            />
            <DBottomCluster colA={1} colB={6} align="left" maxWidth="420px">
              <DBody>
                Compactadores, prensas e tecnologias desenvolvidas para diferentes materiais, volumes e
                realidades operacionais.
              </DBody>
              <DBody marginTop="14px">Conhecimento de campo conectado a tecnologias internacionais.</DBody>
              <DActions>
                <DButton variant="secondary" href="/almeida-equipamentos">
                  Conheça Almeida Equipamentos
                </DButton>
              </DActions>
            </DBottomCluster>
          </DMain>
          <DHint onAdvance={onAdvance} />
        </DFrame>
      </div>

      <div className="mobile-fidelity mf-section-frame">
        <MfFrame variant="institutional" tabletAlign="right">
          <MfInstitutionalTop>
            <MfLabel tokens={lockup(26, 27, -0.6)}>Almeida Equipamentos</MfLabel>
            <MfSubtitle tokens={lockup(16, 20, 0.8)}>São José · SC</MfSubtitle>
          </MfInstitutionalTop>
          <MfCenter>
            <MfTitle
              refWidth={351}
              tokens={MOBILE_HEADLINE_TOKENS}
              lines={[[{ text: "ENGENHARIA PARA" }], [{ text: "MOVIMENTAR" }], [{ text: "MAIS COM MENOS", gold: true }]]}
            />
          </MfCenter>
          <MfBottom>
            <MfBody tokens={MOBILE_BODY_TOKENS}>
              Compactadores, prensas e tecnologias desenvolvidas para diferentes materiais, volumes e
              realidades operacionais.
            </MfBody>
            <MfBody marginTop={rhythm(14)} tokens={MOBILE_BODY_TOKENS}>
              Conhecimento de campo conectado a tecnologias internacionais.
            </MfBody>
            <MfActions marginTop="8px">
              <MfButton variant="secondary" href="/almeida-equipamentos">
                Conheça Almeida Equipamentos
              </MfButton>
            </MfActions>
          </MfBottom>
        </MfFrame>
        <MfScrollHint onAdvance={onAdvance} />
      </div>
    </>
  );
}

export function Section06Content({ onAdvance }: { onAdvance: () => void }) {
  return (
    <>
      <div className="desktop-only d-stage">
        <DFrame>
          <DTop>
            <DNameBlock
              colA={1}
              colB={6}
              name="Saturno Ambiental"
              services="Gestão de Resíduos · Cartonagem · Consultoria"
            />
          </DTop>
          <DMain>
            <DTitle
              colA={1}
              colB={8}
              maxWidth="760px"
              align="left"
              {...HEADLINE_FONT}
              lines={[[{ text: "EXPERIÊNCIA", gold: true }], [{ text: "REGIONAL." }], [{ text: "FORÇA DE GRUPO." }]]}
            />
            <DBottomCluster colA={8} colB={13} align="left" maxWidth="440px">
              <DBody>
                Em Blumenau, a Saturno Ambiental amplia a presença do Grupo Almeida e aproxima décadas de
                conhecimento em gestão de resíduos das operações da região.
              </DBody>
            </DBottomCluster>
          </DMain>
          <DHint onAdvance={onAdvance} />
        </DFrame>
      </div>

      <div className="mobile-fidelity mf-section-frame">
        <MfFrame variant="institutional" tabletAlign="left">
          <MfInstitutionalTop>
            <MfLabel tokens={lockup(29, 30, 2.61)}>Saturno Ambiental</MfLabel>
            <MfSubtitle tokens={lockup(14, 18, 0)}>Gestão de Resíduos · Cartonagem · Consultoria</MfSubtitle>
          </MfInstitutionalTop>
          <MfCenter>
            <MfTitle
              refWidth={350}
              tokens={MOBILE_HEADLINE_TOKENS}
              lines={[[{ text: "EXPERIÊNCIA", gold: true }], [{ text: "REGIONAL." }], [{ text: "FORÇA DE GRUPO." }]]}
            />
          </MfCenter>
          <MfBottom>
            <MfBody tokens={MOBILE_BODY_TOKENS}>
              Em Blumenau, a Saturno Ambiental amplia a presença do Grupo Almeida e aproxima décadas de
              conhecimento em gestão de resíduos das operações da região.
            </MfBody>
          </MfBottom>
        </MfFrame>
        <MfScrollHint onAdvance={onAdvance} />
      </div>
    </>
  );
}

export function Section07Content({ onAdvance }: { onAdvance: () => void }) {
  return (
    <>
      <div className="desktop-only d-stage">
        <DFrame>
          <DTop>
            <DNameBlock
              colA={7}
              colB={13}
              align="right"
              name="Saturno Ambiental"
              services="Blumenau · Vale do Itajaí"
            />
          </DTop>
          <DMain>
            <DTitle
              colA={1}
              colB={8}
              maxWidth="760px"
              align="left"
              {...HEADLINE_FONT}
              lines={[
                [{ text: "GESTÃO AMBIENTAL" }],
                [{ text: "QUE " }, { text: "VAI ALÉM", gold: true }],
                [{ text: "DA COLETA" }],
              ]}
            />
            <DBottomCluster colA={8} colB={13} align="left" maxWidth="420px">
              <DBody>
                Coleta, triagem, trituração, cartonagem e consultoria ambiental fazem parte de uma atuação
                construída para unir eficiência operacional e responsabilidade ambiental.
              </DBody>
              <DActions>
                <DButton variant="secondary" href="/saturno-ambiental">
                  Conheça Saturno Ambiental
                </DButton>
              </DActions>
            </DBottomCluster>
          </DMain>
          <DHint onAdvance={onAdvance} />
        </DFrame>
      </div>

      <div className="mobile-fidelity mf-section-frame">
        <MfFrame variant="institutional" tabletAlign="left">
          <MfInstitutionalTop>
            <MfLabel tokens={lockup(29, 30, 2.61)}>Saturno Ambiental</MfLabel>
            <MfSubtitle tokens={lockup(16, 20, 0.4)}>Blumenau · Vale do Itajaí</MfSubtitle>
          </MfInstitutionalTop>
          <MfCenter>
            <MfTitle
              refWidth={353}
              tokens={MOBILE_HEADLINE_TOKENS}
              lines={[
                [{ text: "GESTÃO AMBIENTAL" }],
                [{ text: "QUE " }, { text: "VAI ALÉM", gold: true }],
                [{ text: "DA COLETA" }],
              ]}
            />
          </MfCenter>
          <MfBottom>
            <MfBody tokens={MOBILE_BODY_TOKENS}>
              Coleta, triagem, trituração, cartonagem e consultoria ambiental fazem parte de uma atuação
              construída para unir eficiência operacional e responsabilidade ambiental.
            </MfBody>
            <MfActions marginTop="8px">
              <MfButton variant="secondary" href="/saturno-ambiental">
                Conheça Saturno Ambiental
              </MfButton>
            </MfActions>
          </MfBottom>
        </MfFrame>
        <MfScrollHint onAdvance={onAdvance} />
      </div>
    </>
  );
}

/**
 * Dobra 8 (fechamento institucional) e Dobra 9 (impacto/estatísticas)
 * estavam com o conteúdo trocado em relação ao vídeo e ao Figma: o texto
 * de fechamento ("O QUE COMEÇOU...") tocava no tempo 14.20s (dobra 9,
 * a última antes do footer) e as estatísticas tocavam em 12.17s (dobra 8).
 * Corrigido aqui: dobra 8 = fechamento, dobra 9 = estatísticas — sem
 * mudar timing de vídeo, só o texto de cada uma.
 */
export function Section08Content({ onAdvance }: { onAdvance: () => void }) {
  return (
    <>
      {/* Desktop: sem DTop (dobra sem nome/subtítulo) — DMain ocupa a
          altura inteira do stage, então a headline se centraliza no
          espaço todo. Seis linhas (igual ao mobile, não quatro como
          antes): a linha mais longa fica bem mais curta, o que permite um
          max-width editorial de verdade sem encostar nas bordas da tela
          (regra 20 da tarefa) — a copy não muda, só a quebra de linha. */}
      <div className="desktop-only d-stage">
        <DFrame>
          <DMain>
            <DTitle
              centerX
              maxWidth="700px"
              align="center"
              {...HEADLINE_FONT}
              lines={[
                [{ text: "O QUE COMEÇOU" }],
                [{ text: "COM PAPEL E PAPELÃO" }],
                [{ text: "HOJE CONECTA" }],
                [{ text: "OPERAÇÃO,", gold: true }],
                [{ text: "TECNOLOGIA E" }],
                [{ text: "SUSTENTABILIDADE.", green: true }],
              ]}
            />
            <DBottomCluster centerX align="center" maxWidth="460px">
              <DBody fontSize="18px">Há 40 anos transformando o presente, pensando no futuro.</DBody>
              <DActions>
                <DButton variant="secondary" href="/contato">
                  Entre em contato com o Grupo Almeida
                </DButton>
              </DActions>
            </DBottomCluster>
          </DMain>
          <DHint onAdvance={onAdvance} />
        </DFrame>
      </div>

      {/* Dobra sem nome/subtítulo (regra 29 da tarefa): preserva a
          composição própria (largura/quebra de linha calibradas para esta
          copy), mas headline e body ficam centralizados como as demais
          dobras 2+ — a única exceção de alinhamento da Home é a headline
          da Hero (regra 21). */}
      <div className="mobile-fidelity mf-section-frame">
        <MfFrame>
          <MfCenter>
            <MfTitle
              refWidth={356}
              widthGrowth={1.4}
              tokens={lockup(35, 39, -2.45)}
              lines={[
                [{ text: "O QUE COMEÇOU" }],
                [{ text: "COM PAPEL E PAPELÃO" }],
                [{ text: "HOJE CONECTA" }],
                [{ text: "OPERAÇÃO,", gold: true }],
                [{ text: "TECNOLOGIA E" }],
                [{ text: "SUSTENTABILIDADE.", green: true }],
              ]}
            />
          </MfCenter>
          <MfBottom>
            <MfBody tokens={MOBILE_BODY_TOKENS}>
              Há 40 anos transformando o presente, pensando no futuro.
            </MfBody>
            <MfActions marginTop="8px">
              <MfButton variant="secondary" href="/contato">
                Entre em contato com o Grupo Almeida
              </MfButton>
            </MfActions>
          </MfBottom>
        </MfFrame>
        <MfScrollHint onAdvance={onAdvance} />
      </div>
    </>
  );
}

export function Section09Content({ onAdvance }: { onAdvance: () => void }) {
  // Dois refs (desktop/mobile) em vez de um wrapper comum: os dois blocos
  // já existem lado a lado (um deles sempre display:none via CSS conforme
  // o breakpoint) — o observer dispara pelo primeiro que intersectar de
  // verdade, sem precisar de um elemento extra em volta dos dois.
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const active = useEnterOnce([desktopRef, mobileRef]);

  return (
    <>
      {/* Desktop: sem DTop (igual ao mobile, sem "Impacto Positivo ·
          2025"). Headline e cluster de métricas+CTA dividem DMain lado a
          lado, os dois com o mesmo peso vertical (align-self:center) — o
          CTA fica integrado logo abaixo das métricas, não flutuando
          isolado (regra 21 da tarefa). Métricas em grid 2×2 — adaptação
          intencional para telas largas (mobile: coluna única). Última
          dobra antes do footer: o chevron avança para o rodapé (mesmo
          mecanismo já usado entre as demais dobras). */}
      <div className="desktop-only d-stage" ref={desktopRef}>
        <DFrame>
          <DMain>
            <DTitle
              colA={1}
              colB={6}
              maxWidth="600px"
              align="left"
              plain
              {...HEADLINE_FONT}
              lines={[
                [{ text: "Cada resíduo" }],
                [{ text: "processado vira um" }],
                [{ text: "número que a" }],
                [{ text: "natureza reconhece.", gold: true }],
              ]}
            />
            <DImpactCluster colA={7} colB={13}>
              <DMetricsGrid
                metrics={IMPACT_METRICS.map((m) => ({
                  value: (
                    <CountUpMetric
                      target={m.target}
                      format={m.format}
                      suffix={m.suffix}
                      display={m.display}
                      active={active}
                    />
                  ),
                  label: m.label,
                }))}
              />
              {/* Relatório de Sustentabilidade 2025 ainda não disponível no
                  projeto: botão fica sem destino definitivo nesta etapa
                  (ver DECISOES.md). */}
              <DActions>
                <DButton variant="secondary" disabled>
                  Ver Relatório de Sustentabilidade 2025
                </DButton>
              </DActions>
            </DImpactCluster>
          </DMain>
          <DHint isLast onAdvance={onAdvance} />
        </DFrame>
      </div>

      {/* Sem "Impacto Positivo · 2025" no mobile. Métricas empilhadas em coluna
          única no mobile puro, grid 2×2 a partir do tablet. Headline
          centralizada (regra 21 — única exceção da Home é a Hero). Última
          dobra antes do footer: chevron avança para o rodapé. */}
      <div className="mobile-fidelity mf-section-frame" ref={mobileRef}>
        <MfFrame>
          <MfCenter>
            <MfTitle
              refWidth={321}
              tokens={lockup(35, 30, -0.35)}
              plain
              lines={[
                [{ text: "Cada resíduo" }],
                [{ text: "processado vira um" }],
                [{ text: "número que a" }],
                [{ text: "natureza reconhece.", gold: true }],
              ]}
            />
          </MfCenter>
          <MfBottom>
            <MfMetrics gap={rhythm(24)}>
              {IMPACT_METRICS.map((m) => (
                <MfMetric
                  key={m.label}
                  value={
                    <CountUpMetric
                      target={m.target}
                      format={m.format}
                      suffix={m.suffix}
                      display={m.display}
                      active={active}
                    />
                  }
                  label={m.label}
                  valueTokens={metricValueTokens}
                  labelTokens={metricLabelTokens}
                />
              ))}
            </MfMetrics>
            {/* Regra 30 da tarefa: mínimo de 24px entre o fim do bloco de
                métricas e o início do CTA — não os 8px usados nas outras
                dobras (body → botão), porque aqui o vizinho de cima são
                números grandes, não texto corrido. */}
            <MfActions marginTop="24px">
              <MfButton variant="secondary" disabled>
                Ver Relatório de Sustentabilidade 2025
              </MfButton>
            </MfActions>
          </MfBottom>
        </MfFrame>
        <MfScrollHint isLast onAdvance={onAdvance} />
      </div>
    </>
  );
}
