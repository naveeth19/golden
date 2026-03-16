const clients = ["TUV SUD", "Brigade Group", "Govt. of Karnataka", "New Mangalore Port Authority"];

const reasons = [
  {
    number: "01",
    title: "37+ Years of Trust",
    description: "Serving South India since 1987 with an impeccable safety record and thousands of satisfied clients.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Premium Fleet",
    description: "Well-maintained vehicles from Toyota Innova Crysta to tempo travellers, each equipped for comfort.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Expert Drivers",
    description: "Professional, courteous drivers with extensive route knowledge across Karnataka and beyond.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Transparent Pricing",
    description: "No hidden charges, no surprises. Clear pricing with flexible payment options for every journey.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

export default function WhyUsSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left */}
          <div className="bg-[var(--gt-navy)] p-10 md:p-16 flex flex-col justify-center">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--gt-red)] font-semibold mb-6">
              Trusted By
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8" style={{ fontFamily: "var(--font-playfair)" }}>
              Chosen by leading institutions
            </h2>
            <div className="flex flex-wrap gap-3">
              {clients.map((c) => (
                <span
                  key={c}
                  className="text-xs px-4 py-2 border border-white/20 text-white/70"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((r) => (
              <div key={r.number} className="relative p-6">
                <span className="absolute top-4 right-4 text-5xl font-bold text-[var(--gt-cream)]" style={{ fontFamily: "var(--font-playfair)" }}>
                  {r.number}
                </span>
                <div className="w-10 h-10 flex items-center justify-center text-[var(--gt-red)] mb-4">
                  {r.icon}
                </div>
                <h3 className="text-base font-bold text-[var(--gt-navy)] mb-2">
                  {r.title}
                </h3>
                <p className="text-sm text-[var(--gt-muted)] leading-relaxed">
                  {r.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
