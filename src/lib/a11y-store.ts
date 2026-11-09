import { z } from "zod";

/**
 * Store global das preferências de acessibilidade e de animação.
 * É a única fonte de verdade: a UI lê daqui (via AccessibilityProvider) e o DOM
 * é atualizado por `applyPrefsToDom`. O estado padrão mantém as animações LIGADAS,
 * independente de `prefers-reduced-motion` do sistema.
 */

export const STORAGE_KEY = "purplefit:a11y:v1";
export const FONT_STEPS = ["100%", "112.5%", "125%", "143.75%", "162.5%"] as const;
export const MAX_FONT_STEP = FONT_STEPS.length - 1;

const prefsSchema = z.object({
  fontStep: z.number().int().min(0).max(MAX_FONT_STEP),
  contrast: z.enum(["default", "high", "negative"]),
  grayscale: z.boolean(),
  highlightLinks: z.boolean(),
  readableFont: z.boolean(),
  textSpacing: z.boolean(),
  animations: z.boolean(),
});

export type A11yPrefs = z.infer<typeof prefsSchema>;

export const DEFAULT_PREFS: A11yPrefs = {
  fontStep: 0,
  contrast: "default",
  grayscale: false,
  highlightLinks: false,
  readableFont: false,
  textSpacing: false,
  animations: true,
};

let current: A11yPrefs = DEFAULT_PREFS;
let loaded = false;
const listeners = new Set<() => void>();

function read(): A11yPrefs {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREFS;
    const parsed = prefsSchema.partial().safeParse(JSON.parse(raw));
    if (!parsed.success) return DEFAULT_PREFS;
    return { ...DEFAULT_PREFS, ...parsed.data };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function applyPrefsToDom(prefs: A11yPrefs) {
  const el = document.documentElement;
  el.style.fontSize = FONT_STEPS[prefs.fontStep];
  el.dataset.contrast = prefs.contrast;
  el.dataset.negative = String(prefs.contrast === "negative");
  el.dataset.links = String(prefs.highlightLinks);
  el.dataset.readable = String(prefs.readableFont);
  el.dataset.spacing = String(prefs.textSpacing);
  el.dataset.animations = prefs.animations ? "on" : "off";

  const filters: string[] = [];
  if (prefs.grayscale) filters.push("grayscale(1)");
  if (prefs.contrast === "negative") filters.push("invert(1) hue-rotate(180deg)");
  el.style.setProperty("--a11y-filter", filters.length ? filters.join(" ") : "none");
}

export function getSnapshot(): A11yPrefs {
  if (!loaded && typeof window !== "undefined") {
    current = read();
    loaded = true;
    applyPrefsToDom(current);
  }
  return current;
}

export function getServerSnapshot(): A11yPrefs {
  return DEFAULT_PREFS;
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setPrefs(patch: Partial<A11yPrefs>) {
  current = { ...getSnapshot(), ...patch };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    /* armazenamento indisponível: a preferência vale apenas nesta visita */
  }
  applyPrefsToDom(current);
  listeners.forEach((l) => l());
}

export function resetPrefs() {
  current = DEFAULT_PREFS;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignora */
  }
  applyPrefsToDom(current);
  listeners.forEach((l) => l());
}
