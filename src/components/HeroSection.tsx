import { CtaBlock } from "./CtaBlock";
import { InfoTabs } from "./InfoTabs";
import { SITE } from "@/data/site-copy";

/** 顶部：眉标 + 说明标签组 + 渐变大标题 + 副标题 + CTA 卡 */
export function HeroSection() {
  return (
    <header className="shell pt-6 pb-4.5 sm:pt-8.5">
      <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <p className="pt-4 text-xs tracking-[0.22em] text-gallery-ink-faint uppercase sm:pt-4.5">
          {SITE.eyebrow}
        </p>
        <InfoTabs />
      </div>

      <h1 className="mt-1.5 mb-1 text-[clamp(26px,3.4vw,40px)] leading-tight font-bold tracking-wide">
        <span className="text-gradient">{SITE.titleLead}</span>{" "}
        <span className="font-display">{SITE.titleTail}</span>
      </h1>

      <p className="m-0 max-w-[72ch] text-sm leading-relaxed text-gallery-ink-muted">
        {SITE.subtitle}
      </p>

      {/* 标题下的装饰光带，呼应原站渐变氛围 */}
      <div
        aria-hidden="true"
        className="animate-sheen pointer-events-none mt-4 h-px w-full bg-gradient-to-r from-transparent via-accent-periwinkle/45 to-transparent"
      />

      <CtaBlock />
    </header>
  );
}
