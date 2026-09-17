"use client";

import { motion } from "framer-motion";

const services = [
  { label: "portfolio.service", detail: "active (running)" },
  { label: "docker", detail: "healthy" },
  { label: "nginx", detail: "active" },
];

export function HeroTerminal() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="w-full max-w-[340px]"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="overflow-hidden rounded-xl border border-border bg-surface font-mono text-xs shadow-[0_30px_60px_-30px_rgba(0,0,0,0.5)]"
      >
        <div className="flex items-center gap-1.5 border-b border-border px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full border border-border" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full border border-border" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full border border-border" aria-hidden />
          <span className="ml-2 text-[10px] tracking-widest text-muted uppercase">portfolio — zsh</span>
        </div>

        <div className="flex flex-col gap-3 px-5 py-5 leading-relaxed text-muted">
          <p>
            <span className="text-accent">$</span> whoami
          </p>
          <p className="text-foreground">guna-r</p>

          <p className="mt-2">
            <span className="text-accent">$</span> systemctl status portfolio
          </p>

          <div className="flex flex-col gap-1.5">
            {services.map((s) => (
              <p key={s.label} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                <span className="text-foreground">{s.label}</span>
                <span className="text-muted">— {s.detail}</span>
              </p>
            ))}
          </div>

          <p className="mt-2 flex items-center gap-1.5 text-foreground">
            deployment successful
            <motion.span
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              className="inline-block h-3.5 w-[7px] bg-accent"
              aria-hidden
            />
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
