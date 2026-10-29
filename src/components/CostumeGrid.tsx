import { useEffect, useRef } from "react";
import { thumbUrl, type Costume } from "@/data/costumes";
import { UI } from "@/data/site-copy";
import { formatCount, prettyKeywords } from "@/lib/costume-search";

interface CostumeGridProps {
  /** 当前筛选结果（完整） */
  view: Costume[];
  /** 已渲染数量 */
  rendered: number;
  onOpen: (index: number) => void;
  onLoadMore: () => void;
}

/** 单张卡片：2:3 缩略图 + ID / 分类 + 关键词；紧耦合内联在网格文件内 */
function CostumeCard({
  d,
  index,
  onOpen,
}: {
  d: Costume;
  index: number;
  onOpen: (i: number) => void;
}) {
  return (
    <article
      tabIndex={0}
      data-i={index}
      onClick={() => onOpen(index)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onOpen(index);
      }}
      className="group cursor-pointer overflow-hidden rounded-(--radius-card) border border-gallery-line bg-gallery-panel outline-none transition-[transform,box-shadow,border-color] duration-(--dur-base) ease-(--ease-out) hover:-translate-y-1 hover:border-accent-blue/45 hover:shadow-(--shadow-card) focus-visible:-translate-y-1 focus-visible:shadow-(--shadow-card)"
    >
      <div className="relative aspect-2/3 overflow-hidden bg-matte">
        <img
          src={thumbUrl(d)}
          alt={d.id}
          loading="lazy"
          decoding="async"
          className="block size-full object-contain transition-opacity duration-200"
        />
      </div>

      <div className="px-3.5 pt-3 pb-3.5">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono text-xs text-gallery-ink-muted">{d.id}</span>
          <span className="text-xs text-gallery-ink-faint">{d.cat}</span>
        </div>
        <p className="clamp-desc mt-1.5 text-[13px] leading-relaxed text-gallery-ink-muted group-hover:text-gallery-ink sm:text-xs sm:line-clamp-2">
          {prettyKeywords(d.kw)}
        </p>
      </div>
    </article>
  );
}

/** 网格 + 空状态 + 「加载更多」（进入视口自动追加） */
export function CostumeGrid({ view, rendered, onOpen, onLoadMore }: CostumeGridProps) {
  const moreRef = useRef<HTMLButtonElement>(null);
  const hasMore = view.length > rendered;

  useEffect(() => {
    const el = moreRef.current;
    if (!el || !hasMore || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) onLoadMore();
      },
      { rootMargin: "800px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, rendered, view, onLoadMore]);

  if (view.length === 0) {
    return (
      <div className="col-span-full py-20 text-center">
        <b className="mb-1.5 block text-lg text-gallery-ink-muted">{UI.emptyTitle}</b>
        <span className="text-sm text-gallery-ink-faint">{UI.emptyHint}</span>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-2.5 md:gap-4 lg:grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
        {view.slice(0, rendered).map((d, i) => (
          <CostumeCard key={d.id} d={d} index={i} onOpen={onOpen} />
        ))}
      </div>

      {hasMore && (
        <button
          ref={moreRef}
          type="button"
          onClick={onLoadMore}
          className="mx-auto mt-6.5 flex min-h-13 w-full max-w-[280px] cursor-pointer items-center justify-center rounded-(--radius-field) border border-gallery-line-strong bg-gallery-panel px-7 text-base font-bold text-gallery-ink transition-colors duration-(--dur-fast) hover:border-gallery-line-strong hover:bg-gallery-bg-soft"
        >
          {UI.loadMore(formatCount(view.length - rendered))}
        </button>
      )}
    </>
  );
}
