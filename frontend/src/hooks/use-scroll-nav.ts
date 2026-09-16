"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type ScrollNavState = {
  isScrolled: boolean;
  isHidden: boolean;
  direction: "up" | "down" | null;
  y: number;
};

type UseScrollNavOptions = {
  scrollThreshold?: number;
  hideThreshold?: number;
  disabled?: boolean;
};

const defaultState: ScrollNavState = {
  isScrolled: false,
  isHidden: false,
  direction: null,
  y: 0,
};

export function useScrollNav({
  scrollThreshold = 24,
  hideThreshold = 80,
  disabled = false,
}: UseScrollNavOptions = {}): ScrollNavState {
  const [state, setState] = useState<ScrollNavState>(defaultState);
  const lastY = useRef(0);
  const raf = useRef<number | null>(null);
  const reduceMotion = useRef(false);
  const hiddenRef = useRef(false);

  const update = useCallback(() => {
    raf.current = null;
    const y = window.scrollY || 0;
    const delta = y - lastY.current;
    const direction: "up" | "down" | null =
      Math.abs(delta) < 4 ? null : delta > 0 ? "down" : "up";

    const isScrolled = y > scrollThreshold;
    let isHidden = hiddenRef.current;

    if (disabled || reduceMotion.current || y <= scrollThreshold) {
      isHidden = false;
    } else if (direction === "down" && y > hideThreshold) {
      isHidden = true;
    } else if (direction === "up") {
      isHidden = false;
    }

    hiddenRef.current = isHidden;
    lastY.current = y;

    setState({
      isScrolled,
      isHidden,
      direction,
      y,
    });
  }, [disabled, hideThreshold, scrollThreshold]);

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const onScroll = () => {
      if (raf.current != null) return;
      raf.current = window.requestAnimationFrame(update);
    };

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = (e: MediaQueryListEvent) => {
      reduceMotion.current = e.matches;
      update();
    };

    mq.addEventListener("change", onMotionChange);
    lastY.current = window.scrollY || 0;
    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", onMotionChange);
      if (raf.current != null) window.cancelAnimationFrame(raf.current);
    };
  }, [update]);

  useEffect(() => {
    if (disabled) {
      hiddenRef.current = false;
      setState((prev) => ({ ...prev, isHidden: false }));
    }
  }, [disabled]);

  return state;
}
