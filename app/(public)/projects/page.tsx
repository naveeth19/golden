import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Golden Experiences",
  description: "Curated one-of-a-kind experiences designed by Golden Travels. Sacred day journeys, international road trips, and moments that stay with you.",
};

const projects = [
  {
    slug: "the-shiva-day",
    index: "01",
    title: "The Shiva Day",
    description: "Lepakshi · Isha Foundation · Adiyogi Light Show",
    tagline: "Where Shiva dwells in stillness. And wakes in light. A day that moves through 500 years in 14 hours.",
    stats: [
      { label: "Departs", value: "7:00 AM" },
      { label: "Returns", value: "9:30 PM" },
      { label: "Distance", value: "~300 km" },
    ],
    videoSrc: null as string | null,
    status: "available" as const,
    badge: null as string | null,
    collab: null as string | null,
  },
  {
    slug: "south-africa-season-2",
    index: "02",
    title: "South Africa — Season 2",
    description: "International · Safari · Road Trip · 11 Days",
    tagline: "A curated 1,600 km self-drive through South Africa's finest — wine country, Big Five safari, the Garden Route, and Cape Town.",
    stats: [
      { label: "Dates", value: "May 21–31, 2026" },
      { label: "Duration", value: "11 Days" },
      { label: "Distance", value: "1,600 km" },
    ],
    videoSrc: "https://qgifuuzvgbofgyasgwdp.supabase.co/storage/v1/object/public/Media/ert%201%20V.mp4",
    status: "upcoming" as const,
    badge: "Upcoming",
    collab: "Golden Travels × Epic Road Trips",
  },
];

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-[#0e1020]">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-16">
        <p className="text-[11px] uppercase tracking-[0.3em] text-[#B8943F] mb-6">
          Golden Travels
        </p>
        <h1
          className="text-5xl md:text-7xl text-white mb-6"
          style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
        >
          Projects
        </h1>
        <p className="text-white/40 text-base max-w-md leading-relaxed">
          Curated one-of-a-kind experiences, designed by us. Not tour packages — moments built around places, rituals, and light.
        </p>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-[1px] bg-white/10" />
      </div>

      {/* Projects List */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="block group"
          >
            {project.videoSrc ? (
              /* ── Video-backed card (Project #2) ── */
              <div className="py-4 border-b border-white/10 hover:border-[#B8943F]/30 transition-all duration-500">
                <div className="relative overflow-hidden min-h-[420px] md:min-h-[500px] flex items-end">
                  {/* Video background */}
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    src={project.videoSrc}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                  {/* Right-side fade on desktop */}
                  <div className="absolute inset-0 hidden md:block bg-gradient-to-l from-black/60 to-transparent" />

                  {/* Content */}
                  <div className="relative z-10 w-full p-8 md:p-12 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-end">
                    <div>
                      {/* Badges row */}
                      <div className="flex flex-wrap items-center gap-3 mb-5">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#B8943F]/70">
                          {project.index} / Project
                        </p>
                        {project.badge && (
                          <span className="text-[10px] uppercase tracking-[0.2em] text-[#C41E3A] border border-[#C41E3A]/50 px-2 py-0.5">
                            {project.badge}
                          </span>
                        )}
                      </div>

                      {project.collab && (
                        <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-3">
                          {project.collab}
                        </p>
                      )}

                      <h2
                        className="text-4xl md:text-5xl text-white mb-3 group-hover:text-[#B8943F] transition-colors duration-300"
                        style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
                      >
                        {project.title}
                      </h2>
                      <p className="text-white/50 text-sm tracking-widest mb-4">
                        {project.description}
                      </p>
                      <p className="text-white/30 text-sm max-w-lg leading-relaxed mb-6">
                        {project.tagline}
                      </p>

                      {/* Stats */}
                      <div className="flex flex-wrap gap-6">
                        {project.stats.map((stat) => (
                          <div key={stat.label}>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/20 mb-1">
                              {stat.label}
                            </p>
                            <p className="text-sm text-white/60">{stat.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="hidden md:flex items-center gap-3 text-[#B8943F]/60 group-hover:text-[#B8943F] transition-colors duration-300 pb-1">
                      <span className="text-[11px] uppercase tracking-[0.2em] font-semibold whitespace-nowrap">
                        View Project
                      </span>
                      <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">
                        →
                      </span>
                    </div>
                  </div>
                </div>

                {/* Mobile arrow */}
                <div className="flex items-center gap-2 mt-4 md:hidden text-[#B8943F]">
                  <span className="text-[11px] uppercase tracking-[0.2em] font-semibold">
                    View Project →
                  </span>
                </div>
              </div>
            ) : (
              /* ── Text card (Project #1) ── */
              <div className="py-16 border-b border-white/10 hover:border-[#B8943F]/30 transition-all duration-500 relative overflow-hidden">
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#B8943F]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-8 items-center">
                  {/* Index */}
                  <p
                    className="text-5xl text-white/10 group-hover:text-[#B8943F]/20 transition-colors duration-500 font-bold hidden md:block"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {project.index}
                  </p>

                  {/* Content */}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#B8943F]/60 mb-3">
                      {project.index} / Project
                    </p>
                    <h2
                      className="text-4xl md:text-5xl text-white mb-4 group-hover:text-[#B8943F] transition-colors duration-300"
                      style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
                    >
                      {project.title}
                    </h2>
                    <p className="text-white/50 text-sm tracking-widest mb-4">
                      {project.description}
                    </p>
                    <p className="text-white/30 text-sm max-w-lg leading-relaxed">
                      {project.tagline}
                    </p>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-6 mt-6">
                      {project.stats.map((stat) => (
                        <div key={stat.label}>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-white/20 mb-1">
                            {stat.label}
                          </p>
                          <p className="text-sm text-white/50">{stat.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:flex items-center gap-3 text-[#B8943F]/50 group-hover:text-[#B8943F] transition-colors duration-300">
                    <span className="text-[11px] uppercase tracking-[0.2em] font-semibold whitespace-nowrap">
                      View Project
                    </span>
                    <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">
                      →
                    </span>
                  </div>
                </div>

                {/* Mobile arrow */}
                <div className="flex items-center gap-2 mt-6 md:hidden text-[#B8943F]">
                  <span className="text-[11px] uppercase tracking-[0.2em] font-semibold">
                    View Project →
                  </span>
                </div>
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* Bottom padding */}
      <div className="h-24" />
    </div>
  );
}
