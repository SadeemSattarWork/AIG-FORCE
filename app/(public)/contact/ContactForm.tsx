"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitContact } from "@/app/actions/contact";
import {
  contactSchema,
  contactDomainOptions,
  type ContactData,
  type FormState,
} from "@/lib/forms";

const fieldClass =
  "w-full bg-white border border-hairline px-4 py-3.5 text-ink text-sm placeholder:text-muted/50 focus:outline-none focus:border-blue transition-colors";
const errorClass = "text-red-600 text-xs mt-1.5";
const labelClass = "eyebrow block text-ink mb-3";

export function ContactForm() {
  const [state, setState] = useState<FormState>({ status: "idle" });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactData>({ resolver: zodResolver(contactSchema) });

  // The honeypot is read off the submitted form rather than a ref, so nothing
  // touches ref.current during render.
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
        <p className="text-muted text-sm leading-relaxed">
          We&apos;ll get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
      {/* Honeypot — off-screen and hidden from assistive tech. Only bots fill it. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] w-px h-px opacity-0"
      />

      <div>
        <label htmlFor="name" className={labelClass}>Full Name <span className="text-red-500">*</span></label>
        <input id="name" type="text" placeholder="Jane Smith" autoComplete="name" className={fieldClass} {...register("name")} />
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>Email Address <span className="text-red-500">*</span></label>
        <input id="email" type="email" placeholder="jane@company.com" autoComplete="email" className={fieldClass} {...register("email")} />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="company" className={labelClass}>Company <span className="text-[#AAAAAA] font-normal">(optional)</span></label>
        <input id="company" type="text" placeholder="Acme Corp" autoComplete="organization" className={fieldClass} {...register("company")} />
      </div>

      <div>
        <label htmlFor="domain" className={labelClass}>Domain of Interest <span className="text-red-500">*</span></label>
        <select id="domain" className={fieldClass} defaultValue="" {...register("domain")}>
          <option value="" disabled>Select a domain...</option>
          {contactDomainOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {errors.domain && <p className={errorClass}>{errors.domain.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Message <span className="text-red-500">*</span></label>
        <textarea id="message" rows={5} placeholder="Tell us what you're looking for or what kind of work you do..." className={`${fieldClass} resize-none`} {...register("message")} />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      {state.status === "error" && (
        <div role="alert" className="border-l-2 border-red-600 bg-bone px-5 py-4">
          <p className="text-sm text-ink leading-relaxed">{state.message}</p>
        </div>
      )}

      <button type="submit" disabled={isSubmitting}
        className="self-start px-10 py-4 bg-blue text-white font-semibold text-xs uppercase tracking-[0.1em] hover:bg-wire transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending…" : "Send message ↗"}
      </button>
    </form>
  );
}
