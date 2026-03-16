"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Package, ItineraryDay } from "@/lib/supabase/types";
import PackageForm from "@/components/admin/PackageForm";
import ItineraryEditor from "@/components/admin/ItineraryEditor";

export default function AdminPackageEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const isNew = id === "new";
  const [tab, setTab] = useState<"details" | "itinerary">("details");
  const [pkg, setPkg] = useState<Package | null>(null);
  const [days, setDays] = useState<ItineraryDay[]>([]);
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
    const { data: pkgData } = await supabase
      .from("packages")
      .select("*")
      .eq("id", id)
      .single();
    if (pkgData) setPkg(pkgData as Package);

    const { data: dayData } = await supabase
      .from("itinerary_days")
      .select("*")
      .eq("package_id", id)
      .order("day_number", { ascending: true });
    setDays((dayData as ItineraryDay[]) || []);
    setLoading(false);
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
          <button
            onClick={() => setTab("details")}
            className={`px-6 py-2.5 text-[11px] uppercase tracking-[0.15em] font-semibold border-b-2 transition-colors ${
              tab === "details" ? "border-[var(--gt-red)] text-[var(--gt-red)]" : "border-transparent text-[var(--gt-muted)]"
            }`}
          >
            Details
          </button>
          <button
            onClick={() => setTab("itinerary")}
            className={`px-6 py-2.5 text-[11px] uppercase tracking-[0.15em] font-semibold border-b-2 transition-colors ${
              tab === "itinerary" ? "border-[var(--gt-red)] text-[var(--gt-red)]" : "border-transparent text-[var(--gt-muted)]"
            }`}
          >
            Itinerary
          </button>
        </div>
      )}

      {(tab === "details" || isNew) && (
        <PackageForm pkg={pkg} onSaved={handleSaved} />
      )}

      {tab === "itinerary" && !isNew && pkg && (
        <ItineraryEditor packageId={pkg.id} days={days} onUpdate={loadData} />
      )}
    </div>
  );
}
