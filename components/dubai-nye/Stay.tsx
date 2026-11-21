"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { hotel } from "./content";
import { ArrowIcon, CheckIcon } from "./Icons";
import Reveal from "./Reveal";

/** 3D cover-flow of the real hotel photos. */
function Gallery() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const n = hotel.photos.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Photos of Excelsior Hotel Deira"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div className="relative aspect-[4/3] [perspective:1400px] sm:aspect-[16/11]">
        {hotel.photos.map((p, k) => {
          let off = k - i;
          if (off > n / 2) off -= n;
          if (off < -n / 2) off += n;
          const abs = Math.abs(off);
          return (
            <motion.figure
              key={p.src}
              aria-hidden={off !== 0}
              className="absolute inset-0 overflow-hidden rounded-card shadow-deep ring-1 ring-navy/10"
              initial={false}
              animate={{
                x: `${off * 16}%`,
                rotateY: off * -32,
                z: abs * -320,
                scale: off === 0 ? 1 : 0.8,
                opacity: abs > 1 ? 0 : off === 0 ? 1 : 0.7,
              }}
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 22 }}
              style={{ zIndex: 10 - abs, pointerEvents: off === 0 ? "auto" : "none" }}
              drag={off === 0 && !reduce ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1);
                else if (info.offset.x > 60) go(-1);
              }}
            >
              <Image src={p.src} alt={p.alt} fill sizes="(min-width:1024px) 640px, 100vw" className="object-cover" draggable={false} />
              <figcaption className="absolute bottom-4 left-4 rounded-pill bg-night-900/75 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cream backdrop-blur">
                {p.label}
              </figcaption>
            </motion.figure>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-1">
          {hotel.photos.map((p, k) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setI(k)}
              aria-label={`Show photo ${k + 1}: ${p.label}`}
              aria-current={k === i}
              className="flex h-11 w-11 items-center justify-center"
            >
              <span className={`block h-1.5 rounded-full transition-all ${k === i ? "w-7 bg-crimson" : "w-1.5 bg-navy/30"}`} />
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="flex h-12 w-12 items-center justify-center rounded-full border border-navy/25 text-navy transition-colors hover:bg-navy hover:text-cream">
            <ArrowIcon className="h-5 w-5 rotate-180" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next photo" className="flex h-12 w-12 items-center justify-center rounded-full border border-navy/25 text-navy transition-colors hover:bg-navy hover:text-cream">
            <ArrowIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Stay() {
  return (
    <section id="stay" aria-labelledby="stay-title" className="overflow-hidden bg-cream text-navy">
      <div className="mx-auto grid max-w-page gap-14 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Gallery />
        </div>
        <div className="lg:col-span-5">
          <Reveal>
            <p className="text-eyebrow font-semibold uppercase text-crimson">Your stay · 5 nights</p>
            <h2 id="stay-title" className="mt-5 font-display text-d-md font-medium">{hotel.name}</h2>
            <p className="mt-5 text-lg italic leading-relaxed text-navy/85 font-display">{hotel.location}.</p>
            <p className="mt-4 text-[15px] leading-relaxed text-navy/80">
              Five nights with daily breakfast, a rooftop pool for slow mornings, and private airport transfers so you
              arrive and leave without a thought.
            </p>
          </Reveal>
          <ul className="mt-9 divide-y divide-navy/10 border-y border-navy/10">
            {hotel.features.map((f, k) => (
              <Reveal as="li" key={f} delay={k * 0.05} className="flex items-center gap-4 py-4 text-[15px]">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-champagne-light">
                  <CheckIcon />
                </span>
                {f}
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
