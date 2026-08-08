/** Golden Travels was founded in 1987 (per the About page and JSON-LD). */
export const FOUNDED_YEAR = 1987;

/**
 * Years of operation, computed rather than hardcoded.
 *
 * The site shipped "37+" in four places. 1987 + 37 = 2024, so the figure was
 * written two years ago and has been wrong since. Pages using this are
 * statically prerendered with `revalidate = 3600`, so the value rolls over
 * within an hour of the new year instead of needing a code change.
 */
export function yearsOfService(now: Date = new Date()): number {
  return now.getFullYear() - FOUNDED_YEAR;
}
