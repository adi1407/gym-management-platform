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
        "group relative inline-flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--black)]",
        className,
      )}
      aria-label={`${SITE_NAME} home`}
    >
      {/* Mark */}
      <span
        className={cn(
          "relative grid place-items-center rounded-[6px] border border-white/20 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-sm transition-all duration-300 group-hover:border-[var(--gold)]/50 group-hover:shadow-[0_0_20px_rgba(212,160,23,0.25)]",
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
            className="text-[var(--gold)]"
          />
          <path
            d="M16 10L21 13V19L16 22L11 19V13L16 10Z"
            fill="currentColor"
            className="text-[var(--white)] transition-colors duration-300 group-hover:text-[var(--gold-light)]"
          />
        </svg>
      </span>

      {/* Wordmark */}
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-[family-name:var(--font-display)] tracking-[0.08em] text-[var(--white)] transition-all duration-300",
            compact ? "text-[1.35rem]" : "text-[1.55rem] lg:text-[1.7rem]",
          )}
        >
          EVOLUTION
        </span>
        <span
          className={cn(
            "font-[family-name:var(--font-nav)] font-medium tracking-[0.42em] text-[var(--white)]/55 uppercase transition-colors duration-300 group-hover:text-[var(--gold)]",
            compact ? "text-[8px]" : "text-[9px]",
          )}
        >
          Gym
        </span>
      </span>
    </Link>
  );
}
