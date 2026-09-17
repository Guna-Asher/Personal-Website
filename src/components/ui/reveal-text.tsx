"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function RevealText({
  children,
  className = "",
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "span";
}) {
  const animation = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10% 0px -10% 0px" } as const,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  };

  if (as === "span") {
    return (
      <motion.span className={className} {...animation}>
        {children}
      </motion.span>
    );
  }

  return (
    <motion.div className={className} {...animation}>
      {children}
    </motion.div>
  );
}
