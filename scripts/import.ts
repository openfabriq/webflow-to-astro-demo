// pnpm import: the CMS has no export, so download the site's images from the published pages.
// Skeleton: T02 decides which images belong to which entry. Idempotent: a file already there is kept.
// Usage: node scripts/import.ts [--dry-run]
import { mkdir, writeFile, access } from 'node:fs/promises';
import { basename, join } from 'node:path';

const site = process.env.LEGACY_SITE_URL ?? 'https://flowbase-blog-clone.webflow.io';
const pages = ['/', '/blog-article', '/search'];
const outDir = 'src/assets/webflow';
const dryRun = process.argv.includes('--dry-run');

const cdn = /https:\/\/(?:cdn\.prod\.website-files\.com|[\w.-]*website-files\.com|uploads-ssl\.webflow\.com)\/[^\s"'()<>,]+\.(?:jpe?g|png|gif|webp|avif|svg)/gi;

const urls = new Set<string>();
for (const path of pages) {
	const res = await fetch(site + path);
	if (!res.ok) throw new Error(`${site + path} answered ${res.status}`);
	// Only the page's own markup is read; srcset variants resolve to the same files.
	for (const match of (await res.text()).matchAll(cdn)) urls.add(match[0]);
}

const exists = (file: string) => access(file).then(() => true, () => false);
if (!dryRun) await mkdir(outDir, { recursive: true });

let written = 0;
for (const url of [...urls].sort()) {
	const file = join(outDir, decodeURIComponent(basename(new URL(url).pathname)).replace(/\s+/g, '-'));
	if (dryRun) {
		console.log(`${url} -> ${file}`);
		continue;
	}
	if (await exists(file)) continue;
	const res = await fetch(url);
	if (!res.ok) {
		console.warn(`missing (${res.status}): ${url}`);
		continue;
	}
	await writeFile(file, Buffer.from(await res.arrayBuffer()));
	written++;
}
console.log(`${urls.size} images found, ${written} written to ${outDir}`);
