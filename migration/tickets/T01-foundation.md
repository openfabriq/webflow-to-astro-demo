# T01 [foundation] Project skeleton, layout, nav, scripts
Status: done
Blocked by: none

Part of #1

URLs: `/` (header and footer shared by all pages).

Relies on: decisions 3 (design), 5 (one locale), 7 (GitHub Pages base), 8 (nav).

In scope:
- `astro.config.mjs` with `site: https://openfabriq.github.io`, `base: /webflow-to-astro-demo/`; `lang="en"`.
- Base layout (head: title, description, canonical, Open Graph slots), header with logo and the nav (Home, Blog → `/`; markup only, toggle script is T04), footer, scoped CSS tokens, self-hosted DM Sans 400/500/700.
- `.gitignore` (`webflow-export/`, `dist/`, `node_modules/`), a base-aware link helper.
- `pnpm import`: script skeleton that downloads the site's images from the published pages into the repo (the CMS has no export); `pnpm parity`: script comparing a Webflow URL and its Astro page (screenshots desktop and phone, title, description, canonical, h1, links).

Out of scope: page content, the mobile menu toggle, forms.

Acceptance:
- [ ] `pnpm build` and `pnpm test` pass.
- [ ] `pnpm parity` passes for the URLs above on desktop and phone.
- [ ] Title, meta description, canonical and main heading match the decisions and the Webflow page (canonical on the new base).
- [ ] Every link resolves under the base `/webflow-to-astro-demo/`.
- [ ] `pnpm import` and `pnpm parity` run (parity on `/` may fail until T07).
