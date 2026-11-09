import Image from "next/image";
import { Float } from "@/components/animations/Float";
import { Parallax } from "@/components/animations/Parallax";
import { Reveal } from "@/components/animations/Reveal";
import { TextReveal } from "@/components/animations/TextReveal";
import { HeroVideo } from "@/components/sections/HeroVideo";
import { OpenNow } from "@/components/sections/OpenNow";
import { AppIcon } from "@/components/ui/AppIcon";
import { Button } from "@/components/ui/Button";
import { hours, siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/links";

const cut = "[clip-path:polygon(16%_0,100%_0,100%_84%,84%_100%,0_100%,0_16%)]";

const stats = [
  { value: hours[0].display.replace(" às ", "–"), label: "Segunda a sexta" },
  { value: "4", label: "Modalidades" },
  { value: "Inclusas", label: "Aulas coletivas" },
  { value: "Jaú · SP", label: "Av. Décio Pacheco" },
];

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink">
      {/* Fundo em camadas: brilhos, grade técnica e palavra gigante em contorno */}
      <div aria-hidden="true" data-decor className="absolute inset-0 -z-10">
        <div className="absolute -left-52 top-10 size-[44rem] rounded-full bg-purple/35 blur-[150px]" />
        <div className="absolute -right-40 bottom-0 size-[36rem] rounded-full bg-royal/50 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.07] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>
      <Parallax className="pointer-events-none absolute inset-x-0 top-20 -z-10 select-none" distance={110}>
        <span
          aria-hidden="true"
          data-decor
          className="display outline-text block whitespace-nowrap text-[clamp(9rem,30vw,30rem)] leading-none text-white/[0.09]"
        >
          Purple Fit
        </span>
      </Parallax>

      <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-14 px-5 pb-12 pt-32 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:pt-28">
        {/* Coluna de texto */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="mb-6 flex items-center gap-3 font-display text-xl font-bold uppercase tracking-[0.12em] text-volt sm:text-2xl">
              <span className="h-0.5 w-10 bg-current" aria-hidden="true" data-decor />
              Academia em {siteConfig.city}/{siteConfig.region}
            </p>
          </Reveal>

          <h1 id="hero-title" className="display text-[clamp(3.4rem,9vw,8rem)]">
            <span className="block">
              <TextReveal text="Seu corpo é" immediate delay={0.15} />
            </span>
            <span className="block text-volt">
              <TextReveal text="capaz de" immediate delay={0.4} />
            </span>
            <span className="outline-text block text-white">
              <TextReveal text="mais." immediate delay={0.65} />
            </span>
          </h1>

          <Reveal delay={0.8}>
            <p className="mt-7 max-w-xl text-lg text-white/85 sm:text-xl">
              Academia completa em Jaú, com aulas inclusas e professores sempre presentes para você treinar, evoluir e
              cuidar da saúde com constância.
            </p>
          </Reveal>

          <Reveal delay={0.95}>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Button href={whatsappUrl()} external>
                Quero fazer parte
              </Button>
              <Button href="/#academia" variant="ghost">
                Conheça a academia
              </Button>
            </div>
            <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-white/70">
              <span className="font-display text-lg font-bold uppercase tracking-wider text-white">Aceitamos</span>
              {siteConfig.agreements.map((a) => (
                <span
                  key={a}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-3 py-1.5 font-semibold text-white"
                >
                  <AppIcon name="discount-check" size={18} className="text-volt" />
                  {a}
                </span>
              ))}
            </p>
          </Reveal>
        </div>

        {/* Composição de imagens em camadas */}
        <div className="relative mx-auto w-full max-w-sm sm:max-w-md lg:col-span-5 lg:max-w-none">
          <Reveal delay={0.3} y={50}>
            <div className="relative">
              <div aria-hidden="true" data-decor className={`absolute inset-0 translate-x-4 translate-y-4 bg-volt sm:translate-x-5 sm:translate-y-5 ${cut}`} />
              <Parallax className={`relative aspect-[4/5] bg-grape ${cut}`} distance={26} scale={[1.16, 1.04]}>
                <div className="relative size-full" data-media>
                  <Image
                    src={siteConfig.heroPoster}
                    alt="Atleta realizando levantamento terra em academia com iluminação roxa"
                    fill
                    priority
                    sizes="(min-width: 1024px) 40vw, 90vw"
                    className="object-cover object-[60%_center]"
                  />
                  {siteConfig.heroVideo ? <HeroVideo src={siteConfig.heroVideo} poster={siteConfig.heroPoster} /> : null}
                </div>
              </Parallax>
              <div aria-hidden="true" data-decor className={`absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent ${cut}`} />
            </div>
          </Reveal>

          <Reveal delay={0.7} x={-30} className="absolute left-3 top-4 z-10 sm:left-6 sm:top-6">
            <Float amplitude={8} duration={5}>
              <OpenNow />
            </Float>
          </Reveal>

          <Reveal delay={0.9} x={30} className="absolute -bottom-8 -left-2 z-10 hidden w-[38%] sm:block lg:-left-12">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border-[5px] border-ink bg-grape shadow-2xl" data-media>
              <Image
                src="/images/treinador.webp"
                alt="Professora orientando uma aluna sorridente em um aparelho de musculação"
                fill
                sizes="18vw"
                className="object-cover object-[28%_center]"
              />
            </div>
          </Reveal>

          <Float className="absolute -bottom-10 -right-3 z-10 sm:-right-6" amplitude={10} duration={7}>
            <div className="relative size-32 sm:size-40" data-decor>
              <svg viewBox="0 0 200 200" className="spin-slow absolute inset-0 size-full" aria-hidden="true" data-keep-bg>
                <defs>
                  <path id="circle-text" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                </defs>
                <circle cx="100" cy="100" r="98" fill="#ffd60a" data-keep-bg />
                <text className="fill-ink" fontSize="14" fontWeight="800">
                  <textPath href="#circle-text" textLength="484" lengthAdjust="spacing">
                    AULAS INCLUSAS • PROFESSORES SEMPRE PRESENTES •
                  </textPath>
                </text>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-ink">
                <AppIcon name="barbell" size={44} stroke={1.8} />
              </span>
            </div>
          </Float>
        </div>
      </div>

      {/* Faixa de dados */}
      <Reveal delay={1.1} className="relative mx-auto mt-10 w-full max-w-7xl px-5 pb-8 sm:px-8">
        <dl className="grid grid-cols-2 border-t border-white/20 md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-5 pr-4 ${i > 0 ? "md:border-l md:border-white/15 md:pl-8" : ""} ${i % 2 === 1 ? "pl-4 max-md:border-l max-md:border-white/15" : ""}`}
            >
              <dd className="display text-3xl text-white sm:text-4xl">{s.value}</dd>
              <dt className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-white/60">{s.label}</dt>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
