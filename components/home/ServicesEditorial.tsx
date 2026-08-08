import Link from "next/link";
import SectionHead from "./SectionHead";

const services = [
  {
    number: "01",
    name: "Airport Transfers",
    description:
      "Punctual pickups and drops to Kempegowda International Airport and beyond. We track your flight; your driver is waiting.",
  },
  {
    number: "02",
    name: "Outstation Trips",
    description:
      "Long-distance travel across Karnataka, Tamil Nadu, Kerala, Andhra Pradesh and Goa with drivers who know the routes.",
  },
  {
    number: "03",
    name: "Pilgrimage Tours",
    description:
      "Curated journeys to Tirupati, Mantralayam, Dharmasthala and Gokarna — full packages, handled end to end.",
  },
  {
    number: "04",
    name: "Enterprise Transport",
    description:
      "Dedicated fleet for corporate clients: monthly billing, employee transport, event logistics and guest transfers.",
  },
];

export default function ServicesEditorial() {
  return (
    <section className="py-20 lg:py-28 border-b border-[var(--gt-border)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionHead
          index="02"
          eyebrow="What we offer"
          title={
            <>
              Comprehensive travel
              <br className="hidden sm:block" /> solutions for every need
            </>
          }
          lede="Four core services, each run by the same team, to the same standard, since 1987."
        />

        <div className="mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {services.map((s) => (
            <article key={s.number} className="group">
              {/* Hairline that fills red on hover — the only motion in the section. */}
              <div className="relative h-px bg-[var(--gt-border)] mb-7">
                <div className="absolute inset-0 bg-[var(--gt-red)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              </div>

              <span
                className="block text-[13px] text-[var(--gt-red)]/50 tabular-nums mb-5"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {s.number}
              </span>

              <h3
                className="text-xl leading-snug text-[var(--gt-navy)] mb-3"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {s.name}
              </h3>

              <p className="text-sm leading-[1.7] text-[var(--gt-muted)]">
                {s.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16 lg:mt-20">
          <Link
            href="/packages"
            className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-[var(--gt-navy)]"
          >
            View all packages
            <span className="w-8 h-px bg-[var(--gt-navy)] group-hover:w-12 group-hover:bg-[var(--gt-red)] transition-all duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
