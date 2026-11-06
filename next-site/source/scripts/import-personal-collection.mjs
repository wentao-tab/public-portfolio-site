import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const portfolio = resolve(root, '../ricocc-public-portfolio-site');
const { books2026 } = await import(pathToFileURL(join(portfolio, 'src/data/books.ts')));
const shelf = readFileSync(join(portfolio, 'src/pages/books.astro'), 'utf8');
const coverMap = new Map([...shelf.matchAll(/^\s*(\d+):\s*(\d+),/gm)].map((m) => [+m[1], +m[2]]));
const dataDir = join(root, 'data');
const output = join(dataDir, 'personal-collection.json');
const old = existsSync(output) ? JSON.parse(readFileSync(output, 'utf8')) : {};
const wanted = old.wantedBooks ?? [];
const currentReading = old.currentReading ?? { sourceTitle: '娱乐至死', title: '娱乐至死' };
const artDir = join(root, 'public/personal-books');
mkdirSync(artDir, { recursive: true });
mkdirSync(dataDir, { recursive: true });
const escape = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const palette = { sage: '#8b9d83', earth: '#9a6f55', ink: '#273a42', gold: '#ad8134', rose: '#9b6265', stone: '#7b7b72', sun: '#bf8c32', paper: '#8b806f', wine: '#773f49', blue: '#4c6b82', sea: '#4f888c' };
function cover(book) {
  const number = coverMap.get(book.no);
  const name = String(book.no).padStart(2, '0');
  if (number) {
    copyFileSync(join(portfolio, `public/assets/books/${String(number).padStart(2, '0')}.jpg`), join(artDir, `${name}.jpg`));
    return `/personal-books/${name}.jpg`;
  }
  if (existsSync(join(artDir, `${name}.jpg`))) return `/personal-books/${name}.jpg`;
  const lines = book.title.match(/.{1,9}/gu) ?? [];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="384" height="560" viewBox="0 0 384 560"><rect width="384" height="560" fill="${palette[book.tone] ?? palette.ink}"/><g fill="#fff8eb" font-family="Songti SC,serif"><text x="32" y="54" font-size="18" opacity=".7">${name}</text>${lines.map((line, i) => `<text x="32" y="${210 + i * 46}" font-size="32">${escape(line)}</text>`).join('')}<text x="32" y="514" font-size="14" opacity=".7">READING SHELF · 2026</text></g></svg>`;
  writeFileSync(join(artDir, `${name}.svg`), svg);
  return `/personal-books/${name}.svg`;
}
function row(book, status) {
  return {
    id: book.no, isbn: null, title: book.title, authors: null, publisher: null, published_date: null,
    description: book.note ?? null, cover_url: cover(book), page_count: null, language: 'zh-CN', categories: null,
    reading_status: status, rating: null, personal_notes: book.note ?? null,
    date_added: null, date_updated: null, date_started: null, date_finished: null,
  };
}
const books = books2026.map(book => {
  const reading = book.title === currentReading.sourceTitle;
  return row(reading ? { ...book, title: currentReading.title } : book, reading ? 'reading' : 'read');
});
for (const [i, title] of wanted.entries()) {
  const existing = books.find(book => book.title === title);
  if (existing) existing.reading_status = 'to-read';
  else books.push(row({ no: 50 + i, title, tone: 'paper' }, 'to-read'));
}
const anime = { anime_sn: 1, video_sn: 1, title: '蜡笔小新第二部', cover_url: null, episode: null, tmdb_id: null, last_watched_at: null };
const responses = {
  '/api/books': { message: 'success', books },
  '/api/watch/stats': { message: 'success', animeCount: 1, animeEpisodes: 0, filmCount: 0, tvSeriesCount: 0, tvEpisodes: 0 },
  '/api/anime/history?limit=2000': { message: 'success', history: [anime] },
  '/api/anime/history?limit=1': { message: 'success', history: [anime] },
  '/api/films/recent?limit=200': { message: 'success', films: [] },
  '/api/tv/recent?limit=200': { message: 'success', series: [] },
  '/api/watch/now': { watching: { type: 'anime', title: anime.title, cover: null, tmdbId: null, episode: null, progressPct: null, source: 'personal', externalUrl: null, startedAt: 0, endsAt: null } },
};
for (const locale of ['zh-CN', 'zh-TW', 'en', 'ja', 'ko']) responses[`/api/watch/favorites?locale=${locale}`] = { message: 'success', favorites: [] };
writeFileSync(output, JSON.stringify({ version: 1, personalized: true, source: 'https://hiwentao.com/books/', updatedAt: new Date().toISOString(), currentReading, wantedBooks: wanted, responses }, null, 2) + '\n');
console.log(`已导入个站书单 ${books.length} 条：读完 ${books.filter(b => b.reading_status === 'read').length}、在读 ${books.filter(b => b.reading_status === 'reading').length}、想读 ${books.filter(b => b.reading_status === 'to-read').length}。在听数据保留。`);
