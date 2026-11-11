# T04 [feature] Mobile menu toggle and sticky sidebar
Status: done
Blocked by: T01

Part of #1

URLs: `/`, `/blog-article` (the navbar); `/` (sidebar).

Relies on: decision 4.

In scope: below the old `medium` breakpoint (991px) the nav collapses behind a hamburger button that toggles `aria-expanded` via a small inline script; no jQuery. Sidebar sticky in CSS. Check in a browser against the old site on phone width.

Acceptance:
- [ ] `pnpm build` and `pnpm test` pass.
- [ ] `pnpm parity` passes for the URLs above on desktop and phone.
- [ ] Title, meta description, canonical and main heading match the decisions and the Webflow page (canonical on the new base).
- [ ] Every link resolves under the base `/webflow-to-astro-demo/`.
- [ ] The menu opens and closes on a phone viewport; the button is keyboard-operable.
