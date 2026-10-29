// 衣装集数据（复刻自 ai-costume-gallery.pages.dev，字段名与分类已中文化）
// 缩略图/高清图已自持到 public/assets/{thumbs,img}；原寸 PNG 仍指向原站
// 数据体量较大，单独存为 costumes.json 由 TS 侧断言类型，避免超长字面量数组的类型推导开销
import RAW from './costumes.json';

/** 本站自有图片目录（Vite public 资源，构建后位于产物根目录 assets/） */
export const LOCAL_ASSET_BASE = '/assets/';

/** 原寸 PNG 未自持，仍从原作者站点获取 */
export const ORIGIN_BASE = 'https://ai-costume-gallery.pages.dev/';

/** @deprecated 保留供外部引用语义：缩略图与高清图走本地 */
export const IMG_BASE = LOCAL_ASSET_BASE;

/** 缩略图 URL */
export function thumbUrl(c: { t: string }): string {
  return LOCAL_ASSET_BASE + c.t;
}

/** 高清图 URL */
export function fullUrl(c: { f: string }): string {
  return LOCAL_ASSET_BASE + c.f;
}

/** 原尺寸 PNG URL（仍指向原站） */
export function pngUrl(c: { p: string }): string {
  return ORIGIN_BASE + c.p;
}

export type Category = '春' | '夏' | '秋' | '冬' | '内衣' | '派对' | '泳装' | '性感';

export interface Costume {
  /** 服装编号，如 SPR-0001 */
  id: string;
  /** 中文分类名 */
  cat: Category;
  /** 英文关键词（空格分隔），用于展示与搜索 */
  kw: string;
  /** 缩略图相对路径 */
  t: string;
  /** 高清图相对路径 */
  f: string;
  /** 原尺寸 PNG 相对路径 */
  p: string;
}

export const CATEGORIES: Category[] = ["春","夏","秋","冬","内衣","派对","泳装","性感"];

export const CATEGORY_COUNTS: Record<Category, number> = {"春":215,"夏":254,"秋":244,"冬":253,"内衣":199,"派对":48,"泳装":54,"性感":140};

export const COSTUMES = RAW as Costume[];

export const TOTAL = COSTUMES.length;
