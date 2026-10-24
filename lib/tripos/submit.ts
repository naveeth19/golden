/**
 * TripOS early-access submission adapter.
 *
 * The ONLY place the early-access form touches a backend. Swap this file to
 * move leads to a CRM, email service or a dedicated table — the form does not
 * need to change.
 *
 * Current target: the Supabase `enquiries` table, the same in-repo lead path
 * the contact page and TT landing form use, so leads appear on the admin
 * Enquiries board. That table has no email/business columns, so those fields
 * are written into `notes` under a `[TripOS early access]` tag. No schema
 * change was made.
 *
 * Set LEADS_ENABLED = false to stop writing; the form then tells visitors
 * submissions are not enabled and points them at the verified contacts.
 */
export const LEADS_ENABLED = false;

export interface EarlyAccessLead {
  name: string;
  business: string;
  email: string;
  phone: string;
  city: string;
  businessType: string;
  tools: string;
  challenge: string;
}

export type SubmitResult = { ok: true } | { ok: false; reason: "disabled" | "failed" };

export async function submitEarlyAccess(lead: EarlyAccessLead): Promise<SubmitResult> {
  if (!LEADS_ENABLED) return { ok: false, reason: "disabled" };

  const lines = [
    "[TripOS early access]",
    `Business: ${lead.business}`,
    `Email: ${lead.email}`,
    lead.city && `City: ${lead.city}`,
    lead.businessType && `Type: ${lead.businessType}`,
    lead.challenge && `Wants to improve: ${lead.challenge}`,
    lead.tools && `Current tools: ${lead.tools}`,
  ].filter(Boolean);

  try {
    // Dynamic import keeps the Supabase client out of First Load JS.
    const { createClient } = await import("@/lib/supabase/client");
    const { error } = await createClient()
      .from("enquiries")
      .insert({
        name: lead.name,
        phone: lead.phone,
        travel_date: null,
        notes: lines.join("\n"),
        status: "new",
      });
    return error ? { ok: false, reason: "failed" } : { ok: true };
  } catch {
    return { ok: false, reason: "failed" };
  }
}
