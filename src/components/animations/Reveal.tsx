"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useAnimationsEnabled } from "@/contexts/AccessibilityContext";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  /** Tag renderizada. */
  as?: "div" | "li" | "article" | "section" | "p";
}

const tags = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
  section: motion.section,
  p: motion.p,
} as const;

/** Revela o conteúdo ao entrar na viewport. Sem animação quando o estado global está desligado. */
export function Reveal({ children, className, delay = 0, y = 32, x = 0, as = "div" }: RevealProps) {
  const enabled = useAnimationsEnabled();
  const Tag = tags[as];

  if (!enabled) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Tag
      className={className}
      data-reveal
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}
