import { Container } from "@/components/ui/container";
import { RevealText } from "@/components/ui/reveal-text";
import { AmbientLayer } from "@/components/ui/ambient-layer";

export function Introduction() {
  return (
    <section id="intro" className="relative isolate py-20 md:py-28 lg:py-32 xl:py-40">
      <AmbientLayer seed="intro" variant="sparse" />
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_2.5fr]">
          <RevealText className="font-mono text-sm tracking-widest text-muted uppercase">
            Introduction
          </RevealText>

          <div className="max-w-3xl space-y-6">
            <RevealText>
              <p className="font-display text-lead font-medium tracking-tight">
                I&apos;m early in my career and I&apos;d rather show that honestly through working
                systems than dress it up.
              </p>
            </RevealText>
            <RevealText delay={0.1}>
              <p className="text-lg leading-relaxed text-muted">
                What I do have is four projects that go past a tutorial. An application with real
                users and payments, an internal tool that automates deployments, a log pipeline
                running on AWS, and this site, which I&apos;m turning into its own infrastructure
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
