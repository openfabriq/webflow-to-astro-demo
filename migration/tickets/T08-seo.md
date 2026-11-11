# T08 [seo] Redirects, sitemap, robots and metadata
Status: done
Blocked by: T04, T05, T06, T07
Part of #1

URLs: all 3.

Relies on: decisions 7, 8, 9, 10, 11 (descriptions kept verbatim), 12 (no redirects; create `migration/redirects.csv` with its header only).

In scope: canonical URLs on `https://openfabriq.github.io/webflow-to-astro-demo/`; Open Graph and Twitter tags (og:image downloaded locally unless replaced); the sitemap (the old site has none) and `robots.txt`; redirects from `migration/redirects.csv` served in a way GitHub Pages allows (static meta-refresh pages) and written in the decision file; favicons (32 light/dark, 48, 192, 512, 180 apple-touch) in `public/`.

Acceptance:
- [ ] `pnpm build` and `pnpm test` pass.
- [ ] `pnpm parity` passes for the URLs above on desktop and phone.
- [ ] Title, meta description, canonical and main heading match the decisions and the Webflow page (canonical on the new base).
- [ ] Every link resolves under the base `/webflow-to-astro-demo/`.
- [ ] Sitemap lists the 3 URLs; every redirect target resolves.
