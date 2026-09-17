import { site } from "@/lib/data/site";

export function EdgeLabel() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-1/2 left-4 z-40 hidden -translate-y-1/2 lg:block"
    >
      <span className="block origin-center -rotate-90 font-mono text-[11px] whitespace-nowrap text-muted uppercase tracking-[0.3em]">
        {site.name} — {site.role}
      </span>
    </div>
  );
}
