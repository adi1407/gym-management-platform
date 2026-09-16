"use client";

import FlowingMenu from "@/components/FlowingMenu";
import { FLOWING_PROGRAMS } from "@/data/home";

export function FlowingMenuSection() {
  return (
    <section
      id="explore"
      className="relative border-y border-[var(--border)]"
      aria-labelledby="explore-heading"
    >
      <div className="border-b border-[var(--border)] bg-[var(--surface)] px-[var(--page-pad-x)] py-10 md:py-12">
        <div className="container-page">
          <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-[var(--gold)] uppercase">
            Train your way
          </p>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2
              id="explore-heading"
              className="max-w-2xl font-[family-name:var(--font-display)] text-[clamp(2.25rem,6vw,4rem)] leading-[0.92] tracking-wide text-white"
            >
              PICK A PATH.
              <br />
              <span className="text-[var(--gold)]">COMMIT TO IT.</span>
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--gray)] md:text-right">
              Hover each discipline to preview the floor. Tap through to see
              structure, focus, and how we coach it.
            </p>
          </div>
        </div>
      </div>

      <div className="relative h-[min(560px,80dvh)] w-full">
        <FlowingMenu
          items={FLOWING_PROGRAMS}
          speed={15}
          textColor="#ffffff"
          bgColor="#080808"
          marqueeBgColor="#F5F5F0"
          marqueeTextColor="#080808"
          borderColor="#292929"
        />
      </div>
    </section>
  );
}
