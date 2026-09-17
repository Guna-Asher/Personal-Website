"use client";

import { useMemo, useRef, type CSSProperties } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { generateAmbientObjects, type AmbientVariant } from "@/lib/ambient/generate-symbols";

const TIER_CLASS: Record<string, string> = {
  mobile: "",
  tablet: "hidden sm:block",
  desktop: "hidden lg:block",
};

// Fixed precision keeps the server-rendered string and the client's
// re-computed value identical — long floating-point tails can otherwise
// print with different digit counts between environments and trip a
// hydration mismatch even though the underlying number is the same.
function round(n: number, decimals = 3): number {
  const factor = 10 ** decimals;
  return Math.round(n * factor) / factor;
}

export function AmbientLayer({
  seed,
  variant = "default",
  className = "",
  xRange,
  yRange,
  scale,
  allowLarge,
  extend = false,
}: {
  seed: string;
  variant?: AmbientVariant;
  className?: string;
  xRange?: [number, number];
  yRange?: [number, number];
  scale?: number;
  allowLarge?: boolean;
  extend?: boolean;
}) {
  const objects = useMemo(
    () => generateAmbientObjects(seed, variant, { xRange, yRange, scale, allowLarge }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [seed, variant, xRange?.[0], xRange?.[1], yRange?.[0], yRange?.[1], scale, allowLarge],
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
              left: `${round(o.xPct, 2)}%`,
              top: `${round(o.yPct, 2)}%`,
              animationDuration: `${round(o.duration, 2)}s`,
              animationDelay: `${round(o.delay, 2)}s`,
              "--ambient-dir": o.direction,
              "--ambient-drift-x": `${round(o.driftX, 2)}px`,
              "--ambient-drift-y": `${round(o.driftY, 2)}px`,
              "--ambient-scale": round(o.scaleDelta, 4),
              "--ambient-rot-quarter": `${round(o.rotQuarter, 1)}deg`,
              "--ambient-size-mobile": `${round(o.sizeMobile, 1)}px`,
              "--ambient-size-desktop": `${round(o.sizeDesktop, 1)}px`,
            } as CSSProperties
          }
        >
          {o.shapes.map((shape, i) => (
            <span
              key={i}
              className={`ambient-shape absolute inset-0 flex items-center justify-center leading-none ${
                o.accent ? "text-accent" : "text-ambient"
              }`}
              style={
                {
                  animationDuration: `${round(o.duration, 2)}s`,
                  animationDelay: `${round(o.delay - (i * o.duration) / 4, 2)}s`,
                  "--ambient-o": round(o.opacity, 3),
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
