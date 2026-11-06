// Public read-only API adapter for GitHub Pages. Installed before React hydration.
(() => {
  const records = window.__PUBLIC_SITE_DATA__;
  delete window.__PUBLIC_SITE_DATA__;
  const nativeFetch = window.fetch.bind(window);
  const reply = (data, status = 200) => new Response(JSON.stringify(data), {status, headers:{'content-type':'application/json; charset=utf-8'}});
  const normalized = u => { u.searchParams.sort(); return u.pathname + u.search; };
  window.fetch = async (input, init) => {
    const url = new URL(typeof input === 'string' || input instanceof URL ? input : input.url, location.origin);
    if (url.origin !== location.origin || !url.pathname.startsWith('/api/')) return nativeFetch(input, init);
    const method = (init?.method || (input instanceof Request ? input.method : 'GET')).toUpperCase();
    if (method !== 'GET' && method !== 'HEAD') return reply({message:'公开展示版暂不支持写入。',error:'READ_ONLY'},405);
    // 原后端同时接受数字 ID 与 canonical slug，静态适配层也必须保留这个约定。
    const post = url.pathname.match(/^\/api\/posts\/([^/]+)(\/.*)?$/);
    if (post) {
      const item = records['/api/posts?limit=500']?.data.posts?.find(p => p.slug === decodeURIComponent(post[1]));
      if (item) url.pathname = `/api/posts/${item.id}${post[2] || ''}`;
    }
    const exact = records[normalized(url)];
    if (exact) return reply(exact.data,exact.status);
    if (url.pathname === '/api/auth/me') return reply({message:'Unauthorized'},401);
    if (url.pathname === '/api/posts') {
      const lang = url.searchParams.get('lang');
      const locale = lang && records['/api/posts?lang='+encodeURIComponent(lang)+'&limit=500'];
      const base = locale || records['/api/posts?limit=500'];
      let posts = [...base.data.posts];
      const q = url.searchParams.get('search')?.toLowerCase();
      if(q) posts = posts.filter(p => [p.title,p.excerpt,p.content_preview].join(' ').toLowerCase().includes(q));
      const category = url.searchParams.get('category');
      if(category) posts = posts.filter(p=>p.category===category);
      const tag = url.searchParams.get('tag');
      if(tag) posts = posts.filter(p=>(p.tags || []).some(t=>(typeof t==='string'?t:t.name)===tag));
      const sort = url.searchParams.get('sortBy');
      posts.sort(sort==='oldest' ? (a,b)=>a.created_at.localeCompare(b.created_at) : sort==='popular' ? (a,b)=>b.view_count-a.view_count : (a,b)=>b.created_at.localeCompare(a.created_at));
      const offset = Math.max(0,Number(url.searchParams.get('offset'))||0);
      const limit = Math.max(1,Number(url.searchParams.get('limit'))||100);
      return reply({...base.data,posts:posts.slice(offset,offset+limit),total:posts.length});
    }
    const samePath = Object.keys(records).find(k=>k.split('?')[0]===url.pathname);
    if(samePath) return reply(records[samePath].data,records[samePath].status);
    return reply({message:'公开版本没有此内容。',error:'NOT_FOUND'},404);
  };
  const beacon = navigator.sendBeacon?.bind(navigator);
  if(beacon) navigator.sendBeacon = (url,data) => new URL(url,location.origin).pathname.startsWith('/api/') ? false : beacon(url,data);
})();
