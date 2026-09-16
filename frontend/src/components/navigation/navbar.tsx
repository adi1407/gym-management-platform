"use client";

import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { NavLink } from "@/components/navigation/nav-link";

type DesktopNavProps = {
  className?: string;
};

export function DesktopNav({ className }: DesktopNavProps) {
  return (
    <nav
      className={cn(
        "hidden items-center gap-1 lg:flex xl:gap-2",
        className,
      )}
      aria-label="Primary"
    >
      {NAV_LINKS.map((item) => (
        <NavLink key={item.href} href={item.href}>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
