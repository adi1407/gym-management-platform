"use client";

import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { TRAINER_TOOLTIPS, TRUST_STATS } from "@/data/home";

export function TrustSection() {
  return (
    <section
      id="trust"
      className="relative border-b border-[var(--border)] bg-[var(--surface)] px-[var(--page-pad-x)] py-16 md:py-20"
      aria-label="Social proof"
    >
      <div className="container-page mx-auto flex flex-col gap-12 lg:gap-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md">
            <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-[var(--gold)] uppercase">
              Proven by people who train here
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.25rem)] leading-[0.95] tracking-wide text-white">
              NUMBERS THAT
              <br />
              <span className="text-[var(--gold)]">MEAN WORK.</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--gray)] md:text-base">
              A serious floor, coaches who care about form, and a community that
              shows up. Hover the coaches to meet the team behind your progress.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:items-end">
            <p className="text-[11px] font-semibold tracking-[0.25em] text-white/45 uppercase">
              Coaching roster
            </p>
            <div className="flex flex-row items-center">
              <AnimatedTooltip items={[...TRAINER_TOOLTIPS]} />
            </div>
            <a
              href="/trainers"
              className="text-xs font-semibold tracking-[0.16em] text-white uppercase underline decoration-[var(--gold)]/40 underline-offset-4 transition-colors hover:text-[var(--gold-light)]"
            >
              View all trainers →
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-4">
          {TRUST_STATS.map((stat) => (
            <div key={stat.label} className="text-left">
              <p className="font-[family-name:var(--font-number)] text-4xl tracking-wide text-[var(--gold)] md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] font-medium tracking-[0.18em] text-[var(--gray)] uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
