"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const links = [
  { href: "/fleet", label: "Fleet" },
  { href: "/packages", label: "Packages" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[70px] bg-white border-b border-[var(--gt-border)]">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="https://qgifuuzvgbofgyasgwdp.supabase.co/storage/v1/object/public/Media/LOGO_GT.png"
            alt="Golden Travels Logo"
            width={48}
            height={48}
            className="w-12 h-12 object-contain"
          />
          <div className="flex flex-col">
            <span className="text-[var(--gt-navy)] font-bold text-lg leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
              Golden Travels
            </span>
            <span className="text-[9px] uppercase tracking-[0.15em] text-[var(--gt-muted)]">
              Est. 1987 · Bengaluru
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm text-[var(--gt-navy)] hover:text-[var(--gt-red)] transition-colors group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[var(--gt-red)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
        </div>

        {/* Book Now + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center justify-center bg-[var(--gt-red)] text-white text-[11px] uppercase tracking-[0.15em] font-semibold px-6 py-2.5 hover:bg-[var(--gt-red-dark)] transition-colors"
          >
            Book Now
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span className={`w-5 h-[1.5px] bg-[var(--gt-navy)] transition-all ${open ? "rotate-45 translate-y-[4.5px]" : ""}`} />
            <span className={`w-5 h-[1.5px] bg-[var(--gt-navy)] transition-all ${open ? "opacity-0" : ""}`} />
            <span className={`w-5 h-[1.5px] bg-[var(--gt-navy)] transition-all ${open ? "-rotate-45 -translate-y-[4.5px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white border-b border-[var(--gt-border)] transition-all overflow-hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm text-[var(--gt-navy)] hover:text-[var(--gt-red)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center bg-[var(--gt-red)] text-white text-[11px] uppercase tracking-[0.15em] font-semibold px-6 py-2.5 hover:bg-[var(--gt-red-dark)] transition-colors w-full"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
