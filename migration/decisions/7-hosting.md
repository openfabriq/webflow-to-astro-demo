# Decision 7: Hosting and domain

**Question** (#9): Hosting and domain (where does the Astro site go?)

**Choice**: Option 1, a static host with a free tier: GitHub Pages, at the default project address, `https://openfabriq.github.io/webflow-to-astro-demo/` (owner `openfabriq`, repository `webflow-to-astro-demo`).

**What it means for the build**:
- The site is served from a sub-path: `site` is `https://openfabriq.github.io` and `base` is `/webflow-to-astro-demo/`, so every internal link and asset path carries that base.
- Canonical URLs and the sitemap use `https://openfabriq.github.io/webflow-to-astro-demo/`.
- GitHub Pages has no redirects file, so the redirect format of the `seo` ticket is not a host file.

**Taken by**: eixoweb, [comment](https://github.com/openfabriq/webflow-to-astro-demo/issues/9#issuecomment-6781397800).

## Still open
- How the redirects are served on GitHub Pages (for example static HTML pages with a meta refresh), to settle in the `seo` ticket.
- The deploy workflow to GitHub Pages is not decided here.
