import Image from "next/image";
import { Reveal } from "@/components/animations/Reveal";
import { AppIcon } from "@/components/ui/AppIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { modalities } from "@/config/site";

export function Modalities() {
  return (
    <section id="modalidades" aria-labelledby="mod-title" className="bg-lilac py-24 text-ink sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading id="mod-title" eyebrow="Modalidades" title="Escolha o seu ritmo." tone="light">
          <p>Do salão de musculação às aulas coletivas: encontre o treino que combina com você.</p>
        </SectionHeading>

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {modalities.map((m, i) => (
            <Reveal as="li" key={m.slug} delay={i * 0.1} className={i % 2 === 1 ? "lg:mt-14" : ""}>
              <article className="group relative isolate aspect-[3/4] overflow-hidden rounded-3xl bg-grape text-white transition-transform duration-500 hover:-translate-y-2">
                <Image
                  src={m.image}
                  alt={m.alt}
                  fill
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 92vw"
                  className="-z-10 object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-110"
                  data-media
                />
                <div
                  aria-hidden="true"
                  data-decor
                  className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-ink/10"
                />
                <div className="flex size-full flex-col justify-between p-6">
                  <div className="flex items-start justify-between">
                    <span className="display outline-text text-6xl text-white/90" aria-hidden="true">
                      0{i + 1}
                    </span>
                    <span className="flex size-12 items-center justify-center rounded-full bg-volt text-ink transition-transform duration-500 group-hover:rotate-12">
                      <AppIcon name={m.icon} size={26} />
                    </span>
                  </div>
                  <div>
                    <h3 className="display text-4xl text-volt">{m.name}</h3>
                    <p className="mt-3 text-[0.95rem] leading-snug text-white/90">{m.description}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
