import { Manrope, Playfair_Display } from "next/font/google";

// High-contrast display serif + clean grotesk. next/font self-hosts both and
// generates metric-matched fallbacks, so swapping causes no layout shift.
export const display = Playfair_Display({
  subsets: ["latin"],
  style: ["normal"],
  variable: "--font-dnye-display",
  display: "swap",
});

// The italic is only used for accent words, so it is not preloaded
// (keeps the critical path to two font files for a faster LCP).
export const displayItalic = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-dnye-display-italic",
  display: "swap",
  preload: false,
});

export const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-dnye-sans",
  display: "swap",
});
