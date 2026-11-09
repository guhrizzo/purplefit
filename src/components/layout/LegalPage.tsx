import type { ReactNode } from "react";

interface LegalPageProps {
  title: string;
  updated: string;
  children: ReactNode;
}

/** Layout simples e legível para páginas institucionais (privacidade, acessibilidade). */
export function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <article className="bg-paper pb-24 pt-36 text-ink">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-purple">Rede Purple Fit Bombeiro</p>
        <h1 className="display text-[clamp(2.6rem,7vw,4.5rem)]">{title}</h1>
        <p className="mt-3 text-sm text-ink/70">Última atualização: {updated}</p>
        <div className="mt-10 space-y-5 text-lg leading-relaxed [&_a]:font-semibold [&_a]:text-purple [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:uppercase [&_li]:ml-6 [&_li]:list-disc [&_li]:pl-1">
          {children}
        </div>
      </div>
    </article>
  );
}
