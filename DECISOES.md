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

## DECISÕES PENDENTES

(Espaço reservado para futuras decisões do projeto sem tentar resolvê-las agora)
