import { IMG } from "@/data/home";

export const PROGRAMS = {
  strength: {
    slug: "strength",
    title: "Strength",
    eyebrow: "Barbell & progressive overload",
    headline: "BUILD POWER.",
    description:
      "Compound lifts, structured loading, and coaching that prioritizes form. Built for athletes who want measurable strength — not random workouts.",
    image: IMG.squat,
    focus: ["Squat / hinge / press", "Linear & undulating blocks", "Spotting & cues"],
    sessions: "3–5 days / week",
  },
  hiit: {
    slug: "hiit",
    title: "HIIT",
    eyebrow: "Conditioning & capacity",
    headline: "HIGH OUTPUT.",
    description:
      "Interval work that raises heart rate, builds engines, and still leaves room to recover. Intensity with intention — never chaos for its own sake.",
    image: IMG.weights,
    focus: ["Work:rest intervals", "Mixed modalities", "Heart-rate awareness"],
    sessions: "2–4 days / week",
  },
  functional: {
    slug: "functional",
    title: "Functional",
    eyebrow: "Move better in life & sport",
    headline: "MOVE BETTER.",
    description:
      "Stability, athleticism, and transferable strength for how you live and compete. Carry, rotate, jump, and control — with purpose.",
    image: IMG.kettle,
    focus: ["Unilateral strength", "Core & bracing", "Athletic patterns"],
    sessions: "2–4 days / week",
  },
  "fat-loss": {
    slug: "fat-loss",
    title: "Fat Loss",
    eyebrow: "Body composition",
    headline: "CHANGE THE LOOK.",
    description:
      "Training structured for sustainable composition change — strength retained, conditioning dialed, recovery respected.",
    image: IMG.cardio,
    focus: ["Strength + density", "Metabolic finishers", "Habit support"],
    sessions: "3–5 days / week",
  },
  mobility: {
    slug: "mobility",
    title: "Mobility",
    eyebrow: "Range, recovery, longevity",
    headline: "RECOVER STRONG.",
    description:
      "Range of motion, soft-tissue work, and reset protocols so you keep training for years — not weeks. Mobility is performance insurance.",
    image: IMG.yoga,
    focus: ["Joint CAP", "Breath & reset", "Prehab patterns"],
    sessions: "2–3 days / week",
  },
} as const;

export type ProgramSlug = keyof typeof PROGRAMS;

export const TRAINERS = {
  "aarav-mehta": {
    slug: "aarav-mehta",
    name: "Aarav Mehta",
    role: "Strength Coach",
    focus: "Powerlifting · Hypertrophy",
    bio: "Ten years programming strength blocks for beginners through competitive lifters. Form first, ego second.",
    image: IMG.athlete,
  },
  "priya-shah": {
    slug: "priya-shah",
    name: "Priya Shah",
    role: "HIIT Specialist",
    focus: "Conditioning · Fat loss",
    bio: "High-output sessions with smart recovery so intensity never becomes chaos.",
    image: IMG.rope,
  },
  "rohan-kapoor": {
    slug: "rohan-kapoor",
    name: "Rohan Kapoor",
    role: "Performance Coach",
    focus: "Athleticism · Speed",
    bio: "Builds transferable strength for field sports and everyday performance.",
    image: IMG.boxing,
  },
  "ananya-iyer": {
    slug: "ananya-iyer",
    name: "Ananya Iyer",
    role: "Mobility Lead",
    focus: "Recovery · Range",
    bio: "Keeps members moving well so long-term progress doesn’t stall.",
    image:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=800&q=80",
  },
  "kabir-singh": {
    slug: "kabir-singh",
    name: "Kabir Singh",
    role: "Hypertrophy Coach",
    focus: "Muscle · Physique",
    bio: "Volume, technique, and nutrition literacy for physique-focused athletes.",
    image: IMG.dumbbells,
  },
} as const;

export type TrainerSlug = keyof typeof TRAINERS;
