"use client";

import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { PixelImage } from "@/components/ui/pixel-image";
import { LinkPreview } from "@/components/ui/link-preview";
import { Button } from "@/components/ui/button";
import { IMG, STORY } from "@/data/home";

export function StorySection() {
  return (
    <section
      id="story"
      className="relative border-b border-[var(--border)] bg-[var(--black)] px-[var(--page-pad-x)] py-[var(--section-gap)]"
      aria-labelledby="story-heading"
    >
      <div className="container-page mx-auto grid max-w-[var(--content-max)] items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-[var(--gold)] uppercase">
            About Evolution Gym
          </p>
          <h2
            id="story-heading"
            className="font-[family-name:var(--font-display)] text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.9] tracking-[0.02em] text-white"
          >
            BUILT FOR
            <br />
            PEOPLE WHO
            <br />
            <span className="text-[var(--gold)]">REFUSE TO</span>
            <br />
            SETTLE.
          </h2>

          <div className="mt-8 max-w-lg">
            <TextGenerateEffect
              words={STORY.philosophy}
              filter
              duration={0.35}
            />
          </div>

          <ul className="mt-10 space-y-5 border-t border-[var(--border)] pt-8">
            {STORY.pillars.map((pillar) => (
              <li key={pillar.title} className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-4">
                <span className="text-xs font-semibold tracking-[0.2em] text-[var(--gold)] uppercase">
                  {pillar.title}
                </span>
                <span className="text-sm leading-relaxed text-[var(--gray)]">
                  {pillar.body}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-sm leading-relaxed text-[var(--gray)] md:text-base">
            Start with our{" "}
            <LinkPreview
              url="/programs"
              isStatic
              imageSrc={IMG.squat}
              className="font-semibold text-white underline decoration-[var(--gold)]/50 underline-offset-4 transition-colors hover:text-[var(--gold-light)]"
            >
              training programs
            </LinkPreview>{" "}
            or compare{" "}
            <LinkPreview
              url="/memberships"
              isStatic
              imageSrc={IMG.group}
              className="font-semibold text-white underline decoration-[var(--gold)]/50 underline-offset-4 transition-colors hover:text-[var(--gold-light)]"
            >
              membership plans
            </LinkPreview>
            .
          </p>

          <div className="mt-8">
            <Button href="/about" variant="outline" size="md">
              Our Full Story
            </Button>
          </div>
        </div>

        <div className="relative mx-auto flex w-full justify-center lg:justify-end">
          <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            <PixelImage
              src={STORY.image}
              customGrid={{ rows: 4, cols: 6 }}
              grayscaleAnimation
            />
          </div>
          <p className="absolute -bottom-3 left-1/2 hidden -translate-x-1/2 text-[10px] tracking-[0.25em] text-white/40 uppercase lg:block">
            Facility · Strength floor
          </p>
        </div>
      </div>
    </section>
  );
}
