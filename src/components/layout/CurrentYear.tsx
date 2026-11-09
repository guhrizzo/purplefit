"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Ano corrente calculado no cliente (evita data fixa no HTML estático). */
export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => String(new Date().getFullYear()),
    () => "2026",
  );
  return <>{year}</>;
}
