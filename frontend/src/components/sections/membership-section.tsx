"use client";

import { motion, useReducedMotion } from "motion/react";
import SideRays from "@/components/SideRays";
import { Button } from "@/components/ui/button";
import { MEMBERSHIP_PLANS } from "@/data/home";
import { EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 48, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: EASE.out },
  },
};

export function MembershipSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="memberships"
      className="relative overflow-hidden border-y border-[var(--border)] bg-[var(--black)]"
      aria-labelledby="memberships-heading"
    >
      <div className="absolute inset-0 opacity-90">
        <SideRays
          speed={2.5}
          rayColor1="#FF5C1A"
          rayColor2="#FF8A45"
          intensity={2}
          spread={2}
          origin="top-right"
          tilt={0}
          saturation={1.5}
          blend={0.75}
          falloff={1.6}
          opacity={1.0}
        />
      </div>
      <div className="absolute inset-0 bg-[var(--black)]/72" />

      <div className="relative z-10 px-[var(--page-pad-x)] py-[var(--section-gap)]">
        <div className="container-page mx-auto">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: EASE.out }}
          >
            <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-[var(--gold)] uppercase">
              Memberships
            </p>
            <h2
              id="memberships-heading"
              className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,5rem)] leading-[0.9] tracking-wide text-white"
            >
              CHOOSE YOUR
              <br />
              <span className="text-[var(--gold)]">COMMITMENT.</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
              Clear pricing. Full floor access. Coaching culture included. Pick
              the plan that matches how hard you’re willing to show up.
            </p>
          </motion.div>

          <motion.div
            className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-3 md:items-stretch"
            variants={reduceMotion ? undefined : container}
            initial={reduceMotion ? false : "hidden"}
            whileInView={reduceMotion ? undefined : "show"}
            viewport={{ once: true, amount: 0.2 }}
          >
            {MEMBERSHIP_PLANS.map((plan) => (
              <motion.article
                key={plan.name}
                variants={reduceMotion ? undefined : cardVariant}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -10,
                        transition: { duration: 0.35, ease: EASE.out },
                      }
                }
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-2xl border p-6 backdrop-blur-md transition-shadow duration-500",
                  plan.featured
                    ? "z-[1] border-[var(--orange)]/55 bg-white/[0.09] shadow-[0_0_50px_rgba(255,92,26,0.22)] md:-my-3 md:py-8"
                    : "border-white/10 bg-black/45 hover:border-white/25 hover:shadow-[0_20px_50px_rgba(0,0,0,0.45)]",
                )}
              >
                {plan.featured && !reduceMotion ? (
                  <motion.div
                    className="pointer-events-none absolute -inset-px rounded-2xl"
                    style={{
                      background:
                        "linear-gradient(120deg, transparent, rgba(212,160,23,0.45), transparent)",
                      backgroundSize: "200% 100%",
                    }}
                    animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    aria-hidden
                  />
                ) : null}

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-4 flex min-h-6 items-center justify-between gap-2">
                    {plan.featured ? (
                      <motion.span
                        className="rounded-full bg-[var(--orange)] px-2.5 py-0.5 text-[10px] font-bold tracking-[0.14em] text-black uppercase"
                        animate={
                          reduceMotion
                            ? undefined
                            : { scale: [1, 1.04, 1] }
                        }
                        transition={{
                          duration: 2.4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        Most popular
                      </motion.span>
                    ) : (
                      <span className="text-[10px] font-semibold tracking-[0.16em] text-white/35 uppercase">
                        {plan.note}
                      </span>
                    )}
                    {plan.savings ? (
                      <span className="rounded-full border border-[var(--orange)]/40 bg-[var(--orange)]/15 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[var(--orange-light)]">
                        {plan.savings}
                      </span>
                    ) : null}
                  </div>

                  <h3 className="font-[family-name:var(--font-display)] text-3xl tracking-wide text-white">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-xs tracking-wide text-white/45 uppercase">
                    {plan.featured ? plan.note : "Membership"}
                  </p>

                  <motion.p
                    className="mt-6 font-[family-name:var(--font-number)] text-5xl tracking-wide text-[var(--gold)]"
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.2,
                      duration: 0.55,
                      ease: EASE.out,
                    }}
                  >
                    {plan.price}
                    <span className="ml-1 text-base font-[family-name:var(--font-body)] text-white/50">
                      {plan.period}
                    </span>
                  </motion.p>

                  <ul className="mt-6 flex-1 space-y-2.5">
                    {plan.features.map((feature, i) => (
                      <motion.li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-white/75"
                        initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: 0.25 + i * 0.06,
                          duration: 0.4,
                          ease: EASE.out,
                        }}
                      >
                        <span
                          className={cn(
                            "mt-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full text-[10px]",
                            plan.featured
                              ? "bg-[var(--gold)] text-black"
                              : "bg-white/10 text-[var(--gold-light)]",
                          )}
                          aria-hidden
                        >
                          ✓
                        </span>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  <motion.div
                    className="mt-8"
                    whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                  >
                    <Button
                      href={plan.href}
                      variant={plan.featured ? "primary" : "outline"}
                      size="md"
                      className={cn(
                        "w-full",
                        plan.featured &&
                          "shadow-[0_0_28px_rgba(255,106,0,0.35)]",
                      )}
                    >
                      Choose Plan
                    </Button>
                  </motion.div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <p className="mt-10 text-center text-xs text-white/45">
            Prices are illustrative placeholders — confirm current plans at the
            front desk or online join flow.
          </p>
        </div>
      </div>
    </section>
  );
}
