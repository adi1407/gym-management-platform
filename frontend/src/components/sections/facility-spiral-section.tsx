"use client";

import InfiniteSpiral from "@/components/InfiniteSpiral";
import { FACILITY_SPIRAL } from "@/data/home";

/** InfiniteSpiral reuse — about / transformations deep-dive */
export function FacilitySpiralSection() {
  return (
    <section
      id="facility-spiral"
      className="relative border-y border-[var(--border)] bg-[var(--black)]"
      aria-labelledby="facility-spiral-heading"
    >
      <div className="px-[var(--page-pad-x)] pt-[var(--section-gap)] pb-6">
        <div className="container-page mx-auto text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-[var(--orange)] uppercase">
            Inside the club
          </p>
          <h2
            id="facility-spiral-heading"
            className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,6vw,4rem)] leading-[0.92] tracking-wide text-white"
          >
            EVERY ZONE.
            <br />
            <span className="text-[var(--orange)]">ONE STANDARD.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-[var(--gray)]">
            Drag the spiral — racks, conditioning, mobility, and the floor that
            holds it all together.
          </p>
        </div>
      </div>

      <div className="relative h-[min(520px,70dvh)] w-full overflow-hidden">
        <InfiniteSpiral
          items={FACILITY_SPIRAL}
          animationMode="all"
          speed={0.55}
          radius={200}
          cardWidth={150}
          cardHeight={190}
          verticalSpacing={70}
          perspective={1100}
          cardRadius={12}
          centerScale={1.25}
          edgeBlur={4}
          cardsPerTurn={7}
          grayscale={0}
          pauseOnHover
        />
      </div>
    </section>
  );
}
