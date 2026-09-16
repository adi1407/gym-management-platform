"use client";

import { motion } from "motion/react";
import { DURATION, EASE } from "@/lib/animations";

type ScrollIndicatorProps = {
  reduceMotion?: boolean;
};

export function ScrollIndicator({ reduceMotion = false }: ScrollIndicatorProps) {
  if (reduceMotion) {
    return (
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex justify-center">
        <span className="text-[10px] font-semibold tracking-[0.35em] text-white/50 uppercase">
          Scroll
        </span>
      </div>
    );
  }

  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 bottom-5 z-20 flex flex-col items-center gap-2 sm:bottom-7"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.25, duration: DURATION.section, ease: EASE.out }}
      aria-hidden
    >
      <span className="text-[10px] font-semibold tracking-[0.35em] text-white/50 uppercase">
        Scroll
      </span>
      <span className="relative flex h-9 w-5 items-start justify-center rounded-full border border-white/25 pt-1.5">
        <motion.span
          className="block size-1 rounded-full bg-[var(--gold)]"
          animate={{ y: [0, 10, 0], opacity: [1, 0.35, 1] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
    </motion.div>
  );
}
