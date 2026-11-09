import { Reveal } from "@/components/animations/Reveal";
import { AppIcon } from "@/components/ui/AppIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { hours, siteConfig } from "@/config/site";
import { fullAddress, mapsEmbedUrl, mapsSearchUrl, whatsappUrl } from "@/lib/links";

export function Contact() {
  return (
    <section id="contato" aria-labelledby="contact-title" className="bg-paper py-24 text-ink sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading id="contact-title" eyebrow="Localização e contato" title="Venha nos visitar." tone="light" />

          <Reveal delay={0.1}>
            <address className="mt-10 space-y-6 not-italic">
              <div className="flex gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-purple text-white">
                  <AppIcon name="map-pin" size={24} />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/60">Endereço</p>
                  <p className="text-lg font-semibold">{fullAddress}</p>
                  <a
                    href={mapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex min-h-11 items-center gap-2 font-bold text-purple underline underline-offset-4"
                  >
                    Como chegar <span className="sr-only">(abre o Google Maps em nova aba)</span>
                    <AppIcon name="arrow-up-right" size={18} />
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-purple text-white">
                  <AppIcon name="clock" size={24} />
                </span>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/60">Horário de funcionamento</p>
                  <dl className="mt-2 divide-y divide-ink/15 border-y border-ink/15">
                    {hours.map((h) => (
                      <div key={h.label} className="flex items-center justify-between gap-4 py-2.5">
                        <dt className="font-medium">{h.label}</dt>
                        <dd className="font-display text-xl font-bold">{h.display}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-purple text-white">
                  <AppIcon name="whatsapp" size={24} />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/60">WhatsApp</p>
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center text-lg font-semibold underline underline-offset-4 hover:text-purple"
                  >
                    {siteConfig.whatsapp.display}
                    <span className="sr-only">(abre o WhatsApp em nova aba)</span>
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-purple text-white">
                  <AppIcon name="instagram" size={24} />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink/60">Instagram</p>
                  <a
                    href={siteConfig.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center text-lg font-semibold underline underline-offset-4 hover:text-purple"
                  >
                    {siteConfig.instagram.handle}
                    <span className="sr-only">(abre o Instagram em nova aba)</span>
                  </a>
                </div>
              </div>
            </address>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-7">
          <div className="relative h-full min-h-[22rem] overflow-hidden rounded-[2rem] border-4 border-ink bg-lilac shadow-[12px_12px_0_0_var(--color-purple)] sm:min-h-[30rem]">
            <iframe
              title={`Mapa do Google Maps com a localização da ${siteConfig.fullName}`}
              src={mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 size-full border-0"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
