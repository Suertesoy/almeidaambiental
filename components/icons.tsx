import type { ReactElement } from "react";

export function HamburgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronDownIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.9 9.9 0 0 0 4.84 1.24h.01c5.5 0 9.96-4.46 9.96-9.96S17.54 2 12.04 2Zm0 18.2h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.1.81.83-3.02-.2-.31a8.2 8.2 0 0 1-1.26-4.39c0-4.55 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.55-3.7 8.24-8.26 8.24Zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28Z" />
    </svg>
  );
}

/* ==========================================================
   Iconografia funcional — processo, materiais, categorias técnicas
   ==========================================================
   Sistema único reutilizado por Home (processo), Almeida Ambiental
   (processo + 12 materiais), Almeida Equipamentos (6 categorias de
   material) e Saturno (12 materiais) — ver DECISOES.md. viewBox e stroke
   consistentes; nenhum width/height fixo (o consumidor controla o tamanho
   via CSS, 24–32px desktop / 20–24px mobile). Sempre currentColor, sempre
   aria-hidden (decorativo — o nome do material/etapa já é texto ao lado). */

export type FunctionalIconProps = { className?: string };
const iconStroke = { stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/* ---------------- Processo (5 etapas, por posição) ---------------- */

export function ProcessDiagnosticoIcon({ className }: FunctionalIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6" {...iconStroke} />
      <path d="M15.1 15.1 20 20" {...iconStroke} />
    </svg>
  );
}

export function ProcessColetaIcon({ className }: FunctionalIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 7h9v9H3z" {...iconStroke} />
      <path d="M12 10h4l3 3v3h-7z" {...iconStroke} />
      <circle cx="7.5" cy="18" r="1.6" {...iconStroke} />
      <circle cx="16.5" cy="18" r="1.6" {...iconStroke} />
    </svg>
  );
}

export function ProcessTriagemIcon({ className }: FunctionalIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 5h16l-6 7.5V19l-4 1.5v-8.2z" {...iconStroke} />
    </svg>
  );
}

/* Engrenagem (não um "sol"): dentes grossos e curtos que cruzam o aro do
   círculo em vez de raios finos afastados dele — a distinção visual real
   entre "gear" e "sun" é a proximidade/espessura dos traços ao aro. */
export function ProcessTrituracaoIcon({ className }: FunctionalIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <path
        d="M12 8.4 12 5M14.55 9.45 16.95 7.05M15.6 12 19 12M14.55 14.55 16.95 16.95M12 15.6 12 19M9.45 14.55 7.05 16.95M8.4 12 5 12M9.45 9.45 7.05 7.05"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* Descaracterização: documento (canto dobrado) que se transforma em tiras
   picotadas abaixo de uma linha — leitura de "shredder", nunca um pin de
   localização (a etapa anterior a esta usava um pin, semanticamente errado
   aqui: ver Seção 7 da tarefa de refinamento mobile). Distinta da engrenagem
   de Trituração (processo mecânico) mesmo sendo a fase seguinte do mesmo
   bloco de processamento. */
export function ProcessDescaracterizacaoIcon({ className }: FunctionalIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 3h7l4 4v3" {...iconStroke} />
      <path d="M14 3v4h4" {...iconStroke} />
      <path d="M4 13h16" {...iconStroke} />
      <path d="M6.5 13v7M10 13v7M13.5 13v7M17 13v7" {...iconStroke} />
    </svg>
  );
}

/* Destinação: uma entrada se ramificando em três saídas — cada tipo de
   resíduo segue para seu destino adequado. Substitui a seta única (fim de
   linha), que lia como "chegada" e não como "distribuição" (rodada de
   refino de fluxo/materiais). Trunk + três ramos, cada um com sua própria
   ponta em chevron, mesmo peso óptico dos demais ícones do processo. Última
   etapa do fluxo, sempre a 6ª posição. */
export function ProcessDestinacaoIcon({ className }: FunctionalIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M2.5 12H8" {...iconStroke} />
      <path d="M8 12 19 5" {...iconStroke} />
      <path d="M8 12 21 12" {...iconStroke} />
      <path d="M8 12 19 19" {...iconStroke} />
      <path d="M15.61 5.26 19 5 17.33 7.96" {...iconStroke} />
      <path d="M18 10.4 21 12 18 13.6" {...iconStroke} />
      <path d="M17.33 16.04 19 19 15.61 18.74" {...iconStroke} />
    </svg>
  );
}

/* Conector entre etapas do Process Flow Marquee — substitui o caractere "→"
   por um traço vetorial fino com a mesma ponta em chevron usada nos ícones
   acima. Largura controlada via CSS (flex:none), sem preserveAspectRatio
   para não distorcer a ponta. */
export function ProcessConnectorIcon({ className }: FunctionalIconProps) {
  return (
    <svg className={className} viewBox="0 0 40 16" fill="none" aria-hidden="true">
      <path d="M2 8h29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M25.5 2.8 33 8l-7.5 5.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Ordem fixa das seis etapas do fluxo operacional (Diagnóstico, Coleta,
 *  Triagem, Trituração, Descaracterização, Destinação) — reaproveitada por
 *  posição, não por texto do label, porque Home e Almeida Ambiental podem
 *  usar labels ligeiramente diferentes para a mesma etapa conceitual. */
export const PROCESS_STEP_ICONS = [
  ProcessDiagnosticoIcon,
  ProcessColetaIcon,
  ProcessTriagemIcon,
  ProcessTrituracaoIcon,
  ProcessDescaracterizacaoIcon,
  ProcessDestinacaoIcon,
] as const;

/* ---------------- Materiais e categorias técnicas ----------------
   Uma chave por nome de material (o mesmo texto que já vem de
   lib/materials.ts e lib/equipamentos-data.ts) — mesmo material em
   páginas diferentes usa exatamente o mesmo ícone. */

function MaterialPapelaoIcon({ className }: FunctionalIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 8.2 12 4l9 4.2v9.6L12 22l-9-4.2Z" {...iconStroke} />
      <path d="M3 8.2 12 12l9-4.2M12 12v10" {...iconStroke} />
    </svg>
  );
}

function MaterialPapelBrancoIcon({ className }: FunctionalIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 3h9l3 3v15H6z" {...iconStroke} />
      <path d="M15 3v3h3" {...iconStroke} />
      <path d="M9 12.5h6M9 15.8h6M9 9.2h3.5" {...iconStroke} />
    </svg>
  );
}

function MaterialGraficaColoridaIcon({ className }: FunctionalIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="7.5" y="3" width="11" height="14.5" rx="1" {...iconStroke} />
      <rect x="4" y="6.5" width="11" height="14.5" rx="1" {...iconStroke} />
    </svg>
  );
}

function MaterialSacoCimentoIcon({ className }: FunctionalIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8.5 4h7l1 3-1 3h-7l-1-3Z" {...iconStroke} />
      <path d="M7.5 10c-1 3-1.5 4.8-1.5 6.6A4.4 4.4 0 0 0 10.4 21h3.2a4.4 4.4 0 0 0 4.4-4.4c0-1.8-.5-3.6-1.5-6.6" {...iconStroke} />
    </svg>
  );
}

function MaterialJornalIcon({ className }: FunctionalIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 6h13v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" {...iconStroke} />
      <path d="M16 6h5v11.5a1.5 1.5 0 0 1-1.5 1.5" {...iconStroke} />
      <path d="M6 9.5h7M6 12.5h7M6 15.5h4" {...iconStroke} />
    </svg>
  );
}

function MaterialPlasticoIcon({ className }: FunctionalIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10 3h4v2.4l1.4 1.6v12a2 2 0 0 1-2 2h-2.8a2 2 0 0 1-2-2V7l1.4-1.6Z" {...iconStroke} />
      <path d="M10 3h4" {...iconStroke} />
      <path d="M8.6 12.5h6.8" {...iconStroke} />
    </svg>
  );
}

function MaterialTetraPakIcon({ className }: FunctionalIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 4.5h6l-1.2 2.3h-3.6Z" {...iconStroke} />
      <path d="M6 9 12 6.8 18 9v10L12 21 6 19Z" {...iconStroke} />
      <path d="M6 9l6 2.3L18 9M12 11.3V21" {...iconStroke} />
    </svg>
  );
}

function MaterialDocumentoSigilosoIcon({ className }: FunctionalIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 3h8l4 4v14H6z" {...iconStroke} />
      <path d="M14 3v4h4" {...iconStroke} />
      <rect x="9" y="13.2" width="6" height="4.6" rx="1" {...iconStroke} />
      <path d="M10.3 13.2v-1.4a1.7 1.7 0 0 1 3.4 0v1.4" {...iconStroke} />
    </svg>
  );
}

function MaterialMadeiraIcon({ className }: FunctionalIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="8.5" width="18" height="7" rx="1.2" {...iconStroke} />
      <path d="M6 11.2c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0" {...iconStroke} />
    </svg>
  );
}

function MaterialAluminioIcon({ className }: FunctionalIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M8.2 5.3 8.7 3h6.6l.5 2.3" {...iconStroke} />
      <rect x="7.5" y="5.3" width="9" height="15.2" rx="1.6" {...iconStroke} />
      <path d="M7.5 9.3h9M7.5 16.3h9" {...iconStroke} />
    </svg>
  );
}

function MaterialFerroIcon({ className }: FunctionalIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 4h14v3h-5.5v10H19v3H5v-3h5.5V7H5Z" {...iconStroke} />
    </svg>
  );
}

function MaterialResiduoOrganicoIcon({ className }: FunctionalIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19 5c-8 0-13 4.5-13 12 0 1 .1 1.6.2 2C14 18.6 19 13.5 19 5Z" {...iconStroke} />
      <path d="M6.5 18.5 17 8" {...iconStroke} />
    </svg>
  );
}

function MaterialResiduoUmidoIcon({ className }: FunctionalIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3.5s6 6.8 6 11.2a6 6 0 0 1-12 0c0-4.4 6-11.2 6-11.2Z" {...iconStroke} />
    </svg>
  );
}

function MaterialVolumeContinuoIcon({ className }: FunctionalIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="7" width="19" height="10" rx="1" {...iconStroke} />
      <path d="M2.5 10.3h19M2.5 13.7h19" {...iconStroke} />
      <path d="M6 7V5.3M18 7V5.3" {...iconStroke} />
    </svg>
  );
}

function MaterialTexteisIcon({ className }: FunctionalIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6c2 1.6 4 1.6 6 0s4-1.6 6 0 4 1.6 6 0" {...iconStroke} />
      <path d="M4 12c2 1.6 4 1.6 6 0s4-1.6 6 0 4 1.6 6 0" {...iconStroke} />
      <path d="M4 18c2 1.6 4 1.6 6 0s4-1.6 6 0 4 1.6 6 0" {...iconStroke} />
    </svg>
  );
}

/** Uma chave por material — mesmo texto exato usado em lib/materials.ts
 *  (Almeida Ambiental/Saturno) e lib/equipamentos-data.ts
 *  (MATERIAL_ASSOCIATIONS). Ausência de chave é esperada para materiais
 *  ainda não mapeados; o consumidor decide o que fazer (ver MaterialAtlas).
 *  As chaves abaixo depois de Grandes volumes contínuos são variantes de
 *  texto usadas só em "Ideal para" da Almeida Equipamentos (Checkpoint C,
 *  refinamento 2026-08-20) — sempre apontando para o MESMO ícone do
 *  material equivalente já usado no resto do site (Seção 12 da tarefa: não
 *  criar símbolo novo para o mesmo material com nome ligeiramente diferente). */
export const MATERIAL_ICONS: Record<string, (props: FunctionalIconProps) => ReactElement> = {
  "Papelão": MaterialPapelaoIcon,
  "Papel branco": MaterialPapelBrancoIcon,
  "Gráfica colorida": MaterialGraficaColoridaIcon,
  "Sacos de cimento": MaterialSacoCimentoIcon,
  "Jornal": MaterialJornalIcon,
  "Plástico": MaterialPlasticoIcon,
  "Tetra Pak": MaterialTetraPakIcon,
  "Documentos sigilosos": MaterialDocumentoSigilosoIcon,
  "Madeira": MaterialMadeiraIcon,
  "Alumínio": MaterialAluminioIcon,
  "Ferro": MaterialFerroIcon,
  "Resíduo orgânico": MaterialResiduoOrganicoIcon,
  "Papel": MaterialPapelBrancoIcon,
  "Plásticos": MaterialPlasticoIcon,
  "Copos plásticos": MaterialPlasticoIcon,
  "Garrafas PET": MaterialPlasticoIcon,
  "Embalagens Tetra Pak": MaterialTetraPakIcon,
  "Lodos específicos": MaterialResiduoUmidoIcon,
  "Operações de grande volume": MaterialVolumeContinuoIcon,
  "Têxteis": MaterialTexteisIcon,
  "Resíduos úmidos": MaterialResiduoUmidoIcon,
  "Grandes volumes contínuos": MaterialVolumeContinuoIcon,
};

/* ---------------- Benefícios de equipamento (Almeida Equipamentos) ----------------
   Checkpoint C (refinamento mobile 2026-08-20, Seção 13 da tarefa): substitui
   bullets genéricos da lista "Benefícios" nas fichas de produto por ícones
   pequenos que quebram a massa textual. Um ícone por conceito (não por
   produto) — vários textos de benefício diferentes, quando expressam a
   mesma ideia (ex. "Redução de volume" e "Formato vertical compacto"),
   reaproveitam o mesmo ícone. */

function BenefitDensityIcon({ className }: FunctionalIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3 21 8l-9 5-9-5Z" {...iconStroke} />
      <path d="M3 12l9 5 9-5" {...iconStroke} />
      <path d="M3 16l9 5 9-5" {...iconStroke} />
    </svg>
  );
}

function BenefitShrinkIcon({ className }: FunctionalIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5" {...iconStroke} />
    </svg>
  );
}

function BenefitFeedInIcon({ className }: FunctionalIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 9 12 5l9 4" {...iconStroke} />
      <path d="M3 9v9l9 4 9-4V9" {...iconStroke} />
      <path d="M12 5v13" {...iconStroke} />
    </svg>
  );
}

function BenefitCheckIcon({ className }: FunctionalIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" {...iconStroke} />
      <path d="M8.4 12.4 11 15l4.6-6" {...iconStroke} />
    </svg>
  );
}

function BenefitContainerIcon({ className }: FunctionalIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 8 12 4l8 4v9l-8 4-8-4Z" {...iconStroke} />
      <path d="M4 8l8 4 8-4" {...iconStroke} />
      <rect x="9.5" y="12.5" width="5" height="4" rx="0.6" {...iconStroke} />
    </svg>
  );
}

function BenefitFactoryIcon({ className }: FunctionalIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 21V11l5 3.2V11l5 3.2V8l5 3.2V21Z" {...iconStroke} />
      <path d="M3 21h18" {...iconStroke} />
    </svg>
  );
}

function BenefitUnloadIcon({ className }: FunctionalIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 4h9v9H4Z" {...iconStroke} />
      <path d="M13 13 20 20M20 20v-5.5M20 20h-5.5" {...iconStroke} />
    </svg>
  );
}

function BenefitShieldIcon({ className }: FunctionalIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3 19 6v6c0 4.4-3 7.5-7 9-4-1.5-7-4.6-7-9V6Z" {...iconStroke} />
    </svg>
  );
}

function BenefitLoopIcon({ className }: FunctionalIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12a8 8 0 0 1 14-5.3" {...iconStroke} />
      <path d="M20 12a8 8 0 0 1-14 5.3" {...iconStroke} />
      <path d="M18 3.7v4h-4M6 20.3v-4h4" {...iconStroke} />
    </svg>
  );
}

/** Uma chave por texto exato de benefício em lib/equipamentos-data.ts
 *  (PRODUCTS[].benefits) — vários textos apontam para o mesmo ícone quando
 *  expressam o mesmo conceito. ProcessColetaIcon (caminhão) é reaproveitado
 *  aqui para ganho logístico/transporte, mesma leitura visual já usada no
 *  fluxo operacional. */
export const BENEFIT_ICONS: Record<string, (props: FunctionalIconProps) => ReactElement> = {
  "Maior densidade de carga": BenefitDensityIcon,
  "Fardos de alta densidade": BenefitDensityIcon,
  "Redução de volume": BenefitShrinkIcon,
  "Redução de peso para transporte": BenefitShrinkIcon,
  "Baixo requisito de espaço": BenefitShrinkIcon,
  "Formato vertical compacto": BenefitShrinkIcon,
  "Processo compacto e robusto": BenefitShrinkIcon,
  "Alimentação de grandes materiais": BenefitFeedInIcon,
  "Ganho logístico": ProcessColetaIcon,
  "Menos manipulação antes do transporte": ProcessColetaIcon,
  "Operação prática": BenefitCheckIcon,
  "Armazenamento e compactação integrados": BenefitContainerIcon,
  "Estrutura fechada": BenefitContainerIcon,
  "Contenção adequada ao material": BenefitContainerIcon,
  "Produção própria do Grupo Almeida": BenefitFactoryIcon,
  "Geometria pensada para descarregamento": BenefitUnloadIcon,
  "Acabamento industrial resistente": BenefitShieldIcon,
  "Processamento contínuo": BenefitLoopIcon,
  "Preparação para reciclagem": BenefitLoopIcon,
};
