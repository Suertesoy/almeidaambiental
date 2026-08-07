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

## DECISÕES PENDENTES

(Espaço reservado para futuras decisões do projeto sem tentar resolvê-las agora)
