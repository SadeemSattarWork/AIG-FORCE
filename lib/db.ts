import { randomUUID } from "node:crypto";
import { getSupabaseAdmin, RESUME_BUCKET } from "@/lib/supabase";
import type { ApplicationData, ContactData } from "@/lib/forms";

/* Persistence for the two public forms.

   The database row is the record of the submission; the notification email
   sent alongside it is a convenience. That ordering matters — if mail ever
   breaks, nothing is lost, which is the opposite of the mailto: flow this
   replaced. */

export type StoreResult =
  | { stored: true; id: string }
  | { stored: false; reason: "unconfigured" | "failed" };

export async function saveEnquiry(d: ContactData): Promise<StoreResult> {
  const db = getSupabaseAdmin();
  if (!db) {
    console.error("[db] Supabase is not configured; enquiry was NOT stored.");
    return { stored: false, reason: "unconfigured" };
  }

  const { data, error } = await db
    .from("enquiries")
    .insert({
      name: d.name,
      email: d.email,
      company: d.company || null,
      domain: d.domain,
      message: d.message,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[db] Failed to store enquiry:", error);
    return { stored: false, reason: "failed" };
  }
  return { stored: true, id: data.id };
}

export async function saveApplication(
  a: ApplicationData,
  resume: File
): Promise<StoreResult & { resumePath?: string }> {
  const db = getSupabaseAdmin();
  if (!db) {
    console.error("[db] Supabase is not configured; application was NOT stored.");
    return { stored: false, reason: "unconfigured" };
  }

  // Upload first: a stored row pointing at a missing CV is worse than an
  // orphaned file, and an orphan is cleaned up below if the insert fails.
  const path = `${a.roleSlug || "unassigned"}/${randomUUID()}.pdf`;
  const upload = await db.storage
    .from(RESUME_BUCKET)
    .upload(path, await resume.arrayBuffer(), {
      contentType: "application/pdf",
      upsert: false,
    });

  if (upload.error) {
    console.error("[db] Failed to upload résumé:", upload.error);
    return { stored: false, reason: "failed" };
  }

  const { data, error } = await db
    .from("applications")
    .insert({
      first_name: a.firstName,
      last_name: a.lastName,
      email: a.email,
      dial: a.dial,
      phone: a.phone,
      linkedin: a.linkedin || null,
      role_slug: a.roleSlug || null,
      role_title: a.roleTitle,
      resume_path: path,
      resume_filename: resume.name,
      resume_size: resume.size,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[db] Failed to store application:", error);
    await db.storage.from(RESUME_BUCKET).remove([path]); // don't leave the orphan
    return { stored: false, reason: "failed" };
  }

  return { stored: true, id: data.id, resumePath: path };
}

/** Time-limited download link for a stored CV, for use by the dashboard. */
export async function signedResumeUrl(
  path: string,
  expiresInSeconds = 60 * 60
): Promise<string | null> {
  const db = getSupabaseAdmin();
  if (!db) return null;

  const { data, error } = await db.storage
    .from(RESUME_BUCKET)
    .createSignedUrl(path, expiresInSeconds);

  if (error) {
    console.error("[db] Failed to sign résumé URL:", error);
    return null;
  }
  return data.signedUrl;
}
