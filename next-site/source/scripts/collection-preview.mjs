import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// Public, read-only collection responses captured for the local replica.
// Queries are normalized so parameter ordering does not change the lookup.
export function collectionKey(path) {
  const url = new URL(path, 'http://localhost');
  url.searchParams.sort();
  return url.pathname + url.search;
}

export const collectionPaths = [
  '/api/watch/stats',
  '/api/books',
  '/api/anime/history?limit=2000',
  '/api/anime/history?limit=1',
  '/api/films/recent?limit=200',
  '/api/tv/recent?limit=200',
  '/api/watch/favorites?locale=zh-CN',
  '/api/watch/favorites?locale=zh-TW',
  '/api/watch/favorites?locale=en',
  '/api/watch/favorites?locale=ja',
  '/api/watch/favorites?locale=ko',
  '/api/spotify/top-tracks?time_range=medium_term&limit=20',
  '/api/spotify/recently-played',
];

export function loadCollectionPreview(runtime) {
  const file = join(runtime, 'collection-snapshot.json');
  if (!existsSync(file)) return null;
  const snapshot = JSON.parse(readFileSync(file, 'utf8'));
  if (snapshot.version !== 1 || !snapshot.responses) throw new Error('收藏快照格式无效，请重新同步。');
  const personalFile = join(runtime, '../data/personal-collection.json');
  if (existsSync(personalFile)) {
    const personal = JSON.parse(readFileSync(personalFile, 'utf8'));
    if (personal.version !== 1 || !personal.responses) throw new Error('个人收藏数据格式无效。');
    return { ...snapshot, personalized: true, personalUpdatedAt: personal.updatedAt, responses: { ...snapshot.responses, ...personal.responses } };
  }
  return snapshot;
}

export function serveCollectionPreview(snapshot, req, res) {
  if (!snapshot || !['GET', 'HEAD'].includes(req.method)) return false;
  const key = collectionKey(req.url);
  let body = snapshot.responses[key];
  // A snapshot must never claim the original author is watching/listening live.
  if (key === '/api/watch/now' && body === undefined) body = { watching: null };
  if (key === '/api/spotify/now-playing') body = { is_playing: false, item: null, progress_ms: null };
  if (body === undefined) return false;
  res.writeHead(200, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'x-collection-snapshot-at': snapshot.capturedAt,
  });
  res.end(req.method === 'HEAD' ? undefined : JSON.stringify(body));
  return true;
}
