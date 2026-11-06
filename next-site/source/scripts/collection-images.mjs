import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

function imageUrls(value, result = new Set()) {
  if (Array.isArray(value)) value.forEach(item => imageUrls(item, result));
  else if (value && typeof value === 'object') Object.values(value).forEach(item => imageUrls(item, result));
  else if (typeof value === 'string' && /^https?:\/\//.test(value)) {
    const url = value.replace(/^http:/, 'https:');
    result.add(url);
    result.add(url.replace(/(image\.tmdb\.org\/t\/p\/)w\d+\//, '$1w185/').replace(/(eslite\.com\/unsafe\/fit-in\/)x\d+\//, '$1x300/'));
  }
  return result;
}

// Only snapshot-listed URLs can use the original site's image service.
// Unrelated images still use the unchanged Rust proxy and its network checks.
export function collectionImages(snapshot, runtime, fetchImage = fetch) {
  const allowed = imageUrls(snapshot?.responses);
  const pending = new Map();
  const dir = join(runtime, 'collection-images');
  return async (req, res) => {
    if (!snapshot || !['GET', 'HEAD'].includes(req.method)) return false;
    const url = new URL(req.url, 'http://localhost');
    if (url.pathname !== '/api/image-proxy' || !allowed.has(url.searchParams.get('url'))) return false;
    const width = url.searchParams.get('w') ?? '384';
    if (!['128', '256', '384', '512'].includes(width)) return false;
    const query = new URLSearchParams({ url: url.searchParams.get('url'), w: width });
    const key = createHash('sha256').update(query.toString()).digest('hex');
    const file = join(dir, `${key}.json`);
    const load = async () => {
      try { return JSON.parse(await readFile(file, 'utf8')); } catch {}
      const remote = await fetchImage(`https://koimsurai.com/api/image-proxy?${query}`, {
        signal: AbortSignal.timeout(15000), redirect: 'error',
      });
      const type = remote.headers.get('content-type')?.split(';')[0];
      if (!remote.ok || !['image/webp', 'image/jpeg', 'image/png', 'image/gif', 'image/avif'].includes(type)) throw new Error('封面不可用');
      const chunks = [];
      let size = 0;
      for await (const chunk of remote.body) {
        size += chunk.length;
        if (size > 5 * 1024 * 1024) throw new Error('封面过大');
        chunks.push(chunk);
      }
      const item = { type, body: Buffer.concat(chunks).toString('base64') };
      await mkdir(dir, { recursive: true });
      await writeFile(file, JSON.stringify(item));
      return item;
    };
    try {
      if (!pending.has(key)) pending.set(key, load().finally(() => pending.delete(key)));
      const item = await pending.get(key);
      res.writeHead(200, { 'content-type': item.type, 'cache-control': 'public, max-age=86400', 'x-content-type-options': 'nosniff' });
      res.end(req.method === 'HEAD' ? undefined : Buffer.from(item.body, 'base64'));
      return true;
    } catch {
      return false;
    }
  };
}
