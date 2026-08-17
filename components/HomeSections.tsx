import {
  MfActions,
  MfBody,
  MfButton,
  MfFrame,
  MfLabel,
  MfMetric,
  MfMetrics,
  MfRegion,
  MfScrollHint,
  MfSubtitle,
  MfTitle,
} from "./MobileDobra";
import { DBody, DButton, DMetricsGrid, DNameBlock, DScrollHint, DTitle } from "./DesktopDobra";
import { framePaddingTop, lockup, rhythm } from "../lib/responsive-type";

/**
 * Conteúdo real das dobras 2 a 9 da Home (dobra 1 continua em HeroContent.tsx).
 *
 * Cada dobra renderiza dois blocos independentes:
 * - Desktop (>=1024px, `.desktop-only`): composição editorial própria
 *   (`.d-stage`, ver components/DesktopDobra.tsx) — cada dobra com sua
 *   própria distribuição em 12 colunas conceituais.
 * - Mobile+tablet (<1024px, `.mobile-fidelity`): layout de fluxo (`MfFrame`,
 *   ver components/MobileDobra.tsx) — topo (nome/subtítulo) e o bloco de
 *   baixo (corpo/CTA) ficam ancorados às extremidades da dobra via
 *   `MfRegion` (espaçador flex-grow) em vez de um `marginTop` encadeado, e
 *   cada dobra escolhe seu próprio alinhamento de tablet (`tabletAlign`,
 *   espelhando o `align` que a mesma dobra já usa no desktop), sem canvas
 *   fixo nem coordenadas absolutas.
 */

/* fontSize responde a largura E altura (vw + svh) — não só vw — para não
   ficar apertado em notebooks baixos (1280×720, 1366×768) mesmo quando a
   largura sobra (Seção 12/40 da tarefa). */
const HEADLINE_FONT = { fontSize: "clamp(48px, 2.2vw + 2.6svh, 64px)", lineHeight: 0.98 };

/** Dobra 9 (Impacto): tokens dos números/labels das métricas mobile. */
const metricValueTokens = lockup(38, 42, 0);
const metricLabelTokens = lockup(13, 15, 0);

export function Section02Content() {
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
        <DScrollHint />
      </div>

      {/* Sem subtítulo/serviços nesta dobra no Figma atual (só a D3 mantém
          uma linha de localização abaixo do nome — não normalizar). */}
      <div className="mobile-fidelity mf-section-frame">
        <MfFrame tabletAlign="left" paddingTop={framePaddingTop(145)}>
          <MfLabel tokens={lockup(29, 30, 2.61)}>Almeida Ambiental</MfLabel>
          <MfRegion weight={177} />
          <MfTitle
            refWidth={348}
            tokens={lockup(35, 41, 0.7)}
            lines={[[{ text: "RESÍDUOS GANHAM" }], [{ text: "UM NOVO " }, { text: "DESTINO", gold: true }]]}
          />
          <MfRegion weight={186} />
          <MfBody refWidth={326} tokens={lockup(16, 16, -1.12)}>
            Há quatro décadas, conhecimento técnico e experiência operacional se encontram na gestão
            responsável de resíduos.
          </MfBody>
        </MfFrame>
        <MfScrollHint />
      </div>
    </>
  );
}

export function Section03Content() {
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
        <DScrollHint />
      </div>

      <div className="mobile-fidelity mf-section-frame">
        <MfFrame tabletAlign="left" paddingTop={framePaddingTop(144)}>
          <MfLabel tokens={lockup(29, 30, 2.9)}>Almeida Ambiental</MfLabel>
          <MfSubtitle marginTop={rhythm(6)} tokens={lockup(14, 30, 1.12)}>
            São José · Joinville · Araquari · Chapecó · SC
          </MfSubtitle>
          <MfRegion weight={102} />
          <MfTitle
            refWidth={350}
            tokens={lockup(35, 30, 3.5)}
            lines={[
              [{ text: "EFICIÊNCIA", gold: true }, { text: " EM" }],
              [{ text: "CADA ETAPA" }],
              [{ text: "DO PROCESSO" }],
            ]}
          />
          <MfRegion weight={58} />
          <MfBody refWidth={335} tokens={lockup(16, 16, -1.12)}>
            Da coleta à destinação, a Almeida Ambiental reúne estrutura, tecnologia e experiência para
            transformar resíduos em valor, com mais eficiência logística, segurança e responsabilidade
            ambiental.
          </MfBody>
          <MfActions marginTop={rhythm(60)}>
            <MfButton variant="secondary" href="/almeida-ambiental">
              Conheça Almeida Ambiental
            </MfButton>
          </MfActions>
        </MfFrame>
        <MfScrollHint />
      </div>
    </>
  );
}

export function Section04Content() {
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
        <DScrollHint />
      </div>

      <div className="mobile-fidelity mf-section-frame">
        <MfFrame tabletAlign="right" paddingTop={framePaddingTop(143)}>
          <MfLabel tokens={lockup(29, 30, -0.87)}>Almeida Equipamentos</MfLabel>
          <MfRegion weight={129} />
          <MfTitle
            refWidth={333}
            tokens={lockup(35, 30, -1.4)}
            lines={[
              [{ text: "TECNOLOGIA", gold: true }, { text: " QUE" }],
              [{ text: "NASCEU DA" }],
              [{ text: "PRÓPRIA OPERAÇÃO" }],
            ]}
          />
          <MfRegion weight={184} />
          <MfBody refWidth={326} tokens={lockup(16, 16, -0.64)}>
            Criada para aperfeiçoar os processos do Grupo Almeida, a Almeida Equipamentos transforma
            décadas de experiência no setor em tecnologia aplicada à gestão de resíduos.
          </MfBody>
        </MfFrame>
        <MfScrollHint />
      </div>
    </>
  );
}

export function Section05Content() {
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
        <DScrollHint />
      </div>

      <div className="mobile-fidelity mf-section-frame">
        <MfFrame tabletAlign="right" paddingTop={framePaddingTop(142)}>
          <MfLabel tokens={lockup(29, 30, -0.87)}>Almeida Equipamentos</MfLabel>
          <MfRegion weight={154} />
          <MfTitle
            refWidth={351}
            tokens={lockup(35, 30, 1.4)}
            lines={[[{ text: "ENGENHARIA PARA" }], [{ text: "MOVIMENTAR" }], [{ text: "MAIS COM MENOS", gold: true }]]}
          />
          <MfRegion weight={78} />
          <MfBody refWidth={335} tokens={lockup(16, 16, -0.64)}>
            Compactadores, prensas e tecnologias desenvolvidas para diferentes materiais, volumes e
            realidades operacionais.
          </MfBody>
          <MfBody marginTop={rhythm(14)} refWidth={335} tokens={lockup(16, 16, -0.64)}>
            Conhecimento de campo conectado a tecnologias internacionais.
          </MfBody>
          <MfActions marginTop={rhythm(17)}>
            <MfButton variant="secondary" href="/almeida-equipamentos">
              Conheça Almeida Equipamentos
            </MfButton>
          </MfActions>
        </MfFrame>
        <MfScrollHint />
      </div>
    </>
  );
}

export function Section06Content() {
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
        <DScrollHint />
      </div>

      <div className="mobile-fidelity mf-section-frame">
        <MfFrame tabletAlign="left" paddingTop={framePaddingTop(143)}>
          <MfLabel tokens={lockup(29, 30, 2.61)}>Saturno Ambiental</MfLabel>
          <MfRegion weight={142} />
          <MfTitle
            refWidth={350}
            tokens={lockup(35, 30, 2.1)}
            lines={[[{ text: "EXPERIÊNCIA", gold: true }], [{ text: "REGIONAL." }], [{ text: "FORÇA DE GRUPO." }]]}
          />
          {/* Espaço grande e proposital (193 vs 142 acima do título): preserva
              a razão medida no Figma, não normalizar para uma centralização
              exata. */}
          <MfRegion weight={193} />
          <MfBody refWidth={334} tokens={lockup(15, 16, -0.15)}>
            Em Blumenau, a Saturno Ambiental amplia a presença do Grupo Almeida e aproxima décadas de
            conhecimento em gestão de resíduos das operações da região.
          </MfBody>
        </MfFrame>
        <MfScrollHint />
      </div>
    </>
  );
}

export function Section07Content() {
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
        <DScrollHint />
      </div>

      <div className="mobile-fidelity mf-section-frame">
        <MfFrame tabletAlign="left" paddingTop={framePaddingTop(144)}>
          <MfLabel tokens={lockup(29, 30, 2.61)}>Saturno Ambiental</MfLabel>
          <MfRegion weight={147} />
          <MfTitle
            refWidth={353}
            tokens={lockup(35, 35, 0.35)}
            lines={[
              [{ text: "GESTÃO AMBIENTAL" }],
              [{ text: "QUE " }, { text: "VAI ALÉM", gold: true }],
              [{ text: "DA COLETA" }],
            ]}
          />
          <MfRegion weight={91} />
          <MfBody refWidth={325} tokens={lockup(16, 16, -0.16)}>
            Coleta, triagem, trituração, cartonagem e consultoria ambiental fazem parte de uma atuação
            construída para unir eficiência operacional e responsabilidade ambiental.
          </MfBody>
          <MfActions marginTop={rhythm(15)}>
            <MfButton variant="secondary" href="/saturno-ambiental">
              Conheça Saturno Ambiental
            </MfButton>
          </MfActions>
        </MfFrame>
        <MfScrollHint />
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
export function Section08Content() {
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
        <DScrollHint />
      </div>

      {/* Dobra sem nome/subtítulo: título+corpo+botão ficam alinhados à
          esquerda (não centralizados como nas demais dobras — confirmado
          no Figma atual). Seis linhas exatas, nenhuma junta às outras. */}
      <div className="mobile-fidelity mf-section-frame">
        <MfFrame tabletAlign="left" paddingTop={framePaddingTop(173, { floorScale: 0.45 })}>
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
          <MfRegion weight={133} />
          <MfBody refWidth={325} tokens={lockup(16, 16, -1.12)}>
            Há 40 anos transformando o presente, pensando no futuro.
          </MfBody>
          <MfActions marginTop={rhythm(21)}>
            <MfButton variant="secondary" href="/contato">
              Entre em contato com o Grupo Almeida
            </MfButton>
          </MfActions>
        </MfFrame>
        <MfScrollHint />
      </div>
    </>
  );
}

export function Section09Content() {
  return (
    <>
      {/* Desktop: sem "Impacto Positivo · 2025" (igual ao mobile). Métricas em
          grid 2×2 — adaptação intencional para telas largas (mobile: coluna
          única). Sem indicador de rolagem: depois dela vem o footer. */}
      <div className="desktop-only d-stage">
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
          metrics={[
            { value: "818.907", label: "árvores preservadas" },
            { value: "54.873 t", label: "materiais reciclados" },
            { value: "153.114 t", label: "CO₂ evitadas" },
            { value: "1,27 bi", label: "litros de água economizados" },
          ]}
        />
        {/* Relatório de Sustentabilidade 2025 ainda não disponível no projeto:
            botão fica sem destino definitivo nesta etapa (ver DECISOES.md). */}
        <DButton top="72%" colA={7} colB={13} variant="secondary" disabled>
          Ver Relatório de Sustentabilidade 2025
        </DButton>
      </div>

      {/* Sem "Impacto Positivo · 2025" no mobile. Métricas empilhadas em coluna
          única no mobile puro, grid 2×2 a partir do tablet. Sem indicador de
          rolagem: depois dela vem o footer. */}
      <div className="mobile-fidelity mf-section-frame">
        <MfFrame tabletAlign="left" paddingTop={framePaddingTop(88, { floorScale: 0.45 })}>
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
          <MfRegion weight={42} />
          <MfMetrics gap={rhythm(24)}>
            <MfMetric value="818.907" label="árvores preservadas" valueTokens={metricValueTokens} labelTokens={metricLabelTokens} />
            <MfMetric value="54.873 t" label="materiais reciclados" valueTokens={metricValueTokens} labelTokens={metricLabelTokens} />
            <MfMetric value="153.114 t" label="CO₂ evitadas" valueTokens={metricValueTokens} labelTokens={metricLabelTokens} />
            <MfMetric value="1,27 bi" label="litros de água economizados" valueTokens={metricValueTokens} labelTokens={metricLabelTokens} />
          </MfMetrics>
          <MfRegion weight={33} />
          <MfActions>
            <MfButton variant="secondary" disabled>
              Ver Relatório de Sustentabilidade 2025
            </MfButton>
          </MfActions>
        </MfFrame>
      </div>
    </>
  );
}
