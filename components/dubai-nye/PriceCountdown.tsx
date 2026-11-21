"use client";

import { useEffect, useState } from "react";
import ContactButtons from "./ContactButtons";
import { bookingSteps, brand, trip } from "./content";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

const TARGET = new Date(trip.deadlineISO).getTime();

function useCountdown() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = window.setTimeout(tick, 0);
    const t = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(t);
    };
  }, []);
  if (now === null) return null;
  const ms = Math.max(0, TARGET - now);
  return {
    done: ms === 0,
    d: Math.floor(ms / 86400000),
    h: Math.floor((ms / 3600000) % 24),
    m: Math.floor((ms / 60000) % 60),
    s: Math.floor((ms / 1000) % 60),
  };
}

function Countdown() {
  const c = useCountdown();
  const cells: [string, number | undefined][] = [
    ["Days", c?.d],
    ["Hours", c?.h],
    ["Minutes", c?.m],
    ["Seconds", c?.s],
  ];
  if (c?.done) return <p className="font-display text-2xl text-cream">Bookings for this departure have closed.</p>;
  return (
    <div>
      <p className="text-eyebrow font-semibold uppercase text-champagne">Bookings close in</p>
      <div className="mt-4 grid grid-cols-4 gap-2 sm:gap-3" role="timer" aria-label={`Bookings close on 1 December 2026 at 11:59 PM IST`}>
        {cells.map(([l, v]) => (
          <div key={l} className="rounded-xl bg-night-700/80 px-2 py-4 text-center ring-1 ring-cream/10">
            <span className="block font-display text-3xl tabular-nums text-cream sm:text-4xl" aria-hidden>
              {v === undefined ? "--" : String(v).padStart(2, "0")}
            </span>
            <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.16em] text-cream/70">{l}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-cream/70">{trip.deadlineLabel}, 11:59 PM IST.</p>
    </div>
  );
}

/** The price presented as a 3D gala pass. */
function GalaPass() {
  return (
    <TiltCard max={12} className="rounded-[1.6rem]">
      <div className="relative overflow-hidden rounded-[1.6rem] bg-[linear-gradient(150deg,#F3E6C4_0%,#D9B871_42%,#B8954D_70%,#E9D6A6_100%)] p-[1px] shadow-[0_50px_90px_-35px_rgba(0,0,0,.85)]">
        <div className="relative rounded-[1.55rem] bg-night-800 px-7 pb-8 pt-7 sm:px-9">
          {/* perforation */}
          <div aria-hidden className="absolute inset-x-0 top-[62%] flex items-center">
            <span className="-ml-3 h-6 w-6 rounded-full bg-night-900" />
            <span className="h-px flex-1 border-t border-dashed border-champagne/40" />
            <span className="-mr-3 h-6 w-6 rounded-full bg-night-900" />
          </div>
          <div className="flex flex-wrap items-start justify-between gap-3 [transform:translateZ(30px)]">
            <div>
              <p className="whitespace-nowrap font-display text-sm tracking-[0.22em] text-champagne-light sm:tracking-[0.3em]">GOLDEN HOLIDAYS</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.25em] text-cream/70">Gala pass · 2027</p>
            </div>
            <p className="whitespace-nowrap rounded-pill border border-champagne/40 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-champagne-light">
              {trip.duration}
            </p>
          </div>
          <p className="mt-8 font-display text-3xl leading-tight text-cream [transform:translateZ(40px)] sm:text-4xl">
            New Year&rsquo;s Eve <span className="italic text-champagne-light">in</span> Dubai
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm [transform:translateZ(25px)]">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-cream/70">From</p>
              <p className="mt-1 font-semibold text-cream">Bengaluru</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-cream/70">Dates</p>
              <p className="mt-1 font-semibold text-cream">{trip.dates}</p>
            </div>
          </div>
          <div className="mt-14 [transform:translateZ(50px)]">
            <p className="text-[11px] uppercase tracking-[0.2em] text-cream/70">Price</p>
            <p className="mt-2 font-display text-5xl leading-none text-champagne-light sm:text-6xl">{trip.price}</p>
            <p className="mt-2 text-sm text-cream/80">{trip.priceSuffix}</p>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

export default function PriceCountdown() {
  return (
    <section id="book" aria-labelledby="book-title" className="relative overflow-hidden bg-night-900 text-cream">
      <div className="mx-auto grid max-w-page gap-16 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <Reveal>
            <GalaPass />
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <Reveal>
            <p className="text-eyebrow font-semibold uppercase text-champagne">Reserve your place</p>
            <h2 id="book-title" className="mt-5 font-display text-d-md font-medium">
              Your midnight in Dubai starts with <span className="italic text-champagne-light">one message.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.06} className="mt-10">
            <Countdown />
          </Reveal>
          <ol className="mt-10 grid gap-6 sm:grid-cols-3">
            {bookingSteps.map((s, i) => (
              <Reveal as="li" key={s.t} delay={0.06 * i} className="border-t border-champagne/30 pt-5">
                <span className="font-display text-champagne">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-2 font-semibold text-cream">{s.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-cream/75">{s.d}</p>
              </Reveal>
            ))}
          </ol>
          <ContactButtons placement="book" className="mt-10" />
          <p className="mt-6 text-sm text-cream/70">
            Golden Travels, {brand.city} · {brand.since}
          </p>
        </div>
      </div>
    </section>
  );
}
