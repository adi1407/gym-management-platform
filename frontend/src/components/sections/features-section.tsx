"use client";

import Prism from "@/components/Prism";
import { FEATURES } from "@/data/home";
import { Button } from "@/components/ui/button";

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative overflow-hidden border-y border-[var(--border)] bg-[var(--black)]"
      aria-labelledby="features-heading"
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 opacity-40 lg:block">
        <Prism
          animationType="rotate"
          timeScale={0.45}
          height={3.5}
          baseWidth={5.5}
          scale={3.2}
          hueShift={0.05}
          colorFrequency={1}
          noise={0.45}
          glow={0.9}
        />
      </div>

      <div className="relative z-10 px-[var(--page-pad-x)] py-[var(--section-gap)]">
        <div className="container-page mx-auto max-w-[var(--content-max)]">
          <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-[var(--gold)] uppercase">
            Everything you need
          </p>
          <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
            <h2
              id="features-heading"
              className="max-w-2xl font-[family-name:var(--font-display)] text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.92] tracking-wide text-white"
            >
              TRAIN BETTER.
              <br />
              <span className="text-[var(--gold)]">LEAVE STRONGER.</span>
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-[var(--gray)] lg:text-base">
              From the first warm-up to the last set — equipment, coaching, and
              recovery designed as one system.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <article
                key={feature.num}
                className="bg-[var(--surface)] p-6 transition-colors hover:bg-[var(--card)] md:p-8"
              >
                <span className="font-[family-name:var(--font-number)] text-sm tracking-[0.2em] text-[var(--gold)]">
                  {feature.num}
                </span>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl tracking-wide text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--gray)]">
                  {feature.body}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/locations" variant="outline" size="md">
              Tour the Facility
            </Button>
            <Button href="/trainers" variant="ghost" size="md">
              Meet Coaches
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
