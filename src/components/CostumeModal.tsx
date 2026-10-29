import { useEffect, useRef, useState } from "react";
import { thumbUrl, fullUrl, pngUrl, type Costume } from "@/data/costumes";
import { UI } from "@/data/site-copy";
import { prettyKeywords } from "@/lib/costume-search";

interface CostumeModalProps {
  view: Costume[];
  index: number;
  onClose: () => void;
  onStep: (delta: number) => void;
}

/**
 * 大图预览：先显示缩略图占位，高清图加载完成后替换。
 * 支持 Esc 关闭、← → 切换、移动端左右滑动、下载原尺寸 PNG。
 */
export function CostumeModal({ view, index, onClose, onStep }: CostumeModalProps) {
  const current = view[index];
  const [src, setSrc] = useState<string | null>(null);
  const touchX = useRef<number | null>(null);

  // 切张时先用缩略图占位，高清图就绪后替换（沿用原站渐进策略）
  useEffect(() => {
    if (!current) return;
    setSrc(thumbUrl(current));
    const probe = new Image();
    probe.onload = () => setSrc(fullUrl(current));
    probe.src = fullUrl(current);
  }, [current]);

  // 锁定页面滚动
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onStep(1);
      else if (e.key === "ArrowLeft") onStep(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onStep]);

  if (!current) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={UI.modalLabel}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 backdrop-blur-[6px]"
    >
      <button
        type="button"
        aria-label={UI.close}
        onClick={onClose}
        className="absolute top-3 right-3 z-10 grid size-12 cursor-pointer place-items-center rounded-full border border-gallery-line-strong bg-gallery-bg-soft/85 text-xl leading-none text-gallery-ink transition-colors duration-(--dur-fast) hover:border-accent-blue"
      >
        ×
      </button>

      <div className="animate-modal-pop grid max-h-full w-full min-w-0 grid-cols-1 gap-4 overflow-auto rounded-(--radius-modal) border border-gallery-line bg-gallery-bg-soft p-3 shadow-(--shadow-float) md:grid-cols-[minmax(0,1fr)_300px] md:p-4 lg:mx-auto lg:max-w-[1200px]">
        <div
          className="relative flex h-[58vh] items-center justify-center overflow-hidden rounded-(--radius-field) bg-matte-deep md:h-[min(78vh,900px)]"
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) onStep(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          {src && (
            <img
              src={src}
              alt={current.id}
              className="max-size-full max-h-full max-w-full object-contain"
            />
          )}

          <button
            type="button"
            aria-label={UI.prev}
            disabled={index <= 0}
            onClick={() => onStep(-1)}
            className="absolute top-1/2 left-2.5 grid size-14 -translate-y-1/2 place-items-center rounded-full border-0 bg-accent-deep/70 text-2xl text-white transition-opacity duration-(--dur-fast) disabled:cursor-default disabled:opacity-25"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label={UI.next}
            disabled={index >= view.length - 1}
            onClick={() => onStep(1)}
            className="absolute top-1/2 right-2.5 grid size-14 -translate-y-1/2 place-items-center rounded-full border-0 bg-accent-deep/70 text-2xl text-white transition-opacity duration-(--dur-fast) disabled:cursor-default disabled:opacity-25"
          >
            ›
          </button>
        </div>

        <div className="flex min-w-0 flex-col gap-3">
          <div>
            <h2 className="m-0 text-xl leading-snug break-all font-display">{current.id}</h2>
            <p className="mt-1 text-xs tracking-wide text-gallery-ink-faint">
              {UI.categoryLabel}：{current.cat}
            </p>
          </div>

          <a
            href={pngUrl(current)}
            download={`${current.id}.png`}
            className="bg-gradient-accent inline-flex min-h-13 items-center justify-center gap-2 rounded-(--radius-field) px-5 text-base font-bold text-accent-deep no-underline shadow-[var(--glow-accent)] transition-transform duration-(--dur-base) ease-(--ease-out) hover:-translate-y-0.5 active:scale-[0.985]"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              aria-hidden="true"
            >
              <path d="M12 3v12" />
              <path d="m6 11 6 6 6-6" />
              <path d="M4 21h16" />
            </svg>
            {UI.download}
          </a>

          <div className="min-h-0 flex-1 overflow-y-auto">
            <p className="mb-1 text-xs tracking-wider text-gallery-ink-faint">{UI.keywordsLabel}</p>
            <p className="m-0 max-h-[40vh] overflow-auto text-[15px] leading-[1.7] break-words text-gallery-ink">
              {prettyKeywords(current.kw)}
            </p>
          </div>

          <p className="hidden text-xs text-gallery-ink-faint md:block">
            <kbd className="rounded border border-gallery-line-strong bg-gallery-panel px-1.5 py-0.5 font-mono">←</kbd>{" "}
            <kbd className="rounded border border-gallery-line-strong bg-gallery-panel px-1.5 py-0.5 font-mono">→</kbd>{" "}
            {UI.keysHintPrev}　
            <kbd className="rounded border border-gallery-line-strong bg-gallery-panel px-1.5 py-0.5 font-mono">Esc</kbd>{" "}
            {UI.keysHintClose}
          </p>
        </div>
      </div>
    </div>
  );
}
