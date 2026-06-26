import { execSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const notesDataPath = join(root, 'src/data/readingNotes.ts');
const notesDir = join(root, 'src/pages/notes');
const shouldCheckBranch = process.argv.includes('--branch');

function fail(message) {
	console.error(`site workflow check failed: ${message}`);
	process.exitCode = 1;
}

function getCurrentBranch() {
	try {
		return execSync('git rev-parse --abbrev-ref HEAD', { cwd: root, encoding: 'utf8' }).trim();
	} catch {
		return '';
	}
}

function parseNoteBlocks(source) {
	return [...source.matchAll(/\{\s*slug:\s*'([^']+)'[\s\S]*?date:\s*'([^']+)'[\s\S]*?\}/g)].map((match) => ({
		slug: match[1],
		date: match[2],
		block: match[0],
	}));
}

if (shouldCheckBranch) {
	const branch = getCurrentBranch();
	if (!branch) {
		fail('无法读取当前 git 分支。');
	} else if (branch === 'main' || branch === 'master') {
		fail('当前在主分支，请先切到 codex/xxx 工作分支。');
	} else if (!branch.startsWith('codex/')) {
		fail(`当前分支是 ${branch}，建议使用 codex/ 前缀。`);
	}
}

const dataSource = readFileSync(notesDataPath, 'utf8');
const noteBlocks = parseNoteBlocks(dataSource);
const slugs = new Set();

for (const note of noteBlocks) {
	const pagePath = join(notesDir, `${note.slug}.astro`);

	if (slugs.has(note.slug)) {
		fail(`readingNotes 里有重复 slug：${note.slug}`);
	}
	slugs.add(note.slug);

	if (!existsSync(pagePath)) {
		fail(`readingNotes 里登记了 ${note.slug}，但缺少页面文件 ${pagePath}`);
		continue;
	}

	const pageSource = readFileSync(pagePath, 'utf8');
	if (!pageSource.includes(note.date.replaceAll('-', '.'))) {
		fail(`${note.slug} 页面日期和 readingNotes 不一致。`);
	}
}

const unlistedPages = readdirSync(notesDir)
	.filter((file) => file.endsWith('.astro'))
	.map((file) => basename(file, '.astro'))
	.filter((slug) => !slugs.has(slug));

if (unlistedPages.length > 0) {
	fail(`以下 notes 页面尚未纳入 readingNotes 自动列表：${unlistedPages.join(', ')}`);
}

if (!process.exitCode) {
	console.log('site workflow check passed');
}
