import Link from "next/link";
import { ChevronDownIcon } from "./icons";
import { MfBody, MfButton, MfLabel, MfMetric, MfScrollHint, MfSubtitle, MfTitle } from "./MobileDobra";

/**
 * Conteúdo real das dobras 2 a 9 da Home (dobra 1 continua em HeroContent.tsx).
 *
 * Cada dobra renderiza dois blocos independentes:
 * - Desktop (>=1024px, `.desktop-only`): mecanismo genérico em CSS Grid da
 *   Decisão 25 (`.section-frame`/`.dobra-*`), intocado nesta rodada.
 * - Mobile (<1024px, `.mobile-fidelity`): prancheta de coordenadas por
 *   elemento da Decisão 26 (`.mf-section-frame`), referência 393px.
 */

function ScrollHint() {
  return (
    <div className="dobra-scroll-indicator" aria-hidden="true">
      <ChevronDownIcon />
    </div>
  );
}

export function Section02Content() {
  return (
    <>
      <div className="desktop-only section-frame">
        <div className="dobra-top">
          <p className="dobra-eyebrow">Almeida Ambiental</p>
          <p className="dobra-tags">
            <span>Diagnóstico</span>
            <span className="dobra-sep">·</span>
            <span>Coleta</span>
            <span className="dobra-sep">·</span>
            <span>Triagem</span>
            <span className="dobra-sep">·</span>
            <span>Trituração</span>
            <span className="dobra-sep">·</span>
            <span>Descaracterização</span>
          </p>
        </div>
        <div className="dobra-center">
          <h2 className="dobra-title">
            <span>RESÍDUOS GANHAM</span>
            <span>
              UM NOVO <em className="dobra-title-gold">DESTINO</em>
            </span>
          </h2>
          <p className="dobra-body">
            Há quatro décadas, conhecimento técnico e experiência operacional se encontram na gestão
            responsável de resíduos.
          </p>
        </div>
        <div className="dobra-bottom">
          <ScrollHint />
        </div>
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
      <div className="desktop-only section-frame">
        <div className="dobra-top">
          <p className="dobra-eyebrow">Almeida Ambiental</p>
          <p className="dobra-tags">São José · Joinville · Araquari · Chapecó · SC</p>
        </div>
        <div className="dobra-center">
          <h2 className="dobra-title">
            <span>
              <em className="dobra-title-gold">EFICIÊNCIA</em> EM
            </span>
            <span>CADA ETAPA</span>
            <span>DO PROCESSO</span>
          </h2>
          <p className="dobra-body">
            Da coleta à destinação, a Almeida Ambiental reúne estrutura, tecnologia e experiência para
            transformar resíduos em valor, com mais eficiência logística, segurança e responsabilidade
            ambiental.
          </p>
        </div>
        <div className="dobra-bottom">
          <div className="dobra-actions">
            <Link href="/almeida-ambiental" className="dobra-btn dobra-btn-secondary">
              Conheça Almeida Ambiental
            </Link>
          </div>
          <ScrollHint />
        </div>
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
      <div className="desktop-only section-frame">
        <div className="dobra-top">
          <p className="dobra-eyebrow">Almeida Equipamentos</p>
          <p className="dobra-tags">
            <span>Compactadores</span>
            <span className="dobra-sep">·</span>
            <span>Prensas</span>
            <span className="dobra-sep">·</span>
            <span>Trituradores</span>
            <span className="dobra-sep">·</span>
            <span>Containers</span>
          </p>
        </div>
        <div className="dobra-center">
          <h2 className="dobra-title">
            <span>
              <em className="dobra-title-gold">TECNOLOGIA</em> QUE
            </span>
            <span>NASCEU DA</span>
            <span>PRÓPRIA OPERAÇÃO</span>
          </h2>
          <p className="dobra-body">
            Criada para aperfeiçoar os processos do Grupo Almeida, a Almeida Equipamentos transforma
            décadas de experiência no setor em tecnologia aplicada à gestão de resíduos.
          </p>
        </div>
        <div className="dobra-bottom">
          <ScrollHint />
        </div>
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
      <div className="desktop-only section-frame">
        <div className="dobra-top">
          <p className="dobra-eyebrow">Almeida Equipamentos</p>
          <p className="dobra-tags">São José · SC</p>
        </div>
        <div className="dobra-center">
          <h2 className="dobra-title">
            <span>ENGENHARIA PARA</span>
            <span>MOVIMENTAR</span>
            <em className="dobra-title-gold">MAIS COM MENOS</em>
          </h2>
          <p className="dobra-body">
            Compactadores, prensas e tecnologias desenvolvidas para diferentes materiais, volumes e
            realidades operacionais.
          </p>
          <p className="dobra-body">Conhecimento de campo conectado a tecnologias internacionais.</p>
        </div>
        <div className="dobra-bottom">
          <div className="dobra-actions">
            <Link href="/almeida-equipamentos" className="dobra-btn dobra-btn-secondary">
              Conheça Almeida Equipamentos
            </Link>
          </div>
          <ScrollHint />
        </div>
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
      <div className="desktop-only section-frame">
        <div className="dobra-top">
          <p className="dobra-eyebrow">Saturno Ambiental</p>
          <p className="dobra-tags">
            <span>Gestão de Resíduos</span>
            <span className="dobra-sep">·</span>
            <span>Cartonagem</span>
            <span className="dobra-sep">·</span>
            <span>Consultoria</span>
          </p>
        </div>
        <div className="dobra-center">
          <h2 className="dobra-title">
            <em className="dobra-title-gold">EXPERIÊNCIA</em>
            <span>REGIONAL.</span>
            <span>FORÇA DE GRUPO.</span>
          </h2>
          <p className="dobra-body">
            Em Blumenau, a Saturno Ambiental amplia a presença do Grupo Almeida e aproxima décadas de
            conhecimento em gestão de resíduos das operações da região.
          </p>
        </div>
        <div className="dobra-bottom">
          <ScrollHint />
        </div>
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
      <div className="desktop-only section-frame">
        <div className="dobra-top">
          <p className="dobra-eyebrow">Saturno Ambiental</p>
          <p className="dobra-tags">Blumenau · Vale do Itajaí</p>
        </div>
        <div className="dobra-center">
          <h2 className="dobra-title">
            <span>GESTÃO AMBIENTAL</span>
            <span>
              QUE <em className="dobra-title-gold">VAI ALÉM</em>
            </span>
            <span>DA COLETA</span>
          </h2>
          <p className="dobra-body">
            Coleta, triagem, trituração, cartonagem e consultoria ambiental fazem parte de uma atuação
            construída para unir eficiência operacional e responsabilidade ambiental.
          </p>
        </div>
        <div className="dobra-bottom">
          <div className="dobra-actions">
            <Link href="/saturno-ambiental" className="dobra-btn dobra-btn-secondary">
              Conheça Saturno Ambiental
            </Link>
          </div>
          <ScrollHint />
        </div>
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
      <div className="desktop-only section-frame">
        <div className="dobra-top" />
        <div className="dobra-center">
          <h2 className="dobra-title dobra-title-semibold">
            <span>O QUE COMEÇOU</span>
            <span>COM PAPEL E PAPELÃO</span>
            <span>HOJE CONECTA</span>
            <span>OPERAÇÃO, TECNOLOGIA</span>
            <span>E SUSTENTABILIDADE.</span>
          </h2>
          <p className="dobra-body">Há 40 anos transformando o presente, pensando no futuro.</p>
        </div>
        <div className="dobra-bottom">
          <div className="dobra-actions">
            <Link href="/contato" className="dobra-btn dobra-btn-secondary">
              Entre em contato com o Grupo Almeida
            </Link>
          </div>
          <ScrollHint />
        </div>
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
      <div className="desktop-only section-frame">
        <div className="dobra-top">
          <p className="dobra-eyebrow">Impacto Positivo · 2025</p>
        </div>
        <div className="dobra-center">
          <h2 className="dobra-title dobra-title-plain">
            <span>Cada resíduo</span>
            <span>processado vira um</span>
            <span>número que a</span>
            <em className="dobra-title-gold">natureza reconhece.</em>
          </h2>
          <ul className="dobra-metrics">
            <li className="dobra-metric">
              <p className="dobra-metric-value">818.907</p>
              <p className="dobra-metric-label">árvores preservadas</p>
            </li>
            <li className="dobra-metric">
              <p className="dobra-metric-value">54.873 t</p>
              <p className="dobra-metric-label">materiais reciclados</p>
            </li>
            <li className="dobra-metric">
              <p className="dobra-metric-value">153.114 t</p>
              <p className="dobra-metric-label">CO₂ evitadas</p>
            </li>
            <li className="dobra-metric">
              <p className="dobra-metric-value">1,27 bi</p>
              <p className="dobra-metric-label">litros de água economizados</p>
            </li>
          </ul>
        </div>
        <div className="dobra-bottom">
          <div className="dobra-actions">
            {/* Relatório de Sustentabilidade 2025 ainda não disponível no projeto:
                botão fica sem destino definitivo nesta etapa (ver DECISOES.md). */}
            <button type="button" className="dobra-btn dobra-btn-secondary" disabled>
              Ver Relatório de Sustentabilidade 2025
            </button>
          </div>
        </div>
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
