// 正文来自用户提供的《我的个人简历.docx》。同一公司的工作内容合并，沿用原稿的章节样式。
const YEAR_LABELS = {
  'zh-TW': { NOW: '現在', FUTURE: '未來' },
  'zh-CN': { NOW: '现在', FUTURE: '未来' },
  en: { NOW: 'Now', FUTURE: 'Future' },
  ja: { NOW: '今', FUTURE: '未来' },
  ko: { NOW: '지금', FUTURE: '미래' },
};

const MILESTONE_STATIC = [
  { id: 1, year: '1994', icon: '🌟', color: '#c084fc', tags: [] },
  { id: 2, year: '2010-2012', icon: '🍱', color: '#4ade80', tags: [] },
  { id: 3, year: '2013-2016', icon: '👥', color: '#60a5fa', tags: [] },
  { id: 4, year: '2016', icon: '🎓', color: '#fb923c', tags: [] },
  { id: 5, year: '2016.08', icon: '📱', color: '#34d399', tags: [] },
  { id: 6, year: '2019.06', icon: '⚡', color: '#a78bfa', tags: [] },
  { id: 8, year: 'NOW', icon: '🔭', color: '#f472b6', tags: [] },
  { id: 9, year: 'FUTURE', icon: '🚀', color: '#ec4899', tags: [] },
];

const milestones = [
  {
    title: '出生',
    subtitle: 'O型血',
    description: '理性的逻辑思维与感性的美学追求——这两种看似对立的特质，让我在探索技术与设计的过程中，既能以严谨的思考理解复杂系统，也能以细腻的审美构建视觉表达，在理性与感性之间，寻找功能、秩序与美感的平衡。',
    extraTags: [],
  },
  {
    title: '启蒙与磨练',
    subtitle: '烧烤店内外场',
    description: '初中时期第一份工作是在烧烤店担任内外场。对于自己有的严苛要求，善于观察，这深深影响了我日后的工作态度。即使在忙碌的高压环境下，也能保持冷静依照处理繁杂事务，培养出优异的时间管理能力与抗压性。',
    extraTags: [],
  },
  {
    title: '大学',
    subtitle: '学习电子商务',
    description: '进入大学后积极充实技术栈（Ps、Ai、网页设计、前端基础知识），并跳出舒适圈担任系学会会长。除了繁重课业，还需协调社团内的人力与资源，磨练了多任务处理能力，学会带领团队、进行跨部门沟通，这些软实力成为日后在职场上与不同 Team 协作的重要基石。',
    extraTags: [],
  },
  {
    title: '北京智鸟科技有限公司',
    subtitle: '移动端UI视觉设计',
    description: '工作内容通常围绕移动端视觉产出、切图标注交付、设计规范维护三条线展开，同时需要理解租房 O2O 的业务场景（房源展示、在线沟通、预约看房/签约）。负责租房 App 的移动端 UI 视觉设计，依据产品原型完成房源列表、房源详情、搜索筛选、消息沟通及个人中心等核心页面的高保真设计；使用 Sketch 进行界面设计与组件复用，配合 Photoshop 完成图标、banner 等视觉元素制作。',
    extraTags: [],
  },
  {
    title: '江苏千米网络科技股份有限公司',
    subtitle: '2016.08—2019.07 · 小店POS端及SaaS平台界面设计',
    description: '完成高保真、切图标注与开发走查；参与基础视觉规范和常用组件维护，提升设计一致性与复用效率；负责产品方案及汇报类PPT视觉包装，协同产品、研发与业务团队推进项目落地。',
    extraTags: [],
  },
  {
    title: '南京文思海辉信息技术有限公司',
    subtitle: '2019.06—至今 · 数字化产品设计与多维视觉表达',
    description: '在数字化与设计的交汇处，不断拓展专业能力的边界。从产品构想到体验落地，从传统视觉设计到 AI 驱动的智能化应用，参与负荷一张图从 0 到 1 的设计探索，深度参与负荷管理产品设计，并推动 PPT Skill 标准化、标书智能体等创新实践。同时，涉足动态视觉、宣传视频、产品推广及党建视觉等多元设计领域。',
    extraTags: [],
  },
  {
    title: '个人项目与持续进化',
    subtitle: '在网络世界保持上进心',
    description: '始终保持对设计、技术与新兴工具的探索热情，借助ai手段使用 React 结合 Three.js 开发 3D 互动个人网站，呈现不同于一般平面网页的用户体验。近期更开始深入探索 AI 智能体、设计自动化与 Skill 工作流，尝试将设计经验转化为可复用的智能化能力，探索人工智能与设计深度融合的更多可能性。',
    extraTags: [],
  },
  { title: '持续进化', subtitle: '在网络世界保持上进心', description: '探索人工智能与设计深度融合的更多可能性。', extraTags: [] },
];

// Word 仅提供中文正文，其余界面也共用这份正文，避免保留原作者经历。
const MILESTONES_BY_LANG: Record<string, typeof milestones> = Object.fromEntries(
  Object.keys(YEAR_LABELS).map((lang) => [lang, milestones]),
);
const MILESTONE_BEATS_BY_LANG: Record<string, string[][]> = {};

export { YEAR_LABELS, MILESTONE_STATIC, MILESTONES_BY_LANG, MILESTONE_BEATS_BY_LANG };
