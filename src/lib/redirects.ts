/** Parse migration/redirects.csv ("from,to" per row, header first) into Astro's `redirects` map. */
export function parseRedirects(csv: string): Record<string, string> {
	const redirects: Record<string, string> = {};
	for (const line of csv.split(/\r?\n/).slice(1)) {
		if (!line.trim()) continue;
		const [from, to] = line.split(',').map((cell) => cell.trim());
		if (!from?.startsWith('/') || !to) throw new Error(`invalid redirect row: ${line}`);
		redirects[from] = to;
	}
	return redirects;
}
