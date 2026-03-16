const services = [
  {
    name: "Airport Transfers",
    description: "Punctual pickups and drops to Kempegowda International Airport and beyond. Track your flight, meet your driver.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
      </svg>
    ),
  },
  {
    name: "Outstation Trips",
    description: "Comfortable long-distance travel across Karnataka, Tamil Nadu, Kerala, Andhra Pradesh, and Goa with experienced drivers.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
        <path d="M15 18H9" />
        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </svg>
    ),
  },
  {
    name: "Pilgrimage Tours",
    description: "Curated spiritual journeys to Tirupati, Mantralayam, Dharmasthala, Gokarna, and other sacred destinations with full packages.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: "Enterprise Transport",
    description: "Dedicated fleet for corporate clients with monthly billing, employee transport, event logistics, and guest transfers.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
  },
];

export default function ServicesGrid() {
  return (
    <section className="bg-[var(--gt-cream)] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--gt-red)] font-semibold">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--gt-navy)]" style={{ fontFamily: "var(--font-playfair)" }}>
            Comprehensive travel solutions for every need
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.name}
              className="group bg-white p-8 border border-[var(--gt-border)] hover:bg-[var(--gt-navy)] transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--gt-red)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              <div className="w-12 h-12 flex items-center justify-center border border-[var(--gt-border)] group-hover:border-white/20 text-[var(--gt-navy)] group-hover:text-white mb-6 transition-colors">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-[var(--gt-navy)] group-hover:text-white mb-3 transition-colors" style={{ fontFamily: "var(--font-playfair)" }}>
                {service.name}
              </h3>
              <p className="text-sm text-[var(--gt-muted)] group-hover:text-white/60 transition-colors leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
