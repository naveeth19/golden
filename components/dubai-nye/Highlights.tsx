import Image from "next/image";
import { highlights } from "./content";
import Reveal from "./Reveal";
import TiltCard from "./TiltCard";

export default function Highlights() {
  return (
    <section id="highlights" aria-labelledby="hl-title" className="bg-night-800 text-cream">
      <div className="mx-auto max-w-page px-5 py-24 sm:px-8 md:py-32">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="text-eyebrow font-semibold uppercase text-champagne">All included</p>
            <h2 id="hl-title" className="mt-5 max-w-[16ch] font-display text-d-md font-medium">
              Six highlights, <span className="italic text-champagne-light">one price.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-[15px] leading-relaxed text-cream/75">
              Every experience below is part of the package, with transfers as per the itinerary.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {highlights.map((h, i) => (
            <Reveal as="li" key={h.n} delay={(i % 3) * 0.08} className={h.hero ? "md:col-span-2 lg:row-span-2" : ""}>
              <TiltCard className="group h-full overflow-hidden rounded-card bg-night-700 shadow-deep ring-1 ring-cream/10">
                <div className={`relative overflow-hidden ${h.hero ? "aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[640px]" : "aspect-[4/3]"}`}>
                  <Image
                    src={h.img}
                    alt={h.alt}
                    fill
                    sizes={h.hero ? "(min-width:1024px) 800px, (min-width:768px) 100vw, 100vw" : "(min-width:1024px) 400px, (min-width:768px) 50vw, 100vw"}
                    className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06] motion-reduce:transition-none"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night-900 via-night-900/55 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 [transform:translateZ(40px)] sm:p-7">
                    <span className="font-display text-sm text-champagne">{h.n}</span>
                    <h3 className={`mt-2 font-display font-medium leading-tight text-cream ${h.hero ? "text-3xl sm:text-4xl" : "text-2xl"}`}>{h.title}</h3>
                    <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-cream/85">{h.line}</p>
                  </div>
                  {h.hero && (
                    <span className="absolute left-6 top-6 rounded-pill bg-crimson px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                      The hero night
                    </span>
                  )}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
