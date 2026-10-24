import { Inter } from "next/font/google";
import "./tripos.css";

/**
 * TripOS has its own product identity, so it gets its own typeface. next/font
 * self-hosts Inter at build time — no runtime request to Google — and only
 * this route preloads it.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function TriposLayout({ children }: { children: React.ReactNode }) {
  return <div className={`tp ${inter.variable} min-h-screen`}>{children}</div>;
}
