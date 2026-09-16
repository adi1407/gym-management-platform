"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { DURATION, EASE } from "@/lib/animations";
import { cn } from "@/lib/utils";

type HeroHeadlineProps = {
  lines: readonly string[];
  className?: string;
  reduceMotion?: boolean;
  /** Last line uses gold for brand emphasis */
  accentLast?: boolean;
};

export function HeroHeadline({
  lines,
  className,
  reduceMotion = false,
  accentLast = false,
}: HeroHeadlineProps) {
  const last = lines.length - 1;

  if (reduceMotion) {
    return (
      <h1
        className={cn(
          "font-[family-name:var(--font-hero)] leading-[0.86] tracking-[0.02em] text-white",
          className,
        )}
      >
        {lines.map((line, index) => (
          <span
            key={line}
            className={cn(
              "block",
              accentLast && index === last && "text-[var(--gold)]",
            )}
          >
            {line}
          </span>
        ))}
      </h1>
    );
  }

  return (
    <h1
      className={cn(
        "font-[family-name:var(--font-hero)] leading-[0.86] tracking-[0.02em] text-white",
        className,
      )}
    >
      {lines.map((line, index) => (
        <span key={line} className="block overflow-hidden">
          <motion.span
            className={cn(
              "block",
              accentLast && index === last && "text-[var(--gold)]",
            )}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.85,
              delay: 0.45 + index * 0.11,
              ease: EASE.out,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

type FadeUpProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  reduceMotion?: boolean;
};

export function HeroFadeUp({
  children,
  delay = 0,
  className,
  reduceMotion = false,
}: FadeUpProps) {
  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.section, delay, ease: EASE.out }}
    >
      {children}
    </motion.div>
  );
}
