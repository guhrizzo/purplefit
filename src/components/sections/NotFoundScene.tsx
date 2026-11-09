"use client";

import { motion } from "motion/react";
import { Float } from "@/components/animations/Float";
import { TextReveal } from "@/components/animations/TextReveal";
import { Reveal } from "@/components/animations/Reveal";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";
import { useAnimationsEnabled } from "@/contexts/AccessibilityContext";

export function NotFoundScene() {
  const enabled = useAnimationsEnabled();

  return (
    <section
      aria-labelledby="nf-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink px-5 pb-16 pt-28 sm:px-8"
    >
      <div aria-hidden="true" data-decor className="absolute -left-32 top-10 -z-10 size-[30rem] rounded-full bg-purple/40 blur-[130px]" />
      <div aria-hidden="true" data-decor className="absolute -right-20 bottom-0 -z-10 size-[26rem] rounded-full bg-volt/20 blur-[120px]" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-volt">Erro 404</p>

          <div aria-hidden="true" className="relative">
            <div className="display flex items-center text-[clamp(7rem,28vw,22rem)] leading-[0.85]">
              <span className="outline-text text-white">4</span>
              <motion.span
                className="mx-1 inline-flex items-center justify-center text-volt sm:mx-3"
                animate={enabled ? { rotate: [0, -8, 8, 0] } : undefined}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="inline-block size-[0.62em] rounded-full border-[0.1em] border-volt" data-keep-bg />
              </motion.span>
              <span className="outline-text text-white">4</span>
            </div>
          </div>

          <h1 id="nf-title" className="display mt-4 text-[clamp(2.4rem,6vw,4.5rem)]">
            <span className="sr-only">Erro 404: </span>
            <TextReveal text="Essa página fugiu do treino." immediate />
          </h1>

          <Reveal delay={0.4}>
            <p className="mt-5 max-w-lg text-lg text-white/80">
              O endereço que você tentou acessar não existe ou foi movido. Volte ao início e continue sua jornada na Purple Fit.
            </p>
            <div className="mt-8">
              <Button href="/">Voltar ao início</Button>
            </div>
          </Reveal>
        </div>

        <Float className="hidden justify-self-center lg:col-span-4 lg:block" amplitude={18} duration={5} rotate={4}>
          <div data-decor>
            <LogoMark size={260} />
          </div>
        </Float>
      </div>
    </section>
  );
}
