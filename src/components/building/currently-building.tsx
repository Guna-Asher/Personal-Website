import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealText } from "@/components/ui/reveal-text";
import { CornerMarks } from "@/components/ui/corner-marks";
import { AmbientLayer } from "@/components/ui/ambient-layer";
import { InfraStepTracker } from "./infra-step-tracker";
import { projects } from "@/lib/data/projects";

export function CurrentlyBuilding() {
  const building = projects.find((p) => p.status === "building");
  if (!building) return null;

  return (
    <section id="building" className="relative py-32 sm:py-40">
      <AmbientLayer seed="building" variant="default" xRange={[45, 105]} />
      <Container>
        <SectionHeading index="02" eyebrow="In progress" title="Currently Building" />

        <div className="mt-12 grid gap-16 lg:grid-cols-2">
          <div className="relative p-6">
            <CornerMarks />
            <RevealText>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/40 px-3 py-1 font-mono text-xs tracking-widest text-accent uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                Currently building
              </span>
            </RevealText>
            <RevealText delay={0.05}>
              <h3 className="font-display text-3xl font-medium tracking-tight">{building.title}</h3>
            </RevealText>
            <RevealText delay={0.1}>
              <p className="mt-4 max-w-md text-muted">{building.description}</p>
            </RevealText>
            <RevealText delay={0.15}>
              <p className="mt-6 text-sm text-muted">
                This isn&apos;t finished — the tracker on the right is the honest, current state of
                the build, not a claim that it&apos;s done.
              </p>
            </RevealText>
          </div>

          <InfraStepTracker />
        </div>
      </Container>
    </section>
  );
}
