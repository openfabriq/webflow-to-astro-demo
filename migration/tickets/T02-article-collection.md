# T02 [content-type] Article collection, mapper and import
Status: done
Blocked by: T01

Part of #1

URLs: `/blog-article` (the one article; also the source of the 4 cards on `/` and the 4 related items).

Relies on: decisions 1 (Markdown collection), 6 (editing), 10 (assets).

In scope:
- Content collection `articles` (Markdown): title, summary, hero image, author name, author photo, date (`January 10, 2020`), body, category.
- A mapper from the published article HTML (hero, h2, h3, paragraphs, images) to Markdown, with a Vitest test; the import writes the entry and downloads its images (hero, profile picture, body image, 4 card images, 4 feature images) with `astro:assets`. A few samples go in `migration/samples/`.
- The 4 cards on `/` repeat the one article with images `Image 1` to `Image 4`; model this as data the home template reads (a field or a small data file), not 4 fake articles, unless T02's author finds distinct content on the pages.

Out of scope: page templates.

Acceptance:
- [ ] The article builds from Markdown; the mapper is tested.
- [ ] No image is hotlinked from the Webflow CDN.
- [ ] `pnpm build` and `pnpm test` pass.
