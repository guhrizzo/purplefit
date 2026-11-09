import Image from "next/image";
import { Parallax } from "@/components/animations/Parallax";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { EnrollForm } from "@/components/sections/EnrollForm";
import { Button } from "@/components/ui/Button";
import { whatsappUrl } from "@/lib/links";

export function EnrollCTA() {
  return (
    <section
      id="matricula"
      aria-labelledby="enroll-title"
      className="relative isolate overflow-hidden bg-royal py-24 sm:py-32"
    >
      <Parallax className="absolute inset-0 -z-10 opacity-35 mix-blend-luminosity" distance={50} scale={[1.15, 1.05]}>
        <div className="relative size-full" data-decor>
          <Image src="/images/cta-kettlebell.webp" alt="" fill sizes="100vw" className="object-cover" data-media />
        </div>
      </Parallax>
      <div aria-hidden="true" data-decor className="absolute inset-0 -z-10 bg-gradient-to-b from-royal via-royal/60 to-ink/70" />

      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-volt">Matrículas abertas</p>
          </Reveal>
          <h2 id="enroll-title" className="display text-[clamp(3rem,9vw,7.5rem)]">
            <TextReveal text="Sua jornada começa agora." />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-lg text-lg text-white/90">
              Dê o primeiro passo: fale com a nossa equipe pelo WhatsApp, tire suas dúvidas e comece a treinar.
            </p>
            <div className="mt-8">
              <Button href={whatsappUrl()} external>
                Quero me matricular
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="lg:col-span-5">
          <div className="rounded-3xl border border-white/20 bg-ink/60 p-6 backdrop-blur-md sm:p-8">
            <h3 className="display mb-6 text-3xl">Prefere que a gente te chame?</h3>
            <EnrollForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
