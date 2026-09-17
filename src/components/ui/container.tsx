import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1400px] px-6 md:px-8 lg:px-12 xl:px-16 ${className}`}>
      {children}
    </div>
  );
}
