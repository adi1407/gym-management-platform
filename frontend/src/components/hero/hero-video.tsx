"use client";

import { useEffect, useRef, useState } from "react";
import { MEDIA } from "@/lib/hero";
import { cn } from "@/lib/utils";
import { SafeImage } from "@/components/ui/safe-image";

type HeroVideoProps = {
  className?: string;
  reducedMotion?: boolean;
};

export function HeroVideo({ className, reducedMotion = false }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    const tryPlay = async () => {
      try {
        video.muted = true;
        await video.play();
      } catch {
        // Autoplay blocked — user still sees poster/frame
      }
    };

    tryPlay();
  }, [reducedMotion]);

  if (failed || reducedMotion) {
    return (
      <div
        className={cn("absolute inset-0 bg-[var(--black)]", className)}
        aria-hidden
      >
        <SafeImage
          src={MEDIA.heroPoster}
          alt=""
          className="absolute inset-0 h-full w-full max-w-none object-cover"
          style={{ height: "100%", width: "100%" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#080808_75%)]" />
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      className={cn(
        "absolute inset-0 h-full w-full max-w-none object-cover object-center",
        className,
      )}
      style={{ height: "100%", width: "100%" }}
      src={MEDIA.heroVideo}
      poster={MEDIA.heroPoster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      onError={() => setFailed(true)}
      aria-hidden
    />
  );
}
