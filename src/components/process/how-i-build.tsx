"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { AmbientLayer } from "@/components/ui/ambient-layer";
import { processSteps } from "@/lib/data/process";

export function HowIBuild() {
  const [active, setActive] = useState(0);
  const activeStep = processSteps[active];

  return (
    <section id="process" className="relative isolate py-20 md:py-28 lg:py-32 xl:py-40">
      <AmbientLayer seed="process" variant="sparse" />
      <Container>
        <SectionHeading index="04" eyebrow="Methodology" title="How I Build" />

        <div className="mt-16">
          <div className="relative grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-0">
            <div className="absolute -top-6 inset-x-0 hidden justify-between px-1 md:flex" aria-hidden>
              {processSteps.map((step, i) => (
                <span
                  key={step.index}
                  className={`font-mono text-sm transition-all duration-500 ease-out ${
                    active === i ? "scale-125 text-accent opacity-100" : "scale-100 text-muted opacity-30"
                  }`}
                >
                  ✦
                </span>
              ))}
            </div>
            <div className="absolute top-4 right-0 left-0 hidden h-px bg-border md:block" aria-hidden />
            <motion.div
              className="absolute top-4 left-0 hidden h-px bg-accent md:block"
              animate={{ width: `${(active / (processSteps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden
            />

            {processSteps.map((step, i) => (
              <button
                key={step.index}
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-pressed={active === i}
                className="group relative flex flex-col items-start gap-4 text-left transition-transform duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline-none"
              >
                <span
                  className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 font-mono text-xs transition-colors group-focus-visible:ring-2 group-focus-visible:ring-accent group-focus-visible:ring-offset-2 ${
                    active === i
                      ? "border-accent bg-accent text-accent-foreground"
                      : "border-border bg-background text-muted group-hover:border-accent"
                  }`}
                >
                  {step.index}
                </span>
                <span
                  className={`font-display text-lg font-medium tracking-tight transition-colors md:text-xl lg:text-2xl ${
                    active === i ? "text-accent" : "text-foreground"
                  }`}
                >
                  {step.title}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-12 min-h-32 border-t border-border pt-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-2xl"
              >
                <p className="font-display text-xl font-medium tracking-tight md:text-2xl lg:text-3xl">
                  {activeStep.summary}
                </p>
                <p className="mt-4 text-lg text-muted">{activeStep.detail}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
