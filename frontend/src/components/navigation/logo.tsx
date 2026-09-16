import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  compact?: boolean;
  onClick?: () => void;
};

export function Logo({ className, compact = false, onClick }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--black)]",
        className,
      )}
      aria-label={`${SITE_NAME} home`}
    >
      <span
        className={cn(
          "relative grid place-items-center rounded-[6px] border border-[var(--orange)]/35 bg-[var(--orange)]/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-sm transition-all duration-300 group-hover:border-[var(--orange)]/70 group-hover:shadow-[0_0_22px_rgba(255,92,26,0.35)]",
          compact ? "size-8" : "size-9 lg:size-10",
        )}
        aria-hidden
      >
        <svg
          viewBox="0 0 32 32"
          fill="none"
          className={cn(
            "transition-transform duration-300 group-hover:scale-105",
            compact ? "size-4" : "size-[18px] lg:size-5",
          )}
        >
          <path
            d="M16 4L26 10V22L16 28L6 22V10L16 4Z"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-[var(--orange)]"
          />
          <path
            d="M16 10L21 13V19L16 22L11 19V13L16 10Z"
            fill="currentColor"
            className="text-[var(--orange-light)] transition-colors duration-300 group-hover:text-white"
          />
        </svg>
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-[family-name:var(--font-display)] tracking-[0.08em] text-[var(--orange)] transition-colors duration-300 group-hover:text-[var(--orange-light)]",
            compact ? "text-[1.35rem]" : "text-[1.55rem] lg:text-[1.7rem]",
          )}
        >
          EVOLUTION
        </span>
        <span
          className={cn(
            "font-[family-name:var(--font-nav)] font-semibold tracking-[0.42em] text-[var(--orange)]/75 uppercase transition-colors duration-300 group-hover:text-[var(--orange-light)]",
            compact ? "text-[8px]" : "text-[9px]",
          )}
        >
          Gym
        </span>
      </span>
    </Link>
  );
}
