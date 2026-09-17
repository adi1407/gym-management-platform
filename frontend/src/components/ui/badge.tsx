import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.12em] uppercase",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[var(--orange)] text-black",
        secondary: "border-white/10 bg-white/10 text-white",
        outline: "border-white/20 text-white/80",
        success: "border-transparent bg-emerald-500/20 text-emerald-300",
        warning: "border-transparent bg-amber-500/20 text-amber-300",
        danger: "border-transparent bg-red-500/20 text-red-300",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
