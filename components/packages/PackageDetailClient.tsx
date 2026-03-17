"use client";

import { useState } from "react";
import type { Package, ItineraryDay, PricingTier } from "@/lib/supabase/types";
import HeroSection from "./HeroSection";
import PricingSidebar from "./PricingSidebar";
import GalleryGrid from "./GalleryGrid";
import VideoSection from "./VideoSection";
import ItineraryAccordion from "./ItineraryAccordion";
import PricingTable from "./PricingTable";

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export default function PackageDetailClient({
  pkg,
  days,
  pricingTiers,
}: {
  pkg: Package;
  days: ItineraryDay[];
  pricingTiers: PricingTier[];
}) {
  const [count, setCount] = useState(2);

  const matchedTier = pricingTiers.find(
    (t) => count >= t.min_people && count <= t.max_people
  );

  const heroVideoId =
    pkg.youtube_urls && pkg.youtube_urls.length > 0
      ? extractVideoId(pkg.youtube_urls[0])
      : null;

  return (
    <>
      <HeroSection
        pkg={pkg}
        heroVideoId={heroVideoId}
        heroVideoUrl={pkg.youtube_urls?.[0] || null}
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <div id="overview">
                <h2
                  className="text-2xl font-bold text-[var(--gt-navy)] mb-4"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Overview
                </h2>
                <p className="text-[var(--gt-muted)] text-sm leading-relaxed whitespace-pre-line mb-6">
                  {pkg.overview}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <HighlightCell
                    icon={<CalendarIcon />}
                    label="Duration"
                    value={`${pkg.duration_days} Days`}
                  />
                  <HighlightCell
                    icon={<TypeIcon />}
                    label="Trip Type"
                    value={pkg.type.charAt(0).toUpperCase() + pkg.type.slice(1)}
                  />
                  <HighlightCell
                    icon={<UsersIcon />}
                    label="Group Size"
                    value="2 - 50 People"
                  />
                  {pkg.show_vehicle && matchedTier?.vehicle_name && (
                    <HighlightCell
                      icon={<VehicleIcon />}
                      label="Vehicle"
                      value={matchedTier.vehicle_name}
                    />
                  )}
                  <HighlightCell
                    icon={<MapIcon />}
                    label="Departure"
                    value="Bengaluru"
                  />
                  <HighlightCell
                    icon={<MealIcon />}
                    label="Meals"
                    value={pkg.inclusions?.some((i) => i.toLowerCase().includes("meal") || i.toLowerCase().includes("breakfast") || i.toLowerCase().includes("food")) ? "Included" : "As per plan"}
                  />
                </div>
              </div>

              {/* Gallery */}
              {pkg.images && pkg.images.length > 0 && (
                <div id="gallery">
                  <h2
                    className="text-2xl font-bold text-[var(--gt-navy)] mb-4"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Gallery
                  </h2>
                  <GalleryGrid images={pkg.images} />
                  <p className="text-xs text-[var(--gt-muted)] mt-2">
                    {pkg.images.length} photos -- Click any to view full size
                  </p>
                </div>
              )}

              {/* Videos */}
              {pkg.youtube_urls && pkg.youtube_urls.length > 0 && (
                <div id="videos">
                  <h2
                    className="text-2xl font-bold text-[var(--gt-navy)] mb-4"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Trip Videos
                  </h2>
                  <VideoSection youtubeUrls={pkg.youtube_urls} />
                </div>
              )}

              {/* Itinerary */}
              {days.length > 0 && (
                <div id="itinerary">
                  <h2
                    className="text-2xl font-bold text-[var(--gt-navy)] mb-4"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Day by Day Itinerary
                  </h2>
                  <ItineraryAccordion days={days} />
                </div>
              )}

              {/* Inclusions & Exclusions */}
              {((pkg.inclusions && pkg.inclusions.length > 0) ||
                (pkg.exclusions && pkg.exclusions.length > 0)) && (
                <div id="inclusions" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {pkg.inclusions && pkg.inclusions.length > 0 && (
                    <div>
                      <h3
                        className="text-lg font-bold text-green-700 mb-4"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        Inclusions
                      </h3>
                      <ul className="space-y-2">
                        {pkg.inclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[var(--gt-muted)]">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {pkg.exclusions && pkg.exclusions.length > 0 && (
                    <div>
                      <h3
                        className="text-lg font-bold text-red-700 mb-4"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        Exclusions
                      </h3>
                      <ul className="space-y-2">
                        {pkg.exclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[var(--gt-muted)]">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Pricing Table */}
              {pricingTiers.length > 0 && (
                <div id="pricing">
                  <h2
                    className="text-2xl font-bold text-[var(--gt-navy)] mb-4"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Pricing
                  </h2>
                  <PricingTable
                    tiers={pricingTiers}
                    count={count}
                    showVehicle={pkg.show_vehicle}
                  />
                  <p className="text-xs text-[var(--gt-muted)] mt-3">
                    Prices are indicative. WhatsApp us for a confirmed quote.
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 order-first lg:order-last">
              <PricingSidebar
                pkg={pkg}
                pricingTiers={pricingTiers}
                count={count}
                setCount={setCount}
                matchedTier={matchedTier || null}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function HighlightCell({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="border border-[var(--gt-border)] p-4">
      <div className="flex items-center gap-2 mb-1 text-[var(--gt-muted)]">
        {icon}
        <span className="text-[10px] uppercase tracking-wider font-semibold">{label}</span>
      </div>
      <p className="text-sm font-semibold text-[var(--gt-navy)]">{value}</p>
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function TypeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function VehicleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17h14M5 17a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2.5l1.5-2h6l1.5 2H19a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2M5 17l-1 2h16l-1-2" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MealIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  );
}
