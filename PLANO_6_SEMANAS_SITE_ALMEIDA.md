# Plano de execução — Novo site institucional Grupo Almeida
### 6 semanas · perspectiva de UX/UI Designer · Seg–Qui integral, Sexta só de manhã
*Versão 2 — atualizada após a proposta correta, a análise de informações públicas e a definição do objetivo institucional/investidor.*

---

## Como usar este documento

- As semanas são numeradas, não datadas. **A Semana 1 começa no dia útil seguinte ao envio da mensagem para a Helóra** — não espere a call para começar.
- Toda sexta à tarde é folga. Toda sexta de manhã fecha a semana.
- O roteiro detalhado da call de abertura está em documento separado (`ROTEIRO_CALL_KICKOFF_ALMEIDA.md`). Este plano só marca **quando** ela acontece.
- Cada semana tem um **critério de aceite** claro e observável.

---

## 0. O que mudou desde a primeira versão deste plano

**Pagamento.** A Helóra pediu 50% na assinatura e 50% no go-live, no lugar do 40/30/30 da proposta. A previsão anterior já estava certa. **Consequência prática: a Semana 4 deixa de ter marco financeiro.** A aprovação do design continua sendo pedida e registrada por escrito, mas sem fatura junto — o que costuma acelerar o aceite.

**Descoberta adiantada.** A análise das informações públicas já entregou linha do tempo, estrutura societária, praças, valores declarados, parcerias internacionais e números de impacto. A Semana 1 encolhe: ela deixa de ser levantamento e vira **confirmação e arquitetura**.

**Objetivo institucional ampliado.** O site também existe para dar peso institucional e eventualmente atrair investidor, inclusive estrangeiro. Isso não cria página nova — aprofunda a página do Grupo Almeida e a de Sustentabilidade, e muda o peso do inglês.

**Inglês.** Entra como brinde, entregue de fato, com o enquadramento explícito de que outros idiomas são serviço à parte. A regra segue valendo: **nada nasce em inglês**, e página com EN incompleto não vai ao ar em EN.

**Segurança do site atual.** `almeidaambiental.com.br` apresenta links de spam injetados, típico de WordPress invadido. Isso não é detalhe de migração: é o item mais urgente do projeto, porque afeta o domínio que o site novo vai herdar.

**Plano de manutenção.** R$ 450/mês, opcional, começando após os 30 dias de garantia, com renovação automática mediante adesão expressa. Vira assunto da entrega, não do começo.

---

## 1. Sua grade semanal padrão

Janela declarada: 9:00–12:00 e 13:30–18:00.

### Segunda a Quinta

| Horário | Bloco | O que acontece |
|---|---|---|
| 09:00–12:00 | **Bloco A — Almeida (foco profundo)** | A tarefa mais difícil do dia. Nada de e-mail, nada de WhatsApp. |
| 12:00–13:30 | Almoço | — |
| 13:30–16:30 | **Bloco B — Almeida (execução)** | Produção, ajuste, implementação, revisão contra o Figma, trabalho com agentes. |
| 16:30–17:30 | **Bloco C — trilha pessoal (rotativa)** | Ver rotação abaixo. |
| 17:30–18:00 | **Fechar o dia** | Commit, entrada no `diario/`, o que trava amanhã. Procedimento de `FECHAR_DIA.md`. |
| 18:00–18:30 | Japonês | Fora da janela de trabalho, todo dia. |

**Almeida recebe cerca de 25h/semana.** A folga é deliberada: é ela que absorve o atraso de material, que segue sendo o risco número um.

### Sexta

| Horário | Bloco |
|---|---|
| 09:00–10:30 | Almeida — fechar o que ficou aberto |
| 10:30–11:15 | Diário da semana + **resumo escrito para a Helóra** |
| 11:15–12:00 | Manutenção dos projetos já entregues |
| 12:00 em diante | **Folga.** |

### Rotação do Bloco C

| Dia | Trilha |
|---|---|
| Segunda | Prospecção — rodar a captação, montar a lista da semana |
| Terça | Vagas — aplicar para 3 a 5 posições, alimentar o estudo de caso deste projeto |
| Quarta | Manutenção — projetos entregues |
| Quinta | Prospecção (follow-up) |

Sobre a busca de vaga: este projeto é material de portfólio forte — grupo multimarca, arquitetura de informação real, restrição de conformidade real, objetivo de investidor. Nas terças, vá guardando print e decisão. O `diario/` já faz metade desse trabalho.

---

## 2. As seis semanas, dia a dia

---

## SEMANA 1 — Confirmação e arquitetura

> **Critério de aceite:** QUANDO a Helóra abrir o mapa do site que enviei na sexta, ENTÃO ela vê as sete páginas, o que entra em cada uma, e uma lista curta do que ainda falta ela mandar.

### Segunda
- **Bloco A** — Montar a lista de materiais como documento compartilhável. Escrever e enviar a mensagem para a Helóra propondo a call e anexando a lista. **Enviar até as 11h.**
- **Bloco B** — Criar o repositório e os documentos vivos: `CONTEXTO_PROJETO_SITE.md`, `DECISOES.md`, `DEPOIS.md`, `ACESSOS.md`, `diario/HISTORICO.md`, `README.md`. Corrigir no `AGENT_RULES_SITE.md` o que mudou (pagamento 50/50 confirmado, EN entregue como brinde). Primeiro commit.

### Terça
- **Bloco A** — **Auditoria do site atual, com foco duplo:** inventário de todas as URLs (Almeida Ambiental, Saturno, Equipamentos, páginas internas) para o mapa de redirects, **e levantamento do comprometimento de segurança** — onde os links de spam aparecem, em quais páginas, se estão indexados no Google. Isso vira material para o Bloco 6 da call.
- **Bloco B** — Extrair todo texto institucional reaproveitável do site atual. É a matéria-prima que a proposta permite "revisar e adaptar".

### Quarta
- **Bloco A** — **Preparar a call** usando o roteiro: preencher a tabela de confirmação com o que já está levantado, montar o bloco de perguntas de conformidade e o bloco investidor.
- **Bloco B** — **Mapa de públicos e percursos.** Agora com um público a mais: cliente contratante, fornecedor, candidato, órgão fiscalizador, parceiro internacional e **investidor**. Para cada um, o que ele quer em 30 segundos e em qual página encontra.

### Quinta
- **Bloco A** — **Call de abertura**, se confirmada. Se não, use o bloco para o benchmark (seis a oito sites: grupos ambientais brasileiros, gestoras de resíduo, e dois ou três grupos multimarca de outro setor com site voltado a investidor).
- **Bloco B** — Transcrever, escrever o resumo de decisões e mandar. Preencher `DECISOES.md` e `ACESSOS.md`. Mandar a lista de materiais para a pessoa que ela indicou.

### Sexta (manhã)
- Consolidar a **Arquitetura da Informação v1**: sitemap das sete páginas e, para cada uma, a **matriz de conteúdo** — seções, textos, fotos, número de WhatsApp, CTA. Tudo que falta vira `[[FALTA: ...]]`.
- Enviar em uma página só. Fechar a semana e o diário.

> **Se o material não chegou até quinta:** comunique por escrito, sem tom de cobrança, que a contagem do prazo pausou naquela data (proposta, seção 8) e registre em `DECISOES.md`.

---

## SEMANA 2 — Fundação visual

> **Critério de aceite:** QUANDO eu abrir a Home no Figma em 375px, ENTÃO vejo a chamada principal, o que o grupo faz e um botão de contato antes de rolar — e os componentes já existem publicados no design system.

### Segunda
- **Bloco A** — Wireframes low-fi **mobile** da Home. Duas ou três versões da dobra inicial.
- **Bloco B** — Wireframes da página de Contato e do **template de página de empresa** — um molde só para Almeida Ambiental, Saturno e Equipamentos. É isso que faz sete páginas caberem no prazo.

### Terça
- **Bloco A** — **Duas direções visuais.** Uma mais sóbria e corporativa-técnica (que conversa melhor com o público investidor), outra mais aberta e ambiental. Diferença real, não duas variações da mesma coisa.
- **Bloco B** — Escolher uma, com justificativa de uma frase, e registrar em `DECISOES.md`. Definir tokens: paleta com contraste AA verificado, escala tipográfica, no máximo duas famílias, espaçamento, raio, sombra.

### Quarta
- **Bloco A** — **Design system base no Figma**: variáveis de cor e tipografia, grid 375/768/1280, e os componentes — botão, **botão de WhatsApp** (com texto que diz o destino, nunca só o ícone verde), card, header, footer, navegação mobile, rodapé com as marcas.
- **Bloco B** — **Esqueleto técnico.** Next.js vazio na Vercel, tokens traduzidos para o Tailwind, uma página de teste tipográfico. Objetivo: provar que o pipeline publica e ver a tipografia no navegador. Registrar contas criadas no `ACESSOS.md`, avisando antes se algo exigir cartão.

### Quinta
- **Bloco A + B** — **Home hi-fi mobile completa.** Conteúdo real onde já tem, `[[FALTA:]]` visível onde não tem. Nunca texto plausível inventado.

### Sexta (manhã)
- Home desktop. Checagem de contraste em todo texto sobre foto. Resumo semanal com uma imagem da Home, enquadrada como **prévia de progresso** — não gaste uma rodada de ajuste agora.

---

## SEMANA 3 — Internas e primeira rodada

> **Critério de aceite:** QUANDO a Helóra abrir o link do Figma, ENTÃO ela navega pelas sete páginas em mobile e desktop e entende o site inteiro sem eu explicar cada tela.

### Segunda
- **Bloco A** — Página **Grupo Almeida**. É a página mais importante do projeto agora: história desde 1985, estrutura das três empresas, mapa das praças, valores, e o que sustentar o peso institucional. **É aqui que o investidor pousa, não na Home.**
- **Bloco B** — Página **Almeida Ambiental**, refinando o template de empresa.

### Terça
- **Bloco A** — Página **Saturno Ambiental**, aplicando a decisão de marca fechada na call.
- **Bloco B** — Página **Almeida Equipamentos**: portfólio, modelos de aquisição (venda, aluguel, consignação) e as parcerias internacionais — **só com autorização de uso de logo confirmada**.

### Quarta
- **Bloco A** — Página **Sustentabilidade**. Os indicadores de impacto vivem aqui, sempre **com o ano declarado ao lado** e apenas os que a Helóra confirmou. Sem confirmação de metodologia, o número não sobe. E página de **Contato**.
- **Bloco B** — Estados e detalhes: menu aberto, foco de teclado, hover, 404, versões desktop faltantes. Montar o protótipo navegável e gravar um vídeo de 5 a 8 minutos apresentando.

### Quinta
- **Bloco A** — **Entrega do design para revisão**: protótipo + vídeo + lista curta do que ela precisa olhar. Peça retorno **consolidado**.
- **Bloco B** — Trabalho independente da aprovação: **mapa de redirects 301** completo, plano de `title` e `meta description` por página, imagens de Open Graph. O preview de WhatsApp importa mais que a média neste cliente.

### Sexta (manhã)
- Aplicar o retorno que já chegou. Resumo semanal.

---

## SEMANA 4 — Aprovação e início do desenvolvimento

> **Critério de aceite:** QUANDO eu abrir a URL de teste no celular, ENTÃO a Home e as páginas das empresas estão no ar e batem com o Figma aprovado.

### Segunda
- **Bloco A** — **Rodada 2**: ajustes consolidados. É a última rodada de design.
- **Bloco B** — Enviar para **aprovação formal**, com a frase explícita de que a aprovação encerra a etapa visual. Registrar por escrito em `DECISOES.md`. Sem fatura amarrada — o pagamento agora é 50/50.

### Terça
- **Bloco A + B** — Desenvolvimento da **Home**. Seu papel é de revisor visual: o agente escreve, você compara com o Figma em 375px primeiro. Divergência é bug do código. Commit por seção.

### Quarta
- **Bloco A** — Página **Grupo Almeida**.
- **Bloco B** — Página **Almeida Ambiental**.

### Quinta
- **Bloco A** — Página **Saturno Ambiental**.
- **Bloco B** — Página **Almeida Equipamentos**.

### Sexta (manhã)
- Página **Sustentabilidade**. Resumo semanal com o link do ambiente de teste, deixando claro que ainda não é a rodada de ajustes finais.

---

## SEMANA 5 — Contato, idiomas, SEO e desempenho

> **Critério de aceite:** QUANDO eu clico em qualquer botão de WhatsApp, ENTÃO o app abre no número da frente correta, com mensagem pré-escrita que menciona a página de onde vim.

### Segunda
- **Bloco A** — Página de **Contato** completa: unidades, telefones, e-mail, endereços, horários.
- **Bloco B** — **Todos os links de WhatsApp**, um por frente, com mensagem contextual. Página **404** com caminho de volta.

### Terça
- **Bloco A** — Estrutura de **internacionalização**: nenhuma string dentro de componente, tudo em arquivo de tradução, rotas `/pt` e `/en`, `hreflang` e `lang` corretos.
- **Bloco B** — **Revisão final do texto em português.** O PT precisa estar fechado antes de o EN existir.

### Quarta
- **Bloco A** — **Versão em inglês.** Como a geração é rápida, o tempo aqui é de **revisão**, não de produção: nomes próprios não se traduzem (Grupo Almeida, Almeida Ambiental, Saturno Ambiental, Almeida Equipamentos), siglas regulatórias brasileiras ganham explicação curta na primeira ocorrência, e unidades de medida e números conferidos um a um. Se o público investidor estrangeiro é real, esta é a versão que ele vai ler — ela merece uma leitura inteira, em voz alta.
- **Bloco B** — Registrar em `DECISOES.md` que o EN foi entregue como cortesia não contratada, e que outros idiomas são serviço à parte. Deixe isso também no resumo semanal para ela, por escrito — é o registro que evita o pedido de espanhol daqui a três meses.

### Quinta
- **Bloco A** — **SEO técnico**: títulos e descriptions únicos, estrutura semântica, `sitemap.xml`, `robots.txt`, Open Graph, dados estruturados de organização **apenas com dados fornecidos pelo cliente**.
- **Bloco B** — Implementar os **redirects 301** do mapa da Semana 3.

### Sexta (manhã)
- **Desempenho**: toda imagem por `next/image`. Rodar **Lighthouse mobile** e registrar o resultado no diário. Resumo semanal.

---

## SEMANA 6 — Revisão, publicação e entrega

> **Critério de aceite:** QUANDO alguém acessar `almeidaambiental.com.br` no celular, ENTÃO vê o site novo, com HTTPS, sem link quebrado, sem `[[FALTA:]]`, sem resquício do site antigo, e as URLs antigas do Google levam a páginas que existem.

### Segunda
- **Bloco A** — **QA em celular real**, não no simulador. Site inteiro, nas duas línguas.
- **Bloco B** — **Checklist de acessibilidade** página por página: um `<h1>` por página, hierarquia sem pular nível, `alt` em toda imagem, navegação por teclado com foco visível, área de toque confortável.

### Terça
- **Bloco A** — Varredura final de conteúdo: nenhum `[[FALTA:]]`, nenhum lorem ipsum, nenhuma foto de banco esquecida, **nenhum dado institucional que não tenha vindo do cliente**. Conferir que todo número de impacto tem ano declarado.
- **Bloco B** — **Entrega do ambiente de teste** → **rodada final**, a única fora do design. Peça retorno consolidado até quarta de manhã e diga que é a última.

### Quarta
- **Bloco A + B** — Aplicar ajustes finais. Preparar o go-live: domínio, DNS, certificado. **Combinar com quem administra a hospedagem antiga o desligamento do WordPress comprometido** — ele não pode ficar no ar em paralelo.

### Quinta — **GO-LIVE**
- **Bloco A** — Apontar o domínio, HTTPS ativo, com e sem `www` no mesmo lugar. Publicar. **Desativar o site antigo.**
- **Bloco B** — Pós-publicação, item por item: **testar cada redirect 301**; **clicar em cada link de WhatsApp e confirmar o número certo**; testar o preview de Open Graph mandando o link no WhatsApp; Analytics registrando acesso de verdade; Search Console verificado **na conta do cliente** com sitemap submetido; e **conferir no Google se ainda há resultado indexado com o spam antigo** — se houver, pedir remoção pelo Search Console.

### Sexta (manhã) — **Entrega e independência**
- `ACESSOS.md` completo, sem transferência pendente em aberto.
- Domínio, Vercel, Analytics e Search Console em contas do Grupo Almeida, ou transferência agendada com data.
- Nenhum custo recorrente restante no seu cartão.
- `README.md` que permite outro desenvolvedor rodar o projeto do zero.
- Comunicar **por escrito** o início da garantia de 30 dias, com a data.
- **Apresentar o plano de manutenção**: "a garantia começa hoje e vai até [data]; a partir dali, se quiser, entra o plano de R$ 450 que já está no contrato". A adesão é a caixa que ela marcou — só confirme.
- **Faturar os 50% finais.**
- Entrada final no diário e consolidação do `HISTORICO.md`.

---

## 3. Cadência de comunicação com a Helóra

- **Nunca pingue dúvida solta.** Junte em lote, uma vez por semana.
- **Resumo escrito toda sexta de manhã**, no máximo 8 linhas: o que ficou pronto, o que decidi por você e por quê, o que preciso de você, o que trava se não vier.
- **Traga decisão fechada.** "A ou B, recomendo A porque X".
- **Ela entra em três momentos:** call de abertura (Semana 1), aprovação do design (Semana 4), aprovação do ambiente de teste (Semana 6).
- **Material que falta é assunto de prazo, não de cobrança.** Comunique factualmente e registre a data.

---

## 4. Riscos e planos B

| Risco | Sinal de alerta | O que fazer |
|---|---|---|
| Material não chega | Semana 1 termina sem texto e sem foto | Pausa formal do prazo, com data. Continuar o que não depende dela: auditoria, benchmark, arquitetura, design system |
| Acervo de foto fraco | As fotos que chegam são de WhatsApp, escuras, desenquadradas | Decisão de design na Semana 2: layout que funciona com poucas fotos boas, mais tipografia e cor. Produção de foto está fora da proposta |
| Números de impacto sem metodologia | Ela não sabe dizer como foram calculados | O número não sobe. Num site que quer atrair investidor, dado não sustentado é passivo, não ativo |
| Autorização de logo de parceiro | Austropressen e Pöttinger sem confirmação escrita | Não publique. Cite a parceria em texto, sem a marca, até ter autorização |
| Aprovação do design atrasa | Passou a segunda da Semana 4 | Cobrar uma vez, registrar a data, e desenvolver o que já está estável — design system, header, footer, contato |
| Site antigo continua no ar | Ninguém localiza quem administra a hospedagem | Levante isso na Semana 1, não na 6. Enquanto o WordPress comprometido estiver ativo, o problema de SEO persiste mesmo com o site novo publicado |
| Pedido de formulário, espanhol, CMS ou integração | Qualquer um desses | Fora do escopo por natureza. Avise, não implemente, registre em `DEPOIS.md` |
| Números de WhatsApp errados | Descoberto no go-live | Por isso o teste de clicar em cada link está no checklist. Levar ao número errado é pior do que não ter botão |

---

## 5. Checklist de arranque — hoje

- [ ] Atualizar o `AGENT_RULES_SITE.md`: pagamento 50/50 confirmado pela cliente, EN entregue como brinde
- [ ] Montar a lista de materiais como documento compartilhável
- [ ] Enviar a mensagem para a Helóra: proposta de call + lista + pedido de responsável pelo material
- [ ] Criar o repositório e os quatro documentos vivos + `diario/`
- [ ] Bloquear a grade da seção 1 no calendário, incluindo a folga de sexta à tarde
- [ ] Copiar a Semana 1 para o `GUIA_EXECUCAO_SITE.md`
- [ ] Levar o contrato para leitura de um advogado antes da primeira assinatura

---

# ANEXO A — Plano alternativo: trabalhar por dependência, não por semana

*Usar quando a call de abertura estiver adiada (cirurgia da Helóra, viagem, qualquer indisponibilidade prolongada).*

A lógica muda: em vez de "Semana 1, Semana 2", o trabalho passa a ser organizado por **de quem cada coisa depende**. Você executa tudo da Trilha 1, libera o que der da Trilha 2 com uma pessoa delegada, e só a Trilha 3 fica parada.

---

## Trilha 1 — Depende só de você

Isso é trabalho real de projeto, não enrolação. Rende de duas a três semanas cheias.

**Fundação do projeto**
- Repositório, documentos vivos (`CONTEXTO_PROJETO_SITE.md`, `DECISOES.md`, `DEPOIS.md`, `ACESSOS.md`, `diario/`), `README.md`
- Atualizar o `AGENT_RULES_SITE.md` com o que mudou

**Diagnóstico do site atual**
- Inventário completo de URLs (Almeida Ambiental, Saturno, Equipamentos, internas)
- Levantamento do comprometimento de segurança: onde o spam aparece, o que está indexado
- Extração de todo texto institucional reaproveitável
- **Mapa de redirects 301 em rascunho** — só depende das URLs antigas e da arquitetura nova

**Estratégia**
- Benchmark: grupos ambientais brasileiros, gestoras de resíduo, e grupos multimarca com site voltado a investidor
- Mapa de públicos e percursos, incluindo o investidor
- Arquitetura da informação v1 e matriz de conteúdo das sete páginas, com `[[FALTA:]]` em tudo que não veio

**Design**
- Duas direções visuais e escolha justificada
- Design system completo: tokens, grid 375/768/1280, botão, botão de WhatsApp, card, header, footer, navegação mobile, rodapé
- **Wireframes mobile das sete páginas**
- Layouts hi-fi até onde o conteúdo permitir, com marcadores visíveis onde falta

**Técnica**
- Esqueleto Next.js na Vercel, tokens no Tailwind, **i18n estruturado desde o primeiro commit**
- Componentes base implementados em código — camada segura, porque não depende do layout final aprovado
- Rascunho de `title` e `meta description` por página, `robots.txt`, estrutura de `sitemap.xml`

> **O limite desta trilha:** construir as sete páginas em código antes da aprovação do design. Isso é retrabalho garantido e contraria a Regra 10. Componente e design system, sim; página final, não.

---

## Trilha 2 — Depende de material, mas não dela

Tudo aqui pode vir de **outra pessoa da empresa**. É por isso que a pergunta "quem centraliza o envio de material" vale mais, agora, do que a call inteira.

- Logos em vetor das quatro marcas, manual de marca, aplicações reais
- Acervo de fotos das operações, frota, equipamentos, unidades, equipe
- Textos institucionais existentes, descrição de serviços, catálogo da Almeida Equipamentos
- Endereços, telefones fixos e horários de cada unidade
- Acessos: registrador do domínio, hospedagem WordPress, Analytics, Search Console, Google Meu Negócio

**O que essa trilha destrava:** a direção visual sai do abstrato, a Home hi-fi fica real, e as páginas das empresas ganham conteúdo de verdade em vez de marcador.

---

## Trilha 3 — Só ela

Fica parado, e tudo bem que fique.

- Assinatura do contrato e primeira parcela
- Licenças, certificações e o que pode ser afirmado publicamente
- Metodologia por trás dos números de impacto
- Números de WhatsApp por frente e quem atende cada um
- Objetivo investidor: tipo, mercado, o que destacar, o que não pode ser público
- Como a marca Saturno aparece — **decidível com autonomia**, ver abaixo
- Aprovação do design, aprovação do ambiente de teste, go-live

### Sobre a Saturno: decida com autonomia

Essa era a pergunta mais estrutural reservada para a call, e ela **já tem resposta no material que você mesmo levantou**: a Saturno foi adquirida em 2021 e manteve a própria marca pela força que já tinha no Vale do Itajaí. Isso é suficiente para decidir: **marca própria preservada dentro da casa do grupo.**

A autonomia para essa decisão já foi dada, e usá-la é o combinado — desde que registrada. Registre em `DECISOES.md` com essa justificativa e siga. Confirme na call como item de checagem, não como pergunta aberta.

---

## Sequência sugerida enquanto a call não acontece

| Ordem | O que fazer | Por que nessa ordem |
|---|---|---|
| 1 | Fundação do projeto + diagnóstico do site atual | O problema de segurança é o achado mais urgente e você precisa dele em mãos para a conversa de segunda |
| 2 | Arquitetura da informação + matriz de conteúdo | É o que transforma a lista de material em pedido específico, e não genérico |
| 3 | Design system e wireframes | Não dependem de uma única palavra de conteúdo |
| 4 | Esqueleto técnico + i18n + componentes em código | Blinda contra o retrofit de i18n, que é caro depois |
| 5 | Direção visual e Home hi-fi | Aqui a Trilha 2 começa a fazer falta: sem logo em vetor e sem foto, para de render |
| 6 | Páginas hi-fi com marcadores | Última coisa possível antes da aprovação dela |

Chegando ao item 6 sem a call, **pare de produzir e não force**. Use o tempo para a trilha pessoal e para os projetos em manutenção — e registre no diário que o projeto está aguardando, com a data.

---

## O que dizer no contato de segunda

Ela vai estar se recuperando. O contato precisa ser curto e pedir o mínimo possível. Três coisas, nessa ordem de prioridade:

1. **Quem centraliza o envio de material.** É o pedido que mais destrava e o que menos custa a ela — uma frase indicando uma pessoa.
2. **Assinatura do contrato e primeira parcela.** Não precisa de call: contrato assinado eletronicamente leva minutos. É o que permite você trabalhar tranquilo em vez de trabalhar por conta e risco.
3. **A call, quando ela estiver bem.** Sem data fixa. Deixe claro que o projeto anda enquanto isso e que você avisa quando a falta dela começar a travar de verdade.

> **Sobre o prazo:** comunique, de forma factual e sem cobrança, que a contagem das 4 a 6 semanas pausa neste ponto (proposta, seção 8) e registre a data em `DECISOES.md`. Não é pressão — é o registro que evita, daqui a dois meses, uma conversa sobre por que o site demorou.
