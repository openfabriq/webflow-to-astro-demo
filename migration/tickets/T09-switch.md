# T09 [switch] Go live (a person)
Status: open
Blocked by: T01, T02, T03, T04, T05, T06, T07, T08

Part of #1

No agent builds this ticket; when it opens, the migration is built.

Checklist:
- [ ] Add `.github/workflows/deploy.yml` (build and publish to GitHub Pages) and enable Pages (Source: GitHub Actions).
- [ ] Check `https://openfabriq.github.io/webflow-to-astro-demo/` on the 3 URLs.
- [ ] Put the redirects live as settled in T08.
- [ ] If a custom domain is wanted later, point it to GitHub Pages (not planned; decision 7).
- [ ] Cancel or downgrade the Webflow plan only when the old URLs are no longer needed.
