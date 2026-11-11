import { describe, expect, it } from 'vitest';
import { comparePages, extractFacts } from './parity';

const opts = { base: '/b', oldOrigin: 'https://old.test', newOrigin: 'http://new.test' };

describe('extractFacts', () => {
	it('reads title, description, canonical, h1 and links', () => {
		const html = `<title>A &amp; B</title><meta content="Desc" name="description"/><link rel="canonical" href="http://new.test/b/"/>
			<h1 class="x">Our <b>blog</b></h1><a href="/b/blog-article">x</a><a href="#">y</a>`;
		expect(extractFacts(html, 'http://new.test')).toEqual({
			title: 'A & B',
			description: 'Desc',
			canonical: 'http://new.test/b/',
			h1: ['Our blog'],
			links: ['http://new.test/b/blog-article'],
		});
	});
});

describe('comparePages', () => {
	const old = { title: 'T', description: 'D', canonical: '', h1: ['H'], links: ['https://old.test/blog-article', 'https://other.test/'] };
	const good = { title: 'T', description: 'D', canonical: 'http://new.test/b/', h1: ['H'], links: ['http://new.test/b/blog-article'] };
	it('passes when the pages match', () => {
		expect(comparePages(old, good, opts)).toEqual([]);
	});
	it('reports a title, a canonical, a link outside the base and a missing link', () => {
		const bad = { ...good, title: 'X', canonical: 'http://new.test/', links: ['http://new.test/search'] };
		const gaps = comparePages(old, bad, opts);
		expect(gaps).toHaveLength(4);
	});
});
