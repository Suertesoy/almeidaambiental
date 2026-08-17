# Regras de Trabalho — Site Institucional Grupo Almeida

Este arquivo orienta como trabalhar neste projeto. São diretrizes leves, não um protocolo rígido.

## Regra 1 — Fonte da verdade

Para uma tarefa comum, leia apenas:

- `CONTEXTO_PROJETO_SITE.md`
- `DECISOES.md`
- o arquivo diretamente relacionado à tarefa

Não é preciso ler automaticamente histórico arquivado, diários, `DEPOIS.md` ou `FECHAR_DIA.md`. Consulte esses documentos apenas quando a tarefa realmente exigir investigar histórico, planejar ou fechar o dia.

## Regra 2 — Pedido atual tem prioridade

A instrução explícita atual do responsável pelo projeto pode substituir decisões de implementação anteriores. Se ele fornecer um novo Figma ou uma nova referência visual, essa referência substitui versões anteriores — inclusive geometria, cores e estrutura já implementadas.

## Regra 3 — Design é intenção, não coordenada

Em tarefas de frontend visual, o Figma define direção de arte, hierarquia, conteúdo e relações visuais. Não transforme automaticamente coordenadas de um frame em arquitetura responsiva rígida. Implemente responsividade seguindo boas práticas, usando o Figma como referência de intenção.

## Regra 4 — Autonomia técnica

Você pode alterar e refatorar os arquivos relacionados necessários para cumprir corretamente o objetivo pedido. Não preserve uma arquitetura anterior apenas porque ela existe ou porque foi documentada historicamente em algum momento. Não é necessário pedir autorização arquivo por arquivo — evite apenas mudanças realmente fora do objetivo da tarefa.

## Regra 5 — Segurança factual

Nunca invente números, certificações, clientes, parceiros, capacidade, datas, indicadores, prêmios ou qualquer informação institucional. Quando houver dúvida, marque como pendente de validação.

## Regra 6 — Separação de projetos

Não misture o Site Institucional com a Plataforma Operacional Almeida. Não adicione Supabase, CRM, agente de atendimento ou infraestrutura de plataforma sem pedido explícito e específico para o site.

## Regra 7 — Segurança e infraestrutura

Não versione segredos, senhas, tokens ou chaves de API. `ACESSOS.md` registra apenas o que é necessário, quem fornece e o status — nunca o segredo em si. Não altere domínio, DNS, e-mail ou infraestrutura externa sem autorização explícita.

## Regra 8 — Qualidade

Antes de concluir uma mudança funcional relevante: rode o build, verifique erros, e teste os viewports relevantes quando houver impacto visual. Informe o que realmente foi validado. Escolha testes proporcionais ao risco da mudança — não é necessário rodar uma bateria fixa de viewports para todo ajuste pequeno.

## Regra 9 — Documentação proporcional

Atualize `DECISOES.md` somente quando houver uma nova decisão durável de produto, negócio, arquitetura de informação, infraestrutura ou stack/padrão técnico de longo prazo. Não registre ali um margin que mudou, um breakpoint ajustado, uma estratégia de CSS experimentada ou uma correção visual pontual — o Git já registra a implementação.

## Regra 10 — Deploy atual

Enquanto a Vercel continuar sendo ambiente de homologação, uma tarefa que pedir explicitamente push para `main` pode fazê-lo depois do build e dos testes, sem exigir um preview separado. Quando o site entrar em produção real, esta regra deve ser revista.

## Condições comerciais que não podem ser alteradas pelo agente

Pagamento do projeto: 50% no início, 50% na entrega. Confirmado.

A versão em inglês é entregue como cortesia dentro deste projeto e deve corresponder ao conteúdo institucional aprovado da versão principal — isso não autoriza aumentar escopo por conta própria.

Nenhum agente pode alterar valor, condição de pagamento ou escopo comercial sem instrução explícita do responsável pelo projeto. Não invente nenhuma outra condição financeira além das informações acima.
