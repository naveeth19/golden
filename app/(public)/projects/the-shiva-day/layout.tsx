import type { Metadata } from "next";

/**
 * page.tsx for this route is a client component, so it cannot export
 * metadata. This layout supplies it — the page previously had no title,
 * description or canonical at all despite being listed in the sitemap.
 */
export const metadata: Metadata = {
  title: "The Shiva Day — Lepakshi & Isha Foundation Day Trip",
  description:
    "A curated one-day journey from Bengaluru: Lepakshi's Veerabhadra temple, the Isha Foundation, and the Adiyogi light show. Designed and operated by Golden Travels.",
  alternates: { canonical: "/projects/the-shiva-day" },
};

export default function TheShivaDayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
