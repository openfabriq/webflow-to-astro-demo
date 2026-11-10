# Decision 9: URLs and redirects

**Question** (#11): URLs and redirects (keep `/blog-article` and `/search`?)

**Choice**: Option 1: keep all 3 URLs as they are: `/`, `/blog-article` and `/search`.

**What it means for the build**: no new URL scheme and no redirect is added by this decision. Redirects already set in Webflow are still unknown: a maintainer copies them from Webflow Site settings > Publishing into `migration/redirects.csv`, and the `seo` ticket reads that file.

**Taken by**: eixoweb, [comment](https://github.com/openfabriq/webflow-to-astro-demo/issues/11#issuecomment-6780830632).
