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
  contact: "/contact",
  faq: "/faq",
  admin: "/admin",
  adminLogin: "/admin/login",
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
} as const;
