import { waLink } from "@/lib/wa";

/**
 * The single dark anchor on the page. Everything above is white or cream, so
 * this block closes the composition — red stays an accent rather than a slab.
 */
export default function ClosingCta() {
  return (
    <section className="bg-[var(--gt-navy)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 gap-x-12 items-start">
          <div className="lg:col-span-1 lg:pt-px">
            <span
              className="block text-[13px] text-[var(--gt-red)]/70 tabular-nums"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              05
            </span>
          </div>

          <div className="lg:col-span-7">
            <span className="block text-[10px] uppercase tracking-[0.28em] text-white/40 mb-6">
              Get in touch
            </span>
            <h2
              className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.03] tracking-[-0.025em] text-white"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Ready to travel
              <br />
              the <span className="italic text-[var(--gt-red)]">Golden</span> way?
            </h2>
            <p className="mt-6 text-sm leading-[1.75] text-white/50 max-w-md">
              Tell us where you are going. We will put together the vehicle, the
              driver and the route.
            </p>
          </div>

          <div className="lg:col-span-4 lg:self-end flex flex-col gap-3">
            <a
              href={waLink(
                "Hi, I would like to enquire about your travel services."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 border border-white/15 hover:border-[var(--gt-red)] px-6 py-5 transition-colors duration-300"
            >
              <span className="text-[11px] uppercase tracking-[0.16em] text-white">
                WhatsApp us
              </span>
              <span className="w-8 h-px bg-white/40 group-hover:w-12 group-hover:bg-[var(--gt-red)] transition-all duration-300" />
            </a>

            <a
              href="tel:+919902933877"
              className="group flex items-center justify-between gap-4 border border-white/15 hover:border-[var(--gt-red)] px-6 py-5 transition-colors duration-300"
            >
              <span className="text-[11px] uppercase tracking-[0.16em] text-white tabular-nums">
                +91 99029 33877
              </span>
              <span className="w-8 h-px bg-white/40 group-hover:w-12 group-hover:bg-[var(--gt-red)] transition-all duration-300" />
            </a>

            <a
              href="mailto:naveeth@goldentravels.co"
              className="group flex items-center justify-between gap-4 border border-white/15 hover:border-[var(--gt-red)] px-6 py-5 transition-colors duration-300"
            >
              <span className="text-[11px] uppercase tracking-[0.16em] text-white">
                Email us
              </span>
              <span className="w-8 h-px bg-white/40 group-hover:w-12 group-hover:bg-[var(--gt-red)] transition-all duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
