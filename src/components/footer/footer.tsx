"use client";

import { Mail } from "lucide-react";
import { Container } from "@/components/ui/container";
import { site } from "@/lib/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <Container className="flex flex-col items-center justify-between gap-6 text-sm text-muted sm:flex-row">
        <p>
          © {year} {site.name}
        </p>

        <div className="flex items-center gap-5">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            GitHub
          </a>
          <a
            href={`mailto:${site.email}`}
            aria-label="Email"
            className="transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            <Mail className="h-4 w-4" aria-hidden />
          </a>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="transition-colors hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
          >
            Back to top
          </a>
        </div>
      </Container>
    </footer>
  );
}
