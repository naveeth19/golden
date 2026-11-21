/* ==========================================================================
   TRACKING CONFIG — the only file you need to edit for Google Ads / GA4.
   Replace the placeholder values below. Leave a value as-is to disable it.
   ========================================================================== */

/** Google Ads account tag, e.g. "AW-123456789". */
export const GOOGLE_ADS_ID = "AW-17708555151"; // already loaded site-wide in app/layout.tsx

/** Conversion action for Call clicks: "AW-123456789/AbCdEfGhIjKlMnOp". */
export const ADS_CONVERSION_CALL = "AW-17708555151/CALL_CONVERSION_LABEL";

/** Conversion action for WhatsApp clicks: "AW-123456789/QrStUvWxYz123456". */
export const ADS_CONVERSION_WHATSAPP = "AW-17708555151/WHATSAPP_CONVERSION_LABEL";

/** GA4 measurement ID, e.g. "G-ABC123XYZ". */
export const GA4_ID = "G-XXXXXXXXXX";

/** Named GA4 events (mark these as key events in GA4). */
export const GA4_EVENT_CALL = "dubai_nye_call_click";
export const GA4_EVENT_WHATSAPP = "dubai_nye_whatsapp_click";

export const isConfigured = (id: string) => !!id && !id.includes("XXXX") && !id.includes("_LABEL");
