import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { imageFile, mapArticle, richTextToMarkdown, serializeArticle } from './articles';

const sample = (name: string) => readFileSync(new URL(`../../../migration/samples/${name}.html`, import.meta.url), 'utf8');
const entry = mapArticle(sample('blog-article'), sample('home'));

describe('imageFile', () => {
	it('drops the Webflow id and decodes spaces', () => {
		expect(imageFile('https://cdn.prod.website-files.com/s/5ee2110102abae54ba8e0fdb_Blog%20Image.jpg')).toBe('Blog-Image.jpg');
	});
});

describe('richTextToMarkdown', () => {
	it('maps p, br breaks, h2, h3 and img', () => {
		const images: never[] = [];
		const md = richTextToMarkdown(
			'<p class="x">One &amp; two<br/><br/>Three</p><h2 class="a">Big</h2><h3>Small</h3><img src="https://c.test/s/aaaaaaaaaaaaaaaaaaaaaaaa_My%20Pic.jpg" alt="A pic"/>',
			images,
		);
		expect(md).toBe('One & two\n\nThree\n\n## Big\n\n### Small\n\n![A pic](./images/My-Pic.jpg)\n');
		expect(images).toHaveLength(1);
	});
});

describe('mapArticle', () => {
	it('reads the fields of the article', () => {
		expect(entry.data).toMatchObject({
			title: '12 unique examples of photography portfolio websites',
			author: 'Jennifer Hudson',
			date: 'January 10, 2020',
			hero: 'Blog-Image.jpg',
			authorPhoto: 'Profile-Picture.jpg',
			summary: 'You have many options to choose from when putting together your own online photography portfolio website.',
		});
		expect(entry.data.cardImages).toEqual(['Image-1.jpg', 'Image-2.jpg', 'Image-3.jpg', 'Image-4.jpg']);
		expect(entry.data.featureImages).toEqual(['Feature-1.jpg', 'Feature-2.jpg', 'Feature-3.jpg', 'Feature-4.jpg']);
	});

	it('turns the body into Markdown', () => {
		expect(entry.body).toContain('\n\n## 12 photography portfolio websites to showcase your work\n\n');
		expect(entry.body).toContain('### 1. Jasmine\n\n![](./images/Jasmine.jpg)');
		expect(entry.body.split('\n\n')[1]).toMatch(/^That’s where a platform like Webflow/);
		expect(entry.body).not.toMatch(/<|class=/);
	});

	it('lists each image once, all from the CDN', () => {
		const files = entry.images.map((i) => i.file);
		expect(new Set(files).size).toBe(files.length);
		expect(files).toHaveLength(11);
	});

	it('serializes the same text twice', () => {
		expect(serializeArticle(entry)).toBe(serializeArticle(mapArticle(sample('blog-article'), sample('home'))));
		expect(serializeArticle(entry)).toMatch(/^---\ntitle: /);
	});

	it('fails loudly when the page changed', () => {
		expect(() => mapArticle('<html></html>', sample('home'))).toThrow(/h1 not found/);
	});
});
