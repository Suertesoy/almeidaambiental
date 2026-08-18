import { WhatsAppIcon } from "./icons";
import { lockup } from "../lib/responsive-type";
import { MfActions, MfBottom, MfButton, MfCenter, MfFrame, MfLabel, MfScrollHint, MfTitle } from "./MobileDobra";
import { DActionsRow, DButton, DFrame, DHint, DTitle } from "./DesktopDobra";

/**
 * Dobra 1 (Hero). Dois blocos independentes:
 * - Desktop (>=1024px, `.desktop-only`): composição editorial especial
 *   (regra 13 da tarefa) — "Grupo Almeida" / "40 anos" / headline formam
 *   um único bloco centralizado (`.d-hero-main`, flex:1 dentro de
 *   `DFrame`, mesmo raciocínio de região CENTER das demais dobras); os
 *   dois CTAs (`.d-hero-actions`) e o `DHint` seguem em fluxo normal
 *   abaixo dele — nada posicionado via `top` percentual.
 * - Mobile+tablet (<1024px, `.mobile-fidelity`): composição PRÓPRIA
 *   (`MfFrame variant="hero"`, regra 8 da tarefa — não governada pelo
 *   mesmo padding-top das dobras institucionais). Estrutura fiel à
 *   referência anexada, de cima para baixo:
 *     header → 96px fixos (regra 3) → "Grupo Almeida" → 16px fixos
 *     (regra 4) → "40 anos" → espaço flexível (`MfCenter`, respiro
 *     editorial, sem conteúdo) → bloco inferior (`MfBottom`/`.mf-hero-lower`)
 *     com a headline ALINHADA À ESQUERDA (regra 5, única exceção de
 *     alinhamento da Home), agora no MESMO cluster dos CTAs — 24px fixos
 *     até o primeiro botão (regra 37 da tarefa, `MfActions marginTop`) —
 *     e os dois CTAs a 8px fixos um do outro (regra 6, gap explícito, não
 *     o clamp responsivo padrão) → 32px fixos (regra 27, `.mf-scrollhint`)
 *     até "Role para baixo" + chevron. Headline e CTAs compartilham a
 *     mesma largura via `.mf-hero-lower` (regra 36).
 */

export default function HeroContent({ onAdvance }: { onAdvance: () => void }) {
  return (
    <>
      {/* ---------------- Desktop (>=1024px): composição editorial ---------------- */}
      <div className="desktop-only d-stage">
        <DFrame>
          <div className="d-hero-main">
            <p className="d-hero-name">Grupo Almeida</p>
            <p className="d-hero-years">40 anos</p>
            <DTitle
              centerX
              maxWidth="1000px"
              align="center"
              fontSize="clamp(60px, 3vw + 3.4svh, 78px)"
              lineHeight={0.92}
              letterSpacing="-1px"
              lines={[
                [{ text: "TRANSFORMANDO" }],
                [{ text: "RESÍDUO" }],
                [{ text: "EM " }, { text: "RESULTADO", gold: true }],
              ]}
            />
          </div>

          <DActionsRow>
            {/* Número/link oficial do WhatsApp ainda não confirmado nesta etapa. */}
            <DButton variant="primary">
              <WhatsAppIcon />
              Falar com o Grupo Almeida
            </DButton>
            <DButton variant="secondary" href="#section-02">
              Conheça nossa história
            </DButton>
          </DActionsRow>

          <DHint label="Role para baixo" onAdvance={onAdvance} />
        </DFrame>
      </div>

      {/* ---------------- Mobile+tablet (<1024px): composição própria da Hero ---------------- */}
      <div className="mobile-fidelity mf-hero-frame">
        <MfFrame variant="hero">
          {/* Grupo Almeida → 16px fixos (regra 4, não `rhythm()`) → 40 anos,
              bloco centralizado, distinto da headline (que fica sozinha em
              `MfCenter`, alinhada à esquerda). */}
          <div className="mf-hero-top">
            <MfLabel tokens={lockup(29, 30, 9.28)}>Grupo Almeida</MfLabel>
            <p className="mf-hero-years" style={lockup(60, 30, -2.4)}>
              40 anos
            </p>
          </div>

          {/* Espaço flexível (regra 9: respiro editorial, não compactado) —
              agora vazio: a headline deixou de viver aqui sozinha e passou
              a pertencer ao cluster inferior, junto dos CTAs (regra 34). */}
          <MfCenter align="left" />

          <MfBottom align="left">
            {/* Cluster inferior único (regra 35): headline + CTAs
                compartilham a mesma largura (`.mf-hero-lower`, regra 36 —
                mesmo wrapper/max-width de `.mf-d-actions`/`.mf-btn`, em vez
                de dois números copiados). */}
            <div className="mf-hero-lower">
              <MfTitle
                align="left"
                fullWidth
                tokens={lockup(35, 30, -1)}
                lines={[
                  [{ text: "TRANSFORMANDO" }],
                  [{ text: "RESÍDUO" }],
                  [{ text: "EM " }, { text: "RESULTADO", gold: true }],
                ]}
              />
              {/* 24px fixos da headline até o primeiro CTA (regra 37) e 8px
                  fixos entre os dois CTAs (regra 6) — gaps explícitos, não
                  o clamp responsivo padrão de `.mf-d-actions`. */}
              <MfActions marginTop="24px" gap="8px">
                <MfButton variant="primary">
                  <WhatsAppIcon />
                  Falar com o Grupo Almeida
                </MfButton>
                <MfButton variant="secondary" href="#section-02">
                  Conheça nossa história
                </MfButton>
              </MfActions>
            </div>
          </MfBottom>
        </MfFrame>

        {/* 32px fixos do fim do segundo CTA até aqui (regra 7,
            `.mf-scrollhint`). */}
        <MfScrollHint label="Role para baixo" onAdvance={onAdvance} />
      </div>
    </>
  );
}
