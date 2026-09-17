"use client";

import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { MEMBERSHIP_STEPS } from "@/data/memberships";
import { EASE } from "@/lib/animations";

export function MembershipSteps() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="border-b border-[var(--border)] bg-[var(--surface)] px-[var(--page-pad-x)] py-[var(--section-gap)]"
      aria-labelledby="steps-heading"
    >
      <div className="container-page mx-auto">
        <div className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-[var(--orange)] uppercase">
              How it works
            </p>
            <h2
              id="steps-heading"
              className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] leading-[0.92] tracking-wide text-white"
            >
              FROM CLICK
              <br />
              <span className="text-[var(--orange)]">TO FIRST SET.</span>
            </h2>
          </div>
          <Button href="/join" variant="primary" size="md" className="w-fit">
            Start free visit
          </Button>
        </div>

        <ol className="grid gap-6 md:grid-cols-3 md:gap-8">
          {MEMBERSHIP_STEPS.map((s, i) => (
            <motion.li
              key={s.step}
              className="relative"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: EASE.out }}
            >
              {i < MEMBERSHIP_STEPS.length - 1 ? (
                <div
                  className="pointer-events-none absolute top-8 left-[calc(50%+2.5rem)] hidden h-px w-[calc(100%-2rem)] bg-gradient-to-r from-[var(--orange)]/40 to-transparent md:block"
                  aria-hidden
                />
              ) : null}
              <p className="font-[family-name:var(--font-number)] text-4xl tracking-wide text-[var(--orange)]">
                {s.step}
              </p>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl tracking-wide text-white">
                {s.title}
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-[var(--gray)]">
                {s.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
