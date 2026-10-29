// 衣装集 · 服装参考图库（复刻 ai-costume-gallery.pages.dev，界面中文化）
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { COSTUMES } from "@/data/costumes";
import { SITE, UI } from "@/data/site-copy";
import { filterCostumes, formatCount } from "@/lib/costume-search";
import { HeroSection } from "@/components/HeroSection";
import { FilterToolbar } from "@/components/FilterToolbar";
import { CostumeGrid } from "@/components/CostumeGrid";
import { CostumeModal } from "@/components/CostumeModal";
import { CtaBlock } from "@/components/CtaBlock";

/** 一次渲染的张数（1407 张不一次铺开） */
const PAGE = 120;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SITE.docTitle },
      { name: "description", content: SITE.subtitle },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [cat, setCat] = useState("");
  const [q, setQ] = useState("");
  const [rendered, setRendered] = useState(PAGE);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const view = useMemo(() => filterCostumes(COSTUMES, { cat, q }), [cat, q]);

  // 筛选变化后重置分页
  useEffect(() => {
    setRendered(PAGE);
  }, [cat, q]);

  useEffect(() => {
    document.title = SITE.docTitle;
  }, []);

  const loadMore = useCallback(() => {
    setRendered((n) => Math.min(n + PAGE, view.length));
  }, [view.length]);

  const onCatChange = (next: string) => {
    setCat(next);
    // 回到工具栏位置，避免停留在长列表深处
    const top = Math.min(window.scrollY, cardRef.current?.offsetTop ?? 0);
    window.scrollTo({ top });
  };

  const step = useCallback(
    (delta: number) => {
      setModalIndex((cur) => {
        if (cur === null) return cur;
        const next = cur + delta;
        if (next < 0 || next >= view.length) return cur;
        // 翻到尚未渲染的序号时自动追加一页
        setRendered((n) => (next >= n ? Math.min(next + PAGE, view.length) : n));
        return next;
      });
    },
    [view.length],
  );

  return (
    <div className="min-h-screen">
      <HeroSection />

      <FilterToolbar
        cat={cat}
        query={q}
        shown={view.length}
        onCatChange={onCatChange}
        onQueryChange={setQ}
      />

      <main ref={cardRef} className="shell pt-5.5 pb-15">
        <p className="sr-only" aria-live="polite">
          {UI.countShown(formatCount(view.length))}
        </p>
        <CostumeGrid
          view={view}
          rendered={rendered}
          onOpen={setModalIndex}
          onLoadMore={loadMore}
        />
      </main>

      <footer className="shell pb-12">
        <CtaBlock variant="compact" />
      </footer>

      {modalIndex !== null && (
        <CostumeModal
          view={view}
          index={modalIndex}
          onClose={() => setModalIndex(null)}
          onStep={step}
        />
      )}
    </div>
  );
}
