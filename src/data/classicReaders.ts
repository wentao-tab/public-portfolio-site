export interface ClassicCard {
	id: string;
	sentence: string;
	plain: string;
	image?: string;
	prompt?: string;
}

export interface ClassicChapter {
	chapter: number;
	title: string;
	gist: string;
	text: string;
	cards: ClassicCard[];
}

export interface ClassicReaderData {
	slug: string;
	title: string;
	seoTitle: string;
	description: string;
	keywords: string;
	byline: string;
	brandEyebrow: string;
	brandTitle: string;
	brandSubtitle: string;
	mantra: [string, string];
	footer: string;
	pending: string[];
	chapters: ClassicChapter[];
}

export const heartSutraReader: ClassicReaderData = {
	slug: "xinjing",
	title: "心经配图版",
	seoTitle: "心经配图版",
	description: "把《般若波罗蜜多心经》拆成可以慢慢读的图文卡片：经文摘句、白话理解和待补配图位。",
	keywords: "心经,般若波罗蜜多心经,佛经,图文阅读,配图版",
	byline: "唐三藏法师玄奘奉诏译",
	brandEyebrow: "Prajnaparamita Hrdaya · Illustrated Reader",
	brandTitle: "心经配图版",
	brandSubtitle: "照见五蕴皆空",
	mantra: ["照见五蕴皆空", "心无挂碍"],
	footer: "图片位先留空。明早确认配图风格、是否补全文对照、是否加入诵读音频。",
	pending: ["配图素材", "是否补全文原文对照", "是否加入诵读音频"],
	chapters: [
		{
			chapter: 1,
			title: "观自在",
			gist: "先把身心经验看清楚，很多苦就不再被抓得那么死。",
			text: "观自在菩萨，行深般若波罗蜜多时，照见五蕴皆空，度一切苦厄。",
			cards: [
				{
					id: "xinjing-c01-s01",
					sentence: "观自在菩萨，行深般若波罗蜜多时。",
					plain: "真正的自在，不是事情都顺，而是能回到清楚的观看里。",
				},
				{
					id: "xinjing-c01-s02",
					sentence: "照见五蕴皆空，度一切苦厄。",
					plain: "看见感受、念头、身份都在变化，心就少一点被它们拖着跑。",
				},
			],
		},
		{
			chapter: 2,
			title: "色空不二",
			gist: "现实不是要逃离的对象，但也不能被当作唯一真相。",
			text: "色不异空，空不异色；色即是空，空即是色。",
			cards: [
				{
					id: "xinjing-c02-s01",
					sentence: "色不异空，空不异色。",
					plain: "眼前的事很真，但它不是固定不变的最终结论。",
				},
				{
					id: "xinjing-c02-s02",
					sentence: "色即是空，空即是色。",
					plain: "把事做好，也知道它只是因缘暂时聚在一起。",
				},
			],
		},
		{
			chapter: 3,
			title: "无所得",
			gist: "少一点必须得到什么，心反而更稳。",
			text: "以无所得故，菩提萨埵依般若波罗蜜多故，心无挂碍。",
			cards: [
				{
					id: "xinjing-c03-s01",
					sentence: "以无所得故。",
					plain: "结果可以争取，但不要把结果变成心的主人。",
				},
				{
					id: "xinjing-c03-s02",
					sentence: "心无挂碍，无挂碍故，无有恐怖。",
					plain: "少一点反复抓取，恐惧就少一个落脚点。",
				},
			],
		},
		{
			chapter: 4,
			title: "揭谛",
			gist: "不是停在理解里，而是一步步穿过执着。",
			text: "揭谛揭谛，波罗揭谛，波罗僧揭谛，菩提萨婆诃。",
			cards: [
				{
					id: "xinjing-c04-s01",
					sentence: "揭谛揭谛，波罗揭谛。",
					plain: "继续走，别把某一次理解当成终点。",
				},
				{
					id: "xinjing-c04-s02",
					sentence: "菩提萨婆诃。",
					plain: "真正的清明，会回到行动、关系和每天具体的事里。",
				},
			],
		},
	],
};

export const liaofanReader: ClassicReaderData = {
	slug: "liaofan",
	title: "了凡四训配图版",
	seoTitle: "了凡四训配图版",
	description: "把《了凡四训》拆成四个可以持续维护的图文阅读入口：立命、改过、积善、谦德。",
	keywords: "了凡四训,袁了凡,立命,改过,积善,谦德,图文阅读",
	byline: "明 · 袁了凡",
	brandEyebrow: "Liao-Fan's Four Lessons · Illustrated Reader",
	brandTitle: "了凡四训配图版",
	brandSubtitle: "命由我作，福自己求",
	mantra: ["命由我作", "福自己求"],
	footer: "图片位先留空。明早确认配图风格、全文版本和是否需要逐段拆解。",
	pending: ["配图素材", "全文版本校对", "是否扩展为逐段章节"],
	chapters: [
		{
			chapter: 1,
			title: "立命之学",
			gist: "命不是被动承受的标签，而是每天行为慢慢累积出来的方向。",
			text: "命由我作，福自己求。",
			cards: [
				{
					id: "liaofan-c01-s01",
					sentence: "命由我作，福自己求。",
					plain: "真正能改变人的，不是一次觉悟，而是持续把选择落到行动里。",
				},
				{
					id: "liaofan-c01-s02",
					sentence: "一切福田，不离方寸。",
					plain: "福气不是向外讨来的，它先从一念一行里长出来。",
				},
			],
		},
		{
			chapter: 2,
			title: "改过之法",
			gist: "改过不是羞辱自己，而是看见念头、习惯和行为之间的链条。",
			text: "过有千端，惟心所造。",
			cards: [
				{
					id: "liaofan-c02-s01",
					sentence: "过有千端，惟心所造。",
					plain: "问题常常不只在事情表面，而在我们反复默认的念头里。",
				},
				{
					id: "liaofan-c02-s02",
					sentence: "改过者，第一要发耻心。",
					plain: "发耻心不是否定自己，而是不再替旧习惯找借口。",
				},
			],
		},
		{
			chapter: 3,
			title: "积善之方",
			gist: "做善事之前，先看清自己的心，别让善意变成交易或表演。",
			text: "善有真，有假；有端，有曲；有阴，有阳。",
			cards: [
				{
					id: "liaofan-c03-s01",
					sentence: "善有真，有假；有端，有曲。",
					plain: "外在看起来是善，里面也可能藏着证明、控制和求回报。",
				},
				{
					id: "liaofan-c03-s02",
					sentence: "为善而不求人知，方是真善。",
					plain: "不把善意写进账本，善才不会变成新的负担。",
				},
			],
		},
		{
			chapter: 4,
			title: "谦德之效",
			gist: "真正稳的人，不靠姿态把自己撑大，而是给世界和他人留出空间。",
			text: "满招损，谦受益。",
			cards: [
				{
					id: "liaofan-c04-s01",
					sentence: "满招损，谦受益。",
					plain: "越觉得自己一定对，越容易失去继续看见的能力。",
				},
				{
					id: "liaofan-c04-s02",
					sentence: "谦之一字，最为受用。",
					plain: "谦不是把自己放低，而是不急着把自己放到中心。",
				},
			],
		},
	],
};
