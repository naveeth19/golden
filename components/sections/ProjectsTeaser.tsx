"use client";

import Link from "next/link";

export default function ProjectsTeaser() {
  return (
    <section className="bg-[#0e1020] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#B8943F] mb-5">
            Curated Experiences
          </p>
          <h2
            className="text-4xl md:text-5xl text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Golden Experiences
          </h2>
          <p className="text-white/50 text-sm">
            Curated one-of-a-kind days, designed by us.
          </p>
        </div>

        {/* Single Project Card */}
        <div className="max-w-2xl mx-auto mb-12">
          <Link href="/projects/the-shiva-day" className="block group">
            <div className="border border-white/10 p-10 hover:border-[#B8943F]/50 transition-all duration-500 relative overflow-hidden">
              {/* subtle background hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#B8943F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#B8943F]/60 mb-4">
                  Project 01
                </p>
                <h3
                  className="text-3xl md:text-4xl text-white mb-3 group-hover:text-[#B8943F] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
                >
                  The Shiva Day
                </h3>
                <p className="text-white/40 text-sm tracking-wide mb-8">
                  Lepakshi · Isha Foundation · Adiyogi Light Show
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] uppercase tracking-[0.2em] text-[#B8943F] font-semibold">
                    View Experience
                  </span>
                  <span className="text-[#B8943F] text-lg group-hover:translate-x-1 transition-transform duration-300 inline-block">
                    →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Footer Link */}
        <div className="text-center">
          <Link
            href="/projects"
            className="text-[11px] uppercase tracking-[0.2em] text-white/30 hover:text-[#B8943F] transition-colors"
          >
            Explore All Projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
