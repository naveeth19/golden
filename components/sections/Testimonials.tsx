const testimonials = [
  {
    quote: "Golden Travels has been our trusted transport partner for over a decade. Their reliability and professionalism are unmatched in the industry.",
    author: "Corporate Client",
    role: "Operations Head, TUV SUD",
  },
  {
    quote: "We have used Golden Travels for multiple pilgrimage trips. The drivers are courteous, vehicles are well-maintained, and the service is always on time.",
    author: "Satisfied Customer",
    role: "Family Trip to Tirupati",
  },
  {
    quote: "From airport pickups to outstation trips, Golden Travels delivers consistent quality every single time. Highly recommended for anyone in Bengaluru.",
    author: "Regular Traveller",
    role: "Business Travel",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[var(--gt-navy)] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--gt-red)] font-semibold block mb-3">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "var(--font-playfair)" }}>
            What our clients say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="border border-white/10 p-8">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="16" height="16" viewBox="0 0 24 24" fill="var(--gt-red)" stroke="none">
                    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                  </svg>
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed italic mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="w-8 h-[1px] bg-[var(--gt-red)] mb-4" />
              <p className="text-white text-sm font-semibold">{t.author}</p>
              <p className="text-white/40 text-xs">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
