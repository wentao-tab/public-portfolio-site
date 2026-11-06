import { DatabaseSync } from 'node:sqlite';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const thoughts = JSON.parse(readFileSync(new URL('data/personal-thoughts.json', root), 'utf8'));
const db = new DatabaseSync(new URL('.local-runtime/preview.sqlite', root));
try {
  db.exec('BEGIN IMMEDIATE');
  const rows = db.prepare('SELECT id, content, created_at FROM thoughts WHERE id BETWEEN 1 AND 4 ORDER BY id').all();
  if (rows.length !== thoughts.length || rows.some((row, i) => !row.content.startsWith('【本地演示】') && row.content !== thoughts[i])) {
    throw new Error('原碎念已被另行编辑，未覆盖。');
  }
  const backup = new URL('.local-runtime/thoughts-before-personal.json', root);
  if (!existsSync(backup)) writeFileSync(backup, JSON.stringify(rows, null, 2) + '\n');
  const update = db.prepare('UPDATE thoughts SET content = ? WHERE id = ?');
  rows.forEach((row, i) => update.run(thoughts[i], row.id));
  db.exec('COMMIT');
  console.log('已替换 4 条个人碎念，保留原有 ID、日期和互动数据。');
} catch (error) {
  db.exec('ROLLBACK');
  throw error;
} finally {
  db.close();
}
