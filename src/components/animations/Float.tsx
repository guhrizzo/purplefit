"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useAnimationsEnabled } from "@/contexts/AccessibilityContext";

interface FloatProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  rotate?: number;
}

/** Elemento decorativo flutuante. Estático quando as animações estão desativadas. */
export function Float({ children, className, amplitude = 14, duration = 6, rotate = 0 }: FloatProps) {
  const enabled = useAnimationsEnabled();
  if (!enabled) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -amplitude, 0], rotate: rotate ? [-rotate, rotate, -rotate] : 0 }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
