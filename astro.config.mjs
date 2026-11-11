// @ts-check
import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import { parseRedirects } from './src/lib/redirects.ts';

// https://astro.build/config
export default defineConfig({
	site: 'https://openfabriq.github.io',
	base: '/webflow-to-astro-demo/',
	// GitHub Pages has no redirects file: Astro writes static meta-refresh pages.
	redirects: parseRedirects(readFileSync(new URL('./migration/redirects.csv', import.meta.url), 'utf8')),
});
