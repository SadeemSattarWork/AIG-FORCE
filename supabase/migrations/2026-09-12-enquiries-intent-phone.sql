-- Adds the "I am hiring / I am an expert" intent and an optional phone
-- number to enquiries. Paste into the Supabase SQL Editor and Run.
alter table public.enquiries
  add column if not exists intent text not null default 'other'
    check (intent in ('hiring','expert','other')),
  add column if not exists phone text;

create index if not exists enquiries_intent_idx on public.enquiries (intent);
