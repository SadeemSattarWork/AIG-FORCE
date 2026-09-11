"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import { countryCodes, defaultCountry } from "@/lib/country-codes";
import { PhoneCodeSelect } from "@/components/public/roles/PhoneCodeSelect";
import { submitApplication } from "@/app/actions/apply";
import {
  applicationFormSchema,
  RESUME_MAX_BYTES,
  RESUME_MAX_LABEL,
  RESUME_MIME,
  type ApplicationFormData,
  type FormState,
} from "@/lib/forms";

const fieldClass =
  "w-full bg-paper border border-hairline px-4 py-3 text-ink text-sm placeholder:text-muted/50 focus:outline-none focus:border-blue transition-colors";
const labelClass = "block text-xs font-medium text-ink mb-1.5";
const errorClass = "text-red-600 text-xs mt-1.5";

export function RoleApplyForm({
  roleTitle,
  roleSlug,
}: {
  roleTitle: string;
  roleSlug: string;
}) {
  const [state, setState] = useState<FormState>({ status: "idle" });
  const [resume, setResume] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const [countryIso, setCountryIso] = useState(defaultCountry.iso);

  const dial =
    countryCodes.find((c) => c.iso === countryIso)?.dial ?? defaultCountry.dial;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormData>({ resolver: zodResolver(applicationFormSchema) });

  // Checked here as well as in the action so an oversized PDF fails instantly
  // instead of after a round trip that the body-size limit would reject anyway.
  const onPickFile = (file: File | null) => {
    setResumeError(null);
    if (!file) return setResume(null);
    if (file.type !== RESUME_MIME) {
      setResume(null);
      return setResumeError("Your résumé must be a PDF file.");
    }
    if (file.size > RESUME_MAX_BYTES) {
      setResume(null);
      return setResumeError(
        `That file is over ${RESUME_MAX_LABEL}. Please attach a smaller PDF.`
      );
    }
    setResume(file);
  };

  const onSubmit = async (
    data: ApplicationFormData,
    event?: React.BaseSyntheticEvent
  ) => {
    if (!resume) {
      return setResumeError("Please attach your résumé as a PDF.");
    }

    // Honeypot comes off the submitted form, not a ref, so nothing reads
    // ref.current during render.
    const form = event?.target as HTMLFormElement | undefined;
    const trap = form ? String(new FormData(form).get("website") ?? "") : "";

    const body = new FormData();
    body.set("firstName", data.firstName);
    body.set("lastName", data.lastName);
    body.set("email", data.email);
    body.set("phone", data.phone);
    body.set("linkedin", data.linkedin ?? "");
    body.set("dial", dial);
    body.set("roleTitle", roleTitle);
    body.set("roleSlug", roleSlug);
    body.set("resume", resume);
    body.set("website", trap);

    setState(await submitApplication(body));
  };

  if (state.status === "success") {
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
        {/* Honeypot — off-screen and hidden from assistive tech. Only bots fill it. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] w-px h-px opacity-0"
        />

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
          <label htmlFor="linkedin" className={labelClass}>
            LinkedIn profile URL <span className="text-muted font-normal">(optional)</span>
          </label>
          <input id="linkedin" type="url" placeholder="Enter your LinkedIn URL" className={fieldClass} {...register("linkedin")} />
          {errors.linkedin && <p className={errorClass}>{errors.linkedin.message}</p>}
        </div>

        <div>
          <label htmlFor="resume" className={labelClass}>
            Upload your résumé in English <span className="text-muted font-normal">(PDF, max {RESUME_MAX_LABEL})</span>
          </label>
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
            onChange={(e) => onPickFile(e.target.files?.[0] ?? null)}
          />
          {resumeError && <p className={errorClass}>{resumeError}</p>}
        </div>

        {state.status === "error" && (
          <div role="alert" className="border-l-2 border-red-600 bg-paper px-5 py-4">
            <p className="text-sm text-ink leading-relaxed">{state.message}</p>
          </div>
        )}

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
