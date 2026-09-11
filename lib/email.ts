import { Resend } from "resend";
import { SUPPORT_EMAIL } from "@/lib/site";

/* Delivery for the two public forms. Everything provider-specific lives in
   this file, so swapping Resend for another sender is a one-file change.

   RESEND_FROM is optional on purpose. Resend's shared onboarding sender works
   the moment an API key exists, which keeps the forms live while aigforce.co
   is still being verified; once the DNS records are in, set RESEND_FROM to
   something like "AIG Force <careers@aigforce.co>" and nothing else changes. */

const DEFAULT_FROM = "AIG Force <onboarding@resend.dev>";

export type Attachment = {
  filename: string;
  content: Buffer;
  contentType: string;
  /** Set to embed the file inline and reference it as cid:<id> in the HTML. */
  contentId?: string;
};

/** `unconfigured` means no API key yet; `failed` means Resend rejected it. */
export type DeliveryResult =
  | { ok: true }
  | { ok: false; reason: "unconfigured" | "failed" };

/** Sends to the inbox that watches form submissions. */
export async function sendToSupport(opts: {
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: Attachment[];
}): Promise<DeliveryResult> {
  // Until a domain is verified, Resend only delivers to the address the
  // account was created with — NOTIFY_EMAIL covers that gap.
  return sendEmail({ ...opts, to: process.env.NOTIFY_EMAIL ?? SUPPORT_EMAIL });
}

/** Sends to anyone — candidates, enquirers, or the support inbox. */
export async function sendEmail(opts: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: Attachment[];
}): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // Loud in the server log, honest in the UI — never a silent success.
    console.error(
      "[email] RESEND_API_KEY is not set; submission was NOT delivered."
    );
    return { ok: false, reason: "unconfigured" };
  }

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: process.env.RESEND_FROM ?? DEFAULT_FROM,
      to: Array.isArray(opts.to) ? opts.to : [opts.to],
      subject: opts.subject,
      html: opts.html,
      replyTo: opts.replyTo,
      attachments: opts.attachments,
    });

    if (error) {
      console.error("[email] Resend rejected the send:", error);
      return { ok: false, reason: "failed" };
    }
    return { ok: true };
  } catch (err) {
    console.error("[email] Unexpected failure sending mail:", err);
    return { ok: false, reason: "failed" };
  }
}

/* ——— Small HTML helpers ———
   Submissions are untrusted text, so everything interpolated into an email
   body goes through escapeHtml first. */

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** One label/value row of the summary table at the top of each email. */
export function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:6px 16px 6px 0;color:#5B5B64;font-size:13px;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td>
    <td style="padding:6px 0;color:#0E0E12;font-size:14px;font-weight:600">${escapeHtml(value)}</td>
  </tr>`;
}

/** Wraps rows (and optional free text) in the shared email shell. */
export function emailShell(opts: {
  heading: string;
  rows: string;
  body?: { label: string; text: string };
}): string {
  const body = opts.body
    ? `<p style="margin:28px 0 8px;color:#5B5B64;font-size:12px;letter-spacing:.12em;text-transform:uppercase">${escapeHtml(opts.body.label)}</p>
       <div style="white-space:pre-wrap;color:#0E0E12;font-size:15px;line-height:1.6">${escapeHtml(opts.body.text)}</div>`
    : "";

  return `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;max-width:640px;margin:0 auto;padding:32px">
    <h1 style="margin:0 0 24px;font-size:20px;color:#0E0E12">${escapeHtml(opts.heading)}</h1>
    <table style="border-collapse:collapse;width:100%;border-top:1px solid #E4E4DC;border-bottom:1px solid #E4E4DC">${opts.rows}</table>
    ${body}
    <p style="margin-top:32px;padding-top:16px;border-top:1px solid #E4E4DC;color:#5B5B64;font-size:12px">
      Sent from the aigforce.co website. Reply directly to respond to the sender.
    </p>
  </div>`;
}
