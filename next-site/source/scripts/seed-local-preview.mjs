import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';

const personalThoughts = JSON.parse(readFileSync(new URL('../data/personal-thoughts.json', import.meta.url), 'utf8'));

// Only populate an empty local database. Never reset existing content.
export function seedLocalPreview(file) {
  const db = new DatabaseSync(file);
  try {
    if (db.prepare('SELECT count(*) AS n FROM posts').get().n !== 0) return;
    db.exec('BEGIN IMMEDIATE');
    const titles = [
      ['在星空里，给好奇心留一个位置', 'a-place-for-curiosity', '设计'],
      ['把想法做成可以触摸的作品', 'from-idea-to-work', '创造'],
      ['让动画成为页面的一部分', 'motion-as-language', '设计'],
      ['一次小小的性能实验', 'a-small-performance-experiment', '技术'],
      ['读书，记录，然后重新出发', 'read-and-start-again', '生活'],
      ['慢一点，也可以抵达', 'take-your-time', '生活'],
      ['写给未来的自己', 'a-note-to-the-future', '创造'],
      ['第一束微光', 'the-first-light', '技术'],
    ];
    for (const name of ['设计', '创造', '技术', '生活']) {
      db.prepare('INSERT OR IGNORE INTO categories (name, slug, description) VALUES (?, ?, ?)').run(name, `local-${['设计', '创造', '技术', '生活'].indexOf(name)}`, '本地演示分类');
    }
    const insert = db.prepare(`INSERT INTO posts
      (title, slug, content, excerpt, category, author, source_language, created_at, view_count, likes, status)
      VALUES (?, ?, ?, ?, ?, '本地演示', 'zh-CN', ?, ?, ?, 'published')`);
    for (const [i, [title, slug, category]] of titles.entries()) {
      const text = [
        `# ${title}`, '',
        '> 这是用于检查排版和交互的本地演示内容，并非原作者的文章。', '',
        '## 从一个念头开始', '',
        '把零散的想法记下来，让它们有机会慢慢生长。这个页面保留了原项目的阅读排版、目录、字体切换和页面转场。', '',
        '## 在实践中理解', '',
        '先做出一个可以使用的版本，再观察它在真实场景中的表现。清楚地记录每一步，也给下一次修改留下线索。', '',
        '```typescript', 'const curiosity = ["观察", "尝试", "记录"];', 'curiosity.forEach(step => console.log(step));', '```', '',
        '## 留下一点空间', '',
        '页面上的文字和数字都是演示数据。后续可以通过原项目的后台接入自己的文章、照片和收藏。', '',
        '- 保留原版的视觉结构', '- 使用自己的内容', '- 在实际设备上检查体验', '',
      ].join('\n');
      const day = String(27 - i * 2).padStart(2, '0');
      insert.run(title, slug, text, '本地演示内容：记录观察、尝试和创造，检查原版页面的排版与动效。', category, `2026-10-${day} 03:00:00`, 23 + i * 17, i + 2);
    }
    personalThoughts.forEach((text, i) => db.prepare('INSERT INTO thoughts (content, created_at, likes) VALUES (?, ?, ?)').run(text, `2026-10-${27 - i} 09:00:00`, 3 + i));
    for (const [i, title] of ['示例收藏 · 远方的信号', '示例收藏 · 夜航', '示例收藏 · 一束光'].entries()) {
      db.prepare('INSERT INTO film_history (title, watched_date, rating, source, release_year) VALUES (?, ?, ?, ?, ?)').run(title, `2026-10-${25 - i}`, 8, 'local-demo', 2026);
    }
    db.prepare(`INSERT INTO books (title, authors, description, reading_status, personal_notes, date_started)
      VALUES ('示例书目 · 观察与记录', '本地演示', '用于检验书架布局的示例数据。', 'reading', '替换成你自己的阅读记录。', '2026-10-20 00:00:00')`).run();
    db.exec('COMMIT');
    console.log('已创建独立的本地演示内容。');
  } catch (error) {
    try { db.exec('ROLLBACK'); } catch {}
    throw error;
  } finally {
    db.close();
  }
}
