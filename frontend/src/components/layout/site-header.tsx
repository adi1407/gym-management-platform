"use client";

import { useCallback, useId, useState } from "react";
import { Menu } from "lucide-react";
import { motion } from "motion/react";
import { CTA } from "@/lib/constants";
import { DURATION, EASE } from "@/lib/animations";
import { useScrollNav } from "@/hooks/use-scroll-nav";
import { Logo } from "@/components/navigation/logo";
import { DesktopNav } from "@/components/navigation/navbar";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonId = useId();
  const { isScrolled, isHidden } = useScrollNav({ disabled: menuOpen });

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={false}
        animate={{ y: isHidden ? "-110%" : "0%" }}
        transition={{ duration: DURATION.normal, ease: EASE.out }}
      >
        <div
          className={cn(
            "mx-auto w-full max-w-[var(--content-max)] px-[var(--page-pad-x)] transition-[padding] duration-300",
            isScrolled ? "pt-3" : "pt-0",
          )}
        >
          <div
            className={cn(
              "relative grid grid-cols-[1fr_auto] items-center gap-3 transition-all duration-300 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]",
              isScrolled
                ? "h-[var(--nav-height-mobile-compact)] rounded-xl border border-white/10 bg-white/[0.06] px-3 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:h-[var(--nav-height-compact)] lg:px-5"
                : "h-[var(--nav-height-mobile)] border border-transparent bg-transparent lg:h-[var(--nav-height)]",
            )}
          >
            {isScrolled && (
              <div
                className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
                aria-hidden
              />
            )}

            <div className="relative z-10 justify-self-start">
              <Logo compact={isScrolled} />
            </div>

            <div
              className={cn(
                "relative z-10 hidden justify-self-center lg:block",
                isScrolled &&
                  "rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 backdrop-blur-md",
              )}
            >
              <DesktopNav />
            </div>

            <div className="relative z-10 flex items-center justify-self-end gap-2">
              <div className="hidden items-center gap-2 lg:flex">
                <Button
                  href={CTA.login.href}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-white/80"
                >
                  {CTA.login.label}
                </Button>
                <Button
                  href={CTA.join.href}
                  variant="primary"
                  size="sm"
                  className="shadow-[0_0_24px_rgba(255,106,0,0.25)]"
                >
                  {CTA.join.label}
                </Button>
              </div>

              <button
                id={menuButtonId}
                type="button"
                className={cn(
                  "inline-flex size-11 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] lg:hidden",
                  isScrolled && "border border-white/10 bg-white/[0.06]",
                )}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={openMenu}
              >
                <Menu className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
