import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import { test } from 'node:test';
import assert from 'node:assert/strict';

test('菜单文章别名、数字 ID、语言及子资源解析到同一条公开记录', async () => {
  const records = {
    '/api/posts?limit=500': { status: 200, data: { posts: [{ id: 7, slug: 'first-light' }] } },
    '/api/posts/7?lang=zh-CN': { status: 200, data: { title: '第一束微光', mermaidSvgs: {} } },
    '/api/posts/7/comments': { status: 200, data: { comments: [] } },
  };
  const window = { __PUBLIC_SITE_DATA__: records, fetch() { throw new Error('Unexpected network request'); } };
  runInNewContext(await readFile(new URL('./static-api-adapter.js', import.meta.url), 'utf8'), {
    window, location: { origin: 'https://hiwentao.com' }, navigator: {}, URL, Request, Response,
  });
  for (const path of ['/api/posts/first-light?lang=zh-CN', '/api/posts/7?lang=zh-CN']) {
    const res = await window.fetch(path);
    assert.equal(res.status, 200);
    assert.equal((await res.json()).title, '第一束微光');
  }
  assert.deepEqual(await (await window.fetch('/api/posts/first-light/comments')).json(), { comments: [] });
  assert.equal((await window.fetch('/api/posts/first-light', { method: 'POST' })).status, 405);
  assert.equal((await window.fetch('/api/posts/missing')).status, 404);
});
