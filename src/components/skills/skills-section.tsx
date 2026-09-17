import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { RevealText } from "@/components/ui/reveal-text";
import { skillCategories } from "@/lib/data/skills";

export function SkillsSection() {
  return (
    <section id="skills" className="py-32 sm:py-40">
      <Container>
        <SectionHeading index="03" eyebrow="Toolbox" title="Skills" />

        <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, i) => (
            <RevealText key={category.label} delay={i * 0.06}>
              <h3 className="font-mono text-xs tracking-widest text-muted uppercase">
                {category.label}
              </h3>
              <ul className="mt-5 space-y-3">
                {category.skills.map((skill) => (
                  <li key={skill}>
                    <span className="font-display cursor-default text-lg font-medium tracking-tight decoration-accent decoration-2 underline-offset-4 transition-all hover:underline">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </RevealText>
          ))}
        </div>
      </Container>
    </section>
  );
}
