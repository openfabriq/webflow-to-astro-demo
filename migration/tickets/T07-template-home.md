# T07 [template] Home / blog list
Status: done
Blocked by: T02, T03, T06

Part of #1

URLs: `/`.

Relies on: decisions 1, 3, 8.

In scope: "Our blog" title, grid of 4 cards (reuse T06's card), sidebar with search form, newsletter, Featured (4 items, 90px images). Dropped per decision 8: "Next page" button, Categories pills, Flowbase widget, "Clone Project!" button.

Acceptance:
- [ ] `pnpm build` and `pnpm test` pass.
- [ ] `pnpm parity` passes for the URLs above on desktop and phone.
- [ ] Title, meta description, canonical and main heading match the decisions and the Webflow page (canonical on the new base).
- [ ] Every link resolves under the base `/webflow-to-astro-demo/`.
