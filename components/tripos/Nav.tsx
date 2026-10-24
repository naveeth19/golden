"use client";

import { useEffect, useRef, useState } from "react";
import { Icon, Wordmark } from "./Icons";
import { NAV_LINKS, GT_SITE } from "@/lib/tripos/content";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape closes the menu and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-200 border-b ${
        scrolled || open
          ? "bg-[rgba(250,249,246,0.85)] backdrop-blur-md border-[var(--tp-line)]"
          : "bg-transparent border-transparent"
      }`}
    >
      <nav aria-label="TripOS" className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <a href="#top" aria-label="TripOS — back to top">
            <Wordmark />
          </a>
          <a
            href={GT_SITE}
            className="hidden lg:inline whitespace-nowrap text-[13px] text-[var(--tp-slate)] hover:text-[var(--tp-ink)] border-l border-[var(--tp-line)] pl-3"
          >
            by Golden Travels
          </a>
        </div>

        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-lg px-3 py-2 text-[14.5px] text-[var(--tp-slate)] hover:text-[var(--tp-ink)] hover:bg-white/70 transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#early-access" className="tp-btn tp-btn-primary hidden sm:inline-flex !min-h-[40px] !text-[14px]">
            Get Early Access
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="md:hidden grid h-11 w-11 place-items-center rounded-lg text-[var(--tp-ink)] hover:bg-white/70"
            aria-expanded={open}
            aria-controls="tp-mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} size={22} />
          </button>
        </div>
      </nav>

      {open && (
        <div id="tp-mobile-menu" className="md:hidden tp-fade border-t border-[var(--tp-line)] px-4 pb-5 pt-2">
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-3 text-[16px] font-medium text-[var(--tp-ink)] hover:bg-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#early-access" onClick={() => setOpen(false)} className="tp-btn tp-btn-primary mt-3 w-full">
            Get Early Access
          </a>
          <a href={GT_SITE} className="mt-4 block text-center text-[13px] text-[var(--tp-slate)]">
            by Golden Travels
          </a>
        </div>
      )}
    </header>
  );
}
