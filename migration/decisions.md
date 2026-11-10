# Decisions

The maintainer's answers to the questions of `migration/inventory.md`, one per decision issue.

## 1. Content (#3)

Option 2: a content collection with the one article, in Markdown in the repository. The home list and the Related block are built from the collection. `/blog-article` keeps its URL unless the URLs decision says otherwise.

## 2. Forms (#4)

Option 4: keep the newsletter and search forms visible, without a working destination for now.

## 3. Design (#5)

Option 2: rewrite as clean scoped Astro CSS, with the old site as the visual reference. Self-host DM Sans.

## 4. Interactions (#6)

Option 2: a small inline script that toggles the mobile menu's `aria-expanded`. No jQuery, no Webflow runtime. The sticky sidebar in CSS.

## 5. Languages (#7)

Option 1: a single locale, English (`lang="en"`), no i18n routing.
