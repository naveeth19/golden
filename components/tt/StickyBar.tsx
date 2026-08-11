"use client";

import { TEL_HREF, waHref } from "@/lib/tt/content";

function track(section: string, action: "call" | "whatsapp") {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "tt_cta", section, action });
  }
}

/**
 * Fixed bottom Call/WhatsApp bar. Pure CSS positioning — no scroll listeners.
 *
 * Pages that render this must pad their own bottom so the last section is
 * never hidden: add `pb-[calc(64px+env(safe-area-inset-bottom))]` (or the
 * `rateLabel` variant's taller value) to the page wrapper.
 */
export default function StickyBar({
  section,
  waMessage,
  rateLabel,
}: {
  section: string;
  waMessage: string;
  /** Optional "From ₹X/km" shown left of the buttons (vehicle detail pages). */
  rateLabel?: string;
}) {
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[var(--gt-border)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="max-w-[1400px] mx-auto flex items-center gap-3 px-4 py-2.5">
        {rateLabel && (
          <div className="shrink-0 pr-1">
            <div className="text-[9px] uppercase tracking-[0.14em] text-[var(--gt-muted)]">From</div>
            <div
              className="text-lg leading-tight text-[var(--gt-navy)] whitespace-nowrap"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {rateLabel}
            </div>
          </div>
        )}
        <a
          href={waHref(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track(section, "whatsapp")}
          className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 bg-[#1faa53] text-white text-[11px] uppercase tracking-[0.08em] font-semibold px-3 hover:bg-[#178a43] transition-colors"
        >
          Get Rates on WhatsApp
        </a>
        <a
          href={TEL_HREF}
          onClick={() => track(section, "call")}
          className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-2 bg-[var(--gt-navy)] text-white text-[11px] uppercase tracking-[0.08em] font-semibold px-3 hover:bg-[var(--gt-red)] transition-colors"
        >
          Call Now
        </a>
      </div>
    </div>
  );
}
