import Link from "next/link";
import shared from "../shared/company-page.module.css";
import styles from "./contato.module.css";
import Reveal from "../shared/Reveal";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "../icons";
import { CONTACTS } from "../../lib/contact-data";

const SECTION_TONE = [shared.toneStone, shared.toneStoneAlt, shared.toneForest];
const SECTION_DARK = [false, false, true];

/**
 * /contato — diretório institucional do Grupo Almeida (não formulário).
 * Hero curto → navegação rápida entre as três empresas → um bloco de
 * contato por empresa (Almeida Ambiental e Equipamentos no eixo de São
 * José, Saturno com mudança de ritmo para o Vale do Itajaí) → CTA
 * institucional final. Dados centralizados em lib/contact-data.ts.
 */
export default function ContatoPage() {
  return (
    <div className={styles.page} data-page="contato">
      {/* ---------------- Hero ---------------- */}
      <section className={`${shared.section} ${shared.toneForest}`}>
        <div className={shared.container}>
          <Reveal>
            <p className={shared.eyebrow}>Contato</p>
            <h1 className={styles.heroTitle}>Vamos encontrar o canal certo para você.</h1>
            <p className={`${shared.body} ${styles.heroLede}`}>
              O Grupo Almeida reúne diferentes frentes de atuação. Escolha a empresa relacionada à sua necessidade e
              fale diretamente com a equipe responsável.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Navegação rápida ---------------- */}
      <nav className={styles.quickNav} aria-label="Ir para a empresa">
        <ul className={styles.quickNavList}>
          {CONTACTS.map((company) => (
            <li key={company.id}>
              <a href={`#${company.id}`} className={styles.quickNavLink}>
                {company.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ---------------- Blocos por empresa ---------------- */}
      {CONTACTS.map((company, index) => (
        <section
          key={company.id}
          id={company.id}
          className={`${shared.section} ${SECTION_TONE[index]} ${styles.companySection}`}
        >
          <div className={shared.container}>
            <Reveal>
              <div className={styles.companyGrid}>
                <div>
                  <p className={shared.eyebrow}>{company.eyebrow}</p>
                  <h2 className={shared.headline}>{company.name}</h2>
                  <p className={shared.body}>{company.description}</p>
                </div>

                <div className={`${styles.channels} ${SECTION_DARK[index] ? styles.channelsDark : ""}`}>
                  <div className={styles.channel}>
                    <span className={styles.channelLabel}>Endereço</span>
                    <p className={styles.channelAddress}>
                      {company.addressLines.map((line, lineIndex) => (
                        <span key={line}>
                          {line}
                          {lineIndex < company.addressLines.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                    <a
                      className={styles.channelLink}
                      href={company.mapHref}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver localização
                    </a>
                  </div>

                  {company.phones.length > 0 && (
                    <div className={styles.channel}>
                      <span className={styles.channelLabel}>Telefone</span>
                      <div className={styles.channelPhoneRow}>
                        {company.phones.map((phone) => (
                          <a key={phone.href} className={styles.channelPhone} href={phone.href}>
                            <PhoneIcon />
                            <span>
                              {phone.display}
                              {phone.label && <span className={styles.channelSubLabel}> · {phone.label}</span>}
                            </span>
                          </a>
                        ))}
                      </div>
                      {company.phoneNote && <p className={styles.channelNote}>{company.phoneNote}</p>}
                    </div>
                  )}

                  {company.whatsapp.length > 0 && (
                    <div className={styles.channel}>
                      <span className={styles.channelLabel}>WhatsApp</span>
                      <div className={styles.channelPhoneRow}>
                        {company.whatsapp.map((wa) => (
                          <a
                            key={wa.href}
                            className={styles.channelPhone}
                            href={wa.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <WhatsAppIcon />
                            <span>
                              {wa.display}
                              {wa.label && <span className={styles.channelSubLabel}> · {wa.label}</span>}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {company.email && (
                    <div className={styles.channel}>
                      <span className={styles.channelLabel}>E-mail</span>
                      <a className={styles.channelLink} href={company.email.href}>
                        <MailIcon />
                        {company.email.display}
                      </a>
                    </div>
                  )}

                  {company.secondaryUnit && (
                    <div className={styles.channel}>
                      <span className={styles.channelLabel}>{company.secondaryUnit.label}</span>
                      <a
                        className={styles.channelPhone}
                        href={company.secondaryUnit.phone.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <WhatsAppIcon />
                        <span>{company.secondaryUnit.phone.display}</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      {/* ---------------- CTA final ---------------- */}
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
