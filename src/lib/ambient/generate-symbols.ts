export type AmbientObjectTier = "mobile" | "tablet" | "desktop";
export type AmbientSizeClass = "small" | "medium" | "large";

export type AmbientObject = {
  id: string;
  shapes: [string, string, string, string];
  xPct: number;
  yPct: number;
  sizeMobile: number;
  sizeDesktop: number;
  sizeClass: AmbientSizeClass;
  opacity: number;
  duration: number;
  delay: number;
  direction: 1 | -1;
  driftX: number;
  driftY: number;
  scaleDelta: number;
  rotQuarter: number;
  accent: boolean;
  tier: AmbientObjectTier;
};

export type AmbientVariant = "sparse" | "default" | "dense";

const SHAPE_POOL = ["✦", "✧", "✣", "✥", "✺", "✹", "+", "×", "⊹", "*"];

const VARIANT_COUNTS: Record<AmbientVariant, { mobile: number; tablet: number; desktop: number }> = {
  sparse: { mobile: 2, tablet: 4, desktop: 6 },
  default: { mobile: 3, tablet: 6, desktop: 9 },
  dense: { mobile: 4, tablet: 8, desktop: 14 },
};

// [desktopMin, desktopMax], [mobileMin, mobileMax]
// "large" here is the occasional upper end of the range, capped at 40px —
// never the oversized/dominant scale the ambient layer explicitly avoids.
const SIZE_RANGES: Record<AmbientSizeClass, { desktop: [number, number]; mobile: [number, number] }> = {
  small: { desktop: [8, 18], mobile: [6, 12] },
  medium: { desktop: [18, 30], mobile: [12, 20] },
  large: { desktop: [30, 40], mobile: [18, 26] },
};

const MOTION_BY_CLASS: Record<
  AmbientSizeClass,
  { drift: [number, number]; scale: [number, number]; rotQuarter: [number, number]; duration: [number, number] }
> = {
  small: { drift: [3, 8], scale: [0.04, 0.08], rotQuarter: [12, 30], duration: [6, 11] },
  medium: { drift: [6, 12], scale: [0.08, 0.14], rotQuarter: [30, 55], duration: [9, 15] },
  large: { drift: [10, 18], scale: [0.12, 0.2], rotQuarter: [45, 70], duration: [12, 20] },
};

const OPACITY_BY_CLASS: Record<AmbientSizeClass, [number, number]> = {
  small: [0.16, 0.28],
  medium: [0.22, 0.36],
  large: [0.28, 0.42],
};

function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pickSequence(rng: () => number): [string, string, string, string] {
  const start = Math.floor(rng() * SHAPE_POOL.length);
  const step = 1 + Math.floor(rng() * 3);
  const seq = [0, 1, 2, 3].map((k) => SHAPE_POOL[(start + k * step) % SHAPE_POOL.length]);
  return seq as [string, string, string, string];
}

function pickSizeClass(rng: () => number, allowLarge: boolean): AmbientSizeClass {
  const r = rng();
  if (allowLarge) {
    if (r < 0.55) return "small";
    if (r < 0.9) return "medium";
    return "large";
  }
  return r < 0.6 ? "small" : "medium";
}

function inRange(rng: () => number, [min, max]: [number, number]): number {
  return min + rng() * (max - min);
}

export function generateAmbientObjects(
  seed: string,
  variant: AmbientVariant = "default",
  options?: { xRange?: [number, number]; yRange?: [number, number]; scale?: number; allowLarge?: boolean },
): AmbientObject[] {
  const counts = VARIANT_COUNTS[variant];
  const total = counts.desktop;
  const rng = mulberry32(hashSeed(seed));
  const [xMin, xMax] = options?.xRange ?? [-6, 106];
  const [yMin, yMax] = options?.yRange ?? [-6, 106];
  const sizeScale = options?.scale ?? 1;
  const allowLarge = options?.allowLarge ?? true;

  const objects: AmbientObject[] = [];
  for (let i = 0; i < total; i++) {
    const tier: AmbientObjectTier = i < counts.mobile ? "mobile" : i < counts.tablet ? "tablet" : "desktop";
    const sizeClass = pickSizeClass(rng, allowLarge);
    const sizeT = rng();
    const sizeRange = SIZE_RANGES[sizeClass];
    const motion = MOTION_BY_CLASS[sizeClass];
    const driftMag = inRange(rng, motion.drift);
    const driftAngle = rng() * Math.PI * 2;

    objects.push({
      id: `${seed}-${i}`,
      shapes: pickSequence(rng),
      xPct: xMin + rng() * (xMax - xMin),
      yPct: yMin + rng() * (yMax - yMin),
      sizeMobile: (sizeRange.mobile[0] + sizeT * (sizeRange.mobile[1] - sizeRange.mobile[0])) * sizeScale,
      sizeDesktop: (sizeRange.desktop[0] + sizeT * (sizeRange.desktop[1] - sizeRange.desktop[0])) * sizeScale,
      sizeClass,
      opacity: inRange(rng, OPACITY_BY_CLASS[sizeClass]),
      duration: inRange(rng, motion.duration),
      delay: -(rng() * 20),
      direction: rng() < 0.5 ? 1 : -1,
      driftX: Math.cos(driftAngle) * driftMag,
      driftY: Math.sin(driftAngle) * driftMag,
      scaleDelta: inRange(rng, motion.scale),
      rotQuarter: inRange(rng, motion.rotQuarter),
      accent: rng() < 0.16,
      tier,
    });
  }
  return objects;
}
