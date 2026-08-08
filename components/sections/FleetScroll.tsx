import { createPublicClient, FLEET_CARD_COLUMNS } from "@/lib/supabase/public";
import type { Fleet } from "@/lib/supabase/types";
import Link from "next/link";
import Image from "next/image";
import VehicleSilhouette from "@/components/fleet/VehicleSilhouette";
import { FEATURED_FLEET_SLUGS } from "@/lib/featured-fleet";

export default async function FleetScroll() {
  const supabase = createPublicClient();
  const { data: vehicles } = await supabase
    .from("fleet")
    .select(FLEET_CARD_COLUMNS)
    .eq("is_active", true)
    .in("slug", [...FEATURED_FLEET_SLUGS]);

  const rows = (vehicles || []) as unknown as Fleet[];

  // Preserve the hand-picked order from FEATURED_FLEET_SLUGS, not DB order.
  const fleet = FEATURED_FLEET_SLUGS.map((slug) =>
    rows.find((v) => v.slug === slug)
  ).filter((v): v is Fleet => Boolean(v));

  return (
    <section className="bg-[var(--gt-cream)] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--gt-red)] font-semibold block mb-3">
              Our Fleet
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--gt-navy)]" style={{ fontFamily: "var(--font-playfair)" }}>
              Premium vehicles for every journey
            </h2>
          </div>
          <Link
            href="/fleet"
            className="hidden md:inline-flex items-center text-sm text-[var(--gt-red)] font-medium hover:underline"
          >
            View All
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
          {fleet.map((v) => (
              <Link
                key={v.id}
                href={`/fleet/${v.slug}`}
                className="min-w-[280px] max-w-[280px] border border-[var(--gt-border)] bg-white flex-shrink-0 group"
              >
                <div className="h-40 bg-[var(--gt-navy)] flex items-center justify-center relative overflow-hidden">
                  {v.images?.[0] ? (
                    <Image
                      src={v.images[0]}
                      alt={v.name}
                      width={280}
                      height={160}
                      sizes="280px"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <VehicleSilhouette className="text-white" />
                  )}
                  <span className="absolute top-3 left-3 bg-[var(--gt-red)] text-white text-[10px] uppercase tracking-wider font-semibold px-2 py-1">
                    {v.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-[var(--gt-navy)] mb-1 group-hover:text-[var(--gt-red)] transition-colors" style={{ fontFamily: "var(--font-playfair)" }}>
                    {v.name}
                  </h3>
                  <p className="text-xs text-[var(--gt-muted)] mb-3">{v.capacity} Seater</p>
                  <div className="flex flex-wrap gap-1.5">
                    {(v.features || []).slice(0, 3).map((f: string) => (
                      <span key={f} className="text-[10px] px-2 py-0.5 border border-[var(--gt-red)]/20 text-[var(--gt-red)]">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
        </div>

        {/* Mobile: the header "View All" is hidden below md, so repeat it here. */}
        <div className="mt-10 text-center md:hidden">
          <Link
            href="/fleet"
            className="inline-flex items-center justify-center border border-[var(--gt-navy)] text-[var(--gt-navy)] text-[11px] uppercase tracking-[0.15em] font-semibold px-8 py-3 hover:bg-[var(--gt-navy)] hover:text-white transition-colors"
          >
            View All Fleet
          </Link>
        </div>
      </div>
    </section>
  );
}
