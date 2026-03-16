"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Package } from "@/lib/supabase/types";
import Link from "next/link";

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const supabase = createClient();

  useEffect(() => {
    loadPackages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadPackages() {
    const { data } = await supabase
      .from("packages")
      .select("*")
      .order("created_at", { ascending: false });
    setPackages((data as Package[]) || []);
  }

  async function toggleField(id: string, field: "is_featured" | "is_active", current: boolean) {
    await supabase.from("packages").update({ [field]: !current }).eq("id", id);
    loadPackages();
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this package?")) return;
    await supabase.from("itinerary_days").delete().eq("package_id", id);
    await supabase.from("packages").delete().eq("id", id);
    loadPackages();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--gt-navy)]" style={{ fontFamily: "var(--font-playfair)" }}>
          Package Management
        </h1>
        <Link
          href="/admin/packages/new"
          className="bg-[var(--gt-red)] text-white text-[11px] uppercase tracking-[0.15em] font-semibold px-6 py-2.5 hover:bg-[var(--gt-red-dark)] transition-colors"
        >
          Add Package
        </Link>
      </div>

      <div className="border border-[var(--gt-border)] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--gt-cream)]">
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold">Title</th>
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold">Type</th>
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold">Duration</th>
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold">Price From</th>
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold">Featured</th>
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold">Active</th>
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg.id} className="border-t border-[var(--gt-border)]">
                <td className="p-3 text-[var(--gt-navy)] font-medium">{pkg.title}</td>
                <td className="p-3 text-[var(--gt-muted)] capitalize">{pkg.type}</td>
                <td className="p-3 text-[var(--gt-muted)]">{pkg.duration_days} days</td>
                <td className="p-3 text-[var(--gt-muted)]">
                  {pkg.price_from > 0 ? `₹${pkg.price_from.toLocaleString("en-IN")}` : "-"}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => toggleField(pkg.id, "is_featured", pkg.is_featured)}
                    className={`w-10 h-5 rounded-full relative transition-colors ${pkg.is_featured ? "bg-[var(--gt-red)]" : "bg-gray-300"}`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${pkg.is_featured ? "left-5" : "left-0.5"}`} />
                  </button>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => toggleField(pkg.id, "is_active", pkg.is_active)}
                    className={`w-10 h-5 rounded-full relative transition-colors ${pkg.is_active ? "bg-[var(--gt-red)]" : "bg-gray-300"}`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${pkg.is_active ? "left-5" : "left-0.5"}`} />
                  </button>
                </td>
                <td className="p-3 flex gap-2">
                  <Link href={`/admin/packages/${pkg.id}`} className="text-xs text-[var(--gt-red)] font-medium hover:underline">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(pkg.id)} className="text-xs text-[var(--gt-muted)] font-medium hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {packages.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-[var(--gt-muted)]">No packages yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
