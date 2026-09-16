"use client";

import CircularGallery from "@/components/CircularGallery";
import { Button } from "@/components/ui/button";
import { CIRCULAR_GALLERY } from "@/data/home";

export function FacilityGallerySection() {
  return (
    <section
      id="gallery"
      className="relative border-y border-[var(--border)] bg-[var(--surface)]"
      aria-labelledby="gallery-heading"
    >
      <div className="px-[var(--page-pad-x)] pt-[var(--section-gap)] pb-8">
        <div className="container-page mx-auto text-center">
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
            Drag, scroll, or use arrow keys — orbit through every zone on the
            floor, from racks to recovery.
          </p>
        </div>
      </div>

      <div className="relative h-[min(600px,70dvh)] w-full">
        <CircularGallery
          items={[...CIRCULAR_GALLERY]}
          bend={1}
          textColor="#f5f5f0"
          borderRadius={0.05}
          scrollEase={0.05}
          scrollSpeed={2}
          fontUrl="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          font="bold 30px Bebas Neue"
        />
      </div>

      <div className="flex justify-center gap-3 px-[var(--page-pad-x)] py-10">
        <Button href="/locations" variant="primary" size="md">
          Book a Tour
        </Button>
        <Button href="/locations" variant="outline" size="md">
          Locations
        </Button>
      </div>
    </section>
  );
}
