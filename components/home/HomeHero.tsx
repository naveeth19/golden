import Link from "next/link";
import Image from "next/image";

const services = [
  "Outstation Rentals",
  "Airport Services",
  "City Taxi",
  "Enterprise Transport",
  "Event Management",
];

const HERO_SRC =
  "https://qgifuuzvgbofgyasgwdp.supabase.co/storage/v1/object/public/Media/hero_1.png";

export default function HomeHero() {
  return (
    <section className="relative border-b border-[var(--gt-border)] overflow-hidden">
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="lg:max-w-[54%] py-16 lg:py-28">
          <span className="gt-rise block text-[10px] uppercase tracking-[0.28em] text-[var(--gt-red)] mb-8">
            Premium Road Travel Since 1987
          </span>

          <h1
            className="gt-rise text-[clamp(3rem,8vw,5.5rem)] leading-[0.9] tracking-[-0.035em] text-[var(--gt-navy)]"
            style={{ fontFamily: "var(--font-playfair)", animationDelay: "0.08s" }}
          >
            Golden
            <br />
            Travels
          </h1>

          <p
            className="gt-rise text-[clamp(1.25rem,2.6vw,1.75rem)] italic text-[var(--gt-red)] mt-3"
            style={{ fontFamily: "var(--font-playfair)", animationDelay: "0.16s" }}
          >
            Since 1987.
          </p>

          <div
            className="gt-wipe h-px bg-[var(--gt-border)] my-9 max-w-md"
            style={{ animationDelay: "0.24s" }}
          />

          <p
            className="gt-rise text-[15px] leading-[1.75] text-[var(--gt-muted)] max-w-md"
            style={{ animationDelay: "0.28s" }}
          >
            Three decades of trusted journeys across South India. From airport
            transfers to pilgrimages, we deliver premium travel with an
            unwavering commitment to safety and comfort.
          </p>

          <div
            className="gt-rise flex flex-wrap gap-x-6 gap-y-2 mt-9 max-w-lg"
            style={{ animationDelay: "0.36s" }}
          >
            {services.map((s) => (
              <span
                key={s}
                className="text-[11px] uppercase tracking-[0.14em] text-[var(--gt-navy)]/55"
              >
                {s}
              </span>
            ))}
          </div>

          <div
            className="gt-rise flex flex-wrap items-center gap-x-8 gap-y-4 mt-11"
            style={{ animationDelay: "0.44s" }}
          >
            <Link
              href="/packages"
              className="inline-flex items-center justify-center bg-[var(--gt-navy)] text-white text-[11px] uppercase tracking-[0.16em] px-9 py-4 hover:bg-[var(--gt-red)] transition-colors duration-300"
            >
              Discover Services
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-[var(--gt-navy)]"
            >
              Book Now
              <span className="w-8 h-px bg-[var(--gt-navy)] group-hover:w-12 group-hover:bg-[var(--gt-red)] transition-all duration-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* A single image, repositioned by CSS: stacked below the copy on
          mobile, bleeding to the right viewport edge from `lg` up. Rendering
          two elements and toggling them with `hidden` would preload both.
          The source PNG has a white matte, so this panel is white — cream
          would show a visible seam around the vehicles. */}
      <div
        className="relative h-[280px] sm:h-[360px] bg-white border-t border-[var(--gt-border)]
                   lg:absolute lg:inset-y-0 lg:right-0 lg:w-[42%] lg:h-auto
                   lg:border-t-0 lg:border-l"
      >
        <Image
          src={HERO_SRC}
          alt="Golden Travels fleet vehicles"
          fill
          sizes="(max-width: 1024px) 100vw, 42vw"
          priority
          className="object-contain object-center p-6 lg:p-10 xl:p-14"
        />
        <span className="hidden lg:block absolute bottom-7 right-8 text-[10px] uppercase tracking-[0.24em] text-[var(--gt-muted)]">
          The Fleet
        </span>
      </div>
    </section>
  );
}
