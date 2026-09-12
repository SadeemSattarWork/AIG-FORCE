"use server";

import {
  contactSchema,
  contactDomainOptions,
  contactIntents,
  type FormState,
} from "@/lib/forms";
import { sendToSupport, emailShell, row } from "@/lib/email";
import { saveEnquiry } from "@/lib/db";
import { enquiryReceived, sendCandidateEmail } from "@/lib/candidate-emails";
import { SUPPORT_EMAIL } from "@/lib/site";

const FALLBACK = `We couldn't send your message just now. Please email ${SUPPORT_EMAIL} directly and we'll pick it up straight away.`;

export async function submitContact(
  input: unknown,
  honeypot?: string
): Promise<FormState> {
  // Hidden field no human ever sees. Bots fill it; report success and drop it
  // on the floor so they get no signal that the submission was rejected.
  if (honeypot) return { status: "success" };

  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
    };
  }

  const d = parsed.data;
  const domainLabel =
    contactDomainOptions.find((o) => o.value === d.domain)?.label ??
    "Not specified";
  const intentLabel =
    contactIntents.find((o) => o.value === d.intent)?.label ?? d.intent;
  const subject = {
    hiring: `Hiring enquiry from ${d.name}${d.company ? ` (${d.company})` : ""}`,
    expert: `Expert enquiry from ${d.name}`,
    other: `New enquiry from ${d.name}`,
  }[d.intent];

  // The row is the record; the email is the notification. Store first so a
  // mail outage can never lose an enquiry.
  const stored = await saveEnquiry(d);

  const mailed = await sendToSupport({
    subject,
    replyTo: d.email,
    html: emailShell({
      heading: subject,
      rows: [
        row("They are", intentLabel),
        row("Name", d.name),
        row("Email", d.email),
        row("Phone", d.phone || "Not given"),
        row("Company", d.company || "Not given"),
        row("Domain", domainLabel),
      ].join(""),
      body: { label: "Message", text: d.message },
    }),
  });

  // Branded acknowledgement to the sender. Best effort — a failure here must
  // not fail a submission that has already been stored.
  if (stored.stored || mailed.ok) {
    await sendCandidateEmail(d.email, enquiryReceived(d.name));
  }

  // Captured if either landed. Only a total failure is reported to the sender.
  if (!stored.stored && !mailed.ok) {
    return { status: "error", message: FALLBACK };
  }
  return { status: "success" };
}
