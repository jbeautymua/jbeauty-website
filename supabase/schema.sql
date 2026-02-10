-- JSS Beauty — Database Schema
-- Run this in the Supabase SQL Editor
-- Safe to re-run — drops and recreates everything

-- ============================================================
-- Clean slate (drop in reverse dependency order)
-- CASCADE automatically removes policies and dependent objects
-- ============================================================
DROP TABLE IF EXISTS contact_submissions CASCADE;
DROP TABLE IF EXISTS business_info CASCADE;
DROP TABLE IF EXISTS portfolio_items CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS service_categories CASCADE;

-- ============================================================
-- Tables
-- ============================================================

-- 1. Service Categories
CREATE TABLE service_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Services
CREATE TABLE services (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  duration TEXT NOT NULL,
  price NUMERIC(8,2) NOT NULL,
  description TEXT NOT NULL,
  category_id TEXT NOT NULL REFERENCES service_categories(id) ON DELETE CASCADE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Portfolio Items
CREATE TABLE portfolio_items (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL DEFAULT '',
  gradient_from TEXT NOT NULL DEFAULT '#EDE8E3',
  gradient_to TEXT NOT NULL DEFAULT '#E0D9D3',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Business Info (singleton — only 1 row allowed)
CREATE TABLE business_info (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  phone_display TEXT NOT NULL,
  email TEXT NOT NULL,
  instagram TEXT NOT NULL,
  instagram_handle TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  treatwell TEXT NOT NULL,
  location TEXT NOT NULL,
  google_maps_url TEXT NOT NULL,
  hours JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Contact Submissions
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public read access for content tables
CREATE POLICY "Allow public read" ON service_categories FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON services FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON portfolio_items FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON business_info FOR SELECT USING (true);

-- Contact submissions: anyone can insert, only authenticated users can read
CREATE POLICY "Allow public insert" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated read" ON contact_submissions FOR SELECT USING (auth.role() = 'authenticated');
