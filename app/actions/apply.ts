"use server";

import {
  applicationSchema,
  RESUME_MAX_BYTES,
  RESUME_MAX_LABEL,
  RESUME_MIME,
  type FormState,
} from "@/lib/forms";
import { sendToSupport, emailShell, row } from "@/lib/email";
import { saveApplication } from "@/lib/db";
import { applicationReceived, sendCandidateEmail } from "@/lib/candidate-emails";
import { SUPPORT_EMAIL } from "@/lib/site";

const FALLBACK = `We couldn't send your application just now. Please email it to ${SUPPORT_EMAIL} and we'll pick it up straight away.`;

/* Takes FormData rather than a plain object because the résumé is a File —
   this is the part the old mailto: form could never carry, so every CV was
   silently dropped. */
export async function submitApplication(
  formData: FormData
): Promise<FormState> {
  if (formData.get("website")) return { status: "success" }; // honeypot

  const parsed = applicationSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    dial: formData.get("dial"),
    linkedin: formData.get("linkedin") ?? "",
    roleTitle: formData.get("roleTitle"),
    roleSlug: formData.get("roleSlug") ?? undefined,
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
    };
  }

  const resume = formData.get("resume");
  if (!(resume instanceof File) || resume.size === 0) {
    return { status: "error", message: "Please attach your résumé as a PDF." };
  }
  if (resume.type !== RESUME_MIME) {
    return { status: "error", message: "Your résumé must be a PDF file." };
  }
  if (resume.size > RESUME_MAX_BYTES) {
    return {
      status: "error",
      message: `That résumé is over ${RESUME_MAX_LABEL}. Please attach a smaller PDF.`,
    };
  }

  const a = parsed.data;
  const name = `${a.firstName} ${a.lastName}`;

  // Row + stored CV first, so a mail outage can never lose an applicant.
  const stored = await saveApplication(a, resume);

  const mailed = await sendToSupport({
    subject: `Application: ${a.roleTitle} — ${name}`,
    replyTo: a.email,
    html: emailShell({
      heading: `New application — ${a.roleTitle}`,
      rows: [
        row("Name", name),
        row("Email", a.email),
        row("Phone", `${a.dial} ${a.phone}`),
        row("LinkedIn", a.linkedin || "—"),
        row("Role", a.roleTitle),
        row("Saved to database", stored.stored ? `Yes — id ${stored.id}` : "No"),
      ].join(""),
    }),
    attachments: [
      {
        // Rebuilt rather than passed through: the original filename is
        // applicant-controlled, and this reads better in the inbox anyway.
        filename: `Resume — ${name}.pdf`.replace(/[/\\]/g, "-"),
        content: Buffer.from(await resume.arrayBuffer()),
        contentType: RESUME_MIME,
      },
    ],
  });

  // Branded acknowledgement to the applicant. Best effort.
  if (stored.stored || mailed.ok) {
    await sendCandidateEmail(
      a.email,
      applicationReceived({ firstName: a.firstName, roleTitle: a.roleTitle })
    );
  }

  if (!stored.stored && !mailed.ok) {
    return { status: "error", message: FALLBACK };
  }
  return { status: "success" };
}
