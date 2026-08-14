import Link from "next/link";
import { ChevronDownIcon } from "./icons";

/**
 * Conteúdo real das dobras 2 a 9 da Home (dobra 1 continua em HeroContent.tsx).
 *
 * Um único bloco responsivo por dobra (`.section-frame`), igual em qualquer
 * largura: grid de três linhas — topo/eyebrow, centro (título + corpo,
 * centralizado verticalmente pela própria track `1fr`), base (CTA +
 * indicador de rolagem). A escala tipográfica/espaçamento aumenta a partir
 * de 1024px (ver app/globals.css), mas o mecanismo é o mesmo.
 *
 * Um indicador de rolagem (seta) aparece nas dobras 2 a 8; a dobra 9 não
 * tem, por ser a última antes do footer.
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
    <div className="section-frame">
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
  );
}

export function Section03Content() {
  return (
    <div className="section-frame">
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
  );
}

export function Section04Content() {
  return (
    <div className="section-frame">
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
  );
}

export function Section05Content() {
  return (
    <div className="section-frame">
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
  );
}

export function Section06Content() {
  return (
    <div className="section-frame">
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
  );
}

export function Section07Content() {
  return (
    <div className="section-frame">
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
    <div className="section-frame">
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
  );
}

export function Section09Content() {
  return (
    <div className="section-frame">
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
  );
}
