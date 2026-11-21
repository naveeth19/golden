import { brand, trip } from "./content";

export default function Footer() {
  return (
    <footer className="bg-night-900 pb-28 text-cream md:pb-0">
      <div className="mx-auto max-w-page px-5 py-16 sm:px-8">
        <div className="grid gap-10 border-b border-cream/10 pb-12 md:grid-cols-3">
          <div>
            <p className="font-display text-xl tracking-[0.32em] text-champagne-light">GOLDEN HOLIDAYS</p>
            <p className="mt-2 text-xs uppercase tracking-[0.28em] text-cream/70">by Golden Travels · {brand.since}</p>
          </div>
          <address className="not-italic text-sm leading-relaxed text-cream/80">{brand.address}</address>
          <div className="flex flex-col gap-1 text-sm">
            <a href={brand.phoneHref} className="inline-flex min-h-[44px] items-center text-cream/90 hover:text-champagne-light">
              {brand.phoneDisplay} · Call or WhatsApp
            </a>
            <a href={`https://${brand.website}`} className="inline-flex min-h-[44px] items-center text-cream/90 hover:text-champagne-light">
              {brand.website}
            </a>
          </div>
        </div>
        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-cream/70">{trip.finePrint}</p>
      </div>
    </footer>
  );
}
