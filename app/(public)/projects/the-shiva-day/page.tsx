"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

// ─── Types ────────────────────────────────────────────────────────────────────

interface GalleryImage {
  id: string;
  storage_path: string;
  caption: string | null;
  display_order: number;
}

interface Vehicle {
  id: string;
  name: string;
  variant: string;
  maxPax: number;
  price: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

// Static gallery — images hosted in Media/Project_Shiva bucket
const STATIC_GALLERY: GalleryImage[] = [
  { id: "s1", storage_path: "", caption: "Adiyogi — the first yogi, rendered in light",    display_order: 1,
    // full URL override
  },
  { id: "s2", storage_path: "", caption: "Lepakshi — stone corridors of the Vijayanagara empire", display_order: 2 },
  { id: "s3", storage_path: "", caption: "Veerabhadra Temple, Lepakshi",                   display_order: 3 },
  { id: "s4", storage_path: "", caption: "Adiyogi — 112 feet of steel and stillness",      display_order: 4 },
];

const STATIC_GALLERY_URLS: Record<string, string> = {
  s1: "https://qgifuuzvgbofgyasgwdp.supabase.co/storage/v1/object/public/Media/Project_Shiva/adi_yogi_1.png",
  s2: "https://qgifuuzvgbofgyasgwdp.supabase.co/storage/v1/object/public/Media/Project_Shiva/Lepakshi_2.png",
  s3: "https://qgifuuzvgbofgyasgwdp.supabase.co/storage/v1/object/public/Media/Project_Shiva/Lepakshi_Temple.png",
  s4: "https://qgifuuzvgbofgyasgwdp.supabase.co/storage/v1/object/public/Media/Project_Shiva/Adi_Yogi_2.png",
};

const VEHICLES: Vehicle[] = [
  { id: "sedan",           name: "Sedan",                        variant: "Dzire / Etios / Swift AC",       maxPax: 4,  price: 6000  },
  { id: "crysta",          name: "Innova Crysta",                variant: "Premium MPV",                    maxPax: 6,  price: 8000  },
  { id: "hycross",         name: "Innova Hycross",               variant: "Hybrid Premium MPV",             maxPax: 6,  price: 9500  },
  { id: "tt-normal",       name: "Tempo Traveller",              variant: "Normal AC",                      maxPax: 13, price: 8700  },
  { id: "tt-semi",         name: "Tempo Traveller",              variant: "Semi Luxury AC",                 maxPax: 13, price: 11000 },
  { id: "tt-luxury",       name: "Tempo Traveller",              variant: "Luxury AC",                      maxPax: 13, price: 15000 },
  { id: "urbania-semi-10", name: "Urbania",                      variant: "Semi Luxury · 5–10 seats",       maxPax: 10, price: 16000 },
  { id: "urbania-semi-16", name: "Urbania",                      variant: "Semi Luxury · 11–16 seats",      maxPax: 16, price: 17000 },
  { id: "urbania-lux-8",   name: "Urbania",                      variant: "Luxury · 5–8 seats",             maxPax: 8,  price: 16000 },
  { id: "urbania-lux-12",  name: "Urbania",                      variant: "Luxury · 9–12 seats",            maxPax: 12, price: 19500 },
  { id: "bmw-merc",        name: "BMW 5 Series / Mercedes E-Class", variant: "Premium Sedan",               maxPax: 4,  price: 33000 },
  { id: "s-class",         name: "Mercedes S-Class",             variant: "Luxury Sedan",                   maxPax: 4,  price: 36000 },
  { id: "vellfire",        name: "Toyota Vellfire",              variant: "Ultra Luxury MPV",               maxPax: 5,  price: 85000 },
];

const TIMELINE_STOPS = [
  { num: "01", time: "7:00 AM",  place: "Bangalore",                     desc: "Your driver arrives at your doorstep. The city is still asleep.", climax: false },
  { num: "02", time: "7:45 AM",  place: "Nandi Upachar, Devanahalli",    desc: "Breakfast on the highway. South Indian, pure vegetarian. The journey begins.", climax: false },
  { num: "03", time: "10:30 AM", place: "Lepakshi, Andhra Pradesh",      desc: "Step into 500 years of devotion. Stone corridors, painted ceilings, a Nandi carved from a single rock.", climax: false },
  { num: "04", time: "1:15 PM",  place: "Sambaram, Hindupur",            desc: "Lunch 15 km from the temple. Authentic Andhra. A pause before the second act.", climax: false },
  { num: "05", time: "3:30 PM",  place: "Isha Foundation, Chikkaballapur", desc: "The Naga Temple. The Yogeshwara Linga. The stillness of the campus before dusk.", climax: false },
  { num: "06", time: "7:00 PM",  place: "Adiyogi Light Show",            desc: "Fifteen minutes. Lasers, sound, and the first yogi's face lit against the night sky.", climax: true },
  { num: "07", time: "9:30 PM",  place: "Bangalore",                     desc: "Home. Changed.", climax: false, italic: true },
];

// ─── Helper: resolve image URL (static override or project-gallery bucket) ────

function resolveUrl(img: GalleryImage): string {
  if (STATIC_GALLERY_URLS[img.id]) return STATIC_GALLERY_URLS[img.id];
  return `${SUPABASE_URL}/storage/v1/object/public/project-gallery/${img.storage_path}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function BookNowStrip({ text, buttonText, dark = true }: { text: string; buttonText: string; dark?: boolean }) {
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div
      className={`py-10 px-6 flex flex-col sm:flex-row items-center justify-center gap-6 ${
        dark ? "bg-[#080a12]" : "bg-[#edeae6]"
      }`}
    >
      <p className={`text-sm text-center ${dark ? "text-white/50" : "text-[#1E2235]/60"}`}>
        {text}
      </p>
      <button
        onClick={scrollToBooking}
        className={`text-[11px] uppercase tracking-[0.2em] font-semibold px-8 py-3 border transition-colors whitespace-nowrap ${
          dark
            ? "border-[#B8943F] text-[#B8943F] hover:bg-[#B8943F] hover:text-[#080a12]"
            : "border-[#1E2235] text-[#1E2235] hover:bg-[#1E2235] hover:text-white"
        }`}
      >
        {buttonText}
      </button>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function ShivaDayPage() {
  // Gallery
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Calculator
  const [step, setStep] = useState(1);
  const [groupSize, setGroupSize] = useState(2);
  const [date, setDate] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [addons, setAddons] = useState({ dinner: false, yoga: false });

  // Fetch gallery
  useEffect(() => {
    async function loadGallery() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("project_gallery")
          .select("id, storage_path, caption, display_order")
          .eq("project_slug", "the-shiva-day")
          .order("display_order", { ascending: true });
        if (data && data.length > 0) {
          setGalleryImages(data as GalleryImage[]);
        } else {
          setGalleryImages(STATIC_GALLERY);
        }
      } catch {
        setGalleryImages(STATIC_GALLERY);
      }
    }
    loadGallery();
  }, []);

  // Lightbox keyboard navigation
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const prevImage = useCallback(() =>
    setLightboxIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length), [galleryImages.length]);
  const nextImage = useCallback(() =>
    setLightboxIndex((i) => (i + 1) % galleryImages.length), [galleryImages.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, closeLightbox, prevImage, nextImage]);

  // Calculator total
  function calcTotal(): number {
    if (!selectedVehicle) return 0;
    return (
      selectedVehicle.price +
      650 * groupSize +
      2700 +
      2000 +
      (addons.dinner ? 400 * groupSize : 0)
    );
  }

  function sendWhatsApp() {
    const total = calcTotal();
    const addonList = [addons.dinner ? "Dinner" : "", addons.yoga ? "Hatha Yoga at Isha (on request)" : ""]
      .filter(Boolean)
      .join(", ") || "None";
    const msg = encodeURIComponent(
      `Hi Golden Travels, I'd like to book *The Shiva Day* experience.\n\n📅 Date: ${date || "TBD"}\n👥 Group: ${groupSize} people\n🚗 Vehicle: ${selectedVehicle?.name} — ${selectedVehicle?.variant}\n➕ Add-ons: ${addonList}\n💰 Estimated total: ₹${total.toLocaleString("en-IN")}\n\nPlease confirm availability. Thank you.`
    );
    window.open(`https://wa.me/919902933877?text=${msg}`, "_blank");
  }

  // ─── Hero ──────────────────────────────────────────────────────────────────

  const heroWords = "Where Shiva dwells in stillness. And wakes in light.".split(" ");

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="bg-[#0e1020] text-white" style={{ fontFamily: "var(--font-sans)" }}>

      {/* ══════════════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen overflow-hidden bg-black">
        {/* Grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-[1] opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />

        {/* Top-left golden gradient */}
        <div
          className="absolute pointer-events-none z-0"
          style={{
            top: 0,
            left: 0,
            width: "65vw",
            height: "65vw",
            maxWidth: 700,
            maxHeight: 700,
            background: "radial-gradient(ellipse at top left, rgba(184,148,63,0.22) 0%, rgba(184,148,63,0.08) 35%, transparent 70%)",
          }}
        />

        {/* Animated gold shimmer streak — top left */}
        <motion.div
          className="absolute pointer-events-none z-0"
          style={{
            top: -100,
            left: -100,
            width: 600,
            height: 600,
            background: "conic-gradient(from 200deg at 20% 20%, transparent 0deg, rgba(184,148,63,0.07) 30deg, rgba(212,175,80,0.12) 60deg, rgba(184,148,63,0.05) 90deg, transparent 120deg)",
          }}
          animate={{ rotate: [0, 15, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-16 items-center min-h-screen">
          {/* Left: Text */}
          <div className="flex flex-col justify-center">
            <motion.p
              className="text-[11px] uppercase tracking-[0.3em] text-[#B8943F] mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Golden Travels · Project 01
            </motion.p>

            {/* Staggered word reveal */}
            <h1
              className="text-5xl md:text-6xl lg:text-7xl leading-tight mb-6"
              style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
            >
              {heroWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.25em]"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="text-sm uppercase tracking-[0.25em] text-[#B8943F] mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              Lepakshi · Isha Foundation · Adiyogi Light Show
            </motion.p>

            {/* Departure stats */}
            <motion.div
              className="flex flex-wrap gap-6 mb-10 text-sm text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              {["Departs 7:00 AM", "Returns 9:30 PM", "~300 km", "From Bangalore"].map((s, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#B8943F]" />
                  {s}
                </span>
              ))}
            </motion.div>

            <motion.button
              onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
              className="self-start bg-[#C41E3A] text-white text-[11px] uppercase tracking-[0.2em] font-semibold px-8 py-4 hover:bg-[#9B1530] transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              Plan Your Day
            </motion.button>
          </div>

          {/* Right: Video + Thumbnails */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* 16:9 Desktop video */}
            <div className="hidden md:block relative w-full" style={{ aspectRatio: "16/9" }}>
              <video
                autoPlay muted loop playsInline
                src="https://qgifuuzvgbofgyasgwdp.supabase.co/storage/v1/object/public/Media/Project_Shiva/Shiva_Lighshow(16%209).mp4"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* 9:16 Mobile video */}
            <div className="block md:hidden relative w-full max-w-xs mx-auto" style={{ aspectRatio: "9/16" }}>
              <video
                autoPlay muted loop playsInline
                src="https://qgifuuzvgbofgyasgwdp.supabase.co/storage/v1/object/public/Media/Project_Shiva/Shiva_Lightshow(9%2016).mp4"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Desktop thumbnails */}
            <div className="hidden md:grid grid-cols-2 gap-3">
              {[
                { label: "Lepakshi", src: "https://qgifuuzvgbofgyasgwdp.supabase.co/storage/v1/object/public/Media/Project_Shiva/Lepakshi_2.png" },
                { label: "Adiyogi",  src: "https://qgifuuzvgbofgyasgwdp.supabase.co/storage/v1/object/public/Media/Project_Shiva/adi_yogi_1.png" },
              ].map(({ label, src }) => (
                <div key={label} className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  <Image
                    src={src}
                    alt={label}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                  {/* subtle label overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <p className="absolute bottom-2 left-3 text-[10px] uppercase tracking-[0.2em] text-white/50">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/20">Scroll</p>
          <motion.div
            className="w-[1px] h-10 bg-gradient-to-b from-[#B8943F]/60 to-transparent"
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. THE TWO SHRINES
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0b0d1a] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-0 md:gap-0">
            {/* Lepakshi */}
            <motion.div
              className="pr-0 md:pr-16 pb-16 md:pb-0"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#B8943F]/60 mb-4">
                First · 10:30 AM
              </p>
              <h2
                className="text-5xl md:text-6xl text-white mb-8"
                style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
              >
                Lepakshi
              </h2>
              <div className="space-y-4">
                {[
                  "16th century Vijayanagara architecture",
                  "The largest monolithic Nandi in India",
                  "A hanging pillar that defies explanation",
                  "Frescoes painted without fading for 500 years",
                ].map((fact, i) => (
                  <p key={i} className="text-white/60 text-sm leading-relaxed flex gap-3">
                    <span className="text-[#B8943F] shrink-0">—</span>
                    {fact}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Gold divider */}
            <div className="hidden md:block w-[1px] bg-gradient-to-b from-transparent via-[#B8943F]/30 to-transparent" />
            <div className="block md:hidden h-[1px] bg-gradient-to-r from-transparent via-[#B8943F]/30 to-transparent mb-16" />

            {/* Adiyogi */}
            <motion.div
              className="pl-0 md:pl-16"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#B8943F]/60 mb-4">
                Then · 7:00 PM
              </p>
              <h2
                className="text-5xl md:text-6xl text-white mb-8"
                style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
              >
                Adiyogi
              </h2>
              <div className="space-y-4">
                {[
                  "112 feet of steel and absolute stillness",
                  "The world's largest bust sculpture",
                  "A laser light show unlike anything in South India",
                  "The first yogi, rendered in light",
                ].map((fact, i) => (
                  <p key={i} className="text-white/60 text-sm leading-relaxed flex gap-3">
                    <span className="text-[#B8943F] shrink-0">—</span>
                    {fact}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <BookNowStrip
        text="Ready to witness both shrines in one day?"
        buttonText="Book This Day →"
      />

      {/* ══════════════════════════════════════════════════════════════
          3. JOURNEY TIMELINE
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0e1020] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl text-white mb-16 text-center"
            style={{ fontFamily: "var(--font-playfair)" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Hour by hour
          </motion.h2>

          <div className="relative">
            {/* Central vertical line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#B8943F]/20 via-[#B8943F]/40 to-[#B8943F]/20 -translate-x-1/2" />
            {/* Mobile left line */}
            <div className="block md:hidden absolute left-5 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#B8943F]/20 via-[#B8943F]/40 to-[#B8943F]/20" />

            <div className="space-y-0">
              {TIMELINE_STOPS.map((stop, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={stop.num}
                    className={`relative flex md:grid md:grid-cols-2 gap-0 mb-12`}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    {/* Desktop: left side (odd stops) */}
                    <div className={`hidden md:flex ${isLeft ? "justify-end pr-10" : "justify-start pl-10 order-last"}`}>
                      {isLeft && (
                        <div className="text-right max-w-xs">
                          <p className="text-[10px] uppercase tracking-[0.25em] text-[#B8943F]/50 mb-1">{stop.num} · {stop.time}</p>
                          <p className={`text-base font-semibold mb-2 ${stop.climax ? "text-[#B8943F]" : "text-white"}`}
                            style={stop.climax ? { fontFamily: "var(--font-playfair)" } : {}}>
                            {stop.place}
                          </p>
                          <p className={`text-sm text-white/50 leading-relaxed ${stop.italic ? "italic" : ""}`}
                            style={stop.italic ? { fontFamily: "var(--font-playfair)" } : {}}>
                            {stop.desc}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Dot (desktop center / mobile left) */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 items-center justify-center top-1"
                      style={{
                        borderColor: stop.climax ? "#C41E3A" : "#B8943F",
                        backgroundColor: stop.climax ? "#C41E3A" : "#0e1020",
                      }}
                    />

                    {/* Desktop: right side (even stops) */}
                    <div className={`hidden md:flex ${!isLeft ? "justify-start pl-10" : "justify-end pr-10 order-last"}`}>
                      {!isLeft && (
                        <div className="max-w-xs">
                          <p className="text-[10px] uppercase tracking-[0.25em] text-[#B8943F]/50 mb-1">{stop.num} · {stop.time}</p>
                          <p className={`text-base font-semibold mb-2 ${stop.climax ? "text-[#B8943F]" : "text-white"}`}
                            style={stop.climax ? { fontFamily: "var(--font-playfair)" } : {}}>
                            {stop.place}
                          </p>
                          <p className={`text-sm text-white/50 leading-relaxed ${stop.italic ? "italic" : ""}`}
                            style={stop.italic ? { fontFamily: "var(--font-playfair)" } : {}}>
                            {stop.desc}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Mobile layout */}
                    <div className="flex md:hidden gap-6 pl-12 col-span-2">
                      <div
                        className="absolute left-[14px] w-3 h-3 rounded-full border-2 top-1"
                        style={{
                          borderColor: stop.climax ? "#C41E3A" : "#B8943F",
                          backgroundColor: stop.climax ? "#C41E3A" : "#0e1020",
                        }}
                      />
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#B8943F]/50 mb-1">{stop.num} · {stop.time}</p>
                        <p className={`text-sm font-semibold mb-1 ${stop.climax ? "text-[#B8943F]" : "text-white"}`}>
                          {stop.place}
                        </p>
                        <p className={`text-sm text-white/50 leading-relaxed ${stop.italic ? "italic" : ""}`}
                          style={stop.italic ? { fontFamily: "var(--font-playfair)" } : {}}>
                          {stop.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <BookNowStrip text="This day is waiting for you" buttonText="Plan Your Day →" />

      {/* ══════════════════════════════════════════════════════════════
          4. WHAT'S INCLUDED
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#F7F5F2] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl text-[#1E2235] mb-12"
            style={{ fontFamily: "var(--font-playfair)" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            What&apos;s included
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {[
              "Cab pickup & drop from your doorstep",
              "Breakfast at Nandi Upachar, Devanahalli",
              "Lunch at Sambaram, Hindupur",
              "Lepakshi temple guide",
              "Isha Foundation guide",
              "Adiyogi Laser Light Show (7:00 PM)",
            ].map((item, i) => (
              <motion.p
                key={i}
                className="text-[#1E2235]/70 text-sm leading-relaxed flex gap-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <span className="text-[#B8943F] shrink-0 font-semibold">—</span>
                {item}
              </motion.p>
            ))}
          </div>

          {/* Italic note */}
          <motion.div
            className="border-l-2 border-[#B8943F] pl-5 py-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-[#1E2235]/50 text-sm italic" style={{ fontFamily: "var(--font-playfair)" }}>
              Satvik vegetarian food available on campus at Isha Foundation — pay at venue. Temple entry is free.
            </p>
          </motion.div>
        </div>
      </section>
      <BookNowStrip
        text="Everything above is included. No hidden charges."
        buttonText="Book Now →"
        dark={false}
      />

      {/* ══════════════════════════════════════════════════════════════
          5. GALLERY
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0b0d1a] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl text-white mb-12"
            style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            From the road
          </motion.h2>

          {galleryImages.length === 0 ? (
            <div className="flex items-center justify-center h-48 border border-white/10">
              <p className="text-white/20 text-sm uppercase tracking-widest">Gallery coming soon</p>
            </div>
          ) : galleryImages.length <= 4 ? (
            // 4-image editorial layout
            <div className="space-y-3">
              {/* Row 1: large left (60%) + right (40%) */}
              <div className="grid grid-cols-1 md:grid-cols-[60fr_40fr] gap-3">
                <GalleryItem image={galleryImages[0]} index={0} aspectRatio="4/3" onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }} />
                {galleryImages[1] && (
                  <GalleryItem image={galleryImages[1]} index={1} aspectRatio="4/3" onClick={() => { setLightboxIndex(1); setLightboxOpen(true); }} />
                )}
              </div>
              {/* Row 2: left (40%) + large right (60%) — mirror */}
              {galleryImages.length >= 3 && (
                <div className="grid grid-cols-1 md:grid-cols-[40fr_60fr] gap-3">
                  <GalleryItem image={galleryImages[2]} index={2} aspectRatio="4/3" onClick={() => { setLightboxIndex(2); setLightboxOpen(true); }} />
                  {galleryImages[3] && (
                    <GalleryItem image={galleryImages[3]} index={3} aspectRatio="4/3" onClick={() => { setLightboxIndex(3); setLightboxOpen(true); }} />
                  )}
                </div>
              )}
            </div>
          ) : (
            // 9-image full grid
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-[60fr_40fr] gap-3">
                <GalleryItem image={galleryImages[0]} index={0} onClick={() => { setLightboxIndex(0); setLightboxOpen(true); }} />
                <div className="grid grid-rows-2 gap-3">
                  <GalleryItem image={galleryImages[1]} index={1} onClick={() => { setLightboxIndex(1); setLightboxOpen(true); }} />
                  {galleryImages[2] && <GalleryItem image={galleryImages[2]} index={2} onClick={() => { setLightboxIndex(2); setLightboxOpen(true); }} />}
                </div>
              </div>
              {galleryImages.length >= 6 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[3, 4, 5].map((idx) => (
                    <GalleryItem key={idx} image={galleryImages[idx]} index={idx} onClick={() => { setLightboxIndex(idx); setLightboxOpen(true); }} />
                  ))}
                </div>
              )}
              {galleryImages.length >= 9 && (
                <div className="grid grid-cols-1 md:grid-cols-[40fr_60fr] gap-3">
                  <div className="grid grid-rows-2 gap-3">
                    <GalleryItem image={galleryImages[6]} index={6} onClick={() => { setLightboxIndex(6); setLightboxOpen(true); }} />
                    <GalleryItem image={galleryImages[7]} index={7} onClick={() => { setLightboxIndex(7); setLightboxOpen(true); }} />
                  </div>
                  <GalleryItem image={galleryImages[8]} index={8} onClick={() => { setLightboxIndex(8); setLightboxOpen(true); }} />
                </div>
              )}
              {galleryImages.slice(9).length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {galleryImages.slice(9).map((img, i) => (
                    <GalleryItem key={img.id} image={img} index={9 + i} onClick={() => { setLightboxIndex(9 + i); setLightboxOpen(true); }} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && galleryImages[lightboxIndex] && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <div className="relative max-w-5xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={resolveUrl(galleryImages[lightboxIndex])}
                  alt={galleryImages[lightboxIndex].caption ?? "Gallery image"}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              </div>
              {galleryImages[lightboxIndex].caption && (
                <p className="text-center text-white/50 text-sm mt-4 italic" style={{ fontFamily: "var(--font-playfair)" }}>
                  {galleryImages[lightboxIndex].caption}
                </p>
              )}
              {/* Close */}
              <button
                onClick={closeLightbox}
                className="absolute -top-10 right-0 text-white/50 hover:text-white text-2xl"
              >
                ✕
              </button>
              {/* Arrows */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-white/40 hover:text-[#B8943F] text-3xl transition-colors"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-white/40 hover:text-[#B8943F] text-3xl transition-colors"
                  >
                    →
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BookNowStrip text="Seen enough? Let's make it happen." buttonText="Book This Day →" />

      {/* ══════════════════════════════════════════════════════════════
          6. ADD-ONS
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0e1020] py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl text-white mb-12"
            style={{ fontFamily: "var(--font-playfair)" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Make it yours
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Dinner",
                desc: "An evening meal after the light show, before the drive home.",
                tag: "Select in calculator",
              },
              {
                title: "Hatha Yoga at Isha",
                desc: "A special session at the Foundation. Timing confirmed by Golden Travels.",
                tag: "On request",
              },
            ].map((addon, i) => (
              <motion.div
                key={i}
                className="border border-white/10 p-8 relative overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Gold bottom border reveal */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B8943F] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <span className="inline-block text-[10px] uppercase tracking-[0.2em] text-[#B8943F]/60 bg-[#B8943F]/10 px-3 py-1 mb-5">
                  {addon.tag}
                </span>
                <h3
                  className="text-xl text-white mb-3"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {addon.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{addon.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <BookNowStrip text="Choose your add-ons in the next step" buttonText="Open Calculator →" />

      {/* ══════════════════════════════════════════════════════════════
          7. BOOKING CALCULATOR
      ══════════════════════════════════════════════════════════════ */}
      <section id="booking" className="bg-[#080a12] py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-[#B8943F] mb-4">The Shiva Day</p>
            <h2
              className="text-3xl md:text-4xl text-white mb-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Plan your day
            </h2>
            <p className="text-white/40 text-sm mb-12">
              Select your group, choose your vehicle, add your preferences. Price revealed at the end.
            </p>

            {/* Step indicator */}
            <div className="flex items-center gap-0 mb-14">
              {[1, 2, 3, 4].map((s, i) => (
                <div key={s} className="flex items-center">
                  <div
                    className={`w-8 h-8 flex items-center justify-center text-xs font-semibold border transition-colors ${
                      step === s
                        ? "border-[#B8943F] text-[#B8943F] bg-[#B8943F]/10"
                        : step > s
                        ? "border-[#B8943F]/40 text-[#B8943F]/40 bg-transparent"
                        : "border-white/10 text-white/20"
                    }`}
                  >
                    {s}
                  </div>
                  {i < 3 && <div className={`w-12 h-[1px] ${step > s ? "bg-[#B8943F]/40" : "bg-white/10"}`} />}
                </div>
              ))}
              <div className="ml-4 text-xs text-white/30 uppercase tracking-widest">
                {["Group & Date", "Vehicle", "Add-ons", "Summary"][step - 1]}
              </div>
            </div>

            {/* Step 1: Group & Date */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                <div className="mb-10">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-6">Group Size</p>
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => setGroupSize((g) => Math.max(1, g - 1))}
                      className="w-12 h-12 border border-white/20 text-white/60 hover:border-[#B8943F] hover:text-[#B8943F] transition-colors text-xl"
                    >
                      −
                    </button>
                    <span
                      className="text-7xl text-white w-20 text-center"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {groupSize}
                    </span>
                    <button
                      onClick={() => setGroupSize((g) => Math.min(16, g + 1))}
                      className="w-12 h-12 border border-white/20 text-white/60 hover:border-[#B8943F] hover:text-[#B8943F] transition-colors text-xl"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-white/20 text-xs mt-3">people travelling</p>
                </div>
                <div className="mb-10">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4">Date</p>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-transparent border border-white/20 text-white text-sm px-4 py-3 w-full max-w-xs focus:outline-none focus:border-[#B8943F] transition-colors"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="bg-[#B8943F] text-[#080a12] text-[11px] uppercase tracking-[0.2em] font-semibold px-10 py-4 hover:bg-[#a07d33] transition-colors"
                >
                  Next: Choose Vehicle →
                </button>
              </motion.div>
            )}

            {/* Step 2: Vehicle */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-6">
                  Select a vehicle — {groupSize} {groupSize === 1 ? "person" : "people"}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-h-[480px] overflow-y-auto pr-1">
                  {VEHICLES.map((v) => {
                    const available = v.maxPax >= groupSize;
                    const selected = selectedVehicle?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => available && setSelectedVehicle(v)}
                        disabled={!available}
                        className={`text-left p-5 border transition-all ${
                          selected
                            ? "border-[#B8943F] bg-[#B8943F]/10"
                            : available
                            ? "border-white/10 hover:border-[#B8943F]/40"
                            : "border-white/5 opacity-30 cursor-not-allowed"
                        }`}
                      >
                        <p className={`text-sm font-semibold mb-1 ${selected ? "text-[#B8943F]" : "text-white"}`}>
                          {v.name}
                        </p>
                        <p className="text-white/40 text-xs mb-2">{v.variant}</p>
                        <p className="text-[10px] uppercase tracking-widest text-white/20">
                          Up to {v.maxPax} pax
                        </p>
                        {!available && (
                          <p className="text-[10px] uppercase tracking-widest text-white/20 mt-1">
                            Too small for your group
                          </p>
                        )}
                      </button>
                    );
                  })}
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="border border-white/20 text-white/50 text-[11px] uppercase tracking-[0.2em] px-6 py-3 hover:border-white/40 hover:text-white transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => selectedVehicle && setStep(3)}
                    disabled={!selectedVehicle}
                    className="bg-[#B8943F] text-[#080a12] text-[11px] uppercase tracking-[0.2em] font-semibold px-10 py-3 hover:bg-[#a07d33] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Next: Add-ons →
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Add-ons */}
            {step === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-8">Optional add-ons</p>
                <div className="space-y-4 mb-10">
                  {/* Dinner toggle */}
                  <div
                    className={`flex items-center justify-between p-5 border cursor-pointer transition-all ${
                      addons.dinner ? "border-[#B8943F] bg-[#B8943F]/5" : "border-white/10 hover:border-white/20"
                    }`}
                    onClick={() => setAddons((a) => ({ ...a, dinner: !a.dinner }))}
                  >
                    <div>
                      <p className="text-sm text-white font-semibold">Dinner</p>
                      <p className="text-xs text-white/40">Evening meal after the light show</p>
                    </div>
                    <div
                      className={`w-10 h-5 rounded-full relative transition-colors ${
                        addons.dinner ? "bg-[#B8943F]" : "bg-white/10"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${
                          addons.dinner ? "left-5" : "left-0.5"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Yoga toggle */}
                  <div
                    className={`flex items-center justify-between p-5 border cursor-pointer transition-all ${
                      addons.yoga ? "border-[#B8943F] bg-[#B8943F]/5" : "border-white/10 hover:border-white/20"
                    }`}
                    onClick={() => setAddons((a) => ({ ...a, yoga: !a.yoga }))}
                  >
                    <div>
                      <p className="text-sm text-white font-semibold">
                        Hatha Yoga at Isha
                        <span className="ml-2 text-[10px] uppercase tracking-widest text-[#B8943F]/60 font-normal">
                          On request
                        </span>
                      </p>
                      <p className="text-xs text-white/40">Special session at the Foundation</p>
                    </div>
                    <div
                      className={`w-10 h-5 rounded-full relative transition-colors ${
                        addons.yoga ? "bg-[#B8943F]" : "bg-white/10"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${
                          addons.yoga ? "left-5" : "left-0.5"
                        }`}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="border border-white/20 text-white/50 text-[11px] uppercase tracking-[0.2em] px-6 py-3 hover:border-white/40 hover:text-white transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="bg-[#B8943F] text-[#080a12] text-[11px] uppercase tracking-[0.2em] font-semibold px-10 py-3 hover:bg-[#a07d33] transition-colors"
                  >
                    See Summary →
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Summary */}
            {step === 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                <div className="border border-white/10 p-8 mb-8">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[#B8943F] mb-6">Your booking summary</p>
                  <div className="space-y-4 mb-8">
                    {[
                      { label: "Experience", value: "The Shiva Day" },
                      { label: "Date", value: date || "—" },
                      { label: "Group", value: `${groupSize} ${groupSize === 1 ? "person" : "people"}` },
                      { label: "Vehicle", value: selectedVehicle ? `${selectedVehicle.name} — ${selectedVehicle.variant}` : "—" },
                      {
                        label: "Add-ons",
                        value: [addons.dinner ? "Dinner" : "", addons.yoga ? "Hatha Yoga at Isha" : ""]
                          .filter(Boolean).join(", ") || "None",
                      },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between items-start gap-4">
                        <p className="text-[11px] uppercase tracking-[0.15em] text-white/30">{label}</p>
                        <p className="text-sm text-white/80 text-right">{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="h-[1px] bg-white/10 my-6" />

                  {/* Total — first reveal */}
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.15em] text-white/30 mb-1">Estimated Total</p>
                      <p className="text-xs text-white/20">
                        ≈ ₹{Math.round(calcTotal() / groupSize).toLocaleString("en-IN")} per person
                      </p>
                    </div>
                    <p
                      className="text-4xl text-[#B8943F]"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      ₹{calcTotal().toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 flex-wrap">
                  <button
                    onClick={() => setStep(3)}
                    className="border border-white/20 text-white/50 text-[11px] uppercase tracking-[0.2em] px-6 py-3 hover:border-white/40 hover:text-white transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={sendWhatsApp}
                    className="flex items-center gap-3 bg-[#25D366] text-white text-[11px] uppercase tracking-[0.2em] font-semibold px-8 py-3 hover:bg-[#1fba59] transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Book via WhatsApp
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          8. FOOTER CTA
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-[#1E2235] py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="text-4xl md:text-5xl text-white mb-6"
            style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Every great journey begins before sunrise.
          </motion.h2>
          <motion.p
            className="text-white/40 text-sm mb-10 tracking-wide"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Departing Bangalore 7:00 AM. Back by 9:30 PM.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <button
              onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-[#C41E3A] text-white text-[11px] uppercase tracking-[0.2em] font-semibold px-10 py-4 hover:bg-[#9B1530] transition-colors"
            >
              Plan Your Day
            </button>
            <a
              href="https://wa.me/919902933877"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/30 text-white text-[11px] uppercase tracking-[0.2em] font-semibold px-10 py-4 hover:border-white hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ─── Gallery Item ──────────────────────────────────────────────────────────────

function GalleryItem({
  image,
  index,
  aspectRatio,
  onClick,
}: {
  image: GalleryImage;
  index: number;
  aspectRatio?: string;
  onClick: () => void;
}) {
  return (
    <motion.div
      className="relative overflow-hidden cursor-pointer group"
      style={{ aspectRatio: aspectRatio ?? (index === 0 ? "3/4" : "4/3") }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      onClick={onClick}
    >
      <Image
        src={resolveUrl(image)}
        alt={image.caption ?? `Gallery image ${index + 1}`}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      {/* Gold border on hover */}
      <div className="absolute inset-0 border border-[#B8943F]/0 group-hover:border-[#B8943F]/60 transition-colors duration-300 pointer-events-none" />
    </motion.div>
  );
}
