# Hot Sushi Sarandi — site

Site estático e responsivo. Inicie a prévia com `node serve.mjs` e abra `http://127.0.0.1:4173/`. Os módulos JavaScript e a configuração local precisam de HTTP; abrir `index.html` direto não oferece a experiência completa. Não há dependências para instalar.

## Content and ordering

- O site oferece o link direto para a [Anota AI](https://app.anota.ai/m/D0o9CKMVw) e uma estrutura de catálogo e carrinho para pedido por WhatsApp.
- As categorias e alguns nomes foram observados no cardápio oficial em 2026-11-10. A leitura do cardápio atual falhou em 2026-11-11; veja [MENU-SOURCES.md](MENU-SOURCES.md).
- Preços, disponibilidade e adicionais ainda não estão confirmados. Os itens exibidos levam à Anota AI e não entram no carrinho. O envio por WhatsApp só será ativado com dados comerciais verificados e número comercial oficial.
- `catalog.js` concentra categorias e itens. Para habilitar um item, é preciso preencher preço em centavos, `available: true`, `optionsVerified: true` e `optionGroups` com grupos e escolhas verificados. O carrinho rejeita dados incompletos.
- `config.json` contém o número comercial público (vazio até confirmação). `config.example.json` mostra o formato. Para teste local, `config.local.json` é ignorado pelo Git e substitui o número apenas em `localhost`/`127.0.0.1`. Nunca use número particular em arquivos versionados.
- O botão do WhatsApp abre uma mensagem pronta; o cliente ainda precisa confirmar o envio no WhatsApp. Entrega e valor final são confirmados pela loja.
- Execute `node --test tests/cart.test.mjs` para verificar total, adicionais e bloqueio de itens não verificados.
- There is no Anota AI API call in the browser. Future menu synchronization needs a backend, partner OAuth access and the store `x-page-id`; see https://integ-public-platform-docs.anota.ai/docs/integracao-parceiros/api-cardapio-v2.
- Image origins and the AI hero distinction are in `public/images/README.md`.

## Before publishing

- Choose the final domain and make the Open Graph image URL absolute in `index.html`.
- Obter exportação atual do cardápio oficial com categorias, itens, descrições, preços, disponibilidade, adicionais e regras, e confirmar o WhatsApp comercial antes de ativar o carrinho público.
- Review all commercial copy with the owner and confirm whether the public cardápio URL remains current.
- Supply verified hours and delivery regions if those details should appear on this site.

Barlow Condensed, DM Sans e Unbounded (somente no título da hero) são carregadas pelo Google Fonts e têm fontes do sistema como alternativa.
