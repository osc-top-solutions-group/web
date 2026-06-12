-- ============================================================
-- OSC Web — Supabase schema
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- ── 1. Contact form submissions ──────────────────────────────

CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at  TIMESTAMPTZ DEFAULT now() NOT NULL,
  nombre      TEXT        NOT NULL,
  empresa     TEXT,
  rol         TEXT,
  email       TEXT        NOT NULL,
  telefono    TEXT,
  pais        TEXT,
  mensaje     TEXT,
  status      TEXT        DEFAULT 'new'
                CHECK (status IN ('new', 'reviewed', 'replied'))
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Anon users can INSERT only; no SELECT/UPDATE/DELETE
CREATE POLICY "anon_insert_contact"
  ON public.contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- ── 2. Resource download leads ───────────────────────────────

CREATE TABLE IF NOT EXISTS public.resource_leads (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at  TIMESTAMPTZ DEFAULT now() NOT NULL,
  nombre      TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  empresa     TEXT,
  recurso     TEXT        NOT NULL,
  tipo        TEXT,
  status      TEXT        DEFAULT 'new'
                CHECK (status IN ('new', 'downloaded', 'followed_up'))
);

ALTER TABLE public.resource_leads ENABLE ROW LEVEL SECURITY;

-- Anon users can INSERT only
CREATE POLICY "anon_insert_resource"
  ON public.resource_leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- ── 3. Storage bucket ────────────────────────────────────────
-- Run these statements separately if using the SQL editor;
-- or create the bucket manually in Dashboard > Storage > New bucket
--   Name: recursos
--   Public: OFF (private)

INSERT INTO storage.buckets (id, name, public)
VALUES ('recursos', 'recursos', false)
ON CONFLICT (id) DO NOTHING;

-- Service_role already has full storage access — no extra policy needed.
-- Signed URLs (generated server-side) grant time-limited download access.
