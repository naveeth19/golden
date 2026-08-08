import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Anonymous Supabase client for public, read-only page data.
 *
 * Deliberately does NOT touch `cookies()`. The cookie-aware client in
 * `./server.ts` reads request headers, which opts every caller out of the
 * Data Cache and forces the route to render dynamically. Public pages have
 * no per-user state, so they use this client and stay statically renderable.
 *
 * Use `./server.ts` for anything that needs the signed-in user (admin routes).
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}

/**
 * Explicit column lists. `select("*")` on the fleet list pulled 128KB, of
 * which 99KB was the `description` column that list views never render.
 */

/** Columns read by FleetCard / FleetScroll. Excludes `description`. */
export const FLEET_CARD_COLUMNS =
  "id,name,slug,category,capacity,images,features";

/** Full vehicle record for the detail page. */
export const FLEET_DETAIL_COLUMNS =
  "id,name,slug,category,capacity,images,features,description,price_local_8hr,price_extra_km,price_extra_hour,price_outstation_km,price_driver_batta,price_airport,is_active,created_at";

/** Columns read by PackageCard / PackagesGrid. */
export const PACKAGE_CARD_COLUMNS =
  "id,title,slug,type,duration_days,price_from,overview,cover_image";

/** Full package record for the detail page. */
export const PACKAGE_DETAIL_COLUMNS =
  "id,title,slug,type,duration_days,price_from,overview,inclusions,exclusions,images,youtube_urls,cover_image,is_featured,is_active,pricing_type,show_vehicle,created_at";

/** Columns read by BlogCard. `content` is included: the card falls back to it when `meta_desc` is empty. */
export const BLOG_CARD_COLUMNS =
  "id,title,slug,cover_image,meta_desc,tags,published_at,content";

/** Itinerary rows for the package detail page. */
export const ITINERARY_COLUMNS =
  "id,package_id,day_number,title,description,meals,overnight_at,created_at";

/** Pricing tier rows for the package detail page. */
export const PRICING_TIER_COLUMNS =
  "id,package_id,min_people,max_people,vehicle_name,price,price_type,created_at";

/** Full post record for the detail page. */
export const BLOG_DETAIL_COLUMNS =
  "id,title,slug,content,cover_image,meta_title,meta_desc,tags,is_published,published_at,created_at";
