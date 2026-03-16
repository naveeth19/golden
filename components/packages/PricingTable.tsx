export default function PricingTable({ priceFrom }: { priceFrom: number }) {
  return (
    <div className="border border-[var(--gt-border)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-[var(--gt-cream)]">
            <th className="text-left p-4 text-[var(--gt-navy)] font-semibold">Group Size</th>
            <th className="text-left p-4 text-[var(--gt-navy)] font-semibold">Price Per Person</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-[var(--gt-border)]">
            <td className="p-4 text-[var(--gt-muted)]">2 Persons</td>
            <td className="p-4 text-[var(--gt-navy)] font-semibold">
              &#8377;{priceFrom > 0 ? Math.round(priceFrom * 1.4).toLocaleString("en-IN") : "On Request"}
            </td>
          </tr>
          <tr className="border-t border-[var(--gt-border)]">
            <td className="p-4 text-[var(--gt-muted)]">4 Persons</td>
            <td className="p-4 text-[var(--gt-navy)] font-semibold">
              &#8377;{priceFrom > 0 ? Math.round(priceFrom * 1.1).toLocaleString("en-IN") : "On Request"}
            </td>
          </tr>
          <tr className="border-t border-[var(--gt-border)]">
            <td className="p-4 text-[var(--gt-muted)]">6 Persons</td>
            <td className="p-4 text-[var(--gt-navy)] font-semibold">
              &#8377;{priceFrom > 0 ? priceFrom.toLocaleString("en-IN") : "On Request"}
            </td>
          </tr>
          <tr className="border-t border-[var(--gt-border)]">
            <td className="p-4 text-[var(--gt-muted)]">10+ Persons</td>
            <td className="p-4 text-[var(--gt-red)] font-semibold">Contact Us</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
