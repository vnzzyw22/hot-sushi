# Hot Sushi Sarandi

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML, CSS and JavaScript. The greenfield stack was chosen for this build to avoid an external dependency installation; it remains open to a later framework migration.

## Users

People choosing Japanese food for delivery on a phone, mainly in the store's service area. The site helps them discover the food and reach the official order flow quickly.

## Product Purpose

Present the Hot Sushi Sarandi brand and selected real menu imagery, then send visitors to the store's official Anota AI menu to complete orders.

## Operating Context

- Official Instagram: https://www.instagram.com/hot_sushi_japonese_food/
- Official order menu, linked from that Instagram profile: https://app.anota.ai/m/D0o9CKMVw
- The store operates as delivery only, according to the owner's brief.

## Capabilities and Constraints

- Product categories and names must come from the current official menu.
- Prices, availability, add-ons, promotions, hours and delivery area remain authoritative in Anota AI and should not be duplicated without a synchronization plan.
- No custom checkout or client-side Anota credentials.
- The hero may use generated food photography. Product and gallery photography uses real Hot Sushi material; the owner later allowed generated product imagery only as a fallback.

## Brand Commitments

- Preserve the supplied official logo's shape, colors and proportions.
- Use the company's real product photography where quality permits.
- Avoid generic Japanese restaurant motifs and unsupported quality claims.

## Evidence on Hand

- Supplied logo: `public/images/brand/logo-original.jpg`.
- Public Instagram photographs saved in `public/images/instagram/`; origins recorded in `public/images/README.md`.
- Official categories and item names inspected in the Anota AI public menu on 2026-11-10.
- Sales ranking, verified delivery schedule/area, historical pricing and permission for API access are not on hand.

## Product Principles

1. Keep the route to ordering obvious.
2. Show real food and identify generated hero imagery as illustrative in the asset register.
3. Keep commercial details in the live order menu.
4. Support small screens first.
