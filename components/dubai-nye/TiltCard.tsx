"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState, type ReactNode, type PointerEvent } from "react";

/**
 * Physical 3D tilt with a moving specular highlight. Pointer devices only;
 * touch and reduced-motion users get a static card.
 */
export default function TiltCard({
  children,
  className = "",
  max = 9,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
}) {
  const reduce = useReducedMotion();
  const [fine, setFine] = useState(false);
  useEffect(() => setFine(window.matchMedia("(hover: hover) and (pointer: fine)").matches), []);
  const active = fine && !reduce;

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const cfg = { stiffness: 180, damping: 18, mass: 0.6 };
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), cfg);
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), cfg);
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const glareBg = useMotionTemplate`radial-gradient(520px circle at ${gx} ${gy}, rgba(255,240,210,.22), transparent 45%)`;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!active) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div className="[perspective:1100px]" onPointerMove={onMove} onPointerLeave={onLeave}>
      <motion.div
        className={`relative [transform-style:preserve-3d] ${className}`}
        style={active ? { rotateX: rx, rotateY: ry } : undefined}
      >
        {children}
        {active && glare && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] mix-blend-soft-light"
            style={{ background: glareBg }}
          />
        )}
      </motion.div>
    </div>
  );
}
