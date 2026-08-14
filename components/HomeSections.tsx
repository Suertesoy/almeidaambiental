import { MfBody, MfButton, MfLabel, MfMetric, MfScrollHint, MfSubtitle, MfTitle } from "./MobileDobra";
import { DBody, DButton, DMetricsGrid, DNameBlock, DScrollHint, DTitle } from "./DesktopDobra";

/**
 * Conteúdo real das dobras 2 a 9 da Home (dobra 1 continua em HeroContent.tsx).
 *
 * Cada dobra renderiza dois blocos independentes:
 * - Desktop (>=1024px, `.desktop-only`): composição editorial própria da
 *   Decisão 27 (`.d-stage`, ver components/DesktopDobra.tsx) — cada dobra
 *   com sua própria distribuição em 12 colunas conceituais.
 * - Mobile (<1024px, `.mobile-fidelity`): prancheta de coordenadas por
 *   elemento da Decisão 26 (`.mf-section-frame`), referência 393px — área
 *   protegida, não tocada nesta rodada.
 */

const HEADLINE_FONT = { fontSize: "clamp(48px, 4vw, 64px)", lineHeight: 0.98 };

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

      <div className="mobile-fidelity mf-section-frame">
        <MfLabel top={150} centerX={196.5} fontSize={24} lineHeight={30} letterSpacing={2.4}>
          Almeida Ambiental
        </MfLabel>
        <MfSubtitle top={185} centerX={196.5} fontSize={12} lineHeight={15}>
          Diagnóstico · Coleta · Triagem · Trituração · Descaracterização
        </MfSubtitle>
        <MfTitle
          top={289}
          left={17}
          width={359}
          fontSize={35}
          lineHeight={41}
          letterSpacing={-1.4}
          lines={[[{ text: "RESÍDUOS GANHAM" }], [{ text: "UM NOVO " }, { text: "DESTINO", gold: true }]]}
        />
        <MfBody top={474} left={52} width={289} fontSize={14} lineHeight={15} letterSpacing={-0.98}>
          Há quatro décadas, conhecimento técnico e experiência operacional se encontram na gestão
          responsável de resíduos.
        </MfBody>
        <MfScrollHint bottom={22} />
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
        <MfLabel top={153} centerX={196.5} fontSize={24} lineHeight={30} letterSpacing={2.4}>
          Almeida Ambiental
        </MfLabel>
        <MfSubtitle top={186} centerX={196.5} fontSize={14} lineHeight={30} letterSpacing={-0.28}>
          São José · Joinville · Araquari · Chapecó · SC
        </MfSubtitle>
        <MfTitle
          top={282}
          left={41}
          width={311}
          fontSize={35}
          lineHeight={30}
          letterSpacing={-1.4}
          lines={[
            [{ text: "EFICIÊNCIA", gold: true }, { text: " EM" }],
            [{ text: "CADA ETAPA" }],
            [{ text: "DO PROCESSO" }],
          ]}
        />
        <MfBody top={470} left={39.5} width={314} fontSize={14} lineHeight={15} letterSpacing={-0.98}>
          Da coleta à destinação, a Almeida Ambiental reúne estrutura, tecnologia e experiência para
          transformar resíduos em valor, com mais eficiência logística, segurança e responsabilidade
          ambiental.
        </MfBody>
        <MfButton top={598} left={31} variant="secondary" href="/almeida-ambiental">
          Conheça Almeida Ambiental
        </MfButton>
        <MfScrollHint bottom={22} />
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
        <MfLabel top={154} centerX={196.5} fontSize={24} lineHeight={30} letterSpacing={-0.96}>
          Almeida Equipamentos
        </MfLabel>
        <MfSubtitle top={195} centerX={196.5} fontSize={12} lineHeight={15}>
          Compactadores · Prensas · Trituradores · Containers
        </MfSubtitle>
        <MfTitle
          top={280}
          left={30}
          width={333}
          fontSize={35}
          lineHeight={30}
          letterSpacing={-1.4}
          lines={[
            [{ text: "TECNOLOGIA", gold: true }, { text: " QUE" }],
            [{ text: "NASCEU DA" }],
            [{ text: "PRÓPRIA OPERAÇÃO" }],
          ]}
        />
        <MfBody top={458} left={42} width={309} fontSize={14} lineHeight={15} letterSpacing={-0.56}>
          Criada para aperfeiçoar os processos do Grupo Almeida, a Almeida Equipamentos transforma
          décadas de experiência no setor em tecnologia aplicada à gestão de resíduos.
        </MfBody>
        <MfScrollHint bottom={22} />
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

      {/* Composição deliberadamente deslocada à direita: centro em x=204,5px (não 196,5px). */}
      <div className="mobile-fidelity mf-section-frame">
        <MfLabel top={149} centerX={204.5} fontSize={24} lineHeight={30} letterSpacing={-0.96}>
          Almeida Equipamentos
        </MfLabel>
        <MfSubtitle top={187} centerX={204.5} fontSize={14} lineHeight={20}>
          São José · SC
        </MfSubtitle>
        <MfTitle
          top={276}
          left={40}
          width={329}
          fontSize={35}
          lineHeight={30}
          letterSpacing={-0.35}
          lines={[[{ text: "ENGENHARIA PARA" }], [{ text: "MOVIMENTAR" }], [{ text: "MAIS COM MENOS", gold: true }]]}
        />
        <MfBody top={445} left={36} width={337} fontSize={14} lineHeight={15} letterSpacing={-0.56}>
          Compactadores, prensas e tecnologias desenvolvidas para diferentes materiais, volumes e
          realidades operacionais.
        </MfBody>
        <MfBody top={489} left={36} width={337} fontSize={14} lineHeight={15} letterSpacing={-0.56}>
          Conhecimento de campo conectado a tecnologias internacionais.
        </MfBody>
        <MfButton top={598} left={29} variant="secondary" href="/almeida-equipamentos">
          Conheça Almeida Equipamentos
        </MfButton>
        <MfScrollHint bottom={22} />
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

      {/* Grande espaço proposital entre headline (top 277) e body (top 591): não aproximar. */}
      <div className="mobile-fidelity mf-section-frame">
        <MfLabel top={151} centerX={196.5} fontSize={24} lineHeight={30} letterSpacing={2.16}>
          Saturno Ambiental
        </MfLabel>
        <MfSubtitle top={188} centerX={196.5} fontSize={13} lineHeight={15}>
          Gestão de Resíduos · Cartonagem · Consultoria
        </MfSubtitle>
        <MfTitle
          top={277}
          left={37}
          width={334}
          fontSize={35}
          lineHeight={30}
          letterSpacing={-0.35}
          lines={[[{ text: "EXPERIÊNCIA", gold: true }], [{ text: "REGIONAL." }], [{ text: "FORÇA DE GRUPO." }]]}
        />
        <MfBody top={591} left={47} width={300} fontSize={15} lineHeight={15} letterSpacing={-0.15}>
          Em Blumenau, a Saturno Ambiental amplia a presença do Grupo Almeida e aproxima décadas de
          conhecimento em gestão de resíduos das operações da região.
        </MfBody>
        <MfScrollHint bottom={22} />
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
        <MfLabel top={149} centerX={196.5} fontSize={24} lineHeight={30} letterSpacing={2.16}>
          Saturno Ambiental
        </MfLabel>
        <MfSubtitle top={181} centerX={196.5} fontSize={14} lineHeight={20}>
          Blumenau · Vale do Itajaí
        </MfSubtitle>
        <MfTitle
          top={255}
          left={20}
          width={353}
          fontSize={35}
          lineHeight={35}
          letterSpacing={0.35}
          lines={[
            [{ text: "GESTÃO AMBIENTAL" }],
            [{ text: "QUE " }, { text: "VAI ALÉM", gold: true }],
            [{ text: "DA COLETA" }],
          ]}
        />
        <MfBody top={474} left={34} width={325} fontSize={14} lineHeight={15} letterSpacing={-0.14}>
          Coleta, triagem, trituração, cartonagem e consultoria ambiental fazem parte de uma atuação
          construída para unir eficiência operacional e responsabilidade ambiental.
        </MfBody>
        <MfButton top={593} left={29} variant="secondary" href="/saturno-ambiental">
          Conheça Saturno Ambiental
        </MfButton>
        <MfScrollHint bottom={22} />
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
          fontSize="clamp(54px, 4.8vw, 72px)"
          lineHeight={1.02}
          letterSpacing="-2px"
          lines={[
            [{ text: "O QUE COMEÇOU" }],
            [{ text: "COM PAPEL E PAPELÃO" }],
            [{ text: "HOJE CONECTA OPERAÇÃO," }],
            [{ text: "TECNOLOGIA E SUSTENTABILIDADE." }],
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

      {/* Seis linhas exatas, nenhuma junta às outras (headline ocupa 6×50px = 300px). */}
      <div className="mobile-fidelity mf-section-frame">
        <MfTitle
          top={145}
          left={19}
          width={356}
          fontSize={35}
          lineHeight={50}
          letterSpacing={-2.45}
          lines={[
            [{ text: "O QUE COMEÇOU" }],
            [{ text: "COM PAPEL E PAPELÃO" }],
            [{ text: "HOJE CONECTA" }],
            [{ text: "OPERAÇÃO," }],
            [{ text: "TECNOLOGIA E" }],
            [{ text: "SUSTENTABILIDADE." }],
          ]}
        />
        <MfBody top={507} left={16.5} width={360} fontSize={14} lineHeight={20} letterSpacing={0} nowrap>
          Há 40 anos transformando o presente, pensando no futuro.
        </MfBody>
        <MfButton top={595} left={29} variant="secondary" href="/contato">
          Entre em contato com o Grupo Almeida
        </MfButton>
        <MfScrollHint bottom={22} />
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
          fontSize="clamp(48px, 4vw, 64px)"
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
          única (não 2×2). Sem indicador de rolagem: depois dela vem o footer. */}
      <div className="mobile-fidelity mf-section-frame">
        <MfTitle
          top={92}
          left={34}
          width={321}
          fontSize={35}
          lineHeight={30}
          letterSpacing={-0.35}
          plain
          lines={[
            [{ text: "Cada resíduo" }],
            [{ text: "processado vira um" }],
            [{ text: "número que a" }],
            [{ text: "natureza reconhece.", gold: true }],
          ]}
        />
        <MfMetric top={254} value="818.907" label="árvores preservadas" />
        <MfMetric top={335} value="54.873 t" label="materiais reciclados" />
        <MfMetric top={424} value="153.114 t" label="CO₂ evitadas" />
        <MfMetric top={504} value="1,27 bi" label="litros de água economizados" />
        <MfButton top={596} left={29} variant="secondary" disabled>
          Ver Relatório de Sustentabilidade 2025
        </MfButton>
      </div>
    </>
  );
}
