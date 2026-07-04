"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload } from "lucide-react";
import { countryCodes, defaultCountry } from "@/lib/country-codes";
import { PhoneCodeSelect } from "@/components/public/roles/PhoneCodeSelect";

const schema = z.object({
  firstName: z.string().min(1, "Please enter your first name"),
  lastName: z.string().min(1, "Please enter your last name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  linkedin: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

type FormData = z.infer<typeof schema>;

const fieldClass =
  "w-full bg-paper border border-hairline px-4 py-3 text-ink text-sm placeholder:text-muted/50 focus:outline-none focus:border-blue transition-colors";
const labelClass = "block text-xs font-medium text-ink mb-1.5";
const errorClass = "text-red-600 text-xs mt-1.5";

export function RoleApplyForm({ roleTitle }: { roleTitle: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  const [countryIso, setCountryIso] = useState(defaultCountry.iso);

  const dial =
    countryCodes.find((c) => c.iso === countryIso)?.dial ?? defaultCountry.dial;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    // TEMPORARY: opens the user's email client with the application details.
    // Backend is coming — replace this block with a POST to the applications
    // endpoint. `resume` holds the selected File; send it as multipart/form-data
    // (mailto cannot attach files, which is why only the filename is sent today).
    const subject = encodeURIComponent(`Application: ${roleTitle}`);
    const body = encodeURIComponent(
      `Role: ${roleTitle}\nName: ${data.firstName} ${data.lastName}\nEmail: ${data.email}\nPhone: ${dial} ${data.phone}\nLinkedIn: ${data.linkedin || "N/A"}\nResume: ${resume?.name ?? "not attached"}`
    );
    window.location.assign(
      `mailto:support@aigforce.com?subject=${subject}&body=${body}`
    );
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-bone border border-hairline p-8">
        <p className="eyebrow text-blue mb-4">Application received</p>
        <h3 className="display text-ink text-2xl mb-3">Thank you.</h3>
        <p className="text-muted text-sm leading-relaxed">
          We&apos;ll review your application and be in touch within one business
          day. After the interview process, you&apos;ll also be considered for
          other roles that match your expertise.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-bone border border-hairline p-7 md:p-8">
      <h2 className="display text-ink text-2xl mb-6">Interested?</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className={labelClass}>First name</label>
            <input id="firstName" type="text" placeholder="Enter your first name" autoComplete="given-name" className={fieldClass} {...register("firstName")} />
            {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className={labelClass}>Last name</label>
            <input id="lastName" type="text" placeholder="Enter your last name" autoComplete="family-name" className={fieldClass} {...register("lastName")} />
            {errors.lastName && <p className={errorClass}>{errors.lastName.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>Email</label>
          <input id="email" type="email" placeholder="Enter your email address" autoComplete="email" className={fieldClass} {...register("email")} />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>Phone number</label>
          <div className="flex items-stretch border border-hairline bg-paper focus-within:border-blue transition-colors">
            <PhoneCodeSelect value={countryIso} onChange={setCountryIso} />
            <input
              id="phone"
              type="tel"
              placeholder="555 000 0000"
              autoComplete="tel"
              className="flex-1 bg-transparent px-4 py-3 text-ink text-sm placeholder:text-muted/50 focus:outline-none"
              {...register("phone")}
            />
          </div>
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>

        <div>
          <label htmlFor="linkedin" className={labelClass}>LinkedIn profile URL</label>
          <input id="linkedin" type="url" placeholder="Enter your LinkedIn URL" className={fieldClass} {...register("linkedin")} />
          {errors.linkedin && <p className={errorClass}>{errors.linkedin.message}</p>}
        </div>

        <div>
          <label htmlFor="resume" className={labelClass}>Upload your resume (in English)</label>
          <label
            htmlFor="resume"
            className="flex items-center justify-center gap-2 border border-dashed border-hairline bg-paper px-4 py-4 text-sm text-muted hover:border-blue cursor-pointer transition-colors"
          >
            <Upload size={15} />
            {resume?.name ?? "Click to upload or drag & drop (.pdf)"}
          </label>
          <input
            id="resume"
            type="file"
            accept="application/pdf"
            className="sr-only"
            onChange={(e) => setResume(e.target.files?.[0] ?? null)}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-blue text-white font-semibold text-xs uppercase tracking-[0.1em] hover:bg-wire transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending…" : "Submit application"}
        </button>

        <p className="text-xs text-muted leading-relaxed">
          After completing the interview process, you&apos;ll be considered for
          this and other roles that match your skills.
        </p>
      </form>
    </div>
  );
}
