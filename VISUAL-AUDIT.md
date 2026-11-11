# Auditoria visual e funcional — 2026-11-11

## Cobertura

- Rota `/`: hero, catálogo, menu móvel e carrinho vazio.
- Playwright sem janela visível: capturas em 360 px (hero), 390 px (catálogo e carrinho), 768 px (catálogo) e 1440 px (hero). Medidas de largura e rolagem verificadas também em 430 px e 1920 px.
- Interações verificadas: troca de categoria mantém foco, carrinho abre com foco no botão de fechar, fundo fica inerte, envio por WhatsApp permanece desabilitado sem itens verificados e Escape fecha e devolve o foco.
- Console: nenhum aviso ou erro no momento da verificação.

## Achados e correções

| Gravidade | Local | Evidência e impacto | Correção | Revalidação |
| --- | --- | --- | --- | --- |
| Médio | Botão “Ver carrinho” em tablet | O fundo padrão do botão ficava claro com texto branco. | Fundo transparente explícito e hover com texto escuro. | Estilo calculado após recarga: fundo transparente e texto branco. |
| Médio | Categorias do cardápio | A troca recriava o botão e perdia o foco. | Foco devolvido à categoria ativa. | Playwright mostrou “Hot Sushi” ativo e focado após clique. |
| Médio | Carrinho | O fundo seguia navegável por leitor de tela. | Fundo marcado como `inert` enquanto o diálogo está aberto. | Playwright confirmou `main.inert` ao abrir e restauração ao fechar. |
| Alto | Validação de adicionais | Um adicional sem preço podia liberar um item futuro. | `canAddProduct` valida grupos e todas as escolhas. | Teste automatizado com preço de adicional ausente passou. |

## Limites

- O fluxo de item real até WhatsApp não pode ser exercido: faltam preços, disponibilidade, adicionais e número comercial confirmados. Os cálculos e a mensagem foram testados com produto fictício somente no teste automatizado.
- A hero com imagem de fundo e título vazado foi recapturada em desktop (1440 px) e celular (390 px e 360 px) após trocar a fonte do título por Unbounded 900. A fonte carregou, as letras ficaram inteiras, os botões legíveis e não houve rolagem horizontal.

## Revisão do detector em 2026-11-11

- Aumentados para pelo menos 11 px: “Sarandi” na marca, botões da hero no celular e rótulos dos destaques. A nota do carrinho passou a 14 px.
- O detector retornou `[]` após as correções e três exceções registradas em `.impeccable/config.json`, limitadas a `index.html`: `cramped-padding` para seções de largura total com contêiner interno, `low-contrast` para a atribuição incorreta do fundo creme a texto em seções escuras e `cream-palette` para a cor já definida em `DESIGN.md`.
- A revisão do detector foi estática. Depois, a pedido do proprietário, a hero foi refinada e recapturada em desktop e celular com Playwright sem janela visível.
