import Link from "next/link";
import Image from "next/image";
import { createPublicClient, FLEET_CARD_COLUMNS } from "@/lib/supabase/public";
import { FEATURED_FLEET_SLUGS, FLEET_SIZE_LABEL } from "@/lib/featured-fleet";
import type { Fleet } from "@/lib/supabase/types";
import VehicleSilhouette from "@/components/fleet/VehicleSilhouette";
import SectionHead from "./SectionHead";

export default async function FleetRail() {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("fleet")
    .select(FLEET_CARD_COLUMNS)
    .eq("is_active", true)
    .in("slug", [...FEATURED_FLEET_SLUGS]);

  const rows = (data || []) as unknown as Fleet[];

  // Preserve the hand-picked order from FEATURED_FLEET_SLUGS, not DB order.
  const fleet = FEATURED_FLEET_SLUGS.map((slug) =>
    rows.find((v) => v.slug === slug)
  ).filter((v): v is Fleet => Boolean(v));

  if (fleet.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 border-b border-[var(--gt-border)] bg-[var(--gt-cream)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionHead
          index="03"
          eyebrow="The fleet"
          title={
            <>
              Premium vehicles
              <br className="hidden sm:block" /> for every journey
            </>
          }
          lede="Sedans to 50-seat coaches, serviced on schedule and driven by professionals."
          action={
            <Link
              href="/fleet"
              className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-[var(--gt-navy)]"
            >
              View all fleet
              <span className="w-8 h-px bg-[var(--gt-navy)] group-hover:w-12 group-hover:bg-[var(--gt-red)] transition-all duration-300" />
            </Link>
          }
        />
      </div>

      {/* Rail bleeds to the viewport edge so cards run off-screen — signals scrollability. */}
      <div className="mt-14 lg:mt-16 gt-rail overflow-x-auto">
        <div className="flex gap-5 px-6 lg:px-12 max-w-[1400px] mx-auto">
          {fleet.map((v) => (
            <Link
              key={v.id}
              href={`/fleet/${v.slug}`}
              className="group shrink-0 w-[260px] sm:w-[300px]"
            >
              <div className="relative h-[190px] sm:h-[210px] bg-white overflow-hidden border border-[var(--gt-border)]">
                {v.images?.[0] ? (
                  <Image
                    src={v.images[0]}
                    alt={v.name}
                    fill
                    sizes="300px"
                    loading="lazy"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[var(--gt-navy)]">
                    <VehicleSilhouette />
                  </div>
                )}
              </div>

              <div className="pt-5">
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--gt-red)]">
                    {v.category}
                  </span>
                  <span className="text-[11px] text-[var(--gt-muted)] tabular-nums">
                    {v.capacity} seats
                  </span>
                </div>

                <h3
                  className="text-lg leading-snug text-[var(--gt-navy)] group-hover:text-[var(--gt-red)] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {v.name}
                </h3>

                {v.features?.length > 0 && (
                  <p className="mt-2 text-xs leading-relaxed text-[var(--gt-muted)] line-clamp-2">
                    {v.features.slice(0, 3).join(" · ")}
                  </p>
                )}
              </div>
            </Link>
          ))}

          {/* Terminal card — turns the end of the rail into the CTA. */}
          <Link
            href="/fleet"
            className="group shrink-0 w-[220px] flex flex-col justify-center border-l border-[var(--gt-border)] pl-6"
          >
            <span
              className="text-2xl leading-tight text-[var(--gt-navy)] group-hover:text-[var(--gt-red)] transition-colors"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              View more
            </span>
            <span className="mt-2 text-[11px] uppercase tracking-[0.16em] text-[var(--gt-muted)]">
              {FLEET_SIZE_LABEL} vehicles
            </span>
            <span className="mt-4 w-8 h-px bg-[var(--gt-navy)] group-hover:w-12 group-hover:bg-[var(--gt-red)] transition-all duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
