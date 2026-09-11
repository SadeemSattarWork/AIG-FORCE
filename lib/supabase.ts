import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/* Server-only admin client.

   The service role key bypasses Row Level Security, so this module must never
   be imported from a Client Component — only from a "use server" action. Every
   table has RLS enabled with no public policies, which makes this the only way
   in and means a leaked anon key grants nothing. */

let cached: SupabaseClient | null = null;

/** Returns null when Supabase is not configured, so callers can degrade. */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Supabase's newer projects issue sb_secret_… keys; older ones issue a
  // service_role JWT. Either works as the server-side credential.
  const key =
    process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) return null;

  cached ??= createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

export const RESUME_BUCKET = "resumes";
