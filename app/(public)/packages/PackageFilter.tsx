"use client";

import { useState } from "react";
import type { Package } from "@/lib/supabase/types";
import PackageCard from "@/components/packages/PackageCard";

const tabs = [
  { value: "all", label: "All" },
  { value: "pilgrimage", label: "Pilgrimage" },
  { value: "outstation", label: "Outstation" },
  { value: "airport", label: "Airport" },
  { value: "corporate", label: "Corporate" },
];

export default function PackageFilter({ packages }: { packages: Package[] }) {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all" ? packages : packages.filter((p) => p.type === active);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActive(tab.value)}
            className={`text-[11px] uppercase tracking-[0.15em] font-semibold px-5 py-2 border transition-colors ${
              active === tab.value
                ? "bg-[var(--gt-red)] text-white border-[var(--gt-red)]"
                : "bg-white text-[var(--gt-navy)] border-[var(--gt-border)] hover:border-[var(--gt-navy)]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-[var(--gt-muted)] py-12">
          No packages available in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      )}
    </>
  );
}
