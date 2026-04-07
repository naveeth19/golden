import Link from "next/link";
import Image from "next/image";

const services = [
  "Outstation Rentals",
  "Airport Services",
  "City Taxi",
  "Enterprise Transport",
  "Event Management",
];

const stats = [
  { value: "37+", label: "Years" },
  { value: "88+", label: "Vehicles" },
  { value: "500+", label: "Clients" },
  { value: "4.9", label: "Rating" },
];

export default function Hero() {
  return (
    <>
      <section className="min-h-[calc(100vh-60px)] md:min-h-[calc(100vh-72px)] grid grid-cols-1 lg:grid-cols-2">
        {/* Left */}
        <div className="flex flex-col justify-center px-6 md:px-12 lg:px-16 lg:border-r border-[#F0EDE8] py-6 lg:py-0">
          <span className="inline-block text-[11px] uppercase tracking-[0.2em] text-[var(--gt-red)] font-semibold mb-6">
            Premium Road Travel Since 1987
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--gt-navy)] leading-[1.05] mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
            Golden Travels
          </h1>
          <p className="text-2xl md:text-3xl text-[var(--gt-red)] italic mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
            Since 1987.
          </p>
          <p className="text-[var(--gt-muted)] text-base leading-relaxed max-w-lg mb-8">
            Three decades of trusted journeys across South India. From airport transfers to pilgrimages, 
            we deliver premium travel experiences with an unwavering commitment to safety and comfort.
          </p>

          {/* Service Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {services.map((s) => (
              <span
                key={s}
                className="text-xs px-3 py-1.5 border border-[var(--gt-border)] text-[var(--gt-navy)] font-medium md:text-xs lg:text-xs max-[768px]:text-[10px]"
              >
                {s}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/packages"
              className="inline-flex items-center justify-center bg-[var(--gt-red)] text-white text-[11px] uppercase tracking-[0.15em] font-semibold px-8 py-3 hover:bg-[var(--gt-red-dark)] transition-colors"
            >
              Discover Services
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-[var(--gt-navy)] text-[var(--gt-navy)] text-[11px] uppercase tracking-[0.15em] font-semibold px-8 py-3 hover:bg-[var(--gt-navy)] hover:text-white transition-colors"
            >
              Book Now
            </Link>
          </div>
        </div>

        {/* Right — Vehicle image on white background */}
        <div className="relative bg-white flex flex-col items-center justify-center px-8 overflow-hidden lg:px-16 py-6 lg:py-0">
          <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px] flex items-center justify-center lg:h-[500px] max-[768px]:h-[280px]">
            <Image
              src="https://qgifuuzvgbofgyasgwdp.supabase.co/storage/v1/object/public/Media/hero_1.png"
              alt="Golden Travels Fleet Vehicles"
              width={700}
              height={500}
              className="object-contain w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* Full-width stats bar */}
      <div className="bg-[var(--gt-red)] py-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-6 max-w-7xl mx-auto">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-white font-bold text-lg" style={{ fontFamily: "var(--font-playfair)" }}>
                {s.value}
              </div>
              <div className="text-white/70 text-[10px] uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
