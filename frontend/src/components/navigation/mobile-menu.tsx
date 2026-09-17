"use client";

import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { CTA, NAV_LINKS } from "@/lib/constants";
import { DURATION, EASE } from "@/lib/animations";
import { Logo } from "@/components/navigation/logo";
import { Button } from "@/components/ui/button";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[60] flex flex-col bg-[var(--black)]/80 backdrop-blur-2xl lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DURATION.normal, ease: EASE.out }}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-[var(--page-pad-x)] py-4">
            <Logo compact onClick={onClose} />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="inline-flex size-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
              aria-label="Close menu"
            >
              <X className="size-5" />
            </button>
          </div>

          <h2 id={titleId} className="sr-only">
            Site navigation
          </h2>

          <nav
            className="flex flex-1 flex-col justify-center gap-1 px-[var(--page-pad-x)] py-10"
            aria-label="Mobile"
          >
            {NAV_LINKS.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.05 * index,
                  duration: DURATION.normal,
                  ease: EASE.out,
                }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="group flex items-center justify-between border-b border-white/10 py-5"
                >
                  <span className="font-[family-name:var(--font-display)] text-4xl tracking-[0.06em] text-white transition-colors group-hover:text-white/80">
                    {item.label}
                  </span>
                  <span className="text-xs tracking-[0.2em] text-white/35 uppercase transition-colors group-hover:text-white/70">
                    0{index + 1}
                  </span>
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="flex flex-col gap-3 border-t border-white/10 px-[var(--page-pad-x)] py-6">
            <Button href={CTA.join.href} variant="primary" size="lg" className="w-full">
              {CTA.join.label}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
