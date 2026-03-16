"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import EnquiryBoard from "@/components/admin/EnquiryBoard";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Record<string, unknown>[]>([]);
  const [view, setView] = useState<"kanban" | "table">("kanban");
  const supabase = createClient();

  useEffect(() => {
    loadEnquiries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadEnquiries() {
    const { data } = await supabase
      .from("enquiries")
      .select("*, packages(title), fleet(name)")
      .order("created_at", { ascending: false });
    setEnquiries(data || []);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[var(--gt-navy)]" style={{ fontFamily: "var(--font-playfair)" }}>
          Enquiries
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => setView("kanban")}
            className={`text-[11px] uppercase tracking-[0.15em] font-semibold px-4 py-2 border transition-colors ${
              view === "kanban" ? "bg-[var(--gt-red)] text-white border-[var(--gt-red)]" : "text-[var(--gt-navy)] border-[var(--gt-border)]"
            }`}
          >
            Board
          </button>
          <button
            onClick={() => setView("table")}
            className={`text-[11px] uppercase tracking-[0.15em] font-semibold px-4 py-2 border transition-colors ${
              view === "table" ? "bg-[var(--gt-red)] text-white border-[var(--gt-red)]" : "text-[var(--gt-navy)] border-[var(--gt-border)]"
            }`}
          >
            Table
          </button>
        </div>
      </div>

      <EnquiryBoard enquiries={enquiries} view={view} onUpdate={loadEnquiries} />
    </div>
  );
}
