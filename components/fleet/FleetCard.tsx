import Link from "next/link";
import type { Fleet } from "@/lib/supabase/types";

export default function FleetCard({ vehicle }: { vehicle: Fleet }) {
  return (
    <Link
      href={`/fleet/${vehicle.slug}`}
      className="border border-[var(--gt-border)] bg-white group block"
    >
      <div className="h-48 bg-[var(--gt-navy)] flex items-center justify-center relative overflow-hidden">
        {vehicle.images && vehicle.images.length > 0 ? (
          <img
            src={vehicle.images[0]}
            alt={vehicle.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <svg width="80" height="40" viewBox="0 0 80 40" fill="none" stroke="white" strokeWidth="1" opacity="0.2">
            <rect x="10" y="15" width="60" height="15" rx="3" />
            <circle cx="22" cy="32" r="5" />
            <circle cx="58" cy="32" r="5" />
            <path d="M55 15V8h-20v7" />
          </svg>
        )}
        <span className="absolute top-3 left-3 bg-[var(--gt-red)] text-white text-[10px] uppercase tracking-wider font-semibold px-2 py-1">
          {vehicle.category}
        </span>
      </div>
      <div className="p-5">
        <h3
          className="text-lg font-bold text-[var(--gt-navy)] mb-1 group-hover:text-[var(--gt-red)] transition-colors"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {vehicle.name}
        </h3>
        <p className="text-xs text-[var(--gt-muted)] mb-3">
          {vehicle.capacity} Seater
        </p>
        <div className="flex flex-wrap gap-1.5">
          {(vehicle.features || []).slice(0, 4).map((f: string) => (
            <span
              key={f}
              className="text-[10px] px-2 py-0.5 border border-[var(--gt-red)]/20 text-[var(--gt-red)]"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
