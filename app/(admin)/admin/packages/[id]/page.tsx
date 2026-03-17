"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Package, ItineraryDay, PricingTier } from "@/lib/supabase/types";
import PackageForm from "@/components/admin/PackageForm";
import ItineraryEditor from "@/components/admin/ItineraryEditor";
import PricingTierEditor from "@/components/admin/PricingTierEditor";

export const dynamic = 'force-dynamic';

type Tab = "details" | "itinerary" | "pricing";

export default function AdminPackageEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === "new";
  const [tab, setTab] = useState<Tab>("details");
  const [pkg, setPkg] = useState<Package | null>(null);
  const [days, setDays] = useState<ItineraryDay[]>([]);
  const [tiers, setTiers] = useState<PricingTier[]>([]);
  const [loading, setLoading] = useState(!isNew);
  const supabase = createClient();

  useEffect(() => {
    if (!isNew) {
      loadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function loadData() {
    setLoading(true);
    try {
      const { data: pkgData, error: pkgError } = await supabase
        .from("packages")
        .select("*")
        .eq("id", id)
        .single();
      if (pkgError) {
        console.error("Failed to load package:", pkgError);
      }
      if (pkgData) setPkg(pkgData as Package);

      const { data: dayData, error: dayError } = await supabase
        .from("itinerary_days")
        .select("*")
        .eq("package_id", id)
        .order("day_number", { ascending: true });
      if (dayError) {
        console.error("Failed to load itinerary days:", dayError);
      }
      setDays((dayData as ItineraryDay[]) || []);

      const { data: tierData, error: tierError } = await supabase
        .from("package_pricing_tiers")
        .select("*")
        .eq("package_id", id)
        .order("min_people", { ascending: true });
      if (tierError) {
        console.error("Failed to load pricing tiers:", tierError);
      }
      setTiers((tierData as PricingTier[]) || []);
    } catch (e) {
      console.error("Unexpected error loading package data:", e);
    } finally {
      setLoading(false);
    }
  }

  function handleSaved(newId?: string) {
    if (isNew && newId) {
      router.push(`/admin/packages/${newId}`);
    } else {
      loadData();
    }
  }

  if (loading) {
    return <div className="text-[var(--gt-muted)] text-sm">Loading...</div>;
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "details", label: "Details" },
    { key: "itinerary", label: "Itinerary" },
    { key: "pricing", label: "Pricing & Vehicles" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--gt-navy)]" style={{ fontFamily: "var(--font-playfair)" }}>
          {isNew ? "New Package" : `Edit: ${pkg?.title || ""}`}
        </h1>
        <button
          onClick={() => router.push("/admin/packages")}
          className="text-sm text-[var(--gt-muted)] hover:text-[var(--gt-navy)]"
        >
          Back to Packages
        </button>
      </div>

      {!isNew && (
        <div className="flex gap-0 mb-6 border-b border-[var(--gt-border)]">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-6 py-2.5 text-[11px] uppercase tracking-[0.15em] font-semibold border-b-2 transition-colors ${
                tab === t.key
                  ? "border-[var(--gt-red)] text-[var(--gt-red)]"
                  : "border-transparent text-[var(--gt-muted)]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {(tab === "details" || isNew) && (
        <PackageForm pkg={pkg} onSaved={handleSaved} />
      )}

      {tab === "itinerary" && !isNew && pkg && (
        <ItineraryEditor packageId={pkg.id} days={days} onUpdate={loadData} />
      )}

      {tab === "pricing" && !isNew && pkg && (
        <PricingTierEditor
          packageId={pkg.id}
          showVehicle={pkg.show_vehicle}
          tiers={tiers}
          onUpdate={loadData}
        />
      )}
    </div>
  );
}
