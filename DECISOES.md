# Decisões Ativas — Site Institucional Grupo Almeida

Este arquivo contém somente decisões que ainda restringem ou orientam o projeto hoje.

Histórico de decisões substituídas, tentativas de implementação e registros de CSS/coordenadas fica em:
`historico/DECISOES_ARQUIVADAS_ATE_2026-08-17.md`.

Não registrar aqui: ajustes individuais de CSS, coordenadas, breakpoints experimentais, estratégias temporárias de layout, tentativas descartadas, detalhes de implementação que o código já expressa, ou "decisões" feitas apenas para uma rodada de correção. Isso é histórico de implementação, não decisão de produto.

## Projeto e stack

1. **Projeto separado.** O Site Institucional Grupo Almeida é um projeto separado da Plataforma Operacional Almeida — sistemas, banco de dados e infraestrutura não se misturam.
2. **Stack atual.** Next.js + React + TypeScript.
3. **Tailwind é decisão aberta, não proibição.** Tailwind não está instalado hoje. Isso não veta sua adoção futura — pode ser proposta quando trouxer benefício real para a tarefa em questão.

## Infraestrutura e deploy

4. **Vercel atual = homologação.** O ambiente Vercel em uso hoje é desenvolvimento/homologação, não produção definitiva do cliente.
5. **Push para main pode publicar.** Durante esta fase de homologação, um push para `main` pode disparar publicação automática na Vercel quando isso for parte explícita da tarefa pedida.
6. **Produção definitiva é decisão em aberto.** A infraestrutura de produção provavelmente ficará sob controle do Grupo Almeida; a decisão final será tomada antes do go-live.

## Arquitetura de informação e conteúdo

7. **Arquitetura institucional atual:** Home / Grupo Almeida, Almeida Ambiental, Almeida Equipamentos, Saturno Ambiental, Contato. Não existe página independente de Sustentabilidade.
8. **Objetivo principal.** Site institucional voltado a reputação, solidez, história, escala, estrutura, operação e sustentabilidade — não uma landing page agressiva de conversão.
9. **Grupo e marcas.** As empresas aparecem como partes do mesmo Grupo, preservando a identidade própria da Saturno quando necessário.
10. **Nenhuma afirmação factual inventada.** Números, datas, certificações, parceiros e qualquer dado institucional precisam de fonte ou validação do cliente.
11. **Versão em inglês.** Cortesia incluída no projeto, sem cobrança adicional.

## Comercial

12. **Pagamento.** 50% no início, 50% na entrega. Confirmado.

## Sobre a experiência visual da Home

13. **393×852 não é restrição permanente.** Foi uma referência de design mobile usada em uma fase do projeto, não uma regra de arquitetura a preservar.
14. **Reconstrução da Home após validação da cliente (2026-08-18).** A cliente escolheu a Home 1 como base narrativa, mas validou o contraste, o tratamento tipográfico e a sobriedade observados nas Homes 2 e 3. Isso substitui a direção visual anterior da Home principal:
    - O scrollytelling com vídeo sincronizado ao scroll (`ScrollVideoExperience`, `SCROLL_STOPS`, snap obrigatório, interceptação de wheel) deixou de existir na Home principal. O vídeo institucional agora vive só na primeira dobra (Hero), sem overlay verde e sem seeks programáticos; depois do Hero o scroll é contínuo e natural do navegador.
    - As seções seguintes usam fotografia real compondo o layout (nunca como `background-image`), com narrativa progressiva de duas seções por empresa (Almeida Ambiental, Almeida Equipamentos, Saturno Ambiental), impacto 2025 integrado ao CTA do relatório e manifesto final.
    - Tipografia permanece Playfair Display (display) + Inter (corpo); o ajuste pedido foi de hierarquia/peso, não de família — corpo de texto voltou a Inter regular (400), Playfair reservado a headlines/números/manifesto.
    - Nova direção cromática: verde floresta profundo e carvão como superfícies escuras, oliva Almeida como cor de identidade/apoio, pedra quente como superfície clara substituindo o off-white dominante, e dourado envelhecido como accent editorial pontual — ainda **provisório**, sem valor oficial confirmado (ver pendências).
    - O Header passou a usar verde floresta profundo, sólido, em qualquer rota (não é mais exclusivo da Home principal).
    - Homes 2, 3 e 4 deixam de ser opções públicas de navegação (removido o bloco "Versões da Home" do menu) e permanecem só como referência de homologação enquanto forem úteis; as rotas continuam existindo.

## Arquitetura de informação — página Nossa História

15. **Rota `/historia` (2026-08-18).** A página institucional "Nossa História" — experiência de storytelling cronológico de 1985 a 2026, com linha do tempo contínua — vive em `/historia`, não em `/grupo-almeida` como um registro anterior deste arquivo previa. Pedido explícito do responsável do projeto substitui a rota planejada antes (Regra 2 do AGENT_RULES_SITE.md). O CTA "Conheça nossa história" da Home (`components/home/Hero.tsx`) navega para `/historia` via `next/link` — deixou de ser âncora para `#almeida-ambiental`.

## Arquitetura de informação — página Contato

16. **Rota `/contato` (2026-08-19).** Diretório institucional das três empresas (não formulário) — Almeida Ambiental, Almeida Equipamentos e Saturno Ambiental, cada uma com endereço, telefone, WhatsApp e e-mail quando publicados. O site antigo (`https://www.almeidaambiental.com.br/`) mudou de forma: hoje é uma página de manutenção só com telefone/WhatsApp por unidade, e as antigas páginas `/ambiental/contatos/`, `/equipamentos/contatos/` e `/saturno/contatos/` retornam 404. Os dados publicados em `lib/contact-data.ts` vêm da combinação dessa home atual (ao vivo) com capturas arquivadas recentes (web.archive.org, 2024-09 e 2024-11) das páginas antigas — nunca de diretório externo. Fonte de cada campo documentada em comentário no topo do arquivo.

## Sistema visual — hierarquia por cor e spacing

17. **Papéis semânticos de texto e spacing substituem opacity (2026-08-20).** Refinamento de composição responsiva (auditoria sobre navegação real, mobile e desktop) trocou o padrão anterior de hierarquia textual por `color: inherit` + `opacity` por papéis explícitos, reaproveitados pela Home e pelas páginas de empresa:
    - **Cor de texto:** `--text-primary/secondary/muted/accent` (superfícies claras) e `--text-on-dark-primary/secondary/muted/accent` (superfícies escuras), definidos em `app/globals.css`. Regra geral do sistema: hierarquia textual usa cor explícita, não opacidade sobre a cor-base — `opacity` continua reservado a estados de interação (hover/disabled) e elementos decorativos, não a hierarquia de conteúdo.
    - **Spacing intra-bloco:** `--gap-eyebrow-title`, `--gap-title-body`, `--gap-body-support`, `--gap-support-cta` — poucos papéis reutilizáveis (relação eyebrow→título, título→corpo, corpo→bloco de apoio, bloco de apoio→CTA), não um token por seção.
    - **Botões no mobile:** CTAs apresentados visualmente como botão ocupam 100% do content container que já envolve o texto acima deles (não um container novo) abaixo de ~640px; links editoriais (cross-links de conteúdo, não a conversão principal da seção) ficam fora dessa regra e preservam largura de conteúdo.

    Consumido por `components/shared`, `components/home` e pelas páginas de Almeida Ambiental, Almeida Equipamentos, Saturno e Contato. `/historia` e `/home2`/`/home3`/`/home4` não foram alterados e não consomem este sistema.

## Arquitetura de informação — página Contato (reconstrução visual)

19. **Reconstrução da arquitetura visual de `/contato` (2026-08-20).** Validação em smartphone real apontou que a arquitetura anterior (fundo alternando cream/verde por empresa, muitos níveis de label uppercase, telefone duplicado como link azul abaixo do botão de ação, mapas ilustrativos) fragmentava a página em mini landing pages. Reconstrução substitui isso por:
    - **Superfície única.** Depois do Hero (verde floresta), diretório + as três unidades vivem sobre a mesma superfície clara contínua (`--color-stone-warm`) — sem alternância `toneStone`/`toneStoneAlt`/`toneForest` por unidade. Unidades são separadas por spacing e divisor (`border-top`), nunca por mudança de fundo. CTA terminal ("Três frentes. Um mesmo Grupo.") permanece escuro — a cor volta a marcar mudança de função da página, não identidade de empresa.
    - **Diretório compacto.** Os três blocos altos ("Ver unidade") viraram três pílulas clicáveis (`.directoryChip`, altura 44px) — uma linha no desktop, scroll horizontal no mobile. Numeração 01/02/03 removida (não acrescentava informação).
    - **Gramática única.** As três unidades usam exatamente a mesma ordem de informação: identidade (eyebrow/headline/descrição/nota) → CNPJ (metadata recuada, `text-muted`) → Localização (endereço + Google Maps real + ações Maps/Waze) → Canais de contato. Implementado como grid nomeado (`grid-template-areas`) com quatro itens diretos — a ordem mobile empilhada bate exatamente com a ordem exigida (identidade → CNPJ → localização → canais), e o desktop reorganiza em duas colunas (6fr/7fr) sem duplicar DOM.
    - **Canais sem duplicação.** Cada canal é uma única unidade de informação — nome do canal (Atendimento/Logística/Telefone/...), "tipo · número" como meta muted, uma única ação como botão. O número deixou de aparecer como link azul separado abaixo do botão.
    - **Google Maps real, sem chave/API.** Os mapas ilustrativos gerados via Magnific (`public/contato/mapa-sao-jose.webp`, `mapa-blumenau.webp`) foram removidos. No lugar, `lib/contact-data.ts` gera um iframe `https://www.google.com/maps?q=...&output=embed` por unidade — mecanismo keyless do próprio Google Maps (mesmo resultado prático do "Incorporar um mapa" da UI do Maps), sem Maps Embed API, sem chave, sem configuração de billing. `loading="lazy"` em todos os iframes.
    - **Araquari validado.** O endereço de Araquari (Rua Antonio Amorim, 890, Porto Grande, Araquari/SC, CEP 89245-000) apontado pela tarefa foi confirmado de forma independente via consulta pública ao CNPJ 04.910.399/0002-80 (receitaws.com.br, espelho da Receita Federal, 2026-08-20): situação ATIVA, fantasia "ALMEIDA AMBIENTAL", mesmo logradouro/número/bairro/CEP. Araquari passou a ter a mesma arquitetura completa (endereço + Google Maps + Maps/Waze) das outras duas unidades — deixa de ser a unidade "mais curta".
    - **`IllustrativeBadge` continua existindo** (usado por Equipamentos, MaterialGrid, TimelineEventRow, HeroDecades, CompanyHero, ProductRotation) — só deixou de ser usado em `/contato`, cujos mapas agora são reais.
    - Isso substitui o registro de "mapas de São José e Blumenau são ilustrações editoriais" da lista de decisões pendentes abaixo.

## Sistema visual — botões e iconografia funcional

18. **Hierarquia de três papéis para CTAs e iconografia funcional única (2026-08-20).** Rodada de refinamento visual sobre validação humana do Preview consolidou dois sistemas que já existiam parcialmente (fragmentados entre `home.module.css`, `company-page.module.css` e `CompanyHero.module.css`) em regras explícitas:
    - **Botões:** todo CTA que encerra uma seção e pede uma ação explícita do visitante usa `.btn` + um modificador de tom (`.btnSolidGold`/`.btnPrimary` para a ação principal do contexto, `.btnOutlineOnLight`/`.btnOutlineOnDark`/`.btnSecondary` para ação secundária) — nunca texto + seta sozinho. O link editorial (`.btnEditorial`/`.editorialLink`, texto + seta) continua existindo como terceiro papel, reservado a navegação textual realmente secundária (cross-links dentro de texto corrido, Footer) — não para CTAs que fecham uma seção.
    - **Iconografia funcional:** `components/icons.tsx` ganhou um conjunto único de ícones de linha (`PROCESS_STEP_ICONS`, por posição — 6 etapas: Diagnóstico, Coleta, Triagem, Trituração, Descaracterização, Destinação; `MATERIAL_ICONS`, por nome exato de material; `BENEFIT_ICONS`, por texto exato de benefício de equipamento) para apoiar escaneabilidade de processo/material/categoria técnica — nunca decoração. Mesmo viewBox, mesmo stroke, sem preenchimento colorido, sem bolinha decorativa, sem emoji. Reaproveitado por Home (processo), Almeida Ambiental (processo + 12 materiais), Almeida Equipamentos (6 categorias de material + "Ideal para"/"Benefícios" das fichas de produto) e Saturno (12 materiais) — o mesmo material usa sempre o mesmo ícone entre páginas. Cor do ícone segue o papel semântico de texto da superfície (`--role-secondary` sobre clara ou escura), dourado reservado a números/metadata, não a ícones por padrão. **Correção 2026-08-20:** `PROCESS_STEP_ICONS` tinha só 5 entradas — Descaracterização reaproveitava o mesmo ícone (um pin de localização) usado por Destinação, sem etapa própria, e a Home não representava Destinação. Cada uma das 6 etapas tem ícone próprio desde então; Descaracterização não usa mais pin (passou a um ícone de documento/tiras picotadas), Destinação usa seta-até-linha-final.
    - **Exceção de cor — WhatsApp em `/contato` (2026-08-20).** Os botões de WhatsApp na página `/contato` usam o verde tradicional da marca (`#25d366`) em vez da paleta institucional — exceção consciente e restrita a essa página (`.btnWhatsApp`, `components/contato/contato.module.css`), pelo valor de reconhecimento imediato da plataforma. Não é um token global novo nem precedente para usar cores de terceiros em outras páginas.

## Identidade visual — assinatura oficial e símbolo editorial

20. **Assinatura vetorial oficial substitui a logo PNG com plaqueta no Header (2026-08-27).** A reconstrução do símbolo do Grupo Almeida foi aprovada visualmente pelo cliente. A antiga `public/brand/logo-grupo-almeida.png` (fundo opaco, exigia uma "plaqueta" clara no Header escuro — pendência registrada abaixo) foi substituída por assinaturas com fundo transparente normalizadas em `public/brand/`: `logo-grupo-almeida-white.png`/`logo-grupo-almeida-dark.png` (logo completa) e `simbolo-grupo-almeida-color.svg`/`simbolo-grupo-almeida-white.svg`/`simbolo-grupo-almeida-dark.svg` (símbolo isolado, cópias exatas dos SVGs aprovados pelo cliente, sem alteração de geometria). SVG passa a ser o formato preferencial de marca no site; PNG só é usado onde não existe um SVG de origem aprovado (caso atual da logo completa — o cliente forneceu SVG apenas do símbolo isolado, não da logo completa com o texto "Grupo Almeida"; ficou pendente abaixo).
21. **Símbolo isolado como elemento editorial de fundo, nunca como pattern (2026-08-27).** `components/shared/BrandWatermark.tsx` permite usar o símbolo como assinatura arquitetônica de fundo em superfícies específicas — pontual, um símbolo grande por seção, nunca repetido, nunca centralizado como selo. Em superfície escura usa-se a versão branca do símbolo em baixa opacidade; em superfície clara pode-se usar a versão colorida histórica em baixa opacidade. Os três verdes históricos do símbolo (`#7A991E`/`#A3CC51`/`#D0E68A`) não são substituídos pelos tokens de cor do site. Aplicado nesta rodada em três superfícies (CTA final das páginas de empresa, Impacto Positivo da Home, seção clara da Almeida Equipamentos na Home) como validação da linguagem — não em toda seção do site.

## Decisões pendentes

- Confirmar com a Almeida Equipamentos se existe e-mail institucional próprio. Não encontrado nem na home atual nem em nenhuma captura arquivada da empresa — `/contato` não exibe e-mail para ela (ver `lib/contact-data.ts`).
- Confirmar se o endereço de São José (Distrito Industrial) usado no bloco Almeida Equipamentos de `/contato` é de fato o endereço atual dela, e não só o herdado da Almeida Ambiental por estarem na mesma cidade — não foi possível reverificar de forma independente (mesma ressalva já feita pela tarefa que criou a página).
- Confirmar se a linha de Fax (idêntica ao telefone) ainda faz sentido exibir para Almeida Ambiental/Equipamentos, ou se é um canal já obsoleto que pode ser removido de `/contato`.
- Confirmar número/link oficial do WhatsApp do Grupo Almeida.
- Resolvido em 2026-08-27 (ver Seção 20 acima): Header/Footer usam `logo-grupo-almeida-white.png`/`logo-grupo-almeida-dark.png`, fundo transparente, sem plaqueta.
- Pendente: o cliente forneceu SVG aprovado apenas do símbolo isolado, não da logo completa (símbolo + texto "Grupo Almeida") — Header e Footer usam a logo completa em PNG (fundo transparente) porque não existe um SVG de origem para vetorizar sem redesenhar a peça. Solicitar ao cliente o arquivo vetorial da logo completa quando disponível, para trocar `logo-grupo-almeida-white.png`/`logo-grupo-almeida-dark.png` por SVG equivalente.
- Confirmar valor oficial do dourado de destaque usado na Home (o valor atual, `#C9A227`, é uma referência inicial da nova direção cromática, assim como o dourado anterior usado por /home2 e /home3).
- As fotografias de `/historia` (`public/historia/*.webp`) são reconstituições ilustrativas geradas via IA (Magnific/MCP), marcadas como tal na interface ("Imagem ilustrativa") e centralizadas em `lib/historia-data.ts` (`sourceType: "illustrative"`). Substituir por fotografia real do acervo do Grupo Almeida assim que disponível — perguntar à equipe quais desses momentos têm registro fotográfico real.
- Reconfirmar em dispositivo físico real, antes do go-live, o comportamento de autoplay do vídeo do Hero em iOS Safari.
- Resolvido em 2026-08-20 (ver Seção 19 acima): `/contato` usa Google Maps real (iframe keyless) nas três unidades, incluindo Araquari — endereço validado contra o cadastro público do CNPJ 04.910.399/0002-80.
