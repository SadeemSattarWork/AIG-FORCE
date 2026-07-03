"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  domain: z.string().min(1, "Please select a domain of interest"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const domainOptions = [
  { value: "", label: "Select a domain..." },
  { value: "biology", label: "Biology & Life Sciences" },
  { value: "software-engineering", label: "Software Engineering" },
  { value: "legal", label: "Legal & Compliance" },
  { value: "medical", label: "Medical & Healthcare" },
  { value: "finance", label: "Finance & Economics" },
  { value: "other", label: "Other / Not Sure" },
];

const fieldClass =
  "w-full bg-white border border-hairline px-4 py-3.5 text-ink text-sm placeholder:text-muted/50 focus:outline-none focus:border-blue transition-colors";
const errorClass = "text-red-600 text-xs mt-1.5";
const labelClass = "eyebrow block text-ink mb-3";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const subject = encodeURIComponent(`AIG Force Enquiry from ${data.name}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || "N/A"}\nDomain: ${data.domain}\n\n${data.message}`
    );
    window.location.assign(`mailto:support@aigforce.com?subject=${subject}&body=${body}`);
    setSubmitted(true);
  };

  if (submitted) {
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
          {domainOptions.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.value === ""}>{opt.label}</option>
          ))}
        </select>
        {errors.domain && <p className={errorClass}>{errors.domain.message}</p>}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Message <span className="text-red-500">*</span></label>
        <textarea id="message" rows={5} placeholder="Tell us what you're looking for or what kind of work you do..." className={`${fieldClass} resize-none`} {...register("message")} />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting}
        className="self-start px-10 py-4 bg-blue text-white font-semibold text-xs uppercase tracking-[0.1em] hover:bg-wire transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending…" : "Send message ↗"}
      </button>
    </form>
  );
}
