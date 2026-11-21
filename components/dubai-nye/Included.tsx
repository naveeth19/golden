import { included } from "./content";
import Reveal from "./Reveal";

export default function Included() {
  return (
    <section id="included" aria-labelledby="inc-title" className="bg-cream text-navy">
      <div className="mx-auto grid max-w-page gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="text-eyebrow font-semibold uppercase text-crimson">Everything included</p>
          <h2 id="inc-title" className="mt-5 font-display text-d-md font-medium">
            One price. <span className="italic text-crimson">All of this.</span>
          </h2>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-navy/80">
            Flights, hotel, transfers, the New Year&rsquo;s Eve cruise and every experience in the itinerary.
          </p>
        </Reveal>
        <ol className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
          {included.map((item, i) => (
            <Reveal as="li" key={item} delay={(i % 2) * 0.06} className="flex gap-5 border-t border-navy/15 py-6">
              <span className="font-display text-2xl leading-none text-crimson">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[15px] leading-relaxed">{item}</span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
