import { Cormorant_Garamond, Inter } from "next/font/google";
import "./coorg.css";

/**
 * Golden Holidays festive campaign page. It carries the Golden Holidays
 * identity (forest / ivory / gold, Cormorant + Inter) rather than the main
 * site's navy/red, so the fonts and tokens are scoped to this route.
 * next/font self-hosts both families at build time: no runtime request to
 * Google, which keeps the landing page free of external dependencies.
 */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export default function CoorgLayout({ children }: { children: React.ReactNode }) {
  return <div className={`cg ${cormorant.variable} ${inter.variable}`}>{children}</div>;
}
