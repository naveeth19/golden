import { faqs } from "./content";
import { PlusIcon } from "./Icons";
import Reveal from "./Reveal";

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-cream text-navy">
      <div className="mx-auto grid max-w-page gap-12 px-5 py-24 sm:px-8 md:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="text-eyebrow font-semibold uppercase text-crimson">Questions</p>
          <h2 id="faq-title" className="mt-5 font-display text-d-md font-medium">Good to know</h2>
        </Reveal>
        <div className="divide-y divide-navy/15 border-y border-navy/15 lg:col-span-8">
          {faqs.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex min-h-[64px] cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-xl font-medium [&::-webkit-details-marker]:hidden sm:text-2xl">
                {f.q}
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-navy/25 transition-transform duration-300 group-open:rotate-45 group-open:border-crimson group-open:text-crimson">
                  <PlusIcon />
                </span>
              </summary>
              <p className="max-w-[62ch] pb-6 text-[15px] leading-relaxed text-navy/80">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
