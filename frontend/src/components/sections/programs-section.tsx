"use client";

import { CoverFlowCarousel } from "@/components/ui/3-d-coverflow-carousel";
import { PROGRAM_CAROUSEL } from "@/data/home";

export function ProgramsSection() {
  return (
    <section id="programs" aria-labelledby="programs-heading" className="relative">
      <div className="sr-only">
        <h2 id="programs-heading">Featured training programs</h2>
      </div>
      <CoverFlowCarousel
        items={PROGRAM_CAROUSEL}
        sectionLabel="FEATURED PROGRAMS"
        autoplay
        autoplayDelay={5500}
      />
      <div className="border-t border-[var(--border)] bg-[var(--black)] px-[var(--page-pad-x)] py-8 text-center">
        <p className="text-sm text-[var(--gray)]">
          Not sure where to begin?{" "}
          <a
            href="/contact"
            className="font-semibold text-white underline decoration-[var(--gold)]/50 underline-offset-4 hover:text-[var(--gold-light)]"
          >
            Talk to a coach
          </a>{" "}
          — we’ll map the right program to your goal.
        </p>
      </div>
    </section>
  );
}
