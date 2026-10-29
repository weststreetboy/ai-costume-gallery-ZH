import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { INFO_PANELS, UI } from "@/data/site-copy";

/**
 * 右上角「使用提示 / 注意事项」标签组。
 * 再点同一按钮、点 ×、按 Esc、点外部均可关闭；窄屏时面板贴到按钮下方。
 */
export function InfoTabs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const swallowRef = useRef(false);

  const close = useCallback((focusBack: boolean) => {
    setOpenIndex((cur) => {
      if (cur === null) return cur;
      if (focusBack) tabRefs.current[cur]?.focus();
      return null;
    });
  }, []);

  // 点击外部：先关闭，并吞掉这一次 click，避免误触下层卡片
  useEffect(() => {
    if (openIndex === null) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) {
        setOpenIndex(null);
        swallowRef.current = true;
        window.setTimeout(() => {
          swallowRef.current = false;
        }, 600);
      }
    };
    const onClickCapture = (e: MouseEvent) => {
      if (swallowRef.current) {
        swallowRef.current = false;
        e.preventDefault();
        e.stopPropagation();
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setOpenIndex((cur) => {
          if (cur !== null) tabRefs.current[cur]?.focus();
          return null;
        });
      }
    };
    const onScroll = () => {
      if (window.innerWidth <= 560) setOpenIndex(null);
    };
    const onResize = () => setOpenIndex(null);

    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("click", onClickCapture, true);
    document.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("click", onClickCapture, true);
      document.removeEventListener("keydown", onKeyDown, true);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [openIndex]);

  // 打开后聚焦面板，便于键盘阅读
  useEffect(() => {
    if (openIndex !== null) panelRefs.current[openIndex]?.focus({ preventScroll: true });
  }, [openIndex]);

  const onTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const step = e.key === "ArrowRight" ? 1 : INFO_PANELS.length - 1;
    const next = (index + step) % INFO_PANELS.length;
    tabRefs.current[next]?.focus();
    if (openIndex !== null) setOpenIndex(next);
  };

  return (
    <div
      ref={navRef}
      className="relative flex flex-wrap gap-1.5 rounded-[var(--radius-field)] border border-gallery-line-strong bg-gallery-panel/70 p-1 backdrop-blur-sm md:ml-auto"
    >
      {INFO_PANELS.map((panel, i) => {
        const expanded = openIndex === i;
        return (
          <div key={panel.key} className="contents">
            <button
              type="button"
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              aria-haspopup="dialog"
              aria-expanded={expanded}
              aria-controls={`info-panel-${panel.key}`}
              onClick={() => setOpenIndex(expanded ? null : i)}
              onKeyDown={(e) => onTabKeyDown(e, i)}
              className={cn(
                "min-h-13 cursor-pointer rounded-[10px] border-0 px-5 text-base font-bold tracking-wide whitespace-nowrap transition-colors duration-(--dur-fast)",
                expanded
                  ? "bg-gallery-ink text-accent-deep"
                  : "bg-transparent text-gallery-ink hover:bg-gallery-bg-soft",
              )}
            >
              {panel.label}
            </button>

            {expanded && (
              <div
                id={`info-panel-${panel.key}`}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                role="dialog"
                aria-labelledby={`info-title-${panel.key}`}
                tabIndex={-1}
                className={cn(
                  "animate-panel-drop z-30 max-h-[min(70vh,560px)] overflow-y-auto rounded-(--radius-card) border border-gallery-line-strong bg-gallery-panel p-4 shadow-(--shadow-float) outline-none sm:p-5",
                  "fixed inset-x-4 bottom-4 w-auto sm:absolute sm:inset-x-auto sm:bottom-auto sm:right-0 sm:top-full sm:mt-2 sm:w-[min(460px,calc(100vw-32px))]",
                )}
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <h2
                    id={`info-title-${panel.key}`}
                    className="m-0 text-[17px] tracking-wide text-gallery-ink"
                  >
                    {panel.heading}
                  </h2>
                  <button
                    type="button"
                    aria-label={UI.close}
                    onClick={() => close(true)}
                    className="grid size-12 shrink-0 place-items-center rounded-full border border-gallery-line-strong bg-gallery-bg-soft text-xl leading-none text-gallery-ink transition-colors duration-(--dur-fast) hover:border-accent-blue"
                  >
                    ×
                  </button>
                </div>
                <ul className="m-0 list-disc space-y-0.5 pl-5 text-[15px] leading-[1.85] text-gallery-ink-muted marker:text-accent-lilac">
                  {panel.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
