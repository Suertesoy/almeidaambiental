/**
 * Fonte de dados da página /contato.
 *
 * Consulta feita em 2026-08-19. A home atual de https://www.almeidaambiental.com.br/
 * hoje é uma página de manutenção ("Estamos atualizando nosso site") que só
 * lista telefone/WhatsApp por unidade — sem endereço, fax ou e-mail. As
 * antigas páginas /ambiental/contatos/, /equipamentos/contatos/ e
 * /saturno/contatos/ retornam 404. Por isso os campos abaixo vêm de duas
 * camadas, nunca de diretório externo (Regra 5, AGENT_RULES_SITE.md):
 *
 * 1. A home atual (ao vivo) — telefones e links wa.me de cada unidade,
 *    incluindo o WhatsApp "Manutenção" da Equipamentos e a unidade de
 *    Araquari/Joinville.
 * 2. Capturas arquivadas (web.archive.org) das páginas antigas ainda no ar
 *    até pouco tempo atrás, usadas só para os campos que a home atual não
 *    publica mais (endereço completo e e-mail):
 *    - Almeida Ambiental: snapshot de 2024-11-14 do WP REST
 *      (/ambiental/wp-json/wp/v2/pages/203) — traz endereço e
 *      contato@almeidaambiental.com.br.
 *    - Saturno Ambiental: snapshot de 2024-09-13 de /saturno/contatos/ —
 *      traz endereço, os dois telefones e atendimento@almeidaambiental.com.br.
 *    - Almeida Equipamentos: NENHUM snapshot recente de uma página própria
 *      de contato foi encontrado. O endereço abaixo assume o mesmo prédio
 *      institucional de São José (mesma leitura feita para o Footer.tsx,
 *      que já lista Ambiental e Equipamentos na mesma cidade) e não foi
 *      reverificado linha a linha para a Equipamentos especificamente. Não
 *      há e-mail publicado ou arquivado para a Equipamentos — campo omitido
 *      de propósito em vez de reaproveitar o da Ambiental (ver relatório da
 *      tarefa, item Divergências).
 */

export type PhoneChannel = {
  /** Rótulo curto opcional (ex.: "Comercial", "Manutenção"). */
  label?: string;
  display: string;
  href: string;
};

export type CompanyContact = {
  id: string;
  eyebrow: string;
  name: string;
  description: string;
  addressLines: string[];
  mapHref: string;
  phones: PhoneChannel[];
  /** Nota curta sob o telefone principal (ex.: mesmo número atende como fax). */
  phoneNote?: string;
  whatsapp: PhoneChannel[];
  email?: { display: string; href: string };
  /** Unidade adicional da mesma empresa, exibida como linha secundária. */
  secondaryUnit?: { label: string; phone: PhoneChannel };
};

const mapsQuery = (query: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const CONTACTS: CompanyContact[] = [
  {
    id: "almeida-ambiental",
    eyebrow: "Gestão de resíduos",
    name: "Almeida Ambiental",
    description:
      "Para assuntos relacionados a coleta, triagem, classificação, trituração, descaracterização e demais soluções da operação ambiental.",
    addressLines: [
      "Esquina com Rua Francisco Severino de Souza",
      "Rua Governador José Boabaid — Distrito Industrial",
      "São José, SC — CEP 88104-760",
    ],
    mapHref: mapsQuery("Rua Governador José Boabaid, Distrito Industrial, São José, SC, 88104-760"),
    phones: [{ display: "+55 (48) 3259-4444", href: "tel:+554832594444" }],
    phoneNote: "O mesmo número também atende como fax.",
    whatsapp: [{ display: "+55 (48) 3259-4444", href: "https://wa.me/554832594444" }],
    email: { display: "contato@almeidaambiental.com.br", href: "mailto:contato@almeidaambiental.com.br" },
    secondaryUnit: {
      label: "Também atende em Araquari / Joinville",
      phone: { display: "+55 (47) 99949-6299", href: "https://wa.me/5547999496299" },
    },
  },
  {
    id: "almeida-equipamentos",
    eyebrow: "Tecnologia e equipamentos",
    name: "Almeida Equipamentos",
    description:
      "Para compra, locação, consignação, informações técnicas e orientação sobre equipamentos para gestão de resíduos.",
    addressLines: [
      "Esquina com Rua Francisco Severino de Souza",
      "Rua Governador José Boabaid — Distrito Industrial",
      "São José, SC — CEP 88104-760",
    ],
    mapHref: mapsQuery("Rua Governador José Boabaid, Distrito Industrial, São José, SC, 88104-760"),
    phones: [{ label: "Comercial", display: "+55 (48) 3259-4444", href: "tel:+554832594444" }],
    phoneNote: "O mesmo número também atende como fax.",
    whatsapp: [
      { label: "Comercial", display: "+55 (48) 3259-4444", href: "https://wa.me/554832594444" },
      { label: "Manutenção", display: "+55 (48) 9969-1712", href: "https://wa.me/554899691712" },
    ],
  },
  {
    id: "saturno-ambiental",
    eyebrow: "Vale do Itajaí",
    name: "Saturno Ambiental",
    description:
      "Para serviços ambientais, gestão de resíduos, cartonagem e atendimento da operação da Saturno em Blumenau e região.",
    addressLines: ["Rua Marechal Rondon, 510 — Salto Norte", "Blumenau, SC — CEP 89065-200"],
    mapHref: mapsQuery("Rua Marechal Rondon, 510, Salto Norte, Blumenau, SC, 89065-200"),
    phones: [
      { display: "+55 (47) 3323-8441", href: "tel:+554733238441" },
      { display: "+55 (47) 3339-0323", href: "tel:+554733390323" },
    ],
    whatsapp: [{ display: "+55 (48) 98464-9289", href: "https://wa.me/5548984649289" }],
    email: { display: "atendimento@almeidaambiental.com.br", href: "mailto:atendimento@almeidaambiental.com.br" },
  },
];
