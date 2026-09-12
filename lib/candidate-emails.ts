import { renderEmail } from "@/lib/email-templates";
import { sendEmail } from "@/lib/email";
import { SUPPORT_EMAIL, SITE_URL } from "@/lib/site";

/* One function per thing we tell a candidate. Each returns a ready-to-send
   email using the shared branded shell, so the look never drifts between
   messages and only the words change. */

type Person = { firstName: string; roleTitle: string };

export function applicationReceived({ firstName, roleTitle }: Person) {
  return {
    subject: `We've got your application for ${roleTitle}`,
    ...renderEmail({
      preheader: `Your application for ${roleTitle} is with us. Here's what happens next.`,
      eyebrow: "Application received",
      heading: "Thanks, we've got it.",
      blocks: [
        { type: "lead", text: `Hi ${firstName}, your application for ${roleTitle} has landed with us.` },
        { type: "text", text: "Every application is screened against the same rubric, so you're assessed on the substance of your work rather than how quickly you applied. Here's the path from here:" },
        { type: "list", items: [
          "We screen your résumé against the brief for this role.",
          "If it's a fit, you'll get an invitation to a structured interview you can take in any timezone.",
          "You'll receive an evidence-backed scorecard either way.",
        ]},
        { type: "text", text: "You'll hear from us within one business day. Nothing is needed from you in the meantime." },
      ],
      signOff: "The AIG Force team",
    }),
  };
}

export function interviewInvite({ firstName, roleTitle }: Person, interviewUrl: string) {
  return {
    subject: `Next step: your interview for ${roleTitle}`,
    ...renderEmail({
      preheader: `You've passed screening for ${roleTitle}. Book your interview.`,
      eyebrow: "Next step",
      heading: "You're through to the interview.",
      blocks: [
        { type: "lead", text: `Hi ${firstName}, your application for ${roleTitle} came through screening.` },
        { type: "text", text: "The next stage is a structured, role-specific interview. It adapts to your answers, runs in any timezone, and every candidate is scored against the same rubric, so there's no scheduling back-and-forth and no first-impression bias." },
        { type: "text", text: "Set aside roughly 30 minutes somewhere quiet. You can start whenever you're ready." },
        { type: "button", label: "Start your interview", href: interviewUrl },
        { type: "text", text: `If the button doesn't work, reply to this email and we'll sort it out.` },
      ],
      signOff: "The AIG Force team",
    }),
  };
}

export function shortlisted({ firstName, roleTitle }: Person, company?: string) {
  return {
    subject: `You've been shortlisted for ${roleTitle}`,
    ...renderEmail({
      preheader: `You're on the shortlist for ${roleTitle}.`,
      eyebrow: "Shortlisted",
      heading: "You're on the shortlist.",
      blocks: [
        { type: "lead", text: `Hi ${firstName}, we've put you forward for ${roleTitle}${company ? ` at ${company}` : ""}.` },
        { type: "text", text: "Your scorecard has gone to the hiring team along with your résumé. They'll review it and come back to us with next steps, usually within a few days." },
        { type: "text", text: "We'll be in touch as soon as we hear. If anything changes on your side, whether that's availability, rate, or anything else, just reply and let us know." },
      ],
      signOff: "The AIG Force team",
    }),
  };
}

export function applicationRejected({ firstName, roleTitle }: Person) {
  return {
    subject: `Your application for ${roleTitle}`,
    ...renderEmail({
      preheader: `An update on your ${roleTitle} application.`,
      eyebrow: "Application update",
      heading: "Not this one, but not the end.",
      blocks: [
        { type: "lead", text: `Hi ${firstName}, thank you for applying for ${roleTitle}.` },
        { type: "text", text: "We've finished reviewing applications for this role, and we won't be taking yours forward this time. The brief was narrow and we had strong candidates whose experience mapped more directly onto it. That's the whole of it, and it says little about your work in general." },
        { type: "text", text: "Your profile stays in our network. New briefs come in every week across biology, software engineering, law, medicine and finance, and you'll be matched automatically against anything that fits your expertise. You don't need to reapply." },
        { type: "button", label: "See open opportunities", href: `${SITE_URL}/for-experts/roles` },
        { type: "text", text: `If you'd like your details removed from our network, reply to this email or write to ${SUPPORT_EMAIL} and we'll take care of it.` },
      ],
      signOff: "The AIG Force team",
    }),
  };
}

export function enquiryReceived(name: string) {
  return {
    subject: "Thanks for getting in touch",
    ...renderEmail({
      preheader: "We've got your message and will reply within one business day.",
      eyebrow: "Message received",
      heading: "Thanks for getting in touch.",
      blocks: [
        { type: "lead", text: `Hi ${name}, your message has reached us.` },
        { type: "text", text: "Someone will read it properly and reply within one business day. If anything changes in the meantime, just reply to this email." },
      ],
      signOff: "The AIG Force team",
    }),
  };
}

/** Convenience: build one of the above and send it in a single call. */
export async function sendCandidateEmail(
  to: string,
  email: { subject: string; html: string; attachments: import("@/lib/email").Attachment[] }
) {
  return sendEmail({
    to,
    subject: email.subject,
    html: email.html,
    replyTo: SUPPORT_EMAIL,
    attachments: email.attachments,
  });
}
