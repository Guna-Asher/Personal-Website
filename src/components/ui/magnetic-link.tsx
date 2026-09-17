"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode, MouseEvent } from "react";

export function MagneticLink({
  children,
  className = "",
  href,
  target,
  rel,
}: {
  children: ReactNode;
  className?: string;
  href: string;
  target?: string;
  rel?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    const bounds = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - bounds.left - bounds.width / 2) * 0.25);
    y.set((e.clientY - bounds.top - bounds.height / 2) * 0.25);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.a>
  );
}
