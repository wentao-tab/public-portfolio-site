import { mkdirSync, renameSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { collectionKey, collectionPaths } from './collection-preview.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const runtime = join(root, '.local-runtime');
const source = 'https://koimsurai.com';
const responses = {};
// Limited batches avoid flooding the public origin; no credentials are sent.
for (let i = 0; i < collectionPaths.length; i += 3) {
  await Promise.all(collectionPaths.slice(i, i + 3).map(async path => {
    const res = await fetch(source + path, { signal: AbortSignal.timeout(30000) });
    if (!res.ok) throw new Error(`${path}: HTTP ${res.status}`);
    const body = await res.json();
    if (body.error || body.message === 'error') throw new Error(`${path}: 数据不可用`);
    responses[collectionKey(path)] = body;
    console.log(`已同步 ${path}`);
  }));
}
mkdirSync(runtime, { recursive: true });
const file = join(runtime, 'collection-snapshot.json');
const tmp = `${file}.tmp`;
writeFileSync(tmp, JSON.stringify({ version: 1, source, capturedAt: new Date().toISOString(), responses }));
renameSync(tmp, file);
console.log('公开收藏快照已保存；重启本地预览后生效，不修改数据库。');
