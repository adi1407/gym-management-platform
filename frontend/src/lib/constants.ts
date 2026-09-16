export const SITE_NAME = "Evolution Gym";

export const ROUTES = {
  home: "/",
  about: "/about",
  programs: "/programs",
  memberships: "/memberships",
  trainers: "/trainers",
  locations: "/locations",
  transformations: "/transformations",
  blog: "/blog",
  join: "/join",
  login: "/login",
  contact: "/contact",
  faq: "/faq",
} as const;

export type NavLink = {
  label: string;
  href: string;
};

/** Primary navbar — keep to 5 items for clarity */
export const NAV_LINKS: NavLink[] = [
  { label: "About", href: ROUTES.about },
  { label: "Programs", href: ROUTES.programs },
  { label: "Memberships", href: ROUTES.memberships },
  { label: "Trainers", href: ROUTES.trainers },
  { label: "Locations", href: ROUTES.locations },
];

export const CTA = {
  join: { label: "Join Now", href: ROUTES.join },
  login: { label: "Login", href: ROUTES.login },
} as const;
