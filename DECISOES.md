# Registro de Decisões

## Decisões Iniciais Confirmadas

**Data:** 06/08/2026
**Decisão:** 1. O projeto será um site institucional separado da Plataforma Operacional Almeida.
**Motivo:** Garantir que o foco e a estrutura técnica sejam voltados para apresentação institucional sem misturar com sistema operacional.
**Impacto:** Sistemas, bancos de dados e infraestrutura separados.
**Status:** Confirmado.

**Data:** 06/08/2026
**Decisão:** 2. Stack prevista: Next.js + TypeScript.
**Motivo:** Escolha técnica para garantir robustez, SEO e escalabilidade futura.
**Impacto:** Define as ferramentas para desenvolvimento.
**Status:** Confirmado.

**Data:** 06/08/2026
**Decisão:** 3. Hospedagem prevista: Vercel, em projeto próprio.
**Motivo:** Integração nativa com Next.js e separação de ambiente da plataforma.
**Impacto:** Arquitetura de deploy focada na Vercel.
**Status:** Confirmado.

**Data:** 06/08/2026
**Decisão:** 4. A pasta ainda NÃO possui conexão com repositório remoto.
**Motivo:** Início do projeto focado exclusivamente na fundação documental.
**Impacto:** Código será versionado apenas localmente nesta etapa inicial.
**Status:** Confirmado.

**Data:** 06/08/2026
**Decisão:** 5. O projeto ainda NÃO existe na Vercel.
**Motivo:** Infraestrutura será criada em momento posterior.
**Impacto:** Sem ambiente de preview ou produção até o momento.
**Status:** Confirmado.

**Data:** 06/08/2026
**Decisão:** 6. Nenhuma dessas conexões será criada nesta tarefa.
**Motivo:** Manter o escopo focado.
**Impacto:** Nenhuma configuração de infra externa nesta fase.
**Status:** Confirmado.

**Data:** 06/08/2026
**Decisão:** 7. O site prioriza posicionamento institucional e reputação, não uma abordagem agressiva de conversão.
**Motivo:** O objetivo é servir como cartão de visitas e transmitir credibilidade.
**Impacto:** Tom de voz e estrutura do site adaptados para institucionais.
**Status:** Confirmado.

**Data:** 06/08/2026
**Decisão:** 8. As empresas do Grupo Almeida devem aparecer como partes de um ecossistema único, preservando a identidade própria da Saturno quando necessário.
**Motivo:** Consolidar a marca enquanto respeita a força regional da Saturno.
**Impacto:** Design e arquitetura da informação refletirão esta visão unificada.
**Status:** Confirmado.

**Data:** 06/08/2026
**Decisão:** 9. Conteúdo factual não validado deve permanecer identificado como pendente.
**Motivo:** Evitar publicações com informações falsas ou não confirmadas.
**Impacto:** Revisão rigorosa de informações antes de ir ao ar.
**Status:** Confirmado.

**Data:** 06/08/2026
**Decisão:** 10. Pagamento confirmado em 50% no início e 50% na entrega.
**Motivo:** Acordo comercial firmado.
**Impacto:** Gestão financeira do projeto.
**Status:** Confirmado.

**Data:** 06/08/2026
**Decisão:** 11. Versão em inglês incluída como brinde/cortesia.
**Motivo:** Decisão comercial de não cobrar como adicional.
**Impacto:** O escopo inclui a internacionalização como cortesia, não como item faturado extra.
**Status:** Confirmado.

**Data:** 06/08/2026
**Decisão:** 12. O site antigo comprometido deverá ser tratado no planejamento de go-live, sem realizar intervenção nesta etapa.
**Motivo:** Proteger SEO e reputação no momento de substituição, mas focar na base atual.
**Impacto:** Atividade adicionada ao checklist de go-live futuro.
**Status:** Confirmado.

**Data:** 06/08/2026
**Decisão:** 13. Adotar diário de trabalho separado por data, usando `diario/AAAA-MM-DD.md`, e manter `diario/HISTORICO.md` apenas como índice resumido.
**Motivo:** Evitar que um único arquivo de histórico cresça indefinidamente e preservar contexto suficiente para retomadas, troca de agentes e investigação futura sem sobrecarregar cada nova sessão.
**Impacto:** O fechamento de cada jornada passa a seguir `FECHAR_DIA.md`. O diário diário guarda a história detalhada. `HISTORICO.md` guarda apenas data e resumo curto. Decisões estruturais continuam em `DECISOES.md`. Pendências continuam em `DEPOIS.md`. Acessos continuam em `ACESSOS.md`.
**Status:** Adotado.

**Data:** 06/08/2026
**Decisão:** 14. Fundação técnica criada na raiz do repositório com Next.js 16.3.0 (App Router), React 19.2.8 e TypeScript 7.0.2, sem diretório `src/`, sem Tailwind e sem ESLint configurados nesta etapa.
**Motivo:** Não havia versão fixada nos documentos vivos; foram usadas as versões estáveis mais recentes disponíveis no momento da instalação. Tailwind e ESLint não foram adicionados por não estarem explicitamente definidos como parte da stack e para manter a instalação restrita ao mínimo necessário para o primeiro build/deploy válido.
**Impacto:** `package.json`, `tsconfig.json` (gerado automaticamente pelo Next.js) e a pasta `app/` passam a existir na raiz. Deploy da Vercel poderá ser tentado novamente. Ferramentas de estilo (Tailwind) e lint (ESLint) ficam em aberto para decisão futura quando o design/conteúdo entrar em pauta.
**Status:** Confirmado.

**Data:** 07/08/2026
**Decisão:** 15. Durante a fase de desenvolvimento, prototipação e validação com a Almeida, o projeto continua publicado na conta Vercel da Sartec/Lucas, funcionando como ambiente de desenvolvimento, preview e homologação, aproveitando o workflow já configurado com GitHub. A provável infraestrutura definitiva de produção do site será criada posteriormente em uma conta Cloudflare pertencente ao próprio Grupo Almeida, com a Almeida mantendo o controle principal da conta e a Sartec Digital recebendo acesso administrativo para manutenção. A decisão final sobre a hospedagem de produção será confirmada antes do go-live; até lá, Cloudflare não será configurado e o deploy atual na Vercel não será alterado.
**Motivo:** Evitar que domínio, hospedagem e operação do site fiquem dependentes da conta pessoal de um prestador, mantendo ao mesmo tempo o workflow de desenvolvimento já funcional com GitHub + Vercel enquanto o site está em construção e validação com o cliente.
**Impacto:**
1. Desenvolvimento e previews continuam normalmente via GitHub + Vercel.
2. O código deve se manter tão portátil quanto razoavelmente possível.
3. Quando existir solução web padrão e solução proprietária da Vercel para a mesma necessidade, preferir a solução portável, desde que isso não prejudique qualidade, desempenho ou complexidade do projeto.
4. Não adicionar dependência de serviços proprietários da Vercel sem necessidade real; caso alguma funcionalidade futura justifique isso, registrar e avaliar a decisão antes da implementação.
5. Recursos visuais planejados — animações controladas por scroll, vídeo de background, Canvas/WebGL, experiências 3D, sequências de frames e contadores institucionais calculados no navegador — são compatíveis com esta estratégia e não devem ser simplificados por causa da possível migração de hospedagem.
6. O site continua tratado preferencialmente como aplicação institucional de forte componente estático/client-side. Necessidade futura de backend, função server-side ou outro processamento não está proibida, mas deverá ser avaliada também pela portabilidade para a infraestrutura definitiva.
7. Próximo ao go-live, haverá etapa específica de validação de compatibilidade com Cloudflare antes da migração.
8. A infraestrutura definitiva deve ficar sob controle do Grupo Almeida, evitando que domínio, hospedagem e operação do site fiquem dependentes da conta pessoal de um prestador.
9. A troca do domínio oficial só ocorrerá depois que a versão de produção estiver publicada e testada na infraestrutura definitiva.
10. Na futura alteração de DNS, os registros relacionados ao serviço de e-mail da Almeida devem ser preservados; a migração do site não implica automaticamente migração dos e-mails.
**Status:** Confirmado quanto ao papel atual da Vercel (desenvolvimento/preview/homologação). Estratégia de produção na Cloudflare é provável, mas depende de confirmação final antes do go-live.

**Data:** 12/08/2026
**Decisão:** 16. Nesta fase inicial de implementação do site institucional (primeira versão funcional da Home), a Vercel é usada como ambiente de prototipação e homologação visual com a Helóra/cliente. Como ainda não existe uma versão anterior do site em produção nesse projeto Vercel (`almeidaambiental`) que precise ser preservada, fica autorizado publicar diretamente pela branch `main` durante esta etapa inicial, sem exigir passagem por ambiente de preview antes de cada publicação.
**Motivo:** O endereço do projeto Vercel ainda não é usado pelo cliente final; usá-lo como homologação evita esforço extra de gestão de branches de preview enquanto o site está em construção e validação de direção visual.
**Impacto:** Commits com mudanças funcionais da Home podem ir direto para `main` nesta etapa, com deploy automático da Vercel. A Regra 7 de `AGENT_RULES_SITE.md` (nenhuma publicação em produção sem validação humana explícita / sempre passar por preview) fica temporariamente flexibilizada apenas para este cenário específico (Vercel = prototipação, sem produção real do cliente ainda no ar). Assim que existir uma versão em produção real usada pelo cliente, essa flexibilização deixa de valer e a Regra 7 volta a ser seguida integralmente.
**Status:** Confirmado para esta fase inicial.

**Data:** 12/08/2026
**Decisão:** 17. Nova arquitetura de informação do site, solicitada pela Helóra: Home / Grupo Almeida, Almeida Ambiental, Almeida Equipamentos, Saturno Ambiental, Contato. Não haverá página independente de Sustentabilidade.
**Motivo:** Decisão da cliente. Conteúdos de sustentabilidade continuam podendo aparecer dentro da Home, da Almeida Ambiental, da página institucional do Grupo ou de outras partes relevantes do site — apenas deixam de ter uma página própria no menu.
**Impacto:** Esta arquitetura substitui a arquitetura inicial prevista em `CONTEXTO_PROJETO_SITE.md` (que incluía "Sustentabilidade" como página independente). O menu principal do site (item de navegação do header) passa a conter apenas: Almeida Ambiental, Almeida Equipamentos, Saturno Ambiental, Contato — com o logo do Grupo Almeida cumprindo o papel de link para a Home, sem precisar de um item "Home" redundante no menu.
**Status:** Confirmado.

**Data:** 12/08/2026
**Decisão:** 18. Direção visual da Home (primeira versão funcional): paleta background `#F7F6F1`, foreground `#15150F`, primary `#4E6B24`, secondary `#C7D79E`, muted `#ECEBE2`, card `#FBFAF7`, tipografia de destaque Playfair Display (via `next/font/google`). Um tom dourado/amarelo (`#D8A536`, provisório) foi centralizado como token para o destaque de "RESULTADO" na primeira dobra, por ainda não existir um valor oficial confirmado.
**Motivo:** Direção visual fornecida diretamente para a implementação desta Home, distinta das duas direções ("A — Institucional Técnica" e "B — Ambiental Aberta") registradas em `design/tokens.css` e `design/GUIA_MONTAGEM_FIGMA.md` (que usam Inter Tight/Plus Jakarta Sans e paletas verdes diferentes).
**Impacto:** Os tokens desta direção foram centralizados em `app/globals.css` (não reaproveitam as variáveis de `design/tokens.css`). Quando a direção visual definitiva do site for consolidada com o Figma/cliente, avaliar se essa nova paleta substitui as direções A/B do design system ou se passa a ser registrada formalmente como "Direção C" nos documentos de design.
**Status:** Confirmado para a Home desta etapa. Consolidação com o design system do Figma fica pendente.

**Data:** 12/08/2026
**Decisão:** 19. O vídeo `Video_Almeida_15_seg.mp4`, que já existia em `videos/` na raiz do repositório, foi movido (não duplicado nem re-codificado) para `public/videos/Video_Almeida_15_seg.mp4`.
**Motivo:** Arquivos servidos como asset estático pelo Next.js (com suporte nativo a range requests, necessário para o seek suave do vídeo controlado por scroll) precisam estar dentro de `public/`. O arquivo continua sendo exatamente o mesmo (mesmo conteúdo, mesmo nome), apenas em outro caminho.
**Impacto:** Qualquer referência futura ao vídeo original deve usar o novo caminho `public/videos/Video_Almeida_15_seg.mp4` (servido em produção como `/videos/Video_Almeida_15_seg.mp4`).
**Status:** Confirmado.

**Data:** 13/08/2026
**Decisão:** 20. Segunda rodada de ajustes na experiência de scroll da Home: substituída a rolagem contínua (uma faixa única e muito alta, ~804svh, onde cada pixel de scroll movia o vídeo) por dez dobras de 100svh cada, com CSS Scroll Snap (`scroll-snap-type: y mandatory`, `scroll-snap-align: start`, `scroll-snap-stop: always`, `scroll-padding-top` considerando o header fixo). O vídeo e o overlay passaram a ficar em uma camada `position: fixed` atrás das dobras, e o tempo do vídeo é interpolado continuamente entre os tempos de duas dobras adjacentes conforme a posição de scroll, com correção explícita de `currentTime` ao final de cada parada. Uma trava adicional em JS (`wheel`, apenas desktop/mouse/trackpad) garante que uma rolagem forte não avance mais de uma dobra por vez — em teste automatizado, o CSS Scroll Snap sozinho deixou passar até 3 dobras em uma rolagem de wheel sintética muito grande; com a trava, ficou limitado a 1. No touch/mobile não há interceptação, apenas o Scroll Snap nativo. Também foi identificado e corrigido o motivo do vídeo aparecer quase invisível (só o verde do overlay) no mobile: em alguns navegadores mobile o decoder de vídeo só desenha frames depois de um `play()` real; foi adicionado um `play()` seguido de `pause()` imediato (mudo, inline) logo após `loadeddata`, sem autoplay perceptível ao usuário. Os tempos de `SCROLL_STOPS` (`lib/scroll-timeline.ts`) não foram alterados. Foram adicionados marcadores temporários "DOBRA 0X · Y.YYs" nas dobras 2 a 10 (ainda sem conteúdo), centralizados em `components/DevSectionMarker.tsx` e no bloco `.dev-section-marker` de `app/globals.css`, para facilitar a remoção quando o conteúdo definitivo dessas dobras for implementado.
**Motivo:** A cliente relatou que o comportamento anterior era excessivamente contínuo (difícil perceber onde uma dobra terminava e a próxima começava) e que no mobile a tela ficava praticamente tomada pelo verde do overlay, sem o vídeo perceptível.
**Impacto:** `components/ScrollVideoExperience.tsx` e `lib/scroll-timeline.ts` foram reescritos; `app/globals.css` ganhou as classes `.video-layer`, `.snap-container`, `.snap-section` e perdeu `.scroll-track`, `.scroll-stage`, `.scroll-anchor` (não usadas mais). Nenhum ajuste de paleta, tipografia, header, menu, textos da dobra 1 ou crop do vídeo (`object-fit: cover`) foi feito. O vídeo continua sendo exatamente o arquivo já existente em `public/videos/Video_Almeida_15_seg.mp4`, sem reencode.
**Status:** Confirmado, aguardando validação visual do cliente no deploy.

**Data:** 13/08/2026
**Decisão:** 21. Terceira rodada de ajustes na Home, em duas fases. Fase 1 (conteúdo): a Home passou de dez para nove dobras narrativas; o antigo stop `7.04s` deixou de ser parada (o vídeo continua atravessando esse instante durante a reprodução, apenas não pausa mais ali) e a timeline final de `SCROLL_STOPS` (`lib/scroll-timeline.ts`) ficou em `0.00 / 2.13 / 4.03 / 5.09 / 6.13 / 7.28 / 10.21 / 12.10 / 15.00`. As dobras 2 a 9 receberam o conteúdo institucional definitivo fornecido pela cliente (componentes novos em `components/HomeSections.tsx`), os marcadores temporários "DOBRA 0X" foram removidos (`components/DevSectionMarker.tsx` apagado) e um footer institucional real foi criado (`components/Footer.tsx`), exibido após a dobra 9 fora da camada fixa do vídeo. A dobra 1 (hero), o header e o menu não foram alterados. Fase 2 (motor de vídeo): o modelo antigo, em que o `currentTime` era interpolado a cada pixel de scroll, foi substituído por transições discretas por dobra — na descida, o próprio `<video>` toca (`play()`) do tempo de origem até o tempo alvo (acelerando moderadamente, até no máximo 2x, só nos trechos com mais de 1,8s reais, para não ficar lento) e é pausado e corrigido exatamente no tempo da dobra ao chegar; na subida, sem reprodução reversa nativa confiável, o `currentTime` é interpolado via `requestAnimationFrame` com easing. Uma única trava (`isTransitioningRef`) evita empilhar navegações, compartilhada entre o gesto de wheel (desktop) e a detecção de cruzamento de metade do caminho via scroll (usada também no touch/mobile, que continua sem interceptação). Também foi corrigida a inicialização do decoder de vídeo no mobile: além de aguardar `loadeddata`, agora também é iniciada a partir da primeira interação real do usuário (touch/scroll/tecla/wheel/pointer), e o mesmo mecanismo passou a valer também no modo `prefers-reduced-motion` (antes só existia no modo normal, e o `<video>` desse modo nem tinha `ref` — por isso podia nunca desenhar nenhum frame). Erros de `video.play()` deixaram de ser silenciados (agora vão para `console.warn`).
**Motivo:** Pedido direto da cliente após validar a estrutura anterior: manter a navegação de uma dobra por vez (já aprovada), mas trocar a sensação de "slides" por movimento contínuo real do vídeo na descida, e investigar/corrigir a tela verde chapada no mobile em vez de apenas ajustar opacidade.
**Impacto:** `lib/scroll-timeline.ts`, `components/ScrollVideoExperience.tsx`, `app/page.tsx`, `app/globals.css` foram alterados; `components/HomeSections.tsx` e `components/Footer.tsx` foram criados; `components/DevSectionMarker.tsx` foi removido. O arquivo de vídeo `Video_Almeida_15_seg.mp4` não foi trocado nem reencodado. O gap de acessibilidade em `prefers-reduced-motion` (dobras 2-9 sem conteúdo real nesse modo) foi registrado em `DEPOIS.md`, não corrigido nesta rodada.
**Status:** Confirmado, aguardando validação visual do cliente no deploy (inclusive em dispositivo mobile físico, per pendência já registrada sobre o GOP de 5s do vídeo).

## DECISÕES PENDENTES

- Confirmar número/link oficial do WhatsApp do Grupo Almeida para o botão principal da Home (atualmente apenas visual, sem destino configurado).
- Confirmar arquivo vetorial oficial da logo do Grupo Almeida (a Home está usando um placeholder textual "Grupo Almeida" em Playfair Display até o vetor chegar).
- Confirmar valor oficial do dourado/amarelo de destaque usado em "RESULTADO" na Home (atualmente token provisório `#D8A536` em `app/globals.css`).
- Avaliar engasgo real de seek em dispositivos de hardware mais limitado: o vídeo `Video_Almeida_15_seg.mp4` tem keyframes apenas em 0s/5s/10s (GOP de 5s); testes no Chromium desktop/mobile emulado não mostraram problema, mas vale reconfirmar em aparelho físico real antes do go-live.
