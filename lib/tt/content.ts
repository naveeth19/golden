/**
 * Tempo Traveller / Urbania segment — single source of truth.
 *
 * Rates are from the client's tariff sheet (Aug 2026). Nothing in here may be
 * hardcoded into JSX; components read from this file only.
 *
 * Airport transfer rates are DELIBERATELY absent: the tariff sheet's airport
 * column duplicated the 8hr/80km column on every row, which looks like a
 * copy-paste error. Do not add until the client confirms.
 */

export interface TtImage {
  src: string;
  w: number;
  h: number;
  kind: "Exterior" | "Interior";
}

export interface TtVehicle {
  slug: string;
  name: string;
  /** Short name used inside WhatsApp prefills and tight UI. */
  shortName: string;
  tier: "Regular" | "Luxury";
  seats: number;
  /** e.g. "9", "10–12", "16" — display form for seat count. */
  seatsLabel: string;
  rate8hr80km: number;
  extraHourRate: number;
  extraKmRate: number;
  outstationKmRate: number;
  driverBata: number;
  minKmPerDay: number;
  features: string[];
  idealFor: string[];
  /** TODO: exact bag counts unconfirmed by client — null renders nothing. */
  luggage: string | null;
  images: TtImage[];
  card: { src: string; w: number; h: number };
}

export const WA_NUMBER = "919902933877";
export const PHONE_DISPLAY = "+91 99029 33877";
export const TEL_HREF = "tel:+919902933877";

export const SEGMENT = {
  h1: "Tempo Traveller & Urbania Rental in Bangalore",
  sub: "9 to 16 seater mini vans · Starting from just ₹21/km",
  headlineRate: "₹21/km",
  landingPath: "/tempo-traveller-rental-bangalore",
  address:
    "Golden House, No.1697/36, Dr Rajkumar Road, Prakash Nagar, Rajajinagar, Bengaluru 560021",
} as const;

export const RATE_DISCLAIMER =
  "Rates are indicative and may vary by season, weekend, and public holidays. Please confirm current rates before booking. E&OE.";

/* ── Vehicles — the five confirmed tariff rows, in tariff-sheet order ────── */

export const TT_VEHICLES: TtVehicle[] = [
  {
    slug: "tempo-traveller-regular-12-seater",
    name: "Tempo Traveller Regular 12 Seater",
    shortName: "TT Regular 12 Seater",
    tier: "Regular",
    seats: 12,
    seatsLabel: "12",
    rate8hr80km: 5000,
    extraHourRate: 350,
    extraKmRate: 21,
    outstationKmRate: 21,
    driverBata: 600,
    minKmPerDay: 300,
    features: ["Air conditioned", "Reclining seats", "First-aid kit", "All-India tourist permit"],
    idealFor: ["Group outstation trips", "Pilgrimage groups", "Airport groups", "Family functions"],
    luggage: null,
    images: [
      { src: "/fleet/tempo-traveller-regular-12-seater/01.webp", w: 1400, h: 932, kind: "Exterior" },
      { src: "/fleet/tempo-traveller-regular-12-seater/02.webp", w: 718, h: 540, kind: "Interior" },
    ],
    card: { src: "/fleet/tempo-traveller-regular-12-seater/card.webp", w: 800, h: 532 },
  },
  {
    slug: "tempo-traveller-luxury-12-seater",
    name: "Tempo Traveller Luxury 12 Seater",
    shortName: "TT Luxury 12 Seater",
    tier: "Luxury",
    seats: 12,
    seatsLabel: "12",
    rate8hr80km: 5500,
    extraHourRate: 450,
    extraKmRate: 30,
    outstationKmRate: 30,
    driverBata: 600,
    minKmPerDay: 300,
    features: ["Air conditioned", "Pushback seats", "Curtains", "First-aid kit", "All-India tourist permit"],
    idealFor: ["Corporate outings", "Wedding guest transport", "Weekend getaways", "Temple circuits"],
    luggage: null,
    images: [
      { src: "/fleet/tempo-traveller-luxury-12-seater/01.webp", w: 1400, h: 1054, kind: "Exterior" },
      { src: "/fleet/tempo-traveller-luxury-12-seater/02.webp", w: 1400, h: 1867, kind: "Interior" },
    ],
    card: { src: "/fleet/tempo-traveller-luxury-12-seater/card.webp", w: 800, h: 602 },
  },
  {
    // Reuses the EXISTING indexed /fleet/ slug rather than minting a new URL.
    // This shadows the DB row of the same slug (which had a stock photo and
    // all prices at zero) — admin edits to that row will no longer surface.
    slug: "tempo-traveller-luxury-9-seater",
    name: "Tempo Traveller Luxury 9 Seater",
    shortName: "TT Luxury 9 Seater",
    tier: "Luxury",
    seats: 9,
    seatsLabel: "9",
    rate8hr80km: 9000,
    extraHourRate: 600,
    extraKmRate: 45,
    outstationKmRate: 45,
    driverBata: 800,
    minKmPerDay: 300,
    features: ["Air conditioned", "Pushback seats", "Extra legroom", "Curtains", "All-India tourist permit"],
    idealFor: ["Small groups wanting space", "Senior-friendly travel", "Temple circuits", "Airport groups with luggage"],
    luggage: null,
    // Both Force Traveller 9-seater folders merged — same vehicle, Golden
    // Travels livery. Do NOT add Urbania images here.
    images: [
      { src: "/fleet/tempo-traveller-luxury-9-seater/01.webp", w: 1400, h: 934, kind: "Exterior" },
      { src: "/fleet/tempo-traveller-luxury-9-seater/02.webp", w: 1400, h: 788, kind: "Exterior" },
      { src: "/fleet/tempo-traveller-luxury-9-seater/03.webp", w: 672, h: 1422, kind: "Interior" },
      { src: "/fleet/tempo-traveller-luxury-9-seater/04.webp", w: 676, h: 1418, kind: "Interior" },
      { src: "/fleet/tempo-traveller-luxury-9-seater/05.webp", w: 674, h: 1424, kind: "Interior" },
      { src: "/fleet/tempo-traveller-luxury-9-seater/06.webp", w: 1280, h: 582, kind: "Interior" },
    ],
    card: { src: "/fleet/tempo-traveller-luxury-9-seater/card.webp", w: 800, h: 534 },
  },
  {
    slug: "force-urbania-9-seater-luxury",
    name: "Force Urbania 9 Seater Luxury",
    shortName: "Urbania 9 Seater",
    tier: "Luxury",
    seats: 9,
    seatsLabel: "9",
    rate8hr80km: 9000,
    extraHourRate: 550,
    extraKmRate: 40,
    outstationKmRate: 40,
    driverBata: 800,
    minKmPerDay: 300,
    features: ["Air conditioned", "Pushback captain seats", "Monocoque body", "USB charging", "All-India tourist permit"],
    idealFor: ["Executive travel", "Small corporate groups", "Premium family trips", "Film & event crews"],
    luggage: null,
    // Force Urbania only. The traditional Force Traveller 9-seaters in
    // TT_Images/TT_9_seater_luxury/ and "TT 9 Seater luxury pkn option2/"
    // are a DIFFERENT vehicle — do not merge them in here.
    images: [
      { src: "/fleet/force-urbania-9-seater-luxury/01.webp", w: 1400, h: 1050, kind: "Exterior" },
      { src: "/fleet/force-urbania-9-seater-luxury/02.webp", w: 1086, h: 1449, kind: "Exterior" },
      { src: "/fleet/force-urbania-9-seater-luxury/03.webp", w: 960, h: 1280, kind: "Interior" },
      { src: "/fleet/force-urbania-9-seater-luxury/04.webp", w: 960, h: 1280, kind: "Interior" },
      { src: "/fleet/force-urbania-9-seater-luxury/05.webp", w: 960, h: 1280, kind: "Interior" },
    ],
    card: { src: "/fleet/force-urbania-9-seater-luxury/card.webp", w: 800, h: 600 },
  },
  {
    slug: "force-urbania-12-seater-luxury",
    name: "Force Urbania 10/12 Seater Luxury",
    shortName: "Urbania 12 Seater",
    tier: "Luxury",
    seats: 12,
    seatsLabel: "10–12",
    rate8hr80km: 11000,
    extraHourRate: 600,
    extraKmRate: 50,
    outstationKmRate: 50,
    driverBata: 900,
    minKmPerDay: 300,
    features: ["Air conditioned", "Pushback seats", "Monocoque body", "USB charging", "All-India tourist permit"],
    idealFor: ["Corporate delegations", "Wedding families", "Premium group tours", "Multi-day outstation"],
    luggage: null,
    images: [
      { src: "/fleet/force-urbania-12-seater-luxury/01.webp", w: 1400, h: 1050, kind: "Exterior" },
      { src: "/fleet/force-urbania-12-seater-luxury/02.webp", w: 1400, h: 700, kind: "Exterior" },
      { src: "/fleet/force-urbania-12-seater-luxury/03.webp", w: 1400, h: 1050, kind: "Interior" },
      { src: "/fleet/force-urbania-12-seater-luxury/04.webp", w: 1400, h: 1050, kind: "Interior" },
      { src: "/fleet/force-urbania-12-seater-luxury/05.webp", w: 1400, h: 1050, kind: "Interior" },
    ],
    card: { src: "/fleet/force-urbania-12-seater-luxury/card.webp", w: 800, h: 600 },
  },
  {
    slug: "force-urbania-16-seater",
    name: "Force Urbania 16 Seater Regular",
    shortName: "Urbania 16 Seater",
    tier: "Regular",
    seats: 16,
    seatsLabel: "16",
    rate8hr80km: 10000,
    extraHourRate: 700,
    extraKmRate: 42,
    outstationKmRate: 42,
    driverBata: 800,
    minKmPerDay: 300,
    features: ["Air conditioned", "High-roof cabin", "Monocoque body", "All-India tourist permit"],
    idealFor: ["Large group tours", "Corporate shuttles", "Wedding logistics", "College & school trips"],
    luggage: null,
    images: [
      { src: "/fleet/force-urbania-16-seater/01.webp", w: 1400, h: 771, kind: "Exterior" },
      { src: "/fleet/force-urbania-16-seater/02.webp", w: 1400, h: 1055, kind: "Interior" },
      { src: "/fleet/force-urbania-16-seater/03.webp", w: 1400, h: 1047, kind: "Interior" },
      { src: "/fleet/force-urbania-16-seater/04.webp", w: 1400, h: 1050, kind: "Interior" },
    ],
    card: { src: "/fleet/force-urbania-16-seater/card.webp", w: 800, h: 441 },
  },
];

export const TT_SLUGS = TT_VEHICLES.map((v) => v.slug);

export function getTtVehicle(slug: string): TtVehicle | undefined {
  return TT_VEHICLES.find((v) => v.slug === slug);
}

/** Cheapest per-km rate across the segment — the headline number. */
export const MIN_KM_RATE = Math.min(...TT_VEHICLES.map((v) => v.outstationKmRate));

/* ── Outstation routes ───────────────────────────────────────────────────
   Indicative cost basis: Regular 12 Seater at ₹21/km, minimum 300 km per
   calendar day, driver bata included, tolls/parking extra. Cost = max(round
   trip km, days × 300) × 21 + days × 600, rounded down to the nearest 500. */

export interface TtRoute {
  destination: string;
  distanceKm: number; // one-way
  duration: string; // one-way, rough
  days: number; // typical trip length used for the indicative figure
  indicativeCost: number;
}

function routeCost(oneWayKm: number, days: number): number {
  const billedKm = Math.max(oneWayKm * 2, days * 300);
  const raw = billedKm * 21 + days * 600;
  return Math.floor(raw / 500) * 500;
}

export const TT_ROUTES: TtRoute[] = [
  { destination: "Mysore", distanceKm: 145, duration: "3–3.5 hrs", days: 1, indicativeCost: routeCost(145, 1) },
  { destination: "Coorg", distanceKm: 270, duration: "5.5–6 hrs", days: 2, indicativeCost: routeCost(270, 2) },
  { destination: "Ooty", distanceKm: 270, duration: "6–7 hrs", days: 2, indicativeCost: routeCost(270, 2) },
  { destination: "Tirupati", distanceKm: 250, duration: "5–5.5 hrs", days: 1, indicativeCost: routeCost(250, 1) },
  { destination: "Wayanad", distanceKm: 280, duration: "6 hrs", days: 2, indicativeCost: routeCost(280, 2) },
  { destination: "Gokarna", distanceKm: 480, duration: "8.5–9 hrs", days: 2, indicativeCost: routeCost(480, 2) },
  { destination: "Chikmagalur", distanceKm: 245, duration: "4.5–5 hrs", days: 2, indicativeCost: routeCost(245, 2) },
];

/* ── FAQ — answers open with a direct sentence, then detail ────────────── */

export interface TtFaq {
  q: string;
  a: string[];
}

export const TT_FAQS: TtFaq[] = [
  {
    q: "What is the tempo traveller rate per km in Bangalore?",
    a: [
      "Tempo traveller rates in Bangalore start from ₹21 per km for a Regular 12 seater with Golden Travels.",
      "Luxury tempo travellers with pushback seats run ₹30 to ₹45 per km depending on the layout, and Force Urbania vans are ₹40 to ₹50 per km depending on the variant. Outstation trips are billed on a minimum of 300 km per day, plus driver bata. Tolls and parking are at actuals.",
    ],
  },
  {
    q: "How much does it cost to rent a 12 seater tempo traveller?",
    a: [
      "A 12 seater tempo traveller costs ₹5,000 for a local 8 hour / 80 km package, or ₹21 per km for outstation trips.",
      "The Luxury 12 seater with pushback seats is ₹5,500 for the local package and ₹30 per km outstation. A typical one-day outstation trip works out to around ₹6,900 for the Regular (300 km minimum × ₹21 + ₹600 driver bata).",
    ],
  },
  {
    q: "What is the difference between a tempo traveller and a Force Urbania?",
    a: [
      "The Urbania is Force Motors' newer monocoque van — quieter, more stable at highway speeds, and more car-like to ride in than a traditional tempo traveller.",
      "A traditional TT is built on a ladder-frame chassis and seats more people per vehicle, which makes it the practical choice for large groups and pilgrimage circuits. Compare the two on the rate table above rather than assuming one is always cheaper — at 9 seats the Urbania actually undercuts the equivalent luxury tempo traveller, while at 12 seats the tempo traveller is the more economical option.",
    ],
  },
  {
    q: "Is there a minimum km per day for outstation trips?",
    a: [
      "Yes — outstation bookings are billed on a minimum of 300 km per calendar day.",
      "The calendar day runs from your start on day one to your return on the last day; each day in between counts toward the minimum. If your actual running exceeds the minimum, you pay for actual km instead.",
    ],
  },
  {
    q: "What is driver bata and how much is it?",
    a: [
      "Driver bata is the driver's daily allowance for food and stay — ₹600 per day for tempo travellers and ₹800–₹900 per day for Urbania vans.",
      "It covers the driver's day up to a standard driving window; night driving between 10 PM and 6 AM attracts an additional bata. It is charged per vehicle, not per passenger.",
    ],
  },
  {
    q: "Are toll and parking included in the rate?",
    a: [
      "No — tolls, parking, and interstate permit taxes are charged at actuals on top of the km rate.",
      "For trips into Tamil Nadu, Kerala, Andhra Pradesh, or Goa, interstate entry taxes apply as levied by each state. Your driver keeps receipts, and actuals are settled at the end of the trip.",
    ],
  },
  {
    q: "How many bags fit in a 12 seater tempo traveller?",
    a: [
      "A 12 seater tempo traveller comfortably carries about one medium suitcase per passenger, using the rear luggage area and overhead racks.",
      "For a full group of 12 with large luggage, tell us at booking — we will advise whether your group fits comfortably or should step up a size.",
    ],
  },
  {
    q: "Can I book a tempo traveller for one way?",
    a: [
      "Yes, one-way bookings are possible, but they are billed on the round-trip distance since the vehicle returns to Bangalore.",
      "The 300 km per day minimum applies to the billed distance. For genuine one-way drops on busy corridors, call us — return-load availability can sometimes reduce the cost.",
    ],
  },
  {
    q: "Do you provide tempo traveller for weddings and corporate events?",
    a: [
      "Yes — wedding guest logistics and corporate transport have been core Golden Travels services since 1987.",
      "We run multi-vehicle wedding movements, corporate shuttles, and event fleets with uniformed chauffeurs trained at our own Golden Driver Academy. Clients include TUV SUD, Brigade Group, and New Mangalore Port Authority.",
    ],
  },
  {
    q: "How far in advance should I book?",
    a: [
      "Two to three days ahead is enough for most dates; book a week or more ahead for weekends, long weekends, and festival dates.",
      "Peak season (Dasara, Diwali, December holidays, wedding muhurtham dates) sells out earliest — the Urbania fleet especially. For same-day requirements, call us directly and we will confirm live availability.",
    ],
  },
];

/* ── WhatsApp prefills — one per section, for ad attribution ───────────── */

export function waHref(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WA_MESSAGES = {
  hero: () => "Hi Golden Travels, I need a tempo traveller quote — [TT hero]",
  rateRow: (vehicle: string) => `Hi Golden Travels, I need a quote for ${vehicle} — [TT rates]`,
  card: (vehicle: string) => `Hi Golden Travels, enquiry for ${vehicle} — [TT card]`,
  detail: (vehicle: string) => `Hi Golden Travels, enquiry for ${vehicle} — [TT detail]`,
  route: (route: string) => `Hi Golden Travels, I need a quote for Bangalore to ${route} — [TT routes]`,
  terms: () => "Hi Golden Travels, I need a tempo traveller quote — [TT terms]",
  faq: () => "Hi Golden Travels, I have a question about tempo traveller rental — [TT faq]",
} as const;
