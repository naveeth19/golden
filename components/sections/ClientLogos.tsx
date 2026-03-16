const clients = [
  { name: "TUV SUD", initials: "TS" },
  { name: "New Mangalore Port Authority", initials: "NM" },
  { name: "Govt. of Karnataka", initials: "GK" },
  { name: "Brigade Group", initials: "BG" },
];

export default function ClientLogos() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--gt-red)] font-semibold">
            Our Clients
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-12">
          {clients.map((c) => (
            <div key={c.name} className="flex flex-col items-center gap-3">
              <div className="w-20 h-20 rounded-full border border-[var(--gt-border)] flex items-center justify-center">
                <span className="text-lg font-bold text-[var(--gt-navy)]" style={{ fontFamily: "var(--font-playfair)" }}>
                  {c.initials}
                </span>
              </div>
              <span className="text-xs text-[var(--gt-muted)] text-center max-w-[120px]">
                {c.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
