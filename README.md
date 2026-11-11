# Hot Sushi Sarandi — site

Static, responsive presentation site. Open `index.html` to inspect it, or run a local HTTP preview with `node serve.mjs` and visit `http://127.0.0.1:4173/`. No dependency installation is needed.

## Content and ordering

- Every order button opens the public cardápio linked by the official Instagram profile: https://app.anota.ai/m/D0o9CKMVw.
- Product categories and selected item names were checked against that menu on 2026-11-10.
- The site deliberately does not duplicate prices, availability, promotions, opening hours or delivery coverage. Anota AI remains the live source for these details and completes checkout.
- There is no Anota AI API call in the browser. Future menu synchronization needs a backend, partner OAuth access and the store `x-page-id`; see https://integ-public-platform-docs.anota.ai/docs/integracao-parceiros/api-cardapio-v2.
- Image origins and the AI hero distinction are in `public/images/README.md`.

## Before publishing

- Choose the final domain and make the Open Graph image URL absolute in `index.html`.
- Review all commercial copy with the owner and confirm whether the public cardápio URL remains current.
- Supply verified hours and delivery regions if those details should appear on this site.

The two fonts are currently loaded from Google Fonts and have local system fallbacks.
