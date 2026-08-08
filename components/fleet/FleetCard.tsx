import Link from "next/link";
import Image from "next/image";
import type { Fleet } from "@/lib/supabase/types";
import VehicleSilhouette from "@/components/fleet/VehicleSilhouette";

export default function FleetCard({
  vehicle,
  priority = false,
}: {
  vehicle: Fleet;
  /** Set on the first row of the grid so the LCP image is not lazy-loaded. */
  priority?: boolean;
}) {
  return (
    <Link
      href={`/fleet/${vehicle.slug}`}
      className="border border-[var(--gt-border)] bg-white group block"
    >
      <div className="h-48 bg-[var(--gt-navy)] flex items-center justify-center relative overflow-hidden">
        {vehicle.images?.[0] ? (
          <Image
            src={vehicle.images[0]}
            alt={vehicle.name}
            width={420}
            height={192}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            loading={priority ? undefined : "lazy"}
            className="w-full h-full object-cover"
          />
        ) : (
          <VehicleSilhouette className="text-white" />
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
