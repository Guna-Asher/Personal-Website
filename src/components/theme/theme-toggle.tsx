"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      suppressHydrationWarning
      className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent focus-visible:-translate-y-0.5 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none cursor-pointer"
    >
      <Sun
        aria-hidden
        className="absolute h-4 w-4 scale-100 rotate-0 opacity-100 transition-all duration-300 [[data-theme=dark]_&]:scale-0 [[data-theme=dark]_&]:-rotate-90 [[data-theme=dark]_&]:opacity-0"
      />
      <Moon
        aria-hidden
        className="absolute h-4 w-4 scale-0 rotate-90 opacity-0 transition-all duration-300 [[data-theme=dark]_&]:scale-100 [[data-theme=dark]_&]:rotate-0 [[data-theme=dark]_&]:opacity-100"
      />
    </button>
  );
}
