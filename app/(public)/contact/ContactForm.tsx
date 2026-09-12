"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitContact } from "@/app/actions/contact";
import {
  contactSchema,
  contactDomainOptions,
  contactIntents,
  type ContactData,
  type ContactIntent,
  type FormState,
} from "@/lib/forms";
import { SUPPORT_EMAIL, PHONE_DISPLAY, PHONE_E164 } from "@/lib/site";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full bg-white border border-hairline px-4 py-3.5 text-ink text-sm placeholder:text-muted/50 focus:outline-none focus:border-blue transition-colors aria-[invalid=true]:border-red-500";
const errorClass = "text-red-600 text-xs mt-1.5";
const labelClass = "eyebrow block text-ink mb-3";
const optional = <span className="text-muted/70 font-normal normal-case tracking-normal">(optional)</span>;

/* The message prompt follows who is writing, so a company is asked about the
   role and an expert about their work, instead of both getting "Message". */
const prompts: Record<ContactIntent, { label: string; placeholder: string }> = {
  hiring: {
    label: "What are you looking to hire?",
    placeholder:
      "The role, the domain, seniority, and when you need someone by. A few lines is plenty.",
  },
  expert: {
    label: "Tell us about your expertise",
    placeholder:
      "Your field, what you have worked on, and the kind of work you are looking for.",
  },
  other: {
    label: "How can we help?",
    placeholder: "Tell us what is on your mind.",
  },
};

export function ContactForm() {
  const [state, setState] = useState<FormState>({ status: "idle" });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { intent: "hiring", domain: "" },
  });

  const intent = useWatch({ control, name: "intent" });
  const prompt = prompts[intent];

  const onSubmit = async (data: ContactData, event?: React.BaseSyntheticEvent) => {
    const form = event?.target as HTMLFormElement | undefined;
    const trap = form ? String(new FormData(form).get("website") ?? "") : "";
    setState(await submitContact(data, trap));
  };

  if (state.status === "success") {
    return (
      <div className="bg-bone border border-hairline p-10">
        <p className="eyebrow text-blue mb-4">Message sent</p>
        <h3 className="display text-ink text-2xl mb-3">Thank you.</h3>
        <p className="text-muted text-sm leading-relaxed mb-8">
          A person will read it and reply within one business day. A copy of
          this confirmation is on its way to your inbox.
        </p>
        <button
          type="button"
          onClick={() => {
            reset();
            setState({ status: "idle" });
          }}
          className="arrow-link text-blue cursor-pointer"
        >
          Send another message <span className="arrow">↗</span>
        </button>
      </div>
    );
  }

  // Ties each input to its error text for screen readers
  const describe = (name: keyof ContactData) =>
    errors[name]
      ? { "aria-invalid": true as const, "aria-describedby": `${name}-error` }
      : {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-7">
      {/* Honeypot: off-screen, hidden from assistive tech, only bots fill it */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] w-px h-px opacity-0"
      />

      {/* Who is writing */}
      <fieldset>
        <legend className={labelClass}>I am</legend>
        <div className="grid grid-cols-3 border border-hairline bg-white has-focus-visible:outline-2 has-focus-visible:outline-wire has-focus-visible:outline-offset-2">
          {contactIntents.map((o) => (
            <label
              key={o.value}
              className={cn(
                "text-center px-3 py-3.5 text-sm cursor-pointer select-none transition-colors border-r border-hairline last:border-r-0",
                intent === o.value ? "bg-ink text-white" : "text-ink hover:bg-bone"
              )}
            >
              <input type="radio" value={o.value} className="sr-only" {...register("intent")} />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>

      {intent === "expert" && (
        <div className="bg-bone border border-hairline px-5 py-4">
          <p className="text-sm text-muted leading-relaxed">
            Looking for work? Open roles are on the{" "}
            <Link href="/for-experts/roles" className="text-blue hover:underline">
              Opportunities page
            </Link>
            . Applying there puts you straight into the pipeline. This form is
            for anything else.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={labelClass}>Full name</label>
          <input id="name" type="text" placeholder="Jane Smith" autoComplete="name" className={fieldClass} {...describe("name")} {...register("name")} />
          {errors.name && <p id="name-error" className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Work email</label>
          <input id="email" type="email" placeholder="jane@company.com" autoComplete="email" inputMode="email" className={fieldClass} {...describe("email")} {...register("email")} />
          {errors.email && <p id="email-error" className={errorClass}>{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className={labelClass}>Company {intent !== "hiring" && optional}</label>
          <input id="company" type="text" placeholder="Acme Corp" autoComplete="organization" className={fieldClass} {...register("company")} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone {optional}</label>
          <input id="phone" type="tel" placeholder="+44 20 7946 0000" autoComplete="tel" inputMode="tel" className={fieldClass} {...describe("phone")} {...register("phone")} />
          {errors.phone && <p id="phone-error" className={errorClass}>{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="domain" className={labelClass}>Domain {optional}</label>
        <select id="domain" className={fieldClass} {...describe("domain")} {...register("domain")}>
          <option value="">Not sure yet</option>
          {contactDomainOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {errors.domain && <p id="domain-error" className={errorClass}>{errors.domain.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>{prompt.label}</label>
        <textarea id="message" rows={5} placeholder={prompt.placeholder} className={`${fieldClass} resize-none`} {...describe("message")} {...register("message")} />
        {errors.message && <p id="message-error" className={errorClass}>{errors.message.message}</p>}
      </div>

      {state.status === "error" && (
        <div role="alert" className="border-l-2 border-red-600 bg-bone px-5 py-4">
          <p className="text-sm text-ink leading-relaxed">{state.message}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
        <button
          type="submit"
          disabled={isSubmitting}
          className="self-start px-10 py-4 bg-blue text-white font-semibold text-xs uppercase tracking-[0.1em] hover:bg-wire transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending…" : "Send message ↗"}
        </button>
        <p className="text-xs text-muted leading-relaxed">
          Prefer to skip the form?{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-ink hover:text-blue transition-colors">{SUPPORT_EMAIL}</a>
          {" "}or{" "}
          <a href={`tel:${PHONE_E164}`} className="text-ink hover:text-blue transition-colors tabular-nums">{PHONE_DISPLAY}</a>
        </p>
      </div>
    </form>
  );
}
