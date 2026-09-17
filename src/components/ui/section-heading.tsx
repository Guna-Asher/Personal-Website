import { RevealText } from "./reveal-text";

export function SectionHeading({
  index,
  eyebrow,
  title,
  className = "",
}: {
  index: string;
  eyebrow: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`flex items-end justify-between gap-6 border-b border-border pb-6 ${className}`}>
      <RevealText>
        <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] font-medium tracking-tight">
          {title}
        </h2>
      </RevealText>
      <RevealText delay={0.1} className="hidden shrink-0 items-center gap-3 font-mono text-sm text-muted sm:flex">
        <span>{index}</span>
        <span className="uppercase tracking-widest">{eyebrow}</span>
      </RevealText>
    </div>
  );
}
