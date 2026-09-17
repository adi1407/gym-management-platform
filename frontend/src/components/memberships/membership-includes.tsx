"use client";

import { motion, useReducedMotion } from "motion/react";
import { Dumbbell, Users, HeartPulse, Ticket } from "lucide-react";
import { MEMBERSHIP_VALUE_POINTS } from "@/data/memberships";
import { EASE } from "@/lib/animations";

const ICONS = [Dumbbell, Users, HeartPulse, Ticket];

export function MembershipIncludes() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="border-b border-[var(--border)] bg-[var(--surface)] px-[var(--page-pad-x)] py-[var(--section-gap)]"
      aria-labelledby="includes-heading"
    >
      <div className="container-page mx-auto">
        <div className="mb-10 flex flex-col gap-4 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-[var(--orange)] uppercase">
              Included
            </p>
            <h2
              id="includes-heading"
              className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] leading-[0.92] tracking-wide text-white"
            >
              WHAT EVERY
              <br />
              <span className="text-[var(--orange)]">MEMBER GETS.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[var(--gray)] lg:text-right">
            Plans change how long you commit — not whether you belong on the
            floor. These foundations ship with every membership.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2 lg:grid-cols-4">
          {MEMBERSHIP_VALUE_POINTS.map((point, i) => {
            const Icon = ICONS[i] ?? Dumbbell;
            return (
              <motion.article
                key={point.title}
                className="bg-[var(--black)] p-6 transition-colors hover:bg-[var(--card)] md:p-7"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  delay: i * 0.06,
                  duration: 0.45,
                  ease: EASE.out,
                }}
              >
                <Icon
                  className="size-5 text-[var(--orange)]"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl tracking-wide text-white">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--gray)]">
                  {point.body}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
