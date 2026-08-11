import {
  createPublicClient,
  FLEET_CARD_COLUMNS,
  FLEET_DETAIL_COLUMNS,
} from "@/lib/supabase/public";
import type { Fleet } from "@/lib/supabase/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Gallery, { type GalleryImage } from "@/components/tt/Gallery";
import StickyBar from "@/components/tt/StickyBar";
import CtaPair from "@/components/tt/CtaPair";
import VehicleSilhouette from "@/components/fleet/VehicleSilhouette";
import {
  getTtVehicle,
  TT_SLUGS,
  TT_VEHICLES,
  WA_MESSAGES,
  RATE_DISCLAIMER,
  type TtVehicle,
} from "@/lib/tt/content";

export const dynamic = "force-static";
export const revalidate = 3600;

const SITE = "https://www.goldentravels.co";
const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/**
 * Vehicle detail — one template, two data sources:
 *  - TT segment slugs come from lib/tt/content.ts with local WebP galleries
 *  - every other slug is DB-driven, as before
 */

/* ── Normalised view model ─────────────────────────────────────────────── */

interface VehicleView {
  slug: string;
  name: string;
  tier: string;
  seats: number;
  seatsLabel: string;
  images: GalleryImage[];
  features: string[];
  idealFor: string[];
  description: string | null;
  rateFromLabel: string;
  rate8hr80km: number | null;
  extraHourRate: number | null;
  extraKmRate: number | null;
  outstationKmRate: number | null;
  driverBata: number | null;
  minKmPerDay: number | null;
  luggage: string | null;
}

function fromTt(v: TtVehicle): VehicleView {
  return {
    slug: v.slug,
    name: v.name,
    tier: v.tier,
    seats: v.seats,
    seatsLabel: v.seatsLabel,
    images: v.images.map((img, i) => ({
      ...img,
      alt: `${v.name} — ${img.kind.toLowerCase()} photo ${i + 1}`,
    })),
    features: v.features,
    idealFor: v.idealFor,
    description: null,
    rateFromLabel: `${inr(v.outstationKmRate)}/km`,
    rate8hr80km: v.rate8hr80km,
    extraHourRate: v.extraHourRate,
    extraKmRate: v.extraKmRate,
    outstationKmRate: v.outstationKmRate,
    driverBata: v.driverBata,
    minKmPerDay: v.minKmPerDay,
    luggage: v.luggage,
  };
}

function fromDb(v: Fleet): VehicleView {
  return {
    slug: v.slug,
    name: v.name,
    tier: v.category,
    seats: v.capacity,
    seatsLabel: String(v.capacity),
    images: (v.images || []).map((src, i) => ({
      src,
      w: 1400,
      h: 900,
      alt: `${v.name} photo ${i + 1}`,
    })),
    features: v.features || [],
    idealFor: [],
    description: v.description || null,
    rateFromLabel: v.price_local_8hr > 0 ? inr(v.price_local_8hr) : "On request",
    rate8hr80km: v.price_local_8hr > 0 ? v.price_local_8hr : null,
    extraHourRate: v.price_extra_hour > 0 ? v.price_extra_hour : null,
    extraKmRate: v.price_extra_km > 0 ? v.price_extra_km : null,
    outstationKmRate: v.price_outstation_km > 0 ? v.price_outstation_km : null,
    driverBata: v.price_driver_batta > 0 ? v.price_driver_batta : null,
    minKmPerDay: null,
    luggage: null,
  };
}

async function loadVehicle(
  slug: string
): Promise<{ view: VehicleView; isTt: boolean } | null> {
  const tt = getTtVehicle(slug);
  if (tt) return { view: fromTt(tt), isTt: true };

  const supabase = createPublicClient();
  const { data } = await supabase
    .from("fleet")
    .select(FLEET_DETAIL_COLUMNS)
    .eq("slug", slug)
    .single<Fleet>();
  if (!data) return null;
  return { view: fromDb(data), isTt: false };
}

/* ── Static params & metadata ──────────────────────────────────────────── */

export async function generateStaticParams() {
  const supabase = createPublicClient();
  const { data } = await supabase.from("fleet").select("slug").eq("is_active", true);
  const dbSlugs = (data || []).map(({ slug }) => (slug as string).trim());
  return [...new Set([...dbSlugs, ...TT_SLUGS])].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const loaded = await loadVehicle(slug);
  if (!loaded) return { title: "Vehicle Not Found" };
  const v = loaded.view;

  const description = loaded.isTt
    ? `Rent a ${v.name} in Bangalore — ${inr(v.outstationKmRate!)}/km outstation, ${inr(v.rate8hr80km!)} for 8hr/80km local. AC, chauffeur-driven, all-India permit. Golden Travels, since 1987.`
    : `Rent ${v.name} (${v.seats} seater ${v.tier}) in Bengaluru. Features: ${v.features.join(", ")}. Book with Golden Travels.`;

  return {
    title: `${v.name} Rental in Bengaluru`,
    description,
    alternates: { canonical: `/fleet/${slug}` },
  };
}

/* ── Page ──────────────────────────────────────────────────────────────── */

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const loaded = await loadVehicle(slug);
  if (!loaded) notFound();
  const v = loaded.view;

  // Related: sibling TT vehicles on TT pages; same DB category otherwise.
  let related: { slug: string; name: string; img: string | null; sub: string }[] = [];
  if (loaded.isTt) {
    related = TT_VEHICLES.filter((x) => x.slug !== slug)
      .slice(0, 3)
      .map((x) => ({
        slug: x.slug,
        name: x.name,
        img: x.card.src,
        sub: `${x.seatsLabel} seats · from ${inr(x.outstationKmRate)}/km`,
      }));
  } else {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("fleet")
      .select(FLEET_CARD_COLUMNS)
      .eq("category", v.tier)
      .eq("is_active", true)
      .neq("slug", slug)
      .limit(3);
    related = ((data || []) as unknown as Fleet[]).map((x) => ({
      slug: x.slug,
      name: x.name,
      img: x.images?.[0] || null,
      sub: `${x.capacity} seater`,
    }));
  }

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Golden Travels", item: SITE },
      { "@type": "ListItem", position: 2, name: "Fleet", item: `${SITE}/fleet` },
      { "@type": "ListItem", position: 3, name: v.name, item: `${SITE}/fleet/${v.slug}` },
    ],
  };

  const specParts = [
    `${v.seats} guests`,
    `${v.seatsLabel} seats`,
    ...(v.luggage ? [v.luggage] : []),
    "AC",
  ];

  return (
    <div className="pb-[calc(72px+env(safe-area-inset-bottom))]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      {/* Gallery at top — full bleed, swipeable, CSS scroll-snap */}
      {v.images.length > 0 ? (
        <Gallery images={v.images} title={v.name} />
      ) : (
        <div className="h-[280px] bg-[var(--gt-navy)] flex items-center justify-center text-white">
          <VehicleSilhouette />
        </div>
      )}

      <div className="max-w-[1000px] mx-auto px-5">
        {/* Title + spec line */}
        <div className="pt-7">
          <h1
            className="text-[clamp(1.7rem,4.5vw,2.6rem)] leading-[1.08] tracking-[-0.02em] text-[var(--gt-navy)]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {v.name}
          </h1>
          <p className="mt-2.5 text-[14px] text-[var(--gt-muted)]">{specParts.join(" · ")}</p>
        </div>

        {/* Stat row — hairline dividers */}
        <div className="mt-7 grid grid-cols-3 border-y border-[var(--gt-border)]">
          {[
            { label: "Rate from", value: v.rateFromLabel },
            { label: "Seating", value: `${v.seatsLabel} + driver` },
            { label: "Tier", value: v.tier },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`py-5 px-3 text-center ${i > 0 ? "border-l border-[var(--gt-border)]" : ""}`}
            >
              <div
                className="text-[17px] sm:text-xl text-[var(--gt-navy)] tabular-nums"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {s.value}
              </div>
              <div className="mt-1 text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-[var(--gt-muted)]">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Details */}
        <div className="py-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-9">
          {v.features.length > 0 && (
            <div>
              <h2 className="text-[11px] uppercase tracking-[0.2em] text-[var(--gt-red)] font-semibold mb-4">
                Features
              </h2>
              <ul className="space-y-2.5 text-[14px] text-[var(--gt-muted)]">
                {v.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="w-4 h-px bg-[var(--gt-red)] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {v.idealFor.length > 0 && (
            <div>
              <h2 className="text-[11px] uppercase tracking-[0.2em] text-[var(--gt-red)] font-semibold mb-4">
                Ideal for
              </h2>
              <ul className="space-y-2.5 text-[14px] text-[var(--gt-muted)]">
                {v.idealFor.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="w-4 h-px bg-[var(--gt-red)] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="md:col-span-2">
            <h2 className="text-[11px] uppercase tracking-[0.2em] text-[var(--gt-red)] font-semibold mb-4">
              What&apos;s included
            </h2>
            <div className="text-[14px] leading-[1.75] text-[var(--gt-muted)]">
              <p>
                Chauffeur and fuel are included in the rate.
                {v.driverBata ? ` Driver bata is ${inr(v.driverBata)} per day.` : ""}
                {v.minKmPerDay
                  ? ` Outstation trips are billed on a minimum of ${v.minKmPerDay} km per calendar day.`
                  : ""}{" "}
                Tolls, parking and interstate taxes are at actuals.
              </p>
              {(v.rate8hr80km || v.extraHourRate || v.extraKmRate) && (
                <ul className="mt-4 space-y-1.5">
                  {v.rate8hr80km && (
                    <li>
                      Local package (8hr/80km):{" "}
                      <span className="text-[var(--gt-navy)]">{inr(v.rate8hr80km)}</span>
                    </li>
                  )}
                  {v.extraHourRate && (
                    <li>
                      Extra hour: <span className="text-[var(--gt-navy)]">{inr(v.extraHourRate)}</span>
                    </li>
                  )}
                  {v.extraKmRate && (
                    <li>
                      Extra km: <span className="text-[var(--gt-navy)]">{inr(v.extraKmRate)}</span>
                    </li>
                  )}
                  {v.outstationKmRate && (
                    <li>
                      Outstation:{" "}
                      <span className="text-[var(--gt-navy)]">{inr(v.outstationKmRate)}/km</span>
                    </li>
                  )}
                </ul>
              )}
              <p className="mt-4 text-[12px]">{RATE_DISCLAIMER}</p>
            </div>
          </div>

          {v.description && (
            <div className="md:col-span-2">
              <h2 className="text-[11px] uppercase tracking-[0.2em] text-[var(--gt-red)] font-semibold mb-4">
                About this vehicle
              </h2>
              <p className="text-[14px] leading-[1.8] text-[var(--gt-muted)] whitespace-pre-line">
                {v.description}
              </p>
            </div>
          )}
        </div>

        {/* Desktop CTA (mobile is covered by the sticky bar) */}
        <div className="hidden lg:block pb-10">
          <CtaPair
            section={`detail:${v.slug}`}
            waMessage={WA_MESSAGES.detail(v.name)}
            className="max-w-md"
          />
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="border-t border-[var(--gt-border)] py-10">
            <h2 className="text-[11px] uppercase tracking-[0.2em] text-[var(--gt-red)] font-semibold mb-6">
              Similar vehicles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link key={r.slug} href={`/fleet/${r.slug}`} className="group border border-[var(--gt-border)]">
                  <div className="relative aspect-[16/10] bg-[var(--gt-cream)] overflow-hidden">
                    {r.img ? (
                      <Image
                        src={r.img}
                        alt={r.name}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        loading="lazy"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[var(--gt-navy)]">
                        <VehicleSilhouette />
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3
                      className="text-[15px] text-[var(--gt-navy)] group-hover:text-[var(--gt-red)] transition-colors"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {r.name}
                    </h3>
                    <p className="mt-1 text-[12px] text-[var(--gt-muted)]">{r.sub}</p>
                  </div>
                </Link>
              ))}
            </div>
            {loaded.isTt && (
              <p className="mt-6 text-[13px]">
                <Link
                  href="/tempo-traveller-rental-bangalore"
                  className="text-[var(--gt-red)] hover:underline"
                >
                  ← All tempo traveller &amp; Urbania rates
                </Link>
              </p>
            )}
          </div>
        )}
      </div>

      {/* Sticky bottom bar — rate left, CTA pair right, always visible on mobile */}
      <StickyBar
        section={`detail:${v.slug}`}
        waMessage={WA_MESSAGES.detail(v.name)}
        rateLabel={v.rateFromLabel}
      />
    </div>
  );
}
