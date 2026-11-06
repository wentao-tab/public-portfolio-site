import { readFile, writeFile } from 'node:fs/promises';
import { compileMdxSource } from '../src/lib/mdx/mdx-compile-core';
import { extractMermaidFences, mermaidKey } from '../src/lib/mdx/mermaidFences';
import { renderMermaidSvg } from '../src/lib/mdx/mermaidSvg';

const path = new URL('../../public-data.json', import.meta.url);
const records = JSON.parse(await readFile(path, 'utf8'));
for (const [key, record] of Object.entries(records) as [string, { data: Record<string, unknown> }][]) {
  if (!/^\/api\/posts\/\d+(?:\?|$)/.test(key)) continue;
  const data = record.data;
  if (typeof data.content !== 'string') continue;
  const svgs: Record<string, string> = {};
  for (const body of extractMermaidFences(data.content)) svgs[mermaidKey(body)] = renderMermaidSvg(body);
  data.mermaidSvgs = svgs;
  if (data.format === 'mdx') data.compiledMdx = await compileMdxSource(data.content);
}
await writeFile(path, JSON.stringify(records));
console.log('Prepared article rendering for static client navigation.');
