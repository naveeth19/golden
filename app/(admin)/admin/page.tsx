import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { waLink } from "@/lib/wa";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const [
    { count: fleetCount },
    { count: packageCount },
    { count: blogCount },
    { count: newEnquiryCount },
    { count: totalEnquiryCount },
  ] = await Promise.all([
    supabase.from("fleet").select("*", { count: "exact", head: true }),
    supabase.from("packages").select("*", { count: "exact", head: true }),
    supabase.from("blogs").select("*", { count: "exact", head: true }).eq("is_published", true),
    supabase.from("enquiries").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("enquiries").select("*", { count: "exact", head: true }),
  ]);

  const { data: recentEnquiries } = await supabase
    .from("enquiries")
    .select("*, packages(title), fleet(name)")
    .order("created_at", { ascending: false })
    .limit(5);

  const stats = [
    { label: "Total Vehicles", value: fleetCount || 0 },
    { label: "Total Packages", value: packageCount || 0 },
    { label: "Published Blogs", value: blogCount || 0 },
    { label: "New Enquiries", value: newEnquiryCount || 0 },
    { label: "Total Enquiries", value: totalEnquiryCount || 0 },
  ];

  return (
    <div>
      <h1
        className="text-2xl font-bold text-[var(--gt-navy)] mb-6"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="border border-[var(--gt-border)] p-4">
            <div className="text-2xl font-bold text-[var(--gt-navy)]">{s.value}</div>
            <div className="text-xs text-[var(--gt-muted)] mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Enquiries */}
      <h2 className="text-lg font-bold text-[var(--gt-navy)] mb-4">Recent Enquiries</h2>
      <div className="border border-[var(--gt-border)] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--gt-cream)]">
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold">Name</th>
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold">Package/Vehicle</th>
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold">Date</th>
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold">Status</th>
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {(recentEnquiries || []).map((enq: Record<string, unknown>) => (
              <tr key={enq.id as string} className="border-t border-[var(--gt-border)]">
                <td className="p-3 text-[var(--gt-navy)]">{enq.name as string}</td>
                <td className="p-3 text-[var(--gt-muted)]">
                  {(enq.packages as Record<string, string>)?.title || (enq.fleet as Record<string, string>)?.name || "-"}
                </td>
                <td className="p-3 text-[var(--gt-muted)]">
                  {enq.created_at ? format(new Date(enq.created_at as string), "MMM d, yyyy") : "-"}
                </td>
                <td className="p-3">
                  <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-1 ${
                    enq.status === "new" ? "bg-blue-50 text-blue-600" :
                    enq.status === "contacted" ? "bg-yellow-50 text-yellow-600" :
                    enq.status === "confirmed" ? "bg-green-50 text-green-600" :
                    "bg-gray-50 text-gray-600"
                  }`}>
                    {enq.status as string}
                  </span>
                </td>
                <td className="p-3">
                  <a
                    href={waLink(`Hi ${enq.name}, this is Golden Travels following up on your enquiry.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--gt-red)] text-xs font-medium hover:underline"
                  >
                    WhatsApp
                  </a>
                </td>
              </tr>
            ))}
            {(!recentEnquiries || recentEnquiries.length === 0) && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-[var(--gt-muted)]">
                  No enquiries yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
