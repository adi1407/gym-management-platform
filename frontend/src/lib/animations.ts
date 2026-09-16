export const EASE = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const DURATION = {
  micro: 0.2,
  normal: 0.35,
  section: 0.7,
  hero: 1,
} as const;

export const NAV_MOTION = {
  duration: DURATION.normal,
  ease: EASE.out,
} as const;
