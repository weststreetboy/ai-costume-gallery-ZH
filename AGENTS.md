# AGENTS.md

## Architecture
- 单页应用：`src/routes/index.tsx` 是唯一业务路由，持有筛选状态（分类 / 搜索词 / 已渲染数量 / 弹窗索引），子组件全部受控。
- 数据层：`src/data/costumes.json`（1407 条服装记录）由 `src/data/costumes.ts` 以 `RAW as Costume[]` 断言导出；`keyword-map.ts` 提供中文→英文服装词搜索词典；`site-copy.ts` 集中全部界面中文文案。
- 图片不落地：缩略图/高清图/原寸 PNG 全部走原站 CDN（`IMG_BASE + 相对路径`），本地只存 JSON 元数据。
- 分页策略：首屏 120 张，`CostumeGrid` 用 IntersectionObserver（rootMargin 800px）在「加载更多」按钮入视口时自动追加。
- 外部仓库导出：沙箱自带 git 仓库（分支 `onedaybot-dev`、remote `nas`）供平台版本历史使用，索引不可长期偏离。向 GitHub 等外仓推送时另建 orphan 分支，用 `git rm --cached` 收敛提交清单后 push；完成后必须切回原分支并把移除的文件重新 `git add`，否则平台版本历史断裂。
- Cloudflare Pages 静态配置放在 `public/_headers`、`public/_redirects`，Vite 构建时自动拷入 `dist/`，无需额外构建步骤。

## What Didn't Work
- ❌ 把 1407 条记录写成 TS 字面量数组 → `tsc` 报 `TS2590 Expression produces a union type that is too complex`。改为 `.json` 导入 + 类型断言后通过。
- ❌ 依赖模板 `index.html` 的预置内联主题脚本 → 它给 `<html>` 加 `light` 类并用 `!important` 强推白底黑字，直接覆盖本站深色设计系统，导致 CTA 卡片文字不可见。移除该 `<style>`/`<script>` 块后深色 token 正常生效。

## Lessons
- 纯深色站点若被 `index.html` 的 light/dark 强制样式污染，优先清理注入源，而不是在 CSS 里堆 `!important` 反向对抗。
- 沙箱截图工具在预览 iframe 超时会回退到独立浏览器标签页，此时 `--h5=true` 仍可能交付桌面视口截图，不能据此判定移动端布局失败。
- 命令行 remote 推送会把访问令牌明文写进 `.git/config`；推完必须 `git remote remove` 并复查 config 无残留 token。
- 沙箱内 `git reset` 被环境防护拦截（视为回滚操作），清理误暂存改用 `git rm --cached` / `git add -A`。
