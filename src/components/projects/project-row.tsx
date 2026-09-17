"use client";

import { ArrowUpRight } from "lucide-react";
import { RevealText } from "@/components/ui/reveal-text";
import type { Project } from "@/lib/data/projects";

export function ProjectRow({ project, delay = 0 }: { project: Project; delay?: number }) {
  return (
    <RevealText delay={delay}>
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="group grid grid-cols-[3rem_1fr] items-start gap-x-6 gap-y-4 border-b border-border py-8 transition-colors hover:bg-surface sm:grid-cols-[4rem_1fr_auto] sm:items-center sm:gap-x-10 sm:px-4"
      >
        <span className="font-mono text-sm text-muted">{project.index}</span>

        <div className="min-w-0">
          <h3 className="font-display text-2xl font-medium tracking-tight transition-colors group-hover:text-accent sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-2 max-w-lg text-muted">{project.oneLiner}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <ArrowUpRight
          className="hidden h-6 w-6 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent sm:block"
          aria-hidden
        />
      </a>
    </RevealText>
  );
}
