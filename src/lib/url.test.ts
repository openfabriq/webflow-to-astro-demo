import { describe, expect, it } from 'vitest';
import { withBase } from './url';

describe('withBase', () => {
	const base = '/webflow-to-astro-demo/';
	it('maps the root to the base', () => {
		expect(withBase('/', base)).toBe('/webflow-to-astro-demo/');
	});
	it('prefixes a path', () => {
		expect(withBase('/blog-article', base)).toBe('/webflow-to-astro-demo/blog-article');
		expect(withBase('search', base)).toBe('/webflow-to-astro-demo/search');
	});
	it('accepts a base without a trailing slash', () => {
		expect(withBase('/search', '/site')).toBe('/site/search');
	});
});
