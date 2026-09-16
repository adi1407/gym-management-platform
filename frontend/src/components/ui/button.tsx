import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-[family-name:var(--font-button)] text-sm font-semibold tracking-wide uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--black)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--orange)] text-[var(--black)] hover:bg-[var(--orange-light)]",
        ghost:
          "bg-transparent text-[var(--white)] hover:text-[var(--gold-light)]",
        outline:
          "border border-[var(--border)] bg-transparent text-[var(--white)] hover:border-[var(--gold)] hover:text-[var(--gold-light)]",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6",
        lg: "h-12 px-8 text-base",
      },
      radius: {
        default: "rounded-md",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      radius: "default",
    },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    href?: string;
    children?: ReactNode;
  };

export function Button({
  className,
  variant,
  size,
  radius,
  href,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size, radius }), className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}

export { buttonVariants };
