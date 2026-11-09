"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { useAnimationsEnabled } from "@/contexts/AccessibilityContext";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  /** Anima na montagem (hero) em vez de ao entrar na viewport. */
  immediate?: boolean;
}

/** Revela o texto palavra por palavra, com máscara. O texto completo fica acessível via sr-only. */
export function TextReveal({ text, className, delay = 0, immediate = false }: TextRevealProps) {
  const enabled = useAnimationsEnabled();
  const ref = useRef<HTMLSpanElement>(null);
  // Observa o contêiner fixo: as palavras deslocadas ficam recortadas pela máscara e nunca "intersectariam".
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const words = text.split(" ");

  if (!enabled) return <span className={className}>{text}</span>;

  const show = immediate || inView;

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              data-reveal
              className="inline-block"
              initial={{ y: "110%" }}
              animate={{ y: show ? 0 : "110%" }}
              transition={{ duration: 0.85, delay: show ? delay + i * 0.07 : 0, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    </span>
  );
}
