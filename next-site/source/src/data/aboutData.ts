// 内容按用户最新提供的技能截图更新，沿用原稿技能列表与三条工作记录的样式。
export const SKILL_LABELS: Record<string, string> = {
  frontend: '界面设计',
  backend: '产品设计',
  mobile: '业务场景',
  devops: '设计体系',
  design: '视觉表达',
  data: '项目实践',
  network: '团队协作',
  productivity: '多维视觉',
  ai: 'AI 应用',
  workflow: '智能工作流',
  teaching: '技术探索',
};

export const SKILL_GROUPS = [
  { key: 'frontend', items: ['Web UI', '移动端设计', '高保真原型', '交互设计', '设计走查'] },
  { key: 'backend', items: ['需求分析', '产品规划', 'UI/UX', '业务流程梳理', '用户体验优化'] },
  { key: 'mobile', items: ['能源数字化', '负荷管理', '数据可视化', '智能化业务应用'] },
  { key: 'devops', items: ['设计规范', '组件体系', '设计资产沉淀', '标准化交付'] },
  { key: 'design', items: ['Figma', 'Photoshop', 'Illustrator', '信息可视化', '视觉创意'] },
  { key: 'data', items: ['负荷一张图 0-1', '负荷管理产品', '数据大屏', '产品宣传'] },
  { key: 'network', items: ['需求沟通', '跨部门协作', '设计评审', '开发对接', '成果交付'] },
  { key: 'productivity', items: ['PPT 视觉设计', '动态视觉', '宣传视频', '品牌及党建视觉'] },
  { key: 'ai', items: ['AI Agent', 'Prompt Engineering', '多模态生成', 'AI 辅助设计'] },
  { key: 'workflow', items: ['PPT Skill', 'Skill 构建', '工作流自动化', '标书智能体探索'] },
  { key: 'teaching', items: ['HTML/CSS', 'JavaScript', 'React', 'Three.js', '3D 交互'] },
];

export const WORK_PERIODS = ['2019.06 — Now', '2016.08 — 2019.07', '2016'];

const work = [
  { title: '南京文思海辉信息技术有限公司', role: '数字化产品设计与多维视觉表达' },
  { title: '江苏千米网络科技股份有限公司', role: '小店POS端及SaaS平台界面设计' },
  { title: '北京智鸟科技有限公司', role: '移动端UI视觉设计' },
];

export const WORK_BY_LANG: Record<string, typeof work> = Object.fromEntries(
  ['zh-TW', 'zh-CN', 'en', 'ja', 'ko'].map((lang) => [lang, work]),
);
