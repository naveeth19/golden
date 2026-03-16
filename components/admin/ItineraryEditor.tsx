"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { ItineraryDay } from "@/lib/supabase/types";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";

export default function ItineraryEditor({
  packageId,
  days,
  onUpdate,
}: {
  packageId: string;
  days: ItineraryDay[];
  onUpdate: () => void;
}) {
  const [localDays, setLocalDays] = useState<ItineraryDay[]>(days);
  const [expandedDay, setExpandedDay] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  async function handleDragEnd(result: DropResult) {
    if (!result.destination) return;

    const items = Array.from(localDays);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);

    const updated = items.map((item, index) => ({
      ...item,
      day_number: index + 1,
    }));

    setLocalDays(updated);

    for (const day of updated) {
      await supabase
        .from("itinerary_days")
        .update({ day_number: day.day_number })
        .eq("id", day.id);
    }
    onUpdate();
  }

  async function addDay() {
    const newDayNumber = localDays.length + 1;
    const { data } = await supabase
      .from("itinerary_days")
      .insert({
        package_id: packageId,
        day_number: newDayNumber,
        title: `Day ${newDayNumber}`,
        description: "",
        meals: [],
        overnight_at: "",
      })
      .select()
      .single();

    if (data) {
      setLocalDays([...localDays, data as ItineraryDay]);
      setExpandedDay(data.id);
    }
  }

  async function updateDay(id: string, field: string, value: string | string[]) {
    setLocalDays(
      localDays.map((d) => (d.id === id ? { ...d, [field]: value } : d))
    );
  }

  async function saveDay(day: ItineraryDay) {
    setSaving(true);
    await supabase
      .from("itinerary_days")
      .update({
        title: day.title,
        description: day.description,
        meals: day.meals,
        overnight_at: day.overnight_at,
      })
      .eq("id", day.id);
    setSaving(false);
    onUpdate();
  }

  async function deleteDay(id: string) {
    if (!confirm("Delete this day?")) return;
    await supabase.from("itinerary_days").delete().eq("id", id);
    setLocalDays(localDays.filter((d) => d.id !== id));
    onUpdate();
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="days">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
              {localDays.map((day, index) => (
                <Draggable key={day.id} draggableId={day.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="border border-[var(--gt-border)]"
                    >
                      <div className="flex items-center justify-between p-3 bg-[var(--gt-cream)]">
                        <div className="flex items-center gap-3">
                          <span
                            {...provided.dragHandleProps}
                            className="cursor-grab text-[var(--gt-muted)]"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <line x1="8" y1="6" x2="16" y2="6" />
                              <line x1="8" y1="12" x2="16" y2="12" />
                              <line x1="8" y1="18" x2="16" y2="18" />
                            </svg>
                          </span>
                          <span className="text-sm font-semibold text-[var(--gt-red)]">
                            Day {day.day_number}
                          </span>
                          <span className="text-sm text-[var(--gt-navy)]">
                            {day.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setExpandedDay(expandedDay === day.id ? null : day.id)}
                            className="text-xs text-[var(--gt-muted)] hover:text-[var(--gt-navy)]"
                          >
                            {expandedDay === day.id ? "Collapse" : "Edit"}
                          </button>
                          <button
                            onClick={() => deleteDay(day.id)}
                            className="text-xs text-[var(--gt-muted)] hover:text-[var(--gt-red)]"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      {expandedDay === day.id && (
                        <div className="p-4 space-y-3">
                          <div>
                            <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1">Title</label>
                            <input
                              type="text"
                              value={day.title}
                              onChange={(e) => updateDay(day.id, "title", e.target.value)}
                              className="w-full border border-[var(--gt-border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--gt-red)]"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1">Description</label>
                            <textarea
                              rows={3}
                              value={day.description}
                              onChange={(e) => updateDay(day.id, "description", e.target.value)}
                              className="w-full border border-[var(--gt-border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--gt-red)] resize-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1">Meals (comma-separated)</label>
                            <input
                              type="text"
                              value={(day.meals || []).join(", ")}
                              onChange={(e) => updateDay(day.id, "meals", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
                              className="w-full border border-[var(--gt-border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--gt-red)]"
                              placeholder="Breakfast, Lunch, Dinner"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-1">Overnight At</label>
                            <input
                              type="text"
                              value={day.overnight_at}
                              onChange={(e) => updateDay(day.id, "overnight_at", e.target.value)}
                              className="w-full border border-[var(--gt-border)] px-3 py-2 text-sm focus:outline-none focus:border-[var(--gt-red)]"
                            />
                          </div>
                          <button
                            onClick={() => saveDay(day)}
                            disabled={saving}
                            className="bg-[var(--gt-red)] text-white text-[11px] uppercase tracking-[0.15em] font-semibold px-6 py-2 hover:bg-[var(--gt-red-dark)] transition-colors disabled:opacity-50"
                          >
                            {saving ? "Saving..." : "Save Day"}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button
        onClick={addDay}
        className="mt-4 border border-dashed border-[var(--gt-border)] w-full py-3 text-sm text-[var(--gt-muted)] hover:text-[var(--gt-navy)] hover:border-[var(--gt-navy)] transition-colors"
      >
        + Add Day
      </button>
    </div>
  );
}
