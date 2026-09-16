import type { CarouselItem } from "@/components/ui/3-d-coverflow-carousel";
import type { StackSpreadCard } from "@/components/ui/stack-spread";
import type { InfiniteSpiralItem } from "@/components/InfiniteSpiral";

export const GYM = {
  name: "Evolution Gym",
  tagline: "Train harder. Move better. Become stronger.",
  city: "Your City",
} as const;

/** Replace with real business metrics when available */
export const TRUST_STATS = [
  { value: "10K+", label: "Active Members" },
  { value: "15+", label: "Years Strong" },
  { value: "4.9", label: "Member Rating" },
  { value: "20+", label: "Expert Coaches" },
] as const;

export const TRAINER_TOOLTIPS = [
  {
    id: 1,
    name: "Aarav Mehta",
    designation: "Strength Coach",
    image:
      "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Priya Shah",
    designation: "HIIT Specialist",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Rohan Kapoor",
    designation: "Performance Coach",
    image:
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    name: "Ananya Iyer",
    designation: "Mobility Lead",
    image:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 5,
    name: "Kabir Singh",
    designation: "Hypertrophy Coach",
    image:
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=400&q=80",
  },
];

/** Verified Unsplash gym assets (404s replaced May 2026 audit) */
export const IMG = {
  floor:
    "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1400&q=80",
  weights:
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
  group:
    "https://images.unsplash.com/photo-1550345332-09e3ac987658?auto=format&fit=crop&w=1200&q=80",
  squat:
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
  cardio:
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80",
  rope: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80",
  yoga: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=80",
  kettle:
    "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1200&q=80",
  racks:
    "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=80",
  dumbbells:
    "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=80",
  machines:
    "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1200&q=80",
  stretching:
    "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=1200&q=80",
  class:
    "https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=1200&q=80",
  athlete:
    "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=80",
  boxing:
    "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1200&q=80",
} as const;

/** Shared fallback if a remote image fails to load */
export const IMG_FALLBACK = IMG.floor;

export const STORY = {
  image: IMG.floor,
  philosophy:
    "Built for people who refuse to settle. Train with purpose. Progress with discipline. No shortcuts — just consistent work and a community that holds the standard.",
  pillars: [
    {
      title: "Standards",
      body: "Programming with intent. Coaching that corrects. Spaces that demand focus.",
    },
    {
      title: "Community",
      body: "Train beside people who show up — for the work and for each other.",
    },
    {
      title: "Results",
      body: "Strength, conditioning, and longevity measured in progress — not noise.",
    },
  ],
} as const;

export const FLOWING_PROGRAMS = [
  {
    link: "/programs/strength",
    text: "Strength",
    image: IMG.squat,
  },
  {
    link: "/programs/hiit",
    text: "HIIT",
    image: IMG.weights,
  },
  {
    link: "/programs/functional",
    text: "Functional",
    image: IMG.group,
  },
  {
    link: "/programs/fat-loss",
    text: "Fat Loss",
    image: IMG.cardio,
  },
  {
    link: "/programs/mobility",
    text: "Mobility",
    image: IMG.yoga,
  },
];

export const PROGRAM_CAROUSEL: CarouselItem[] = [
  {
    tag: "#Strength",
    titleLine1: "STRENGTH",
    titleLine2: "– BUILD POWER",
    desc: "Progressive loading, compound lifts, and serious muscle development under expert eyes.",
    img: IMG.squat,
    ctaText: "View Program",
    ctaUrl: "/programs/strength",
  },
  {
    tag: "#HIIT",
    titleLine1: "HIIT",
    titleLine2: "– HIGH INTENSITY",
    desc: "Conditioning that pushes output, heart rate, and recovery — then builds capacity.",
    img: IMG.weights,
    ctaText: "View Program",
    ctaUrl: "/programs/hiit",
  },
  {
    tag: "#Functional",
    titleLine1: "FUNCTIONAL",
    titleLine2: "– MOVE BETTER",
    desc: "Stability, athleticism, and real-world performance for how you live and compete.",
    img: IMG.group,
    ctaText: "View Program",
    ctaUrl: "/programs/functional",
  },
  {
    tag: "#FatLoss",
    titleLine1: "FAT LOSS",
    titleLine2: "– BODY COMPOSITION",
    desc: "Structured training designed for sustainable body composition change.",
    img: IMG.cardio,
    ctaText: "View Program",
    ctaUrl: "/programs/fat-loss",
  },
  {
    tag: "#Mobility",
    titleLine1: "MOBILITY",
    titleLine2: "– RECOVER STRONG",
    desc: "Range, recovery, and longevity so you keep training for years — not weeks.",
    img: IMG.yoga,
    ctaText: "View Program",
    ctaUrl: "/programs/mobility",
  },
];

export const FEATURES = [
  {
    num: "01",
    title: "Premium Equipment",
    body: "Free weights, machines, and specialty tools maintained for serious training.",
  },
  {
    num: "02",
    title: "Expert Coaches",
    body: "Certified trainers who program, cue, and hold you accountable.",
  },
  {
    num: "03",
    title: "Purpose-Built Zones",
    body: "Strength floor, conditioning bay, and recovery space — each with a job.",
  },
  {
    num: "04",
    title: "Group Classes",
    body: "Trainer-led sessions that combine intensity with community energy.",
  },
  {
    num: "05",
    title: "Personal Training",
    body: "1:1 coaching tailored to your goals, schedule, and starting point.",
  },
  {
    num: "06",
    title: "Recovery & Mobility",
    body: "Protocols that keep you moving well so progress doesn’t stall.",
  },
] as const;

export const MEMBERSHIP_PLANS = [
  {
    name: "Monthly",
    price: "₹2,499",
    period: "/mo",
    note: "Flexible start",
    href: "/join",
    featured: false,
    savings: null,
    features: [
      "Full gym access",
      "Locker & showers",
      "Group class entry",
      "Intro assessment",
    ],
  },
  {
    name: "Quarterly",
    price: "₹6,499",
    period: "/qtr",
    note: "Most popular",
    href: "/join",
    featured: true,
    savings: "Save ~13%",
    features: [
      "Everything in Monthly",
      "Priority class booking",
      "1 guest pass / month",
      "Form check session",
    ],
  },
  {
    name: "Yearly",
    price: "₹21,999",
    period: "/yr",
    note: "Best value",
    href: "/join",
    featured: false,
    savings: "Save ~27%",
    features: [
      "Everything in Quarterly",
      "2 PT kickoff sessions",
      "Freeze up to 30 days",
      "Member events access",
    ],
  },
] as const;

const s = (n: number) => n;

export const COMMUNITY_CARDS: StackSpreadCard[] = [
  {
    item: { src: IMG.floor, alt: "Open training floor" },
    stackOffset: { x: -8, y: -10 },
    stackRotate: -18,
    target: { x: -20, y: -34, rotate: 0, scale: s(0.7), w: 17, h: 22 },
    targetSm: { x: -22, y: -40 },
    z: 2,
  },
  {
    item: { src: IMG.yoga, alt: "Mobility class" },
    stackOffset: { x: 14, y: -10 },
    stackRotate: 20,
    target: { x: 32, y: -30, rotate: 0, scale: s(0.9), w: 18, h: 32 },
    targetSm: { x: 22, y: -40 },
    z: 3,
  },
  {
    item: { src: IMG.kettle, alt: "Kettlebell work" },
    stackOffset: { x: -16, y: 0 },
    stackRotate: -4,
    target: { x: -36, y: -2, rotate: 0, scale: s(0.9), w: 15, h: 32 },
    targetSm: { x: -22, y: -19 },
    z: 4,
  },
  {
    item: { src: IMG.squat, alt: "Barbell strength" },
    stackOffset: { x: 1, y: -10 },
    stackRotate: -2,
    target: { x: 6, y: -32, rotate: 0, scale: s(0.8), w: 25, h: 30 },
    targetSm: { x: 22, y: -19 },
    z: 5,
  },
  {
    item: { src: IMG.cardio, alt: "Conditioning" },
    stackOffset: { x: 18, y: 1 },
    stackRotate: 6,
    target: { x: 37, y: 6, rotate: 0, scale: s(0.8), w: 18, h: 32 },
    targetSm: { x: -22, y: 20 },
    z: 6,
  },
  {
    item: { src: IMG.rope, alt: "Battle ropes" },
    stackOffset: { x: -6, y: 10 },
    stackRotate: 6,
    target: { x: -24, y: 34, rotate: 0, scale: s(0.9), w: 22, h: 25 },
    targetSm: { x: 22, y: 20 },
    z: 7,
  },
  {
    item: { src: IMG.class, alt: "Group training" },
    stackOffset: { x: 8, y: 7 },
    stackRotate: 3,
    target: { x: 2, y: 36, rotate: 0, scale: s(0.8), w: 20, h: 26 },
    targetSm: { x: -22, y: 40 },
    z: 8,
  },
  {
    item: { src: IMG.weights, alt: "Free weights" },
    stackOffset: { x: 20, y: 12 },
    stackRotate: -7,
    target: { x: 30, y: 34, rotate: 0, scale: s(0.9), w: 16, h: 20 },
    targetSm: { x: 22, y: 40 },
    z: 9,
  },
];

/** Facility / lifestyle gallery for InfiniteSpiral */
export const FACILITY_SPIRAL: InfiniteSpiralItem[] = [
  { src: IMG.floor, alt: "Main training floor" },
  { src: IMG.racks, alt: "Strength racks" },
  { src: IMG.dumbbells, alt: "Dumbbell zone" },
  { src: IMG.group, alt: "Group class" },
  { src: IMG.class, alt: "Coach-led session" },
  { src: IMG.rope, alt: "Conditioning bay" },
  { src: IMG.yoga, alt: "Mobility studio" },
  { src: IMG.machines, alt: "Machine circuit" },
  { src: IMG.kettle, alt: "Kettlebell training" },
  { src: IMG.athlete, alt: "Athlete training" },
];

/** Member journey steps — AccordionGallery on Join CTA */
export const JOURNEY_GALLERY = [
  {
    image: IMG.floor,
    label: "01 · Walk In",
    link: "/locations",
    alt: "Step onto the Evolution Gym floor",
  },
  {
    image: IMG.group,
    label: "02 · Assess",
    link: "/contact",
    alt: "Coach assessment and goal setting",
  },
  {
    image: IMG.squat,
    label: "03 · Train",
    link: "/programs",
    alt: "Structured strength and conditioning",
  },
  {
    image: IMG.rope,
    label: "04 · Push",
    link: "/programs/hiit",
    alt: "Intensity with coaching support",
  },
  {
    image: IMG.yoga,
    label: "05 · Evolve",
    link: "/join",
    alt: "Long-term progress and recovery",
  },
] as const;
