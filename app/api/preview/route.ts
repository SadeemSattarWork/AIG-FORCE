import {
  applicationReceived, applicationRejected, interviewInvite,
  shortlisted, enquiryReceived,
} from "@/lib/candidate-emails";
import { SITE_URL } from "@/lib/site";

/* Local design preview for the candidate emails.
   Renders only — it cannot send, and it 404s outside development so it can
   never become an open relay or leak copy from production. */

export async function GET(req: Request) {
  if (process.env.NODE_ENV === "production") {
    return new Response("Not found", { status: 404 });
  }

  const p = { firstName: "Ada", roleTitle: "Mathematics Expert" };
  const all = {
    received: applicationReceived(p),
    interview: interviewInvite(p, `${SITE_URL}/interview/demo`),
    shortlisted: shortlisted(p, "Frontier Labs"),
    rejected: applicationRejected(p),
    enquiry: enquiryReceived("Grace"),
  };

  const which = new URL(req.url).searchParams.get("show");
  if (which && which in all) {
    // cid: images don't resolve in a browser, so swap in the real file
    const html = all[which as keyof typeof all].html.replace(
      /src="cid:aigforce-logo"/,
      'src="/logo.png"'
    );
    return new Response(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  const links = Object.keys(all)
    .map((k) => `<li style="margin:8px 0"><a href="/api/preview?show=${k}">${k}</a></li>`)
    .join("");
  return new Response(
    `<body style="font:15px system-ui;padding:40px"><h1>AIG Force email templates</h1><ul>${links}</ul></body>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}
