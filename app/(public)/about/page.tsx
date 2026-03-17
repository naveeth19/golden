import type { Metadata } from "next";
import Image from "next/image";
import ClientLogos from "@/components/sections/ClientLogos";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Golden Travels — founded in 1987 by Mr Lakshmana K Amin. Over three decades of premium road travel services across South India from Bengaluru.",
};

const milestones = [
  { year: "1987", title: "Founded", desc: "Golden Travels established by Mr Lakshmana K Amin in Bengaluru." },
  { year: "1995", title: "Fleet Expansion", desc: "Expanded to 5 vehicles serving corporate clients." },
  { year: "2005", title: "Pilgrimage Division", desc: "Launched dedicated pilgrimage tour packages." },
  { year: "2012", title: "Corporate Partnerships", desc: "Partnered with TUV SUD and Brigade Group." },
  { year: "2018", title: "Digital Transformation", desc: "Online booking and fleet management system." },
  { year: "2024", title: "13+ Vehicle Fleet", desc: "Premium fleet serving 500+ clients across South India." },
];

const reasons = [
  { title: "37+ Years Experience", desc: "Trusted by families and corporates since 1987." },
  { title: "Professional Drivers", desc: "Experienced, courteous drivers with route expertise." },
  { title: "Well-Maintained Fleet", desc: "Regularly serviced vehicles for safe travel." },
  { title: "Transparent Pricing", desc: "No hidden charges. Clear and fair pricing." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[var(--gt-navy)] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--gt-red)] font-semibold block mb-3">
            Our Story
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            About Golden Travels
          </h1>
          <p className="text-white/50 text-sm mt-3 max-w-lg mx-auto">
            Three decades of trusted journeys across South India.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--gt-red)] font-semibold block mb-4">
                Since 1987
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold text-[var(--gt-navy)] leading-tight mb-6"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                A legacy of trust on every road
              </h2>
              <p className="text-[var(--gt-muted)] text-sm leading-relaxed mb-4">
                Golden Travels was founded in 1987 by Mr Lakshmana K Amin with a simple vision: to provide 
                safe, comfortable, and reliable road travel services to the people of Bengaluru. What started 
                as a single-vehicle operation has grown into one of the city&apos;s most respected travel companies.
              </p>
              <p className="text-[var(--gt-muted)] text-sm leading-relaxed mb-4">
                Over the past three decades, we have served thousands of families, corporate clients, and 
                institutions. Our fleet has grown to 13+ premium vehicles, and our team of experienced drivers 
                ensures that every journey is a journey you can trust.
              </p>
              <p className="text-[var(--gt-muted)] text-sm leading-relaxed">
                Based in Rajajinagar, Bengaluru, we offer outstation rentals, airport transfers, pilgrimage 
                tours, corporate transport, and event management services across Karnataka, Tamil Nadu, 
                Kerala, Andhra Pradesh, and Goa.
              </p>
            </div>
            <div className="relative h-[400px] overflow-hidden">
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

      {/* Founder */}
      <section className="py-20 bg-[var(--gt-cream)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="w-[300px] h-[350px] bg-[var(--gt-navy)] flex flex-col items-center justify-end relative">
                <span
                  className="text-[80px] font-bold text-white/[0.03] select-none absolute top-8"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  LKA
                </span>
                <div className="pb-6 text-center relative z-10">
                  <p className="text-white text-sm font-semibold">Mr Lakshmana K Amin</p>
                  <span className="inline-block bg-[var(--gt-red)] text-white text-[10px] uppercase tracking-wider font-semibold px-3 py-1 mt-2">
                    Founder
                  </span>
                </div>
              </div>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--gt-red)] font-semibold block mb-4">
                Our Founder
              </span>
              <h2
                className="text-3xl md:text-4xl font-bold text-[var(--gt-navy)] leading-tight mb-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Mr Lakshmana K Amin
              </h2>
              <p className="text-sm text-[var(--gt-muted)] mb-6">
                Established Golden Travels · 1987
              </p>
              <p className="text-[var(--gt-muted)] text-sm leading-relaxed mb-4">
                With a deep passion for service and a keen understanding of the travel needs of Bengaluru&apos;s 
                growing population, Mr Lakshmana K Amin founded Golden Travels in 1987. His vision was to 
                create a travel company that prioritised safety, comfort, and reliability above all else.
              </p>
              <p className="text-[var(--gt-muted)] text-sm leading-relaxed mb-4">
                Under his leadership, Golden Travels grew from a humble beginning into a trusted name in 
                the travel industry. His hands-on approach and personal attention to customer satisfaction 
                set the standard that the company continues to uphold today.
              </p>
              <p className="text-[var(--gt-muted)] text-sm leading-relaxed">
                Mr Amin&apos;s legacy lives on in every journey that Golden Travels undertakes, with the same 
                values of integrity, professionalism, and care that he instilled from the very first day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--gt-red)] font-semibold block mb-3">
              Our Journey
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-[var(--gt-navy)]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Key Milestones
            </h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[1px] bg-[var(--gt-border)]" />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {milestones.map((m) => (
                <div key={m.year} className="relative text-center">
                  <div className="hidden md:block w-3 h-3 bg-[var(--gt-red)] mx-auto mb-4 relative z-10" />
                  <span
                    className="text-2xl font-bold text-[var(--gt-red)] block mb-2"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {m.year}
                  </span>
                  <h3 className="text-sm font-semibold text-[var(--gt-navy)] mb-1">{m.title}</h3>
                  <p className="text-xs text-[var(--gt-muted)]">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 bg-[var(--gt-cream)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[var(--gt-red)] font-semibold block mb-3">
              Why Choose Us
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-[var(--gt-navy)]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              The Golden difference
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((r, i) => (
              <div key={i} className="bg-white border border-[var(--gt-border)] p-6 text-center">
                <span
                  className="text-4xl font-bold text-[var(--gt-cream)] block mb-4"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  0{i + 1}
                </span>
                <h3 className="text-base font-bold text-[var(--gt-navy)] mb-2">{r.title}</h3>
                <p className="text-sm text-[var(--gt-muted)]">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClientLogos />
    </>
  );
}
