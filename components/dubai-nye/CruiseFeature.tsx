"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ContactButtons from "./ContactButtons";
import { IMG } from "./content";
import Reveal from "./Reveal";
import { Spark } from "./Icons";

const route = [
  "Dubai Water Canal and Business Bay bridges",
  "The Downtown skyline and the Burj Khalifa",
  "Business Bay and the JW Marriott Marquis",
  "Dubai Festival City",
];
const onboard = [
  "Five-star international buffet dinner",
  "Unlimited soft drinks",
  "Live shows and a DJ",
  "A midnight toast with sparkling fruit drink",
];

export default function CruiseFeature() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  // The cinema screen tilts up out of the floor into place.
  const rotateX = useTransform(scrollYProgress, [0, 1], [32, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  // Floating portrait card sits on a nearer plane.
  const cardY = useTransform(scrollYProgress, [0, 1], [180, 0]);
  const cardRot = useTransform(scrollYProgress, [0, 1], [-14, -4]);

  return (
    <section
      ref={ref}
      id="cruise"
      aria-labelledby="cruise-title"
      className="relative overflow-hidden bg-night-900 text-cream"
    >
      <Image
        src={`${IMG}/texture.webp`}
        alt=""
        fill
        sizes="100vw"
        className="-z-0 object-cover opacity-40"
      />
      <div className="relative mx-auto max-w-page px-5 pb-24 pt-24 sm:px-8 md:pb-36 md:pt-32">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reveal>
              <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase text-champagne">
                <Spark className="h-2.5 w-2.5" /> 31 December · The big night
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 id="cruise-title" className="mt-6 font-display text-d-lg font-medium">
                Midnight, <span className="italic text-champagne-light">on the water.</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="md:col-span-5">
            <p className="text-lg leading-relaxed text-cream/85">
              The Premium New Year&rsquo;s Eve Dubai Canal Cruise. Dinner is served as the skyline lights up, and at
              midnight the Burj Khalifa and Festival City fireworks fill the sky above you. We&rsquo;ll get you there.
            </p>
          </Reveal>
        </div>

        {/* 3D stage */}
        <div className="relative mt-14 [perspective:1600px] md:mt-20">
          <motion.figure
            className="relative aspect-[3/2] w-full origin-bottom overflow-hidden rounded-card shadow-deep ring-1 ring-champagne/25 md:aspect-[16/8]"
            style={reduce ? { rotateX: 0, scale: 1, y: 0 } : { rotateX, scale, y }}
          >
            <Image
              src={`${IMG}/cruise.webp`}
              alt="A glass-walled dinner cruise glides along a Dubai canal at night as golden fireworks burst over the skyline and the Burj Khalifa"
              fill
              sizes="(min-width: 1240px) 1180px, 100vw"
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night-900/80 via-transparent to-transparent" />
            <figcaption className="absolute bottom-0 left-0 p-5 sm:p-8">
              <span className="block text-eyebrow font-semibold uppercase text-champagne">Boarding 8–9 PM</span>
              <span className="mt-2 block font-display text-2xl sm:text-4xl">Cruising 10 PM – 2 AM</span>
            </figcaption>
          </motion.figure>

          <motion.div
            className="absolute -bottom-16 right-3 hidden w-[26%] max-w-[300px] overflow-hidden rounded-card shadow-deep ring-1 ring-champagne/40 md:block lg:-right-6"
            style={reduce ? { y: 0, rotate: -4 } : { y: cardY, rotate: cardRot }}
          >
            <Image
              src={`${IMG}/celebrate.webp`}
              alt="Two couples laughing and raising glasses on a boat as fireworks light up the Dubai skyline"
              width={1122}
              height={1402}
              sizes="300px"
              className="h-auto w-full"
            />
          </motion.div>
        </div>

        <div className="mt-24 grid gap-12 md:mt-32 md:grid-cols-3">
          <Reveal>
            <h3 className="text-eyebrow font-semibold uppercase text-champagne">The route</h3>
            <ol className="mt-6 space-y-4">
              {route.map((r, i) => (
                <li key={r} className="flex gap-4 border-b border-cream/10 pb-4 text-[15px] text-cream/85">
                  <span className="font-display text-champagne">{String(i + 1).padStart(2, "0")}</span>
                  {r}
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="text-eyebrow font-semibold uppercase text-champagne">On board</h3>
            <ul className="mt-6 space-y-4">
              {onboard.map((r) => (
                <li key={r} className="flex gap-4 border-b border-cream/10 pb-4 text-[15px] text-cream/85">
                  <Spark className="mt-1.5 h-2.5 w-2.5 shrink-0 text-champagne" />
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.16}>
            <h3 className="text-eyebrow font-semibold uppercase text-champagne">At midnight</h3>
            <p className="mt-6 font-display text-3xl leading-tight text-cream">
              The Burj Khalifa and Festival City fireworks, seen from the water.
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-cream/75">
              Dress code is smart casual. Carry a light layer, as it gets breezy on deck.
            </p>
            <ContactButtons placement="cruise" size="md" className="mt-8 sm:!flex-col sm:items-start" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
