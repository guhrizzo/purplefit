"use client";

import { useSyncExternalStore } from "react";
import { useAnimationsEnabled } from "@/contexts/AccessibilityContext";

interface HeroVideoProps {
  src: string;
  poster: string;
}

interface NavigatorWithConnection extends Navigator {
  connection?: { saveData?: boolean };
}

const subscribe = () => () => {};
const getSaveData = () => (navigator as NavigatorWithConnection).connection?.saveData === true;

/**
 * Vídeo de fundo opcional. Só é carregado quando as animações estão ativas
 * e o usuário não pediu economia de dados. O poster permanece como fallback.
 */
export function HeroVideo({ src, poster }: HeroVideoProps) {
  const enabled = useAnimationsEnabled();
  const saveData = useSyncExternalStore(subscribe, getSaveData, () => false);

  if (!enabled || saveData) return null;

  return (
    <video
      className="absolute inset-0 size-full object-cover"
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
      data-media
    />
  );
}
