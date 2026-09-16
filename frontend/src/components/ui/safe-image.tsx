"use client";

import {
  useEffect,
  useState,
  type ImgHTMLAttributes,
  type SyntheticEvent,
} from "react";
import { IMG_FALLBACK } from "@/data/home";
import { cn } from "@/lib/utils";

type SafeImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  /** Override fallback when primary src fails */
  fallbackSrc?: string;
};

/**
 * Always shows a gym photo — swaps to a verified fallback if the primary URL 404s.
 */
export function SafeImage({
  src,
  fallbackSrc = IMG_FALLBACK,
  alt = "",
  className,
  onError,
  ...props
}: SafeImageProps) {
  const [current, setCurrent] = useState(src || fallbackSrc);

  useEffect(() => {
    setCurrent(src || fallbackSrc);
  }, [src, fallbackSrc]);

  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    if (current !== fallbackSrc) {
      setCurrent(fallbackSrc);
    }
    onError?.(event);
  };

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      src={current}
      alt={alt}
      className={cn("bg-[var(--card)]", className)}
      onError={handleError}
      loading={props.loading ?? "lazy"}
      decoding="async"
    />
  );
}
