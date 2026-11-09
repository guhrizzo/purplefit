import { hours } from "@/config/site";

const PT_DAYS: Record<string, string> = {
  Sunday: "domingo",
  Monday: "segunda",
  Tuesday: "terça",
  Wednesday: "quarta",
  Thursday: "quinta",
  Friday: "sexta",
  Saturday: "sábado",
};
const ORDER = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export interface OpenStatus {
  open: boolean;
  title: string;
  detail: string;
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

const label = (hhmm: string) => {
  const [h, m] = hhmm.split(":");
  return m === "00" ? `${h}h` : `${h}h${m}`;
};

function nowInSaoPaulo(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return { weekday: get("weekday"), minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

/**
 * Situação de funcionamento com base nos horários padrão (fuso de Brasília).
 * Feriados seguem o horário de sábado, mas não são detectados automaticamente.
 */
export function getOpenStatus(date: Date = new Date()): OpenStatus {
  const { weekday, minutes } = nowInSaoPaulo(date);
  const today = hours.find((h) => h.days.includes(weekday));

  if (today && minutes >= toMinutes(today.opens) && minutes < toMinutes(today.closes)) {
    return { open: true, title: "Aberto agora", detail: `Fecha às ${label(today.closes)}` };
  }

  const start = ORDER.indexOf(weekday);
  for (let offset = 0; offset <= 7; offset++) {
    const day = ORDER[(start + offset) % 7];
    const slot = hours.find((h) => h.days.includes(day));
    if (!slot) continue;
    if (offset === 0 && minutes >= toMinutes(slot.opens)) continue;
    const when = offset === 0 ? "hoje" : offset === 1 ? "amanhã" : PT_DAYS[day];
    return { open: false, title: "Fechado agora", detail: `Abre ${when} às ${label(slot.opens)}` };
  }
  return { open: false, title: "Fechado agora", detail: "Veja os horários abaixo" };
}
