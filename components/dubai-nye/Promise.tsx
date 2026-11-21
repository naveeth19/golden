import Reveal from "./Reveal";

const facts = [
  { k: "5", u: "nights", d: "at Excelsior Hotel Deira, with daily breakfast" },
  { k: "6", u: "experiences", d: "from Level 124 to the desert camp, all included" },
  { k: "30", u: "kg", d: "check-in baggage on return non-stop flights" },
  { k: "1", u: "midnight", d: "on the water beneath the Burj Khalifa fireworks" },
];

export default function Promise() {
  return (
    <section id="promise" aria-labelledby="promise-title" className="relative bg-cream text-navy">
      <div className="mx-auto max-w-page px-5 py-24 sm:px-8 md:py-32">
        <Reveal>
          <p className="text-eyebrow font-semibold uppercase text-crimson">The promise</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 id="promise-title" className="mt-6 max-w-[20ch] font-display text-d-lg font-medium">
            Six days in Dubai, one midnight you will{" "}
            <span className="italic text-crimson">remember</span>, and not a single thing to plan.
          </h2>
        </Reveal>
        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-navy/15 pt-12 lg:grid-cols-4">
          {facts.map((f, i) => (
            <Reveal key={f.u} delay={0.08 * i}>
              <dt className="flex items-baseline gap-2">
                <span className="font-display text-6xl font-medium leading-none text-navy md:text-7xl">{f.k}</span>
                <span className="text-sm font-semibold uppercase tracking-[0.18em] text-crimson">{f.u}</span>
              </dt>
              <dd className="mt-4 max-w-[22ch] text-[15px] leading-relaxed text-navy/80">{f.d}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
