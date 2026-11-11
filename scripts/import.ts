// pnpm run import: the CMS has no export, so read the published pages, map them to the `articles`
// entry and download its images. Idempotent: same pages, same files; an image already there is kept.
// Usage: node scripts/import.ts [--dry-run]
import { mkdir, writeFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { mapArticle, serializeArticle } from '../src/lib/mappers/articles.ts';

const site = process.env.LEGACY_SITE_URL ?? 'https://flowbase-blog-clone.webflow.io';
const dryRun = process.argv.includes('--dry-run');
const outDir = 'src/content/articles';

async function page(path: string): Promise<string> {
	const res = await fetch(site + path);
	if (!res.ok) throw new Error(`${site + path} answered ${res.status}`);
	return res.text();
}

const entry = mapArticle(await page('/blog-article'), await page('/'));
const exists = (file: string) => access(file).then(() => true, () => false);

if (!dryRun) {
	await mkdir(join(outDir, 'images'), { recursive: true });
	await writeFile(join(outDir, `${entry.slug}.md`), serializeArticle(entry));
}

let written = 0;
for (const image of entry.images) {
	const file = join(outDir, 'images', image.file);
	if (dryRun) {
		console.log(`${image.url} -> ${file}`);
		continue;
	}
	if (await exists(file)) continue;
	const res = await fetch(image.url);
	if (!res.ok) throw new Error(`missing (${res.status}): ${image.url}`);
	await writeFile(file, Buffer.from(await res.arrayBuffer()));
	written++;
}
console.log(`${entry.slug}: ${entry.images.length} images, ${written} downloaded`);
