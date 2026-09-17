"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import { Container } from "@/components/ui/container";
import { Marquee } from "@/components/ui/marquee";
import { AmbientLayer } from "@/components/ui/ambient-layer";
import { HeroTerminal } from "@/components/hero/hero-terminal";
import { site } from "@/lib/data/site";

const headlineLines = ["I build applications", "and the infrastructure", "that keeps them running."];

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const line = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative isolate flex min-h-screen flex-col justify-end overflow-hidden pt-32"
    >
      <AmbientLayer seed="hero" variant="sparse" />

      <motion.div style={{ y, opacity }} className="flex flex-1 flex-col justify-center">
        <Container>
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="flex max-w-2xl flex-col gap-8">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex items-center gap-2 font-mono text-sm tracking-widest text-muted uppercase"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                {site.role} · Open to opportunities
              </motion.p>

              <motion.h1
                variants={container}
                initial="hidden"
                animate="visible"
                className="font-display max-w-5xl text-[clamp(2.5rem,7vw,6rem)] leading-[1.02] font-medium tracking-tight"
              >
                {headlineLines.map((text) => (
                  <span key={text} className="block overflow-hidden">
                    <motion.span variants={line} className="block">
                      {text}
                    </motion.span>
                  </span>
                ))}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="max-w-xl text-lg text-muted"
              >
                I&apos;m {site.name}, an entry-level Cloud &amp; DevOps engineer. I ship real backend
                products, then containerize, deploy, and operate them myself.
              </motion.p>
            </div>

            <div className="flex justify-center lg:w-[440px] lg:shrink-0 lg:justify-end">
              <HeroTerminal />
            </div>
          </div>
        </Container>
      </motion.div>

      <Marquee
        items={["FastAPI", "PostgreSQL", "Docker", "AWS EC2 & S3", "GitHub Actions", "Terraform", "Linux"]}
      />

      <motion.a
        href="#intro"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("intro")?.scrollIntoView({ behavior: "smooth" });
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="group absolute right-6 bottom-24 hidden items-center gap-2 font-mono text-xs tracking-widest text-muted uppercase sm:right-10 lg:right-16 md:flex"
        aria-label="Scroll to introduction"
      >
        Scroll
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 transition-colors group-hover:text-accent" aria-hidden />
        </motion.span>
      </motion.a>
    </section>
  );
}
