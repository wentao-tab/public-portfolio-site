export interface ProjectItem {
	id?: number;
	title: string
	title_en?: string
	description?: string
	date?: string
	detail?: string
	url?: string
	tags?: string[]
	cover?: string[]
}

export const projectItems: ProjectItem[] = [
	{
		title: "文汐 AI 提示词广场",
		title_en: "Wenxi AI Prompt Gallery",
		date: "2026-06-08",
		detail: "https://wentao-tab.github.io/Wenxi-ai-clone/",
		url: "https://wentao-tab.github.io/Wenxi-ai-clone/",
		tags: ["AI", "PRODUCT", "WEB"]
	},
	{
		title: "体验设计知识库",
		title_en: "Experience Design Knowledge Base",
		date: "2026-06-08",
		detail: "https://www.yuque.com/yuqueyonghuu7sppu/uoarmx",
		url: "https://www.yuque.com/yuqueyonghuu7sppu/uoarmx",
		tags: ["UX", "DESIGN", "KNOWLEDGE"]
	},
	{
		title: "读书笔记与碎片记录",
		title_en: "Reading Notes and Daily Fragments",
		date: "2026-06-08",
		detail: "https://flomoapp.com/mine/",
		url: "https://flomoapp.com/mine/",
		tags: ["READING", "NOTES", "THINKING"]
	},
	{
		title: "只关于网球",
		title_en: "Tennis Notes on Xiaohongshu",
		date: "2026-06-08",
		detail: "https://www.xiaohongshu.com/user/profile/5daec7450000000001005946",
		url: "https://www.xiaohongshu.com/user/profile/5daec7450000000001005946",
		tags: ["LIFE", "TENNIS", "SOCIAL"]
	},
	{
		title: "凤城全域虚拟电厂智慧驾驶舱",
		title_en: "Fengcheng Virtual Power Plant Cockpit",
		date: "2026-06-09",
		detail: "/project/fengcheng-vpp/",
		url: "/project/fengcheng-vpp/",
		tags: ["ENERGY", "DASHBOARD", "PRODUCT"]
	}
];
