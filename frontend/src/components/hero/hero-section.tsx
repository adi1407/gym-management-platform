"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Button } from "@/components/ui/button";
import { HeroHeadline, HeroFadeUp } from "@/components/hero/hero-headline";
import { HeroVideo } from "@/components/hero/hero-video";
import { ScrollIndicator } from "@/components/hero/scroll-indicator";
import { HERO_COPY } from "@/lib/hero";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(Boolean(prefersReduced));
  }, [prefersReduced]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 64]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.5, 0.82]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-[100dvh] min-h-[640px] w-full overflow-hidden bg-[var(--black)] md:min-h-[700px]"
      aria-label="Evolution Gym hero"
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={reduceMotion ? undefined : { scale: mediaScale }}
      >
        <HeroVideo reducedMotion={reduceMotion} />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 z-[1]">
        <motion.div
          className="absolute inset-0 bg-[var(--black)]"
          style={
            reduceMotion ? { opacity: 0.52 } : { opacity: overlayOpacity }
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--black)] via-[var(--black)]/50 to-[var(--black)]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--black)]/75 via-[var(--black)]/25 to-transparent" />
      </div>

      {/* Content — same pad as nav, vertically centered */}
      <motion.div
        className="relative z-10 flex h-full w-full items-center"
        style={
          reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }
        }
      >
        <div className="w-full px-[var(--page-pad-x)] pt-[calc(var(--nav-height-mobile)+0.5rem)] pb-20 md:pb-16 lg:pt-[var(--nav-height)]">
          <div className="container-page mx-auto">
            <div className="flex max-w-3xl flex-col items-start">
              <HeroFadeUp delay={0.25} reduceMotion={reduceMotion}>
                <p className="mb-4 text-[11px] font-semibold tracking-[0.32em] text-[var(--gold)] uppercase sm:mb-5 sm:text-xs">
                  {HERO_COPY.eyebrow}
                </p>
              </HeroFadeUp>

              <HeroHeadline
                lines={HERO_COPY.lines}
                reduceMotion={reduceMotion}
                accentLast
                className="w-full text-left text-[clamp(3rem,12vw,8.5rem)] leading-[0.86]"
              />

              <HeroFadeUp delay={0.85} reduceMotion={reduceMotion}>
                <p className="mt-6 max-w-md text-left text-base leading-relaxed text-white/75 sm:mt-7 sm:text-lg">
                  {HERO_COPY.support}
                </p>
              </HeroFadeUp>

              <HeroFadeUp delay={1.05} reduceMotion={reduceMotion}>
                <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-9 sm:max-w-none sm:flex-row sm:items-center sm:gap-4">
                  <Button
                    href={HERO_COPY.primaryCta.href}
                    variant="primary"
                    size="lg"
                    className="w-full min-w-0 sm:w-auto sm:min-w-[168px]"
                  >
                    {HERO_COPY.primaryCta.label}
                  </Button>
                  <Button
                    href={HERO_COPY.secondaryCta.href}
                    variant="outline"
                    size="lg"
                    className="w-full min-w-0 border-white/30 text-white sm:w-auto sm:min-w-[168px] hover:border-[var(--gold)] hover:bg-transparent hover:text-[var(--gold-light)]"
                  >
                    {HERO_COPY.secondaryCta.label}
                  </Button>
                </div>
              </HeroFadeUp>
            </div>
          </div>
        </div>
      </motion.div>

      <ScrollIndicator reduceMotion={reduceMotion} />
    </section>
  );
}
