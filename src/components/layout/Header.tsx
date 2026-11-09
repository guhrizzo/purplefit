"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { useAnimationsEnabled } from "@/contexts/AccessibilityContext";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { navItems } from "@/config/site";
import { whatsappUrl } from "@/lib/links";

const sectionIds = navItems.map((n) => n.id);

export function Header() {
  const enabled = useAnimationsEnabled();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const sectionActive = useActiveSection(sectionIds);
  const active = isHome ? sectionActive : "";
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);
  useFocusTrap(menuRef, open, close);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    setHidden(latest > prev && latest > 240 && !open);
  });

  const hide = enabled && hidden;

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || open || !isHome ? "bg-ink/90 backdrop-blur-xl" : "bg-transparent"
        }`}
        animate={{ y: hide ? "-100%" : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
          <Link href="/#inicio" aria-label="Rede Purple Fit Bombeiro - ir para o início" data-no-highlight className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Principal" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "location" : undefined}
                      className={`relative inline-flex min-h-11 items-center whitespace-nowrap px-3.5 font-display text-[1.35rem] font-bold uppercase tracking-[0.04em] transition-colors ${
                        isActive ? "text-volt" : "text-white/80 hover:text-white"
                      }`}
                    >
                      {item.label}
                      {isActive ? (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-3.5 -bottom-0.5 h-0.5 bg-volt"
                          aria-hidden="true"
                          data-decor
                        />
                      ) : null}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-11 items-center rounded-full bg-volt px-5 text-xs font-extrabold uppercase tracking-[0.1em] text-ink transition-colors hover:bg-white sm:inline-flex"
            >
              Quero me matricular
              <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
            </a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="inline-flex size-12 items-center justify-center rounded-full border border-white/25 xl:hidden"
            >
              {open ? <IconX size={24} aria-hidden="true" /> : <IconMenu2 size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="menu"
            id="menu-mobile"
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            tabIndex={-1}
            className="fixed inset-0 z-40 flex flex-col bg-night px-6 pb-8 pt-24 xl:hidden"
            initial={enabled ? { x: "100%" } : false}
            animate={{ x: 0 }}
            exit={enabled ? { x: "100%" } : { opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav aria-label="Menu mobile">
              <ul className="flex flex-col">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={enabled ? { opacity: 0, x: 40 } : false}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                    className="border-b border-white/10"
                  >
                    <a
                      href={item.href}
                      onClick={close}
                      aria-current={active === item.id ? "location" : undefined}
                      className="display flex min-h-16 items-center justify-between text-4xl"
                    >
                      <span className={active === item.id ? "text-volt" : ""}>{item.label}</span>
                      <span className="text-sm font-sans font-medium text-white/50" aria-hidden="true">
                        0{i + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="mt-auto inline-flex min-h-14 items-center justify-center rounded-full bg-volt px-6 text-base font-extrabold uppercase tracking-[0.08em] text-ink"
            >
              Quero me matricular
              <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
