import Image from "next/image";
import { Parallax } from "@/components/animations/Parallax";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";

const facts = [
  { value: "05h–23h", label: "De segunda a sexta" },
  { value: "4", label: "Modalidades: musculação, Ritmosfera, pilates e ballet" },
  { value: "2", label: "Convênios aceitos: Wellhub e TotalPass" },
];

export function About() {
  return (
    <section id="academia" aria-labelledby="about-title" className="relative overflow-hidden bg-paper py-24 text-ink sm:py-32">
      <span
        aria-hidden="true"
        data-decor
        className="display outline-text pointer-events-none absolute -right-6 top-6 select-none text-[clamp(8rem,24vw,22rem)] text-purple/15"
      >
        Purple
      </span>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-12">
        <div className="relative lg:col-span-6">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-grape sm:aspect-[5/6]">
              <Parallax className="absolute inset-0" distance={36} scale={[1.14, 1.06]}>
                <Image
                  src="/images/treinador.webp"
                  alt="Professora orientando uma aluna sorridente em um aparelho de musculação"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                  data-media
                />
              </Parallax>
            </div>
          </Reveal>
          <Reveal delay={0.2} x={30} className="absolute -bottom-10 -right-2 w-[46%] sm:-right-8">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border-[6px] border-paper bg-grape shadow-2xl">
              <Image
                src="/images/halteres.webp"
                alt="Halteres cromados em um rack de academia"
                fill
                sizes="(min-width: 1024px) 20vw, 45vw"
                className="object-cover"
                data-media
              />
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:pl-6">
          <SectionHeading id="about-title" eyebrow="A academia" title="Treino com constância, do seu jeito." tone="light">
            <p>
              A {siteConfig.fullName} reúne, em Jaú, o que você precisa para cuidar da saúde: musculação, aulas
              coletivas e professores sempre presentes no salão.
            </p>
          </SectionHeading>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg text-ink/80">
              Cuidar da saúde é ter organização e constância. Por isso, nossos horários são amplos e as aulas ajudam
              a encaixar o treino na sua rotina, sem complicação.
            </p>
          </Reveal>

          <dl className="mt-12 grid gap-8 border-t-2 border-ink/15 pt-8 sm:grid-cols-3">
            {facts.map((fact, i) => (
              <Reveal key={fact.value} delay={0.1 * i}>
                <dt className="display text-5xl text-purple">{fact.value}</dt>
                <dd className="mt-2 text-sm font-medium text-ink/75">{fact.label}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
