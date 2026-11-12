// 个人工具，按个站仓库中入口的首次提交日期排序。
// 日期来源见 data/personal-tools-sources.json；不使用原作者的 GitHub 项目指标。
import { queryOptions } from '@tanstack/react-query';
import type { WorkRepo } from '@koimsurai/api-types';

export interface WorkEntry {
  repo: string;
  name: string;
  what: Record<string, string>;
  origin?: boolean;
  fallback: Omit<WorkRepo, 'repo'>;
}

const tool = (id: string, name: string, path: string, date: string, description: string, origin = false): WorkEntry => ({
  repo: `wentao-tools/${id}`,
  name,
  origin,
  what: { 'zh-CN': description, 'zh-TW': description, en: description, ja: description, ko: description },
  fallback: {
    url: new URL(path, 'https://hiwentao.com').href,
    created_at: `${date}T00:00:00+08:00`,
    pushed_at: `${date}T00:00:00+08:00`,
    stars: 0,
    commits: 0,
    languages: [],
  },
});

export const WORKS: WorkEntry[] = [
  tool('nanjing-travel-map', '出发吧！从南京', '/tools/nanjing-travel-map/', '2026-06-12', '从南京出发，比较目的地、交通方式和门到门耗时。', true),
  tool('prompt-atlas', '提示词图鉴', 'https://wentao-tab.github.io/Wenxi-ai-clone/', '2026-06-14', '按场景浏览提示词，搜索可复用的模板与创作灵感。'),
  tool('linlai-fm', '鸟鸣睡眠舱', '/sleep/', '2026-06-17', '听南京奥体的鸟鸣，让学习、工作和睡前时光安静下来。'),
  tool('diamond-sutra', '金刚经配图版', '/jingangjing/', '2026-06-19', '三十二品图文阅读，配合经文、白话提示、诵读音频和水墨插图。'),
  tool('sutra-chat', '应作如是', '/sutra-chat/', '2026-06-24', '围绕《金刚经》阅读与思考，整理问题、拆解经文。'),
  tool('zen-hall', '净心禅堂', '/zen/', '2026-09-07', '点一炷香，听一声钟，在静坐中让心安静下来。'),
  tool('wtao-icons', 'Wtao icons', '/tools/wtao-icons/', '2026-11-12', '浏览、预览和下载 19 枚电力设备 SVG 动效图标。'),
];

// 工具直接使用维护中的本地清单，无需查询原作者的 GitHub 仓库。
export const worksQueryOptions = queryOptions({
  queryKey: ['personal', 'works'],
  queryFn: async (): Promise<WorkRepo[]> => [],
  staleTime: Infinity,
});
