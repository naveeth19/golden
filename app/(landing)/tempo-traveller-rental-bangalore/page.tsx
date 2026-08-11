import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaPair from "@/components/tt/CtaPair";
import StickyBar from "@/components/tt/StickyBar";
import EnquiryForm from "@/components/tt/EnquiryForm";
import { FLEET_SIZE_LABEL } from "@/lib/featured-fleet";
import { yearsOfService } from "@/lib/brand";
import {
  TT_VEHICLES,
  TT_ROUTES,
  TT_FAQS,
  SEGMENT,
  RATE_DISCLAIMER,
  WA_MESSAGES,
  PHONE_DISPLAY,
  TEL_HREF,
  MIN_KM_RATE,
} from "@/lib/tt/content";

export const dynamic = "force-static";

const SITE = "https://www.goldentravels.co";

export const metadata: Metadata = {
  // `absolute` opts out of the root "%s | Golden Travels" template, which
  // would otherwise double the brand suffix.
  title: {
    absolute: "Tempo Traveller Rental in Bangalore | 9-16 Seater from ₹21/km | Golden Travels",
  },
  description:
    "Tempo traveller and Force Urbania rental in Bangalore from ₹21/km. 9, 12 and 16 seater AC mini vans for outstation, weddings and corporate trips. Since 1987.",
  alternates: { canonical: SEGMENT.landingPath },
  openGraph: {
    title: "Tempo Traveller & Urbania Rental in Bangalore — from ₹21/km",
    description:
      "9 to 16 seater AC tempo travellers and Force Urbania vans. Transparent per-km rates, chauffeurs from our own driver academy. Since 1987.",
    url: SEGMENT.landingPath,
  },
};

/* ── JSON-LD ─────────────────────────────────────────────────────────────── */

function SchemaJsonLd() {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Tempo Traveller & Urbania Rental",
    serviceType: "Van rental with driver",
    areaServed: { "@type": "City", name: "Bengaluru" },
    provider: { "@type": "LocalBusiness", name: "Golden Travels", telephone: "+919902933877" },
  };
  const products = TT_VEHICLES.map((v) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${v.name} rental, Bangalore`,
    image: `${SITE}${v.card.src}`,
    url: `${SITE}/fleet/${v.slug}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: v.outstationKmRate,
      description: `₹${v.outstationKmRate} per km outstation · ₹${v.rate8hr80km.toLocaleString("en-IN")} for 8hr/80km local package`,
      availability: "https://schema.org/InStock",
    },
  }));
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: TT_FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a.join(" ") },
    })),
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Golden Travels", item: SITE },
      { "@type": "ListItem", position: 2, name: "Tempo Traveller Rental in Bangalore", item: `${SITE}${SEGMENT.landingPath}` },
    ],
  };
  return (
    <>
      {[service, faq, breadcrumbs, ...products].map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
    </>
  );
}

/* ── Small shared bits ──────────────────────────────────────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[10px] uppercase tracking-[0.26em] text-[var(--gt-red)] mb-4">{children}</span>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[clamp(1.6rem,4vw,2.4rem)] leading-[1.08] tracking-[-0.02em] text-[var(--gt-navy)]"
      style={{ fontFamily: "var(--font-playfair)" }}
    >
      {children}
    </h2>
  );
}

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/* ── Page ───────────────────────────────────────────────────────────────── */

export default function TtLandingPage() {
  return (
    <div className="bg-white pb-[calc(64px+env(safe-area-inset-bottom))]">
      <SchemaJsonLd />

      {/* CSS-only marquee. Track duplicated for a seamless loop. */}
      <style>{`
        @keyframes tt-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .tt-marquee-track { display: inline-flex; white-space: nowrap; animation: tt-marquee 28s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .tt-marquee-track { animation: none; } }
        .tt-snap { scrollbar-width: none; }
        .tt-snap::-webkit-scrollbar { display: none; }
      `}</style>

      {/* 1 · Offer banner */}
      {/* TODO: real seasonal offer copy from client — this states standing facts only. */}
      <div className="bg-[var(--gt-navy)] text-white/80 text-[11px] uppercase tracking-[0.18em] py-2 overflow-hidden" aria-hidden>
        <div className="tt-marquee-track">
          {[0, 1].map((k) => (
            <span key={k}>
              {[
                `Outstation from ${inr(MIN_KM_RATE)}/km`,
                "9–16 seater AC mini vans",
                "All-India tourist permits",
                `Since 1987 · Bengaluru`,
                "Chauffeurs from our own driver academy",
              ].map((t) => (
                <span key={t} className="mx-6">{t} <span className="text-[var(--gt-red)] mx-2">·</span></span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* 2 · Header — logo + tap-to-call. No nav menu by design. */}
      <header className="border-b border-[var(--gt-border)]">
        <div className="max-w-[1200px] mx-auto px-5 py-3.5 flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-lg leading-tight font-bold text-[var(--gt-navy)]" style={{ fontFamily: "var(--font-playfair)" }}>
              Golden Travels
            </span>
            <span className="text-[9px] uppercase tracking-[0.16em] text-[var(--gt-muted)]">
              Est. 1987 · Bengaluru
            </span>
          </div>
          <a
            href={TEL_HREF}
            className="min-h-[44px] inline-flex items-center gap-2 border border-[var(--gt-navy)] text-[var(--gt-navy)] text-[12px] font-semibold px-4 hover:bg-[var(--gt-navy)] hover:text-white transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {PHONE_DISPLAY}
          </a>
        </div>
      </header>

      {/* 3 · Hero — kept tight so the rate table edges into view on mobile */}
      <section className="border-b border-[var(--gt-border)]">
        <div className="max-w-[1200px] mx-auto px-5 py-8 lg:py-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1
              className="text-[clamp(1.9rem,5.5vw,3.2rem)] leading-[1.05] tracking-[-0.02em] text-[var(--gt-navy)]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {SEGMENT.h1}
            </h1>
            <p className="mt-3 text-[15px] text-[var(--gt-muted)]">{SEGMENT.sub}</p>

            <div className="flex flex-wrap gap-2 mt-5">
              {[`Since 1987`, `${FLEET_SIZE_LABEL} vehicles`, `All-India permits`].map((c) => (
                <span key={c} className="text-[11px] uppercase tracking-[0.12em] text-[var(--gt-navy)] border border-[var(--gt-border)] px-3 py-1.5">
                  {c}
                </span>
              ))}
            </div>

            <CtaPair section="hero" waMessage={WA_MESSAGES.hero()} className="mt-6" />
          </div>

          <div className="relative aspect-[16/9] bg-[var(--gt-cream)] border border-[var(--gt-border)]">
            <Image
              src={TT_VEHICLES[3].images[0].src}
              alt="Force Urbania luxury van — Golden Travels, Bangalore"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4 · Tariff table — immediately after the hero, nothing between */}
      <section id="rates" className="border-b border-[var(--gt-border)] bg-[var(--gt-cream)]">
        <div className="max-w-[1200px] mx-auto px-5 py-10 lg:py-16">
          <Eyebrow>TT price per km</Eyebrow>
          <H2>Tempo traveller rent per km in Bangalore</H2>

          {/* ≥640px: real table */}
          <div className="hidden sm:block mt-8 border border-[var(--gt-border)] bg-white">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[var(--gt-border)] text-[10px] uppercase tracking-[0.16em] text-[var(--gt-muted)]">
                  <th className="px-5 py-3.5 font-medium">Vehicle</th>
                  <th className="px-5 py-3.5 font-medium">Seats</th>
                  <th className="px-5 py-3.5 font-medium">Rate from</th>
                  <th className="px-5 py-3.5 font-medium sr-only">Enquire</th>
                </tr>
              </thead>
              <tbody>
                {TT_VEHICLES.map((v) => (
                  <tr key={v.slug} className="border-b border-[var(--gt-border)] last:border-b-0">
                    <td className="px-5 py-4">
                      <Link href={`/fleet/${v.slug}`} className="text-[var(--gt-navy)] font-medium hover:text-[var(--gt-red)]">
                        {v.name}
                      </Link>
                      <span className={`ml-2 align-middle text-[9px] uppercase tracking-[0.12em] px-1.5 py-0.5 ${v.tier === "Luxury" ? "bg-[var(--gt-navy)] text-white" : "border border-[var(--gt-border)] text-[var(--gt-muted)]"}`}>
                        {v.tier}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-[var(--gt-muted)] tabular-nums">{v.seatsLabel}</td>
                    <td className="px-5 py-4">
                      <span className="text-lg text-[var(--gt-navy)] tabular-nums" style={{ fontFamily: "var(--font-playfair)" }}>
                        {inr(v.outstationKmRate)}/km
                      </span>
                      <span className="block text-[11px] text-[var(--gt-muted)]">{inr(v.rate8hr80km)} · 8hr/80km</span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <a
                        href={`https://wa.me/919902933877?text=${encodeURIComponent(WA_MESSAGES.rateRow(v.name))}`}
                        target="_blank" rel="noopener noreferrer"
                        className="text-[11px] uppercase tracking-[0.1em] text-[#178a43] font-semibold hover:underline whitespace-nowrap"
                      >
                        WhatsApp →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* <640px: stacked cards, rate largest. Never horizontal scroll. */}
          <div className="sm:hidden mt-6 space-y-3">
            {TT_VEHICLES.map((v) => (
              <Link key={v.slug} href={`/fleet/${v.slug}`} className="block border border-[var(--gt-border)] bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="block text-[15px] font-medium text-[var(--gt-navy)] leading-snug">{v.name}</span>
                    <span className="text-[11px] text-[var(--gt-muted)]">{v.seatsLabel} seats · {v.tier}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="block text-2xl text-[var(--gt-navy)] tabular-nums" style={{ fontFamily: "var(--font-playfair)" }}>
                      {inr(v.outstationKmRate)}<span className="text-sm">/km</span>
                    </span>
                    <span className="text-[10px] text-[var(--gt-muted)]">{inr(v.rate8hr80km)} · 8hr/80km</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-5 text-[12px] leading-relaxed text-[var(--gt-muted)] max-w-2xl">{RATE_DISCLAIMER}</p>
          <CtaPair section="rates" waMessage={WA_MESSAGES.rateRow("a tempo traveller")} className="mt-6 max-w-md" />
        </div>
      </section>

      {/* 5 · Vehicle cards */}
      <section className="border-b border-[var(--gt-border)]">
        <div className="max-w-[1200px] mx-auto px-5 py-10 lg:py-16">
          <Eyebrow>The mini van fleet</Eyebrow>
          <H2>AC tempo traveller &amp; Force Urbania options</H2>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {TT_VEHICLES.map((v) => (
              <article key={v.slug} className="border border-[var(--gt-border)] flex flex-col">
                <Link href={`/fleet/${v.slug}`} className="relative block aspect-[16/9] bg-[var(--gt-cream)] overflow-hidden">
                  <Image
                    src={v.card.src}
                    alt={`${v.name} — rental in Bangalore`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                    className="object-cover"
                  />
                  <span className={`absolute top-3 left-3 text-[9px] uppercase tracking-[0.14em] px-2 py-1 ${v.tier === "Luxury" ? "bg-[var(--gt-navy)] text-white" : "bg-white text-[var(--gt-navy)]"}`}>
                    {v.tier}
                  </span>
                </Link>
                <div className="p-5 flex flex-col gap-3 grow">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg leading-snug text-[var(--gt-navy)]" style={{ fontFamily: "var(--font-playfair)" }}>
                      {v.name}
                    </h3>
                    <span className="text-lg text-[var(--gt-navy)] tabular-nums shrink-0" style={{ fontFamily: "var(--font-playfair)" }}>
                      {inr(v.outstationKmRate)}<span className="text-xs">/km</span>
                    </span>
                  </div>
                  <p className="text-[12px] text-[var(--gt-muted)]">
                    {v.seatsLabel} seats · AC{v.luggage ? ` · ${v.luggage}` : ""} · {v.features.slice(0, 2).join(" · ")}
                  </p>
                  <Link href={`/fleet/${v.slug}`} className="text-[11px] uppercase tracking-[0.14em] text-[var(--gt-red)] font-semibold hover:underline">
                    View details →
                  </Link>
                  <CtaPair section={`card:${v.slug}`} waMessage={WA_MESSAGES.card(v.name)} className="mt-auto" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6 · Terms and charges — plain language */}
      <section className="border-b border-[var(--gt-border)] bg-[var(--gt-cream)]">
        <div className="max-w-[1200px] mx-auto px-5 py-10 lg:py-16">
          <Eyebrow>Before you book</Eyebrow>
          <H2>How the charges work</H2>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-[14px] leading-[1.75] text-[var(--gt-muted)]">
            <div>
              <h3 className="text-[var(--gt-navy)] font-semibold mb-2">Minimum 300 km per day</h3>
              <p>
                Outstation trips are billed on a minimum of 300 km per calendar day. A calendar day is counted
                from your departure on day one through your return on the final day — each day of the trip
                counts toward the minimum. If you actually drive more, you pay for actual kilometres instead.
              </p>
            </div>
            <div>
              <h3 className="text-[var(--gt-navy)] font-semibold mb-2">Driver bata</h3>
              <p>
                Bata is the driver&apos;s daily allowance, charged per vehicle per day — ₹600 for tempo
                travellers, ₹800–₹900 for Urbania vans. It covers a standard driving day; driving between
                10 PM and 6 AM attracts an additional night bata.
              </p>
            </div>
            <div>
              <h3 className="text-[var(--gt-navy)] font-semibold mb-2">Tolls, parking and state taxes</h3>
              <p>
                Charged at actuals, on top of the km rate. Trips entering Tamil Nadu, Kerala, Andhra Pradesh,
                or Goa pay that state&apos;s interstate permit tax. Your driver keeps every receipt and actuals
                are settled at trip end.
              </p>
            </div>
            <div>
              <h3 className="text-[var(--gt-navy)] font-semibold mb-2">One-way trips</h3>
              <p>
                One-way drops are billed on the round-trip distance, because the vehicle and driver return to
                Bangalore. The daily minimum applies to the billed distance. On busy corridors, call us — a
                return load can sometimes bring the cost down.
              </p>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-[var(--gt-navy)] font-semibold mb-2">Local 8hr/80km package</h3>
              <p>
                Within Bangalore, vehicles run on a package of 8 hours or 80 km, whichever is reached first —
                from {inr(5000)} for the Regular 12 seater. Beyond the package, extra hours ({inr(350)}–{inr(700)}/hr
                by vehicle) and extra kilometres ({inr(21)}–{inr(50)}/km) apply as per the tariff table above.
              </p>
            </div>
          </div>

          <CtaPair section="terms" waMessage={WA_MESSAGES.terms()} className="mt-8 max-w-md" />
        </div>
      </section>

      {/* 7 · Why Golden Travels */}
      <section className="border-b border-[var(--gt-border)]">
        <div className="max-w-[1200px] mx-auto px-5 py-10 lg:py-16">
          <Eyebrow>Why Golden Travels</Eyebrow>
          <H2>We train the chauffeur who drives you</H2>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
            <div className="text-[14px] leading-[1.8] text-[var(--gt-muted)] space-y-4">
              <p>
                <strong className="text-[var(--gt-navy)]">Golden Driver Academy.</strong> Most operators claim
                background-checked drivers. Golden Travels runs its own training school — every chauffeur on
                our fleet is trained, assessed and certified in-house before they carry a single guest. No
                other Bangalore operator can make that claim.
              </p>
              <p>
                Founded in 1987 in Bengaluru, we have run {yearsOfService()} years of outstation, corporate and
                pilgrimage travel across South India.
              </p>
              <p className="text-[13px]">
                {SEGMENT.address}
              </p>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-[0.22em] text-[var(--gt-muted)] mb-4">Trusted by</span>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-[14px] text-[var(--gt-navy)]">
                {["TUV SUD", "Brigade Group", "New Mangalore Port Authority", "Vizag Steel", "Government of Karnataka"].map((c) => (
                  <li key={c} className="flex items-center gap-2.5">
                    <span className="w-5 h-px bg-[var(--gt-red)] shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
              {/* TODO: client logo images for this section are on Supabase; landing pages
                  are zero-external-dependency, so names render as text until the logo
                  files are added to /public. */}
            </div>
          </div>
        </div>
      </section>

      {/* 8 · Outstation routes */}
      <section className="border-b border-[var(--gt-border)] bg-[var(--gt-cream)]">
        <div className="max-w-[1200px] mx-auto px-5 py-10 lg:py-16">
          <Eyebrow>Popular outstation routes</Eyebrow>
          <H2>Tempo traveller for rent, Bangalore to anywhere</H2>
          <p className="mt-4 text-[13px] text-[var(--gt-muted)] max-w-2xl">
            Indicative round-trip cost in a Regular 12 seater at {inr(21)}/km with the 300 km/day minimum and
            driver bata included. Tolls, parking and state taxes extra. Luxury and Urbania rates differ.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TT_ROUTES.map((r) => (
              <div key={r.destination} className="border border-[var(--gt-border)] bg-white p-5">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-base text-[var(--gt-navy)]" style={{ fontFamily: "var(--font-playfair)" }}>
                    Bangalore → {r.destination}
                  </h3>
                  <span className="text-[11px] text-[var(--gt-muted)] tabular-nums shrink-0">{r.distanceKm} km</span>
                </div>
                <p className="mt-1.5 text-[12px] text-[var(--gt-muted)]">
                  {r.duration} one way · typical {r.days}-day trip
                </p>
                <p className="mt-3 text-lg text-[var(--gt-navy)] tabular-nums" style={{ fontFamily: "var(--font-playfair)" }}>
                  from {inr(r.indicativeCost)}
                </p>
                <a
                  href={`https://wa.me/919902933877?text=${encodeURIComponent(WA_MESSAGES.route(r.destination))}`}
                  target="_blank" rel="noopener noreferrer"
                  className="mt-2 inline-block text-[11px] uppercase tracking-[0.1em] text-[#178a43] font-semibold hover:underline"
                >
                  Get exact quote →
                </a>
              </div>
            ))}
          </div>

          <CtaPair section="routes" waMessage={WA_MESSAGES.route("my destination")} className="mt-8 max-w-md" />
        </div>
      </section>

      {/* 9 · FAQ — answers in the HTML, server-rendered details/summary */}
      <section className="border-b border-[var(--gt-border)]">
        <div className="max-w-[1200px] mx-auto px-5 py-10 lg:py-16">
          <Eyebrow>Questions people ask</Eyebrow>
          <H2>Tempo traveller rental — FAQs</H2>

          <div className="mt-8 border-t border-[var(--gt-border)]">
            {TT_FAQS.map((f) => (
              <details key={f.q} className="group border-b border-[var(--gt-border)]">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none py-4 min-h-[44px] text-[15px] font-medium text-[var(--gt-navy)] [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="text-[var(--gt-red)] text-xl leading-none group-open:rotate-45 transition-transform shrink-0" aria-hidden>+</span>
                </summary>
                <div className="pb-5 text-[14px] leading-[1.75] text-[var(--gt-muted)] space-y-3">
                  {f.a.map((p, i) => (
                    <p key={i} className={i === 0 ? "text-[var(--gt-navy)]" : undefined}>{p}</p>
                  ))}
                </div>
              </details>
            ))}
          </div>

          <CtaPair section="faq" waMessage={WA_MESSAGES.faq()} className="mt-8 max-w-md" />
        </div>
      </section>

      {/* 10 · Enquiry form */}
      <section id="enquiry" className="border-b border-[var(--gt-border)] bg-[var(--gt-cream)]">
        <div className="max-w-[720px] mx-auto px-5 py-10 lg:py-16">
          <Eyebrow>Get a call back</Eyebrow>
          <H2>Tell us about your trip</H2>
          <div className="mt-8">
            <EnquiryForm />
          </div>
        </div>
      </section>

      {/* 11 · Closing CTA + footer */}
      <section className="bg-[var(--gt-navy)]">
        <div className="max-w-[1200px] mx-auto px-5 py-12 lg:py-16">
          <h2 className="text-[clamp(1.5rem,4vw,2.2rem)] leading-tight text-white" style={{ fontFamily: "var(--font-playfair)" }}>
            Ready when you are.
          </h2>
          <p className="mt-2 text-sm text-white/50 max-w-md">
            Tell us the date, the group size and where you are headed — we will confirm the vehicle and the exact rate.
          </p>
          <CtaPair section="closing" waMessage={WA_MESSAGES.hero()} dark className="mt-6 max-w-md" />

          <div className="mt-12 pt-6 border-t border-white/10 text-[11px] leading-relaxed text-white/40">
            <p>Golden Travels · {SEGMENT.address}</p>
            <p className="mt-1">
              {PHONE_DISPLAY} · <Link href="/" className="hover:text-white/70">goldentravels.co</Link> · Since 1987
            </p>
          </div>
        </div>
      </section>

      <StickyBar section="sticky" waMessage={WA_MESSAGES.hero()} />
    </div>
  );
}
