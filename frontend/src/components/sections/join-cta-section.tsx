"use client";

import AccordionGallery from "@/components/AccordionGallery";
import { BubbleBackground } from "@/components/animate-ui/components/backgrounds/bubble";
import { Button } from "@/components/ui/button";
import { CTA } from "@/lib/constants";
import { JOURNEY_GALLERY } from "@/data/home";

const GYM_BUBBLE_COLORS = {
  first: "212,160,23",
  second: "255,106,0",
  third: "244,197,66",
  fourth: "255,122,26",
  fifth: "180,120,20",
  sixth: "255,106,0",
};

export function JoinCtaSection() {
  return (
    <section
      id="join"
      className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--black)]"
      aria-labelledby="join-heading"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <BubbleBackground
          interactive={false}
          colors={GYM_BUBBLE_COLORS}
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-[var(--black)]/85" />
      </div>

      <div className="relative z-10 px-[var(--page-pad-x)] pt-[var(--section-gap)] pb-10">
        <div className="container-page mx-auto text-center md:text-left">
          <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-[var(--gold)] uppercase">
            Start today
          </p>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2
              id="join-heading"
              className="max-w-3xl font-[family-name:var(--font-display)] text-[clamp(2.75rem,9vw,5.5rem)] leading-[0.9] tracking-[0.02em] text-white"
            >
              YOUR JOURNEY
              <br />
              <span className="text-[var(--gold)]">STARTS NOW.</span>
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--gray)] md:text-right">
              Hover each stage — from walking in to evolving strong. Pick where
              you are, then take the next step with a coach.
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 px-[var(--page-pad-x)] pb-8">
        <div className="container-page mx-auto">
          <AccordionGallery
            items={[...JOURNEY_GALLERY]}
            defaultIndex={2}
            expandRatio={0.52}
            trigger="hover"
            accentColor="#d4a017"
            overlayColor="#080808"
            textColor="#f5f5f0"
            height={480}
            gap={8}
            radius={12}
            grayscale={false}
            parallax={0.45}
            tilt={6}
            className="!h-[min(480px,70dvh)] max-[520px]:!h-[min(640px,78dvh)]"
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4 px-[var(--page-pad-x)] pb-[var(--section-gap)] text-center sm:flex-row sm:justify-center sm:gap-4">
        <Button href={CTA.join.href} variant="primary" size="lg">
          {CTA.join.label}
        </Button>
        <Button
          href="/contact"
          variant="outline"
          size="lg"
          className="border-white/25 text-white hover:border-[var(--gold)] hover:text-[var(--gold-light)]"
        >
          Talk to Us
        </Button>
      </div>
    </section>
  );
}
