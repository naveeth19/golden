"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { brand } from "./content";
import { ChatIcon, PhoneIcon } from "./Icons";
import { trackContact } from "./tracking";

/** Mobile-only Call / WhatsApp bar that appears once the hero is out of view. */
export default function StickyBar() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting), { rootMargin: "-40% 0px 0px 0px" });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={reduce ? false : { y: 100 }}
          animate={{ y: 0 }}
          exit={reduce ? undefined : { y: 100 }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-champagne/25 bg-night-900/95 px-3 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur md:hidden"
        >
          <div className="grid grid-cols-2 gap-3">
            <a
              href={brand.phoneHref}
              onClick={() => trackContact("call", "sticky_mobile")}
              className="flex min-h-[52px] items-center justify-center gap-2 rounded-pill border border-champagne/60 text-[15px] font-semibold text-cream"
            >
              <PhoneIcon /> Call
            </a>
            <a
              href={brand.whatsappHref}
              target="_blank"
              rel="noopener"
              onClick={() => trackContact("whatsapp", "sticky_mobile")}
              className="flex min-h-[52px] items-center justify-center gap-2 rounded-pill bg-crimson text-[15px] font-semibold text-white"
            >
              <ChatIcon /> WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
