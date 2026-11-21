"use client";

import { brand } from "./content";
import { ChatIcon, PhoneIcon } from "./Icons";
import { trackContact } from "./tracking";

type Props = {
  placement: string;
  tone?: "dark" | "light";
  size?: "md" | "lg";
  className?: string;
};

/** Call + WhatsApp pair. Real <a> elements, 48px+ tap targets, conversion tracking. */
export default function ContactButtons({ placement, tone = "dark", size = "lg", className = "" }: Props) {
  const h = size === "lg" ? "min-h-[56px] px-7 text-[15px]" : "min-h-[48px] px-5 text-sm";
  const outline =
    tone === "dark"
      ? "border-champagne/60 text-cream hover:bg-champagne hover:text-night focus-visible:outline-champagne"
      : "border-navy/30 text-navy hover:bg-navy hover:text-cream focus-visible:outline-navy";
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <a
        href={brand.whatsappHref}
        target="_blank"
        rel="noopener"
        onClick={() => trackContact("whatsapp", placement)}
        className={`group relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap overflow-hidden rounded-pill bg-crimson font-semibold tracking-wide text-white shadow-[0_14px_40px_-14px_rgba(196,30,58,.8)] transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-crimson-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-crimson-light ${h}`}
      >
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,.28)_50%,transparent_70%)] transition-transform duration-700 group-hover:translate-x-full motion-reduce:hidden" />
        <ChatIcon />
        WhatsApp us
      </a>
      <a
        href={brand.phoneHref}
        onClick={() => trackContact("call", placement)}
        className={`inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-pill border font-semibold tracking-wide transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${outline} ${h}`}
      >
        <PhoneIcon />
        Call {brand.phoneDisplay}
      </a>
    </div>
  );
}
