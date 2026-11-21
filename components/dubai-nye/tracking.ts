"use client";

import {
  ADS_CONVERSION_CALL,
  ADS_CONVERSION_WHATSAPP,
  GA4_EVENT_CALL,
  GA4_EVENT_WHATSAPP,
  GA4_ID,
  GOOGLE_ADS_ID,
  isConfigured,
} from "./config";

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: Record<string, unknown>[];
  }
}

/** Load gtag.js only if the site has not already loaded it. */
export function ensureGtag() {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") return; // already present (e.g. site-wide tag)
  const primary = isConfigured(GOOGLE_ADS_ID) ? GOOGLE_ADS_ID : isConfigured(GA4_ID) ? GA4_ID : null;
  if (!primary) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments as unknown as Record<string, unknown>);
  };
  window.gtag("js", new Date());
  if (isConfigured(GOOGLE_ADS_ID)) window.gtag("config", GOOGLE_ADS_ID);
  if (isConfigured(GA4_ID)) window.gtag("config", GA4_ID);
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${primary}`;
  document.head.appendChild(s);
}

export type ContactKind = "call" | "whatsapp";

/** Fire the Ads conversion + named GA4 event for a Call / WhatsApp click. */
export function trackContact(kind: ContactKind, placement: string) {
  if (typeof window === "undefined") return;
  // dataLayer event, same pattern as the Coorg page (coorg_cta)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "dubai_nye_cta", action: kind, section: placement });
  if (typeof window.gtag !== "function") return;
  const sendTo = kind === "call" ? ADS_CONVERSION_CALL : ADS_CONVERSION_WHATSAPP;
  if (isConfigured(sendTo)) {
    window.gtag("event", "conversion", { send_to: sendTo });
  }
  window.gtag("event", kind === "call" ? GA4_EVENT_CALL : GA4_EVENT_WHATSAPP, {
    placement,
    package: "dubai_nye_2027",
  });
}
