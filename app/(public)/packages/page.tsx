import { createPublicClient, PACKAGE_CARD_COLUMNS } from "@/lib/supabase/public";
import type { Package } from "@/lib/supabase/types";
import type { Metadata } from "next";
import PackageCard from "@/components/packages/PackageCard";
import PackageFilter from "./PackageFilter";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: "/packages" },
  title: "Travel Packages",
  description:
    "Explore our curated travel packages including pilgrimage tours, outstation trips, airport transfers, and corporate transport. Golden Travels, Bengaluru.",
};

export default async function PackagesPage() {
  const supabase = createPublicClient();
  const { data: packages } = await supabase
    .from("packages")
    .select(PACKAGE_CARD_COLUMNS)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  const pkgs = (packages || []) as unknown as Package[];

  return (
    <>
      <section className="bg-[var(--gt-navy)] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--gt-red)] font-semibold block mb-3">
            Curated Experiences
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Travel Packages
          </h1>
          <p className="text-white/50 text-sm mt-3 max-w-lg mx-auto">
            From spiritual pilgrimages to corporate transport, we have a package for every need.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <PackageFilter packages={pkgs} />
        </div>
      </section>
    </>
  );
}
