"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { SafeImage } from "@/components/ui/safe-image";

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer px-2 text-[13px] font-medium tracking-[0.1em] text-white uppercase hover:text-[var(--gold-light)]"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 z-50 -translate-x-1/2 transform pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="overflow-hidden rounded-xl border border-white/15 bg-[var(--card)]/95 shadow-xl backdrop-blur-md"
              >
                <motion.div layout className="h-full w-max p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
  className,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className={cn(
        "relative flex justify-center space-x-4 rounded-full border border-white/15 bg-black/70 px-8 py-5 shadow-input backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <a href={href} className="flex max-w-[16rem] space-x-3">
      <SafeImage
        src={src}
        width={120}
        height={70}
        alt={title}
        className="h-[70px] w-[120px] max-w-none shrink-0 rounded-md object-cover shadow-lg"
        style={{ height: 70, width: 120 }}
      />
      <div>
        <h4 className="mb-1 text-base font-semibold text-white">{title}</h4>
        <p className="max-w-[10rem] text-sm text-[var(--gray)]">{description}</p>
      </div>
    </a>
  );
};

export const HoveredLink = ({
  children,
  className,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a
      {...rest}
      className={cn(
        "text-[var(--gray)] transition-colors hover:text-[var(--gold-light)]",
        className,
      )}
    >
      {children}
    </a>
  );
};
