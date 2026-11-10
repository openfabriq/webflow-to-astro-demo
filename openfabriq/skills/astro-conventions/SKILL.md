---
name: astro-conventions
description: How the new Astro site is laid out and built in this repository. Use before writing or reviewing code of the site.
---

# Astro conventions

Every agent of the migration reads this skill. Keep it short and prescriptive.

- Stack: Astro, TypeScript strict, Vitest, pnpm. The site is static: the build never calls Webflow.
- Layout:
  - `src/content.config.ts`: one collection per Webflow CMS collection, with a Zod schema;
  - `src/content/<collection>/`: the imported entries, committed;
  - `src/lib/mappers/<collection>.ts`: one mapper per collection, a pure function from a Webflow item to an entry (references resolved, rich text cleaned of Webflow's classes), tested in `<collection>.test.ts` on samples saved in `migration/samples/`;
  - `scripts/import.ts`, run by `pnpm import`: reads `webflow-export/`, runs every mapper, writes the entries and copies the files they use from `webflow-export/assets/`; it never calls the network, and running it twice gives the same files;
  - `webflow-export/` and `parity-report/` are in `.gitignore`;
  - `src/layouts/`, `src/components/`, `src/pages/`: one component per block a page template repeats, built once.
- URLs: the new site keeps every old URL (trailing slash included), or the `seo` ticket redirects it. Never change a URL silently.
- No Webflow runtime: no `webflow.js`, no jQuery, no `w-` class kept for its behavior. An interaction becomes CSS (`:hover`, `<details>`, transitions, `@keyframes`, scroll-driven animations) when it can.
- No JavaScript in the browser by default. A component that needs it is an island (`client:visible`, or `client:idle`), for a reason written in the pull request.
- Images go through `astro:assets` (`<Image />`), stored with the content, with their alternative text from Webflow. No URL of Webflow's CDN in the new site.
- Until the switch, editors write in Webflow and the weekly sync brings the content back: an entry is never edited by hand. After the switch, editing in the browser (Keystatic) only if `migration/decisions.md` says so; otherwise the content stays Markdown in the repository.
- Forms post where `migration/decisions.md` says; never to Webflow.
- `migration/parity/T<nn>.json`, one file per ticket, lists the pairs of URLs `pnpm parity` compares; a ticket writes its own file and never touches another's, so two pull requests never conflict on it.
- Commits: imperative subject line that references the ticket.
