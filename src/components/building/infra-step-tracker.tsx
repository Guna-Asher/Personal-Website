"use client";

import { motion } from "framer-motion";
import { infraSteps } from "@/lib/data/infra";

export function InfraStepTracker() {
  return (
    <ol className="relative">
      {infraSteps.map((step, i) => {
        const isCurrent = step.status === "current";
        return (
          <motion.li
            key={step.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex items-start gap-5 pb-8 pl-1 last:pb-0"
          >
            {i < infraSteps.length - 1 && (
              <span className="absolute top-4 left-[7px] h-full w-px bg-border" aria-hidden />
            )}
            <span className="relative mt-1.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center">
              {isCurrent && (
                <span className="absolute h-full w-full animate-ping rounded-full bg-accent/50" aria-hidden />
              )}
              <span
                className={`relative h-3.5 w-3.5 rounded-full border-2 ${
                  isCurrent ? "border-accent bg-accent" : "border-border bg-transparent"
                }`}
                aria-hidden
              />
            </span>

            <div className="flex flex-1 items-start justify-between gap-4">
              <div className="min-w-0">
                <p
                  className={`font-display text-lg font-medium tracking-tight ${
                    isCurrent ? "text-foreground" : "text-muted"
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-sm text-muted">{step.detail}</p>
              </div>
              {isCurrent && (
                <span className="shrink-0 pt-1 font-mono text-xs tracking-widest text-accent uppercase whitespace-nowrap">
                  In progress
                </span>
              )}
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
