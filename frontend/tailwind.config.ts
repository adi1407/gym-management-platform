import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "var(--black)",
        surface: "var(--surface)",
        card: "var(--card)",
        gold: {
          DEFAULT: "var(--gold)",
          light: "var(--gold-light)",
        },
        orange: {
          DEFAULT: "var(--orange)",
          light: "var(--orange-light)",
        },
        white: "var(--white)",
        gray: "var(--gray)",
        border: "var(--border)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        heading: ["var(--font-display)", "Impact", "sans-serif"],
        hero: ["var(--font-display)", "Impact", "sans-serif"],
        number: ["var(--font-display)", "Impact", "sans-serif"],
        nav: ["var(--font-body)", "system-ui", "sans-serif"],
        button: ["var(--font-body)", "system-ui", "sans-serif"],
        form: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        input:
          "0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
