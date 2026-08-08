/**
 * Vehicles shown in the homepage fleet strip.
 *
 * Hand-picked and hand-ordered — edit this list to change what appears on the
 * homepage. The strip renders these in exactly the order listed here.
 *
 * Slugs must match the `slug` column in the `fleet` table. A slug that is
 * missing or inactive is silently skipped, so a typo shows fewer cards rather
 * than breaking the page. The full list lives at /fleet.
 *
 * Chosen for category spread: sedan → luxury sedan → MPV → SUV → premium →
 * people carrier → traveller → mini bus.
 */
export const FEATURED_FLEET_SLUGS = [
  "maruti-swift-dzire-4-seats",
  "toyota-camry-luxury-sedan",
  "innova-crysta",
  "fortuner-legender",
  "mercedes-benz-e-class",
  "kia-carnival",
  "force-urbania-luxury-ac-10-deluxe",
  "premium-25-seater-ac-mini-bus",
] as const;
