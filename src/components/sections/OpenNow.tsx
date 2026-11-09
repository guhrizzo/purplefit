"use client";

import { IconClock } from "@tabler/icons-react";
import { useSyncExternalStore } from "react";
import { getOpenStatus } from "@/lib/open-status";

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
}

const getSnapshot = () => JSON.stringify(getOpenStatus());
const getServerSnapshot = () => null;

/** Cartão "Aberto agora": calculado no navegador, a partir dos horários reais da config. */
export function OpenNow() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const status = raw ? (JSON.parse(raw) as ReturnType<typeof getOpenStatus>) : null;

  return (
    <div className="flex min-w-44 items-center gap-3 rounded-2xl border border-white/15 bg-ink/85 p-3.5 pr-5 shadow-2xl backdrop-blur-md">
      <span
        className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
          status?.open ? "bg-volt text-ink" : "bg-white/10 text-white"
        }`}
      >
        <IconClock size={24} stroke={2} aria-hidden="true" />
      </span>
      <p className="leading-tight" role="status">
        <span className="block font-display text-xl font-bold uppercase tracking-wide">
          {status?.title ?? "Horário de funcionamento"}
        </span>
        <span className="block text-sm text-white/70">{status?.detail ?? "Seg a sex, 05h às 23h"}</span>
      </p>
    </div>
  );
}
