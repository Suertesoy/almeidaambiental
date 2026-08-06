---
description: Fecha o dia de trabalho e grava o diário de bordo do projeto
---

Feche o dia de trabalho deste projeto.

## 1. Levante o que aconteceu hoje

- Commits de hoje (`git log --since=midnight --oneline`) e arquivos tocados
- O que foi para produção (Se não houver evidência verificável de que algo foi efetivamente publicado em produção, registrar como: "Não confirmado" ou "Nada confirmado em produção hoje". Nunca inferir produção apenas pela existência de commit, push ou alteração no código.)
- O que quebrou e como foi resolvido
- O que ficou pela metade

Se não houver commit hoje, use o que estiver no diff de trabalho e o que aconteceu na conversa.

## 2. Escreva `diario/AAAA-MM-DD.md`

Use a data de hoje. Se o arquivo já existir, **complemente** — nunca sobrescreva.

Estrutura:

```markdown
# AAAA-MM-DD

## O que mudou no site
## Como foi feito
## Decisões tomadas
## Problemas e correções
## Ficou pendente
```

Regras de escrita (seção 13 do `AGENT_RULES_SITE.md`):

- **Português, para um desenvolvedor que nunca viu o projeto.** Explique o porquê, não só o quê.
- **Máximo de uma tela.** Dia sem nada relevante = duas linhas.
- **Nunca cole código.** Cite arquivos e pastas pelo nome; o código está no Git.
- **Registre o que deu errado**, não só o que funcionou.
- Seção sem conteúdo no dia: escreva "—" e siga.

## 3. Atualize `diario/HISTORICO.md`

Acrescente **uma linha** no topo da tabela: data + resumo de até 12 palavras. Crie o arquivo se não existir.

## 4. Propague o que for estrutural

- Decisão que muda o rumo do projeto → também em `DECISOES.md`
- Pendência, ideia adiada ou problema não resolvido → também em `DEPOIS.md`
- Conta criada, serviço ativado ou acesso obtido → também em `ACESSOS.md`

O diário conta a história; esses três guardam o estado atual.

## 5. Commit

Mensagem: `Diário: AAAA-MM-DD`
O commit deve incluir apenas os arquivos de documentação modificados pelo ritual de fechamento.
Nunca executar `git add .` indiscriminadamente durante esse ritual.
Não incluir automaticamente código, arquivos funcionais ou alterações ainda não commitadas.
Se houver mudanças de código pendentes no working tree, deixá-las intactas e informar isso no resumo final.

## 6. Responda no chat

Resumo de 3 a 5 linhas, em português simples. **Não repita o arquivo inteiro** — ele já está gravado. Termine apontando o que a próxima sessão deveria pegar primeiro.
