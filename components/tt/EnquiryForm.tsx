"use client";

import { useState } from "react";
import { TT_VEHICLES, PHONE_DISPLAY } from "@/lib/tt/content";

const TRIP_TYPES = ["City (8hr/80km)", "Outstation", "Airport"] as const;

/**
 * Landing enquiry form.
 *
 * Deliberately NO <form> element — submission is a plain onClick so no
 * browser navigation can ever occur on a paid landing page.
 *
 * TODO(confirm): posts to the Supabase `enquiries` table — the same table the
 * contact page writes to and the admin Enquiries board reads from. The client
 * never answered "where should the form post"; this is the in-repo default.
 * Swap `submit()` if they want email/CRM instead.
 *
 * All inputs are 16px font — below that, iOS Safari zooms the page on focus.
 */
export default function EnquiryForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [vehicle, setVehicle] = useState(TT_VEHICLES[0].name);
  const [tripType, setTripType] = useState<string>(TRIP_TYPES[1]);
  const [date, setDate] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit() {
    if (!name.trim() || !phone.trim()) {
      setState("error");
      return;
    }
    setState("sending");
    // Supabase client is dynamically imported so its ~54KB never lands in the
    // landing page's First Load JS — it downloads only when someone submits.
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const { error } = await supabase.from("enquiries").insert({
      name: name.trim(),
      phone: phone.trim(),
      travel_date: date || null,
      notes: `[TT landing] Vehicle: ${vehicle} · Trip: ${tripType}`,
      status: "new",
    });
    setState(error ? "error" : "done");
  }

  if (state === "done") {
    return (
      <div className="border border-[var(--gt-border)] bg-white p-8 text-center">
        <h3 className="text-xl text-[var(--gt-navy)] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
          Enquiry received
        </h3>
        <p className="text-sm text-[var(--gt-muted)]">
          We will call you back shortly. For anything urgent: {PHONE_DISPLAY}
        </p>
      </div>
    );
  }

  const inputCls =
    "w-full border border-[var(--gt-border)] bg-white px-4 py-3 text-[16px] text-[var(--gt-navy)] focus:outline-none focus:border-[var(--gt-red)]";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label htmlFor="tt-name" className="block text-[11px] uppercase tracking-[0.14em] text-[var(--gt-muted)] mb-1.5">
          Name
        </label>
        <input id="tt-name" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
      </div>
      <div>
        <label htmlFor="tt-phone" className="block text-[11px] uppercase tracking-[0.14em] text-[var(--gt-muted)] mb-1.5">
          Phone
        </label>
        <input id="tt-phone" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} />
      </div>
      <div>
        <label htmlFor="tt-vehicle" className="block text-[11px] uppercase tracking-[0.14em] text-[var(--gt-muted)] mb-1.5">
          Vehicle
        </label>
        <select id="tt-vehicle" value={vehicle} onChange={(e) => setVehicle(e.target.value)} className={inputCls}>
          {TT_VEHICLES.map((v) => (
            <option key={v.slug} value={v.name}>
              {v.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="tt-trip" className="block text-[11px] uppercase tracking-[0.14em] text-[var(--gt-muted)] mb-1.5">
          Trip type
        </label>
        <select id="tt-trip" value={tripType} onChange={(e) => setTripType(e.target.value)} className={inputCls}>
          {TRIP_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="tt-date" className="block text-[11px] uppercase tracking-[0.14em] text-[var(--gt-muted)] mb-1.5">
          Pickup date
        </label>
        <input id="tt-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className={inputCls} />
      </div>

      {state === "error" && (
        <p className="sm:col-span-2 text-sm text-[var(--gt-red)]">
          {!name.trim() || !phone.trim()
            ? "Please fill in your name and phone number."
            : `Something went wrong — please call us at ${PHONE_DISPLAY}.`}
        </p>
      )}

      <div className="sm:col-span-2">
        <button
          type="button"
          onClick={submit}
          disabled={state === "sending"}
          className="w-full min-h-[48px] bg-[var(--gt-red)] text-white text-[12px] uppercase tracking-[0.12em] font-semibold px-8 hover:bg-[var(--gt-red-dark)] transition-colors disabled:opacity-60"
        >
          {state === "sending" ? "Sending…" : "Request a Call Back"}
        </button>
      </div>
    </div>
  );
}
