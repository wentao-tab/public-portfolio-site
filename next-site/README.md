# 新版个站 · 2026-11-06

- 线上域名：https://hiwentao.com/
- 默认入口：https://hiwentao.com/zh-cn/watch
- `source/`：本次迁移的 React / TanStack 源码，来自本地 koimsurai-replica 的当前工作副本，含已修改但未提交的个人内容。原本地项目保持不变。
- `published/`：可直接部署的公开静态页面和资源，共 72 个路由。公开 GET 数据由 `public-data.json` 封存，页面保留动画、导航、阅读与收藏交互。
- 公开版本没有 Rust 服务和 SQLite 写入服务；登录、后台、留言提交、点赞写入及第三方账号实时同步未上线。写入请求明确返回只读错误，不伪造成功。
- 84 张封面/图片与 32 份完整字体及 4 份首屏字体随站发布。外部 Spotify 播放链接仍需要联网。
- 基于开源项目 [timo9378/sora-to-ki](https://github.com/timo9378/sora-to-ki)，新版对应源码与授权文件可通过页面「网站源码」入口访问，保留 AGPL-3.0 许可。

## 发布已导出的内容

在仓库根目录运行 `npm run build`。检查通过后推送 `main`，GitHub Actions 组装 `published/` 与 `legacy115/` 并部署 GitHub Pages；不在 CI 启动本地服务。

## 更新新版源码或数据

1. 修改 `source/src/` 与个人数据；不要修改仓库根目录的旧版 `src/`。
2. Node 26 环境，在 `source/` 安装锁定依赖。构建命令：`node scripts/build-local-preview.mjs`。
3. 原本地服务提供公开数据（默认 `127.0.0.1:13998`）。在根目录运行 `node scripts/export-next-site.mjs --prepare` 更新只读数据、缓存图片和静态字体，在 `source/` 运行 `node_modules/.bin/tsx --tsconfig tsconfig.json scripts/prepare-public-data.ts` 预编译文章后，再构建前端。
4. 以 `HOST=127.0.0.1 PORT=14001 BACKEND_URL=http://127.0.0.1:13998 node .output/server/index.mjs` 启动待导出的前端（在 `source/` 目录）。
5. 在根目录运行 `node scripts/export-next-site.mjs`，再运行 `npm run build`。浏览器检查核心页面后提交、推送，并等待本次部署成功和线上验证。

导出脚本只读取明确列出的公开接口，不复制本地数据库、管理员账号、密钥、Cookie 或运行配置。字体源文件可通过 `EXPORT_FONT_DIR` 指定；默认使用相邻 koimsurai-replica 的字体缓存。

## 旧版封存

- 名称：**个站旧版115**。
- 在线入口：`/个站旧版115/`，进入 `/archive/115/`。
- `legacy115/` 保存替换前的 56 个页面及资源，站内根路径已调整到归档目录。该目录为冻结快照，不继续维护内容。
- 源码标签：`个站旧版115`，提交 `7137cba7e926bdd7255c01cbb2652cdb94aca1e9`。
- 本机另存完整网页 ZIP、源码历史 bundle 和说明：项目上级目录的 `个站旧版115/`。

## 2026-11-06 发布内容

- 同步最新个人介绍、书单、作品与碎念。
- 更多菜单仅保留照片和此站点，改为两列排列；朋友页面与日、韩语路由不再导出，仅提供繁体中文、简体中文和英文。

## 导航与加载修复

- 文章同时发布数字 ID 兼容入口和 canonical slug 页面；静态 API 支持 slug 与评论子资源解析。
- 服务端 MDX/Mermaid 结果随公开数据提供，客户端导航不调用缺失的 RPC。
- 数据脚本改为 defer，转场直接随应用挂载；保留原有动画参数与菜单样式。
- 字体从实际公开文案裁字；首屏/收藏字集在主样式表注册，后续文章按需补载完整字体。导出脚本自动更新字集。
- 恢复个人“正在看”快照《蜡笔小新第二部》。
