import { z } from "zod";
import { domains } from "@/lib/domains";

/* Derived from lib/domains.ts so the contact select can never drift out of
   sync with the domains the site actually advertises. */
export const contactDomainOptions = [
  ...domains.map((d) => ({ value: d.slug, label: d.name })),
  { value: "other", label: "Other / Not sure" },
];

const domainValues = contactDomainOptions.map((o) => o.value);

/* Schemas are shared by the client form and the server action that receives
   it, so browser-side validation and server-side validation can never drift.
   Never trust the client copy — the action re-parses every submission. */

export const contactIntents = [
  { value: "hiring", label: "I'm hiring" },
  { value: "expert", label: "I'm an expert" },
  { value: "other", label: "Something else" },
] as const;

export type ContactIntent = (typeof contactIntents)[number]["value"];

export const contactSchema = z.object({
  intent: z.enum(["hiring", "expert", "other"]),
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.email("Please enter a valid email address").max(200),
  company: z.string().trim().min(2, "Please enter your company").max(160),
  phone: z
    .string()
    .trim()
    .max(40)
    .optional()
    .refine(
      (v) => !v || /^\+?[\d\s().\/-]{6,}$/.test(v),
      "Please enter a valid phone number"
    ),
  // Optional on purpose: a required dropdown is friction for a company that
  // just wants to talk. Blank is stored as "other".
  domain: z
    .string()
    .optional()
    .refine((v) => !v || domainValues.includes(v), "Please select a domain"),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more, at least 10 characters")
    .max(5000, "Message must be under 5000 characters"),
});

export type ContactData = z.infer<typeof contactSchema>;

/* The public form only serves companies, so intent is fixed server-side and
   the phone field is gone; experts are pointed at support@ instead. */
export const contactFormSchema = contactSchema.omit({ intent: true, phone: true });
export type ContactFormData = z.infer<typeof contactFormSchema>;

export const applicationSchema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name").max(80),
  lastName: z.string().trim().min(1, "Please enter your last name").max(80),
  email: z.email("Please enter a valid email address").max(200),
  phone: z.string().trim().min(6, "Please enter a valid phone number").max(40),
  dial: z.string().trim().max(8),
  linkedin: z
    .union([z.url("Please enter a valid URL"), z.literal("")])
    .optional(),
  roleTitle: z.string().trim().min(1).max(200),
  roleSlug: z.string().trim().max(120).optional(),
});

export type ApplicationData = z.infer<typeof applicationSchema>;

/* The browser-side subset: dial code and role title are supplied by the page,
   not typed by the applicant, and the résumé is validated separately. */
export const applicationFormSchema = applicationSchema.omit({
  dial: true,
  roleTitle: true,
  roleSlug: true,
});

export type ApplicationFormData = z.infer<typeof applicationFormSchema>;

/* Résumés ride along as a Server Action attachment, so the ceiling here has
   to stay under next.config.ts's serverActions.bodySizeLimit. */
export const RESUME_MAX_BYTES = 5 * 1024 * 1024;
export const RESUME_MAX_LABEL = "5MB";
export const RESUME_MIME = "application/pdf";

/** Shape every form action returns, so the UI always knows what happened. */
export type FormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };
