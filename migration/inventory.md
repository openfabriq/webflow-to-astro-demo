# Inventory of https://flowbase-blog-clone.webflow.io

## Summary

- Site: `https://flowbase-blog-clone.webflow.io` (Flowbase "Cloneable Blog Template"; `data-wf-site="5ee1bccec7a1f843875ce9ea"`).
- Source of the content: **the CMS was read from the published pages, not exported.** The factory has no Webflow token and no `export` command.
- Last export: none. Last published: 2026-08-22 05:19 UTC (from the `Last Published` comment in the HTML; no item `lastUpdated` is available).
- Pages read: 3 (`/`, `/blog-article`, `/search`) plus the Webflow 404 page.
- Collections: **0 seen.** No `w-dyn-*` markup on any page, and no `/blog/<slug>` style URL answers. The blog list and article are static, with the same article repeated (see Questions).
- Locales: 1 (no `hreflang`, no locale subfolder seen).
- Files that did not download: not applicable (no export, no `assets-missing.txt`). Nothing was downloaded; images are listed below by URL.
- `/sitemap.xml` answers 404 (sitemap is off). `/robots.txt` answers 200 with an empty body.

## URL inventory

Static pages (none are CMS):

| URL | Count |
|---|---|
| `/` | 1 |
| `/blog-article` | 1 |
| `/search` | 1 |

CMS pages: none found. `/blog`, `/posts`, `/blog/test` answer 404. Unknown (inferred, not read): whether other pages exist unlinked; no sitemap to confirm.

Every card, "Featured" and "Related" link on the site points to `/blog-article`. The nav links (Home, Product, Pricing, Blog), the "Next page" button and the category pills all link to `#`.

## Page templates

| Template | `data-wf-page` | Main blocks | URLs |
|---|---|---|---|
| Search results | `5ee1fe64f6489d76158ad00e` | h1, search form, 2 sample results ("You're viewing sample results") | `/search` (plainest) |
| Blog article | `5ee20f4e189ba22b0c87181f` | nav, h1, author + date, hero image, rich text (p, h2, h3, images), newsletter form, "Related articles" (4) | `/blog-article` |
| Home / blog list | `5ee1bccec7a1f81cf05ce9eb` | nav, "Our blog" title, grid of 4 article cards, "Next page", sidebar: search form, newsletter form, Featured (4), Categories (5 pills) | `/` |

The search page has no nav and its own plain markup (not the site's shared header). Fonts: DM Sans 400/500/700 via Google WebFont loader. One shared CSS file on the Webflow CDN.

## Collections

None seen in the markup. Content that would be a CMS item in the original template, and its apparent fields (inferred from the article page and cards, not read from a CMS):

- Article: title, summary, hero image (`Blog Image.jpg`), author name, author photo, date (`January 10, 2020`), body (rich text with paragraphs, h2, h3, images), category.
- Categories listed in the sidebar: Product, Engineering, Technology, Company, Saas.
- Cards on `/` show 4 images (`Image 1`–`Image 4`), all with the same title, summary, author (Jennifer Hudson) and date. Featured images: `Feature 1`–`Feature 4`.

No references between collections can be read.

## Interactions

- `data-w-id` attributes: 0 on every page, so no Webflow interaction animation.
- Navbar (`w-nav`, `data-collapse="medium"`): on small screens the menu collapses behind a hamburger button (`w-nav-button`) that opens the links. Needs a small island or CSS-only menu.
- Sticky sidebar (`stick-wrapper` on `/`): inferred from the class name, not seen in a browser.
- Form success/fail messages (`w-form-done`, `w-form-fail`) are shown by Webflow's runtime after a submit.
- Webflow runtime: jQuery 3.5.1 and 3 `flowbase-blog-clone.*.js` chunks.

No browser was opened; the above is from markup only.

## Forms

| Form | Where | Fields | Method / target |
|---|---|---|---|
| Newsletter (`data-name="Email Form"`, id `email-form`) | `/` sidebar, `/blog-article` | one email input (`name` / `name-2`, required) | `method=get`, no `action`: handled by Webflow's runtime. Where messages go: unknown. |
| Search (`action="/search"`) | `/` sidebar, `/search` | `query` (required) | GET to `/search`. On the Free plan the results are sample data only. |

No form was submitted.

## Custom code and embeds

- Google WebFont loader (`ajax.googleapis.com/.../webfont.js`) loading DM Sans.
- `w-mod-js` / touch detection inline script (Webflow standard).
- Flowbase Cloneable UI: `https://assets.flowbase.co/cloneable/v1.js` (`data-component-name="Cloneable Blog Template"`), on `/` at least. Template promotion widget; inferred it should not be kept.
- "Clone Project!" button to `http://try.webflow.com/cloneable-blog-template`.
- No analytics, chat or cookie consent seen.

## Redirects

Unknown. Not available without a token; a maintainer should copy them from Site settings > Publishing into `migration/redirects.csv`.

## SEO

- Titles: `/` is `Cloneable Blog Template | Flowbase Cloneable`; `/blog-article` is `Cloneable Blog Template – Blog Article | Flowbase Cloneable`; `/search` is `Search Results`.
- Meta description: present on `/` and `/blog-article` (template promotion text), absent on `/search`. Also copied to `og:description` and `twitter:description`.
- Open Graph / Twitter: `og:title`, `og:description`, `og:image` (`https://assets.flowbase.co/cloneable/opengraph.png`, outside the Webflow CDN), `twitter:card=summary_large_image`, `og:type=website` (on `/`).
- Canonical: none. `hreflang`: none. `noindex`: none seen. Structured data: none seen.
- Favicons: 32 (light and dark), 48, 192, 512 and a 180 apple-touch icon, all on the Webflow CDN.
- The sitemap is off and robots.txt is empty.

## Questions to decide

1. **What is the content?** The site is a template: one article is repeated everywhere and no CMS item exists. Port the 3 pages as they are, or turn the article into a content collection of real posts (with `/blog/<slug>` pages)? Facts: 0 collections, 1 distinct article, cards all link to `/blog-article`.
2. **Forms.** The newsletter has no known destination. Options: drop it, or connect a service (which one?). The search form has only sample results; build a real search, or drop it?
3. **Design.** Port the Webflow CSS (one shared file) or rewrite? The layout is simple (grid, cards, sidebar, one article).
4. **Interactions.** Only the mobile menu needs scripting. OK to rebuild it as a small island or CSS?
5. **Languages.** One locale found; confirm.
6. **Editing.** Who edits content after the move, and how (Markdown in the repo, a headless CMS)?
7. **Hosting and domain.** Not stated.
8. **Template-only pieces.** Keep or drop the Flowbase widget, the "Clone Project!" button and the dead `#` nav links (Product, Pricing, Blog)?
9. **URLs.** Keep `/blog-article` and `/search`? Redirects are unknown.
10. **Assets.** Images are on the Webflow CDN and must be downloaded into the repo (no export did it); the OG image lives on `assets.flowbase.co`.
