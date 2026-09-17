"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState, type MouseEvent } from "react";
import { navLinks, site } from "@/lib/data/site";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Container } from "@/components/ui/container";
import { useActiveSection } from "@/lib/hooks/use-active-section";

const NAV_OFFSET = 88;
const sectionIds = navLinks.map((link) => link.href.slice(1));

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
  window.history.replaceState(null, "", `#${id}`);
}

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);

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

  function handleLinkClick(e: MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    setMenuOpen(false);
    scrollToSection(href.slice(1));
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-border bg-background/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            window.history.replaceState(null, "", "#top");
          }}
          className="rounded-sm font-display text-lg font-medium tracking-tight focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
        >
          {site.initials}
          <span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-5 md:flex lg:gap-7 xl:gap-9" aria-label="Primary">
          {navLinks.map((link) => {
            const id = link.href.slice(1);
            const isActive = activeId === id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                aria-current={isActive ? "true" : undefined}
                className={`relative inline-block px-1 py-2 text-[15px] transition-all duration-300 ease-out hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${
                  isActive ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-1 h-px bg-accent transition-all duration-300 ${
                    isActive ? "w-[calc(100%-0.5rem)]" : "w-0"
                  }`}
                  aria-hidden
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <button
            type="button"
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-border transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent focus-visible:-translate-y-0.5 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" aria-hidden />
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
            <Container className="flex h-16 items-center justify-between md:h-20">
              <span className="font-display text-lg font-medium tracking-tight">
                {site.initials}
                <span className="text-accent">.</span>
              </span>
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <button
                  type="button"
                  className="group flex h-11 w-11 items-center justify-center rounded-full border border-border transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent focus-visible:-translate-y-0.5 focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" aria-hidden />
                </button>
              </div>
            </Container>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-6" aria-label="Mobile">
              {navLinks.map((link, i) => {
                const id = link.href.slice(1);
                const isActive = activeId === id;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    aria-current={isActive ? "true" : undefined}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4 }}
                    className={`font-display text-4xl font-medium tracking-tight transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none ${
                      isActive ? "text-accent" : "text-foreground"
                    }`}
                  >
                    {link.label}
                  </motion.a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
