import { createClient } from "@/lib/supabase/server";
import type { Package, ItineraryDay } from "@/lib/supabase/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { waLink } from "@/lib/wa";
import ItineraryAccordion from "@/components/packages/ItineraryAccordion";
import GalleryGrid from "@/components/packages/GalleryGrid";
import VideoSection from "@/components/packages/VideoSection";
import PricingTable from "@/components/packages/PricingTable";
import PackageCard from "@/components/packages/PackageCard";

const typeColors: Record<string, string> = {
  pilgrimage: "bg-[#4A1520]",
  outstation: "bg-[#1A3A2A]",
  airport: "bg-[#1A2A4A]",
  corporate: "bg-[var(--gt-navy-dark)]",
};

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: pkg } = await supabase
    .from("packages")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!pkg) return { title: "Package Not Found" };

  return {
    title: `${pkg.title} - ${pkg.type.charAt(0).toUpperCase() + pkg.type.slice(1)} Package`,
    description: pkg.overview?.slice(0, 160) || `${pkg.title} - a curated ${pkg.type} package by Golden Travels, Bengaluru.`,
  };
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: pkg } = await supabase
    .from("packages")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!pkg) notFound();

  const p = pkg as Package;

  const { data: itinerary } = await supabase
    .from("itinerary_days")
    .select("*")
    .eq("package_id", p.id)
    .order("day_number", { ascending: true });

  const days: ItineraryDay[] = itinerary || [];

  const { data: similar } = await supabase
    .from("packages")
    .select("*")
    .eq("type", p.type)
    .eq("is_active", true)
    .neq("slug", p.slug)
    .limit(3);

  const similarPkgs: Package[] = similar || [];

  return (
    <>
      {/* Hero */}
      <section className={`${typeColors[p.type] || "bg-[var(--gt-navy)]"} py-16`}>
        <div className="max-w-7xl mx-auto px-6">
          <span className="text-[10px] uppercase tracking-wider text-white/60 font-semibold mb-3 inline-block px-3 py-1 border border-white/20">
            {p.type}
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {p.title}
          </h1>
          <div className="flex flex-wrap gap-6 text-white/50 text-sm">
            {p.duration_days > 0 && (
              <span className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {p.duration_days} Days
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
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
                <p className="text-[var(--gt-muted)] text-sm leading-relaxed whitespace-pre-line">
                  {p.overview}
                </p>
              </div>

              {/* Gallery */}
              {p.images && p.images.length > 0 && (
                <div id="gallery">
                  <h2
                    className="text-2xl font-bold text-[var(--gt-navy)] mb-4"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Gallery
                  </h2>
                  <GalleryGrid images={p.images} />
                </div>
              )}

              {/* Videos */}
              {p.youtube_urls && p.youtube_urls.length > 0 && (
                <div id="videos">
                  <h2
                    className="text-2xl font-bold text-[var(--gt-navy)] mb-4"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Videos
                  </h2>
                  <VideoSection youtubeUrls={p.youtube_urls} />
                </div>
              )}

              {/* Itinerary */}
              {days.length > 0 && (
                <div id="itinerary">
                  <h2
                    className="text-2xl font-bold text-[var(--gt-navy)] mb-4"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Itinerary
                  </h2>
                  <ItineraryAccordion days={days} />
                </div>
              )}

              {/* Inclusions & Exclusions */}
              {((p.inclusions && p.inclusions.length > 0) || (p.exclusions && p.exclusions.length > 0)) && (
                <div id="inclusions">
                  <h2
                    className="text-2xl font-bold text-[var(--gt-navy)] mb-4"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Inclusions & Exclusions
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {p.inclusions && p.inclusions.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-[var(--gt-navy)] mb-3 uppercase tracking-wider">
                          Included
                        </h3>
                        <ul className="space-y-2">
                          {p.inclusions.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-[var(--gt-muted)]">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {p.exclusions && p.exclusions.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-[var(--gt-navy)] mb-3 uppercase tracking-wider">
                          Excluded
                        </h3>
                        <ul className="space-y-2">
                          {p.exclusions.map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-[var(--gt-muted)]">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
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
                </div>
              )}

              {/* Pricing */}
              {p.price_from > 0 && (
                <div id="pricing">
                  <h2
                    className="text-2xl font-bold text-[var(--gt-navy)] mb-4"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    Pricing
                  </h2>
                  <PricingTable priceFrom={p.price_from} />
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-[90px] border border-[var(--gt-border)] p-6">
                {p.price_from > 0 && (
                  <div className="mb-4">
                    <span className="text-xs text-[var(--gt-muted)] uppercase">From</span>
                    <div className="text-2xl font-bold text-[var(--gt-red)]">
                      &#8377;{p.price_from.toLocaleString("en-IN")}
                    </div>
                    <span className="text-xs text-[var(--gt-muted)]">per person</span>
                  </div>
                )}

                <div className="space-y-3 mb-6 text-sm">
                  {p.duration_days > 0 && (
                    <div className="flex justify-between">
                      <span className="text-[var(--gt-muted)]">Duration</span>
                      <span className="text-[var(--gt-navy)] font-medium">{p.duration_days} Days</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-[var(--gt-muted)]">Type</span>
                    <span className="text-[var(--gt-navy)] font-medium capitalize">{p.type}</span>
                  </div>
                </div>

                <a
                  href={waLink(`Hi, I'm interested in the ${p.title} package.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[var(--gt-red)] text-white text-[11px] uppercase tracking-[0.15em] font-semibold px-6 py-3 hover:bg-[var(--gt-red-dark)] transition-colors mb-3"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  WhatsApp Us
                </a>
                <a
                  href="tel:+919845033877"
                  className="w-full inline-flex items-center justify-center gap-2 border border-[var(--gt-border)] text-[var(--gt-navy)] text-[11px] uppercase tracking-[0.15em] font-semibold px-6 py-3 hover:bg-[var(--gt-navy)] hover:text-white transition-colors mb-4"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  +91 98450 33877
                </a>

                <p className="text-xs text-[var(--gt-muted)] text-center">
                  No advance payment required
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Packages */}
      {similarPkgs.length > 0 && (
        <section className="py-16 bg-[var(--gt-cream)]">
          <div className="max-w-7xl mx-auto px-6">
            <h2
              className="text-2xl font-bold text-[var(--gt-navy)] mb-8"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Similar Packages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarPkgs.map((sp) => (
                <PackageCard key={sp.id} pkg={sp} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
