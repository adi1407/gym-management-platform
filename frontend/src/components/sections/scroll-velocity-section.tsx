"use client";

import ScrollVelocity from "@/components/ScrollVelocity";

export function ScrollVelocitySection() {
  return (
    <section
      id="momentum"
      className="relative overflow-hidden border-y border-[var(--border)] bg-[var(--black)] py-6 md:py-8"
      aria-label="Evolution Gym momentum banner"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--black)] via-transparent to-[var(--black)] z-10" />
      <ScrollVelocity
        texts={[
          "TRAIN HARDER  ·  EVOLVE STRONGER  ·  HOLD THE STANDARD  ·",
          "NO SHORTCUTS  ·  SHOW UP  ·  GET STRONGER  ·",
        ]}
        velocity={80}
        numCopies={4}
        className="font-[family-name:var(--font-display)] tracking-[0.08em] text-[var(--orange)] uppercase"
        scrollerClassName="!font-[family-name:var(--font-display)] !text-[clamp(2.5rem,8vw,5.5rem)] !leading-none !tracking-[0.06em] !font-normal"
        damping={48}
        stiffness={320}
      />
    </section>
  );
}
