"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { itinerary, itineraryFootnote } from "./content";
import { PlusIcon, Spark } from "./Icons";
import Reveal from "./Reveal";

export default function Itinerary() {
  const [open, setOpen] = useState<number[]>([4]);
  const reduce = useReducedMotion();
  const toggle = (d: number) => setOpen((o) => (o.includes(d) ? o.filter((x) => x !== d) : [...o, d]));
  const all = open.length === itinerary.length;

  return (
    <section id="itinerary" aria-labelledby="it-title" className="relative bg-night-900 text-cream">
      <div className="mx-auto max-w-page px-5 py-24 sm:px-8 md:py-32">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="text-eyebrow font-semibold uppercase text-champagne">Day by day</p>
            <h2 id="it-title" className="mt-5 font-display text-d-md font-medium">
              Your six days, <span className="italic text-champagne-light">in full.</span>
            </h2>
          </Reveal>
          <button
            type="button"
            onClick={() => setOpen(all ? [] : itinerary.map((d) => d.day))}
            className="min-h-[44px] self-start rounded-pill border border-cream/25 px-5 text-sm font-semibold text-cream/90 transition-colors hover:border-champagne hover:text-champagne-light md:self-auto"
          >
            {all ? "Collapse all days" : "Expand all days"}
          </button>
        </div>

        <ol className="relative mt-14 border-l border-cream/15 pl-6 sm:pl-10">
          {itinerary.map((d) => {
            const isOpen = open.includes(d.day);
            const id = `day-${d.day}`;
            return (
              <li key={d.day} className="relative pb-5 last:pb-0">
                {/* node */}
                <span
                  aria-hidden
                  className={`absolute top-7 h-3 w-3 -translate-x-1/2 rounded-full ${
                    d.peak ? "-left-6 h-4 w-4 bg-crimson shadow-[0_0_0_6px_rgba(196,30,58,.25),0_0_30px_rgba(217,184,113,.6)] sm:-left-10" : "-left-6 bg-champagne sm:-left-10"
                  }`}
                />
                <div
                  className={`overflow-hidden rounded-card transition-colors ${
                    d.peak
                      ? "bg-[linear-gradient(135deg,#2A1420_0%,#1E2235_55%,#12141F_100%)] shadow-glow ring-1 ring-champagne/50"
                      : "bg-night-700/60 ring-1 ring-cream/10"
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`${id}-panel`}
                      id={`${id}-btn`}
                      onClick={() => toggle(d.day)}
                      className="flex min-h-[72px] w-full items-center gap-4 px-5 py-5 text-left sm:gap-8 sm:px-8"
                    >
                      <span className={`font-display leading-none ${d.peak ? "text-5xl text-champagne-light sm:text-6xl" : "text-4xl text-champagne sm:text-5xl"}`}>
                        {String(d.day).padStart(2, "0")}
                      </span>
                      <span className="flex-1">
                        <span className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-cream/70">
                          Day {d.day} · {d.date}
                          {d.peak && (
                            <span className="inline-flex items-center gap-1.5 rounded-pill bg-crimson px-2.5 py-1 text-[10px] tracking-[0.2em] text-white">
                              <Spark className="h-2 w-2" /> The big night
                            </span>
                          )}
                        </span>
                        <span className={`mt-2 block font-display font-medium leading-tight ${d.peak ? "text-2xl sm:text-4xl" : "text-xl sm:text-3xl"}`}>{d.title}</span>
                      </span>
                      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 ${isOpen ? "rotate-45 border-champagne text-champagne" : "border-cream/25 text-cream/80"}`}>
                        <PlusIcon />
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`${id}-panel`}
                        role="region"
                        aria-labelledby={`${id}-btn`}
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduce ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="grid gap-6 px-5 pb-7 sm:px-8 md:grid-cols-12 md:gap-10">
                          <div className="relative aspect-[3/2] overflow-hidden rounded-xl md:col-span-5">
                            <Image src={d.img} alt={d.alt} fill sizes="(min-width:768px) 460px, 100vw" className="object-cover" />
                          </div>
                          <ul className="space-y-3 text-[15px] leading-relaxed text-cream/85 md:col-span-7">
                            {d.items.map((it, k) =>
                              typeof it === "string" ? (
                                <li key={k} className="flex gap-3">
                                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-champagne" aria-hidden />
                                  {it}
                                </li>
                              ) : (
                                <li key={k}>
                                  <span className="flex gap-3 font-semibold text-cream">
                                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-champagne" aria-hidden />
                                    {it.lead}
                                  </span>
                                  <ul className="mt-2 space-y-2 border-l border-champagne/30 pl-5 ml-0.5">
                                    {it.sub.map((s) => (
                                      <li key={s}>{s}</li>
                                    ))}
                                  </ul>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </li>
            );
          })}
        </ol>
        <p className="mt-8 text-sm text-cream/70">{itineraryFootnote}</p>
      </div>
    </section>
  );
}
