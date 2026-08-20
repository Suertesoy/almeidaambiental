import Link from "next/link";
import shared from "../shared/company-page.module.css";
import styles from "./contato.module.css";
import Reveal from "../shared/Reveal";
import IllustrativeBadge from "../shared/IllustrativeBadge";
import { PhoneIcon, WhatsAppIcon } from "../icons";
import { REGIONS } from "../../lib/contact-data";

const SECTION_TONE = [shared.toneStone, shared.toneStoneAlt, shared.toneForest];
const SECTION_DARK = [false, false, true];

const DIRECTORY = [
  { id: "sao-jose", index: "01", title: "São José", subtitle: "Matriz · Almeida Ambiental · Almeida Equipamentos" },
  { id: "araquari-joinville", index: "02", title: "Araquari / Joinville", subtitle: "Almeida Ambiental" },
  { id: "blumenau", index: "03", title: "Blumenau", subtitle: "Saturno Ambiental" },
];

const withMessage = (href: string, message: string) => `${href}?text=${encodeURIComponent(message)}`;

/**
 * /contato — diretório institucional organizado por operação/região: Hero
 * curto → diretório rápido (unidade → botão "Ver unidade") → São José →
 * Araquari / Joinville → Blumenau → fechamento curto.
 *
 * Reestruturação Checkpoint E (refinamento mobile 2026-08-20): cada
 * localidade responde em sequência "qual unidade / onde fica / como falar
 * ou chegar" (Seção 18-20 da tarefa) — identidade (eyebrow/headline/
 * descrição/CNPJ) → Localização (endereço) → Canais de contato (WhatsApp e
 * Ligar como botões reais, não hyperlink) → mapa editorial estático +
 * Google Maps/Waze. Substitui o bloco anterior (.channelRow como único
 * link cobrindo texto+ação), que apresentava toda ação de contato como
 * hyperlink sem affordance de botão. Dados oficiais centralizados em
 * lib/contact-data.ts — sem fax, sem e-mail (nenhum dos dois faz parte dos
 * canais fornecidos para esta reconstrução).
 */
export default function ContatoPage() {
  return (
    <div className={styles.page} data-page="contato">
      {/* ---------------- Hero ---------------- */}
      <section className={`${shared.sectionCompact} ${shared.toneForest}`}>
        <div className={shared.container}>
          <Reveal>
            <p className={`${shared.eyebrow} ${shared.eyebrowAccent}`}>Contato</p>
            <h1 className={styles.heroTitle}>Encontre o canal certo para sua operação.</h1>
            <p className={`${shared.body} ${styles.heroLede}`}>
              Atendimento direto para São José, Araquari / Joinville e Blumenau.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Diretório rápido ---------------- */}
      <nav className={styles.directory} aria-label="Diretório rápido">
        <ol className={styles.directoryList}>
          {DIRECTORY.map((item) => (
            <li key={item.id} className={styles.directoryItem}>
              <span className={styles.directoryIndex}>{item.index}</span>
              <span className={styles.directoryText}>
                <span className={styles.directoryTitle}>{item.title}</span>
                <span className={styles.directorySubtitle}>{item.subtitle}</span>
              </span>
              <a className={`${shared.btn} ${shared.btnOutlineOnLight} ${styles.directoryAction}`} href={`#${item.id}`}>
                Ver unidade
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* ---------------- Blocos regionais ---------------- */}
      {REGIONS.map((region, index) => {
        const dark = SECTION_DARK[index];
        const outlineBtn = dark ? shared.btnOutlineOnDark : shared.btnOutlineOnLight;

        return (
          <section
            key={region.id}
            id={region.id}
            className={`${shared.section} ${SECTION_TONE[index]} ${styles.regionSection}`}
          >
            <div className={shared.container}>
              <Reveal>
                <div className={styles.regionGrid}>
                  <div className={`${styles.regionInfo} ${!region.mapImage ? styles.regionInfoFull : ""}`}>
                    <p className={shared.eyebrow}>{region.eyebrow}</p>
                    <h2 className={shared.headline}>{region.headline}</h2>
                    <p className={shared.body}>{region.description}</p>
                    <p className={styles.cnpjLine}>
                      {region.cnpjLabel}: {region.cnpj}
                    </p>

                    {region.addressLines && (
                      <div className={`${styles.infoBlock} ${dark ? styles.infoBlockDark : ""}`}>
                        <span className={styles.infoLabel}>Localização</span>
                        <p className={styles.channelAddress}>
                          {region.addressLines.map((line, lineIndex) => (
                            <span key={line}>
                              {line}
                              {lineIndex < region.addressLines!.length - 1 && <br />}
                            </span>
                          ))}
                        </p>
                      </div>
                    )}

                    <div className={`${styles.infoBlock} ${dark ? styles.infoBlockDark : ""}`}>
                      <span className={styles.infoLabel}>Canais de contato</span>
                      <div className={styles.channelActions}>
                        {region.channels.map((channel) => (
                          <div key={channel.href} className={styles.channelAction}>
                            <span className={styles.channelActionLabel}>{channel.label}</span>
                            <a
                              className={
                                channel.action === "whatsapp"
                                  ? `${shared.btn} ${styles.btnWhatsApp}`
                                  : `${shared.btn} ${outlineBtn}`
                              }
                              href={
                                channel.action === "whatsapp"
                                  ? withMessage(channel.href, region.whatsappMessage)
                                  : channel.href
                              }
                              target={channel.action === "whatsapp" ? "_blank" : undefined}
                              rel={channel.action === "whatsapp" ? "noopener noreferrer" : undefined}
                            >
                              {channel.action === "whatsapp" ? <WhatsAppIcon /> : <PhoneIcon />}
                              {channel.action === "whatsapp" ? "Falar pelo WhatsApp" : "Ligar"}
                            </a>
                            <span className={styles.channelActionNumber}>{channel.display}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {region.note && <p className={styles.channelNote}>{region.note}</p>}
                  </div>

                  {region.mapImage && (
                    <div className={styles.regionMap}>
                      <div className={styles.mapFrame}>
                        <img src={region.mapImage.src} alt={region.mapImage.alt} loading="lazy" decoding="async" />
                        <IllustrativeBadge />
                      </div>
                      <div className={styles.mapActions}>
                        {region.mapHref && (
                          <a className={`${shared.btn} ${outlineBtn}`} href={region.mapHref} target="_blank" rel="noopener noreferrer">
                            Abrir no Google Maps
                          </a>
                        )}
                        {region.wazeHref && (
                          <a className={`${shared.btn} ${outlineBtn}`} href={region.wazeHref} target="_blank" rel="noopener noreferrer">
                            Abrir no Waze
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}

      {/* ---------------- Fechamento ---------------- */}
      <section className={`${shared.section} ${shared.toneCarvao} ${shared.finalCta}`}>
        <div className={shared.container}>
          <h2 className={shared.finalCtaHeadline}>Três frentes. Um mesmo Grupo.</h2>
          <p className={shared.body}>
            Almeida Ambiental, Almeida Equipamentos e Saturno Ambiental trabalham de forma complementar para
            conectar gestão de resíduos, tecnologia e presença regional.
          </p>
          <div className={shared.ctaRow}>
            <Link className={`${shared.btn} ${shared.btnSolidGold}`} href="/">
              Voltar para a Home
            </Link>
            <Link className={`${shared.btn} ${shared.btnOutlineOnDark}`} href="/historia">
              Conheça nossa história
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
