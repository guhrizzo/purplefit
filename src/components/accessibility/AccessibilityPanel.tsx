"use client";

import {
  IconAccessible,
  IconAnalyze,
  IconContrast,
  IconContrast2,
  IconHandStop,
  IconLink,
  IconPlayerPlay,
  IconRefresh,
  IconTextDecrease,
  IconTextIncrease,
  IconTypography,
  IconLineHeight,
  IconX,
} from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useId, useRef, useState, type ReactNode } from "react";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { FONT_STEPS, MAX_FONT_STEP } from "@/lib/a11y-store";

interface ToggleProps {
  label: string;
  icon: ReactNode;
  pressed: boolean;
  onClick: () => void;
}

function Toggle({ label, icon, pressed, onClick }: ToggleProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`flex min-h-16 flex-col items-start justify-between gap-2 rounded-xl border-2 p-3 text-left text-sm font-semibold transition-colors ${
        pressed
          ? "border-volt bg-volt text-ink"
          : "border-white/20 bg-white/5 text-white hover:border-white/60"
      }`}
    >
      <span aria-hidden="true">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

export function AccessibilityPanel() {
  const { prefs, animationsEnabled, update, increaseFont, decreaseFont, reset } = useAccessibility();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const close = useCallback(() => setOpen(false), []);
  useFocusTrap(panelRef, open, close);

  const announce = (msg: string) => setStatus(msg);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label="Abrir painel de acessibilidade"
        data-no-highlight
        className="fixed bottom-4 left-3 z-[60] flex size-12 items-center justify-center rounded-full bg-volt text-ink shadow-[0_8px_30px_rgba(0,0,0,0.45)] transition-[width] duration-300 sm:bottom-auto sm:left-0 sm:top-1/2 sm:size-14 sm:-translate-y-1/2 sm:rounded-l-none sm:rounded-r-2xl sm:hover:w-16"
      >
        <IconAccessible size={32} stroke={1.8} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[70] bg-black/60"
              data-decor
              aria-hidden="true"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              key="panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              tabIndex={-1}
              className="fixed inset-y-0 left-0 z-[80] flex w-full max-w-md flex-col overflow-y-auto bg-night p-5 text-white shadow-2xl sm:p-6"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <h2 id={titleId} className="display text-3xl">
                  Acessibilidade
                </h2>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Fechar painel de acessibilidade"
                  className="inline-flex size-12 items-center justify-center rounded-full border border-white/30"
                >
                  <IconX size={22} aria-hidden="true" />
                </button>
              </div>

              <p className="mb-5 text-sm text-white/70">
                Ajuste o site ao seu jeito. Suas escolhas ficam salvas neste navegador.
              </p>

              <section aria-label="Tamanho da fonte" className="mb-4 rounded-xl border-2 border-white/20 bg-white/5 p-3">
                <p className="mb-2 text-sm font-semibold">
                  Tamanho da fonte: <span>{FONT_STEPS[prefs.fontStep]}</span>
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      decreaseFont();
                      announce("Fonte diminuída");
                    }}
                    disabled={prefs.fontStep === 0}
                    className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white/10 font-semibold hover:bg-white/20 disabled:opacity-40"
                  >
                    <IconTextDecrease size={22} aria-hidden="true" /> Diminuir
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      increaseFont();
                      announce("Fonte aumentada");
                    }}
                    disabled={prefs.fontStep === MAX_FONT_STEP}
                    className="flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white/10 font-semibold hover:bg-white/20 disabled:opacity-40"
                  >
                    <IconTextIncrease size={22} aria-hidden="true" /> Aumentar
                  </button>
                </div>
              </section>

              <div className="grid grid-cols-2 gap-3">
                <Toggle
                  label="Alto contraste"
                  icon={<IconContrast size={26} />}
                  pressed={prefs.contrast === "high"}
                  onClick={() => {
                    const next = prefs.contrast === "high" ? "default" : "high";
                    update({ contrast: next });
                    announce(next === "high" ? "Alto contraste ativado" : "Alto contraste desativado");
                  }}
                />
                <Toggle
                  label="Contraste negativo"
                  icon={<IconContrast2 size={26} />}
                  pressed={prefs.contrast === "negative"}
                  onClick={() => {
                    const next = prefs.contrast === "negative" ? "default" : "negative";
                    update({ contrast: next });
                    announce(next === "negative" ? "Contraste negativo ativado" : "Contraste negativo desativado");
                  }}
                />
                <Toggle
                  label="Escala de cinza"
                  icon={<IconAnalyze size={26} />}
                  pressed={prefs.grayscale}
                  onClick={() => {
                    update({ grayscale: !prefs.grayscale });
                    announce(!prefs.grayscale ? "Escala de cinza ativada" : "Escala de cinza desativada");
                  }}
                />
                <Toggle
                  label="Destacar links"
                  icon={<IconLink size={26} />}
                  pressed={prefs.highlightLinks}
                  onClick={() => {
                    update({ highlightLinks: !prefs.highlightLinks });
                    announce(!prefs.highlightLinks ? "Links destacados" : "Destaque de links removido");
                  }}
                />
                <Toggle
                  label="Fonte de leitura acessível"
                  icon={<IconTypography size={26} />}
                  pressed={prefs.readableFont}
                  onClick={() => {
                    update({ readableFont: !prefs.readableFont });
                    announce(!prefs.readableFont ? "Fonte de leitura ativada" : "Fonte padrão restaurada");
                  }}
                />
                <Toggle
                  label="Espaçamento de texto"
                  icon={<IconLineHeight size={26} />}
                  pressed={prefs.textSpacing}
                  onClick={() => {
                    update({ textSpacing: !prefs.textSpacing });
                    announce(!prefs.textSpacing ? "Espaçamento ampliado" : "Espaçamento padrão");
                  }}
                />
              </div>

              <section aria-label="Animações" className="mt-4 rounded-xl border-2 border-white/20 bg-white/5 p-3">
                <p className="mb-2 text-sm font-semibold">
                  Animações: <span>{animationsEnabled ? "ativadas" : "desativadas"}</span>
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    aria-pressed={!animationsEnabled}
                    onClick={() => {
                      update({ animations: false });
                      announce("Animações desativadas");
                    }}
                    className={`flex min-h-12 items-center justify-center gap-2 rounded-lg font-semibold ${
                      !animationsEnabled ? "bg-volt text-ink" : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    <IconHandStop size={22} aria-hidden="true" /> Desativar
                  </button>
                  <button
                    type="button"
                    aria-pressed={animationsEnabled}
                    onClick={() => {
                      update({ animations: true });
                      announce("Animações ativadas");
                    }}
                    className={`flex min-h-12 items-center justify-center gap-2 rounded-lg font-semibold ${
                      animationsEnabled ? "bg-volt text-ink" : "bg-white/10 hover:bg-white/20"
                    }`}
                  >
                    <IconPlayerPlay size={22} aria-hidden="true" /> Ativar
                  </button>
                </div>
              </section>

              <button
                type="button"
                onClick={() => {
                  reset();
                  announce("Configurações restauradas ao padrão");
                }}
                className="mt-5 flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-white/40 font-bold uppercase tracking-wider hover:bg-white hover:text-ink"
              >
                <IconRefresh size={20} aria-hidden="true" /> Restaurar padrão
              </button>

              <p role="status" aria-live="polite" className="mt-4 min-h-6 text-sm font-semibold text-volt">
                {status}
              </p>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
