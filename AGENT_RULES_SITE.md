# Regras para Agentes (Site Institucional Grupo Almeida)

Este arquivo define COMO qualquer agente de IA deve trabalhar neste projeto.

## REGRA 1
Antes de qualquer trabalho relevante, ler:
- AGENT_RULES_SITE.md
- CONTEXTO_PROJETO_SITE.md
- DECISOES.md
- última entrada de diario/HISTORICO.md

## REGRA 2
Uma tarefa por vez.
Se o pedido envolver várias mudanças independentes, primeiro organizar o trabalho em unidades pequenas.

## REGRA 3
Antes de implementar, declarar um critério de aceite observável:
QUANDO [ação]
ENTÃO [resultado]

## REGRA 4
Mudança não solicitada não deve ser implementada.
Sugestões futuras vão para DEPOIS.md.

## REGRA 5
Toda decisão estrutural nova deve ser registrada em DECISOES.md.

## REGRA 6
Ao terminar uma unidade de trabalho, atualizar diario/HISTORICO.md.

## REGRA 7
Quando existir código, toda alteração funcional deve passar por ambiente de preview antes de produção.
Nenhuma publicação em produção sem validação humana explícita.

## REGRA 8
Não alterar domínio, DNS, hospedagem, e-mail ou infraestrutura existente sem autorização explícita.

## REGRA 9
Nunca armazenar senhas, tokens, chaves de API ou credenciais em arquivos versionados.
ACESSOS.md registra apenas:
- qual acesso é necessário
- quem deve fornecer
- status
- observações
Nunca registrar a senha ou segredo.

## REGRA 10
Não inventar informações institucionais do Grupo Almeida.
Números, datas, capacidades, certificações, parceiros, prêmios, indicadores ambientais e afirmações institucionais devem ter fonte ou validação do cliente.
Quando houver dúvida, marcar como pendente de validação.

## REGRA 11
O site é institucional.
Não transformar automaticamente textos em linguagem agressiva de venda, funil, marketing ou landing page.

## REGRA 12
Manter separação total entre este site e a Plataforma Operacional Almeida.
Não adicionar Supabase, sistema de atendimento, agente de IA, CRM, painel administrativo ou integrações da plataforma apenas porque aparecem em outros documentos do Grupo Almeida.
Só implementar se houver decisão explícita específica para o site.

## REGRA 13
Código deve ser legível e documentado para permitir continuidade por outro profissional no futuro.

## REGRA 14
Nenhuma refatoração estrutural sem pedido ou justificativa previamente apresentada.

## REGRA 15
Antes do futuro go-live haverá checklist específico para:
- build
- responsividade
- links
- SEO
- metadados
- formulários/CTAs
- analytics, caso contratado/configurado
- domínio
- redirecionamentos
- indexação
- segurança
- site antigo comprometido
- smoke test pós-publicação

## CONDIÇÕES COMERCIAIS QUE NÃO PODEM SER ALTERADAS PELO AGENTE

Pagamento do projeto do site:
50% no início do projeto.
50% na entrega.

A divisão 50/50 está confirmada.

Versão em inglês:
A versão em inglês será entregue como brinde/cortesia dentro deste projeto.

Ela NÃO deve aparecer na documentação interna como cobrança adicional.

Isso não autoriza aumentar escopo por conta própria.
A versão em inglês deve corresponder ao conteúdo institucional aprovado da versão principal.

Nenhum agente pode alterar valor, condição de pagamento, escopo comercial ou transformar o inglês em item cobrado sem instrução explícita do responsável pelo projeto.

IMPORTANTE:
Não inventar nenhuma outra condição financeira além das informações acima.
