/**
 * Vehicles shown in the homepage fleet rail.
 *
 * Hand-picked and hand-ordered — edit this list to change what appears on the
 * homepage. The rail renders these in exactly the order listed here, followed
 * by a "View more" card linking to /fleet.
 *
 * Slugs must match the `slug` column in the `fleet` table. A slug that is
 * missing or inactive is silently skipped, so a typo shows fewer cards rather
 * than breaking the page.
 *
 * Four of these were specified directly; Fortuner Legender is the fifth,
 * chosen because it is the only SUV among them — the others cover sedan,
 * MPV, luxury and people-carrier.
 */
export const FEATURED_FLEET_SLUGS = [
  "maruti-swift-dzire-4-seats", // Sedan
  "innova-crysta", // MPV
  "fortuner-legender", // SUV
  "mercedes-benz-s-class-luxury", // Luxury
  "force-urbania-luxury-ac-10-deluxe", // Traveller
] as const;

/**
 * Public-facing fleet size.
 *
 * Deliberately not derived from `count(fleet)`: that table lists distinct
 * vehicle models offered (several Urbania and S-Class variants each have
 * their own row), which is not the same as the number of vehicles operated.
 */
export const FLEET_SIZE_LABEL = "54+";
