"use client";

import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { SafeImage } from "@/components/ui/safe-image";
import { Button } from "@/components/ui/button";
import { TRAINER_TOOLTIPS } from "@/data/home";
import { TRAINERS } from "@/data/pages";

const TRAINER_LIST = Object.values(TRAINERS);

export default function TrainersPage() {
  return (
    <>
      <PageHero
        eyebrow="Trainers"
        title={
          <>
            TRAIN WITH
            <br />
            <span className="text-[var(--gold)]">PEOPLE WHO KNOW.</span>
          </>
        }
        description="Hover the roster to preview coaches. Every trainer here programs with standards — form first, ego second."
      >
        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-row items-center">
            <AnimatedTooltip items={[...TRAINER_TOOLTIPS]} />
          </div>
          <Button href="/contact" variant="primary" size="md">
            Book a Consultation
          </Button>
        </div>
      </PageHero>

      <section className="px-[var(--page-pad-x)] py-[var(--section-gap)]">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TRAINER_LIST.map((trainer) => (
            <article
              key={trainer.slug}
              className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] transition-colors hover:border-white/20"
            >
              <div className="aspect-[4/5] overflow-hidden bg-[var(--card)]">
                <SafeImage
                  src={trainer.image}
                  alt={trainer.name}
                  className="h-full w-full max-w-none object-cover transition-transform duration-500 hover:scale-105"
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
              <div className="p-5">
                <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-wide text-white">
                  {trainer.name}
                </h2>
                <p className="mt-1 text-xs font-semibold tracking-[0.16em] text-[var(--gold)] uppercase">
                  {trainer.role}
                </p>
                <p className="mt-1 text-xs text-white/45">{trainer.focus}</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--gray)]">
                  {trainer.bio}
                </p>
                <Link
                  href={`/trainers/${trainer.slug}`}
                  className="mt-4 inline-block text-xs font-semibold tracking-[0.14em] text-white uppercase underline decoration-[var(--gold)]/40 underline-offset-4 hover:text-[var(--gold-light)]"
                >
                  View profile →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
