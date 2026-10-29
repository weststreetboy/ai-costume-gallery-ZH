import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { CATEGORIES, CATEGORY_COUNTS, TOTAL } from "@/data/costumes";
import { UI } from "@/data/site-copy";
import { formatCount } from "@/lib/costume-search";

interface FilterToolbarProps {
  cat: string;
  query: string;
  shown: number;
  onCatChange: (cat: string) => void;
  onQueryChange: (query: string) => void;
}

const TABS = [
  { value: "", label: UI.allTab, count: TOTAL },
  ...CATEGORIES.map((c) => ({ value: c, label: c, count: CATEGORY_COUNTS[c] })),
];

/** 吸顶工具栏：分类胶囊标签 + 搜索框 + 结果计数 */
export function FilterToolbar({ cat, query, shown, onCatChange, onQueryChange }: FilterToolbarProps) {
  const [local, setLocal] = useState(query);
  const timerRef = useRef<number | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // 外部清空（如切换分类）时同步
  useEffect(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
  }, [query]);

  const onInput = (value: string) => {
    setLocal(value);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => onQueryChange(value.trim().toLowerCase()), 150);
  };

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    [],
  );

  return (
    <div
      ref={barRef}
      id="filter-toolbar"
      className="sticky top-0 z-20 border-b border-gallery-line bg-gallery-bg/82 backdrop-blur-[14px]"
    >
      <div className="shell py-2.5">
        <div
          role="tablist"
          aria-label={UI.tabsAria}
          className="no-scrollbar flex gap-2 overflow-x-auto pb-0.5"
        >
          {TABS.map((t) => {
            const selected = cat === t.value;
            return (
              <button
                key={t.value || "all"}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => onCatChange(t.value)}
                className={cn(
                  "inline-flex h-13 shrink-0 cursor-pointer items-center rounded-(--radius-pill) border px-5 text-base font-bold whitespace-nowrap transition-all duration-(--dur-fast)",
                  selected
                    ? "border-gallery-ink bg-gallery-ink text-accent-deep"
                    : "border-gallery-line-strong bg-gallery-panel text-gallery-ink hover:border-accent-blue/60",
                )}
              >
                {t.label}
                <em
                  className={cn(
                    "tabular ml-2 text-sm font-semibold not-italic",
                    selected ? "text-accent-deep/70" : "text-gallery-ink-faint",
                  )}
                >
                  {formatCount(t.count)}{UI.unit}
                </em>
              </button>
            );
          })}
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-2">
          <label className="relative flex flex-1 basis-60 min-w-0 sm:basis-60">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 opacity-50"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="search"
              aria-label={UI.searchLabel}
              placeholder={UI.searchPlaceholder}
              autoComplete="off"
              value={local}
              onChange={(e) => onInput(e.target.value)}
              className="h-13 w-full rounded-(--radius-field) border border-gallery-line-strong bg-gallery-panel py-0 pr-3.5 pl-10 text-base text-gallery-ink outline-none transition-colors duration-(--dur-fast) placeholder:text-gallery-ink-faint focus:border-accent-blue"
            />
          </label>
          <span className="tabular ml-auto shrink-0 text-sm whitespace-nowrap text-gallery-ink-muted sm:text-sm">
            {formatCount(shown)}
          </span>
        </div>
      </div>
    </div>
  );
}
