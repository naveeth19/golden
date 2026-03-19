import { createClient } from "@/lib/supabase/server";
import type { Package } from "@/lib/supabase/types";
import Link from "next/link";
import Image from "next/image";
import { waLink } from "@/lib/wa";

const typeColors: Record<string, string> = {
  pilgrimage: "linear-gradient(135deg, #1a0c0e, #3a1020)",
  outstation: "linear-gradient(135deg, #0c1a10, #163a20)",
  airport: "linear-gradient(135deg, #0c0e1a, #151a3a)",
  corporate: "linear-gradient(135deg, #1a1812, #2d2820)",
};

export default async function PackagesGrid() {
  const supabase = await createClient();
  const { data: packages } = await supabase
    .from("packages")
    .select("*")
    .eq("is_featured", true)
    .eq("is_active", true)
    .limit(3);

  const pkgs: Package[] = packages || [];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--gt-red)] font-semibold block mb-3">
            Popular Packages
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--gt-navy)]" style={{ fontFamily: "var(--font-playfair)" }}>
            Curated travel experiences
          </h2>
        </div>

        {pkgs.length === 0 ? (
          <p className="text-center text-[var(--gt-muted)] text-sm">No featured packages at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pkgs.map((pkg) => (
              <div key={pkg.id} className="border border-[var(--gt-border)] overflow-hidden group">
                <div className="relative min-h-[160px]">
                  {pkg.cover_image ? (
                    <>
                      <Image
                        src={pkg.cover_image}
                        alt={pkg.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    </>
                  ) : (
                    <div className={`${typeColors[pkg.type] || "bg-[var(--gt-navy)]"} absolute inset-0`} />
                  )}
                  <div className="relative p-6 flex flex-col justify-end h-full">
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
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
