import Link from "next/link";
import shared from "../shared/company-page.module.css";
import styles from "./almeida-ambiental.module.css";
import CompanyHero from "../shared/CompanyHero";
import MaterialGrid from "../shared/MaterialGrid";
import EditorialCTA from "../shared/EditorialCTA";
import RegionalMap from "./RegionalMap";
import ProcessSteps from "../shared/ProcessSteps";
import { HERO_IMAGE, POSITIONING_IMAGE, MATERIALS_IMAGE, PILLARS, MATERIALS, FLOW_STEPS } from "../../lib/almeida-ambiental-data";
import { CONTACT_ANCHORS } from "../../lib/contact-data";

/* Mesma lista de etapas da Home (FLOW_STEPS), mesmo componente de lista
   visual — o processo não pode ser lido de duas formas diferentes entre a
   Home e a página da empresa. */
const PROCESS_STEPS = FLOW_STEPS.map((name) => ({ name }));

const PILLAR_TONE = [shared.toneStone, shared.toneStoneAlt, shared.toneStone];
const PILLAR_SIDE = [shared.duoMediaRight, shared.duoMediaLeft, shared.duoMediaRight];

/**
 * /almeida-ambiental — "estrutura, processo e capacidade operacional",
 * seguindo a ordem da Seção 7 em diante da tarefa: Hero → posicionamento →
 * três pilares (Coleta/Triagem/Trituração, cada um seu próprio capítulo) →
 * materiais → fluxo do resíduo → presença regional → cross-link para
 * Equipamentos → CTA final. Arquitetura própria desta empresa — não o
 * mesmo template de Saturno/Equipamentos com texto trocado.
 */
export default function AlmeidaAmbientalPage() {
  return (
    <div className={styles.page} data-page="almeida-ambiental">
      <CompanyHero
        eyebrow="Almeida Ambiental"
        title="Gestão de resíduos construída sobre experiência, estrutura e eficiência."
        lede="Desde 1985, a Almeida Ambiental transforma coleta, triagem, processamento e destinação em uma operação integrada para grandes geradores de resíduos."
        image={HERO_IMAGE}
        primaryCta={{ label: "Conheça nossas soluções", href: "#servicos" }}
        secondaryCta={{ label: "Fale com a Almeida Ambiental", href: CONTACT_ANCHORS.saoJose }}
      />

      {/* ---------------- Posicionamento ---------------- */}
      <section className={`${shared.section} ${shared.toneStone}`}>
        <div className={shared.container}>
          <div className={`${shared.duo} ${shared.duoMediaLeft} ${shared.duoMediaNarrow}`}>
            <div className={`${shared.duoMedia} ${shared.duoMediaSquare}`}>
              <img src={POSITIONING_IMAGE.src} alt={POSITIONING_IMAGE.alt} loading="lazy" decoding="async" />
            </div>
            <div className={shared.duoContent}>
              <h2 className={shared.headline}>
                Mais do que recolher resíduos, é preciso entender o que acontece com eles depois.
              </h2>
              <p className={shared.body}>
                A experiência construída ao longo de quatro décadas permite à Almeida Ambiental unir estrutura
                logística, classificação, tecnologia e destinação adequada em uma mesma operação. Cada material
                exige uma solução diferente. O trabalho começa entendendo essa diferença.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Serviços: três pilares ---------------- */}
      <div id="servicos">
        {PILLARS.map((pillar, index) => (
          <section key={pillar.id} className={`${shared.section} ${PILLAR_TONE[index]}`}>
            <div className={shared.container}>
              <div className={`${shared.duo} ${PILLAR_SIDE[index]}`}>
                <div className={`${shared.duoMedia} ${shared.duoMediaLandscape}`}>
                  <img src={pillar.image.src} alt={pillar.image.alt} loading="lazy" decoding="async" />
                </div>
                <div className={shared.duoContent}>
                  <span className={styles.pillarIndex}>{String(index + 1).padStart(2, "0")} / 03</span>
                  <p className={shared.eyebrow}>{pillar.eyebrow}</p>
                  <h2 className={shared.headline}>{pillar.headline}</h2>
                  <p className={shared.body}>{pillar.copy}</p>
                  {pillar.highlights.length > 0 && (
                    <ul className={`${shared.tagRow} ${styles.pillarHighlights}`}>
                      {pillar.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                  {pillar.subcopy && <p className={shared.body}>{pillar.subcopy}</p>}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* ---------------- Materiais ---------------- */}
      <section className={`${shared.section} ${shared.toneStoneAlt}`}>
        <div className={shared.container}>
          <h2 className={shared.headline}>Diferentes materiais. Diferentes caminhos.</h2>
          <p className={shared.body}>
            A operação evoluiu muito além do papel e papelão que marcaram o início da Almeida. Hoje, a estrutura
            atende diferentes categorias de resíduos e direciona cada uma conforme suas características.
          </p>
          <div style={{ marginTop: "clamp(32px, 5vw, 48px)" }}>
            <MaterialGrid materials={MATERIALS} image={MATERIALS_IMAGE} variant="editorial" />
          </div>
        </div>
      </section>

      {/* ---------------- Do resíduo ao novo ciclo ---------------- */}
      <section className={`${shared.section} ${shared.toneForest}`}>
        <div className={shared.container}>
          <p className={shared.eyebrow}>Do resíduo ao novo ciclo</p>
          <h2 className={shared.headline}>Diagnóstico, coleta, triagem, trituração e destinação em uma só operação.</h2>
          <ProcessSteps steps={PROCESS_STEPS} ariaLabel="Etapas da operação da Almeida Ambiental" />
        </div>
      </section>

      {/* ---------------- Capacidade e presença ---------------- */}
      <section className={`${shared.section} ${shared.toneCarvao}`}>
        <div className={shared.container}>
          <h2 className={shared.headline}>Uma estrutura que cresceu acompanhando Santa Catarina.</h2>
          <p className={shared.body}>
            A expansão do Grupo Almeida permite aproximar estrutura, logística e conhecimento técnico de diferentes
            regiões do estado.
          </p>
          <RegionalMap />
          <p className={styles.presenceNote}>
            Em Blumenau e no Vale do Itajaí, essa presença regional se estende através da Saturno Ambiental,
            parte do Grupo Almeida.
          </p>
        </div>
      </section>

      {/* ---------------- Cross-link: Almeida Equipamentos ---------------- */}
      <section className={`${shared.section} ${shared.toneStone}`}>
        <div className={shared.container}>
          <p className={shared.eyebrow}>Tecnologia dentro da operação</p>
          <h2 className={shared.headline}>
            Equipamentos que não são apenas comercializados. São parte da experiência operacional do grupo.
          </h2>
          <p className={shared.body}>
            A relação entre Almeida Ambiental e Almeida Equipamentos permite que conhecimento de campo e tecnologia
            caminhem juntos. Compactação, armazenagem e processamento são pensados a partir de problemas que fazem
            parte da operação diária.
          </p>
          <div className={shared.ctaRow}>
            <Link className={`${shared.btn} ${shared.btnOutlineOnLight}`} href="/almeida-equipamentos">
              Conheça a Almeida Equipamentos
            </Link>
          </div>
        </div>
      </section>

      <EditorialCTA
        headline="Sua operação gera resíduos. A próxima etapa precisa ser planejada."
        body="Converse com a equipe e entenda qual estrutura faz sentido para seu volume, material e rotina."
        cta={{ label: "Falar com a Almeida Ambiental", href: CONTACT_ANCHORS.saoJose }}
        tone="forest"
      />
    </div>
  );
}
