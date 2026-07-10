export type ReadingNoteCategory = 'jingangjing';

export interface ReadingNote {
	slug: string;
	title: string;
	desc: string;
	date: string;
	category: ReadingNoteCategory;
	cover: string;
	homeCover?: string;
}

export const readingNotes: ReadingNote[] = [
	{
		slug: 'jingangjing-0710',
		title: '语言与沉默。',
		desc: '能说清楚很重要，但不是所有理解都靠说出来证明。',
		date: '2026-07-10',
		category: 'jingangjing',
		cover: '/assets/cover/cover-jingangjing-0610.png',
	},
	{
		slug: 'jingangjing-0708',
		title: '法身、报身、化身。',
		desc: '一个人不只看他说什么，还要看他活出来什么、产生什么作用。',
		date: '2026-07-08',
		category: 'jingangjing',
		cover: '/assets/cover/cover-jingangjing-0610.png',
	},
	{
		slug: 'jingangjing-0707-32xiang',
		title: '三十二相。',
		desc: '外在呈现可以庄严，但不能替代内在真实。',
		date: '2026-07-07',
		category: 'jingangjing',
		cover: '/assets/cover/cover-jingangjing-0610.png',
	},
	{
		slug: 'jingangjing-0707',
		title: '信心清净。',
		desc: '真正的信，不是相信自己一定赢，而是不被一时混乱完全拖走。',
		date: '2026-07-07',
		category: 'jingangjing',
		cover: '/assets/cover/cover-jingangjing-0610.png',
	},
	{
		slug: 'jingangjing-0704',
		title: '微尘。',
		desc: '很多看似完整的东西，其实都是一点点条件组合起来的。',
		date: '2026-07-04',
		category: 'jingangjing',
		cover: '/assets/cover/cover-jingangjing-0610.png',
	},
	{
		slug: 'jingangjing-0702',
		title: '恒河沙。',
		desc: '数量很大，不代表意义就更深。',
		date: '2026-07-02',
		category: 'jingangjing',
		cover: '/assets/cover/cover-jingangjing-0610.png',
	},
	{
		slug: 'jingangjing-0630',
		title: '无住生心。',
		desc: '心不黏住，行动才干净。',
		date: '2026-06-30',
		category: 'jingangjing',
		cover: '/assets/cover/cover-jingangjing-0610.png',
	},
	{
		slug: 'jingangjing-0629',
		title: '无诤。',
		desc: '很多时候，不争不是认输，而是不把自己交给对抗。',
		date: '2026-06-29',
		category: 'jingangjing',
		cover: '/assets/cover/cover-jingangjing-0610.png',
	},
	{
		slug: 'jingangjing-0628',
		title: '无为福。',
		desc: '最深的福，不是得到更多，而是少被牵着走。',
		date: '2026-06-28',
		category: 'jingangjing',
		cover: '/assets/cover/cover-jingangjing-0610.png',
	},
	{
		slug: 'jingangjing-0627',
		title: '心行善。',
		desc: '善事要做，但别让善事变成新的负担。',
		date: '2026-06-27',
		category: 'jingangjing',
		cover: '/assets/cover/cover-jingangjing-0610.png',
	},
	{
		slug: 'jingangjing-0626',
		title: '不惊、不怖、不畏。',
		desc: '真正的理解，会减少内心的过度反应。',
		date: '2026-06-26',
		category: 'jingangjing',
		cover: '/assets/cover/cover-jingangjing-0610.png',
	},
	{
		slug: 'jingangjing-0625',
		title: '一切有为法，如梦幻泡影。',
		desc: '认真处理事情，但不要把一时的局面当成永恒结论。',
		date: '2026-06-25',
		category: 'jingangjing',
		cover: '/assets/cover/cover-jingangjing-0610.png',
	},
	{
		slug: 'jingangjing-0624',
		title: '知见不生。',
		desc: '看清一件事以后，不要马上拿它生成一个新的“我”。',
		date: '2026-06-24',
		category: 'jingangjing',
		cover: '/assets/cover/cover-jingangjing-0610.png',
	},
	{
		slug: 'jingangjing-0623',
		title: '如来者，即诸法如义。',
		desc: '不要把“答案”想得太远，它往往就在眼前这件事里。',
		date: '2026-06-23',
		category: 'jingangjing',
		cover: '/assets/cover/cover-jingangjing-0610.png',
	},
	{
		slug: 'jingangjing-0622',
		title: '法尚应舍，何况非法。',
		desc: '方法是船，不是家。',
		date: '2026-06-22',
		category: 'jingangjing',
		cover: '/assets/cover/cover-jingangjing-0610.png',
	},
	{
		slug: 'jingangjing-learning-fourth-read',
		title: '受持。',
		desc: '真正懂，不是会复述，而是能在事上用出来。',
		date: '2026-06-19',
		category: 'jingangjing',
		cover: '/assets/cover/cover-jingangjing-learning-fourth-read.webp',
	},
	{
		slug: 'jingangjing-0619',
		title: '不住好人相。',
		desc: '善意要保留，但不要把“我是好人”变成自己的任务。',
		date: '2026-06-19',
		category: 'jingangjing',
		cover: '/assets/cover/cover-jingangjing-0610.png',
	},
	{
		slug: 'jingangjing-0617',
		title: '若以恒河沙等身命布施。',
		desc: '数量再大，也不等于心真正自由。',
		date: '2026-06-17',
		category: 'jingangjing',
		cover: '/assets/cover/cover-jingangjing-0610.png',
	},
	{
		slug: 'jingangjing-0616',
		title: '无所得。',
		desc: '真正有价值的成长，常常不是多拿到什么，而是少被什么牵着走。',
		date: '2026-06-16',
		category: 'jingangjing',
		cover: '/assets/cover/cover-jingangjing-0610.png',
	},
	{
		slug: 'jingangjing-0615',
		title: '无我相。',
		desc: '少一点“我在证明什么”，事情会轻很多。',
		date: '2026-06-15',
		category: 'jingangjing',
		cover: '/assets/cover/cover-jingangjing-0610.png',
	},
	{
		slug: 'jingangjing-0614',
		title: '不取法，不取非法。',
		desc: '不要被规则绑住，也不要用“反规则”绑住自己。',
		date: '2026-06-14',
		category: 'jingangjing',
		cover: '/assets/cover/cover-jingangjing-0610.png',
	},
	{
		slug: 'jingangjing-0612',
		title: '过去心不可得，现在心不可得，未来心不可得。',
		desc: '不要把精力浪费在抓不住的心上。下一步是什么？',
		date: '2026-06-12',
		category: 'jingangjing',
		cover: '/assets/cover/cover-jingangjing-0610.png',
	},
	{
		slug: 'jingangjing-0611',
		title: '凡所有相，皆是虚妄。',
		desc: '别太相信眼前这一刻的感觉很真。看见相，但不马上下结论。',
		date: '2026-06-11',
		category: 'jingangjing',
		cover: '/assets/cover/cover-jingangjing-0610.png',
	},
	{
		slug: 'jingangjing-0610',
		title: '我读金刚经感悟 6/10',
		desc: '应无所住而生其心。做一件该做的小事，做完就放下。',
		date: '2026-06-10',
		category: 'jingangjing',
		cover: '/assets/cover/cover-jingangjing-0610.png',
	},
];

export const sortedReadingNotes = [...readingNotes].sort((a, b) => b.date.localeCompare(a.date));

export function getNoteUrl(note: Pick<ReadingNote, 'slug'>) {
	return `/notes/${note.slug}/`;
}

export function formatDotDate(date: string) {
	return date.replaceAll('-', '.');
}

export function formatChineseDate(date: string) {
	const [year, month, day] = date.split('-');
	return `${year}年${Number(month)}月${Number(day)}日`;
}
