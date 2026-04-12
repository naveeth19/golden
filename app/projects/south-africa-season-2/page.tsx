"use client";

import { useEffect } from "react";
import type { Metadata } from "next";

// Note: metadata export doesn't work with "use client" — title is set via useEffect below.
// For SEO, this page is intentionally a standalone experience with no site chrome.

export default function SouthAfricaSeason2Page() {
  useEffect(() => {
    document.title = "South Africa Season 2 — Golden Travels";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";
    document.body.style.background = "#0D1B2A";
    return () => {
      document.body.style.overflow = "";
      document.body.style.background = "";
    };
  }, []);

  return (
    <iframe
      src="/sa-s2.html"
      title="South Africa Season 2 — Golden Travels × Epic Road Trips"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        border: "none",
        zIndex: 50,
      }}
    />
  );
}
