export interface BookItem {
	no: number;
	title: string;
	note?: string;
	mark?: string;
	tone: string;
}

export const books2026: BookItem[] = [
	{ no: 1, title: '窄门', note: '文字很美，后劲很大。故事隐喻有很强的代入感。', tone: 'sage' },
	{ no: 2, title: '平凡的世界 3', note: '普通人平凡而又伟大的故事，朴实的故事最动人。', tone: 'earth' },
	{ no: 3, title: '莱博维茨的赞歌', tone: 'ink' },
	{ no: 4, title: '金钱的艺术', tone: 'gold' },
	{ no: 5, title: '温克海姆男爵返乡', tone: 'rose' },
	{ no: 6, title: '活出生命的意义', tone: 'stone' },
	{ no: 7, title: '灿烂千阳', tone: 'sun' },
	{ no: 8, title: '活着', tone: 'paper' },
	{ no: 9, title: '安娜卡列宁娜 上', tone: 'wine' },
	{ no: 10, title: '荒唐的人生', tone: 'blue' },
	{ no: 11, title: '希腊人佐巴', tone: 'sea' },
	{ no: 12, title: '金刚经说什么', mark: '5刷', tone: 'gold' },
	{ no: 13, title: '病隙碎笔', tone: 'paper' },
	{ no: 14, title: '英国病人', tone: 'blue' },
	{ no: 15, title: '白鹿春风', tone: 'sage' },
	{ no: 16, title: '布鲁克林', tone: 'rose' },
	{ no: 17, title: '倦怠社会', tone: 'ink' },
	{ no: 18, title: '我与地坛', mark: '2刷', tone: 'earth' },
	{ no: 19, title: '人生拒绝清单', tone: 'stone' },
	{ no: 20, title: '归属感', tone: 'sea' },
	{ no: 21, title: '布鲁克林', tone: 'rose' },
	{ no: 22, title: '我是寨子里长大的女孩', tone: 'sage' },
	{ no: 23, title: '心得表达', note: '李沁云', tone: 'sun' },
	{ no: 24, title: '沉思录', note: '古罗马皇帝奥勒留', tone: 'stone' },
	{ no: 25, title: '赞美闲散', tone: 'paper' },
];

export const bookStats = {
	year: '2026',
	total: books2026.length,
	reread: books2026.filter((book) => book.mark?.includes('刷')).length,
	notes: books2026.filter((book) => book.note).length,
};
