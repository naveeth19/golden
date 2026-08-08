import {
  createPublicClient,
  PACKAGE_CARD_COLUMNS,
  PACKAGE_DETAIL_COLUMNS,
  ITINERARY_COLUMNS,
  PRICING_TIER_COLUMNS,
} from "@/lib/supabase/public";
import type { Package, ItineraryDay, PricingTier } from "@/lib/supabase/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PackageDetailClient from "@/components/packages/PackageDetailClient";
import PackageCard from "@/components/packages/PackageCard";

export const revalidate = 3600;

export async function generateStaticParams() {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("packages")
    .select("slug")
    .eq("is_active", true);

  return (data || []).map(({ slug }) => ({ slug: (slug as string).trim() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = createPublicClient();
  const { data: pkg } = await supabase
    .from("packages")
    .select(PACKAGE_DETAIL_COLUMNS)
    .eq("slug", slug)
    .single<Package>();

  if (!pkg) return { title: "Package Not Found" };

  return {
    alternates: { canonical: `/packages/${slug}` },
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
  const supabase = createPublicClient();

  const { data: pkg } = await supabase
    .from("packages")
    .select(PACKAGE_DETAIL_COLUMNS)
    .eq("slug", slug)
    .single<Package>();

  if (!pkg) notFound();

  const p = pkg;

  const { data: itinerary } = await supabase
    .from("itinerary_days")
    .select(ITINERARY_COLUMNS)
    .eq("package_id", p.id)
    .order("day_number", { ascending: true });

  const days = (itinerary || []) as unknown as ItineraryDay[];

  const { data: tiers } = await supabase
    .from("package_pricing_tiers")
    .select(PRICING_TIER_COLUMNS)
    .eq("package_id", p.id)
    .order("min_people", { ascending: true });

  const pricingTiers = (tiers || []) as unknown as PricingTier[];

  const { data: similar } = await supabase
    .from("packages")
    .select(PACKAGE_CARD_COLUMNS)
    .eq("type", p.type)
    .eq("is_active", true)
    .neq("slug", p.slug)
    .limit(3);

  const similarPkgs = (similar || []) as unknown as Package[];

  return (
    <>
      <PackageDetailClient pkg={p} days={days} pricingTiers={pricingTiers} />

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
