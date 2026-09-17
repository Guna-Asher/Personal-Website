import { Container } from "@/components/ui/container";
import { site } from "@/lib/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8">
      <Container className="flex flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
        <p>
          © {year} {site.name}
        </p>
        <a href="#top" className="transition-colors hover:text-accent">
          Back to top
        </a>
      </Container>
    </footer>
  );
}
