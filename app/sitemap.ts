import type { MetadataRoute } from "next";
import { createPublicClient } from "@/lib/supabase/public";
import { TT_SLUGS, SEGMENT } from "@/lib/tt/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createPublicClient();
  const baseUrl = "https://www.goldentravels.co";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/fleet`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/packages`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    // /projects/south-africa-season-2 is deliberately omitted — it is disabled
    // and redirects to /projects.
    { url: `${baseUrl}/projects/the-shiva-day`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    // Google Ads landing page — also an organic asset.
    { url: `${baseUrl}${SEGMENT.landingPath}`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
  ];

  const { data: fleet } = await supabase.from("fleet").select("slug").eq("is_active", true);
  const dbFleetSlugs = (fleet || []).map((v) => v.slug.trim());
  // TT segment slugs are content-defined, not DB rows — merge and dedupe.
  const fleetPages: MetadataRoute.Sitemap = [...new Set([...dbFleetSlugs, ...TT_SLUGS])].map((slug) => ({
    url: `${baseUrl}/fleet/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const { data: packages } = await supabase.from("packages").select("slug").eq("is_active", true);
  const packagePages: MetadataRoute.Sitemap = (packages || []).map((p) => ({
    url: `${baseUrl}/packages/${p.slug.trim()}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const { data: blogs } = await supabase.from("blogs").select("slug, published_at").eq("is_published", true);
  const blogPages: MetadataRoute.Sitemap = (blogs || []).map((b) => ({
    url: `${baseUrl}/blog/${b.slug.trim()}`,
    lastModified: b.published_at ? new Date(b.published_at) : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...fleetPages, ...packagePages, ...blogPages];
}
