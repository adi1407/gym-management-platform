"use client";

import GhostFibers from "@/components/GhostFibers";
import { Button } from "@/components/ui/button";

/** Brand-aligned fiber field — gold / deep charcoal instead of default purple */
export function MindsetSection() {
  return (
    <section
      id="mindset"
      className="relative border-y border-[var(--border)]"
      aria-labelledby="mindset-heading"
    >
      <div className="relative h-[min(640px,85dvh)] w-full">
        <GhostFibers
          lineColor="#1a1408"
          glowColor="#D4A017"
          speed={0.18}
          scale={2}
          rotation={0}
          rotationSpeed={0.2}
          layers={4}
          waveAmplitude={0.015}
          waveFrequency={3}
          waveSpeed={0.15}
          layerSpeed={0.08}
          twist={0.1}
          twistFrequency={5}
          twistSpeed={1.1}
          lineFrequency={5}
          lineSpacing={2}
          lineSharpness={16}
          glowFalloff={10}
          glowIntensity={1.4}
          brightness={1.85}
          blueBoost={0.85}
          vignette={0.85}
          grain={0.05}
          dpr={1}
        />

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-t from-[var(--black)] via-[var(--black)]/35 to-[var(--black)]/50 px-[var(--page-pad-x)] text-center">
          <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-[var(--gold)] uppercase">
            The mindset
          </p>
          <h2
            id="mindset-heading"
            className="max-w-3xl font-[family-name:var(--font-display)] text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.9] tracking-[0.02em] text-white"
          >
            FOCUS.
            <br />
            DISCIPLINE.
            <br />
            <span className="text-[var(--gold)]">PROGRESS.</span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70 md:text-base">
            Evolution isn’t a slogan — it’s the work you repeat when nobody is
            watching. We build the environment. You bring the consistency.
          </p>
          <div className="mt-8">
            <Button href="/transformations" variant="outline" size="md">
              See Member Journeys
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
