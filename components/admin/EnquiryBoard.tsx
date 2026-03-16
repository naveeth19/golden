"use client";

import { createClient } from "@/lib/supabase/client";
import { waLink } from "@/lib/wa";
import { format } from "date-fns";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";

const statuses = ["new", "contacted", "confirmed", "closed", "cancelled"] as const;
const statusLabels: Record<string, string> = {
  new: "New",
  contacted: "Contacted",
  confirmed: "Confirmed",
  closed: "Closed",
  cancelled: "Cancelled",
};
const statusColors: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200",
  contacted: "bg-yellow-50 text-yellow-700 border-yellow-200",
  confirmed: "bg-green-50 text-green-700 border-green-200",
  closed: "bg-gray-50 text-gray-700 border-gray-200",
  cancelled: "bg-red-50 text-red-700 border-red-200",
};

export default function EnquiryBoard({
  enquiries,
  view,
  onUpdate,
}: {
  enquiries: Record<string, unknown>[];
  view: "kanban" | "table";
  onUpdate: () => void;
}) {
  const supabase = createClient();

  async function handleDragEnd(result: DropResult) {
    if (!result.destination) return;
    const newStatus = result.destination.droppableId;
    const enquiryId = result.draggableId;
    await supabase.from("enquiries").update({ status: newStatus }).eq("id", enquiryId);
    onUpdate();
  }

  if (view === "table") {
    return (
      <div className="border border-[var(--gt-border)] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--gt-cream)]">
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold">Name</th>
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold">Phone</th>
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold">Package/Vehicle</th>
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold">Date</th>
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold">Pax</th>
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold">Status</th>
              <th className="text-left p-3 text-[var(--gt-navy)] font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enq) => (
              <tr key={enq.id as string} className="border-t border-[var(--gt-border)]">
                <td className="p-3 text-[var(--gt-navy)]">{enq.name as string}</td>
                <td className="p-3">
                  <a href={`tel:${enq.phone}`} className="text-[var(--gt-red)] hover:underline">{enq.phone as string}</a>
                </td>
                <td className="p-3 text-[var(--gt-muted)]">
                  {(enq.packages as Record<string, string>)?.title || (enq.fleet as Record<string, string>)?.name || "-"}
                </td>
                <td className="p-3 text-[var(--gt-muted)]">
                  {enq.travel_date ? format(new Date(enq.travel_date as string), "MMM d, yyyy") : "-"}
                </td>
                <td className="p-3 text-[var(--gt-muted)]">{(enq.pax_count as number) || "-"}</td>
                <td className="p-3">
                  <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-1 border ${statusColors[enq.status as string] || ""}`}>
                    {enq.status as string}
                  </span>
                </td>
                <td className="p-3">
                  <a
                    href={waLink(`Hi ${enq.name}, this is Golden Travels following up on your enquiry.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[var(--gt-red)] font-medium hover:underline"
                  >
                    WhatsApp
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // Kanban view
  const grouped: Record<string, Record<string, unknown>[]> = {};
  statuses.forEach((s) => { grouped[s] = []; });
  enquiries.forEach((enq) => {
    const status = enq.status as string;
    if (grouped[status]) grouped[status].push(enq);
  });

  return (
    <>
      {/* Status counts */}
      <div className="flex gap-4 mb-6">
        {statuses.map((s) => (
          <div key={s} className={`text-xs px-3 py-1.5 border font-semibold ${statusColors[s]}`}>
            {statusLabels[s]}: {grouped[s].length}
          </div>
        ))}
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-5 gap-4 min-h-[400px]">
          {statuses.map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-[var(--gt-cream)] p-3 min-h-[300px]"
                >
                  <h3 className="text-[11px] uppercase tracking-wider font-semibold text-[var(--gt-navy)] mb-3">
                    {statusLabels[status]}
                  </h3>
                  {grouped[status].map((enq, index) => (
                    <Draggable key={enq.id as string} draggableId={enq.id as string} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white border border-[var(--gt-border)] p-3 mb-2"
                        >
                          <p className="text-sm font-semibold text-[var(--gt-navy)]">{enq.name as string}</p>
                          <a href={`tel:${enq.phone}`} className="text-xs text-[var(--gt-red)] hover:underline block mb-1">
                            {enq.phone as string}
                          </a>
                          <p className="text-[10px] text-[var(--gt-muted)]">
                            {(enq.packages as Record<string, string>)?.title || (enq.fleet as Record<string, string>)?.name || "General enquiry"}
                          </p>
                          {enq.travel_date ? (
                            <p className="text-[10px] text-[var(--gt-muted)] mt-1">
                              {format(new Date(String(enq.travel_date)), "MMM d, yyyy")}
                            </p>
                          ) : null}
                          {Number(enq.pax_count) > 0 ? (
                            <p className="text-[10px] text-[var(--gt-muted)]">
                              {String(enq.pax_count)} pax
                            </p>
                          ) : null}
                          <a
                            href={waLink(`Hi ${enq.name}, this is Golden Travels following up on your enquiry.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-2 text-[10px] text-[var(--gt-red)] font-semibold hover:underline"
                          >
                            WhatsApp
                          </a>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </>
  );
}
