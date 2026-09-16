export const MEDIA = {
  heroVideo: "/hero.mp4",
  heroPoster:
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80",
} as const;

export const HERO_COPY = {
  eyebrow: "The new standard of fitness",
  lines: ["BUILD", "YOUR", "STRONGEST", "VERSION."] as const,
  support: "Train harder. Move better. Become stronger.",
  primaryCta: { label: "Join Now", href: "/join" },
  secondaryCta: { label: "Explore Memberships", href: "/memberships" },
} as const;
