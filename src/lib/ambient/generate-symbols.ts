export type AmbientObjectTier = "mobile" | "tablet" | "desktop";

export type AmbientObject = {
  id: string;
  shapes: [string, string, string, string];
  xPct: number;
  yPct: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  direction: 1 | -1;
  driftX: number;
  driftY: number;
  scaleDelta: number;
  accent: boolean;
  tier: AmbientObjectTier;
};

export type AmbientVariant = "sparse" | "default" | "dense";

const SHAPE_POOL = ["✦", "+", "✧", "⊹", "·", "○", "✺", "✿", "❋"];

const VARIANT_COUNTS: Record<AmbientVariant, { mobile: number; tablet: number; desktop: number }> = {
  sparse: { mobile: 2, tablet: 4, desktop: 6 },
  default: { mobile: 3, tablet: 6, desktop: 10 },
  dense: { mobile: 4, tablet: 9, desktop: 16 },
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

export function generateAmbientObjects(
  seed: string,
  variant: AmbientVariant = "default",
  options?: { xRange?: [number, number]; yRange?: [number, number]; sizeRange?: [number, number] },
): AmbientObject[] {
  const counts = VARIANT_COUNTS[variant];
  const total = counts.desktop;
  const rng = mulberry32(hashSeed(seed));
  const [xMin, xMax] = options?.xRange ?? [-4, 104];
  const [yMin, yMax] = options?.yRange ?? [-4, 104];
  const [sizeMin, sizeMax] = options?.sizeRange ?? [10, 22];

  const objects: AmbientObject[] = [];
  for (let i = 0; i < total; i++) {
    const tier: AmbientObjectTier = i < counts.mobile ? "mobile" : i < counts.tablet ? "tablet" : "desktop";
    objects.push({
      id: `${seed}-${i}`,
      shapes: pickSequence(rng),
      xPct: xMin + rng() * (xMax - xMin),
      yPct: yMin + rng() * (yMax - yMin),
      size: sizeMin + rng() * (sizeMax - sizeMin),
      opacity: 0.16 + rng() * 0.26,
      duration: 8 + rng() * 18,
      delay: -(rng() * 20),
      direction: rng() < 0.5 ? 1 : -1,
      driftX: -10 + rng() * 20,
      driftY: -12 + rng() * 24,
      scaleDelta: 0.08 + rng() * 0.16,
      accent: rng() < 0.16,
      tier,
    });
  }
  return objects;
}
