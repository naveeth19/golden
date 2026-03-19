import { createClient } from "@/lib/supabase/server";
import type { Fleet } from "@/lib/supabase/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { waLink } from "@/lib/wa";
import FleetCard from "@/components/fleet/FleetCard";

export const dynamic = 'force-dynamic';

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
  const { data: vehicle } = await supabase
    .from("fleet")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!vehicle) return { title: "Vehicle Not Found" };

  return {
    title: `${vehicle.name} Rental in Bengaluru`,
    description: `Rent ${vehicle.name} (${vehicle.capacity} seater ${vehicle.category}) in Bengaluru. Features: ${(vehicle.features || []).join(", ")}. Book with Golden Travels.`,
  };
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: vehicle } = await supabase
    .from("fleet")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!vehicle) notFound();

  const v = vehicle as Fleet;

  const { data: related } = await supabase
    .from("fleet")
    .select("*")
    .eq("category", v.category)
    .eq("is_active", true)
    .neq("slug", v.slug)
    .limit(3);

  const relatedVehicles: Fleet[] = related || [];

  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--gt-navy)]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="h-[300px] md:h-[400px] bg-[var(--gt-navy-dark)] flex items-center justify-center overflow-hidden">
              {v.images && v.images.length > 0 ? (
                <img src={v.images[0]} alt={v.name} className="w-full h-full object-cover" />
              ) : (
                <svg width="120" height="60" viewBox="0 0 120 60" fill="none" stroke="white" strokeWidth="1" opacity="0.15">
                  <rect x="15" y="22" width="90" height="22" rx="4" />
                  <circle cx="35" cy="48" r="7" />
                  <circle cx="85" cy="48" r="7" />
                  <path d="M82 22V12H48v10" />
                </svg>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              <span className="inline-block bg-[var(--gt-red)] text-white text-[10px] uppercase tracking-wider font-semibold px-3 py-1 w-fit mb-4">
                {v.category}
              </span>
              <h1
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {v.name}
              </h1>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="border border-white/10 p-4 text-center">
                  <div className="text-white text-lg font-bold">{v.capacity}</div>
                  <div className="text-white/40 text-xs uppercase">Seater</div>
                </div>
                <div className="border border-white/10 p-4 text-center">
                  <div className="text-white text-lg font-bold">AC</div>
                  <div className="text-white/40 text-xs uppercase">Climate</div>
                </div>
                <div className="border border-white/10 p-4 text-center">
                  <div className="text-white text-lg font-bold">{(v.features || []).length}</div>
                  <div className="text-white/40 text-xs uppercase">Features</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {(v.features || []).map((f: string) => (
                  <span key={f} className="text-xs px-3 py-1 border border-white/20 text-white/60">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content + Sidebar */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Content */}
            <div className="lg:col-span-2">
              <h2
                className="text-2xl font-bold text-[var(--gt-navy)] mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                About {v.name}
              </h2>
              <p className="text-[var(--gt-muted)] text-sm leading-relaxed whitespace-pre-line">
                {v.description || `The ${v.name} is a premium ${v.category} vehicle available for rent in Bengaluru. With a seating capacity of ${v.capacity} passengers, it is ideal for both short city rides and long outstation trips. All our vehicles are well-maintained, regularly serviced, and driven by experienced professionals.`}
              </p>

              {/* Pricing */}
              <div className="mt-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-bold text-[var(--gt-red)] uppercase tracking-wider">Transparent Rates</span>
                  <div className="h-px bg-[var(--gt-border)] flex-1" />
                </div>
                <h2
                  className="text-2xl font-bold text-[var(--gt-navy)] mb-6"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Pricing
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Local Card */}
                  <div className="bg-white border border-[var(--gt-border)] p-6 border-l-4 border-l-[var(--gt-red)]">
                    <h3
                      className="text-lg font-bold text-[var(--gt-navy)] mb-4"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      Local Package
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[var(--gt-muted)]">8 Hrs / 80 Km</span>
                        <span
                          className="text-lg font-bold text-[var(--gt-navy)]"
                          style={{ fontFamily: "var(--font-playfair)" }}
                        >
                          ₹{v.price_local_8hr.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[var(--gt-muted)]">Extra km</span>
                        <span
                          className="text-lg font-bold text-[var(--gt-navy)]"
                          style={{ fontFamily: "var(--font-playfair)" }}
                        >
                          ₹{v.price_extra_km.toLocaleString("en-IN")} / km
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[var(--gt-muted)]">Extra hour</span>
                        <span
                          className="text-lg font-bold text-[var(--gt-navy)]"
                          style={{ fontFamily: "var(--font-playfair)" }}
                        >
                          ₹{v.price_extra_hour.toLocaleString("en-IN")} / hr
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Outstation Card */}
                  <div className="bg-white border border-[var(--gt-border)] p-6 border-l-4 border-l-[var(--gt-red)]">
                    <h3
                      className="text-lg font-bold text-[var(--gt-navy)] mb-4"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      Outstation
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[var(--gt-muted)]">Per day</span>
                        <span
                          className="text-lg font-bold text-[var(--gt-navy)]"
                          style={{ fontFamily: "var(--font-playfair)" }}
                        >
                          ₹{v.price_outstation_day.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[var(--gt-muted)]">Per km</span>
                        <span
                          className="text-lg font-bold text-[var(--gt-navy)]"
                          style={{ fontFamily: "var(--font-playfair)" }}
                        >
                          ₹{v.price_outstation_km.toLocaleString("en-IN")} / km
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-[var(--gt-muted)] mt-3">
                      Minimum 300 km per day applies
                    </p>
                  </div>

                  {/* Airport Card */}
                  <div className="bg-white border border-[var(--gt-border)] p-6 border-l-4 border-l-[var(--gt-red)]">
                    <h3
                      className="text-lg font-bold text-[var(--gt-navy)] mb-4"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      Airport Transfer
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[var(--gt-muted)]">Flat rate</span>
                        <span
                          className="text-lg font-bold text-[var(--gt-navy)]"
                          style={{ fontFamily: "var(--font-playfair)" }}
                        >
                          ₹{v.price_airport.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-[var(--gt-muted)] mt-3">
                      One way · BLR Airport
                    </p>
                  </div>
                </div>

                {/* Note Box */}
                <div className="mt-8 border-l-4 border-l-[var(--gt-red)] bg-[var(--gt-cream)] p-4">
                  <p className="text-sm text-[var(--gt-muted)]">
                    Prices are indicative. Final quote depends on trip duration, distance, and toll charges. Contact us for a confirmed rate.
                  </p>
                </div>

                {/* WhatsApp CTA */}
                <div className="mt-6">
                  <a
                    href={waLink(`Hi, I'd like to know the rate for ${v.name}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[var(--gt-red)] text-white text-[11px] uppercase tracking-[0.15em] font-semibold px-6 py-3 hover:bg-[var(--gt-red-dark)] transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    Get Exact Quote
                  </a>
                </div>
              </div>

              {/* Gallery */}
              {v.images && v.images.length > 1 && (
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-[var(--gt-navy)] mb-4">Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {v.images.slice(1).map((img: string, i: number) => (
                      <div key={i} className="h-40 bg-[var(--gt-cream)] overflow-hidden">
                        <img src={img} alt={`${v.name} ${i + 2}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-[90px] border border-[var(--gt-border)] p-6">
                <h3
                  className="text-xl font-bold text-[var(--gt-navy)] mb-1"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {v.name}
                </h3>
                <p className="text-sm text-[var(--gt-muted)] mb-6">Price on request</p>
                <a
                  href={waLink(`Hi, I would like to book the ${v.name} (${v.capacity} seater ${v.category}).`)}
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
                  className="w-full inline-flex items-center justify-center gap-2 border border-[var(--gt-border)] text-[var(--gt-navy)] text-[11px] uppercase tracking-[0.15em] font-semibold px-6 py-3 hover:bg-[var(--gt-navy)] hover:text-white transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  +91 98450 33877
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Vehicles */}
      {relatedVehicles.length > 0 && (
        <section className="py-16 bg-[var(--gt-cream)]">
          <div className="max-w-7xl mx-auto px-6">
            <h2
              className="text-2xl font-bold text-[var(--gt-navy)] mb-8"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Similar Vehicles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedVehicles.map((rv) => (
                <FleetCard key={rv.id} vehicle={rv} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
