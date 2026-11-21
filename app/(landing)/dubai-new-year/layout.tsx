import { display, displayItalic, sans } from "@/components/dubai-nye/fonts";
import "./dnye.css";

/**
 * Golden Holidays "New Year's Eve in Dubai 2027" campaign page. Fonts and the
 * midnight-gala tokens are scoped to this route (same pattern as the Coorg page).
 */
export default function DubaiNyeLayout({ children }: { children: React.ReactNode }) {
  return <div className={`dnye ${display.variable} ${displayItalic.variable} ${sans.variable}`}>{children}</div>;
}
