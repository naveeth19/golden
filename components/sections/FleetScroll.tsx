import { createClient } from "@/lib/supabase/server";
import type { Fleet } from "@/lib/supabase/types";
import Link from "next/link";

export default async function FleetScroll() {
  const supabase = await createClient();
  const { data: vehicles } = await supabase
    .from("fleet")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  const fleet: Fleet[] = vehicles || [];

  return (
    <section className="bg-[var(--gt-cream)] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--gt-red)] font-semibold block mb-3">
              Our Fleet
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--gt-navy)]" style={{ fontFamily: "var(--font-playfair)" }}>
              Premium vehicles for every journey
            </h2>
          </div>
          <Link
            href="/fleet"
            className="hidden md:inline-flex items-center text-sm text-[var(--gt-red)] font-medium hover:underline"
          >
            View All
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
          {fleet.length === 0 ? (
            <p className="text-[var(--gt-muted)] text-sm">No vehicles available at the moment.</p>
          ) : (
            fleet.map((v) => (
              <Link
                key={v.id}
                href={`/fleet/${v.slug}`}
                className="min-w-[280px] max-w-[280px] border border-[var(--gt-border)] bg-white flex-shrink-0 group"
              >
                <div className="h-40 bg-[var(--gt-navy)] flex items-center justify-center relative overflow-hidden">
                  <svg width="80" height="40" viewBox="0 0 80 40" fill="none" stroke="white" strokeWidth="1" opacity="0.2">
                    <rect x="10" y="15" width="60" height="15" rx="3" />
                    <circle cx="22" cy="32" r="5" />
                    <circle cx="58" cy="32" r="5" />
                    <path d="M55 15V8h-20v7" />
                  </svg>
                  <span className="absolute top-3 left-3 bg-[var(--gt-red)] text-white text-[10px] uppercase tracking-wider font-semibold px-2 py-1">
                    {v.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-[var(--gt-navy)] mb-1 group-hover:text-[var(--gt-red)] transition-colors" style={{ fontFamily: "var(--font-playfair)" }}>
                    {v.name}
                  </h3>
                  <p className="text-xs text-[var(--gt-muted)] mb-3">{v.capacity} Seater</p>
                  <div className="flex flex-wrap gap-1.5">
                    {(v.features || []).slice(0, 3).map((f: string) => (
                      <span key={f} className="text-[10px] px-2 py-0.5 border border-[var(--gt-red)]/20 text-[var(--gt-red)]">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
