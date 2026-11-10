# Decisions

Each section settles one structuring question. Sections 1 to 10 were taken by a maintainer (`eixoweb`) in the decision issues; 11 and 12 were delegated to the planner by the same maintainer on the plan pull request; `migration/decisions/` keeps the full record of each, with the link to the answer. The rule: keep the site as it is for visitors and search engines, at the lowest cost to run and to edit.

## 1. Content
- Facts: 0 CMS collections seen; one distinct article repeated in every card and link (`/blog-article`).
- Options: port the 3 pages as they are, or a content collection.
- **Choice**: a Markdown content collection with the one article; the home list and the Related block are built from it (maintainer's decision).
- Build: T02 (collection, mapper, import), T06, T07.

## 2. Forms
- Facts: newsletter (GET, no `action`, destination unknown) on `/` and `/blog-article`; search (GET `/search`) on `/` and `/search`, sample results only.
- **Choice**: keep both forms visible, with no working destination for now.
- Build: T03. No account or secret is needed.

## 3. Design
- Facts: one shared Webflow CSS; simple layout (grid, cards, sidebar, article).
- **Choice**: rewrite as scoped Astro CSS, the old site as the visual reference; self-host DM Sans.
- Build: T01 (fonts, base styles), T05 to T07.

## 4. Interactions
- Facts: no `data-w-id`; only the navbar collapse (`data-collapse="medium"`) needs script; sidebar sticky is inferred from a class name.
- **Choice**: a small inline script toggling `aria-expanded`; sticky sidebar in CSS; no jQuery, no Webflow runtime.
- Build: T04.

## 5. Languages
- Facts: no `hreflang`, no locale subfolder.
- **Choice**: one locale, English (`lang="en"`), no i18n routing.

## 6. Editing
- **Choice**: Markdown in the repository, edited by developers or through GitHub's web editor. No CMS, no extra ticket.

## 7. Hosting and domain
- **Choice**: GitHub Pages at `https://openfabriq.github.io/webflow-to-astro-demo/`.
- Build: `site` is `https://openfabriq.github.io`, `base` is `/webflow-to-astro-demo/` (T01); every internal link and asset carries the base; canonicals and sitemap use that address (T08). GitHub Pages has no redirects file: T08 settles how redirects are served (for example meta-refresh pages).
- The deploy workflow is not an agent's work (agents cannot change `.github/workflows/`): it is a person's step in T09.

## 8. Template-only pieces
- **Choice**: drop the Flowbase widget (`assets.flowbase.co/cloneable/v1.js`), the "Clone Project!" button and the dead `#` links (Product, Pricing, "Next page", the 5 category pills). The nav keeps Home and Blog (→ `/`).
- Build: T01 (nav), T07.

## 9. URLs and redirects
- **Choice**: keep `/`, `/blog-article` and `/search`. No redirect added by this decision; Webflow's own redirects are unknown.
- Build: T08 reads `migration/redirects.csv`.

## 10. Assets
- **Choice**: download every image into the repository and process it with `astro:assets`; favicons in `public/`; nothing hotlinked from the Webflow CDN.
- Build: T02 downloads the images from the published pages (no export exists). The `og:image` is downloaded like the others until a maintainer says otherwise.

## 11. Meta descriptions and `og:image`
- Facts: `/` and `/blog-article` carry the Flowbase promotional description (copied to `og:description` and `twitter:description`); `/search` has none; `og:image` is `https://assets.flowbase.co/cloneable/opengraph.png`.
- **Choice** (delegated by the maintainer `eixoweb`, "choisi pour moi"): keep the descriptions verbatim, none added on `/search`; download the `og:image` into the repository (decision 10), no hotlink.
- Build: T08.

## 12. Webflow redirects
- Facts: Webflow's redirects are not readable without a token; the 3 URLs are kept (decision 9).
- **Choice** (delegated by the maintainer `eixoweb`): no redirects. T08 creates `migration/redirects.csv` with its header only, so a maintainer can add rows later.
- Build: T08.

## Still open

Only a person can settle these:
- **GitHub Pages deploy**: add `.github/workflows/deploy.yml` and enable Pages (Settings > Pages > Source: GitHub Actions). Part of T09.
- **Unlinked pages**: the site has no sitemap; a maintainer who knows of other published URLs should add them to the inventory.
