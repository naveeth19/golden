"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { PricingTier } from "@/lib/supabase/types";

interface LocalTier {
  id: string;
  min_people: number;
  max_people: number;
  vehicle_name: string;
  price: number;
  price_type: "per_person" | "per_vehicle";
  isNew?: boolean;
}

export default function PricingTierEditor({
  packageId,
  showVehicle,
  tiers,
  onUpdate,
}: {
  packageId: string;
  showVehicle: boolean;
  tiers: PricingTier[];
  onUpdate: () => void;
}) {
  const [localTiers, setLocalTiers] = useState<LocalTier[]>(
    tiers.map((t) => ({
      id: t.id,
      min_people: t.min_people,
      max_people: t.max_people,
      vehicle_name: t.vehicle_name || "",
      price: Number(t.price),
      price_type: t.price_type || "per_person",
    }))
  );
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function addTier() {
    setLocalTiers([
      ...localTiers,
      {
        id: `new-${Date.now()}`,
        min_people: 1,
        max_people: 4,
        vehicle_name: "",
        price: 0,
        price_type: "per_person",
        isNew: true,
      },
    ]);
  }

  function updateTier(index: number, field: keyof LocalTier, value: string | number) {
    setLocalTiers(
      localTiers.map((t, i) =>
        i === index ? { ...t, [field]: value } : t
      )
    );
  }

  function removeTier(index: number) {
    const tier = localTiers[index];
    if (!tier.isNew) {
      setDeletedIds([...deletedIds, tier.id]);
    }
    setLocalTiers(localTiers.filter((_, i) => i !== index));
  }

  function validate(): string | null {
    for (let i = 0; i < localTiers.length; i++) {
      const t = localTiers[i];
      if (t.min_people >= t.max_people) {
        return `Row ${i + 1}: Min people must be less than max people.`;
      }
      if (t.price <= 0) {
        return `Row ${i + 1}: Price must be greater than 0.`;
      }
      for (let j = i + 1; j < localTiers.length; j++) {
        const o = localTiers[j];
        if (t.min_people <= o.max_people && o.min_people <= t.max_people) {
          return `Rows ${i + 1} and ${j + 1} have overlapping people ranges.`;
        }
      }
    }
    return null;
  }

  async function handleSave() {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setSaving(true);
    const supabase = createClient();

    // Delete removed tiers
    for (const id of deletedIds) {
      await supabase.from("package_pricing_tiers").delete().eq("id", id);
    }

    // Upsert tiers
    for (const tier of localTiers) {
      const payload = {
        package_id: packageId,
        min_people: tier.min_people,
        max_people: tier.max_people,
        vehicle_name: tier.vehicle_name || null,
        price: tier.price,
        price_type: tier.price_type,
      };

      if (tier.isNew) {
        await supabase.from("package_pricing_tiers").insert(payload);
      } else {
        await supabase
          .from("package_pricing_tiers")
          .update(payload)
          .eq("id", tier.id);
      }
    }

    setSaving(false);
    setDeletedIds([]);
    onUpdate();
  }

  const inputCls =
    "border border-[var(--gt-border)] px-2 py-1.5 text-sm focus:outline-none focus:border-[var(--gt-red)] w-full";

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[var(--gt-navy)]" style={{ fontFamily: "var(--font-playfair)" }}>
          Pricing Tiers
        </h2>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[var(--gt-red)] text-white text-[11px] uppercase tracking-[0.15em] font-semibold px-6 py-2 hover:bg-[var(--gt-red-dark)] transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Tiers"}
        </button>
      </div>

      {error && (
        <p className="text-xs text-red-600 font-medium mb-4">{error}</p>
      )}

      <div className="border border-[var(--gt-border)] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--gt-cream)]">
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold text-xs uppercase tracking-wider">Min People</th>
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold text-xs uppercase tracking-wider">Max People</th>
              {showVehicle && (
                <th className="text-left p-3 text-[var(--gt-navy)] font-semibold text-xs uppercase tracking-wider">Vehicle Name</th>
              )}
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold text-xs uppercase tracking-wider">Price</th>
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold text-xs uppercase tracking-wider">Price Type</th>
              <th className="p-3 w-10"></th>
            </tr>
          </thead>
          <tbody>
            {localTiers.map((tier, i) => (
              <tr key={tier.id} className="border-t border-[var(--gt-border)]">
                <td className="p-2">
                  <input
                    type="number"
                    value={tier.min_people}
                    onChange={(e) => updateTier(i, "min_people", parseInt(e.target.value) || 0)}
                    min={1}
                    className={inputCls}
                  />
                </td>
                <td className="p-2">
                  <input
                    type="number"
                    value={tier.max_people}
                    onChange={(e) => updateTier(i, "max_people", parseInt(e.target.value) || 0)}
                    min={1}
                    className={inputCls}
                  />
                </td>
                {showVehicle && (
                  <td className="p-2">
                    <input
                      type="text"
                      value={tier.vehicle_name}
                      onChange={(e) => updateTier(i, "vehicle_name", e.target.value)}
                      placeholder="e.g. Innova Crysta"
                      className={inputCls}
                    />
                  </td>
                )}
                <td className="p-2">
                  <input
                    type="number"
                    value={tier.price}
                    onChange={(e) => updateTier(i, "price", parseFloat(e.target.value) || 0)}
                    min={0}
                    className={inputCls}
                  />
                </td>
                <td className="p-2">
                  <select
                    value={tier.price_type}
                    onChange={(e) => updateTier(i, "price_type", e.target.value)}
                    className={inputCls}
                  >
                    <option value="per_person">Per Person</option>
                    <option value="per_vehicle">Per Vehicle</option>
                  </select>
                </td>
                <td className="p-2">
                  <button
                    type="button"
                    onClick={() => removeTier(i)}
                    className="text-[var(--gt-muted)] hover:text-[var(--gt-red)] transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
            {localTiers.length === 0 && (
              <tr>
                <td colSpan={showVehicle ? 6 : 5} className="p-6 text-center text-sm text-[var(--gt-muted)]">
                  No pricing tiers yet. Click &quot;Add Tier&quot; to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={addTier}
        className="mt-4 border border-dashed border-[var(--gt-border)] w-full py-3 text-sm text-[var(--gt-muted)] hover:text-[var(--gt-navy)] hover:border-[var(--gt-navy)] transition-colors"
      >
        + Add Tier
      </button>

      <div className="mt-6 space-y-1">
        <p className="text-xs text-[var(--gt-muted)]">
          Example: 2-4 people &rarr; Innova Crysta &rarr; Rs.6,500 per person
        </p>
        <p className="text-xs text-[var(--gt-muted)]">
          Example: 8-14 people &rarr; Tempo Traveller &rarr; Rs.4,500 per person
        </p>
      </div>
    </div>
  );
}
