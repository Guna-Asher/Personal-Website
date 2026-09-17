import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { RevealText } from "@/components/ui/reveal-text";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { site } from "@/lib/data/site";

export function Contact() {
  return (
    <section id="contact" className="py-32 sm:py-40">
      <Container>
        <RevealText className="font-mono text-sm tracking-widest text-muted uppercase">
          05 — Contact
        </RevealText>

        <RevealText delay={0.05}>
          <p className="font-display mt-6 max-w-3xl text-[clamp(2rem,6vw,4.5rem)] leading-[1.05] font-medium tracking-tight">
            Open to entry-level Cloud &amp; DevOps roles — let&apos;s talk.
          </p>
        </RevealText>

        <RevealText delay={0.1} className="mt-10 inline-block">
          <MagneticLink
            href={`mailto:${site.email}`}
            className="group inline-flex items-center gap-3 border-b-2 border-foreground pb-1 font-display text-2xl font-medium tracking-tight transition-colors hover:border-accent hover:text-accent sm:text-4xl"
          >
            {site.email}
            <ArrowUpRight
              className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              aria-hidden
            />
          </MagneticLink>
        </RevealText>

        <RevealText delay={0.15} className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-accent"
          >
            GitHub
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
        </RevealText>
      </Container>
    </section>
  );
}
