import { readFileSync } from "node:fs";
import { join } from "node:path";
import { SUPPORT_EMAIL, SITE_URL } from "@/lib/site";
import { escapeHtml, type Attachment } from "@/lib/email";

/* Branded email shell.

   Email clients are stuck in 2005: tables for layout, inline styles only, no
   flexbox or grid, and web-safe fonts with real fallbacks. The logo rides
   along as an inline CID attachment rather than a hosted <img src>, so it
   renders before the site is live and survives image blocking. */

const INK = "#0E0E12";
const BLUE = "#1801AB";
const MUTED = "#5B5B64";
const BONE = "#F4F4EF";
const HAIRLINE = "#E4E4DC";
const SERIF = "Georgia, 'Times New Roman', Times, serif";
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

const LOGO_CID = "aigforce-logo";

let logoCache: Buffer | null = null;
function logoAttachment(): Attachment {
  logoCache ??= readFileSync(join(process.cwd(), "public", "logo.png"));
  return {
    filename: "logo.png",
    content: logoCache,
    contentType: "image/png",
    contentId: LOGO_CID,
  };
}

export type EmailBlock =
  | { type: "text"; text: string }
  | { type: "lead"; text: string }
  | { type: "list"; items: string[] }
  | { type: "panel"; label: string; rows: [string, string][] }
  | { type: "button"; label: string; href: string };

function renderBlock(b: EmailBlock): string {
  switch (b.type) {
    case "lead":
      return `<p style="margin:0 0 20px;font-family:${SANS};font-size:17px;line-height:1.6;color:${INK};font-weight:600">${escapeHtml(b.text)}</p>`;
    case "text":
      return `<p style="margin:0 0 18px;font-family:${SANS};font-size:15px;line-height:1.7;color:${MUTED}">${escapeHtml(b.text)}</p>`;
    case "list":
      return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:0 0 18px">
        ${b.items.map((i) => `<tr>
          <td width="18" valign="top" style="font-family:${SANS};font-size:15px;line-height:1.7;color:${BLUE}">&#9642;</td>
          <td style="font-family:${SANS};font-size:15px;line-height:1.7;color:${MUTED};padding-bottom:6px">${escapeHtml(i)}</td>
        </tr>`).join("")}
      </table>`;
    case "panel":
      return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${BONE};border:1px solid ${HAIRLINE};margin:0 0 24px">
        <tr><td style="padding:20px 24px">
          <p style="margin:0 0 12px;font-family:${SANS};font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:${MUTED};font-weight:700">${escapeHtml(b.label)}</p>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
            ${b.rows.map(([k, v]) => `<tr>
              <td style="padding:5px 16px 5px 0;font-family:${SANS};font-size:13px;color:${MUTED};white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td>
              <td style="padding:5px 0;font-family:${SANS};font-size:14px;color:${INK};font-weight:600">${escapeHtml(v)}</td>
            </tr>`).join("")}
          </table>
        </td></tr>
      </table>`;
    case "button":
      return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:6px 0 24px">
        <tr><td style="background:${BLUE}">
          <a href="${escapeHtml(b.href)}" style="display:inline-block;padding:15px 34px;font-family:${SANS};font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#ffffff;text-decoration:none">${escapeHtml(b.label)}</a>
        </td></tr>
      </table>`;
  }
}

export function renderEmail(opts: {
  preheader: string;
  eyebrow?: string;
  heading: string;
  blocks: EmailBlock[];
  signOff?: string;
}): { html: string; attachments: Attachment[] } {
  const html = `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(opts.heading)}</title></head>
<body style="margin:0;padding:0;background:${BONE};-webkit-font-smoothing:antialiased">

<div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(opts.preheader)}</div>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${BONE}">
 <tr><td align="center" style="padding:32px 16px">

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px;background:#ffffff;border:1px solid ${HAIRLINE}">

    <!-- Logo header -->
    <tr><td style="padding:28px 40px;border-bottom:1px solid ${HAIRLINE}">
      <img src="cid:${LOGO_CID}" width="116" height="57" alt="AIG Force" style="display:block;border:0;height:auto">
    </td></tr>

    <!-- Body -->
    <tr><td style="padding:40px">
      ${opts.eyebrow ? `<p style="margin:0 0 14px;font-family:${SANS};font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:${BLUE};font-weight:700">${escapeHtml(opts.eyebrow)}</p>` : ""}
      <h1 style="margin:0 0 22px;font-family:${SERIF};font-size:28px;line-height:1.2;color:${INK};font-weight:400">${escapeHtml(opts.heading)}</h1>
      ${opts.blocks.map(renderBlock).join("\n")}
      ${opts.signOff ? `<p style="margin:28px 0 0;font-family:${SANS};font-size:15px;line-height:1.7;color:${MUTED}">${escapeHtml(opts.signOff)}</p>` : ""}
    </td></tr>

    <!-- Footer -->
    <tr><td style="padding:24px 40px;background:${BONE};border-top:1px solid ${HAIRLINE}">
      <p style="margin:0 0 6px;font-family:${SANS};font-size:12px;color:${MUTED}">
        <a href="mailto:${SUPPORT_EMAIL}" style="color:${BLUE};text-decoration:none">${SUPPORT_EMAIL}</a>
      </p>
      <p style="margin:0;font-family:${SANS};font-size:11px;color:${MUTED};opacity:.75">
        AIG Force &middot; Intelligent hiring for a changing workforce &middot;
        <a href="${SITE_URL}" style="color:${MUTED};text-decoration:underline">aigforce.co</a>
      </p>
    </td></tr>

  </table>
 </td></tr>
</table>
</body></html>`;

  return { html, attachments: [logoAttachment()] };
}
