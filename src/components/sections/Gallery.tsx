"use client";

import { IconChevronLeft, IconChevronRight, IconX, IconZoomIn } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useId, useRef, useState } from "react";
import { Reveal } from "@/components/animations/Reveal";
import { useAnimationsEnabled } from "@/contexts/AccessibilityContext";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import type { GalleryImage } from "@/types/site";

const spans = [
  "md:col-span-7 md:row-span-2",
  "md:col-span-5 md:row-span-2",
  "md:col-span-4 md:row-span-2",
  "md:col-span-4 md:row-span-2",
  "md:col-span-4 md:row-span-2",
];

export function Gallery({ images }: { images: GalleryImage[] }) {
  const enabled = useAnimationsEnabled();
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  useFocusTrap(dialogRef, open, close);

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
  );

  const current = index !== null ? images[index] : null;

  return (
    <>
      <ul className="grid auto-rows-[18rem] gap-4 md:auto-rows-[15rem] md:grid-cols-12 lg:auto-rows-[17rem]">
        {images.map((img, i) => (
          <Reveal as="li" key={img.src} delay={(i % 3) * 0.08} className={`min-h-0 ${spans[i] ?? "md:col-span-4 md:row-span-2"}`}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-haspopup="dialog"
              aria-label={`Ampliar imagem: ${img.caption}`}
              className="group relative block size-full overflow-hidden rounded-3xl bg-grape text-left"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 40vw, 92vw"
                className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-110"
                data-media
              />
              <span
                aria-hidden="true"
                data-decor
                className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                <span className="display text-3xl">{img.caption}</span>
                <span className="flex size-11 shrink-0 translate-y-2 items-center justify-center rounded-full bg-volt text-ink opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  <IconZoomIn size={22} aria-hidden="true" />
                </span>
              </span>
            </button>
          </Reveal>
        ))}
      </ul>

      <AnimatePresence>
        {open && current ? (
          <motion.div
            ref={dialogRef}
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") go(1);
              if (e.key === "ArrowLeft") go(-1);
            }}
            className="fixed inset-0 z-[90] flex flex-col bg-black/95 p-4 sm:p-8"
            initial={enabled ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            exit={enabled ? { opacity: 0 } : undefined}
          >
            <div className="flex items-center justify-between gap-4">
              <p id={titleId} className="display text-2xl sm:text-3xl">
                {current.caption}
                <span className="ml-3 font-sans text-sm font-medium normal-case text-white/60" aria-live="polite">
                  {(index ?? 0) + 1} de {images.length}
                </span>
              </p>
              <button
                type="button"
                onClick={close}
                aria-label="Fechar imagem ampliada"
                className="inline-flex size-12 items-center justify-center rounded-full border border-white/30"
              >
                <IconX size={24} aria-hidden="true" />
              </button>
            </div>

            <div className="relative my-4 flex min-h-0 flex-1 items-center justify-center">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Imagem anterior"
                className="absolute left-0 z-10 inline-flex size-12 items-center justify-center rounded-full bg-ink/80 sm:size-14"
              >
                <IconChevronLeft size={26} aria-hidden="true" />
              </button>
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                sizes="100vw"
                className="max-h-full w-auto max-w-full rounded-2xl object-contain"
              />
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Próxima imagem"
                className="absolute right-0 z-10 inline-flex size-12 items-center justify-center rounded-full bg-ink/80 sm:size-14"
              >
                <IconChevronRight size={26} aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
