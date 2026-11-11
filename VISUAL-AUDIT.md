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
- A imagem de fundo foi recolocada na hero após as últimas capturas de navegador, a pedido do proprietário. O HTML e CSS finais foram revisados, mas não houve nova captura dessa composição porque o proprietário pediu para cessar os avisos de permissão da ferramenta de navegador.
- O detector automático de design sinalizou texto branco sobre fundo claro, mas as capturas disponíveis não mostraram esse par na interface. A marcação parece resultar da análise estática da hero, cujo texto é sobre imagem escurecida; a composição final ainda precisa de uma captura para encerrar esse ponto.
