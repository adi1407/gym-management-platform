import { Bebas_Neue, Inter } from "next/font/google";

/**
 * Display font — headings, hero, numbers
 */
export const fontDisplay = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

/**
 * Body font — body, navigation, buttons, forms
 */
export const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
