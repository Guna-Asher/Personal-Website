"use client";

import { useMemo, useRef, type CSSProperties } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { generateAmbientObjects, type AmbientVariant } from "@/lib/ambient/generate-symbols";

const TIER_CLASS: Record<string, string> = {
  mobile: "",
  tablet: "hidden sm:block",
  desktop: "hidden lg:block",
};

export function AmbientLayer({
  seed,
  variant = "default",
  className = "",
  xRange,
  yRange,
  sizeRange,
  extend = false,
}: {
  seed: string;
  variant?: AmbientVariant;
  className?: string;
  xRange?: [number, number];
  yRange?: [number, number];
  sizeRange?: [number, number];
  extend?: boolean;
}) {
  const objects = useMemo(
    () => generateAmbientObjects(seed, variant, { xRange, yRange, sizeRange }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [seed, variant, xRange?.[0], xRange?.[1], yRange?.[0], yRange?.[1], sizeRange?.[0], sizeRange?.[1]],
  );

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-16, 16]);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      style={{ y }}
      className={`pointer-events-none absolute -z-10 overflow-hidden ${
        extend ? "-inset-y-12 inset-x-0" : "inset-0"
      } ${className}`}
    >
      {objects.map((o) => (
        <span
          key={o.id}
          className={`ambient-object absolute font-mono select-none ${TIER_CLASS[o.tier]}`}
          style={
            {
              left: `${o.xPct}%`,
              top: `${o.yPct}%`,
              width: `${o.size}px`,
              height: `${o.size}px`,
              fontSize: `${o.size}px`,
              animationDuration: `${o.duration}s`,
              animationDelay: `${o.delay}s`,
              "--ambient-dir": o.direction,
              "--ambient-drift-x": `${o.driftX}px`,
              "--ambient-drift-y": `${o.driftY}px`,
              "--ambient-scale": o.scaleDelta,
            } as CSSProperties
          }
        >
          {o.shapes.map((shape, i) => (
            <span
              key={i}
              className={`ambient-shape absolute inset-0 flex items-center justify-center leading-none ${
                o.accent ? "text-accent" : "text-muted"
              }`}
              style={
                {
                  animationDuration: `${o.duration}s`,
                  animationDelay: `${o.delay - (i * o.duration) / 4}s`,
                  "--ambient-o": o.opacity,
                } as CSSProperties
              }
            >
              {shape}
            </span>
          ))}
        </span>
      ))}
    </motion.div>
  );
}
