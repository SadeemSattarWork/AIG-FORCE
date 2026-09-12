-- ═══════════════════════════════════════════════════════════════════════
--  AIG Force — database schema
--  Paste this whole file into the Supabase SQL Editor and press Run.
--  Safe to run more than once.
-- ═══════════════════════════════════════════════════════════════════════

-- ───────────────────────── Enquiries (contact form) ─────────────────────
create table if not exists public.enquiries (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  -- who is writing: a company hiring, an expert, or something else
  intent      text        not null default 'other'
              check (intent in ('hiring','expert','other')),
  name        text        not null,
  email       text        not null,
  company     text,
  phone       text,
  domain      text        not null,
  message     text        not null,
  -- workflow state for whoever works the inbox
  status      text        not null default 'new'
              check (status in ('new','in_progress','closed')),
  notes       text
);

-- Upgrade path for databases created before intent/phone existed. No-ops on
-- a fresh install.
alter table public.enquiries
  add column if not exists intent text not null default 'other'
    check (intent in ('hiring','expert','other')),
  add column if not exists phone text;

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_intent_idx     on public.enquiries (intent);
create index if not exists enquiries_status_idx     on public.enquiries (status);
create index if not exists enquiries_email_idx      on public.enquiries (email);

-- ──────────────────── Applications (expert role applications) ───────────
create table if not exists public.applications (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  first_name      text        not null,
  last_name       text        not null,
  email           text        not null,
  dial            text        not null,
  phone           text        not null,
  linkedin        text,
  role_slug       text,
  role_title      text        not null,
  -- path inside the private `resumes` storage bucket; sign it to download
  resume_path     text,
  resume_filename text,
  resume_size     integer,
  -- pipeline state, mirroring the five stages the site advertises
  status          text        not null default 'new'
                  check (status in ('new','screening','interview','shortlisted','rejected','hired')),
  score           numeric(5,2),
  notes           text
);

create index if not exists applications_created_at_idx on public.applications (created_at desc);
create index if not exists applications_status_idx     on public.applications (status);
create index if not exists applications_role_idx       on public.applications (role_slug);
create index if not exists applications_email_idx      on public.applications (email);

-- ───────────────────────────── Row Level Security ───────────────────────
-- RLS on with no public policies means the anon key can read and write
-- nothing. Every insert goes through a Server Action using the service role
-- key, which never reaches the browser.
alter table public.enquiries    enable row level security;
alter table public.applications enable row level security;

-- ─────────────────────────── Résumé storage bucket ──────────────────────
-- Private: files are only reachable through a signed URL you generate
-- server-side, so a leaked path is not a leaked CV.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('resumes', 'resumes', false, 5242880, array['application/pdf'])
on conflict (id) do update
  set public             = false,
      file_size_limit    = 5242880,
      allowed_mime_types = array['application/pdf'];
