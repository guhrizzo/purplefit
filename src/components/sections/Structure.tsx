import { Reveal } from "@/components/animations/Reveal";
import { Gallery } from "@/components/sections/Gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gallery, siteConfig } from "@/config/site";

export function Structure() {
  return (
    <section id="estrutura" aria-labelledby="structure-title" className="relative overflow-hidden bg-night py-24 sm:py-32">
      <div
        aria-hidden="true"
        data-decor
        className="absolute -right-40 top-20 size-[36rem] rounded-full bg-purple/25 blur-[140px]"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading id="structure-title" eyebrow="Estrutura" title="Espaço para cada tipo de treino." className="lg:col-span-8" />
          <Reveal delay={0.1} className="lg:col-span-4">
            <p className="text-lg text-white/75">
              Salão de musculação, pesos livres e estúdio de aulas coletivas em um só lugar. Toque em uma imagem para
              ampliar.
            </p>
          </Reveal>
        </div>

        <Gallery images={gallery} />

        {siteConfig.imagesAreIllustrative ? (
          <p className="mt-6 text-sm text-white/60">
            Imagens ilustrativas criadas com inteligência artificial. Fotos reais da unidade em breve.
          </p>
        ) : null}
      </div>
    </section>
  );
}
