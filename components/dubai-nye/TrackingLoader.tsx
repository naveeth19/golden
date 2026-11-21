"use client";

import { useEffect } from "react";
import { ensureGtag } from "./tracking";

/** Loads gtag after first interaction or idle, and only if the site hasn't already. */
export default function TrackingLoader() {
  useEffect(() => {
    let done = false;
    const run = () => {
      if (done) return;
      done = true;
      ensureGtag();
    };
    const t = window.setTimeout(run, 3500);
    const evts = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
    evts.forEach((e) => window.addEventListener(e, run, { once: true, passive: true }));
    return () => {
      window.clearTimeout(t);
      evts.forEach((e) => window.removeEventListener(e, run));
    };
  }, []);
  return null;
}
