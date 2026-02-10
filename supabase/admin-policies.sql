-- JSS Beauty — Admin Write Policies + Storage Bucket
-- Run this in the Supabase SQL Editor AFTER schema.sql + seed.sql
-- Safe to re-run — uses IF NOT EXISTS / OR REPLACE where possible

-- ============================================================
-- Write policies for authenticated users (admin)
-- ============================================================

-- Service Categories: full CRUD for authenticated users
CREATE POLICY "Allow authenticated insert" ON service_categories
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON service_categories
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete" ON service_categories
  FOR DELETE TO authenticated USING (true);

-- Services: full CRUD for authenticated users
CREATE POLICY "Allow authenticated insert" ON services
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON services
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete" ON services
  FOR DELETE TO authenticated USING (true);

-- Portfolio Items: full CRUD for authenticated users
CREATE POLICY "Allow authenticated insert" ON portfolio_items
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON portfolio_items
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete" ON portfolio_items
  FOR DELETE TO authenticated USING (true);

-- Business Info: update only (singleton, no insert/delete)
CREATE POLICY "Allow authenticated update" ON business_info
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- Contact Submissions: delete only for authenticated users
CREATE POLICY "Allow authenticated delete" ON contact_submissions
  FOR DELETE TO authenticated USING (true);

-- ============================================================
-- Storage bucket for portfolio images
-- ============================================================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio-images',
  'portfolio-images',
  true,
  5242880,  -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
ON CONFLICT (id) DO NOTHING;

-- Public read access
CREATE POLICY "Allow public read" ON storage.objects
  FOR SELECT USING (bucket_id = 'portfolio-images');

-- Authenticated users can upload
CREATE POLICY "Allow authenticated upload" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio-images');

-- Authenticated users can update (overwrite)
CREATE POLICY "Allow authenticated update" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'portfolio-images');

-- Authenticated users can delete
CREATE POLICY "Allow authenticated delete" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'portfolio-images');
