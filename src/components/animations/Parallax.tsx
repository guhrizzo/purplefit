"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useAnimationsEnabled } from "@/contexts/AccessibilityContext";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Deslocamento total em px (positivo = desce ao rolar). Mantido baixo para ser controlado. */
  distance?: number;
  scale?: [number, number];
}

/** Parallax controlado: move o conteúdo levemente conforme a rolagem da seção. */
export function Parallax({ children, className, distance = 60, scale }: ParallaxProps) {
  const enabled = useAnimationsEnabled();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  const s = useTransform(scrollYProgress, [0, 1], scale ?? [1, 1]);

  return (
    <div ref={ref} className={className}>
      {enabled ? (
        <motion.div style={{ y, scale: s }} className="h-full w-full">
          {children}
        </motion.div>
      ) : (
        <div className="h-full w-full">{children}</div>
      )}
    </div>
  );
}
