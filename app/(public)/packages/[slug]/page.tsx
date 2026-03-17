import { createClient } from "@/lib/supabase/server";
import type { Package, ItineraryDay, PricingTier } from "@/lib/supabase/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PackageDetailClient from "@/components/packages/PackageDetailClient";
import PackageCard from "@/components/packages/PackageCard";

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

  const days: ItineraryDay[] = (itinerary as ItineraryDay[]) || [];

  const { data: tiers } = await supabase
    .from("package_pricing_tiers")
    .select("*")
    .eq("package_id", p.id)
    .order("min_people", { ascending: true });

  const pricingTiers: PricingTier[] = (tiers as PricingTier[]) || [];

  const { data: similar } = await supabase
    .from("packages")
    .select("*")
    .eq("type", p.type)
    .eq("is_active", true)
    .neq("slug", p.slug)
    .limit(3);

  const similarPkgs: Package[] = (similar as Package[]) || [];

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
