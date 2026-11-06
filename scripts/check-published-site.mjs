import { readFile, access, readdir } from 'node:fs/promises';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root,'dist');
const release = JSON.parse(await readFile(join(dist,'release.json'),'utf8'));
const required = ['index.html','static-api.js','site.webmanifest','site-version.json','SOURCE.txt','og.jpg','个站旧版115/index.html','archive/115/index.html','archive/115/books/index.html'];
for(const path of required) await access(join(dist,path));
const entry = await readFile(join(dist,'index.html'),'utf8');
if(!entry.includes('/zh-cn/watch')) throw new Error('Default entry is incorrect');
const pages = release.routes;
for(const page of pages) {
  const html = await readFile(join(dist,page,'index.html'),'utf8');
  if(!html.includes('<html')) throw new Error('Missing HTML: '+page);
  if(/(?:https?:)?\/\/127\.0\.0\.1[:/]/.test(html)) throw new Error('Local URL in public HTML: '+page);
  for(const [,path] of html.matchAll(/(?:src|href)="(\/(?:assets|fonts-static|personal-books|snapshot-images)\/[^"?#]+)(?:[^" ]*)"/g)) await access(join(dist,decodeURIComponent(path)));
}
const collection = await readFile(join(dist,'zh-cn/watch/index.html'),'utf8');
for(const text of ['56','48','源起上册','呼啸山庄','百年孤独','static-api.js']) if(!collection.includes(text)) throw new Error('Collection content missing: '+text);
const fonts = await readdir(join(dist,'fonts-static'));
if(fonts.length!==32) throw new Error('Static fonts incomplete');
console.log(`Verified ${pages.length} public routes, collection data, 32 fonts, entry redirect and legacy archive.`);
