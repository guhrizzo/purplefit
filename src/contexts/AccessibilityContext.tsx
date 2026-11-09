"use client";

import { MotionConfig } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  MAX_FONT_STEP,
  getServerSnapshot,
  getSnapshot,
  resetPrefs,
  setPrefs,
  subscribe,
  type A11yPrefs,
} from "@/lib/a11y-store";

interface AccessibilityValue {
  prefs: A11yPrefs;
  /** Estado global das animações. Padrão: true (mesmo com prefers-reduced-motion). */
  animationsEnabled: boolean;
  update: (patch: Partial<A11yPrefs>) => void;
  increaseFont: () => void;
  decreaseFont: () => void;
  reset: () => void;
}

const AccessibilityContext = createContext<AccessibilityValue | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const prefs = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const increaseFont = useCallback(
    () => setPrefs({ fontStep: Math.min(MAX_FONT_STEP, getSnapshot().fontStep + 1) }),
    [],
  );
  const decreaseFont = useCallback(
    () => setPrefs({ fontStep: Math.max(0, getSnapshot().fontStep - 1) }),
    [],
  );

  const value = useMemo<AccessibilityValue>(
    () => ({
      prefs,
      animationsEnabled: prefs.animations,
      update: setPrefs,
      increaseFont,
      decreaseFont,
      reset: resetPrefs,
    }),
    [prefs, increaseFont, decreaseFont],
  );

  return (
    <AccessibilityContext.Provider value={value}>
      {/*
        reducedMotion="never": o Motion NÃO herda `prefers-reduced-motion` do sistema.
        Quem decide é exclusivamente o estado global (preferência do usuário no painel).
      */}
      <MotionConfig
        reducedMotion="never"
        transition={prefs.animations ? undefined : { duration: 0, delay: 0 }}
      >
        {children}
      </MotionConfig>
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility(): AccessibilityValue {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error("useAccessibility deve ser usado dentro de AccessibilityProvider");
  return ctx;
}

/** Atalho: componentes de animação consultam apenas este hook. */
export function useAnimationsEnabled(): boolean {
  return useAccessibility().animationsEnabled;
}
