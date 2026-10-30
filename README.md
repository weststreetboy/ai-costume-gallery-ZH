# 衣装集 · 服装参考图库（中文版）

**不含人物的纯服装参考图库（2:3 竖版），界面与搜索全面中文化，基于 React 构建、可直接部署到 Cloudflare Pages 的响应式服装参考画廊。**

复刻自 [ai-costume-gallery.pages.dev](https://ai-costume-gallery.pages.dev)，原站界面为日文。本仓库完成了中文化、图片资产自持与可用的前端。

- **1,407 张** AI 生成的纯服装参考图（不含人物），2:3 竖版
- **8 个分类**：春 215 / 夏 254 / 秋 244 / 冬 253 / 内衣 199 / 派对 48 / 泳装 54 / 性感 140
- 分类筛选、ID 与中英文关键词搜索、懒加载网格、无限追加、大图预览（键盘 / 触屏滑动）、下载原尺寸 PNG
- 缩略图与高清图已自持为 WebP，构建后随站点发布

**原始站点**：https://ai-costume-gallery.pages.dev/ ｜ **原作者**：ギア（[@giaaibusi](https://x.com/giaaibusi)）

## 这是什么

原站是一套面向 AI 绘画 / 图像生成的服装参考图库，界面为日文。本仓库做了三件事：

- **全量自持** —— 1,407 张缩略图与 1,407 张高清图全部落地为 WebP，存放于 `public/assets/`，构建后随站点发布，不依赖外部图床即可完整浏览。
- **完整中文化** —— 界面文案、八个分类、使用提示与注意事项逐条译为中文；内置中→英服装词词典，输入中文关键词也能命中对应英文。
- **可用的前端** —— React 19 + Vite + TanStack Router 实现的响应式画廊，完整实现原站的分类筛选、关键词搜索、懒加载网格、大图预览与原图下载，并针对手机重新设计布局。

## 页面功能

- 八个分类页签 + 「全部」，每个页签实时显示该分类的图片数
- 吸顶工具栏：分类胶囊标签 + 搜索框 + 结果计数
- 按 **ID / 中文分类 / 英文关键词** 搜索，空格分隔的多词需同时命中；中文词经内置词典自动转英文（例：`白`→white、`连衣裙`→dress）
- 懒加载网格：每次渲染 120 张，滚动到底部或点击「加载更多」自动追加
- 单张卡片：2:3 缩略图 + 服装编号 + 分类 + 关键词
- 点击卡片打开大图灯箱：先显示缩略图占位、再加载高清图
- 灯箱支持下载原尺寸 PNG、上一张 / 下一张
- ← / → 切换上一张 / 下一张，Esc 关闭；手机支持左右滑动
- PC 自适应多列网格、手机双列网格
- 「使用提示」与「注意事项」面板，页脚标注图片来源与作者链接

## 数据规模

| 分类 | 张数 |
|---|---|
| 春 | 215 |
| 夏 | 254 |
| 秋 | 244 |
| 冬 | 253 |
| 内衣 | 199 |
| 派对 | 48 |
| 泳装 | 54 |
| 性感 | 140 |
| **合计** | **1,407** |

每条记录对应一张缩略图（WebP）与一张高清图（WebP）；原尺寸 PNG 未自持，下载时回源原站。

## 目录结构

```
.
├── index.html              # 单页应用入口
├── package.json            # 依赖与脚本
├── vite.config.ts          # Vite 构建配置（产物输出 dist/）
├── tsconfig.json
├── public/
│   ├── _headers            # Cloudflare Pages 缓存策略
│   ├── _redirects          # SPA 路由回退
│   └── assets/
│       ├── thumbs/         # 缩略图 1,407 张 WebP
│       └── img/            # 高清图 1,407 张 WebP
└── src/
    ├── components/         # HeroSection / FilterToolbar / CostumeGrid / CostumeModal / InfoTabs / CtaBlock
    ├── data/               # costumes.json（1,407 条）· costumes.ts · keyword-map.ts · site-copy.ts
    ├── lib/                # costume-search.ts（筛选与搜索）· reveal-engine.ts · utils.ts
    ├── routes/             # index.tsx（首页）· __root.tsx（根布局）
    └── styles.css          # 设计系统 token（oklch + @theme inline）
```

## 数据结构

`src/data/costumes.json` 为 1,407 条记录的数组，字段说明：

| 字段 | 说明 | 示例 |
|---|---|---|
| `id` | 服装编号（分类前缀 + 序号） | `SPR-0001` |
| `cat` | 中文分类（8 类之一） | `春` |
| `kw` | 英文关键词（空格分隔，用于展示与搜索） | `ivory frill knit denim ...` |
| `t` | 缩略图相对路径（WebP） | `thumbs/SPR-0001.webp` |
| `f` | 高清图相对路径（WebP） | `img/SPR-0001.webp` |
| `p` | 原尺寸 PNG 相对路径（回源原站） | `png/SPR-0001.png` |

分类编号前缀：春 `SPR` / 夏 `SUM` / 秋 `AUT` / 冬 `WIN` / 内衣 `LNG` / 派对 `PTY` / 泳装 `SWM` / 性感 `SXY`。

`src/data/keyword-map.ts` 为中文服装词 → 英文关键词的搜索词典，新增中文词后，搜索即可命中对应英文。

## 本地开发

需要 **Node 20**（建议用 `.nvmrc` 固定版本）与 **pnpm**。

```bash
pnpm install
pnpm run dev        # http://localhost:3015
pnpm run build      # 产物输出到 dist/
pnpm run typecheck
```

## 部署到 Cloudflare Pages

项目为纯静态 SPA（Vite 构建），可直接部署到 Cloudflare Pages，无需额外服务端。

### 方式一：GitHub 自动部署（推荐）

1. Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git**，选择本仓库。
2. 生产分支 `main`，Build settings 照抄：

| 配置项 | 值 |
|---|---|
| Framework preset | `None` |
| Install command | `pnpm install` |
| Build command | `pnpm run build` |
| Build output directory | `dist` |

3. Node 版本若构建报错，加环境变量 `NODE_VERSION = 20`。
4. Save and Deploy，约 2–5 分钟得到 `https://<project>.pages.dev`；此后每次 push 自动重新部署。

> ⚠️ 若 `.npmrc` 将 registry 指向国内镜像（`registry.npmmirror.com`），而 Cloudflare 构建机在海外，`pnpm install` 可能偏慢或报网络错误——此时删除 `.npmrc` 回退官方源即可。

### 方式二：命令行直传

```bash
pnpm install
pnpm run build
npx wrangler pages deploy dist --project-name <project>
```

### 路由与缓存

- `public/_redirects` 提供 SPA 回退：`/*  /index.html  200`，任意深链都回落到首页，由客户端路由接管。
- `public/_headers` 已为 `assets/*` 设置一年期强缓存（`immutable`），图片不会重复回源。

## 重要说明

- **图片资产**：缩略图与高清图已自持为 WebP（`public/assets/`）；灯箱中的「下载原尺寸 PNG」仍指向原站（基址 `ORIGIN_BASE`，见 `src/data/costumes.ts`）。原站下线只会影响原图下载，不影响页面浏览。
- **外链沿用原站**：社群按钮与作者主页指向原作者渠道，改 `src/data/site-copy.ts` 的 `SITE` 即可换成你自己的。
- **授权条款**：图片素材版权归原站作者所有，「注意事项」面板中的免责与使用限制同样适用，商用前请自行确认。本项目代码部分仅作学习参考。

## 内容提示

图库包含泳装、内衣、性感等成人向服饰分类，仅供 AI 绘画、图像参考与前端技术学习使用。请勿用于违法用途，未成年人请勿访问。

## 版权与致谢

- 图片与原始数据的著作权归原作者 **ギア（@giaaibusi）** 所有，原始站点见页首。
- 本仓库仅为个人学习、汉化与静态站点实践存档，不对图片主张任何权利，也不构成对原作品的商业使用授权。
- 若原作者认为本仓库侵犯其权益，请通过 Issue 联系，将立即删除相关内容。
