import Image from "next/image";
import Link from "next/link";
import { AppIcon } from "@/components/ui/AppIcon";
import { Logo } from "@/components/ui/Logo";
import { CurrentYear } from "@/components/layout/CurrentYear";
import { navItems, siteConfig } from "@/config/site";
import { fullAddress, whatsappUrl } from "@/lib/links";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-white" aria-label="Rodapé">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo size={48} />
          <p className="mt-6 max-w-sm text-white/70">{siteConfig.tagline}</p>
          <a
            href={siteConfig.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-volt hover:underline"
          >
            <AppIcon name="instagram" size={22} />
            {siteConfig.instagram.handle}
            <span className="sr-only">(abre o Instagram em nova aba)</span>
          </a>
        </div>

        <nav aria-label="Rodapé" className="md:col-span-3">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-violet">Navegação</h2>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="inline-flex min-h-11 items-center text-white/80 hover:text-volt">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-violet">Contato</h2>
          <address className="space-y-3 not-italic text-white/80">
            <p className="flex gap-3">
              <AppIcon name="map-pin" size={22} className="mt-0.5 shrink-0 text-volt" />
              {fullAddress}
            </p>
            <p>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-3 hover:text-volt"
              >
                <AppIcon name="whatsapp" size={22} className="text-volt" />
                WhatsApp {siteConfig.whatsapp.display}
                <span className="sr-only">(abre em nova aba)</span>
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 text-sm text-white/60 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © <CurrentYear /> {siteConfig.fullName}. Todos os direitos reservados.
          </p>
          <ul className="flex flex-wrap gap-x-6">
            <li>
              <Link href="/privacidade" className="inline-flex min-h-11 items-center hover:text-volt">
                Política de privacidade
              </Link>
            </li>
            <li>
              <Link href="/acessibilidade" className="inline-flex min-h-11 items-center hover:text-volt">
                Acessibilidade
              </Link>
            </li>
          </ul>
          <a
            href="https://www.instagram.com/rizzoweb/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-11 items-center gap-3 whitespace-nowrap hover:text-white"
          >
            Desenvolvido por
            <Image
              src="/branding/rizzoweb.webp"
              alt=""
              width={36}
              height={36}
              className="size-9 rounded-lg transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
              data-keep-bg
            />
            <span className="font-display text-xl font-bold uppercase tracking-wide text-white">Rizzo Web</span>
            <span className="sr-only">(abre o Instagram em nova aba)</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
