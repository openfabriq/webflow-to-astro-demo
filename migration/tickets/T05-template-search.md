# T05 [template] Search results page
Status: open
Blocked by: T03

Part of #1

URLs: `/search` (the plainest page: no nav, own markup).

Relies on: decisions 2, 3, 9. Title `Search Results`, no meta description, as on the old page.

In scope: h1, search form, the 2 sample results ("You're viewing sample results").

Acceptance:
- [ ] `pnpm build` and `pnpm test` pass.
- [ ] `pnpm parity` passes for the URLs above on desktop and phone.
- [ ] Title, meta description, canonical and main heading match the decisions and the Webflow page (canonical on the new base).
- [ ] Every link resolves under the base `/webflow-to-astro-demo/`.
