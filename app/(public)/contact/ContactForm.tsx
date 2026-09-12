"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitContact } from "@/app/actions/contact";
import {
  contactFormSchema,
  contactDomainOptions,
  type ContactFormData,
  type FormState,
} from "@/lib/forms";
import { SUPPORT_EMAIL } from "@/lib/site";

const fieldClass =
  "w-full bg-white border border-hairline px-4 py-3.5 text-ink text-sm placeholder:text-muted/50 focus:outline-none focus:border-blue transition-colors aria-[invalid=true]:border-red-500";
const errorClass = "text-red-600 text-xs mt-1.5";
const labelClass = "eyebrow block text-ink mb-3";
const optional = (
  <span className="text-muted/70 font-normal normal-case tracking-normal">(optional)</span>
);

/* Companies only. Experts are pointed at Opportunities or support@ on the
   page itself, so the form asks one thing: who do you need. */
export function ContactForm() {
  const [state, setState] = useState<FormState>({ status: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onTouched",
    defaultValues: { domain: "" },
  });

  const onSubmit = async (data: ContactFormData, event?: React.BaseSyntheticEvent) => {
    const form = event?.target as HTMLFormElement | undefined;
    const trap = form ? String(new FormData(form).get("website") ?? "") : "";
    setState(await submitContact({ ...data, intent: "hiring" }, trap));
  };

  if (state.status === "success") {
    return (
      <div className="bg-bone border border-hairline p-10">
        <p className="eyebrow text-blue mb-4">Brief received</p>
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
          Send another <span className="arrow">↗</span>
        </button>
      </div>
    );
  }

  // Ties each input to its error text for screen readers
  const describe = (name: keyof ContactFormData) =>
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
          <label htmlFor="company" className={labelClass}>Company</label>
          <input id="company" type="text" placeholder="Acme Corp" autoComplete="organization" className={fieldClass} {...describe("company")} {...register("company")} />
          {errors.company && <p id="company-error" className={errorClass}>{errors.company.message}</p>}
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
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>What are you looking to hire?</label>
        <textarea
          id="message"
          rows={5}
          placeholder="The role, the domain, seniority, and when you need someone by. A few lines is plenty."
          className={`${fieldClass} resize-none`}
          {...describe("message")}
          {...register("message")}
        />
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
          {isSubmitting ? "Sending…" : "Send brief ↗"}
        </button>
        <p className="text-xs text-muted leading-relaxed">
          Prefer email?{" "}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="text-ink hover:text-blue transition-colors">
            {SUPPORT_EMAIL}
          </a>
        </p>
      </div>
    </form>
  );
}
