import { createClient } from "@/lib/supabase/server";
import type { Fleet } from "@/lib/supabase/types";
import type { Metadata } from "next";
import FleetCard from "@/components/fleet/FleetCard";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Our Fleet",
  description:
    "Explore our premium fleet of sedans, MPVs, SUVs, tempo travellers, and mini buses available for rent in Bengaluru. Golden Travels offers well-maintained vehicles for every journey.",
};

export default async function FleetPage() {
  const supabase = await createClient();
  const { data: vehicles } = await supabase
    .from("fleet")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  const fleet: Fleet[] = vehicles || [];

  return (
    <>
      <section className="bg-[var(--gt-navy)] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--gt-red)] font-semibold block mb-3">
            Premium Vehicles
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Our Fleet
          </h1>
          <p className="text-white/50 text-sm mt-3 max-w-lg mx-auto">
            Well-maintained vehicles driven by experienced professionals for every type of journey.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {fleet.length === 0 ? (
            <p className="text-center text-[var(--gt-muted)]">
              No vehicles available at the moment. Please check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {fleet.map((v) => (
                <FleetCard key={v.id} vehicle={v} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
