import Link from "next/link";
import { mf } from "../lib/mobile-fit";
import { ChevronDownIcon } from "./icons";

/**
 * Conteúdo real das dobras 2 a 9 da Home (dobra 1 continua em HeroContent.tsx).
 *
 * Cada componente renderiza DOIS blocos irmãos:
 * - `.desktop-only` (>=1024px): o miolo ".section-grid" original, com o
 *   grid de posicionamento definido em app/globals.css a partir de 1024px.
 *   Não foi alterado nesta tarefa, exceto o conteúdo das dobras 8 e 9, que
 *   estava trocado em relação ao vídeo/Figma (ver DECISOES desta entrega).
 * - `.mobile-fidelity` (<1024px): estrutura nova, pixel-fiel aos
 *   screenshots do Figma (referência 393px), com medidas em `style` porque
 *   cada dobra tem tamanho/tracking/line-height/largura própria — não um
 *   componente genérico compartilhado (ver AGENTS/instrução da tarefa).
 *
 * Um indicador de rolagem (seta, sem texto) aparece nas dobras 2 a 8; a
 * dobra 9 não tem, por ser a última antes do footer.
 */

function MobileScrollHint() {
  return (
    <div className="mobile-fidelity mf-scroll-indicator" aria-hidden="true">
      <ChevronDownIcon />
    </div>
  );
}

export function Section02Content() {
  return (
    <>
      <div className="section-grid dobra-02 desktop-only">
        <div className="company-identity">
          <p className="company-name">Almeida Ambiental</p>
          <span className="company-divider" aria-hidden="true" />
          <div className="company-meta">
            <p className="company-role">Gestão e transformação de resíduos sólidos</p>
            <p className="company-location">São José · Joinville · Araquari · Chapecó · Santa Catarina</p>
          </div>
        </div>
        <h2 className="section-title">
          <span>RESÍDUOS GANHAM</span>
          <span>UM NOVO DESTINO</span>
        </h2>
        <p className="section-body">
          Há quatro décadas, conhecimento técnico e experiência operacional se encontram na gestão
          responsável de resíduos.
        </p>
        <p className="service-list">
          <span>Diagnóstico</span>
          <span className="service-sep" aria-hidden="true">·</span>
          <span>Coleta</span>
          <span className="service-sep" aria-hidden="true">·</span>
          <span>Triagem</span>
          <span className="service-sep" aria-hidden="true">·</span>
          <span>Trituração</span>
          <span className="service-sep" aria-hidden="true">·</span>
          <span>Descaracterização</span>
        </p>
      </div>

      <div className="mobile-fidelity mf-section-frame">
        <p className="mf-d-label" style={{ width: mf(297), fontSize: mf(24), lineHeight: "30px", letterSpacing: 2.4 }}>
          Almeida Ambiental
        </p>
        <p className="mf-d-subtitle">
          <span>Diagnóstico</span>
          <span className="mf-sep">·</span>
          <span>Coleta</span>
          <span className="mf-sep">·</span>
          <span>Triagem</span>
          <span className="mf-sep">·</span>
          <span>Trituração</span>
          <span className="mf-sep">·</span>
          <span>Descaracterização</span>
        </p>
        <h2
          className="mf-d-title"
          style={{ marginTop: 28, width: mf(359), marginLeft: mf(17), fontSize: mf(35), lineHeight: "41px", letterSpacing: -1.4 }}
        >
          <span>RESÍDUOS GANHAM</span>
          <span>
            UM NOVO <em className="mf-d-title-gold">DESTINO</em>
          </span>
        </h2>
        <p
          className="mf-d-body"
          style={{ width: mf(289), marginLeft: mf(52), textAlign: "center", fontSize: mf(14), lineHeight: "15px", letterSpacing: -0.98 }}
        >
          Há quatro décadas, conhecimento técnico e experiência operacional se encontram na gestão
          responsável de resíduos.
        </p>
      </div>
      <MobileScrollHint />
    </>
  );
}

export function Section03Content() {
  return (
    <>
      <div className="section-grid dobra-03 desktop-only">
        <h2 className="section-title">
          <span>EFICIÊNCIA EM</span>
          <span>CADA ETAPA</span>
          <span>DO PROCESSO</span>
        </h2>
        <p className="section-body">
          Da coleta à destinação, a Almeida Ambiental reúne estrutura, tecnologia e experiência para
          transformar resíduos em valor, com mais eficiência logística, segurança e responsabilidade
          ambiental.
        </p>
        <div className="hero-actions">
          <Link href="/almeida-ambiental" className="btn btn-secondary">
            Conheça a Almeida Ambiental
          </Link>
        </div>
      </div>

      <div className="mobile-fidelity mf-section-frame">
        <p className="mf-d-label" style={{ width: mf(283), fontSize: mf(24), lineHeight: "30px", letterSpacing: 2.4 }}>
          Almeida Ambiental
        </p>
        <p className="mf-d-location" style={{ fontSize: mf(14), lineHeight: "30px", letterSpacing: -0.28 }}>
          São José · Joinville · Araquari · Chapecó · SC
        </p>
        <h2
          className="mf-d-title"
          style={{ marginTop: 20, width: mf(311), marginLeft: mf(41), fontSize: mf(35), lineHeight: "30px", letterSpacing: -1.4 }}
        >
          <span>
            <em className="mf-d-title-gold">EFICIÊNCIA</em> EM
          </span>
          <span>CADA ETAPA</span>
          <span>DO PROCESSO</span>
        </h2>
        <p
          className="mf-d-body"
          style={{ width: mf(314), marginLeft: mf(39.5), textAlign: "center", fontSize: mf(14), lineHeight: "15px", letterSpacing: -0.98 }}
        >
          Da coleta à destinação, a Almeida Ambiental reúne estrutura, tecnologia e experiência para
          transformar resíduos em valor, com mais eficiência logística, segurança e responsabilidade
          ambiental.
        </p>
        <div className="mf-d-actions">
          <Link href="/almeida-ambiental" className="mf-btn mf-btn-secondary" style={{ width: mf(335), marginLeft: mf(31) }}>
            Conheça Almeida Ambiental
          </Link>
        </div>
      </div>
      <MobileScrollHint />
    </>
  );
}

export function Section04Content() {
  return (
    <>
      <div className="section-grid dobra-04 desktop-only">
        <div className="company-identity">
          <p className="company-name">Almeida Equipamentos</p>
          <span className="company-divider" aria-hidden="true" />
          <div className="company-meta">
            <p className="company-role">Compactadores, prensas, trituradores e containers</p>
            <p className="company-role company-role-secondary">Venda · Aluguel · Consignação</p>
            <p className="company-location">São José · Santa Catarina</p>
          </div>
        </div>
        <h2 className="section-title">
          <span>TECNOLOGIA QUE</span>
          <span>NASCEU DA</span>
          <span>PRÓPRIA OPERAÇÃO</span>
        </h2>
        <p className="section-body">
          Criada para aperfeiçoar os processos do Grupo Almeida, a Almeida Equipamentos transforma
          décadas de experiência no setor em tecnologia aplicada à gestão de resíduos.
        </p>
      </div>

      <div className="mobile-fidelity mf-section-frame">
        <p className="mf-d-label" style={{ width: mf(297), fontSize: mf(24), lineHeight: "30px", letterSpacing: -0.96 }}>
          Almeida Equipamentos
        </p>
        <p className="mf-d-subtitle">
          <span>Compactadores</span>
          <span className="mf-sep">·</span>
          <span>Prensas</span>
          <span className="mf-sep">·</span>
          <span>Trituradores</span>
          <span className="mf-sep">·</span>
          <span>Containers</span>
        </p>
        <h2
          className="mf-d-title"
          style={{ marginTop: 28, width: mf(333), marginLeft: mf(30), fontSize: mf(35), lineHeight: "30px", letterSpacing: -1.4 }}
        >
          <span>
            <em className="mf-d-title-gold">TECNOLOGIA</em> QUE
          </span>
          <span>NASCEU DA</span>
          <span>PRÓPRIA OPERAÇÃO</span>
        </h2>
        <p
          className="mf-d-body"
          style={{ width: mf(309), marginLeft: mf(42), textAlign: "center", fontSize: mf(14), lineHeight: "15px", letterSpacing: -0.56 }}
        >
          Criada para aperfeiçoar os processos do Grupo Almeida, a Almeida Equipamentos transforma
          décadas de experiência no setor em tecnologia aplicada à gestão de resíduos.
        </p>
      </div>
      <MobileScrollHint />
    </>
  );
}

export function Section05Content() {
  return (
    <>
      <div className="section-grid dobra-05 desktop-only">
        <h2 className="section-title">
          <span>ENGENHARIA PARA</span>
          <span>MOVIMENTAR MAIS</span>
          <span>COM MENOS</span>
        </h2>
        <p className="section-body">
          Compactadores, prensas e tecnologias desenvolvidas para diferentes materiais, volumes e
          realidades operacionais.
        </p>
        <p className="section-body">
          Conhecimento de campo conectado a parceiros e tecnologias internacionais.
        </p>
        <div className="hero-actions">
          <Link href="/almeida-equipamentos" className="btn btn-secondary">
            Conheça a Almeida Equipamentos
          </Link>
        </div>
      </div>

      {/* Composição intencionalmente fora do centro (centro x 204,5, não
          196,5 como as demais) — preservado conforme o Figma. */}
      <div className="mobile-fidelity mf-section-frame">
        <p className="mf-d-label" style={{ width: mf(301), fontSize: mf(24), lineHeight: "30px", letterSpacing: -0.96 }}>
          Almeida Equipamentos
        </p>
        <p className="mf-d-location" style={{ fontSize: mf(14), lineHeight: "20px" }}>São José · SC</p>
        <h2
          className="mf-d-title"
          style={{ marginTop: 20, width: mf(329), marginLeft: mf(40), fontSize: mf(35), lineHeight: "30px", letterSpacing: -0.35 }}
        >
          <span>ENGENHARIA PARA</span>
          <span>MOVIMENTAR</span>
          <em className="mf-d-title-gold">MAIS COM MENOS</em>
        </h2>
        <p
          className="mf-d-body"
          style={{ width: mf(337), marginLeft: mf(36), textAlign: "center", fontSize: mf(14), lineHeight: "15px", letterSpacing: -0.56 }}
        >
          Compactadores, prensas e tecnologias desenvolvidas para diferentes materiais, volumes e
          realidades operacionais.
        </p>
        <p
          className="mf-d-body"
          style={{ width: mf(337), marginLeft: mf(36), textAlign: "center", fontSize: mf(14), lineHeight: "15px", letterSpacing: -0.56 }}
        >
          Conhecimento de campo conectado a tecnologias internacionais.
        </p>
        <div className="mf-d-actions">
          <Link href="/almeida-equipamentos" className="mf-btn mf-btn-secondary" style={{ width: mf(335), marginLeft: mf(29) }}>
            Conheça Almeida Equipamentos
          </Link>
        </div>
      </div>
      <MobileScrollHint />
    </>
  );
}

export function Section06Content() {
  return (
    <>
      <div className="section-grid dobra-06 desktop-only">
        <div className="company-identity">
          <p className="company-name">Saturno Ambiental</p>
          <span className="company-divider" aria-hidden="true" />
          <div className="company-meta">
            <p className="company-role">Gestão de resíduos e cartonagem, com consultoria ambiental</p>
            <p className="company-location">Blumenau · Vale do Itajaí · Santa Catarina</p>
          </div>
        </div>
        <h2 className="section-title">
          <span>EXPERIÊNCIA REGIONAL.</span>
          <span>FORÇA DE GRUPO.</span>
        </h2>
        <p className="section-body">
          Em Blumenau, a Saturno Ambiental amplia a presença do Grupo Almeida e aproxima décadas de
          conhecimento em gestão de resíduos das operações da região.
        </p>
      </div>

      <div className="mobile-fidelity mf-section-frame mf-center">
        <p className="mf-d-label" style={{ width: mf(291), fontSize: mf(24), lineHeight: "30px", letterSpacing: 2.16 }}>
          Saturno Ambiental
        </p>
        <p className="mf-d-subtitle">
          <span>Gestão de Resíduos</span>
          <span className="mf-sep">·</span>
          <span>Cartonagem</span>
          <span className="mf-sep">·</span>
          <span>Consultoria</span>
        </p>
        <h2
          className="mf-d-title"
          style={{ marginTop: 24, width: mf(334), marginLeft: mf(37), fontSize: mf(35), lineHeight: "30px", letterSpacing: -0.35 }}
        >
          <em className="mf-d-title-gold">EXPERIÊNCIA</em>
          <span>REGIONAL.</span>
          <span>FORÇA DE GRUPO.</span>
        </h2>
        <p
          className="mf-d-body"
          style={{ width: mf(300), marginLeft: mf(47), textAlign: "center", fontSize: mf(15), lineHeight: "15px", letterSpacing: -0.15 }}
        >
          Em Blumenau, a Saturno Ambiental amplia a presença do Grupo Almeida e aproxima décadas de
          conhecimento em gestão de resíduos das operações da região.
        </p>
      </div>
      <MobileScrollHint />
    </>
  );
}

export function Section07Content() {
  return (
    <>
      <div className="section-grid dobra-07 desktop-only">
        <h2 className="section-title">
          <span>GESTÃO AMBIENTAL</span>
          <span>QUE VAI ALÉM</span>
          <span>DA COLETA</span>
        </h2>
        <p className="section-body">
          Coleta, triagem, trituração, cartonagem e consultoria ambiental fazem parte de uma atuação
          construída para unir eficiência operacional e responsabilidade ambiental.
        </p>
        <div className="hero-actions">
          <Link href="/saturno-ambiental" className="btn btn-secondary">
            Conheça a Saturno Ambiental
          </Link>
        </div>
      </div>

      <div className="mobile-fidelity mf-section-frame">
        <p className="mf-d-label" style={{ width: mf(291), fontSize: mf(24), lineHeight: "30px", letterSpacing: 2.16 }}>
          Saturno Ambiental
        </p>
        <p className="mf-d-location" style={{ fontSize: mf(14), lineHeight: "20px" }}>Blumenau · Vale do Itajaí</p>
        <h2
          className="mf-d-title"
          style={{ marginTop: 20, width: mf(353), marginLeft: mf(20), fontSize: mf(35), lineHeight: "35px", letterSpacing: 0.35 }}
        >
          <span>GESTÃO AMBIENTAL</span>
          <span>
            QUE <em className="mf-d-title-gold">VAI ALÉM</em>
          </span>
          <span>DA COLETA</span>
        </h2>
        <p
          className="mf-d-body"
          style={{ width: mf(325), marginLeft: mf(34), textAlign: "center", fontSize: mf(14), lineHeight: "15px", letterSpacing: -0.14 }}
        >
          Coleta, triagem, trituração, cartonagem e consultoria ambiental fazem parte de uma atuação
          construída para unir eficiência operacional e responsabilidade ambiental.
        </p>
        <div className="mf-d-actions">
          <Link href="/saturno-ambiental" className="mf-btn mf-btn-secondary" style={{ width: mf(335), marginLeft: mf(29) }}>
            Conheça Saturno Ambiental
          </Link>
        </div>
      </div>
      <MobileScrollHint />
    </>
  );
}

/**
 * Dobra 8 (fechamento institucional) e Dobra 9 (impacto/estatísticas)
 * estavam com o conteúdo trocado em relação ao vídeo e ao Figma: o texto
 * de fechamento ("O QUE COMEÇOU...") tocava no tempo 14.20s (dobra 9,
 * a última antes do footer) e as estatísticas tocavam em 12.17s (dobra 8).
 * Corrigido aqui: dobra 8 = fechamento, dobra 9 = estatísticas — sem
 * mudar timing de vídeo nem CSS de grid desktop, só o texto de cada uma.
 */
export function Section08Content() {
  return (
    <>
      <div className="section-grid dobra-08 desktop-only">
        <h2 className="closing-title">
          <span>O QUE COMEÇOU</span>
          <span>COM PAPEL E PAPELÃO</span>
          <span>HOJE CONECTA</span>
          <span>OPERAÇÃO, TECNOLOGIA</span>
          <span>E SUSTENTABILIDADE.</span>
        </h2>
        <p className="section-body">
          Há 40 anos transformando o presente, pensando no futuro.
        </p>
        <div className="hero-actions">
          <Link href="/contato" className="btn btn-primary">
            Entre em contato com o Grupo Almeida
          </Link>
        </div>
      </div>

      {/* Ritmo vertical bem diferente das demais dobras: headline logo no
          topo, corpo bem mais abaixo, CTA perto do fim — preservado. */}
      <div className="mobile-fidelity mf-section-frame mf-tight-top">
        <h2
          className="mf-d-title mf-d-title-plain mf-d-title-semibold"
          /* Seis linhas, não cinco: "OPERAÇÃO," e "TECNOLOGIA E" são linhas
             separadas no Figma (height do node de texto = 300 = 6 × 50 de
             line-height). Juntar as duas em "OPERAÇÃO, TECNOLOGIA E" é o que
             fazia a linha ultrapassar os 356px a 35px — não era um problema
             de tamanho de fonte nem de peso, era quebra de linha errada.
             Peso Playfair Display SemiBold (600, não 700) também confere
             com o Figma para esta dobra. */
          style={{ width: mf(356), marginLeft: mf(19), fontSize: mf(35), lineHeight: "50px", letterSpacing: -2.45 }}
        >
          <span>O QUE COMEÇOU</span>
          <span>COM PAPEL E PAPELÃO</span>
          <span>HOJE CONECTA</span>
          <span>OPERAÇÃO,</span>
          <span>TECNOLOGIA E</span>
          <span>SUSTENTABILIDADE.</span>
        </h2>
        <p
          className="mf-d-body"
          style={{ marginTop: "auto", textAlign: "center", fontSize: mf(14), lineHeight: "20px" }}
        >
          Há 40 anos transformando o presente, pensando no futuro.
        </p>
        <div className="mf-d-actions" style={{ marginTop: 20, marginBottom: 56 }}>
          <Link href="/contato" className="mf-btn mf-btn-secondary" style={{ width: mf(335), marginLeft: mf(29) }}>
            Entre em contato com o Grupo Almeida
          </Link>
        </div>
      </div>
      <MobileScrollHint />
    </>
  );
}

export function Section09Content() {
  return (
    <>
      <div className="section-grid dobra-09 desktop-only">
        <p className="eyebrow">Impacto Positivo · 2025</p>
        <h2 className="section-title">
          <span>SUSTENTABILIDADE</span>
          <span>TRADUZIDA</span>
          <span>EM RESULTADOS</span>
        </h2>
        <dl className="stats-grid">
          <div className="stat-item">
            <dt className="stat-value">818.907</dt>
            <dd className="stat-label">árvores preservadas</dd>
          </div>
          <div className="stat-item">
            <dt className="stat-value">54.873 t</dt>
            <dd className="stat-label">de materiais reciclados</dd>
          </div>
          <div className="stat-item">
            <dt className="stat-value">153.114 t</dt>
            <dd className="stat-label">de CO₂ evitadas</dd>
          </div>
          <div className="stat-item">
            <dt className="stat-value">1,27 bilhão</dt>
            <dd className="stat-label">de litros de água economizados</dd>
          </div>
        </dl>
        <div className="hero-actions">
          {/* Relatório de Sustentabilidade 2025 ainda não disponível no projeto:
              botão fica sem destino definitivo nesta etapa (ver DECISOES.md). */}
          <button type="button" className="btn btn-secondary" disabled>
            Ver Relatório de Sustentabilidade 2025
          </button>
        </div>
      </div>

      <div className="mobile-fidelity mf-section-frame mf-tight-top">
        <h2
          className="mf-d-title mf-d-title-plain"
          style={{ width: mf(321), marginLeft: mf(34), fontSize: mf(35), lineHeight: "30px", letterSpacing: -0.35 }}
        >
          <span>Cada resíduo</span>
          <span>processado vira um</span>
          <span>número que a</span>
          <em className="mf-d-title-gold">natureza reconhece.</em>
        </h2>
        <ul className="mf-stats">
          <li className="mf-stat-item">
            <p className="mf-stat-value">818.907</p>
            <p className="mf-stat-label">árvores preservadas</p>
          </li>
          <li className="mf-stat-item">
            <p className="mf-stat-value">54.873 t</p>
            <p className="mf-stat-label">materiais reciclados</p>
          </li>
          <li className="mf-stat-item">
            <p className="mf-stat-value">153.114 t</p>
            <p className="mf-stat-label">CO₂ evitadas</p>
          </li>
          <li className="mf-stat-item">
            <p className="mf-stat-value">1,27 bi</p>
            <p className="mf-stat-label">litros de água economizados</p>
          </li>
        </ul>
        <div className="mf-d-actions" style={{ marginTop: 28, marginBottom: 40 }}>
          {/* Relatório de Sustentabilidade 2025 ainda não disponível no projeto. */}
          <button type="button" className="mf-btn mf-btn-secondary" style={{ width: mf(335), marginLeft: mf(29) }} disabled>
            Ver Relatório de Sustentabilidade 2025
          </button>
        </div>
      </div>
    </>
  );
}
