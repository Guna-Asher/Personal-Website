"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/data/site";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Container } from "@/components/ui/container";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-border bg-background/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <a href="#top" className="font-display text-lg font-medium tracking-tight">
          GA<span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col bg-background md:hidden"
          >
            <Container className="flex h-16 items-center justify-between sm:h-20">
              <span className="font-display text-lg font-medium tracking-tight">
                GA<span className="text-accent">.</span>
              </span>
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </Container>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-6" aria-label="Mobile">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  className="font-display text-4xl font-medium tracking-tight"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
