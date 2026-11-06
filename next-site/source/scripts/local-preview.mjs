import { spawn } from 'node:child_process';
import { createServer, request } from 'node:http';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { seedLocalPreview } from './seed-local-preview.mjs';
import { loadCollectionPreview, serveCollectionPreview } from './collection-preview.mjs';
import { collectionImages } from './collection-images.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const runtime = join(root, '.local-runtime');
mkdirSync(runtime, { recursive: true });
const collectionSnapshot = process.env.COLLECTION_PREVIEW === '0' ? null : loadCollectionPreview(runtime);
const serveCollectionImage = collectionImages(collectionSnapshot, runtime);
const configPath = join(runtime, 'local-config.json');
const config = existsSync(configPath)
  ? JSON.parse(readFileSync(configPath, 'utf8'))
  : { jwt: randomBytes(48).toString('hex') };
if (!existsSync(configPath)) writeFileSync(configPath, JSON.stringify(config), { mode: 0o600 });
const children = [];
let stopping = false;
let proxy;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  proxy?.close();
  children.forEach(child => child.kill('SIGTERM'));
  setTimeout(() => process.exit(code), 1200).unref();
}
process.on('SIGINT', () => stop());
process.on('SIGTERM', () => stop());
function launch(command, args, env) {
  const child = spawn(command, args, { cwd: root, env: { ...process.env, ...env }, stdio: 'inherit' });
  children.push(child);
  child.on('error', error => { console.error(error.message); stop(1); });
  child.on('exit', code => { if (!stopping) stop(code || 1); });
  return child;
}
async function wait(url, timeout = 120000) {
  const start = Date.now();
  while (Date.now() - start < timeout && !stopping) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(1500) });
      if (response.ok) return;
    } catch {}
    await new Promise(done => setTimeout(done, 400));
  }
  throw new Error(`服务未就绪：${url}`);
}

try {
  // Check first so a second double-click never starts competing backend processes.
  proxy = createServer(async (req, res) => {
    if (serveCollectionPreview(collectionSnapshot, req, res)) return;
    if (await serveCollectionImage(req, res)) return;
    const path = req.url?.split('?')[0];
    const backend = path === '/api' || path?.startsWith('/api/') || path === '/rss';
    const upstream = request({
      hostname: '127.0.0.1', port: backend ? 3009 : 13999,
      method: req.method, path: req.url, headers: req.headers,
    }, response => {
      const headers = { ...response.headers };
      // Local preview HTML must pick up a rebuilt asset manifest immediately.
      if (headers['content-type']?.includes('text/html')) {
        headers['cache-control'] = 'no-store';
        delete headers.etag;
        delete headers['last-modified'];
      }
      res.writeHead(response.statusCode ?? 502, headers);
      response.pipe(res);
    });
    upstream.on('error', () => { if (!res.headersSent) res.writeHead(502); res.end('本地服务正在启动，请稍后刷新。'); });
    req.on('aborted', () => upstream.destroy());
    res.on('close', () => upstream.destroy());
    req.pipe(upstream);
  });
  await new Promise((done, reject) => { proxy.once('error', reject); proxy.listen(13998, '127.0.0.1', done); });
  const binary = join(root, 'target/debug/koimsurai-web-backend');
  if (!existsSync(binary)) throw new Error('后端尚未编译。请先按本地运行说明完成构建。');
  launch(binary, [], {
    DATABASE_URL: `sqlite://${join(runtime, 'preview.sqlite')}`,
    BIND_ADDR: '127.0.0.1:3009', JWT_SECRET: config.jwt,
    SITE_URL: 'http://127.0.0.1:13998', RUST_LOG: 'warn',
    SENTRY_DSN: '', ENABLE_RESET_ADMIN: '0',
    ENABLE_SIMKL_SYNC: '0', ENABLE_BAHAMUT_SYNC: '0', ENABLE_TW_ISBN_SYNC: '0',
  });
  await wait('http://127.0.0.1:3009/api/health');
  seedLocalPreview(join(runtime, 'preview.sqlite'));
  launch(process.execPath, ['.output/server/index.mjs'], {
    HOST: '127.0.0.1', PORT: '13999', BACKEND_URL: 'http://127.0.0.1:13998',
    SERIF_FONT_DIR: join(root, '.cache/fonts'),
  });
  await wait('http://127.0.0.1:13999/zh-cn');
  if (collectionSnapshot) console.log(`收藏页使用公开快照：${collectionSnapshot.capturedAt}`);
  console.log('\n本地复刻已就绪：http://127.0.0.1:13998/zh-cn\n关闭本窗口或按 Ctrl+C 可停止服务。\n');
} catch (error) {
  console.error(error.message);
  stop(1);
}
