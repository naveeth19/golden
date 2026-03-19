"use client";

import { useState } from "react";
import Image from "next/image";
import type { Package } from "@/lib/supabase/types";

const typeColors: Record<string, string> = {
  pilgrimage: "linear-gradient(135deg, #1a0c0e, #3a1020)",
  outstation: "linear-gradient(135deg, #0c1a10, #163a20)",
  airport: "linear-gradient(135deg, #0c0e1a, #151a3a)",
  corporate: "linear-gradient(135deg, #1a1812, #2d2820)",
};

export default function HeroSection({
  pkg,
  heroVideoId,
  heroVideoUrl,
}: {
  pkg: Package;
  heroVideoId: string | null;
  heroVideoUrl: string | null;
}) {
  const [showVideoModal, setShowVideoModal] = useState(false);

  const hasVideo = !!heroVideoId;
  const hasImage = pkg.images && pkg.images.length > 0;

  return (
    <>
      <section className="relative w-full h-[620px] overflow-hidden">
        {/* Background */}
        {hasVideo ? (
          <iframe
            className="absolute inset-0 w-full h-full pointer-events-none"
            src={`https://www.youtube.com/embed/${heroVideoId}?autoplay=1&mute=1&loop=1&playlist=${heroVideoId}&controls=0&showinfo=0&rel=0&modestbranding=1`}
            title="Background video"
            allow="autoplay; encrypted-media"
            style={{ transform: "scale(1.2)" }}
          />
        ) : pkg.cover_image ? (
          <>
            <Image
              src={pkg.cover_image}
              alt={pkg.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/55" />
          </>
        ) : hasImage ? (
          <>
            <Image
              src={pkg.images[0]}
              alt={pkg.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/50" />
          </>
        ) : (
          <div className={`absolute inset-0 ${typeColors[pkg.type] || "bg-[var(--gt-navy)]"}`} />
        )}

        {/* Content */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex items-end pb-12">
          <div className="flex-1">
            <span className="inline-block text-[10px] uppercase tracking-wider text-white/80 font-semibold mb-3 px-3 py-1 border border-white/30">
              {pkg.type}
            </span>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {pkg.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-white/70 text-sm">
              {pkg.duration_days > 0 && (
                <span className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {pkg.duration_days} Days
                </span>
              )}
              {pkg.price_from > 0 && (
                <span className="flex items-center gap-2">
                  From &#8377;{pkg.price_from.toLocaleString("en-IN")}
                </span>
              )}
            </div>
          </div>

          {hasVideo && heroVideoUrl && (
            <button
              onClick={() => setShowVideoModal(true)}
              className="hidden md:inline-flex items-center gap-2 bg-white text-[var(--gt-navy)] text-[11px] uppercase tracking-[0.15em] font-semibold px-5 py-2.5 hover:bg-white/90 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Watch Full Video
            </button>
          )}
        </div>
      </section>

      {/* Video lightbox modal */}
      {showVideoModal && heroVideoId && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
          onClick={() => setShowVideoModal(false)}
        >
          <button
            onClick={() => setShowVideoModal(false)}
            className="absolute top-6 right-6 text-white/80 hover:text-white"
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <div
            className="w-full max-w-4xl"
            style={{ aspectRatio: "16/9" }}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${heroVideoId}?autoplay=1&rel=0`}
              title="Video"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
