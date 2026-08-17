# Depois (Backlog e Ideias)

Este documento é o estacionamento de ideias e itens fora da tarefa atual. Estar aqui NÃO significa que o item está aprovado.

| Item | Motivo de estar aqui | Quando revisar | Status |
| --- | --- | --- | --- |
| Configuração do repositório remoto | Não faz parte da fundação documental inicial | Próxima fase técnica | Pendente |
| Criação do projeto na Vercel | Infraestrutura não será configurada agora | Fase de deploy/preview | Pendente |
| Configuração do domínio | Tarefa restrita a go-live ou infra | Fase de publicação | Pendente |
| Planejamento do desligamento/redirecionamento do site antigo | Exige análise e não bloqueia início | Antes do go-live | Pendente |
| Verificação pós-go-live de URLs antigas/spam indexado no Google | Depende da migração e site rodando | Após o go-live | Pendente |
| Analytics, caso seja decidido | Requer confirmação e conta criada | Fase de finalização | Pendente |
| Ferramentas de monitoramento, caso sejam necessárias | Extrapola escopo inicial | Avaliar no futuro | Pendente |
| Itens ou páginas adicionais sugeridos durante a descoberta | Manter escopo focado | Avaliação contínua | Pendente |
| Qualquer melhoria estrutural não contratada ou não aprovada | Evitar mudança não solicitada | Avaliação contínua | Pendente |
| Em `prefers-reduced-motion: reduce`, as dobras 2 a 9 continuam existindo só como âncoras (`scroll-anchor-static`, sem o conteúdo real renderizado) — usuário com esse ajuste vê apenas a dobra 1 e o vídeo parado no primeiro frame. Não foi alterado nesta tarefa por não ter sido pedido e por evitar inventar um novo layout de fallback sem direção visual definida | Fora do escopo desta rodada (conteúdo + motor de vídeo); mexer nisso exigiria decidir um layout alternativo para usuários com movimento reduzido | Próxima rodada de acessibilidade da Home | Pendente |
| Na Decisão 26/reconstrução da Decisão 28, a dobra "Almeida Equipamentos 2" (Section05Content) tinha um deslocamento horizontal deliberado de ~8px no mobile (centro em x=204,5px em vez de 196,5px, comentado no código antigo). A reconstrução para layout de fluxo (Decisão 28) centraliza essa dobra exatamente como as demais, sem reproduzir esse nudge de 8px — simplificação consciente para não acoplar um offset artesanal ao sistema de tokens fluidos; a diferença é sub-perceptível (~2% da largura em 393px) | Nuance artesanal de baixo impacto visual, não uma quebra de hierarquia/proporção; ficou fora do orçamento desta reconstrução estrutural | Se a cliente notar/pedir a assimetria de volta | Pendente |
