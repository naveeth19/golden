import Link from "next/link";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left */}
          <div className="bg-[var(--gt-navy)] p-10 md:p-16 flex flex-col justify-center">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--gt-red)] font-semibold mb-6">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              Three decades of trusted journeys
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Founded in 1987 by Mr Lakshmana K Amin, Golden Travels has grown from a single-vehicle operation 
              into one of Bengaluru&apos;s most respected travel companies. For over three decades, we have served 
              thousands of families, corporates, and institutions with unwavering commitment to safety and comfort.
            </p>
            <p className="text-white/60 text-sm leading-relaxed mb-8">
              Today, our fleet of 13+ premium vehicles and a team of experienced drivers ensure that every journey 
              with Golden Travels is a journey you can trust.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/about"
                className="inline-flex items-center justify-center bg-[var(--gt-red)] text-white text-[11px] uppercase tracking-[0.15em] font-semibold px-8 py-3 hover:bg-[var(--gt-red-dark)] transition-colors"
              >
                Learn More
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-white/20 text-white text-[11px] uppercase tracking-[0.15em] font-semibold px-8 py-3 hover:bg-white/10 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          {/* Right - Office photo */}
          <div className="relative min-h-[400px] overflow-hidden">
            <Image
              src="https://qgifuuzvgbofgyasgwdp.supabase.co/storage/v1/object/public/Media/About_US_section.jpeg"
              alt="Golden Travels Office"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute bottom-6 right-6 bg-[var(--gt-red)] text-white text-xs font-semibold px-4 py-2 uppercase tracking-wider z-10">
              Est. 1987
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
