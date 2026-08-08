import { yearsOfService } from "@/lib/brand";

/**
 * Trust figures. Every number here must be defensible.
 *
 * - Years: computed from FOUNDED_YEAR, not hardcoded.
 * - Vehicles: verified count of active rows in the `fleet` table.
 * - Clients: pre-existing marketing figure, carried over unchanged.
 *
 * A "4.9 rating" stat was removed: nothing in the codebase or database
 * backs it, and there is no review integration to source it from.
 */
export default function ProofStrip() {
  const stats = [
    { value: String(yearsOfService()), suffix: "", label: "Years on the road" },
    { value: "36", suffix: "", label: "Vehicles in the fleet" },
    { value: "500", suffix: "+", label: "Clients served" },
  ];

  return (
    <section className="border-b border-[var(--gt-border)] bg-[var(--gt-cream)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-0">
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={[
                "py-10 lg:py-14 px-6 lg:px-12",
                "border-[var(--gt-border)]",
                i < stats.length - 1 ? "border-b sm:border-b-0 sm:border-r" : "",
              ].join(" ")}
            >
              <div className="flex items-baseline gap-0.5">
                <span
                  className="text-[clamp(2.25rem,5vw,3.5rem)] leading-none tracking-[-0.03em] text-[var(--gt-navy)] tabular-nums"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {s.value}
                </span>
                {s.suffix && (
                  <span
                    className="text-[clamp(1.1rem,2vw,1.5rem)] leading-none text-[var(--gt-red)]"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {s.suffix}
                  </span>
                )}
              </div>
              <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-[var(--gt-muted)]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
