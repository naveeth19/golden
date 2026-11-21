"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ContactButtons from "./ContactButtons";
import { brand, IMG, trip } from "./content";
import { Spark } from "./Icons";

const FireworksCanvas = dynamic(() => import("./FireworksCanvas"), { ssr: false });

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [sparks, setSparks] = useState(false);

  // Load the WebGL layer only after the page is idle, never for reduced motion / data saver.
  useEffect(() => {
    if (reduce) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) return;
    const go = () => setSparks(true);
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const kick = () => (idle ? idle(go, { timeout: 2500 }) : window.setTimeout(go, 1200));
    if (document.readyState === "complete") kick();
    else window.addEventListener("load", kick, { once: true });
  }, [reduce]);

  // Scroll parallax: the photo plane recedes and tilts back as you scroll.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgRot = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Pointer depth: photo and type move at different depths.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const photoX = useTransform(sx, (v) => v * -14);
  const photoY = useTransform(sy, (v) => v * -10);
  const rotY = useTransform(sx, (v) => v * 2.2);
  const rotX = useTransform(sy, (v) => v * -1.6);
  const typeX = useTransform(sx, (v) => v * 10);

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  const m = !reduce;

  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-night-900 text-cream [perspective:1400px]"
    >
      {/* Photo plane */}
      <motion.div
        className="absolute inset-[-4%] -z-20 origin-bottom [transform-style:preserve-3d] md:left-[34%]"
        style={m ? { y: imgY, rotateX: imgRot, x: photoX, translateY: photoY, rotateY: rotY } : { y: 0, rotateX: 0, x: 0, translateY: 0, rotateY: 0 }}
      >
        <motion.div className="absolute inset-0" style={m ? { rotateX: rotX } : { rotateX: 0 }}>
          <Image
            src={`${IMG}/fireworks.webp`}
            alt="The Burj Khalifa lit up with golden New Year fireworks above the Downtown Dubai skyline"
            fill
            priority
            fetchPriority="high"
            sizes="(min-width: 768px) 70vw, 100vw"
            className="object-cover object-[50%_32%] md:object-[50%_40%]"
          />
        </motion.div>
      </motion.div>

      {/* WebGL sparks with true depth */}
      {sparks && (
        <FireworksCanvas className="pointer-events-none absolute inset-0 -z-10 h-full w-full animate-[dnye-fade-in_2s_ease_forwards] opacity-0 mix-blend-screen" />
      )}

      {/* Legibility grade (directional, not decorative) */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#0C0E16_0%,#0C0E16_34%,rgba(12,14,22,.55)_48%,rgba(12,14,22,0)_68%)] max-md:bg-[linear-gradient(0deg,rgba(12,14,22,.97)_8%,rgba(12,14,22,.78)_48%,rgba(12,14,22,.2)_80%)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-night-900 to-transparent" />

      {/* Header */}
      <header className="relative z-10 mx-auto flex w-full max-w-page items-center justify-between px-5 pt-5 sm:px-8 sm:pt-7">
        <a href="#top" className="group flex flex-col leading-none">
          <span className="font-display text-[1.15rem] font-semibold tracking-[0.32em] text-champagne-light sm:text-[1.3rem]">GOLDEN HOLIDAYS</span>
          <span className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.3em] text-cream/75">by Golden Travels · {brand.since}</span>
        </a>
        <a
          href={brand.phoneHref}
          className="hidden min-h-[44px] items-center rounded-pill border border-cream/25 px-4 text-sm font-medium text-cream/90 transition-colors hover:border-champagne hover:text-champagne-light md:inline-flex"
          onClick={() => import("./tracking").then((t) => t.trackContact("call", "header"))}
        >
          {brand.phoneDisplay}
        </a>
      </header>

      {/* Copy */}
      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-page flex-1 flex-col justify-end px-5 pb-14 pt-24 sm:px-8 md:justify-center md:pb-24"
        style={m ? { y: textY, opacity: fade, x: typeX } : { y: 0, opacity: 1, x: 0 }}
      >
        <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase text-champagne">
          <Spark className="h-2.5 w-2.5" />
          {trip.duration}<span className="max-sm:hidden"> · {trip.departs}</span>
        </p>
        <h1 id="hero-title" className="mt-5 max-w-[11ch] font-display text-d-xl font-medium text-cream">
          New Year&rsquo;s Eve <span className="italic text-champagne-light">in</span> Dubai
        </h1>
        <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-cream/85 sm:text-xl">
          Ring in 2027 on the water beneath the Burj Khalifa fireworks. Six days of Dubai, arranged end to end from Bengaluru.
        </p>

        <div className="mt-8 flex flex-wrap items-end gap-x-10 gap-y-5">
          <div>
            <p className="text-eyebrow font-semibold uppercase text-cream/70">Dates</p>
            <p className="mt-2 font-display text-2xl text-cream">{trip.dates}</p>
          </div>
          <div>
            <p className="text-eyebrow font-semibold uppercase text-cream/70">Price</p>
            <p className="mt-2 font-display text-2xl text-cream">
              {trip.price} <span className="font-dnye text-sm font-medium text-cream/75">{trip.priceSuffix}</span>
            </p>
          </div>
        </div>

        <ContactButtons placement="hero" className="mt-9" />

        <p className="mt-6 text-sm text-cream/75">
          {trip.flights} · {trip.deadlineLabel}
        </p>
      </motion.div>

      {/* Scroll cue */}
      <a
        href="#promise"
        aria-label="Scroll to the trip overview"
        className="absolute bottom-6 right-6 z-10 hidden h-12 w-12 items-center justify-center rounded-full border border-cream/25 text-cream/80 transition-colors hover:border-champagne hover:text-champagne md:flex"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 motion-safe:animate-bounce" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M12 5v14M6 13l6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}
