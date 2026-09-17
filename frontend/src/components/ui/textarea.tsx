import { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "flex min-h-[96px] w-full rounded-md border border-[var(--border)] bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/35 outline-none focus-visible:border-[var(--orange)]/60 disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
