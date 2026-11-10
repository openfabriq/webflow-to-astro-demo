# Decision 10: Assets

**Question** (#12): Assets (images, fonts and the OG image)?

**Choice**: Option 1: download every image into the repo and process them with Astro's image handling (`astro:assets`). The favicons go in `public/`. The import fetches the images from the published pages. Nothing is hotlinked from the Webflow CDN. DM Sans stays self-hosted (decision 3).

**Open point**: the answer did not say whether to keep the Flowbase `og:image` or supply a new one. Until a maintainer says otherwise, the build downloads the current picture locally like the other images.

**Taken by**: eixoweb, [comment](https://github.com/openfabriq/webflow-to-astro-demo/issues/12#issuecomment-6780829300).
