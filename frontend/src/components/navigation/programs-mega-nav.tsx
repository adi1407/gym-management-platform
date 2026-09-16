"use client";

import { useState } from "react";
import {
  Menu,
  MenuItem,
  ProductItem,
  HoveredLink,
} from "@/components/ui/navbar-menu";
import { IMG } from "@/data/home";
import { cn } from "@/lib/utils";

/** Aceternity navbar-menu — used on Programs page for smooth mega navigation */
export function ProgramsMegaNav({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className={cn("relative z-40 flex w-full justify-center", className)}>
      <Menu
        setActive={setActive}
        className="!rounded-xl !border-white/15 !bg-black/70 !px-6 !py-4 !shadow-none backdrop-blur-xl"
      >
        <MenuItem setActive={setActive} active={active} item="Strength">
          <div className="grid grid-cols-1 gap-4 p-2 text-sm sm:grid-cols-2">
            <ProductItem
              title="Barbell Strength"
              href="/programs/strength"
              src={IMG.squat}
              description="Compound lifts, progressive overload, power."
            />
            <ProductItem
              title="Hypertrophy"
              href="/programs/strength"
              src={IMG.dumbbells}
              description="Volume-focused muscle building blocks."
            />
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Conditioning">
          <div className="flex flex-col space-y-3 text-sm">
            <HoveredLink href="/programs/hiit">HIIT intervals</HoveredLink>
            <HoveredLink href="/programs/functional">
              Functional circuits
            </HoveredLink>
            <HoveredLink href="/programs/fat-loss">Fat-loss blocks</HoveredLink>
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Recovery">
          <div className="flex flex-col space-y-3 text-sm">
            <HoveredLink href="/programs/mobility">Mobility lab</HoveredLink>
            <HoveredLink href="/programs/mobility">
              Stretch & reset
            </HoveredLink>
            <HoveredLink href="/contact">Book assessment</HoveredLink>
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="All Programs">
          <div className="flex flex-col space-y-3 text-sm">
            <HoveredLink href="/programs">Program directory</HoveredLink>
            <HoveredLink href="/trainers">Find a coach</HoveredLink>
            <HoveredLink href="/memberships">Membership access</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
