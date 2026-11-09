"use client";

import { useState, type FormEvent } from "react";
import { z } from "zod";
import { AppIcon } from "@/components/ui/AppIcon";
import { Select } from "@/components/ui/Select";
import { modalities } from "@/config/site";
import { whatsappUrl } from "@/lib/links";

const schema = z.object({
  name: z
    .string("Informe seu nome.")
    .trim()
    .min(2, "Informe seu nome com pelo menos 2 letras."),
  interest: z.string("Escolha uma opção.").min(1, "Escolha uma opção."),
});

type Errors = Partial<Record<"name" | "interest", string>>;

/** Monta a mensagem e abre o WhatsApp oficial. Nenhum dado é enviado para servidores do site. */
export function EnrollForm() {
  const [errors, setErrors] = useState<Errors>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const result = schema.safeParse({ name: data.get("name"), interest: data.get("interest") });

    if (!result.success) {
      const fieldErrors: Errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof Errors;
        fieldErrors[key] ??= issue.message;
      }
      setErrors(fieldErrors);
      const firstInvalid = e.currentTarget.querySelector<HTMLElement>(`#enroll-${Object.keys(fieldErrors)[0]}`);
      firstInvalid?.focus();
      return;
    }

    setErrors({});
    const { name, interest } = result.data;
    const message =
      interest === "indefinido"
        ? `Olá! Meu nome é ${name}. Quero me matricular na Purple Fit Bombeiro e gostaria de conhecer as opções.`
        : `Olá! Meu nome é ${name}. Quero me matricular na Purple Fit Bombeiro e tenho interesse em ${interest}.`;
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  const fieldClass =
    "min-h-12 w-full rounded-xl border-2 border-white/40 bg-ink/40 px-4 text-base text-white placeholder:text-white/50 focus:border-volt";

  return (
    <form onSubmit={onSubmit} noValidate aria-label="Quero ser chamado no WhatsApp" className="grid gap-5">
      <div>
        <label htmlFor="enroll-name" className="mb-2 block text-sm font-bold uppercase tracking-wider">
          Seu nome
        </label>
        <input
          id="enroll-name"
          name="name"
          type="text"
          autoComplete="given-name"
          required
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "enroll-name-error" : undefined}
          className={fieldClass}
          placeholder="Como podemos te chamar?"
        />
        {errors.name ? (
          <p id="enroll-name-error" role="alert" className="mt-2 text-sm font-semibold text-volt">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="enroll-interest" className="mb-2 block text-sm font-bold uppercase tracking-wider">
          Tenho interesse em
        </label>
        <Select
          id="enroll-interest"
          name="interest"
          placeholder="Selecione"
          invalid={Boolean(errors.interest)}
          describedBy={errors.interest ? "enroll-interest-error" : undefined}
          options={[
            ...modalities.map((m) => ({ value: m.name, label: m.name })),
            { value: "indefinido", label: "Ainda não sei" },
          ]}
        />
        {errors.interest ? (
          <p id="enroll-interest-error" role="alert" className="mt-2 text-sm font-semibold text-volt">
            {errors.interest}
          </p>
        ) : null}
      </div>

      <div>
        <button
          type="submit"
          className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-volt px-7 py-3 text-sm font-extrabold uppercase tracking-[0.08em] text-ink transition-colors hover:bg-white sm:w-auto"
        >
          <AppIcon name="whatsapp" size={22} />
          Chamar no WhatsApp
          <span className="sr-only">(abre em nova aba)</span>
        </button>
        <p className="mt-3 text-sm text-white/75">
          Ao continuar, o WhatsApp abre com sua mensagem pronta. Seus dados não são armazenados neste site.
        </p>
      </div>
    </form>
  );
}
