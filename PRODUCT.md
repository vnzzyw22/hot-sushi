# Hot Sushi Sarandi

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML, CSS and JavaScript. The greenfield stack was chosen for this build to avoid an external dependency installation; it remains open to a later framework migration.

## Users

People choosing Japanese food for delivery on a phone, mainly in the store's service area. The site helps them discover the food and reach the official order flow quickly.

## Product Purpose

Apresentar a marca e fotos reais da Hot Sushi Sarandi. O cliente pode pedir pela Anota AI ou, quando os dados comerciais e o número oficial estiverem confirmados, montar um carrinho no site e levar a mensagem ao WhatsApp.

## Operating Context

- Official Instagram: https://www.instagram.com/hot_sushi_japonese_food/
- Official order menu, linked from that Instagram profile: https://app.anota.ai/m/D0o9CKMVw
- The store operates as delivery only, according to the owner's brief.

## Capabilities and Constraints

- Categorias, nomes, descrições, preços, disponibilidade e adicionais precisam de verificação na fonte oficial. O acesso público falhou em 2026-11-11; os poucos nomes atuais no site têm registro histórico de 2026-11-10.
- Itens sem preço, disponibilidade ou adicionais confirmados levam à Anota AI e não entram no carrinho.
- O carrinho monta mensagem com quantidade, opções e total dos itens. O cliente confirma o envio no WhatsApp; a loja confirma entrega e valor final.
- O número comercial permanece pendente. O número particular de teste fica apenas em configuração local ignorada pelo Git.
- Não há checkout próprio nem credenciais da Anota AI no navegador.
- A hero atual combina tipografia vazada com a imagem ilustrativa gerada para o projeto. Fotos de produtos e galeria usam material real da Hot Sushi; o proprietário permitiu imagens geradas de produtos apenas como último recurso, desde que identificadas.

## Brand Commitments

- Preserve the supplied official logo's shape, colors and proportions.
- Use the company's real product photography where quality permits.
- Avoid generic Japanese restaurant motifs and unsupported quality claims.

## Evidence on Hand

- Supplied logo: `public/images/brand/logo-original.jpg`.
- Public Instagram photographs saved in `public/images/instagram/`; origins recorded in `public/images/README.md`.
- Categorias e alguns nomes observados no cardápio público em 2026-11-10; tentativas de reverificação e lacunas em `MENU-SOURCES.md`.
- Sales ranking, verified delivery schedule/area, historical pricing and permission for API access are not on hand.

## Product Principles

1. Keep the route to ordering obvious.
2. Show real food and identify generated hero imagery as illustrative in the asset register.
3. Exibir detalhes comerciais no site somente quando verificados; manter Anota AI acessível em todos os estados.
4. Support small screens first.
