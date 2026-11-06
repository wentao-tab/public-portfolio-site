import { readFile, readdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'next-site/source');
const published = join(root, 'next-site/published');
const subsetFont = createRequire(join(source, 'package.json'))('subset-font');
let corpus = '';
function strings(value) {
  if (typeof value === 'string') {
    if (!/^https?:\/\//.test(value)) corpus += value;
  } else if (Array.isArray(value)) value.forEach(strings);
  else if (value && typeof value === 'object') Object.values(value).forEach(strings);
}
// 只收公开文案，不把源码、注释及已停用语种当成读者需要下载的字。
strings(JSON.parse(await readFile(join(root, 'next-site/public-data.json'), 'utf8')));
for (const locale of ['zh-CN', 'zh-TW', 'en']) {
  strings(JSON.parse(await readFile(join(source, `src/locales/${locale}/common.json`), 'utf8')));
}
async function collect(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = join(dir, entry.name);
    if (entry.isDirectory()) await collect(file);
    else if (entry.name.endsWith('.html')) {
      corpus += (await readFile(file, 'utf8'))
        .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&#(x[\da-f]+|\d+);/gi, (_, n) => String.fromCodePoint(n[0].toLowerCase() === 'x' ? parseInt(n.slice(1), 16) : Number(n)));
    }
  }
}
await collect(published);
const chars = [...new Set(corpus)].filter(c => c.codePointAt(0) >= 32 && !/[\uD800-\uDFFF]/u.test(c)).join('');
let core = '';
for (const prefix of ['zh-cn/', '', 'en/']) {
  core += (await readFile(join(published, prefix, 'watch/index.html'), 'utf8'))
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '').replace(/<[^>]+>/g, ' ');
}
for (const locale of ['zh-CN', 'zh-TW', 'en']) {
  const copy = JSON.parse(await readFile(join(source, `src/locales/${locale}/common.json`), 'utf8'));
  core += JSON.stringify(copy.siteNav) + JSON.stringify(copy.collection);
}
const publicRecords = JSON.parse(await readFile(join(root, 'next-site/public-data.json'), 'utf8'));
function menuText(value, key = '') {
  if (typeof value === 'string' && /^(title|author|artist|name)$/.test(key)) core += value;
  else if (Array.isArray(value)) value.forEach(v => menuText(v, key));
  else if (value && typeof value === 'object') for (const [k,v] of Object.entries(value)) menuText(v,k);
}
menuText(publicRecords);
core += JSON.stringify(publicRecords['/api/thoughts?limit=50']?.data || {});
const coreChars = [...new Set(core)].filter(c => c.codePointAt(0) >= 32 && !/[\uD800-\uDFFF]/u.test(c)).join('');
const coreCps = [...coreChars].map(c => c.codePointAt(0)).sort((a,b) => a-b);
const files = {
  serif: { tc: 'NotoSerifTC-wght.ttf', sc: 'NotoSerifSC-wght.ttf' },
  sans: { tc: 'NotoSansTC-wght.ttf', sc: 'NotoSansSC-wght.ttf' },
  kai: { tc: ['LXGWWenKaiTC-Regular.ttf', 'LXGWWenKaiTC-Bold.ttf'], sc: ['LXGWWenKai-Regular.ttf', 'LXGWWenKai-Medium.ttf'] },
  modern: { tc: ['MiSans-Regular.ttf', 'MiSans-Semibold.ttf'], sc: ['MiSans-Regular.ttf', 'MiSans-Semibold.ttf'] },
};
const fontRoot = process.env.EXPORT_FONT_DIR || resolve(root, '../koimsurai-replica/.cache/fonts');
for (const [style, faces] of Object.entries(files)) for (const [face, file] of Object.entries(faces)) {
  for (const [i, weight] of [400, 600].entries()) {
    const name = `${style}-${face}-${weight}.woff2`;
    const path = join(source, 'public/fonts-static', name);
    const oldSize = (await readFile(path)).length;
    const font = await readFile(join(fontRoot, Array.isArray(file) ? file[i] : file));
    const out = await subsetFont(font, chars, { targetFormat: 'woff2', ...(!Array.isArray(file) ? { variationAxes: { wght: weight } } : {}) });
    await writeFile(path, out);
    await writeFile(join(published, 'fonts-static', name), out);
    console.log(`${name}: ${oldSize} -> ${out.length} bytes`);
  }
}
console.log(`Static font corpus: ${chars.length} unique public characters.`);
let css = '/* Generated: first-screen and collection UI font subset. */\n';
for (const face of ['tc', 'sc']) for (const weight of [400, 600]) {
  const font = await readFile(join(fontRoot, files.serif[face]));
  const out = await subsetFont(font, coreChars, { targetFormat: 'woff2', variationAxes: { wght: weight } });
  const name = `serif-${face}-${weight}-core.woff2`;
  for (const dir of [join(source, 'public/fonts-static'), join(published, 'fonts-static')]) await writeFile(join(dir, name), out);
  const family = face === 'tc' ? 'Koim Serif' : 'Koim Serif SC';
  const rule = family => `@font-face{font-family:'${family}';src:url('/fonts-static/${name}') format('woff2');font-weight:${weight};font-display:swap;unicode-range:${coreCps.map(c=>'U+'+c.toString(16)).join(',')};}\n`;
  css += rule(family);
  if (face === 'sc') css += rule('Koim Serif Fallback');
  console.log(`${name}: ${out.length} bytes`);
}
await writeFile(join(source, 'src/lib/staticFontCore.json'), JSON.stringify(coreCps));
await writeFile(join(source, 'src/staticFontCore.css'), css);
console.log(`First-screen font corpus: ${coreCps.length} characters.`);
