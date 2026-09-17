import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectRow } from "./project-row";
import { projects } from "@/lib/data/projects";

export function ProjectsSection() {
  const shipped = projects.filter((p) => p.status === "shipped");

  return (
    <section id="projects" className="py-32 sm:py-40">
      <Container>
        <SectionHeading index="01" eyebrow="Selected work" title="Selected Projects" />
        <div className="mt-4">
          {shipped.map((project, i) => (
            <ProjectRow key={project.title} project={project} delay={i * 0.05} />
          ))}
        </div>
      </Container>
    </section>
  );
}
