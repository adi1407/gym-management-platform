"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import "react-day-picker/style.css";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3", className)}
      classNames={{
        today: "text-[var(--orange-light)]",
        selected:
          "!bg-[var(--orange)] !text-black rounded-md font-semibold",
        chevron: "fill-[var(--orange)]",
        day: "text-white/80 hover:bg-white/10 rounded-md",
        disabled: "text-white/20 opacity-40",
        ...classNames,
      }}
      {...props}
    />
  );
}
