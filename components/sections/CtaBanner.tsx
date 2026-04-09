import { waLink } from "@/lib/wa";

export default function CtaBanner() {
  return (
    <section className="bg-[var(--gt-red)] py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
          Ready to travel the Golden way?
        </h2>
        <p className="text-white/70 text-sm mb-8 max-w-md mx-auto">
          Get in touch with us today for a personalised travel experience across South India.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={waLink("Hi, I would like to enquire about your travel services.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white text-[var(--gt-red)] text-[11px] uppercase tracking-[0.15em] font-semibold px-8 py-3 hover:bg-white/90 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            WhatsApp Us
          </a>
          <a
            href="tel:+919902933877"
            className="inline-flex items-center justify-center gap-2 border border-white text-white text-[11px] uppercase tracking-[0.15em] font-semibold px-8 py-3 hover:bg-white/10 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            +91 99029 33877
          </a>
        </div>
      </div>
    </section>
  );
}
