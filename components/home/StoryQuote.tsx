import Link from "next/link";
import Image from "next/image";
import SectionHead from "./SectionHead";

const clients = [
  {
    name: "Brigade Group",
    logo: "https://qgifuuzvgbofgyasgwdp.supabase.co/storage/v1/object/public/Media/Clients/Brigade_Group.jpg",
  },
  {
    name: "Holla Group",
    logo: "https://qgifuuzvgbofgyasgwdp.supabase.co/storage/v1/object/public/Media/Clients/Holla-New-Logo-2022-removebg-preview.png",
  },
  {
    name: "New Mangalore Port Trust",
    logo: "https://qgifuuzvgbofgyasgwdp.supabase.co/storage/v1/object/public/Media/Clients/NMPT.png",
  },
  {
    name: "TUV SUD",
    logo: "https://qgifuuzvgbofgyasgwdp.supabase.co/storage/v1/object/public/Media/Clients/tuv-removebg-preview.png",
  },
  {
    name: "Vizag Steel",
    logo: "https://qgifuuzvgbofgyasgwdp.supabase.co/storage/v1/object/public/Media/Clients/VIZAG-STEEL.jpg",
  },
];

export default function StoryQuote() {
  return (
    <section className="py-20 lg:py-28 border-b border-[var(--gt-border)] bg-[var(--gt-cream)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionHead
          index="01"
          eyebrow="Our story"
          title={
            <>
              Three decades of
              <br className="hidden sm:block" /> trusted journeys
            </>
          }
        />

        <div className="mt-14 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-y-12 gap-x-12">
          {/* Archival photograph */}
          <figure className="lg:col-span-6">
            <div className="relative aspect-[16/9] lg:aspect-[4/3] overflow-hidden bg-[var(--gt-border)]">
              <Image
                src="https://qgifuuzvgbofgyasgwdp.supabase.co/storage/v1/object/public/Media/About_US_section.jpeg"
                alt="The Golden Travels office and fleet, Rajajinagar, Bengaluru"
                fill
                sizes="(max-width: 1024px) 100vw, 48vw"
                loading="lazy"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[var(--gt-muted)]">
              <span className="w-8 h-px bg-[var(--gt-red)]" />
              Rajajinagar, Bengaluru — the original yard
            </figcaption>
          </figure>

          {/* Story + pull quote */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p className="text-[15px] leading-[1.8] text-[var(--gt-muted)]">
                Founded in 1987 by{" "}
                <span className="text-[var(--gt-navy)]">Mr Lakshmana K Amin</span>,
                Golden Travels grew from a single-vehicle operation into one of
                Bengaluru&apos;s most respected travel companies. For over three
                decades we have served thousands of families, corporates and
                institutions with an unwavering commitment to safety and comfort.
              </p>

              <Link
                href="/about"
                className="group inline-flex items-center gap-3 mt-8 text-[11px] uppercase tracking-[0.16em] text-[var(--gt-navy)]"
              >
                Read our story
                <span className="w-8 h-px bg-[var(--gt-navy)] group-hover:w-12 group-hover:bg-[var(--gt-red)] transition-all duration-300" />
              </Link>
            </div>

            <blockquote className="mt-12 pt-10 border-t border-[var(--gt-border)]">
              <p
                className="text-[clamp(1.15rem,2.4vw,1.6rem)] leading-[1.45] italic text-[var(--gt-navy)]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                &ldquo;Golden Travels has been our trusted transport partner for
                over a decade. Their reliability and professionalism are
                unmatched in the industry.&rdquo;
              </p>
              <footer className="mt-6 flex items-center gap-3">
                <span className="w-8 h-px bg-[var(--gt-red)]" />
                <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--gt-muted)]">
                  Operations Head, TUV SUD
                </span>
              </footer>
            </blockquote>
          </div>
        </div>

        {/* Trusted by — logos kept from the old ClientLogos section */}
        <div className="mt-20 pt-10 border-t border-[var(--gt-border)] text-center">
          <span className="block text-[10px] uppercase tracking-[0.28em] text-[var(--gt-muted)] mb-10">
            Trusted by
          </span>
          <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-10 lg:gap-x-20">
            {clients.map((c) => (
              <li key={c.name} className="relative h-14 w-32 lg:h-16 lg:w-36">
                <Image
                  src={c.logo}
                  alt={c.name}
                  fill
                  sizes="144px"
                  loading="lazy"
                  className="object-contain object-center opacity-75 hover:opacity-100 transition-opacity duration-500"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
