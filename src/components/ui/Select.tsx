"use client";

import { IconCheck, IconChevronDown } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { useAnimationsEnabled } from "@/contexts/AccessibilityContext";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  name: string;
  options: SelectOption[];
  placeholder: string;
  invalid?: boolean;
  describedBy?: string;
}

/**
 * Seletor próprio da marca (padrão ARIA "select-only combobox").
 * Teclado: setas, Home/End, Enter/Espaço, Esc, digitação da primeira letra.
 * O valor vai para o formulário por um input oculto com o `name` informado.
 */
export function Select({ id, name, options, placeholder, invalid, describedBy }: SelectProps) {
  const enabled = useAnimationsEnabled();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [active, setActive] = useState(0);

  const selectedIndex = options.findIndex((o) => o.value === value);
  const selected = selectedIndex >= 0 ? options[selectedIndex] : null;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (open) listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  function openList() {
    setActive(selectedIndex >= 0 ? selectedIndex : 0);
    setOpen(true);
  }

  function choose(index: number) {
    setValue(options[index].value);
    setOpen(false);
    buttonRef.current?.focus();
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    const last = options.length - 1;

    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((i) => Math.min(i + 1, last));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(last);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        choose(active);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        if (e.key.length === 1) {
          const letter = e.key.toLocaleLowerCase("pt-BR");
          const from = (active + 1) % options.length;
          const ordered = [...options.slice(from), ...options.slice(0, from)];
          const hit = ordered.find((o) => o.label.toLocaleLowerCase("pt-BR").startsWith(letter));
          if (hit) setActive(options.indexOf(hit));
        }
    }
  }

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={value} />

      <button
        ref={buttonRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        aria-required="true"
        aria-invalid={invalid ? true : undefined}
        aria-describedby={describedBy}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`group flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border-2 bg-ink/40 py-1.5 pl-4 pr-1.5 text-left transition-colors duration-300 hover:bg-ink/60 ${
          open ? "border-volt" : invalid ? "border-volt/80" : "border-white/40"
        }`}
      >
        <span className={selected ? "font-semibold text-white" : "text-white/55"}>
          {selected ? selected.label : placeholder}
        </span>
        <span
          aria-hidden="true"
          className={`flex size-9 shrink-0 items-center justify-center rounded-lg bg-volt text-ink transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          <IconChevronDown size={20} stroke={3} />
        </span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-labelledby={id}
            tabIndex={-1}
            initial={enabled ? { opacity: 0, y: -10, scale: 0.97 } : false}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={enabled ? { opacity: 0, y: -6, scale: 0.98 } : { opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "top" }}
            className="absolute inset-x-0 top-full z-30 mt-2 max-h-72 overflow-y-auto overscroll-contain rounded-2xl border-2 border-volt bg-night p-1.5 shadow-[0_24px_60px_-10px_rgba(0,0,0,0.7)]"
          >
            {options.map((option, i) => {
              const isSelected = option.value === value;
              const isActive = i === active;
              return (
                <li
                  key={option.value}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={isSelected}
                  onPointerEnter={() => setActive(i)}
                  onPointerDown={(e) => e.preventDefault()}
                  onClick={() => choose(i)}
                  className={`flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-xl px-4 font-display text-xl font-bold uppercase tracking-wide transition-colors duration-150 ${
                    isActive ? "bg-purple text-white" : isSelected ? "text-volt" : "text-white/85"
                  }`}
                >
                  {option.label}
                  {isSelected ? <IconCheck size={20} stroke={3} aria-hidden="true" className="text-volt" /> : null}
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
