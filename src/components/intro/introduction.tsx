import { Container } from "@/components/ui/container";
import { RevealText } from "@/components/ui/reveal-text";

export function Introduction() {
  return (
    <section id="intro" className="py-32 sm:py-40">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_2.5fr]">
          <RevealText className="font-mono text-sm tracking-widest text-muted uppercase">
            Introduction
          </RevealText>

          <div className="max-w-3xl space-y-6">
            <RevealText>
              <p className="font-display text-[clamp(1.5rem,3.4vw,2.75rem)] leading-[1.3] font-medium tracking-tight">
                I&apos;m early in my career — and I&apos;d rather show that honestly through working
                systems than dress it up.
              </p>
            </RevealText>
            <RevealText delay={0.1}>
              <p className="text-lg leading-relaxed text-muted">
                What I do have is four projects that go past a tutorial: an application with real
                users and payments, an internal tool that automates deployments, a log pipeline
                running on AWS, and this site — which I&apos;m turning into its own infrastructure
                build as I learn. I care as much about what happens after{" "}
                <code className="font-mono text-foreground">git push</code> as what happens before
                it.
              </p>
            </RevealText>
          </div>
        </div>
      </Container>
    </section>
  );
}
