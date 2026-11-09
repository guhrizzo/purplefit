import { Reveal } from "@/components/animations/Reveal";
import { AppIcon } from "@/components/ui/AppIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { differentials } from "@/config/site";

export function Differentials() {
  return (
    <section id="diferenciais" aria-labelledby="dif-title" className="bg-volt py-24 text-ink sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <SectionHeading id="dif-title" eyebrow="Diferenciais" title="Por que treinar na Purple Fit." tone="light">
            <p className="font-medium">Tudo o que já oferecemos hoje, sem promessa vazia.</p>
          </SectionHeading>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
          {differentials.map((d, i) => (
            <Reveal as="li" key={d.title} delay={(i % 2) * 0.1} className={i % 2 === 1 ? "sm:mt-10" : ""}>
              <article className="group relative h-full overflow-hidden rounded-3xl bg-ink p-7 text-white transition-colors duration-500 hover:bg-royal">
                <span
                  aria-hidden="true"
                  data-decor
                  className="display absolute -right-2 -top-4 text-8xl text-white/[0.07] transition-colors group-hover:text-white/15"
                >
                  0{i + 1}
                </span>
                <span className="mb-8 flex size-14 items-center justify-center rounded-2xl bg-volt text-ink transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <AppIcon name={d.icon} size={28} />
                </span>
                <h3 className="display text-3xl">{d.title}</h3>
                <p className="mt-3 text-white/75">{d.description}</p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
