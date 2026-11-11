// pnpm parity: compare each pair of URLs listed in migration/parity/T*.json.
// Old page: $LEGACY_SITE_URL + path. New page: the built site, served by `astro preview`.
// Checks title, description, canonical, h1 and links; screenshots desktop and phone go to parity-report/.
// Usage: node scripts/parity.ts [--no-screenshots]
import { spawn, execFileSync } from 'node:child_process';
import { readdirSync, readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { comparePages, extractFacts, type Facts } from '../src/lib/parity.ts';

const legacy = (process.env.LEGACY_SITE_URL ?? 'https://flowbase-blog-clone.webflow.io').replace(/\/$/, '');
const base = '/webflow-to-astro-demo';
const port = 4321;
const local = `http://localhost:${port}${base}`;
const screenshots = !process.argv.includes('--no-screenshots');

type Entry = string | { path: string };
const dir = 'migration/parity';
const paths = new Set<string>();
for (const file of readdirSync(dir).filter((f) => /^T\d+\.json$/.test(f))) {
	const data = JSON.parse(readFileSync(join(dir, file), 'utf8'));
	for (const entry of (data.urls ?? data) as Entry[]) paths.add(typeof entry === 'string' ? entry : entry.path);
}
if (paths.size === 0) throw new Error(`no URL listed in ${dir}/T*.json`);

if (!existsSync('dist')) throw new Error('dist/ is missing: run `pnpm build` first');
const server = spawn('pnpm', ['preview', '--port', String(port)], { stdio: 'ignore', detached: true });
const stop = () => { try { process.kill(-server.pid!); } catch {} };
process.on('exit', stop);

async function waitFor(url: string) {
	for (let i = 0; i < 60; i++) {
		try { if ((await fetch(url)).status < 500) return; } catch {}
		await new Promise((r) => setTimeout(r, 1000));
	}
	throw new Error(`${url} does not answer`);
}
await waitFor(local + '/');

const newUrl = (path: string) => local + (path === '/' ? '/' : path);
const slug = (path: string) => (path === '/' ? 'home' : path.replace(/^\/|\/$/g, '').replace(/\//g, '-'));

async function facts(url: string, origin: string): Promise<Facts> {
	const res = await fetch(url);
	if (!res.ok) throw new Error(`${url} answered ${res.status}`);
	return extractFacts(await res.text(), origin);
}

function shot(url: string, out: string, width: number, height: number): string | undefined {
	try {
		execFileSync('agent-browser', ['batch', `set viewport ${width} ${height}`, `open ${url}`, 'wait 1500', `screenshot --full ${out}`], {
			env: { ...process.env, AGENT_BROWSER_SOCKET_DIR: join(process.env.TMPDIR ?? '/tmp', 'agent-browser') },
			stdio: ['ignore', 'ignore', 'pipe'],
		});
	} catch (error) {
		return `screenshot of ${url} failed: ${String((error as { stderr?: Buffer }).stderr ?? error).trim().split('\n').pop()}`;
	}
}

let failed = 0;
mkdirSync('parity-report', { recursive: true });
const report: unknown[] = [];
for (const path of [...paths].sort()) {
	const oldFacts = await facts(legacy + path, legacy);
	const newFacts = await facts(newUrl(path), local);
	const gaps = comparePages(oldFacts, newFacts, { base, oldOrigin: legacy, newOrigin: `http://localhost:${port}` });
	if (screenshots) {
		for (const [name, w, h] of [['desktop', 1440, 900], ['phone', 390, 844]] as const) {
			for (const e of [
				shot(legacy + path, `parity-report/${slug(path)}-old-${name}.png`, w, h),
				shot(newUrl(path), `parity-report/${slug(path)}-new-${name}.png`, w, h),
			]) if (e) gaps.push(e);
		}
	}
	console.log(`${gaps.length ? 'FAIL' : 'ok  '} ${path}`);
	for (const gap of gaps) console.log(`     - ${gap}`);
	failed += gaps.length;
	report.push({ path, gaps });
}
writeFileSync('parity-report/report.json', JSON.stringify(report, null, 2));
stop();
process.exit(failed ? 1 : 0);
