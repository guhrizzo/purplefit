"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useAnimationsEnabled } from "@/contexts/AccessibilityContext";
import { AppIcon } from "@/components/ui/AppIcon";

type Variant = "primary" | "ghost" | "dark";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
  onClick?: () => void;
}

const base =
  "group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-7 py-3 text-sm font-extrabold uppercase tracking-[0.08em] transition-colors duration-300";

const variants: Record<Variant, string> = {
  primary: "bg-volt text-ink hover:bg-white",
  ghost: "border-2 border-white/80 text-white hover:bg-white hover:text-ink",
  dark: "bg-ink text-white hover:bg-purple",
};

/** Botão-link com microinterações do Motion (desligadas junto com o estado global). */
export function Button({ href, children, variant = "primary", external, className, onClick }: ButtonProps) {
  const enabled = useAnimationsEnabled();
  const props = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <motion.a
      href={href}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className ?? ""}`}
      whileHover={enabled ? { y: -3 } : undefined}
      whileTap={enabled ? { scale: 0.96 } : undefined}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      {...props}
    >
      {children}
      <AppIcon
        name={external ? "arrow-up-right" : "arrow-right"}
        size={18}
        stroke={2.5}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
      {external ? <span className="sr-only">(abre em nova aba)</span> : null}
    </motion.a>
  );
}
