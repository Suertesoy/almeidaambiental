import Link from "next/link";

/**
 * Conteúdo real das dobras 2 a 9 da Home (dobra 1 continua em HeroContent.tsx,
 * com seu próprio ".hero-content"/".hero-title", intocado).
 *
 * Cada componente renderiza o miolo ".section-grid" (área útil centralizada,
 * 12 colunas conceituais): o wrapper ".section-layer" (posicionamento sobre
 * o vídeo + fade) é aplicado pelo ScrollVideoExperience. A classe "dobra-0X"
 * identifica a dobra para o posicionamento por grid definido em
 * app/globals.css (a partir de 1024px) — no mobile tudo empilha em coluna
 * única por padrão. A copy é exatamente a mesma de antes; só a estrutura
 * visual (classes de título/wrapper) mudou.
 */

export function Section02Content() {
  return (
    <div className="section-grid dobra-02">
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
  );
}

export function Section03Content() {
  return (
    <div className="section-grid dobra-03">
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
  );
}

export function Section04Content() {
  return (
    <div className="section-grid dobra-04">
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
  );
}

export function Section05Content() {
  return (
    <div className="section-grid dobra-05">
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
  );
}

export function Section06Content() {
  return (
    <div className="section-grid dobra-06">
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
  );
}

export function Section07Content() {
  return (
    <div className="section-grid dobra-07">
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
  );
}

export function Section08Content() {
  return (
    <div className="section-grid dobra-08">
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
  );
}

export function Section09Content() {
  return (
    <div className="section-grid dobra-09">
      <h2 className="closing-title">
        <span>O QUE COMEÇOU</span>
        <span>COM PAPEL E PAPELÃO</span>
        <span>HOJE CONECTA</span>
        <span>OPERAÇÃO, TECNOLOGIA</span>
        <span>E SUSTENTABILIDADE.</span>
      </h2>
      <p className="section-body">
        Há 40 anos transformamos o presente pensando no que vem depois.
      </p>
      <div className="hero-actions">
        <Link href="/contato" className="btn btn-primary">
          Entre em contato com o Grupo Almeida
        </Link>
      </div>
    </div>
  );
}
