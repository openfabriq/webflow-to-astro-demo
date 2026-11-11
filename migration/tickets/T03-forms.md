# T03 [feature] Newsletter and search form components
Status: done
Blocked by: T01

Part of #1

URLs: `/` (sidebar: newsletter and search), `/blog-article` (newsletter), `/search` (search).

Relies on: decision 2.

In scope: reusable `Newsletter` (one required email input, button) and `SearchForm` (GET to `<base>search`, required `query`) components, styled to match. Neither posts anywhere (no destination). Accessible labels.

Out of scope: any service integration; real search.

Acceptance:
- [ ] `pnpm build` and `pnpm test` pass.
- [ ] `pnpm parity` passes for the URLs above on desktop and phone.
- [ ] Title, meta description, canonical and main heading match the decisions and the Webflow page (canonical on the new base).
- [ ] Every link resolves under the base `/webflow-to-astro-demo/`.
- [ ] Components render with the old labels and placeholders.
