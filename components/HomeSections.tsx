"use client";

import { useRef } from "react";
import {
  MfActions,
  MfBody,
  MfBottom,
  MfButton,
  MfCenter,
  MfFrame,
  MfLabel,
  MfMetric,
  MfMetrics,
  MfScrollHint,
  MfSubtitle,
  MfTitle,
} from "./MobileDobra";
import { DBody, DButton, DMetricsGrid, DNameBlock, DScrollHint, DTitle } from "./DesktopDobra";
import { CountUpMetric, useEnterOnce, type MetricFormat } from "./AnimatedMetric";
import { lockup, rhythm } from "../lib/responsive-type";

/**
 * Conteúdo real das dobras 2 a 9 da Home (dobra 1 continua em HeroContent.tsx).
 *
 * Cada dobra renderiza dois blocos independentes:
 * - Desktop (>=1024px, `.desktop-only`): composição editorial própria
 *   (`.d-stage`, ver components/DesktopDobra.tsx) — cada dobra com sua
 *   própria distribuição em 12 colunas conceituais.
 * - Mobile+tablet (<1024px, `.mobile-fidelity`): três regiões explícitas
 *   (`MfCenter` para a headline, `MfBottom` para corpo/CTA — ver
 *   components/MobileDobra.tsx), sem canvas fixo nem coordenadas
 *   absolutas. `onAdvance` dispara o mesmo mecanismo de transição usado
 *   pelo scroll (wheel) — ver `goToIndex` em ScrollVideoExperience.tsx.
 */

/* fontSize responde a largura E altura (vw + svh) — não só vw — para não
   ficar apertado em notebooks baixos (1280×720, 1366×768) mesmo quando a
   largura sobra (Seção 12/40 da tarefa). */
const HEADLINE_FONT = { fontSize: "clamp(48px, 2.2vw + 2.6svh, 64px)", lineHeight: 0.98 };

/** Tokens do subtítulo/localização institucional (nome → 4px → subtítulo),
 *  compartilhados por todas as dobras 02–07 (regra 3 da tarefa: relação
 *  tipográfica única, não recalibrada dobra a dobra). */
const SUBTITLE_TOKENS = lockup(14, 18, 1);

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
        <DNameBlock
          top="18%"
          colA={1}
          colB={6}
          name="Almeida Ambiental"
          services="Diagnóstico · Coleta · Triagem · Trituração · Descaracterização"
        />
        <DTitle
          top="38%"
          colA={1}
          colB={8}
          maxWidth="760px"
          align="left"
          {...HEADLINE_FONT}
          lines={[[{ text: "RESÍDUOS GANHAM" }], [{ text: "UM NOVO " }, { text: "DESTINO", gold: true }]]}
        />
        <DBody top="49%" colA={9} colB={13} maxWidth="420px" align="left">
          Há quatro décadas, conhecimento técnico e experiência operacional se encontram na gestão
          responsável de resíduos.
        </DBody>
        <DScrollHint onAdvance={onAdvance} />
      </div>

      <div className="mobile-fidelity mf-section-frame">
        <MfFrame tabletAlign="left">
          <MfLabel tokens={lockup(29, 30, 2.61)}>Almeida Ambiental</MfLabel>
          <MfSubtitle tokens={SUBTITLE_TOKENS}>
            Diagnóstico · Coleta · Triagem · Trituração · Descaracterização
          </MfSubtitle>
          <MfCenter>
            <MfTitle
              refWidth={348}
              tokens={lockup(35, 41, 0.7)}
              lines={[[{ text: "RESÍDUOS GANHAM" }], [{ text: "UM NOVO " }, { text: "DESTINO", gold: true }]]}
            />
          </MfCenter>
          <MfBottom>
            <MfBody tokens={lockup(16, 16, -1.12)}>
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
        <DNameBlock
          top="18%"
          colA={1}
          colB={6}
          name="Almeida Ambiental"
          services="São José · Joinville · Araquari · Chapecó · SC"
        />
        <DTitle
          top="37%"
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
        <DBody top="42%" colA={8} colB={13} maxWidth="460px" align="left">
          Da coleta à destinação, a Almeida Ambiental reúne estrutura, tecnologia e experiência para
          transformar resíduos em valor, com mais eficiência logística, segurança e responsabilidade
          ambiental.
        </DBody>
        <DButton top="66%" colA={8} colB={13} variant="secondary" href="/almeida-ambiental">
          Conheça Almeida Ambiental
        </DButton>
        <DScrollHint onAdvance={onAdvance} />
      </div>

      <div className="mobile-fidelity mf-section-frame">
        <MfFrame tabletAlign="left">
          <MfLabel tokens={lockup(29, 30, 2.9)}>Almeida Ambiental</MfLabel>
          <MfSubtitle tokens={SUBTITLE_TOKENS}>São José · Joinville · Araquari · Chapecó · SC</MfSubtitle>
          <MfCenter>
            <MfTitle
              refWidth={350}
              tokens={lockup(35, 30, 3.5)}
              lines={[
                [{ text: "EFICIÊNCIA", gold: true }, { text: " EM" }],
                [{ text: "CADA ETAPA" }],
                [{ text: "DO PROCESSO" }],
              ]}
            />
          </MfCenter>
          <MfBottom>
            <MfBody tokens={lockup(16, 16, -1.12)}>
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
        <DNameBlock
          top="18%"
          colA={7}
          colB={13}
          align="right"
          name="Almeida Equipamentos"
          services="Compactadores · Prensas · Trituradores · Containers"
        />
        <DTitle
          top="38%"
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
        <DBody top="50%" colA={1} colB={6} maxWidth="480px" align="left">
          Criada para aperfeiçoar os processos do Grupo Almeida, a Almeida Equipamentos transforma
          décadas de experiência no setor em tecnologia aplicada à gestão de resíduos.
        </DBody>
        <DScrollHint onAdvance={onAdvance} />
      </div>

      <div className="mobile-fidelity mf-section-frame">
        <MfFrame tabletAlign="right">
          <MfLabel tokens={lockup(29, 30, -0.87)}>Almeida Equipamentos</MfLabel>
          <MfSubtitle tokens={SUBTITLE_TOKENS}>Compactadores · Prensas · Trituradores · Containers</MfSubtitle>
          <MfCenter>
            <MfTitle
              refWidth={333}
              tokens={lockup(35, 30, -1.4)}
              lines={[
                [{ text: "TECNOLOGIA", gold: true }, { text: " QUE" }],
                [{ text: "NASCEU DA" }],
                [{ text: "PRÓPRIA OPERAÇÃO" }],
              ]}
            />
          </MfCenter>
          <MfBottom>
            <MfBody tokens={lockup(16, 16, -0.64)}>
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
        <DNameBlock top="18%" colA={7} colB={13} align="right" name="Almeida Equipamentos" services="São José · SC" />
        <DTitle
          top="35%"
          colA={6}
          colB={13}
          maxWidth="760px"
          align="right"
          {...HEADLINE_FONT}
          lines={[[{ text: "ENGENHARIA PARA" }], [{ text: "MOVIMENTAR" }], [{ text: "MAIS COM MENOS", gold: true }]]}
        />
        <DBody top="43%" colA={1} colB={6} maxWidth="500px" align="left">
          Compactadores, prensas e tecnologias desenvolvidas para diferentes materiais, volumes e
          realidades operacionais.
        </DBody>
        <DBody top="54%" colA={1} colB={6} maxWidth="500px" align="left">
          Conhecimento de campo conectado a tecnologias internacionais.
        </DBody>
        <DButton top="68%" colA={1} colB={6} variant="secondary" href="/almeida-equipamentos">
          Conheça Almeida Equipamentos
        </DButton>
        <DScrollHint onAdvance={onAdvance} />
      </div>

      <div className="mobile-fidelity mf-section-frame">
        <MfFrame tabletAlign="right">
          <MfLabel tokens={lockup(29, 30, -0.87)}>Almeida Equipamentos</MfLabel>
          <MfSubtitle tokens={SUBTITLE_TOKENS}>São José · SC</MfSubtitle>
          <MfCenter>
            <MfTitle
              refWidth={351}
              tokens={lockup(35, 30, 1.4)}
              lines={[[{ text: "ENGENHARIA PARA" }], [{ text: "MOVIMENTAR" }], [{ text: "MAIS COM MENOS", gold: true }]]}
            />
          </MfCenter>
          <MfBottom>
            <MfBody tokens={lockup(16, 16, -0.64)}>
              Compactadores, prensas e tecnologias desenvolvidas para diferentes materiais, volumes e
              realidades operacionais.
            </MfBody>
            <MfBody marginTop={rhythm(14)} tokens={lockup(16, 16, -0.64)}>
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
        <DNameBlock
          top="18%"
          colA={1}
          colB={6}
          name="Saturno Ambiental"
          services="Gestão de Resíduos · Cartonagem · Consultoria"
        />
        <DTitle
          top="37%"
          colA={1}
          colB={8}
          maxWidth="760px"
          align="left"
          {...HEADLINE_FONT}
          lines={[[{ text: "EXPERIÊNCIA", gold: true }], [{ text: "REGIONAL." }], [{ text: "FORÇA DE GRUPO." }]]}
        />
        {/* Grande espaço proposital entre headline (top 37%) e body (top 58%): não aproximar. */}
        <DBody top="58%" colA={8} colB={13} maxWidth="440px" align="left">
          Em Blumenau, a Saturno Ambiental amplia a presença do Grupo Almeida e aproxima décadas de
          conhecimento em gestão de resíduos das operações da região.
        </DBody>
        <DScrollHint onAdvance={onAdvance} />
      </div>

      <div className="mobile-fidelity mf-section-frame">
        <MfFrame tabletAlign="left">
          <MfLabel tokens={lockup(29, 30, 2.61)}>Saturno Ambiental</MfLabel>
          <MfSubtitle tokens={SUBTITLE_TOKENS}>Gestão de Resíduos · Cartonagem · Consultoria</MfSubtitle>
          <MfCenter>
            <MfTitle
              refWidth={350}
              tokens={lockup(35, 30, 2.1)}
              lines={[[{ text: "EXPERIÊNCIA", gold: true }], [{ text: "REGIONAL." }], [{ text: "FORÇA DE GRUPO." }]]}
            />
          </MfCenter>
          <MfBottom>
            <MfBody tokens={lockup(15, 16, -0.15)}>
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
        <DNameBlock
          top="18%"
          colA={7}
          colB={13}
          align="right"
          name="Saturno Ambiental"
          services="Blumenau · Vale do Itajaí"
        />
        <DTitle
          top="36%"
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
        <DBody top="45%" colA={8} colB={13} maxWidth="460px" align="left">
          Coleta, triagem, trituração, cartonagem e consultoria ambiental fazem parte de uma atuação
          construída para unir eficiência operacional e responsabilidade ambiental.
        </DBody>
        <DButton top="68%" colA={8} colB={13} variant="secondary" href="/saturno-ambiental">
          Conheça Saturno Ambiental
        </DButton>
        <DScrollHint onAdvance={onAdvance} />
      </div>

      <div className="mobile-fidelity mf-section-frame">
        <MfFrame tabletAlign="left">
          <MfLabel tokens={lockup(29, 30, 2.61)}>Saturno Ambiental</MfLabel>
          <MfSubtitle tokens={SUBTITLE_TOKENS}>Blumenau · Vale do Itajaí</MfSubtitle>
          <MfCenter>
            <MfTitle
              refWidth={353}
              tokens={lockup(35, 35, 0.35)}
              lines={[
                [{ text: "GESTÃO AMBIENTAL" }],
                [{ text: "QUE " }, { text: "VAI ALÉM", gold: true }],
                [{ text: "DA COLETA" }],
              ]}
            />
          </MfCenter>
          <MfBottom>
            <MfBody tokens={lockup(16, 16, -0.16)}>
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
      {/* Desktop: 4 linhas explícitas (não 6 como no mobile) — só a quebra
          muda por causa da largura maior, a copy continua a mesma. */}
      <div className="desktop-only d-stage">
        <DTitle
          top="18%"
          centerX
          maxWidth="min(1000px, 80vw)"
          align="center"
          fontSize="clamp(54px, 2.6vw + 3svh, 72px)"
          lineHeight={1.02}
          letterSpacing="-2px"
          lines={[
            [{ text: "O QUE COMEÇOU" }],
            [{ text: "COM PAPEL E PAPELÃO" }],
            [{ text: "HOJE CONECTA " }, { text: "OPERAÇÃO,", gold: true }],
            [{ text: "TECNOLOGIA E " }, { text: "SUSTENTABILIDADE.", green: true }],
          ]}
        />
        <DBody top="67%" centerX maxWidth="620px" align="center" fontSize="18px">
          Há 40 anos transformando o presente, pensando no futuro.
        </DBody>
        <DButton top="77%" centerX variant="secondary" href="/contato">
          Entre em contato com o Grupo Almeida
        </DButton>
        <DScrollHint onAdvance={onAdvance} />
      </div>

      {/* Dobra sem nome/subtítulo: título+corpo+botão ficam alinhados à
          esquerda (não centralizados como nas demais dobras — confirmado
          no Figma atual). Seis linhas exatas, nenhuma junta às outras. */}
      <div className="mobile-fidelity mf-section-frame">
        <MfFrame tabletAlign="left">
          <MfCenter align="left">
            <MfTitle
              refWidth={356}
              widthGrowth={1.4}
              align="left"
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
          <MfBottom align="left">
            <MfBody tokens={lockup(16, 16, -1.12)}>
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
      {/* Desktop: sem "Impacto Positivo · 2025" (igual ao mobile). Métricas em
          grid 2×2 — adaptação intencional para telas largas (mobile: coluna
          única). Última dobra antes do footer: o chevron avança para o
          rodapé (mesmo mecanismo já usado entre as demais dobras). */}
      <div className="desktop-only d-stage" ref={desktopRef}>
        <DTitle
          top="25%"
          colA={1}
          colB={6}
          maxWidth="600px"
          align="left"
          plain
          fontSize="clamp(48px, 2.2vw + 2.6svh, 64px)"
          lineHeight={0.98}
          lines={[
            [{ text: "Cada resíduo" }],
            [{ text: "processado vira um" }],
            [{ text: "número que a" }],
            [{ text: "natureza reconhece.", gold: true }],
          ]}
        />
        <DMetricsGrid
          top="24%"
          colA={7}
          colB={13}
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
        {/* Relatório de Sustentabilidade 2025 ainda não disponível no projeto:
            botão fica sem destino definitivo nesta etapa (ver DECISOES.md). */}
        <DButton top="72%" colA={7} colB={13} variant="secondary" disabled>
          Ver Relatório de Sustentabilidade 2025
        </DButton>
        <DScrollHint isLast onAdvance={onAdvance} />
      </div>

      {/* Sem "Impacto Positivo · 2025" no mobile. Métricas empilhadas em coluna
          única no mobile puro, grid 2×2 a partir do tablet. Última dobra
          antes do footer: chevron avança para o rodapé. */}
      <div className="mobile-fidelity mf-section-frame" ref={mobileRef}>
        <MfFrame tabletAlign="left">
          <MfCenter align="left">
            <MfTitle
              refWidth={321}
              tokens={lockup(35, 30, -0.35)}
              plain
              align="left"
              lines={[
                [{ text: "Cada resíduo" }],
                [{ text: "processado vira um" }],
                [{ text: "número que a" }],
                [{ text: "natureza reconhece.", gold: true }],
              ]}
            />
          </MfCenter>
          <MfBottom align="left">
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
            <MfActions marginTop="8px">
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
