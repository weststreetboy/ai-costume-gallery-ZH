import { KEYWORD_MAP } from "@/data/keyword-map";
import type { Costume } from "@/data/costumes";

export interface FilterState {
  /** 空字符串表示「全部」 */
  cat: string;
  /** 已 trim + 小写的搜索词 */
  q: string;
}

/** 千分位数字，中文单位「张」 */
export function formatCount(n: number): string {
  return n.toLocaleString("zh-CN");
}

/** 关键词展示：空格分隔 → 「·」连接 */
export function prettyKeywords(kw: string): string {
  return kw.split(" ").filter(Boolean).join(" · ");
}

/**
 * 单条匹配：多词（空格分隔）需同时命中。
 * 命中范围 = ID / 中文分类名 / 关键词前缀（中文词先查词典转英文）。
 */
export function matchesCostume(d: Costume, state: FilterState): boolean {
  if (state.cat && d.cat !== state.cat) return false;
  if (!state.q) return true;

  const id = d.id.toLowerCase();
  const tokens = d.kw.split(" ");

  return state.q.split(/\s+/).every((word) => {
    const en = KEYWORD_MAP[word] ?? word;
    return (
      id.includes(word) ||
      d.cat.includes(word) ||
      tokens.some((t) => t.startsWith(en))
    );
  });
}

export function filterCostumes(all: Costume[], state: FilterState): Costume[] {
  if (!state.cat && !state.q) return all;
  return all.filter((d) => matchesCostume(d, state));
}
