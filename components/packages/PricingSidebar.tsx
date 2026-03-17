"use client";

import { useEffect, useState } from "react";
import type { Package, PricingTier } from "@/lib/supabase/types";

export default function PricingSidebar({
  pkg,
  pricingTiers,
  count,
  setCount,
  matchedTier,
}: {
  pkg: Package;
  pricingTiers: PricingTier[];
  count: number;
  setCount: (n: number) => void;
  matchedTier: PricingTier | null;
}) {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(true);
    const t = setTimeout(() => setFade(false), 200);
    return () => clearTimeout(t);
  }, [count]);

  function decrement() {
    if (count > 1) setCount(count - 1);
  }

  function increment() {
    if (count < 50) setCount(count + 1);
  }

  function handleDirectInput(val: string) {
    const n = parseInt(val);
    if (!isNaN(n) && n >= 1 && n <= 50) setCount(n);
  }

  const isPP = pkg.pricing_type === "per_person";
  const price = matchedTier ? Number(matchedTier.price) : 0;
  const total = isPP ? price * count : price;

  const vehicleName = matchedTier?.vehicle_name || "";

  let waMsg = `Hi, I'm interested in ${pkg.title}. We are ${count} people.`;
  if (pkg.show_vehicle && vehicleName) {
    waMsg += ` We'd need a ${vehicleName}.`;
  }
  waMsg += " Please share availability and confirm pricing.";

  return (
    <div className="sticky top-[100px] bg-white border border-[var(--gt-border)] p-6">
      {/* People Counter */}
      <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-3">
        How many people?
      </label>
      <div className="flex items-center gap-0 mb-6">
        <button
          type="button"
          onClick={decrement}
          className="w-10 h-10 border border-[var(--gt-border)] flex items-center justify-center text-[var(--gt-navy)] hover:bg-[var(--gt-cream)] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <input
          type="number"
          value={count}
          onChange={(e) => handleDirectInput(e.target.value)}
          min={1}
          max={50}
          className="w-16 h-10 border-y border-[var(--gt-border)] text-center text-lg font-bold text-[var(--gt-navy)] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          type="button"
          onClick={increment}
          className="w-10 h-10 border border-[var(--gt-border)] flex items-center justify-center text-[var(--gt-navy)] hover:bg-[var(--gt-cream)] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      {/* Dynamic Pricing */}
      <div className={`mb-6 transition-opacity duration-200 ${fade ? "opacity-50" : "opacity-100"}`}>
        {matchedTier ? (
          <div>
            {isPP ? (
              <>
                <div className="text-2xl font-bold text-[var(--gt-red)]" style={{ fontFamily: "var(--font-playfair)" }}>
                  &#8377;{total.toLocaleString("en-IN")}
                </div>
                <p className="text-xs text-[var(--gt-muted)] mt-1">
                  &#8377;{price.toLocaleString("en-IN")} x {count} {count === 1 ? "person" : "people"}
                </p>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold text-[var(--gt-red)]" style={{ fontFamily: "var(--font-playfair)" }}>
                  &#8377;{price.toLocaleString("en-IN")}
                </div>
                <p className="text-xs text-[var(--gt-muted)] mt-1">per vehicle</p>
              </>
            )}
            {pkg.show_vehicle && vehicleName && (
              <p className="text-xs text-[var(--gt-navy)] font-medium mt-2">
                Recommended vehicle: {vehicleName}
              </p>
            )}
          </div>
        ) : pricingTiers.length > 0 ? (
          <p className="text-sm text-[var(--gt-muted)]">
            Contact us for a custom quote
          </p>
        ) : pkg.price_from > 0 ? (
          <div>
            <div className="text-2xl font-bold text-[var(--gt-red)]" style={{ fontFamily: "var(--font-playfair)" }}>
              From &#8377;{pkg.price_from.toLocaleString("en-IN")}
            </div>
            <p className="text-xs text-[var(--gt-muted)] mt-1">per person</p>
          </div>
        ) : (
          <p className="text-sm text-[var(--gt-muted)]">Contact us for pricing</p>
        )}
      </div>

      {/* WhatsApp CTA */}
      <a
        href={`https://wa.me/919902933877?text=${encodeURIComponent(waMsg)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white text-[11px] uppercase tracking-[0.15em] font-semibold px-6 py-3.5 hover:bg-[#1da851] transition-colors mb-3"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        WhatsApp Us
      </a>

      {/* Call button */}
      <a
        href="tel:+919845033877"
        className="w-full inline-flex items-center justify-center gap-2 border border-[var(--gt-navy)] text-[var(--gt-navy)] text-[11px] uppercase tracking-[0.15em] font-semibold px-6 py-3.5 hover:bg-[var(--gt-navy)] hover:text-white transition-colors mb-4"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        +91 98450 33877
      </a>

      <p className="text-xs text-[var(--gt-muted)] text-center">
        No advance payment required. Confirm on WhatsApp.
      </p>
    </div>
  );
}
