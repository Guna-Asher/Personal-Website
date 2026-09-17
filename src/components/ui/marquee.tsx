export function Marquee({ items }: { items: string[] }) {
  const track = [...items, ...items];

  return (
    <div className="relative flex w-full overflow-hidden border-y border-border py-4">
      <div className="flex w-max shrink-0 animate-marquee gap-8 pr-8">
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-8 font-mono text-sm tracking-widest whitespace-nowrap text-muted uppercase"
          >
            {item}
            <span className="text-accent" aria-hidden>
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
