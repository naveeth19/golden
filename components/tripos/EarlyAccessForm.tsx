"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icons";
import { BUSINESS_TYPES, CHALLENGES, CONTACT } from "@/lib/tripos/content";
import { LEADS_ENABLED, submitEarlyAccess, type EarlyAccessLead } from "@/lib/tripos/submit";

const EMPTY: EarlyAccessLead = {
  name: "",
  business: "",
  email: "",
  phone: "",
  city: "",
  businessType: "",
  tools: "",
  challenge: "",
};

type Errors = Partial<Record<"name" | "business" | "email" | "phone", string>>;
type Status = "idle" | "sending" | "done" | "failed";

// Deliberately permissive: one @, a dot in the domain, no spaces.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: EarlyAccessLead): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!v.business.trim()) e.business = "Please enter your business or agency name.";
  if (!v.email.trim()) e.email = "Please enter an email address.";
  else if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address, like name@agency.com.";
  if (v.phone.trim() && v.phone.replace(/\D/g, "").length < 8) e.phone = "That phone number looks too short.";
  return e;
}

export default function EarlyAccessForm() {
  const [values, setValues] = useState<EarlyAccessLead>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");
  const inFlight = useRef(false); // guards double-submit between clicks and re-render
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "done") doneRef.current?.focus();
  }, [status]);

  const set = (k: keyof EarlyAccessLead) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k as keyof Errors]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current || !LEADS_ENABLED) return;

    const found = validate(values);
    setErrors(found);
    const firstBad = (["name", "business", "email", "phone"] as const).find((k) => found[k]);
    if (firstBad) {
      document.getElementById(`tp-${firstBad}`)?.focus();
      return;
    }
    // Bots fill hidden fields. Pretend nothing happened rather than tipping
    // them off — but never show the success state either.
    if (honeypot) return;

    inFlight.current = true;
    setStatus("sending");
    const trimmed = Object.fromEntries(
      Object.entries(values).map(([k, v]) => [k, v.trim()])
    ) as unknown as EarlyAccessLead;
    const res = await submitEarlyAccess(trimmed);
    inFlight.current = false;
    // On failure `values` is untouched, so the visitor loses nothing.
    setStatus(res.ok ? "done" : "failed");
  }

  if (status === "done") {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center outline-none">
        <span className="mx-auto mb-4 grid h-11 w-11 place-items-center rounded-full bg-[rgba(47,138,91,0.18)] text-[#7fd3a5]">
          <Icon name="check" size={22} />
        </span>
        <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-white">Thanks, {values.name.split(" ")[0]}. We have your details.</h3>
        <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-[#a7b0c2]">
          The Golden Travels team will be in touch at {values.email}. TripOS is still in development, so we&apos;ll
          use what you shared to shape what we build next.
        </p>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby="tp-privacy" className="space-y-5">
      {!LEADS_ENABLED && (
        <div role="note" className="rounded-xl border border-[rgba(201,154,69,0.35)] bg-[rgba(201,154,69,0.08)] p-4 text-[14px] leading-relaxed text-[#e9d9b6]">
          Online early-access requests aren&apos;t switched on yet. Please{" "}
          <a href={CONTACT.mailHref} className="underline underline-offset-2">email us</a> or{" "}
          <a href={CONTACT.waHref} className="underline underline-offset-2">message us on WhatsApp</a> instead.
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" required error={errors.name}>
          <input id="tp-name" className="tp-input" autoComplete="name" value={values.name} onChange={set("name")} {...aria("name", errors)} />
        </Field>
        <Field id="business" label="Business or agency name" required error={errors.business}>
          <input id="tp-business" className="tp-input" autoComplete="organization" value={values.business} onChange={set("business")} {...aria("business", errors)} />
        </Field>
        <Field id="email" label="Work email" required error={errors.email}>
          <input id="tp-email" type="email" inputMode="email" className="tp-input" autoComplete="email" placeholder="you@agency.com" value={values.email} onChange={set("email")} {...aria("email", errors)} />
        </Field>
        <Field id="phone" label="Phone" error={errors.phone}>
          <input id="tp-phone" type="tel" inputMode="tel" className="tp-input" autoComplete="tel" value={values.phone} onChange={set("phone")} {...aria("phone", errors)} />
        </Field>
        <Field id="city" label="City">
          <input id="tp-city" className="tp-input" autoComplete="address-level2" value={values.city} onChange={set("city")} />
        </Field>
        <Field id="businessType" label="Type of travel business">
          <select id="tp-businessType" className="tp-input" value={values.businessType} onChange={set("businessType")}>
            <option value="">Select one</option>
            {BUSINESS_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
      </div>

      <Field id="challenge" label="What would you most like TripOS to improve?">
        <select id="tp-challenge" className="tp-input" value={values.challenge} onChange={set("challenge")}>
          <option value="">Select one</option>
          {CHALLENGES.map((t) => <option key={t}>{t}</option>)}
        </select>
      </Field>
      <Field id="tools" label="Tools you use today for enquiries and quotes">
        <textarea id="tp-tools" rows={3} className="tp-input resize-y" placeholder="For example: WhatsApp, Excel, Google Sheets, email" value={values.tools} onChange={set("tools")} />
      </Field>

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="tp-website">Website</label>
        <input id="tp-website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <div aria-live="polite">
        {status === "failed" && (
          <div role="alert" className="rounded-xl border border-[rgba(240,138,126,0.4)] bg-[rgba(240,138,126,0.08)] p-4 text-[14px] leading-relaxed text-[#f8c4bd]">
            We couldn&apos;t send your request just now. Your answers are still here, so you can try again, or reach
            us directly at <a href={CONTACT.mailHref} className="underline underline-offset-2">{CONTACT.email}</a> or{" "}
            <a href={CONTACT.waHref} className="underline underline-offset-2">WhatsApp</a>.
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="tp-btn tp-btn-gold w-full sm:w-auto" disabled={sending || !LEADS_ENABLED} aria-disabled={sending || !LEADS_ENABLED}>
          {sending ? "Sending…" : "Request Early Access"}
          {!sending && <Icon name="arrow" size={16} />}
        </button>
        <p className="text-[13px] text-[#8e98ad]">
          <span aria-hidden="true">*</span> Required
        </p>
      </div>

      <p id="tp-privacy" className="text-[13px] leading-relaxed text-[#8e98ad]">
        {LEADS_ENABLED
          ? "We only use these details to respond to your request and to ask for feedback on TripOS. They are stored with Golden Travels' enquiry records and are not shared or sold."
          : "This form doesn't send or store anything yet. Please use email or WhatsApp to reach us."}
      </p>
    </form>
  );
}

function aria(k: keyof Errors, errors: Errors) {
  return {
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `tp-${k}-err` : undefined,
    "aria-required": ["name", "business", "email"].includes(k) ? true : undefined,
  } as const;
}

function Field({ id, label, required, error, children }: { id: string; label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return (
    <div className="tp-field">
      <label htmlFor={`tp-${id}`}>
        {label}
        {required ? <span aria-hidden="true" className="text-[var(--tp-gold)]"> *</span> : <span className="tp-opt"> (optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`tp-${id}-err`} className="tp-err">
          {error}
        </p>
      )}
    </div>
  );
}
