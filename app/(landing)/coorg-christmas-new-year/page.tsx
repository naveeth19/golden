import type { Metadata } from "next";
import Image from "next/image";
import Preloader from "@/components/Preloader";
import CoorgMotion from "./CoorgMotion";

import heroImg from "@/public/coorg/hero_clouds.jpg";
import bonfireImg from "@/public/coorg/bonfire.jpg";
import stayImg from "@/public/coorg/stay_night.jpg";
import roomImg from "@/public/coorg/room.jpg";
import foodImg from "@/public/coorg/food.jpg";
import fallsImg from "@/public/coorg/falls.jpg";
import rajasImg from "@/public/coorg/rajas.jpg";
import templeImg from "@/public/coorg/temple.jpg";
import roadImg from "@/public/coorg/road.jpg";
import peakImg from "@/public/coorg/peak.jpg";
import logoImg from "@/public/coorg/logo.png";

export const dynamic = "force-static";

const PATH = "/coorg-christmas-new-year";

export const metadata: Metadata = {
  title: { absolute: "Coorg Christmas & New Year Getaway 2026–27 | from ₹10,000 | Golden Holidays" },
  description:
    "2 Nights / 3 Days at Wood Clusters, Coorg. Christmas 24–26 Dec 2026 at ₹10,000 per person, New Year 31 Dec 2026–2 Jan 2027 at ₹12,000 per person. Breakfast, dinner, sightseeing & bonfire included.",
  alternates: { canonical: PATH },
  openGraph: {
    title: "Christmas in the Clouds — Coorg Festive Getaway | Golden Holidays",
    description: "Christmas ₹10,000 · New Year ₹12,000 per person · 2N/3D at Wood Clusters, Coorg",
    url: PATH,
    images: [{ url: "/coorg/hero_clouds.jpg", width: 1600, height: 900, alt: "Clouds over the hills of Coorg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christmas in the Clouds — Coorg Festive Getaway",
    description: "Christmas ₹10,000 · New Year ₹12,000 per person · 2N/3D at Wood Clusters, Coorg",
    images: ["/coorg/hero_clouds.jpg"],
  },
};

/* ── Contact ─────────────────────────────────────────────────────────────
   Same split as the rest of the site: calls go to 98450 33877, WhatsApp
   stays on 99029 33877. Every prefill carries a [Coorg …] tag so enquiries
   can be traced back to the section that produced them. */
const WA_NUMBER = "919902933877";
const TEL_HREF = "tel:+919845033877";
const PHONE_DISPLAY = "+91 98450 33877";
const wa = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
const MSG = {
  hero: "Hi Golden Holidays, I'm interested in the Coorg festive package. Please share availability. [Coorg hero]",
  xmas: "Hi Golden Holidays, I would like to book the Christmas Coorg package (24–26 Dec 2026). [Coorg christmas]",
  ny: "Hi Golden Holidays, I would like to book the New Year Coorg package (31 Dec 2026 – 2 Jan 2027). [Coorg newyear]",
  transport: "Hi Golden Holidays, I need a Bangalore – Coorg transport quote for the festive package. [Coorg transport]",
  book: "Hi Golden Holidays, I would like to book the Coorg festive package. Dates: __ Group size: __ [Coorg book]",
  sticky: "Hi Golden Holidays, I'm interested in the Coorg festive package. [Coorg sticky]",
};

const CHRISTMAS_START = "2026-12-24T06:00:00+05:30";

/* ── Icons ───────────────────────────────────────────────────────────── */
function WaIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2.05 22l5.3-1.38a9.87 9.87 0 0 0 4.69 1.19h.01c5.46 0 9.9-4.44 9.9-9.9a9.83 9.83 0 0 0-2.9-7A9.83 9.83 0 0 0 12.04 2zm0 18.1a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29z" />
    </svg>
  );
}
function PhoneIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function Tick({ color }: { color: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <path d="M3.5 9.5 L7.5 13 L14.5 5" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Yes() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
      <circle cx="10" cy="10" r="9" fill="#2F5A3F" />
      <path d="M6 10.4 L8.8 13 L14 7.4" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function No() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
      <circle cx="10" cy="10" r="9" fill="none" stroke="#8A3B2A" strokeWidth="1.5" />
      <path d="M7 7 L13 13 M13 7 L7 13" stroke="#8A3B2A" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function Mark() {
  return (
    <svg width="38" height="38" viewBox="0 0 40 40" aria-hidden>
      <circle cx="20" cy="20" r="18.5" fill="none" stroke="#D6B266" strokeWidth="1.5" />
      <circle cx="13" cy="14" r="3" fill="#D6B266" />
      <path d="M3.5 26 L13 19 L19 23.5 L27 15 L36.5 23 L36 29 Q30 36 20 38 Q10 36 4 29 Z" fill="#D6B266" />
    </svg>
  );
}

/** Call + WhatsApp, equal weight — the one CTA unit on this page. */
function CtaPair({ section, msg, call = "line" }: { section: string; msg: string; call?: "line" | "ghost" }) {
  return (
    <div className="cg-btns">
      <a className="cg-btn cg-btn--wa" href={wa(msg)} target="_blank" rel="noopener noreferrer" data-cta={`${section}|whatsapp`}>
        <WaIcon /> WhatsApp Us
      </a>
      <a className={`cg-btn cg-btn--${call}`} href={TEL_HREF} data-cta={`${section}|call`}>
        <PhoneIcon /> Call Now
      </a>
    </div>
  );
}

/* Deterministic sparkle field (no Math.random → no hydration mismatch). */
const SPARKLES = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  dur: `${9 + ((i * 7) % 9)}s`,
  delay: `${(i * 1.3) % 9}s`,
  x: `${((i % 5) - 2) * 24}px`,
  size: i % 3 === 0 ? 5 : 3,
}));

const SIGHTS = [
  { n: "01", title: "Abbey Falls", body: "One of Coorg's most famous waterfalls, tumbling through the forest.", img: fallsImg, alt: "Aerial view of Abbey Falls through the forest", pos: "center" },
  { n: "02", title: "Raja's Seat", body: "Sweeping valley views over the landscapes of Madikeri.", img: rajasImg, alt: "Mist settling over the valley seen from Raja's Seat", pos: "center 70%" },
  { n: "03", title: "Omkareshwara Temple", body: "A beautiful temple known for its distinctive architectural style.", img: templeImg, alt: "Aerial view of Omkareshwara Temple and its tank", pos: "42% center" },
] as const;

export default function CoorgFestivePage() {
  return (
    <>
      <Preloader />
      <CoorgMotion />

      {/* ═════════ HEADER ═════════ */}
      <header className="cg-header">
        <div className="cg-wrap cg-header__row">
          <a href="#top" className="cg-brand" aria-label="Golden Holidays — back to top">
            <Mark />
            <span>
              <span className="cg-brand__name">GOLDEN HOLIDAYS</span>
              <span className="cg-brand__since">SINCE 1987</span>
            </span>
          </a>
          <nav className="cg-nav" aria-label="Page sections">
            <a href="#packages">Packages</a>
            <a href="#stay">The Stay</a>
            <a href="#sightseeing">Sightseeing</a>
            <a href="#inclusions">Inclusions</a>
          </nav>
          <a href={TEL_HREF} className="cg-header__call" data-cta="header|call">
            <PhoneIcon size={15} />
            <span>{PHONE_DISPLAY}</span>
          </a>
        </div>
      </header>

      <main id="top">
        {/* ═════════ HERO ═════════ */}
        <section className="cg-hero">
          <div className="cg-hero__media" aria-hidden>
            <div className="cg-hero__zoom">
              <Image src={heroImg} alt="" fill priority sizes="100vw" placeholder="blur" />
            </div>
          </div>
          <div className="cg-hero__shade" aria-hidden />
          <div className="cg-mist cg-mist--a" aria-hidden />
          <div className="cg-mist cg-mist--b" aria-hidden />
          <div className="cg-sparkles" aria-hidden>
            {SPARKLES.map((s, i) => (
              <i
                key={i}
                style={{
                  left: s.left,
                  width: s.size,
                  height: s.size,
                  animationDuration: s.dur,
                  animationDelay: s.delay,
                  ["--x" as string]: s.x,
                }}
              />
            ))}
          </div>

          <div className="cg-wrap cg-hero__body">
            <p className="cg-eyebrow cg-eyebrow--light cg-hero__eyebrow" data-hero style={{ ["--d" as string]: "0ms" }}>
              Christmas &amp; New Year 2026–27 · Coorg
            </p>
            <h1>
              <span className="cg-line"><span style={{ ["--d" as string]: "120ms" }}>Christmas in</span></span>
              <span className="cg-line"><span style={{ ["--d" as string]: "260ms" }}>the <em>Clouds</em></span></span>
            </h1>
            <p className="cg-hero__sub" data-hero style={{ ["--d" as string]: "480ms" }}>
              Celebrate the festive season amid the misty hills of Coorg — 2 nights at Wood Clusters, sightseeing,
              breakfast &amp; dinner and a bonfire under the stars.
            </p>
            <div data-hero style={{ ["--d" as string]: "620ms" }}>
              <CtaPair section="hero" msg={MSG.hero} call="ghost" />
            </div>
            <div className="cg-price-strip" data-hero style={{ ["--d" as string]: "780ms" }}>
              <div>
                <small>Christmas · 24–26 Dec</small>
                <strong>₹10,000 <span>per person</span></strong>
              </div>
              <div>
                <small>New Year · 31 Dec–2 Jan</small>
                <strong>₹12,000 <span>per person</span></strong>
              </div>
              <div>
                <small>Duration</small>
                <strong>2N / 3D</strong>
              </div>
            </div>
          </div>
          <div className="cg-scroll-cue" aria-hidden>SCROLL</div>
        </section>

        {/* ═════════ COUNTDOWN RIBBON ═════════ */}
        <div className="cg-ribbon">
          <div className="cg-wrap cg-ribbon__row">
            <span>
              <i className="cg-dot" aria-hidden />
              Limited slots for both dates
            </span>
            <span>
              Christmas trip departs in <b data-countdown={CHRISTMAS_START}>a few weeks</b>
            </span>
          </div>
        </div>

        {/* ═════════ MARQUEE ═════════ */}
        <div className="cg-marquee" aria-hidden>
          <div className="cg-marquee__track">
            {[0, 1].map((k) => (
              <div key={k} style={{ display: "flex" }}>
                <span>Misty mornings</span>
                <span>Abbey Falls</span>
                <span>Raja&apos;s Seat</span>
                <span>Coffee country</span>
                <span>Omkareshwara Temple</span>
                <span>Bonfire nights</span>
                <span>Wood Clusters</span>
              </div>
            ))}
          </div>
        </div>

        {/* ═════════ INTRO ═════════ */}
        <section className="cg-wrap cg-intro">
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <p className="cg-eyebrow" data-reveal>A festive escape</p>
            <h2 className="cg-h2" data-reveal style={{ ["--d" as string]: "100ms" }}>
              Misty mornings, coffee country and <em>fireside evenings.</em>
            </h2>
          </div>
          <p className="cg-lede" data-reveal style={{ ["--d" as string]: "200ms", fontSize: 18 }}>
            Escape the everyday and reconnect with nature this Christmas and New Year. Wake up to fresh mountain air,
            explore Coorg&apos;s famous waterfall, viewpoint, temple and coffee estates, and end each day around a bonfire
            with the people you love.
          </p>
        </section>

        {/* ═════════ PACKAGES ═════════ */}
        <section id="packages" className="cg-wrap cg-packages" style={{ scrollMarginTop: 80 }}>
          <div className="cg-pk-grid">
            <article className="cg-pk" data-reveal>
              <div className="cg-pk__media" data-curtain>
                <Image src={bonfireImg} alt="Guests dancing around a bonfire at night" fill sizes="(min-width: 900px) 50vw, 100vw" placeholder="blur" style={{ objectPosition: "40% center" }} />
                <span className="cg-tag">CHRISTMAS SPECIAL</span>
              </div>
              <div className="cg-pk__body">
                <div>
                  <h3>Christmas in Coorg</h3>
                  <p className="cg-pk__dates">24 – 26 December 2026 · 2 Nights / 3 Days</p>
                </div>
                <div className="cg-pk__price">
                  <strong>₹10,000</strong>
                  <span>per person</span>
                </div>
                <ul className="cg-ticks">
                  <li><Tick color="#7A5A16" />2 nights at Wood Clusters, Coorg</li>
                  <li><Tick color="#7A5A16" />Daily breakfast &amp; dinner</li>
                  <li><Tick color="#7A5A16" />Local sightseeing with entry tickets</li>
                  <li><Tick color="#7A5A16" />Bonfire evening (weather permitting)</li>
                </ul>
                <div className="cg-pk__cta">
                  <a className="cg-btn cg-btn--wa" href={wa(MSG.xmas)} target="_blank" rel="noopener noreferrer" data-cta="christmas|whatsapp">
                    <WaIcon /> WhatsApp Us
                  </a>
                  <a className="cg-btn cg-btn--line" href={TEL_HREF} data-cta="christmas|call">
                    <PhoneIcon /> Call Now
                  </a>
                </div>
              </div>
            </article>

            <article className="cg-pk cg-pk--dark" data-reveal style={{ ["--d" as string]: "140ms" }}>
              <div className="cg-pk__media" data-curtain style={{ ["--d" as string]: "140ms" }}>
                <Image src={stayImg} alt="Wood Clusters' carved wooden veranda lit up at night" fill sizes="(min-width: 900px) 50vw, 100vw" placeholder="blur" style={{ objectPosition: "70% center" }} />
                <span className="cg-tag">NEW YEAR SPECIAL</span>
              </div>
              <div className="cg-pk__body">
                <div>
                  <h3>New Year in the Hills</h3>
                  <p className="cg-pk__dates">31 Dec 2026 – 2 Jan 2027 · 2 Nights / 3 Days</p>
                </div>
                <div className="cg-pk__price">
                  <strong>₹12,000</strong>
                  <span>per person</span>
                </div>
                <ul className="cg-ticks">
                  <li><Tick color="#E3C784" />2 nights at Wood Clusters, Coorg</li>
                  <li><Tick color="#E3C784" />Daily breakfast &amp; dinner</li>
                  <li><Tick color="#E3C784" />Local sightseeing with entry tickets</li>
                  <li><Tick color="#E3C784" />Ring in 2027 around the bonfire (weather permitting)</li>
                </ul>
                <div className="cg-pk__cta">
                  <a className="cg-btn cg-btn--wa" href={wa(MSG.ny)} target="_blank" rel="noopener noreferrer" data-cta="newyear|whatsapp">
                    <WaIcon /> WhatsApp Us
                  </a>
                  <a className="cg-btn cg-btn--line" href={TEL_HREF} data-cta="newyear|call">
                    <PhoneIcon /> Call Now
                  </a>
                </div>
              </div>
            </article>
          </div>
          <p className="cg-note" data-reveal="fade">
            Limited slots for both dates. Bangalore – Coorg transport is not included and can be arranged separately.
          </p>
        </section>

        {/* ═════════ THE STAY ═════════ */}
        <section id="stay" className="cg-dark" style={{ scrollMarginTop: 60 }}>
          <div className="cg-wrap cg-stay">
            <div className="cg-stay__head">
              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <p className="cg-eyebrow cg-eyebrow--light" data-reveal>Your stay</p>
                <h2 className="cg-h2" data-reveal style={{ ["--d" as string]: "100ms" }}>
                  Wood Clusters, <em>Coorg</em>
                </h2>
              </div>
              <p className="cg-lede" data-reveal style={{ ["--d" as string]: "200ms" }}>
                Hand-carved wooden verandas, warm timber-lined rooms and home-style Coorg cooking — a cosy base to come
                back to after a day in the hills.
              </p>
            </div>
            <div className="cg-stay__grid">
              <figure className="cg-fig" data-curtain>
                <Image src={stayImg} alt="Carved wooden pillars and lit veranda at Wood Clusters" fill sizes="(min-width: 860px) 66vw, 100vw" placeholder="blur" />
                <figcaption>THE VERANDA</figcaption>
              </figure>
              <figure className="cg-fig" data-curtain style={{ ["--d" as string]: "120ms" }}>
                <Image src={roomImg} alt="Timber-lined bedroom with a double bed" fill sizes="(min-width: 860px) 33vw, 100vw" placeholder="blur" />
                <figcaption>ROOMS</figcaption>
              </figure>
              <figure className="cg-fig" data-curtain style={{ ["--d" as string]: "240ms" }}>
                <Image src={foodImg} alt="Coorg-style dishes served at the table" fill sizes="(min-width: 860px) 33vw, 100vw" placeholder="blur" style={{ objectPosition: "70% center" }} />
                <figcaption>BREAKFAST &amp; DINNER</figcaption>
              </figure>
            </div>
            <div className="cg-stats" data-reveal>
              <div><strong>2 nights</strong><span>Comfortable stay at Wood Clusters</span></div>
              <div><strong>2 meals daily</strong><span>Breakfast and dinner throughout</span></div>
              <div><strong>1 bonfire</strong><span>Evening by the fire, weather permitting</span></div>
            </div>
          </div>
        </section>

        {/* ═════════ SIGHTSEEING ═════════ */}
        <section id="sightseeing" className="cg-wrap cg-sights" style={{ scrollMarginTop: 60 }}>
          <div className="cg-sights__head">
            <p className="cg-eyebrow" data-reveal>Sightseeing included</p>
            <h2 className="cg-h2" data-reveal style={{ ["--d" as string]: "100ms" }}>
              The best of Coorg, <em>tickets included.</em>
            </h2>
            <p className="cg-lede" data-reveal style={{ ["--d" as string]: "200ms" }}>
              Local sightseeing transport and entry tickets to every attraction below are part of your package.
            </p>
          </div>
          <div className="cg-sights__grid">
            {SIGHTS.map((s, i) => (
              <article key={s.n} className="cg-sight" data-reveal style={{ ["--d" as string]: `${i * 120}ms` }}>
                <div className="cg-sight__media" data-curtain style={{ ["--d" as string]: `${i * 120}ms` }}>
                  <Image src={s.img} alt={s.alt} fill sizes="(min-width: 1100px) 25vw, (min-width: 640px) 50vw, 100vw" placeholder="blur" style={{ objectPosition: s.pos }} />
                  <span className="cg-sight__num">{s.n}</span>
                </div>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </article>
            ))}
            <article className="cg-sight" data-reveal style={{ ["--d" as string]: "360ms" }}>
              <div className="cg-sight__media">
                <div className="cg-coffee">
                  <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden>
                    <ellipse cx="36" cy="36" rx="17" ry="25" fill="none" stroke="#7A5A16" strokeWidth="2.2" transform="rotate(25 36 36)" />
                    <path d="M28 14 Q44 36 44 58" fill="none" stroke="#7A5A16" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                  <span>Coorg&apos;s coffee country</span>
                </div>
                <span className="cg-sight__num">04</span>
              </div>
              <div>
                <h3>Coffee Plantation</h3>
                <p>Walk through Coorg&apos;s famous coffee-growing heritage.</p>
              </div>
            </article>
          </div>
        </section>

        {/* ═════════ INCLUSIONS ═════════ */}
        <section id="inclusions" className="cg-incl-bg" style={{ scrollMarginTop: 60 }}>
          <div className="cg-wrap cg-incl">
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <p className="cg-eyebrow" data-reveal>The details</p>
              <h2 className="cg-h2" data-reveal style={{ ["--d" as string]: "100ms", fontSize: "clamp(40px, 5vw, 64px)" }}>
                What&apos;s in your package
              </h2>
              <p className="cg-lede" data-reveal style={{ ["--d" as string]: "200ms", fontSize: 16 }}>
                Clear, simple pricing for both festive dates. Questions? Message us and we&apos;ll walk you through it.
              </p>
            </div>
            <div className="cg-card" data-reveal style={{ ["--d" as string]: "120ms" }}>
              <h3 style={{ color: "#2F5A3F" }}>INCLUDED</h3>
              <ul>
                <li><Yes />2 nights&apos; stay at Wood Clusters, Coorg</li>
                <li><Yes />Daily breakfast and dinner</li>
                <li><Yes />Local sightseeing transportation</li>
                <li><Yes />Entry tickets: Abbey Falls, Raja&apos;s Seat, Omkareshwara Temple, coffee plantation</li>
                <li><Yes />Bonfire evening (weather permitting)</li>
              </ul>
            </div>
            <div className="cg-card" data-reveal style={{ ["--d" as string]: "240ms" }}>
              <h3 style={{ color: "#8A3B2A" }}>NOT INCLUDED</h3>
              <ul>
                <li><No />Lunch during the trip</li>
                <li><No />Bangalore – Coorg transportation</li>
                <li><No />Personal expenses and purchases</li>
                <li><No />Any activities or services not listed under inclusions</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ═════════ TRANSPORT ═════════ */}
        <section className="cg-wrap cg-transport">
          <div className="cg-transport__box" data-reveal>
            <div className="cg-transport__media cg-parallax">
              <Image src={roadImg} alt="A winding ghat road through the forested hills of Coorg" fill sizes="(min-width: 900px) 50vw, 100vw" placeholder="blur" />
            </div>
            <div className="cg-transport__body">
              <p className="cg-eyebrow">Getting there</p>
              <h2 className="cg-h2" style={{ fontSize: "clamp(36px, 4.4vw, 56px)" }}>
                Travelling from Bangalore? <em>We&apos;ll get you there.</em>
              </h2>
              <p className="cg-lede" style={{ fontSize: 16 }}>
                Bangalore – Coorg travel can be arranged separately to suit your group and budget, at additional cost.
              </p>
              <div className="cg-chips">
                <span>Bus</span>
                <span>Tempo Traveller</span>
                <span>Force Urbania</span>
                <span>Private car</span>
              </div>
              <CtaPair section="transport" msg={MSG.transport} />
            </div>
          </div>
        </section>

        {/* ═════════ BOOK ═════════ */}
        <section id="book" className="cg-book">
          <div className="cg-book__bg cg-parallax" aria-hidden>
            <Image src={peakImg} alt="" fill sizes="100vw" placeholder="blur" />
          </div>
          <div className="cg-book__body">
            <Image src={logoImg} alt="Golden Holidays, since 1987" className="cg-book__logo" data-reveal="zoom" sizes="210px" />
            <h2 data-reveal style={{ ["--d" as string]: "100ms" }}>
              Book your <em>festive escape</em>
            </h2>
            <p data-reveal style={{ ["--d" as string]: "200ms" }}>
              Slots are limited for both dates. Message us on WhatsApp with your dates and group size and we&apos;ll
              confirm availability.
            </p>
            <div data-reveal style={{ ["--d" as string]: "300ms" }}>
              <CtaPair section="book" msg={MSG.book} call="ghost" />
            </div>
            <small data-reveal="fade" style={{ ["--d" as string]: "400ms" }}>
              Christmas 24–26 Dec 2026 · ₹10,000 per person · New Year 31 Dec–2 Jan · ₹12,000 per person
            </small>
          </div>
        </section>
      </main>

      {/* ═════════ FOOTER ═════════ */}
      <footer className="cg-footer">
        <div className="cg-wrap cg-footer__row">
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span className="cg-serif" style={{ fontSize: 22, letterSpacing: "0.2em", color: "#fff", fontWeight: 600 }}>GOLDEN HOLIDAYS</span>
            <span style={{ fontSize: 11, letterSpacing: "0.3em", color: "#D6B266" }}>SINCE 1987</span>
          </div>
          <address>Golden House, No. 1697/36, Dr Rajkumar Road, Prakash Nagar, Rajajinagar, Bengaluru 560021</address>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <a href={TEL_HREF} data-cta="footer|call">{PHONE_DISPLAY}</a>
            <a href={wa(MSG.hero)} target="_blank" rel="noopener noreferrer" data-cta="footer|whatsapp">WhatsApp +91 99029 33877</a>
          </div>
        </div>
      </footer>

      {/* ═════════ MOBILE STICKY BAR ═════════ */}
      <div className="cg-sticky">
        <a className="cg-btn cg-btn--wa" href={wa(MSG.sticky)} target="_blank" rel="noopener noreferrer" data-cta="sticky|whatsapp">
          <WaIcon /> WhatsApp
        </a>
        <a className="cg-btn cg-btn--gold" href={TEL_HREF} data-cta="sticky|call">
          <PhoneIcon /> Call Now
        </a>
      </div>
    </>
  );
}
