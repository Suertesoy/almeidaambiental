import Link from "next/link";
import shared from "../shared/company-page.module.css";
import styles from "./contato.module.css";
import Reveal from "../shared/Reveal";
import { PhoneIcon, WhatsAppIcon } from "../icons";
import { REGIONS } from "../../lib/contact-data";

const SECTION_TONE = [shared.toneStone, shared.toneStoneAlt, shared.toneForest];
const SECTION_DARK = [false, false, true];

const DIRECTORY = [
  { id: "sao-jose", index: "01", title: "São José", subtitle: "Matriz · Almeida Ambiental · Almeida Equipamentos", cta: "Ver contatos" },
  { id: "araquari-joinville", index: "02", title: "Araquari / Joinville", subtitle: "Almeida Ambiental", cta: "Ver contato" },
  { id: "blumenau", index: "03", title: "Blumenau", subtitle: "Saturno Ambiental", cta: "Ver contatos" },
];

/**
 * /contato — diretório institucional organizado por operação/região (não
 * mais por empresa): Hero curto → diretório rápido → São José → Araquari /
 * Joinville → Blumenau → fechamento curto. Dados oficiais centralizados em
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
            <p className={shared.eyebrow}>Contato</p>
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
            <li key={item.id}>
              <a className={styles.directoryRow} href={`#${item.id}`}>
                <span className={styles.directoryIndex}>{item.index}</span>
                <span className={styles.directoryText}>
                  <span className={styles.directoryTitle}>{item.title}</span>
                  <span className={styles.directorySubtitle}>{item.subtitle}</span>
                </span>
                <span className={styles.directoryCta}>
                  {item.cta}
                  <span aria-hidden="true"> →</span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* ---------------- Blocos regionais ---------------- */}
      {REGIONS.map((region, index) => (
        <section
          key={region.id}
          id={region.id}
          className={`${shared.section} ${SECTION_TONE[index]} ${styles.regionSection}`}
        >
          <div className={shared.container}>
            <Reveal>
              <div className={styles.regionGrid}>
                <div>
                  <p className={shared.eyebrow}>{region.eyebrow}</p>
                  <h2 className={shared.headline}>{region.headline}</h2>
                  <p className={shared.body}>{region.description}</p>
                  <p className={styles.cnpjLine}>
                    {region.cnpjLabel}: {region.cnpj}
                  </p>
                </div>

                <div className={`${styles.channels} ${SECTION_DARK[index] ? styles.channelsDark : ""}`}>
                  {region.addressLines && (
                    <div className={styles.channel}>
                      <span className={styles.channelLabel}>Endereço</span>
                      <p className={styles.channelAddress}>
                        {region.addressLines.map((line, lineIndex) => (
                          <span key={line}>
                            {line}
                            {lineIndex < region.addressLines!.length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                      {region.mapHref && (
                        <a className={styles.channelLink} href={region.mapHref} target="_blank" rel="noopener noreferrer">
                          Ver localização
                        </a>
                      )}
                    </div>
                  )}

                  {region.channels.map((channel) => (
                    <a
                      key={channel.href}
                      className={styles.channelRow}
                      href={channel.href}
                      target={channel.action === "whatsapp" ? "_blank" : undefined}
                      rel={channel.action === "whatsapp" ? "noopener noreferrer" : undefined}
                    >
                      <span className={styles.channelRowLabel}>{channel.label}</span>
                      <span className={styles.channelRowNumber}>{channel.display}</span>
                      <span className={styles.channelRowAction}>
                        {channel.action === "whatsapp" ? <WhatsAppIcon /> : <PhoneIcon />}
                        {channel.action === "whatsapp" ? "Abrir WhatsApp" : "Ligar"}
                      </span>
                    </a>
                  ))}

                  {region.note && <p className={styles.channelNote}>{region.note}</p>}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

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
            <Link className={shared.btnEditorial} href="/historia">
              Conheça nossa história
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
