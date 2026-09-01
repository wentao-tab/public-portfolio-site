export interface BookItem {
	no: number;
	title: string;
	note?: string;
	mark?: string;
	tone: string;
}

export const books2026: BookItem[] = [
	{ no: 1, title: '窄门', note: '文字极美，读后余韵悠长，隐喻中藏着令人深陷的代入感。', tone: 'sage' },
	{ no: 2, title: '平凡世界3', note: '普通人平凡而伟大的故事，最朴实的叙述最动人。', tone: 'earth' },
	{ no: 3, title: '莱博维茨的赞歌', note: '末世废土下的文明轮回，荒诞中透着悲悯的警世寓言。', tone: 'ink' },
	{ no: 4, title: '金钱的艺术', note: '洞察财富背后的逻辑与人性，不止于技巧更是思维锤炼。', tone: 'gold' },
	{ no: 5, title: '温克海姆男爵返乡', note: '归乡之路映照阶层与时代的裂痕，冷峻而深刻。', tone: 'rose' },
	{ no: 6, title: '活出生命的意义', note: '在极端苦难中寻找意义，弗兰克尔的存在主义灯塔。', tone: 'stone' },
	{ no: 7, title: '灿烂千阳', note: '阿富汗女性的隐秘苦难与光芒，每份坚韧都令人心碎又致敬。', tone: 'sun' },
	{ no: 8, title: '活着', note: '福贵的一生熬尽苦难，却让人看清活着本身就是全部意义。', tone: 'paper' },
	{ no: 9, title: '安娜卡列宁娜 上', note: '开篇即不朽，爱情与秩序冲突下无人全身而退。', tone: 'wine' },
	{ no: 10, title: '荒唐的人生', note: '用自嘲剖开真实，荒诞外壳里裹着清醒的疼痛。', tone: 'blue' },
	{ no: 11, title: '希腊人佐巴', note: '生命不是用来理解的，是用来跳舞的，佐巴如是说。', tone: 'sea' },
	{ no: 12, title: '南怀瑾作品集（新版）：金刚经说什么', note: '五刷不厌，将深奥佛理化为生活通透的智慧。', mark: '5刷', tone: 'gold' },
	{ no: 13, title: '病隙碎笔', note: '史铁生在病痛间隙写下对神性、苦难与爱的终极追问。', tone: 'paper' },
	{ no: 14, title: '英国病人', note: '沙漠、焚身、身份与背叛，诗意长句里烧灼着的爱。', tone: 'blue' },
	{ no: 15, title: '白鹿春风', note: '乡土史诗里的命运轮回与顽固生命力。', tone: 'sage' },
	{ no: 16, title: '布鲁克林', note: '漂泊少女在旧世界与新大陆间的徘徊，温柔而克制。', tone: 'rose' },
	{ no: 17, title: '倦怠社会', note: '对当代成就社会的锋利诊断：我们不是被压迫，而是过度燃烧。', tone: 'ink' },
	{ no: 18, title: '我与地坛', note: '两遍仍不够，在地坛的寂静中听懂母亲与命运的和解。', mark: '2刷', tone: 'earth' },
	{ no: 19, title: '人生拒绝清单', note: '教人勇敢舍去“应该做”的事，找回真正想活出的样子。', tone: 'stone' },
	{ no: 20, title: '归属感', note: '不向外寻找归属，而在内心搭建不再漂泊的锚点。', tone: 'sea' },
	{ no: 21, title: '布鲁克林', note: '漂泊者在他乡与故土间温柔而坚韧的选择。', tone: 'rose' },
	{ no: 22, title: '我是寨子里长大的女孩', note: '从寨子出发，每一步都带着土地与记忆的重量。', tone: 'sage' },
	{ no: 23, title: '心得表达', note: '关于书写与心理成长的对话，真诚克制且有疗愈力。', mark: '李沁云', tone: 'sun' },
	{ no: 24, title: '沉思录', note: '帝王的深夜自省，至今仍是斯多葛派的床头书。', mark: '古罗马皇帝奥勒留', tone: 'stone' },
	{ no: 25, title: '赞美闲散', note: '为“无用”正名，闲散不是懒惰而是对抗异化的温柔反抗。', tone: 'paper' },
	{ no: 26, title: '周易说什么', note: '化玄奥为平易，将卦象哲理拉回日常决策与修身之道。', mark: '韩鹏杰', tone: 'gold' },
	{ no: 27, title: '沉思录', note: '重读斯多葛的自省，把判断拉回当下可做之事。', tone: 'ink' },
	{ no: 28, title: '赌徒', note: '在欲望、风险与自我欺骗之间，看人如何一步步把选择变成命运。', tone: 'blue' },
	{ no: 29, title: '在菜场，在人间', note: '从日常烟火里看见普通人的尊严、辛劳与彼此照应。', tone: 'sun' },
	{ no: 30, title: '鹅之书', note: '两个女孩在想象与现实间彼此照亮，关于友谊、写作和逃离的细密回声。', mark: '李翊云', tone: 'paper' },
	{ no: 31, title: '十一种孤独', note: '耶茨写尽现代关系里的疏离与失落，冷静文字背后是难以安放的孤独。', mark: '理查德·耶茨', tone: 'blue' },
	{ no: 32, title: '红鱼之姻', note: '在偶然与命运交错的关系里，写人与人如何相遇、牵引与告别。', tone: 'rose' },
	{ no: 33, title: '正常人', note: '亲密关系里的靠近与错过，温柔又刺痛地写出年轻人的自尊和脆弱。', tone: 'sea' },
	{ no: 34, title: '入门', note: '从一扇小门开始，把陌生知识慢慢变成可以使用的理解。', tone: 'stone' },
	{ no: 35, title: '如何捉鼹鼠', note: '从一个具体问题出发，把复杂世界拆成可以观察和处理的小步骤。', tone: 'sage' },
	{ no: 36, title: '了不起的自我：自我发展心理学', note: '用心理学拆解自我成长，把改变从口号落回可执行的日常练习。', tone: 'gold' },
	{ no: 37, title: '最美的小事', note: '把人生的裂缝写成温柔的回答，像一封给困顿时刻的长信。', mark: '斯特雷德', tone: 'rose' },
	{ no: 38, title: '反与正；婚礼集；夏天集', note: '在反复与正面之间，写亲密关系、成长和季节里那些难以说尽的经验。', tone: 'paper' },
	{ no: 39, title: '津巴多普心理学', note: '从行为、环境与选择理解人，认识心理如何影响日常生活。', tone: 'ink' },
	{ no: 40, title: '智能简史', tone: 'blue' },
	{ no: 41, title: '我们的问题是什么', tone: 'gold' },
	{ no: 42, title: '燕子呢喃', tone: 'sage' },
	{ no: 43, title: '白鹤鸣叫', tone: 'paper' },
	{ no: 44, title: '如何获得内心安宁', tone: 'stone' },
	{ no: 45, title: '明朝那些年', tone: 'earth' },
];

export const bookStats = {
	year: '2026',
	total: books2026.length,
	reread: books2026.filter((book) => book.mark?.includes('刷')).length,
	notes: books2026.filter((book) => book.note).length,
};
