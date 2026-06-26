# 项目维护边界

请用中文回答，默认简洁直接。

这个仓库是梁文韬个人站主仓库，线上主域名是 `https://hiwentao.com/`。

## 先判断任务归属

1. 个站总入口 / 日常文章
   - 只改个人站内容、导航、文章、书单、项目、关于页。
   - 常用位置：
     - 文章：`src/pages/notes/`
     - 阅读笔记数据源：`src/data/readingNotes.ts`
     - 首页/入口：`src/pages/index.astro`
     - 内容数据：`src/data/content.ts`
     - 工具页入口：`src/pages/tools.astro`

2. 四个主站内维护的小工具
   - 出发吧！从南京：`public/tools/nanjing-travel-map/`
   - 林籁 fm：`src/pages/sleep.astro`
   - 金刚经配图版：`src/pages/jingangjing.astro`、`src/pages/jingangjing/source.astro`、`public/assets/jingangjing/`
   - 应作如是入口包装页：`src/pages/sutra-chat.astro`

3. 外部入口，不属于本仓库主维护范围
   - 提示词图鉴：`https://wentao-tab.github.io/Wenxi-ai-clone/`
   - 应作如是智能体本体：`/Users/wentao/Documents/我的稀奇古怪的宝藏/jingangjing-illustrated-reader`

## 防污染规则

- 用户说“个站更新文章”，默认只处理 `src/pages/notes/` 和必要的首页/列表入口，不要改小工具。
- 首页阅读卡片和生活页金刚经条目由 `src/data/readingNotes.ts` 自动生成，新增读书笔记时优先同步这个文件。
- 未确认发布的文章放 `src/drafts/notes/`，不要放在 `src/pages/notes/`，避免被 Astro 直接发布。
- 日常工作分支使用 `codex/` 前缀；不要直接在 `main` 上发文或混改工具。
- 用户说“工具页入口 / 小工具卡片”，默认先看 `src/pages/tools.astro`，不要直接改工具本体。
- 用户说“应作如是回答/知识库/智能体”，默认切到 `jingangjing-illustrated-reader` 仓库，不要只改本仓库 iframe 包装页。
- 用户说“域名不对”，优先区分：
  - 主站显示域名：`https://hiwentao.com/`
  - 外部 GitHub Pages 应用：独立仓库部署地址。
- 提交前优先跑：
  - `npm run site:prepublish`
- 如果只需要复核构建，可单独跑：
  - `npm run site:verify`
- 等价底层命令：
  - `PUBLIC_SITE_URL=https://hiwentao.com/ PUBLIC_SITE_NAME='梁文韬的设计与读书思考' PUBLIC_BASE_PATH=/ npx -y node@22.12.0 node_modules/astro/bin/astro.mjs check`
  - `PUBLIC_SITE_URL=https://hiwentao.com/ PUBLIC_SITE_NAME='梁文韬的设计与读书思考' PUBLIC_BASE_PATH=/ npx -y node@22.12.0 node_modules/astro/bin/astro.mjs build`
