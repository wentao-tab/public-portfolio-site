import { readFile, writeFile, mkdir, readdir, cp, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'next-site/source');
const target = join(root, 'next-site/published');
const origin = process.env.EXPORT_BACKEND || 'http://127.0.0.1:13998';
const front = process.env.EXPORT_FRONTEND || 'http://127.0.0.1:14001';
const locales = ['zh-CN', 'zh-TW', 'en'];
const prefixes = ['zh-cn', '', 'en'];
const key = (path) => { const u = new URL(path, origin); u.searchParams.sort(); return u.pathname + u.search; };
const readJSON = async (path) => JSON.parse(await readFile(path, 'utf8'));
const save = async (path, body) => { await mkdir(dirname(path), { recursive: true }); await writeFile(path, body); };
async function get(path, base = origin) {
  const response = await fetch(base + path, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  return response;
}
async function eachLimit(items, fn, limit = 4) {
  let i = 0;
  await Promise.all(Array.from({length: limit}, async () => { while(i < items.length) await fn(items[i++]); }));
}

if (process.argv.includes('--prepare')) {
  const snapshots = {};
  const paths = new Set([
    '/api/books', '/api/watch/stats', '/api/watch/now', '/api/anime/history?limit=2000',
    '/api/anime/history?limit=1', '/api/films/recent?limit=200', '/api/tv/recent?limit=200',
    '/api/spotify/top-tracks?time_range=medium_term&limit=20', '/api/spotify/recently-played',
    '/api/spotify/now-playing', '/api/stats', '/api/telemetry', '/api/auth/providers',
    '/api/thoughts?limit=50', '/api/posts?limit=500', '/api/tags', '/api/categories',
    '/api/gallery/photos', '/api/pages/messages/comments',
    '/api/wakatime/today', '/api/wakatime/week', '/api/steam/recent-games', '/api/steam/owned-games',
    '/api/github/contributions/timo9378?year=2025', '/api/github/contributions/timo9378?year=2026',
  ]);
  for (const locale of locales) {
    paths.add(`/api/watch/favorites?locale=${locale}`);
    paths.add(`/api/home/digest?locale=${locale}`);
    paths.add(`/api/posts?limit=500&lang=${locale}`);
    paths.add(`/api/tags?lang=${locale}`);
    paths.add(`/api/categories?lang=${locale}`);
  }
  await eachLimit([...paths], async path => {
    const r = await fetch(origin + path, {signal: AbortSignal.timeout(30000)});
    let data; try {data = await r.json();} catch {data = {error: 'Unavailable in public export'};}
    snapshots[key(path)] = {status: r.status, data};
  });
  const posts = snapshots[key('/api/posts?limit=500')].data.posts;
  const thoughts = snapshots[key('/api/thoughts?limit=50')].data.thoughts;
  for (const post of posts) {
    for (const locale of ['', ...(post.available_locales || [])]) {
      const path = `/api/posts/${post.id}${locale ? `?lang=${locale}` : ''}`;
      snapshots[key(path)] = {status: 200, data: await (await get(path)).json()};
    }
    for (const suffix of ['comments', 'reactions']) {
      const path = `/api/posts/${post.id}/${suffix}`;
      snapshots[key(path)] = {status: 200, data: await (await get(path)).json()};
    }
  }
  for (const thought of thoughts) {
    for (const suffix of ['', '/comments']) {
      const path = `/api/thoughts/${thought.id}${suffix}`;
      snapshots[key(path)] = {status: 200, data: await (await get(path)).json()};
    }
  }
  // Only public GET responses are exported. Never copy SQLite, sessions or local runtime config.
  snapshots['/api/auth/providers'] = {status: 200, data: {google:{enabled:false,clientId:''},github:{enabled:false,clientId:''}}};
  snapshots['/api/watch/now'] = {status: 200, data: {watching:null}};
  snapshots['/api/spotify/now-playing'] = {status: 200, data: {is_playing:false,item:null,progress_ms:null}};
  await save(join(root, 'next-site/public-data.json'), JSON.stringify(snapshots));

  const urls = new Set();
  const imageKeys = /image|cover|poster|avatar|thumbnail|picture/i;
  function images(value, parent = '') {
    if (typeof value === 'string' && /^https?:\/\//.test(value) &&
        (imageKeys.test(parent) || /\.(?:jpg|jpeg|png|webp|gif)(?:[?#]|$)/i.test(value))) urls.add(value);
    else if (Array.isArray(value)) value.forEach(v => images(v, parent));
    else if (value && typeof value === 'object') for (const [k, v] of Object.entries(value)) images(v, k === 'url' ? parent : k);
  }
  images(snapshots);
  const imageMap = {};
  await eachLimit([...urls], async url => {
    const file = createHash('sha256').update(url).digest('hex').slice(0, 24) + '.webp';
    const path = '/snapshot-images/' + file;
    const r = await fetch(origin + '/api/image-proxy?url=' + encodeURIComponent(url) + '&w=384', {signal: AbortSignal.timeout(20000)}).catch(() => null);
    if (!r?.ok || !r.headers.get('content-type')?.startsWith('image/')) return;
    await save(join(source, 'public', path), Buffer.from(await r.arrayBuffer()));
    imageMap[url] = path;
  });
  await save(join(source, 'src/lib/staticImages.json'), JSON.stringify(imageMap));

  const require = createRequire(join(source, 'package.json'));
  const subsetFont = require('subset-font');
  const files = {
    serif: {tc:'NotoSerifTC-wght.ttf', sc:'NotoSerifSC-wght.ttf', jp:'NotoSerifJP-wght.ttf', kr:'NotoSerifKR-wght.ttf'},
    sans: {tc:'NotoSansTC-wght.ttf', sc:'NotoSansSC-wght.ttf', jp:'NotoSansJP-wght.ttf', kr:'NotoSansKR-wght.ttf'},
    kai: {tc:['LXGWWenKaiTC-Regular.ttf','LXGWWenKaiTC-Bold.ttf'],sc:['LXGWWenKai-Regular.ttf','LXGWWenKai-Medium.ttf'],jp:['KleeOne-Regular.ttf','KleeOne-SemiBold.ttf'],kr:['GowunBatang-Regular.ttf','GowunBatang-Bold.ttf']},
    modern:{tc:['MiSans-Regular.ttf','MiSans-Semibold.ttf'],sc:['MiSans-Regular.ttf','MiSans-Semibold.ttf'],jp:['BIZUDPGothic-Regular.ttf','BIZUDPGothic-Bold.ttf'],kr:'PretendardVariable.ttf'},
  };
  let corpus = JSON.stringify(snapshots);
  async function collect(dir) {
    for (const entry of await readdir(dir, {withFileTypes:true})) {
      const file = join(dir, entry.name);
      if (entry.isDirectory()) await collect(file);
      else if (/\.(json|tsx?|css)$/.test(entry.name)) corpus += await readFile(file,'utf8');
    }
  }
  await collect(join(source,'src'));
  // Covers all published copy, including content revealed after client navigation.
  const chars = [...new Set(corpus)].filter(c => c.codePointAt(0) >= 32 && !/[\uD800-\uDFFF]/u.test(c)).join('');
  const fontRoot = process.env.EXPORT_FONT_DIR || resolve(root, '../koimsurai-replica/.cache/fonts');
  for (const [style, faces] of Object.entries(files)) for (const [face, file] of Object.entries(faces)) {
    for (const [i, weight] of [400,600].entries()) {
      const font = await readFile(join(fontRoot, Array.isArray(file) ? file[i] : file));
      const out = await subsetFont(font, chars, {targetFormat:'woff2', ...(!Array.isArray(file) ? {variationAxes:{wght:weight}} : {})});
      await save(join(source, `public/fonts-static/${style}-${face}-${weight}.woff2`), out);
    }
  }
  console.log(`Prepared ${Object.keys(snapshots).length} public responses, ${Object.keys(imageMap).length}/${urls.size} cached images and 32 static fonts.`);
} else {
  await rm(target, {recursive:true,force:true});
  await cp(join(source,'.output/public'), target, {recursive:true,filter: file => !file.endsWith('.map') && !file.includes('/monaco/')});
  const snapshots = await readJSON(join(root,'next-site/public-data.json'));
  const adapter = await readFile(join(root,'scripts/static-api-adapter.js'),'utf8');
  await save(join(target,'static-api.js'), `window.__PUBLIC_SITE_DATA__=${JSON.stringify(snapshots).replace(/</g,'\\u003c')};\n${adapter}`);
  const pages = ['','watch','watch/library','blog','thinking','portfolio','about','setup','messages','history','activity','photos','about-site','bookshelf','music'];
  const routes = [];
  for (const prefix of prefixes) for (const page of pages) {
    const path = '/' + [prefix,page].filter(Boolean).join('/');
    if(path !== '/') routes.push(path);
  }
  for (const post of snapshots[key('/api/posts?limit=500')].data.posts) {
    for (const locale of (post.available_locales || []).filter(locale => locales.includes(locale))) {
      const prefix = prefixes[locales.indexOf(locale)];
      routes.push('/'+[prefix,'blog',post.id].filter(Boolean).join('/'));
    }
  }
  for (const thought of snapshots[key('/api/thoughts?limit=50')].data.thoughts) {
    for (const prefix of prefixes) routes.push('/'+[prefix,'thinking',thought.id].filter(Boolean).join('/'));
  }
  const redirect = destination => `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta http-equiv="refresh" content="0;url=${destination}"><link rel="canonical" href="https://hiwentao.com${destination}"><title>Wentaoshuai · 梁文韬</title><body><a href="${destination}">进入个站</a><script>location.replace(${JSON.stringify(destination)}+location.search+location.hash)</script></body></html>`;
  await eachLimit([...new Set(routes)], async path => {
    const r = await get(path+'?export=115',front);
    const destination = new URL(r.url).pathname;
    const html = destination.replace(/\/$/,'') !== path.replace(/\/$/,'')
      ? redirect(destination)
      : await r.text();
    if (!html || !html.includes('<html')) throw new Error('Empty HTML: '+path);
    await save(join(target,path,'index.html'),html);
  });
  await save(join(target,'index.html'),redirect('/zh-cn/watch'));
  await save(join(target,'404.html'), '<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>页面未找到</title><body style="background:#0a0a0c;color:#f1ece3;font:20px serif;padding:10vw"><h1>页面未找到</h1><p><a style="color:inherit" href="/zh-cn/watch">返回个站</a> · <a style="color:inherit" href="/个站旧版115/">个站旧版115</a></p></body></html>');
  await save(join(target,'robots.txt'),'User-agent: *\nAllow: /\nDisallow: /admin/\nSitemap: https://hiwentao.com/sitemap.xml\n');
  await save(join(target,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['/',...new Set(routes)].map(p=>`<url><loc>https://hiwentao.com${p}</loc></url>`).join('')}</urlset>`);
  for (const path of ['/rss','/api/thoughts/rss']) {
    const r = await get(path);
    const file = path === '/rss' ? '/rss.xml' : '/thoughts.xml';
    const xml = (await r.text()).replaceAll(origin,'https://hiwentao.com').replaceAll('https://koimsurai.com','https://hiwentao.com');
    await save(join(target,file),xml);
    await save(join(target,path,'index.html'),redirect(file));
  }
  await save(join(target,'release.json'),JSON.stringify({name:'Wentaoshuai',entry:'/zh-cn/watch',archive:'个站旧版115',exportedAt:new Date().toISOString(),routes:[...new Set(routes)],source:'https://github.com/wentao-tab/public-portfolio-site/tree/main/next-site/source',mode:'public-static-export'}));
  await save(join(target,'CNAME'),'hiwentao.com\n');
  await save(join(target,'.nojekyll'),'');
  console.log(`Exported ${new Set(routes).size} routes to ${target}`);
}
