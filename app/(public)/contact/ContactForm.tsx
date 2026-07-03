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
  "w-full bg-white border border-[#E8E8E8] rounded-md px-4 py-3 text-[#111111] text-sm placeholder:text-[#AAAAAA] focus:outline-none focus:border-accent transition-colors";
const errorClass = "text-red-500 text-xs mt-1";
const labelClass = "block text-sm font-medium text-[#111111] mb-1.5";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const subject = encodeURIComponent(`AIG Force Enquiry — ${data.name}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || "N/A"}\nDomain: ${data.domain}\n\n${data.message}`
    );
    window.location.href = `mailto:support@aigforce.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-[#F5F5F5] border border-[#E8E8E8] rounded-xl p-8 text-center">
        <div className="text-3xl mb-4 text-accent">✓</div>
        <h3 className="text-xl font-semibold text-[#111111] mb-2">Message Sent</h3>
        <p className="text-[#555555] text-sm">
          Thanks for reaching out. We&apos;ll get back to you within one business day.
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
        className="px-7 py-3.5 rounded-md bg-accent text-white font-medium hover:bg-accent-hover transition-colors text-sm disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending..." : "Send Message →"}
      </button>
    </form>
  );
}
