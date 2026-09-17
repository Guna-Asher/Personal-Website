"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState, type MouseEvent } from "react";
import { RevealText } from "@/components/ui/reveal-text";
import { CornerMarks } from "@/components/ui/corner-marks";
import { InteractiveLink } from "@/components/ui/interactive-link";
import type { Project } from "@/lib/data/projects";

export function ProjectRow({ project, delay = 0 }: { project: Project; delay?: number }) {
  const [open, setOpen] = useState(false);

  function handleGithubClick(e: MouseEvent) {
    e.stopPropagation();
  }

  return (
    <RevealText delay={delay}>
      <div className="group relative border-b border-border">
        <CornerMarks className="opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="grid w-full grid-cols-[3rem_1fr_1.5rem] items-start gap-x-6 gap-y-4 px-1 py-8 text-left transition-colors hover:bg-surface focus-visible:bg-surface focus-visible:outline-none md:grid-cols-[4rem_1fr_auto] md:items-center md:gap-x-10 md:px-4"
        >
          <span className="font-mono text-sm text-muted">{project.index}</span>

          <div className="min-w-0">
            <h3 className="font-display text-2xl font-medium tracking-tight transition-colors group-hover:text-accent md:text-3xl">
              {project.title}
            </h3>
            <p className="mt-1 font-mono text-xs tracking-widest text-muted uppercase">{project.type}</p>
            <p className="mt-3 max-w-lg text-muted">{project.oneLiner}</p>
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

          <Plus
            className={`hidden h-5 w-5 shrink-0 text-muted transition-all duration-300 group-hover:scale-110 group-hover:text-accent md:block ${
              open ? "rotate-45" : "rotate-0"
            }`}
            aria-hidden
          />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-[3rem_1fr] gap-x-6 px-1 pb-8 md:grid-cols-[4rem_1fr] md:gap-x-10 md:px-4">
                <span aria-hidden />
                <div className="max-w-lg">
                  <p className="text-muted">{project.description}</p>
                  <div className="mt-5">
                    <InteractiveLink href={project.github} external onClick={handleGithubClick}>
                      View source on GitHub
                    </InteractiveLink>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </RevealText>
  );
}
