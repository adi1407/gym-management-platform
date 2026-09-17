"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MEMBERSHIP_PLAN_DETAILS } from "@/data/memberships";
import { EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE.out },
  },
};

export function MembershipPlansDetailed() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="plans"
      className="relative scroll-mt-28 border-b border-[var(--border)] bg-[var(--black)] px-[var(--page-pad-x)] py-[var(--section-gap)]"
      aria-labelledby="plans-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,92,26,0.12),transparent_55%)]" />

      <div className="container-page relative z-10 mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-[var(--orange)] uppercase">
            Pricing
          </p>
          <h2
            id="plans-heading"
            className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,6vw,4rem)] leading-[0.92] tracking-wide text-white"
          >
            THREE PLANS.
            <br />
            <span className="text-[var(--orange)]">ONE STANDARD.</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--gray)] md:text-base">
            Every membership unlocks the full floor. Longer commitments unlock
            more coaching perks and a lower monthly rate.
          </p>
        </div>

        <motion.div
          className="mx-auto mt-12 grid max-w-6xl gap-5 lg:grid-cols-3 lg:items-stretch"
          variants={reduceMotion ? undefined : container}
          initial={reduceMotion ? false : "hidden"}
          whileInView={reduceMotion ? undefined : "show"}
          viewport={{ once: true, amount: 0.15 }}
        >
          {MEMBERSHIP_PLAN_DETAILS.map((plan) => (
            <motion.article
              key={plan.slug}
              variants={reduceMotion ? undefined : item}
              className={cn(
                "relative flex flex-col rounded-2xl border p-6 sm:p-7",
                plan.featured
                  ? "border-[var(--orange)]/60 bg-gradient-to-b from-[var(--orange)]/15 to-[var(--surface)] shadow-[0_0_60px_rgba(255,92,26,0.18)] lg:-translate-y-3 lg:pb-8"
                  : "border-[var(--border)] bg-[var(--surface)] hover:border-white/20",
              )}
            >
              {plan.featured ? (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="gap-1 px-3 py-1 shadow-lg">
                    <Sparkles className="size-3" aria-hidden />
                    Most popular
                  </Badge>
                </div>
              ) : null}

              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-3xl tracking-wide text-white sm:text-4xl">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-xs tracking-wide text-white/45 uppercase">
                    {plan.bestFor}
                  </p>
                </div>
                {plan.savings ? (
                  <span className="shrink-0 rounded-md border border-[var(--orange)]/35 bg-[var(--orange)]/10 px-2 py-1 text-[10px] font-semibold tracking-wide text-[var(--orange-light)] uppercase">
                    {plan.savings}
                  </span>
                ) : (
                  <span className="shrink-0 text-[10px] font-semibold tracking-[0.14em] text-white/35 uppercase">
                    {plan.note}
                  </span>
                )}
              </div>

              <p className="mt-5 font-[family-name:var(--font-number)] text-5xl tracking-wide text-[var(--orange)] sm:text-6xl">
                {plan.price}
                <span className="ml-1 text-base font-[family-name:var(--font-body)] font-normal text-white/45">
                  {plan.period}
                </span>
              </p>
              <p className="mt-1 text-sm text-white/50">{plan.monthlyEq}</p>
              <p className="mt-3 text-sm leading-relaxed text-[var(--gray)]">
                {plan.tagline}
              </p>

              <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-white/80"
                  >
                    <Check
                      className={cn(
                        "mt-0.5 size-4 shrink-0",
                        plan.featured
                          ? "text-[var(--orange)]"
                          : "text-[var(--orange-light)]/80",
                      )}
                      aria-hidden
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <ul className="mt-4 space-y-2">
                {plan.extras.map((extra) => (
                  <li
                    key={extra}
                    className="flex items-start gap-2 text-xs text-white/50"
                  >
                    <span
                      className="mt-1.5 size-1 shrink-0 rounded-full bg-[var(--orange)]/70"
                      aria-hidden
                    />
                    {extra}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-2 pt-8">
                <Button
                  href={plan.href}
                  variant={plan.featured ? "primary" : "outline"}
                  size="md"
                  className="w-full"
                >
                  Book free visit
                </Button>
                <p className="text-center text-[11px] text-white/35">
                  No payment online — visit first, join at the desk
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
