import Link from "next/link";
import SectionHead from "./SectionHead";

/**
 * Golden Experiences — the curated one-off projects.
 *
 * Only enabled projects appear. `south-africa-season-2` is intentionally
 * excluded here (it is disabled in /projects too); the page itself is
 * untouched and still reachable directly.
 */
const experiences = [
  {
    slug: "the-shiva-day",
    index: "Project 01",
    title: "The Shiva Day",
    places: "Lepakshi · Isha Foundation · Adiyogi Light Show",
    tagline:
      "Where Shiva dwells in stillness, and wakes in light. A day that moves through 500 years in 14 hours.",
    meta: [
      { label: "Departs", value: "7:00 AM" },
      { label: "Returns", value: "9:30 PM" },
      { label: "Distance", value: "~300 km" },
    ],
  },
];

export default function ExperiencesBlock() {
  return (
    <section className="py-20 lg:py-28 border-b border-[var(--gt-border)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionHead
          index="03"
          eyebrow="Golden Experiences"
          title={
            <>
              Curated days,
              <br className="hidden sm:block" /> designed by us
            </>
          }
          lede="Not tour packages — single days built around places, rituals and light."
        />

        <div className="mt-14 lg:mt-16">
          {experiences.map((x) => (
            <Link key={x.slug} href={`/projects/${x.slug}`} className="group block">
              <div className="border-t border-[var(--gt-border)] pt-10 grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-8">
                <div className="lg:col-span-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--gt-red)]/60 whitespace-nowrap">
                    {x.index}
                  </span>
                </div>

                <div className="lg:col-span-7">
                  <h3
                    className="text-[clamp(2rem,5vw,3.25rem)] leading-[1.02] tracking-[-0.02em] italic text-[var(--gt-navy)] group-hover:text-[var(--gt-red)] transition-colors duration-500"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {x.title}
                  </h3>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-[var(--gt-muted)]">
                    {x.places}
                  </p>
                  <p className="mt-6 text-[15px] leading-[1.75] text-[var(--gt-muted)] max-w-lg">
                    {x.tagline}
                  </p>
                </div>

                <div className="lg:col-span-4 flex flex-col justify-between">
                  <dl className="flex flex-wrap gap-x-10 gap-y-5">
                    {x.meta.map((m) => (
                      <div key={m.label}>
                        <dt className="text-[10px] uppercase tracking-[0.2em] text-[var(--gt-muted)]/70 mb-1.5">
                          {m.label}
                        </dt>
                        <dd
                          className="text-base text-[var(--gt-navy)]"
                          style={{ fontFamily: "var(--font-playfair)" }}
                        >
                          {m.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <span className="mt-8 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-[var(--gt-navy)]">
                    View experience
                    <span className="w-8 h-px bg-[var(--gt-navy)] group-hover:w-12 group-hover:bg-[var(--gt-red)] transition-all duration-300" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--gt-border)]">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-[var(--gt-muted)] hover:text-[var(--gt-navy)] transition-colors"
          >
            Explore all projects
            <span className="w-8 h-px bg-current group-hover:w-12 transition-all duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
