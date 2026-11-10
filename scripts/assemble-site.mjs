import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const legacy = join(root, 'legacy115');
const next = join(root, 'next-site/published');
const release = JSON.parse(await readFile(join(next, 'release.json'), 'utf8'));
if (!release.routes.includes('/zh-cn/watch')) throw new Error('新版收藏入口缺失，停止发布。');
await rm(dist,{recursive:true,force:true});
await mkdir(dist,{recursive:true});
const toolsWithReturnButton = new Set(['zen/index.html', 'sutra-chat/index.html']);
const archivedTools = '/archive/115/tools/';
const defaultPortfolio = '/zh-cn/portfolio/';
const restoreToolReturn = `<script>
  (() => {
    if (!document.referrer) return;
    const source = new URL(document.referrer);
    if (source.origin !== location.origin) return;
    const portfolio = /^\\/(?:zh-cn\\/|en\\/)?portfolio\\/?$/;
    if (!portfolio.test(source.pathname) && source.pathname !== '${archivedTools}') return;
    document.querySelector('a[aria-label="返回小工具"]').href = source.pathname + source.search;
  })();
</script>`;
// Existing tool and article links remain usable; their assets live in the archive.
async function compatibility(dir) {
  for (const entry of await readdir(dir,{withFileTypes:true})) {
    const file = join(dir,entry.name);
    if(entry.isDirectory()) await compatibility(file);
    else if(entry.name.endsWith('.html') && !['index.html','404.html'].includes(relative(legacy,file))) {
      const route = relative(legacy,file);
      const dest = join(dist,route);
      await mkdir(dirname(dest),{recursive:true});
      if (!toolsWithReturnButton.has(route)) {
        await cp(file,dest);
        continue;
      }
      const html = await readFile(file,'utf8');
      const backLink = `href="${archivedTools}" aria-label="返回小工具"`;
      if (!html.includes(backLink)) throw new Error(`Missing return link in ${route}`);
      await writeFile(dest, html
        .replace(backLink, `href="${defaultPortfolio}" aria-label="返回小工具"`)
        .replace('</body>', `${restoreToolReturn}</body>`));
    }
  }
}
await compatibility(legacy);
await cp(legacy,join(dist,'archive/115'),{recursive:true});
await cp(next,dist,{recursive:true});
const alias = join(dist,'个站旧版115');
await mkdir(alias,{recursive:true});
await writeFile(join(alias,'index.html'),'<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>个站旧版115</title><meta http-equiv="refresh" content="0;url=/archive/115/"><body><a href="/archive/115/">个站旧版115</a><script>location.replace("/archive/115/"+location.search+location.hash)</script></body></html>');
await writeFile(join(dist,'site-version.json'),JSON.stringify({version:process.env.PUBLIC_BUILD_ID || 'local',...release}));
await writeFile(join(dist,'SOURCE.txt'),'新版源码（AGPL-3.0）：https://github.com/wentao-tab/public-portfolio-site/tree/main/next-site/source\n基于 timo9378/sora-to-ki，保留原作者授权与版权信息。\n旧版源码标签：个站旧版115\n');
console.log(`Assembled ${release.routes.length} new routes, legacy archive and compatible tool URLs.`);
