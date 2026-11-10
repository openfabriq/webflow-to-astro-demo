# T06 [template] Blog article page
Status: open
Blocked by: T02, T03

Part of #1

URLs: `/blog-article`.

Relies on: decisions 1, 3, 8, 9, 10.

In scope: nav, h1, author and date, hero image, rich text (p, h2, h3, image), newsletter form, "Related articles" (4 cards). A reusable article-card component, used again by T07. Title `Cloneable Blog Template – Blog Article | Flowbase Cloneable` until a maintainer rewrites it.

Acceptance:
- [ ] `pnpm build` and `pnpm test` pass.
- [ ] `pnpm parity` passes for the URLs above on desktop and phone.
- [ ] Title, meta description, canonical and main heading match the decisions and the Webflow page (canonical on the new base).
- [ ] Every link resolves under the base `/webflow-to-astro-demo/`.
