import { MEMBERSHIP_PLANS } from "@/data/home";

export const MEMBERSHIP_VALUE_POINTS = [
  {
    title: "Full floor access",
    body: "Strength, conditioning, and recovery zones — open during gym hours.",
  },
  {
    title: "Classes included",
    body: "Trainer-led group sessions on every plan. Book spots from the front desk.",
  },
  {
    title: "Coach culture",
    body: "Form checks, programming tips, and a community that shows up.",
  },
  {
    title: "Free 1-day visit",
    body: "Try the floor before you commit. Book a complimentary visit online.",
  },
] as const;

export const MEMBERSHIP_STEPS = [
  {
    step: "01",
    title: "Pick a plan",
    body: "Monthly for flexibility, quarterly for momentum, yearly for best value.",
  },
  {
    step: "02",
    title: "Book a free visit",
    body: "Choose a day this month or next, pick a time slot, and leave your details.",
  },
  {
    step: "03",
    title: "Train with us",
    body: "Tour the floor, meet a coach, and lock your membership at the desk.",
  },
] as const;

export const MEMBERSHIP_COMPARE_ROWS = [
  { feature: "Full gym access", monthly: true, quarterly: true, yearly: true },
  { feature: "Locker & showers", monthly: true, quarterly: true, yearly: true },
  { feature: "Group class entry", monthly: true, quarterly: true, yearly: true },
  { feature: "Intro assessment", monthly: true, quarterly: true, yearly: true },
  { feature: "Priority class booking", monthly: false, quarterly: true, yearly: true },
  { feature: "Guest passes", monthly: false, quarterly: "1 / mo", yearly: "2 / mo" },
  { feature: "Form check session", monthly: false, quarterly: true, yearly: true },
  { feature: "PT kickoff sessions", monthly: false, quarterly: false, yearly: "2 included" },
  { feature: "Membership freeze", monthly: false, quarterly: "Ask desk", yearly: "Up to 30 days" },
  { feature: "Member events", monthly: false, quarterly: false, yearly: true },
] as const;

export const MEMBERSHIP_FAQS = [
  {
    q: "Can I try before I pay?",
    a: "Yes. Use the join flow to book a free 1-day visit. You’ll train on the floor, then decide on a plan with our team.",
  },
  {
    q: "What’s included in every plan?",
    a: "Full gym access during opening hours, locker & showers, group class entry, and an intro assessment so coaches know your starting point.",
  },
  {
    q: "How do freezes work?",
    a: "Yearly members can freeze up to 30 days for travel or injury. Quarterly freezes are case-by-case — talk to the front desk.",
  },
  {
    q: "Is personal training included?",
    a: "Group classes are included. Personal training is booked separately, except yearly plans which include two PT kickoff sessions.",
  },
  {
    q: "Can I switch plans later?",
    a: "Yes. Upgrade anytime and we’ll prorate when possible. Downgrades apply at the next renewal — ask reception for details.",
  },
] as const;

/** Extended plan copy for the dedicated memberships page */
export const MEMBERSHIP_PLAN_DETAILS = MEMBERSHIP_PLANS.map((plan) => {
  const extras: Record<
    string,
    { bestFor: string; monthlyEq: string; tagline: string; extras: string[] }
  > = {
    monthly: {
      bestFor: "Testing the gym or short stays",
      monthlyEq: "₹2,499 / mo",
      tagline: "Stay flexible. Cancel at the end of your month.",
      extras: ["No long lock-in", "Ideal after a free visit", "Upgrade anytime"],
    },
    quarterly: {
      bestFor: "Building a consistent habit",
      monthlyEq: "~₹2,166 / mo",
      tagline: "Three months of focus with priority booking and guest passes.",
      extras: [
        "Best balance of price & commitment",
        "Priority class slots",
        "1 guest pass every month",
      ],
    },
    yearly: {
      bestFor: "Serious progress & best savings",
      monthlyEq: "~₹1,833 / mo",
      tagline: "Lowest monthly rate, freeze options, and coaching kickoff.",
      extras: [
        "Largest savings vs monthly",
        "2 PT kickoff sessions",
        "Freeze up to 30 days",
      ],
    },
  };

  return { ...plan, ...extras[plan.slug] };
});
