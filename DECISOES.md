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

13. **Vídeo/scrollytelling não é arquitetura protegida.** O vídeo controlado por scroll é parte da experiência atual da Home, mas sua implementação técnica (componentes, CSS, estratégia responsiva, mecanismos de layout) pode ser refatorada quando necessário para atingir a direção de design vigente.
14. **393×852 não é restrição permanente.** Foi uma referência de design mobile usada em uma fase do projeto, não uma regra de arquitetura a preservar.

## Decisões pendentes

- Confirmar número/link oficial do WhatsApp do Grupo Almeida para o CTA principal da Home.
- Confirmar arquivo vetorial oficial da logo do Grupo Almeida.
- Confirmar valor oficial do dourado/amarelo de destaque usado na Home.
- Reconfirmar em dispositivo físico real, antes do go-live, a ausência de engasgo de seek do vídeo institucional.
