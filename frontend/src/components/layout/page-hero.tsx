import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  className?: string;
  children?: ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  className,
  children,
}: PageHeroProps) {
  return (
    <header
      className={cn(
        "border-b border-[var(--border)] bg-[var(--black)] px-[var(--page-pad-x)] pt-[calc(var(--nav-height-mobile)+2rem)] pb-12 md:pb-16 lg:pt-[calc(var(--nav-height)+2.5rem)]",
        className,
      )}
    >
      <div className="container-page">
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold tracking-[0.3em] text-[var(--gold)] uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-4xl font-[family-name:var(--font-display)] text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.9] tracking-[0.02em] text-white">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--gray)] md:text-lg">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </header>
  );
}
