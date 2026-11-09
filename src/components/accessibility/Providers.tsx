"use client";

import type { ReactNode } from "react";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { AccessibilityPanel } from "@/components/accessibility/AccessibilityPanel";
import { Header } from "@/components/layout/Header";

/** Providers globais: estado de acessibilidade/animações, cabeçalho e painel flutuante. */
export function Providers({ children, footer }: { children: ReactNode; footer: ReactNode }) {
  return (
    <AccessibilityProvider>
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        {children}
      </main>
      {footer}
      <AccessibilityPanel />
    </AccessibilityProvider>
  );
}
