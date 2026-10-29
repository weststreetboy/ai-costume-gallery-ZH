/** 全站中文文案（复刻自原站，日文界面语已逐条翻译） */

export const SITE = {
  docTitle: "衣装集 · 服装参考图库 COSTUME-DB-01",
  eyebrow: "COSTUME-DB-01 · 图像参考用服装集",
  titleLead: "衣装集",
  titleTail: "数据库",
  subtitle:
    "不含人物的纯服装图（2:3）。可按春·夏·秋·冬·内衣·派对·泳装·性感八个分类浏览。",
  ctaLead: "衣装集的高效用法（含无限制 AI 的使用方式）在社群公开分享",
  ctaJoin: "加入开放社群",
  ctaAuthor: "作者 · ギア",
  joinHref: "https://x.gd/9BOJA",
  authorHref: "https://x.com/giaaibusi",
} as const;

export const INFO_PANELS = [
  {
    key: "usage",
    label: "使用提示",
    heading: "使用提示",
    items: [
      "作为参考图导入各类 AI 工具的服装参考、图像参考功能。",
      "用分类按钮筛选，在搜索框里查 ID 或服装词（例：denim、lace、白）。",
      "下载原尺寸 PNG 后使用，能看清每一处细节。",
      "图中没有人物，只有衣服本身。脸型、身材、背景请另用参考图或提示词补充。",
    ],
  },
  {
    key: "notice",
    label: "注意事项",
    heading: "注意事项",
    items: [
      "可免费使用（作品创作中的商用、修改、参考均允许）。",
      "禁止再次分发、转载、售卖图像数据本身（含原尺寸与二次加工后的文件）。",
      "无需署名（自愿标注）。图片元数据已清除，请知悉其为无保证的免费素材。",
      "全部为 AI 生成的虚构服装，不是真实商品照片。",
      "所有服装图均由文生图（t2i）方式制作，未使用任何真实商品图。",
      "发布前做过与现有品牌的相似度检查，但不保证不侵犯第三方权利。",
      "请在使用者自身判断下使用，本方不对因使用产生的问题承担责任。",
      "请勿用于表现真实人物或未成年人，或违反公序良俗的用途。",
    ],
  },
] as const;

export const UI = {
  allTab: "全部",
  unit: "张",
  searchPlaceholder: "搜索 ID 或服装词　例：denim、白",
  searchLabel: "搜索",
  countShown: (n: string) => `显示 ${n} 张`,
  loadMore: (n: string) => `加载更多（剩余 ${n} 张）`,
  emptyTitle: "没有符合条件的图片",
  emptyHint: "试试更换分类，或换几个搜索关键词。",
  close: "关闭",
  prev: "上一套",
  next: "下一套",
  download: "下载原尺寸 PNG",
  modalLabel: "大图预览",
  keysHintPrev: "切换上下一个",
  keysHintClose: "关闭",
  categoryLabel: "分类",
  keywordsLabel: "关键词",
  tabsAria: "分类筛选",
} as const;
