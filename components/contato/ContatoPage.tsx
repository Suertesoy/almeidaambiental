import Link from "next/link";
import shared from "../shared/company-page.module.css";
import styles from "./contato.module.css";
import Reveal from "../shared/Reveal";
import { PhoneIcon, WhatsAppIcon } from "../icons";
import { REGIONS, REGIONS_EN, type Channel } from "../../lib/contact-data";
import { localizeHref } from "../../lib/i18n/routes";
import type { Locale } from "../../lib/i18n/locale";

const DIRECTORY = [
  { id: "sao-jose", title: "São José" },
  { id: "araquari-joinville", title: "Araquari / Joinville" },
  { id: "blumenau", title: "Blumenau" },
];

const withMessage = (href: string, message: string) => `${href}?text=${encodeURIComponent(message)}`;

const COPY = {
  pt: {
    eyebrow: "Contato",
    heroTitle: "Encontre o canal certo para sua operação.",
    heroLede: "Atendimento direto para São José, Araquari / Joinville e Blumenau.",
    directoryAriaLabel: "Diretório de unidades",
    channelsLabel: "Canais de contato",
    openInGoogleMaps: "Abrir no Google Maps",
    openInWaze: "Abrir no Waze",
    finalHeadline: "Três frentes. Um mesmo Grupo.",
    finalBody:
      "Almeida Ambiental, Almeida Equipamentos e Saturno Ambiental trabalham de forma complementar para conectar gestão de resíduos, tecnologia e presença regional.",
    backToHome: "Voltar para a Home",
    ourStory: "Conheça nossa história",
    typeLabelWhatsapp: "WhatsApp",
    typeLabelPhone: "Telefone",
    callCta: "Ligar",
    whatsappCta: "Falar pelo WhatsApp",
    talkTo: (label: string) => `Falar com ${label}`,
  },
  en: {
    eyebrow: "Contact",
    heroTitle: "Find the right channel for your operation.",
    heroLede: "Direct service for São José, Araquari / Joinville and Blumenau.",
    directoryAriaLabel: "Unit directory",
    channelsLabel: "Contact channels",
    openInGoogleMaps: "Open in Google Maps",
    openInWaze: "Open in Waze",
    finalHeadline: "Three fronts. One Group.",
    finalBody:
      "Almeida Ambiental, Almeida Equipamentos and Saturno Ambiental work together, connecting waste management, technology and regional presence.",
    backToHome: "Back to Home",
    ourStory: "See our story",
    typeLabelWhatsapp: "WhatsApp",
    typeLabelPhone: "Phone",
    callCta: "Call",
    whatsappCta: "Chat on WhatsApp",
    talkTo: (label: string) => `Talk to ${label}`,
  },
} as const;

function channelCopy(channel: Channel, locale: Locale) {
  const t = COPY[locale];
  const typeLabel = channel.action === "whatsapp" ? t.typeLabelWhatsapp : t.typeLabelPhone;
  const meta = channel.label === typeLabel ? channel.display : `${typeLabel} · ${channel.display}`;
  const cta = channel.action === "call" ? t.callCta : channel.label === "WhatsApp" ? t.whatsappCta : t.talkTo(channel.label);
  return { meta, cta };
}

/**
 * /contato — reconstrução da arquitetura visual (2026-08-20): a página
 * inteira responde a uma única sequência (Qual unidade? → Onde fica? →
 * Como chego lá? → Como falo com ela?), não mais um mosaico de mini
 * landing pages por empresa. Hero escuro → diretório compacto → São José /
 * Araquari-Joinville / Blumenau sobre a MESMA superfície clara contínua
 * (--color-stone-warm, sem alternância cream/verde por unidade) → CTA
 * terminal escuro. Cada unidade segue a mesma gramática (identidade → CNPJ
 * recuado → localização com Google Maps real → ações Maps/Waze → canais de
 * contato), sem reordenar por empresa. Mapas ilustrativos (Magnific)
 * removidos; Google Maps real via iframe keyless (`output=embed`, sem
 * chave/API — ver lib/contact-data.ts). Dados oficiais em
 * lib/contact-data.ts — sem fax, sem e-mail.
 */
export default function ContatoPage({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const regions = locale === "en" ? REGIONS_EN : REGIONS;

  return (
    <div className={styles.page} data-page="contato">
      {/* ---------------- Hero ---------------- */}
      <section className={`${shared.sectionCompact} ${shared.toneForest} ${styles.heroSection}`}>
        <div className={shared.container}>
          <Reveal>
            <p className={`${shared.eyebrow} ${shared.eyebrowAccent}`}>{t.eyebrow}</p>
            <h1 className={styles.heroTitle}>{t.heroTitle}</h1>
            <p className={`${shared.body} ${styles.heroLede}`}>{t.heroLede}</p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Diretório compacto ---------------- */}
      <nav className={`${shared.sectionCompact} ${shared.toneStone} ${styles.directoryNav}`} aria-label={t.directoryAriaLabel}>
        <div className={shared.container}>
          <ul className={styles.directoryChips}>
            {DIRECTORY.map((item) => (
              <li key={item.id}>
                <a className={styles.directoryChip} href={`#${item.id}`}>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ---------------- Unidades ---------------- */}
      {regions.map((region) => {
        const hasLocation = Boolean(region.addressLines && region.addressLines.length > 0);

        return (
          <section key={region.id} id={region.id} className={`${shared.section} ${shared.toneStone} ${styles.unitBlock}`}>
            <div className={shared.container}>
              <Reveal>
                <div className={`${styles.unitGrid} ${!hasLocation ? styles.unitGridNoLocation : ""}`}>
                  <div className={styles.unitIdentity}>
                    <p className={shared.eyebrow}>{region.eyebrow}</p>
                    <h2 className={shared.headline}>{region.headline}</h2>
                    <p className={shared.body}>{region.description}</p>
                    {region.note && <p className={styles.unitNote}>{region.note}</p>}
                  </div>

                  <p className={styles.unitCnpj}>
                    {region.cnpjLabel}: {region.cnpj}
                  </p>

                  {hasLocation && (
                    <div className={styles.unitLocation}>
                      <p className={styles.addressText}>
                        {region.addressLines!.map((line, lineIndex) => (
                          <span key={line}>
                            {line}
                            {lineIndex < region.addressLines!.length - 1 && <br />}
                          </span>
                        ))}
                      </p>

                      {region.mapEmbedSrc && (
                        <div className={styles.mapFrame}>
                          <iframe
                            src={region.mapEmbedSrc}
                            title={region.mapEmbedTitle ?? (locale === "en" ? `Map — ${region.headline}` : `Mapa — ${region.headline}`)}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          />
                        </div>
                      )}

                      <div className={styles.mapActions}>
                        {region.mapHref && (
                          <a className={`${shared.btn} ${shared.btnOutlineOnLight}`} href={region.mapHref} target="_blank" rel="noopener noreferrer">
                            {t.openInGoogleMaps}
                          </a>
                        )}
                        {region.wazeHref && (
                          <a className={`${shared.btn} ${shared.btnOutlineOnLight}`} href={region.wazeHref} target="_blank" rel="noopener noreferrer">
                            {t.openInWaze}
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  <div className={styles.unitChannels}>
                    <span className={styles.channelGroupLabel}>{t.channelsLabel}</span>
                    <div className={styles.channelList}>
                      {region.channels.map((channel) => {
                        const { meta, cta } = channelCopy(channel, locale);
                        const isWhatsApp = channel.action === "whatsapp";
                        return (
                          <div key={channel.href} className={styles.channelRow}>
                            <div className={styles.channelText}>
                              <span className={styles.channelName}>{channel.label}</span>
                              <span className={styles.channelMeta}>{meta}</span>
                            </div>
                            <a
                              className={isWhatsApp ? `${shared.btn} ${styles.btnWhatsApp}` : `${shared.btn} ${shared.btnOutlineOnLight}`}
                              href={isWhatsApp ? withMessage(channel.href, region.whatsappMessage) : channel.href}
                              target={isWhatsApp ? "_blank" : undefined}
                              rel={isWhatsApp ? "noopener noreferrer" : undefined}
                            >
                              {isWhatsApp ? <WhatsAppIcon /> : <PhoneIcon />}
                              {cta}
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}

      {/* ---------------- Fechamento ---------------- */}
      <section className={`${shared.section} ${shared.toneCarvao} ${shared.finalCta}`}>
        <div className={shared.container}>
          <h2 className={shared.finalCtaHeadline}>{t.finalHeadline}</h2>
          <p className={shared.body}>{t.finalBody}</p>
          <div className={shared.ctaRow}>
            <Link className={`${shared.btn} ${shared.btnSolidGold}`} href={localizeHref("/", locale)}>
              {t.backToHome}
            </Link>
            <Link className={`${shared.btn} ${shared.btnOutlineOnDark}`} href={localizeHref("/historia", locale)}>
              {t.ourStory}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
