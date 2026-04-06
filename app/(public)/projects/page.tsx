import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Golden Experiences",
  description: "Curated one-of-a-kind day experiences designed by Golden Travels. Sacred sites, light shows, and journeys that stay with you.",
};

const projects = [
  {
    slug: "the-shiva-day",
    index: "01",
    title: "The Shiva Day",
    description: "Lepakshi · Isha Foundation · Adiyogi Light Show",
    tagline: "From ancient stone to living light — a day that moves through 500 years in 14 hours.",
    departs: "7:00 AM",
    returns: "9:30 PM",
    distance: "~300 km",
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
          Curated one-of-a-kind days, designed by us. Not tour packages — experiences built around places, rituals, and light.
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
                    {[
                      { label: "Departs", value: project.departs },
                      { label: "Returns", value: project.returns },
                      { label: "Distance", value: project.distance },
                    ].map((stat) => (
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
          </Link>
        ))}
      </div>

      {/* Bottom padding */}
      <div className="h-24" />
    </div>
  );
}
