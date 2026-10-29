import { cn } from "@/lib/utils";
import { SITE } from "@/data/site-copy";

interface CtaBlockProps {
  /** compact：页脚小尺寸复述版 */
  variant?: "default" | "compact";
}

/** 头部与页脚共用的「加入社群 + 作者署名」引导卡 */
export function CtaBlock({ variant = "default" }: CtaBlockProps) {
  const compact = variant === "compact";

  return (
    <div
      className={cn(
        "relative rounded-[20px] border transition-shadow duration-(--dur-base)",
        compact
          ? "mx-auto mt-10 max-w-[640px] border-white/8 bg-gallery-panel/55 p-4 text-center"
          : "mt-5 max-w-[760px] border-accent-periwinkle/16 bg-gradient-to-br from-accent-blue/10 via-accent-lilac/8 to-white/2 p-5 shadow-(--shadow-card)",
      )}
    >
      <p
        className={cn(
          "mb-3.5 leading-[1.55] font-bold tracking-wide",
          compact
            ? "text-[13px] font-semibold text-gallery-ink-muted"
            : "text-[clamp(15px,1.6vw,18px)] text-gallery-ink",
        )}
      >
        {SITE.ctaLead}
      </p>

      <div
        className={cn(
          "flex flex-wrap items-center gap-3",
          compact && "justify-center",
        )}
      >
        <a
          href={SITE.joinHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "bg-gradient-accent relative inline-flex items-center justify-center gap-2 rounded-[16px] font-extrabold tracking-[0.06em] text-accent-deep no-underline transition-transform duration-(--dur-base) ease-(--ease-out)",
            "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:bg-gradient-to-b after:from-white/28 after:to-transparent",
            compact
              ? "min-h-13 px-6.5 text-base"
              : "min-h-14 px-8.5 text-[17px] shadow-[var(--glow-accent),inset_0_2px_0_rgb(255_255_255_/_0.35)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985]",
          )}
        >
          {SITE.ctaJoin}
        </a>

        <a
          href={SITE.authorHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-(--radius-pill) border border-white/16 bg-white/4 font-semibold text-gallery-ink no-underline transition-all duration-(--dur-base) ease-(--ease-out) hover:-translate-y-px hover:border-accent-periwinkle/45 hover:bg-white/8 active:scale-[0.98]",
            compact ? "min-h-13 px-6 text-base" : "min-h-13 pl-4.5 pr-5.5 text-base",
          )}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4.5 shrink-0 opacity-90 fill-current">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          {SITE.ctaAuthor}
        </a>
      </div>
    </div>
  );
}
