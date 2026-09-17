export function CornerMarks({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 text-border ${className}`} aria-hidden>
      <span className="absolute top-0 left-0 h-2.5 w-2.5 border-t border-l border-current transition-colors" />
      <span className="absolute top-0 right-0 h-2.5 w-2.5 border-t border-r border-current transition-colors" />
      <span className="absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l border-current transition-colors" />
      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r border-current transition-colors" />
    </div>
  );
}
