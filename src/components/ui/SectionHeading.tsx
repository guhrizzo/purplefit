import type { ReactNode } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  id: string;
  children?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({ eyebrow, title, id, children, tone = "dark", className }: SectionHeadingProps) {
  const eyebrowColor = tone === "dark" ? "text-volt" : "text-purple";
  return (
    <div className={className}>
      <Reveal>
        <p className={`mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] ${eyebrowColor}`}>
          <span className="h-px w-10 bg-current" aria-hidden="true" data-decor />
          {eyebrow}
        </p>
      </Reveal>
      <h2 id={id} className="display text-[clamp(2.6rem,7vw,5.5rem)]">
        <TextReveal text={title} />
      </h2>
      {children ? <div className="mt-6 max-w-xl text-lg opacity-85">{children}</div> : null}
    </div>
  );
}
