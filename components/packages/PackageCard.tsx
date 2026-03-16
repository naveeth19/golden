import Link from "next/link";
import type { Package } from "@/lib/supabase/types";
import { waLink } from "@/lib/wa";

const typeColors: Record<string, string> = {
  pilgrimage: "bg-[#4A1520]",
  outstation: "bg-[#1A3A2A]",
  airport: "bg-[#1A2A4A]",
  corporate: "bg-[var(--gt-navy-dark)]",
};

export default function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <div className="border border-[var(--gt-border)] overflow-hidden group">
      <div className={`${typeColors[pkg.type] || "bg-[var(--gt-navy)]"} p-6 min-h-[160px] flex flex-col justify-end`}>
        <span className="text-[10px] uppercase tracking-wider text-white/60 font-semibold mb-2 inline-block">
          {pkg.type}
        </span>
        <h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
          {pkg.title}
        </h3>
        {pkg.duration_days > 0 && (
          <p className="text-xs text-white/50 mt-1">{pkg.duration_days} Days</p>
        )}
      </div>
      <div className="p-6">
        <p className="text-sm text-[var(--gt-muted)] line-clamp-2 mb-4">
          {pkg.overview}
        </p>
        {pkg.price_from > 0 && (
          <p className="text-lg font-bold text-[var(--gt-navy)] mb-4">
            From <span className="text-[var(--gt-red)]">&#8377;{pkg.price_from.toLocaleString("en-IN")}</span>
          </p>
        )}
        <div className="flex gap-3">
          <a
            href={waLink(`Hi, I'm interested in the ${pkg.title} package.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center bg-[var(--gt-red)] text-white text-[11px] uppercase tracking-[0.1em] font-semibold px-4 py-2.5 hover:bg-[var(--gt-red-dark)] transition-colors"
          >
            WhatsApp
          </a>
          <Link
            href={`/packages/${pkg.slug}`}
            className="flex-1 inline-flex items-center justify-center border border-[var(--gt-border)] text-[var(--gt-navy)] text-[11px] uppercase tracking-[0.1em] font-semibold px-4 py-2.5 hover:bg-[var(--gt-navy)] hover:text-white transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
