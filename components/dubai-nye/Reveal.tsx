"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Staggered, transform-led reveal. With reduced motion the element snaps to its
 * final state instantly (we always render the motion element so hydration can
 * correct the server-rendered starting style).
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const reduce = useReducedMotion();
  const M = motion[as];
  const shown = { opacity: 1, y: 0 };
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      animate={reduce ? shown : undefined}
      whileInView={reduce ? undefined : shown}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={reduce ? { duration: 0 } : { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </M>
  );
}
