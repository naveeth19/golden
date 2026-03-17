import type { PricingTier } from "@/lib/supabase/types";

export default function PricingTable({
  tiers,
  count,
  showVehicle,
}: {
  tiers: PricingTier[];
  count: number;
  showVehicle: boolean;
}) {
  return (
    <div className="border border-[var(--gt-border)] overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[var(--gt-cream)]">
            <th className="text-left p-4 text-[var(--gt-navy)] font-semibold">Group Size</th>
            {showVehicle && (
              <th className="text-left p-4 text-[var(--gt-navy)] font-semibold">Vehicle</th>
            )}
            <th className="text-left p-4 text-[var(--gt-navy)] font-semibold">Price</th>
            <th className="text-left p-4 text-[var(--gt-navy)] font-semibold">Price Type</th>
          </tr>
        </thead>
        <tbody>
          {tiers.map((tier) => {
            const isMatch =
              count >= tier.min_people && count <= tier.max_people;
            return (
              <tr
                key={tier.id}
                className={`border-t border-[var(--gt-border)] transition-colors duration-200 ${
                  isMatch ? "bg-red-50" : ""
                }`}
              >
                <td className="p-4 text-[var(--gt-navy)] font-medium">
                  {tier.min_people} - {tier.max_people} people
                </td>
                {showVehicle && (
                  <td className="p-4 text-[var(--gt-muted)]">
                    {tier.vehicle_name || "-"}
                  </td>
                )}
                <td className="p-4 text-[var(--gt-navy)] font-semibold">
                  &#8377;{Number(tier.price).toLocaleString("en-IN")}
                </td>
                <td className="p-4 text-[var(--gt-muted)] capitalize">
                  {(tier.price_type || "per_person").replace("_", " ")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
