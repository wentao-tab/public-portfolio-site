// 沿用原稿前六颗星球的绘制参数，保留大小、地貌、环带和卫星。
// 这些只用于外观，不代表个人工具的代码量、提交数或 GitHub 星数。
const preset = (name: string, commits: number, stars: number, languages: Record<string, number>) => ({
  name,
  commits,
  stars,
  pushedDaysAgo: 30,
  languages: Object.entries(languages).map(([name, bytes]) => ({ name, bytes })),
});

export const WORK_PLANET_PRESETS = [
  preset('VoltiCar', 1, 0, { Python: 21623, Shell: 2478 }),
  preset('sora-to-ki', 732, 2, { TypeScript: 2368532, Rust: 1381627, CSS: 579299, JavaScript: 95194 }),
  preset('flow2code', 70, 4, { TypeScript: 977846, JavaScript: 77185 }),
  preset('session-to-obsidian', 13, 2, { Python: 69873 }),
  preset('anigamer-rs', 3, 0, { Rust: 43438 }),
  preset('nuntius', 31, 3, { Python: 301901 }),
];
