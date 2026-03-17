"use client";

import { useState } from "react";
import type { ItineraryDay } from "@/lib/supabase/types";

export default function ItineraryAccordion({ days }: { days: ItineraryDay[] }) {
  const [openDay, setOpenDay] = useState<string | null>(days[0]?.id || null);

  return (
    <div className="space-y-3">
      {days.map((day) => (
        <div key={day.id} className="border border-[var(--gt-border)]">
          <button
            onClick={() => setOpenDay(openDay === day.id ? null : day.id)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-[var(--gt-cream)] transition-colors duration-200"
          >
            <div className="flex items-center gap-4">
              <span className="w-10 h-10 bg-[var(--gt-red)] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                {day.day_number}
              </span>
              <span className="text-sm font-semibold text-[var(--gt-navy)]">
                {day.title}
              </span>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-200 flex-shrink-0 ${openDay === day.id ? "rotate-180" : ""}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          {openDay === day.id && (
            <div className="px-4 pb-4 border-t border-[var(--gt-border)]">
              <div className="pt-4">
                <p className="text-sm text-[var(--gt-muted)] leading-relaxed mb-4 whitespace-pre-line">
                  {day.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(day.meals || []).map((meal) => (
                    <span
                      key={meal}
                      className="text-[10px] px-2.5 py-1 border border-[var(--gt-red)] text-[var(--gt-red)] font-medium"
                    >
                      {meal}
                    </span>
                  ))}
                  {day.overnight_at && (
                    <span className="text-[10px] px-2.5 py-1 border border-[var(--gt-navy)] text-[var(--gt-navy)] font-medium">
                      Overnight: {day.overnight_at}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
