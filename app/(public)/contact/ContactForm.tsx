"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: dbError } = await supabase.from("enquiries").insert({
      name: form.name,
      phone: form.phone,
      notes: form.message,
      status: "new",
    });

    setLoading(false);

    if (dbError) {
      setError("Something went wrong. Please try again or call us directly.");
      return;
    }

    setSuccess(true);
    setForm({ name: "", phone: "", message: "" });
  }

  if (success) {
    return (
      <div className="border border-[var(--gt-border)] p-8 flex flex-col items-center justify-center text-center">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gt-red)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        <h3
          className="text-xl font-bold text-[var(--gt-navy)] mb-2"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Thank you for your enquiry
        </h3>
        <p className="text-sm text-[var(--gt-muted)] mb-4">
          We will get back to you shortly. You can also reach us directly at +91 98450 33877.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="text-sm text-[var(--gt-red)] font-medium hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="border border-[var(--gt-border)] p-8">
      <h2
        className="text-2xl font-bold text-[var(--gt-navy)] mb-6"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Send us a message
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-2">
            Name
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-[var(--gt-border)] px-4 py-2.5 text-sm text-[var(--gt-navy)] focus:outline-none focus:border-[var(--gt-red)] transition-colors"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-2">
            Phone
          </label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-[var(--gt-border)] px-4 py-2.5 text-sm text-[var(--gt-navy)] focus:outline-none focus:border-[var(--gt-red)] transition-colors"
            placeholder="+91 98765 43210"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[var(--gt-navy)] uppercase tracking-wider mb-2">
            Message
          </label>
          <textarea
            required
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full border border-[var(--gt-border)] px-4 py-2.5 text-sm text-[var(--gt-navy)] focus:outline-none focus:border-[var(--gt-red)] transition-colors resize-none"
            placeholder="Tell us about your travel needs..."
          />
        </div>
        {error && (
          <p className="text-sm text-[var(--gt-red)]">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--gt-red)] text-white text-[11px] uppercase tracking-[0.15em] font-semibold px-6 py-3 hover:bg-[var(--gt-red-dark)] transition-colors disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
