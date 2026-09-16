"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function NavLink({ href, children, className, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive =
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center px-1 py-1 font-[family-name:var(--font-nav)] text-[13px] font-medium tracking-[0.12em] uppercase text-[var(--white)] transition-colors duration-300 hover:text-white",
        className,
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <span className="relative z-10">{children}</span>

      {/* Soft hover glow */}
      <span
        className="pointer-events-none absolute inset-x-0 -bottom-1 h-6 rounded-full bg-white/0 opacity-0 blur-md transition-all duration-300 group-hover:bg-white/15 group-hover:opacity-100"
        aria-hidden
      />

      {/* Underline */}
      <span
        className={cn(
          "absolute -bottom-0.5 left-0 h-[1.5px] origin-left rounded-full bg-white transition-transform duration-300 ease-out",
          isActive ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100",
        )}
        aria-hidden
      />

      {isActive && (
        <motion.span
          layoutId="nav-active-dot"
          className="absolute -bottom-[7px] left-1/2 size-1 -translate-x-1/2 rounded-full bg-white"
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          aria-hidden
        />
      )}
    </Link>
  );
}
