"use client";

import { TEL_HREF, waHref } from "@/lib/tt/content";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Fire a conversion event for Google Ads attribution. Safe when GTM absent. */
function track(section: string, action: "call" | "whatsapp") {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "tt_cta", section, action });
  }
}

/**
 * The one CTA unit for the whole segment: Call + WhatsApp, equal weight,
 * side by side. Never render a competing third action next to it.
 *
 * 44px minimum tap height; buttons stretch full-width on narrow screens.
 */
export default function CtaPair({
  section,
  waMessage,
  dark = false,
  className = "",
}: {
  /** Section name pushed to dataLayer, e.g. "hero", "rates", "card:urbania-9". */
  section: string;
  /** Prefilled WhatsApp text — build with WA_MESSAGES in lib/tt/content. */
  waMessage: string;
  /** Set on dark backgrounds; flips the Call button's outline colours. */
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a
        href={waHref(waMessage)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track(section, "whatsapp")}
        className="flex-1 min-w-[160px] min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#1faa53] text-white text-[12px] uppercase tracking-[0.1em] font-semibold px-5 hover:bg-[#178a43] transition-colors"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2.05 22l5.3-1.38a9.87 9.87 0 0 0 4.69 1.19h.01c5.46 0 9.9-4.44 9.9-9.9a9.83 9.83 0 0 0-2.9-7A9.83 9.83 0 0 0 12.04 2zm0 18.1a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29z" />
        </svg>
        Get Rates on WhatsApp
      </a>
      <a
        href={TEL_HREF}
        onClick={() => track(section, "call")}
        className={`flex-1 min-w-[130px] min-h-[48px] inline-flex items-center justify-center gap-2 border text-[12px] uppercase tracking-[0.1em] font-semibold px-5 transition-colors ${
          dark
            ? "border-white/40 text-white hover:bg-white/10"
            : "border-[var(--gt-navy)] text-[var(--gt-navy)] hover:bg-[var(--gt-navy)] hover:text-white"
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        Call Now
      </a>
    </div>
  );
}
