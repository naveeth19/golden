"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * All of the page's client behaviour in one effect, so the page itself stays
 * a static server component:
 *  - `.cg-ready` on the root once the GT preloader has cleared (hero entrance)
 *  - `.in` on [data-reveal] / [data-curtain] as they scroll into view
 *  - header background + mobile sticky bar once the hero is passed
 *  - "N days to go" countdowns on [data-countdown]
 *  - dataLayer push for every [data-cta] click (Google Ads attribution)
 */
export default function CoorgMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".cg");
    if (!root) return;

    // The preloader holds for ~1.2s on a visitor's first page of the session
    // and is skipped after that (it sets `gt-loaded`). Read the flag before
    // it is set so the hero only waits when the preloader is actually shown.
    let firstVisit = true;
    try {
      firstVisit = !sessionStorage.getItem("gt-loaded");
    } catch {}
    const readyTimer = window.setTimeout(
      () => root.classList.add("cg-ready"),
      firstVisit ? 1050 : 60,
    );

    // Scroll reveals
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    root.querySelectorAll("[data-reveal],[data-curtain]").forEach((el) => io.observe(el));

    // Header + sticky bar
    const header = root.querySelector(".cg-header");
    const sticky = root.querySelector(".cg-sticky");
    const hero = root.querySelector(".cg-hero");
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        header?.classList.toggle("is-scrolled", y > 40);
        const heroEnd = hero ? (hero as HTMLElement).offsetHeight * 0.7 : 500;
        sticky?.classList.toggle("is-on", y > heroEnd);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Countdowns
    const counters = root.querySelectorAll<HTMLElement>("[data-countdown]");
    const tick = () => {
      const now = Date.now();
      counters.forEach((el) => {
        const target = Date.parse(el.dataset.countdown || "");
        if (Number.isNaN(target)) return;
        const days = Math.ceil((target - now) / 86_400_000);
        el.textContent = days > 1 ? `${days} days` : days === 1 ? "1 day" : "now";
      });
    };
    tick();
    const countTimer = window.setInterval(tick, 60_000);

    // CTA tracking
    const onClick = (ev: MouseEvent) => {
      const a = (ev.target as HTMLElement).closest<HTMLElement>("[data-cta]");
      if (!a) return;
      const [section, action] = (a.dataset.cta || "").split("|");
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "coorg_cta", section, action });
    };
    root.addEventListener("click", onClick);

    return () => {
      window.clearTimeout(readyTimer);
      window.clearInterval(countTimer);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      root.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
