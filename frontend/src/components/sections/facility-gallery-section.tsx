"use client";

import InfiniteSpiral from "@/components/InfiniteSpiral";
import { Button } from "@/components/ui/button";
import { FACILITY_SPIRAL } from "@/data/home";

export function FacilityGallerySection() {
  return (
    <section
      id="gallery"
      className="relative border-y border-[var(--border)] bg-[var(--surface)]"
      aria-labelledby="gallery-heading"
    >
      <div className="px-[var(--page-pad-x)] pt-[var(--section-gap)] pb-8">
        <div className="container-page mx-auto max-w-[var(--content-max)] text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-[var(--gold)] uppercase">
            The floor
          </p>
          <h2
            id="gallery-heading"
            className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,6vw,4.25rem)] leading-[0.92] tracking-wide text-white"
          >
            BUILT FOR
            <br />
            <span className="text-[var(--gold)]">SERIOUS TRAINING.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[var(--gray)] md:text-base">
            Strength racks, free weights, conditioning tools, and recovery space
            — drag or scroll the spiral to explore the facility.
          </p>
        </div>
      </div>

      <div className="relative h-[min(560px,75dvh)] w-full overflow-hidden">
        <InfiniteSpiral
          items={FACILITY_SPIRAL}
          animationMode="all"
          speed={0.55}
          radius={200}
          cardWidth={160}
          cardHeight={200}
          verticalSpacing={72}
          perspective={1100}
          cardRadius={12}
          centerScale={1.25}
          edgeBlur={4}
          cardsPerTurn={7}
          grayscale={0}
          pauseOnHover
        />
      </div>

      <div className="flex justify-center gap-3 px-[var(--page-pad-x)] py-10">
        <Button href="/locations" variant="primary" size="md">
          Book a Tour
        </Button>
        <Button href="/locations" variant="outline" size="md">
          Full Gallery
        </Button>
      </div>
    </section>
  );
}
