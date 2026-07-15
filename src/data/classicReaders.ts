export interface ClassicCard {
	id: string;
	sentence: string;
	plain?: string;
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
	description: "《般若波罗蜜多心经》玄奘译本原文分段阅读。",
	keywords: "心经,般若波罗蜜多心经,玄奘译本,佛经,图文阅读,配图版",
	byline: "唐三藏法师玄奘奉诏译",
	brandEyebrow: "Prajnaparamita Hrdaya · Illustrated Reader",
	brandTitle: "心经配图版",
	brandSubtitle: "照见五蕴皆空",
	mantra: ["照见五蕴皆空", "心无挂碍"],
	footer: "《般若波罗蜜多心经》玄奘译本原文分段整理。",
	pending: ["配图素材", "诵读音频", "逐句卡片"],
	chapters: [
		{
			chapter: 1,
			title: "照见五蕴",
			gist: "玄奘译本原文 · 起首",
			text: "观自在菩萨，行深般若波罗蜜多时，照见五蕴皆空，度一切苦厄。",
			cards: [
				{
					id: "xinjing-c01-s01",
					sentence: "观自在菩萨，行深般若波罗蜜多时。",
				},
				{
					id: "xinjing-c01-s02",
					sentence: "照见五蕴皆空，度一切苦厄。",
				},
			],
		},
		{
			chapter: 2,
			title: "色空不二",
			gist: "玄奘译本原文 · 色空",
			text: "舍利子，色不异空，空不异色；色即是空，空即是色。受想行识，亦复如是。",
			cards: [
				{
					id: "xinjing-c02-s01",
					sentence: "舍利子，色不异空，空不异色。",
				},
				{
					id: "xinjing-c02-s02",
					sentence: "色即是空，空即是色。受想行识，亦复如是。",
				},
			],
		},
		{
			chapter: 3,
			title: "诸法空相",
			gist: "玄奘译本原文 · 空相",
			text: "舍利子，是诸法空相，不生不灭，不垢不净，不增不减。是故空中无色，无受想行识；无眼耳鼻舌身意，无色声香味触法；无眼界，乃至无意识界；无无明，亦无无明尽，乃至无老死，亦无老死尽；无苦集灭道，无智亦无得。",
			cards: [
				{
					id: "xinjing-c03-s01",
					sentence: "舍利子，是诸法空相，不生不灭，不垢不净，不增不减。",
				},
				{
					id: "xinjing-c03-s02",
					sentence: "是故空中无色，无受想行识；无眼耳鼻舌身意，无色声香味触法。",
				},
				{
					id: "xinjing-c03-s03",
					sentence: "无眼界，乃至无意识界；无无明，亦无无明尽，乃至无老死，亦无老死尽；无苦集灭道，无智亦无得。",
				},
			],
		},
		{
			chapter: 4,
			title: "心无挂碍",
			gist: "玄奘译本原文 · 无所得",
			text: "以无所得故，菩提萨埵，依般若波罗蜜多故，心无挂碍；无挂碍故，无有恐怖，远离颠倒梦想，究竟涅槃。三世诸佛，依般若波罗蜜多故，得阿耨多罗三藐三菩提。",
			cards: [
				{
					id: "xinjing-c04-s01",
					sentence: "以无所得故，菩提萨埵，依般若波罗蜜多故，心无挂碍。",
				},
				{
					id: "xinjing-c04-s02",
					sentence: "无挂碍故，无有恐怖，远离颠倒梦想，究竟涅槃。",
				},
				{
					id: "xinjing-c04-s03",
					sentence: "三世诸佛，依般若波罗蜜多故，得阿耨多罗三藐三菩提。",
				},
			],
		},
		{
			chapter: 5,
			title: "般若咒",
			gist: "玄奘译本原文 · 结咒",
			text: "故知般若波罗蜜多，是大神咒，是大明咒，是无上咒，是无等等咒，能除一切苦，真实不虚。故说般若波罗蜜多咒，即说咒曰：揭谛揭谛，波罗揭谛，波罗僧揭谛，菩提萨婆诃。",
			cards: [
				{
					id: "xinjing-c05-s01",
					sentence: "故知般若波罗蜜多，是大神咒，是大明咒，是无上咒，是无等等咒，能除一切苦，真实不虚。",
				},
				{
					id: "xinjing-c05-s02",
					sentence: "故说般若波罗蜜多咒，即说咒曰：揭谛揭谛，波罗揭谛，波罗僧揭谛，菩提萨婆诃。",
				},
			],
		},
	],
};

export const liaofanReader: ClassicReaderData = {
	slug: "liaofan",
	title: "了凡四训配图版",
	seoTitle: "了凡四训配图版",
	description: "《了凡四训》四篇原文节选阅读：立命、改过、积善、谦德。",
	keywords: "了凡四训,袁了凡,立命,改过,积善,谦德,图文阅读",
	byline: "明 · 袁了凡",
	brandEyebrow: "Liao-Fan's Four Lessons · Illustrated Reader",
	brandTitle: "了凡四训配图版",
	brandSubtitle: "命由我作，福自己求",
	mantra: ["命由我作", "福自己求"],
	footer: "《了凡四训》四篇原文节选整理。",
	pending: ["配图素材", "全文版本校对", "逐段扩展"],
	chapters: [
		{
			chapter: 1,
			title: "立命之学",
			gist: "原文节选 · 立命",
			text: "命由我作，福自己求。诗书所称，的为明训。一切福田，不离方寸；从心而觅，感无不通。",
			cards: [
				{
					id: "liaofan-c01-s01",
					sentence: "命由我作，福自己求。",
				},
				{
					id: "liaofan-c01-s02",
					sentence: "一切福田，不离方寸；从心而觅，感无不通。",
				},
			],
		},
		{
			chapter: 2,
			title: "改过之法",
			gist: "原文节选 · 改过",
			text: "改过之法，第一要发耻心，第二要发畏心，第三须发勇心。务要日日知非，日日改过；一日不知非，即一日安于自是；一日无过可改，即一日无步可进。",
			cards: [
				{
					id: "liaofan-c02-s01",
					sentence: "改过之法，第一要发耻心，第二要发畏心，第三须发勇心。",
				},
				{
					id: "liaofan-c02-s02",
					sentence: "务要日日知非，日日改过；一日不知非，即一日安于自是；一日无过可改，即一日无步可进。",
				},
			],
		},
		{
			chapter: 3,
			title: "积善之方",
			gist: "原文节选 · 积善",
			text: "善有真，有假；有端，有曲；有阴，有阳；有是，有非；有偏，有正；有半，有满；有大，有小；有难，有易。皆当深辨。",
			cards: [
				{
					id: "liaofan-c03-s01",
					sentence: "善有真，有假；有端，有曲；有阴，有阳。",
				},
				{
					id: "liaofan-c03-s02",
					sentence: "有是，有非；有偏，有正；有半，有满；有大，有小；有难，有易。皆当深辨。",
				},
			],
		},
		{
			chapter: 4,
			title: "谦德之效",
			gist: "原文节选 · 谦德",
			text: "满招损，谦受益。天道亏盈而益谦；地道变盈而流谦；鬼神害盈而福谦；人道恶盈而好谦。",
			cards: [
				{
					id: "liaofan-c04-s01",
					sentence: "满招损，谦受益。",
				},
				{
					id: "liaofan-c04-s02",
					sentence: "天道亏盈而益谦；地道变盈而流谦；鬼神害盈而福谦；人道恶盈而好谦。",
				},
			],
		},
	],
};
