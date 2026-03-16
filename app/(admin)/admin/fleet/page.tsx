"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Fleet } from "@/lib/supabase/types";
import FleetForm from "@/components/admin/FleetForm";
import { useRouter } from "next/navigation";

export default function AdminFleetPage() {
  const [fleet, setFleet] = useState<Fleet[]>([]);
  const [editing, setEditing] = useState<Fleet | null>(null);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    loadFleet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadFleet() {
    const { data } = await supabase
      .from("fleet")
      .select("*")
      .order("created_at", { ascending: true });
    setFleet((data as Fleet[]) || []);
  }

  async function toggleActive(id: string, current: boolean) {
    await supabase.from("fleet").update({ is_active: !current }).eq("id", id);
    loadFleet();
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;
    await supabase.from("fleet").delete().eq("id", id);
    loadFleet();
  }

  function handleEdit(vehicle: Fleet) {
    setEditing(vehicle);
    setShowForm(true);
  }

  function handleAdd() {
    setEditing(null);
    setShowForm(true);
  }

  function handleSaved() {
    setShowForm(false);
    setEditing(null);
    loadFleet();
    router.refresh();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1
          className="text-2xl font-bold text-[var(--gt-navy)]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Fleet Management
        </h1>
        <button
          onClick={handleAdd}
          className="bg-[var(--gt-red)] text-white text-[11px] uppercase tracking-[0.15em] font-semibold px-6 py-2.5 hover:bg-[var(--gt-red-dark)] transition-colors"
        >
          Add Vehicle
        </button>
      </div>

      {showForm && (
        <div className="mb-8 border border-[var(--gt-border)] p-6">
          <FleetForm
            vehicle={editing}
            onSaved={handleSaved}
            onCancel={() => { setShowForm(false); setEditing(null); }}
          />
        </div>
      )}

      <div className="border border-[var(--gt-border)] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--gt-cream)]">
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold">Name</th>
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold">Category</th>
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold">Capacity</th>
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold">Active</th>
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fleet.map((v) => (
              <tr key={v.id} className="border-t border-[var(--gt-border)]">
                <td className="p-3 text-[var(--gt-navy)] font-medium">{v.name}</td>
                <td className="p-3 text-[var(--gt-muted)]">{v.category}</td>
                <td className="p-3 text-[var(--gt-muted)]">{v.capacity}</td>
                <td className="p-3">
                  <button
                    onClick={() => toggleActive(v.id, v.is_active)}
                    className={`w-10 h-5 rounded-full relative transition-colors ${
                      v.is_active ? "bg-[var(--gt-red)]" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                        v.is_active ? "left-5" : "left-0.5"
                      }`}
                    />
                  </button>
                </td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(v)}
                    className="text-xs text-[var(--gt-red)] font-medium hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(v.id)}
                    className="text-xs text-[var(--gt-muted)] font-medium hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {fleet.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-[var(--gt-muted)]">
                  No vehicles yet. Add your first vehicle.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
