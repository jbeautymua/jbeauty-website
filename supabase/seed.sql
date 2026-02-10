-- JSS Beauty — Seed Data
-- Run this in the Supabase SQL Editor AFTER schema.sql

-- ============================================================
-- Service Categories
-- ============================================================
INSERT INTO service_categories (id, name, description, icon, sort_order) VALUES
  ('threading',       'Threading',           'Precise hair removal using the traditional threading technique',   'Sparkles',  1),
  ('tinting',         'Tinting',             'Enhance your features with professional colour',                  'Palette',   2),
  ('lash-treatments', 'Lash Treatments',     'Beautiful lashes that enhance your eyes',                         'Eye',       3),
  ('brow-lamination', 'Brow Lamination',     'Restructure brow hairs for a fuller, uniform look',              'Brush',     4),
  ('facials',         'Facials & Skincare',   'Rejuvenating treatments for glowing skin',                       'Flower2',   5),
  ('waxing',          'Waxing',              'Smooth, long-lasting hair removal',                               'Droplets',  6),
  ('makeup',          'Makeup',              'Professional makeup for every occasion',                          'Scissors',  7),
  ('hair',            'Hair Styling',        'Beautiful styles for every occasion',                             'Sparkles',  8),
  ('body-treatments', 'Body Treatments',     'Relaxing and rejuvenating body care',                            'Heart',     9),
  ('packages',        'Packages & Combos',   'Best value beauty bundles',                                      'Gift',     10),
  ('nails',           'Nail Treatments',     'Manicures and pedicures for beautiful nails',                    'Gem',      11),
  ('skincare',        'Advanced Skincare',   'Targeted treatments for specific skin concerns',                 'Zap',      12);

-- ============================================================
-- Services
-- ============================================================

-- Threading
INSERT INTO services (id, name, duration, price, description, category_id, sort_order) VALUES
  ('th-1', 'Eyebrow Threading',  '15 min', 7.00,  'Precise shaping using the traditional threading technique for clean, defined brows.', 'threading', 1),
  ('th-2', 'Upper Lip',          '10 min', 4.00,  'Quick and gentle upper lip threading for smooth, hair-free skin.',                   'threading', 2),
  ('th-3', 'Chin',               '10 min', 4.50,  'Precise chin hair removal with minimal irritation.',                                'threading', 3),
  ('th-4', 'Sides',              '10 min', 5.00,  'Gentle threading along the sideburn and cheek area.',                               'threading', 4),
  ('th-5', 'Full Face',          '25 min', 18.00, 'Complete facial threading including eyebrows, upper lip, chin, and sides.',          'threading', 5),
  ('th-6', 'Neck',               '10 min', 5.00,  'Smooth, clean neckline with precise threading.',                                    'threading', 6),
  ('th-7', 'Forehead',           '10 min', 4.00,  'Removal of fine forehead hair for a clean finish.',                                 'threading', 7),
  ('th-8', 'Eyebrow Re-shape',   '20 min', 9.00,  'Complete brow redesign with threading for a fresh, sculpted look.',                 'threading', 8);

-- Tinting
INSERT INTO services (id, name, duration, price, description, category_id, sort_order) VALUES
  ('tn-1', 'Eyebrow Tint',           '15 min', 9.00,  'Semi-permanent colour to enhance and define your natural brow shape.',                                   'tinting', 1),
  ('tn-2', 'Eyelash Tint',           '20 min', 11.00, 'Darken lashes for a defined, mascara-free look.',                                                        'tinting', 2),
  ('tn-3', 'Brow & Lash Tint Combo', '30 min', 17.00, 'Both lash and brow tinting for a complete eye-framing effect.',                                          'tinting', 3),
  ('tn-4', 'Henna Brows',            '40 min', 28.00, 'Natural henna dye that tints both brow hairs and skin for a filled-in look lasting up to 6 weeks.',       'tinting', 4);

-- Lash Treatments
INSERT INTO services (id, name, duration, price, description, category_id, sort_order) VALUES
  ('lt-1', 'Lash Lift',                  '45 min', 32.00, 'Semi-permanent treatment that curls and lifts your natural lashes for up to 8 weeks.',  'lash-treatments', 1),
  ('lt-2', 'Lash Lift & Tint',           '60 min', 38.00, 'Lift and colour your lashes for a wide-eyed, mascara-free look.',                      'lash-treatments', 2),
  ('lt-3', 'Lash Extensions - Classic',  '90 min', 55.00, 'Individual lash extensions for a natural, fuller look.',                               'lash-treatments', 3),
  ('lt-4', 'Lash Extensions - Infill',   '45 min', 30.00, 'Maintenance fill to keep your lash extensions looking fresh.',                         'lash-treatments', 4);

-- Brow Lamination
INSERT INTO services (id, name, duration, price, description, category_id, sort_order) VALUES
  ('bl-1', 'Brow Lamination',                    '45 min', 30.00, 'Restructure brow hairs for a fuller, more uniform look that lasts up to 8 weeks.',               'brow-lamination', 1),
  ('bl-2', 'Brow Lamination & Tint',             '60 min', 38.00, 'Lamination and tint combo for maximum brow definition and fullness.',                            'brow-lamination', 2),
  ('bl-3', 'Brow Lamination, Tint & Wax',        '75 min', 45.00, 'The ultimate brow package — lamination, tint, and wax for a perfectly sculpted finish.',         'brow-lamination', 3);

-- Facials & Skincare
INSERT INTO services (id, name, duration, price, description, category_id, sort_order) VALUES
  ('fc-1', 'Express Facial',         '30 min', 28.00, 'A quick refresh with cleansing, exfoliation, and hydration.',                                              'facials', 1),
  ('fc-2', 'Deep Cleansing Facial',  '60 min', 50.00, 'Thorough cleansing with extraction, mask, and nourishing serum application.',                              'facials', 2),
  ('fc-3', 'Hydrating Glow Facial',  '60 min', 55.00, 'Intensive hydration treatment for dry, dull skin with hyaluronic acid and vitamin C.',                     'facials', 3),
  ('fc-4', 'Anti-Ageing Facial',     '75 min', 65.00, 'Target fine lines and wrinkles with collagen-boosting ingredients and massage techniques.',                'facials', 4);

-- Waxing
INSERT INTO services (id, name, duration, price, description, category_id, sort_order) VALUES
  ('wx-1', 'Half Leg Wax',    '20 min', 15.00, 'Smooth legs from knee to ankle.',                   'waxing', 1),
  ('wx-2', 'Full Leg Wax',    '35 min', 25.00, 'Complete leg waxing from hip to toe.',               'waxing', 2),
  ('wx-3', 'Underarm Wax',    '15 min', 9.00,  'Quick and effective underarm hair removal.',          'waxing', 3),
  ('wx-4', 'Bikini Wax',      '20 min', 15.00, 'Tidy bikini line for a clean look.',                 'waxing', 4),
  ('wx-5', 'Hollywood Wax',   '30 min', 30.00, 'Complete intimate area hair removal.',                'waxing', 5),
  ('wx-6', 'Full Arm Wax',    '25 min', 15.00, 'Smooth arms from shoulder to wrist.',                'waxing', 6);

-- Makeup
INSERT INTO services (id, name, duration, price, description, category_id, sort_order) VALUES
  ('mk-1', 'Day Makeup',              '45 min', 35.00,  'Natural, polished look perfect for everyday events.',                       'makeup', 1),
  ('mk-2', 'Evening / Glam Makeup',   '60 min', 50.00,  'Full glam look for special evenings, parties, and events.',                 'makeup', 2),
  ('mk-3', 'Bridal Makeup',           '90 min', 110.00, 'Stunning bridal look — long-lasting and photograph-ready.',                 'makeup', 3),
  ('mk-4', 'Bridal Trial',            '60 min', 55.00,  'Pre-wedding makeup trial to perfect your bridal look.',                     'makeup', 4);

-- Hair Styling
INSERT INTO services (id, name, duration, price, description, category_id, sort_order) VALUES
  ('hr-1', 'Blow Dry',                '30 min', 22.00,  'Professional blow dry for a sleek, voluminous finish.',                      'hair', 1),
  ('hr-2', 'Updo / Event Styling',    '60 min', 45.00,  'Elegant updo or styling for events, parties, and special occasions.',        'hair', 2),
  ('hr-3', 'Bridal Hair',             '90 min', 110.00, 'Beautiful bridal hairstyling with trial included.',                          'hair', 3);

-- Body Treatments
INSERT INTO services (id, name, duration, price, description, category_id, sort_order) VALUES
  ('bt-1', 'Back Massage',        '30 min', 28.00, 'Targeted massage to relieve tension in the back and shoulders.', 'body-treatments', 1),
  ('bt-2', 'Full Body Massage',   '60 min', 50.00, 'Complete relaxation massage from head to toe.',                   'body-treatments', 2),
  ('bt-3', 'Body Scrub & Wrap',   '60 min', 45.00, 'Exfoliating scrub followed by a hydrating body wrap.',            'body-treatments', 3);

-- Packages & Combos
INSERT INTO services (id, name, duration, price, description, category_id, sort_order) VALUES
  ('pk-1', 'Brow & Lash Package',  '60 min',  42.00,  'Eyebrow threading + tint + lash tint combo at a special price.',              'packages', 1),
  ('pk-2', 'Pamper Package',       '120 min', 85.00,  'Deep cleansing facial + back massage + eyebrow threading.',                   'packages', 2),
  ('pk-3', 'Bridal Package',       '180 min', 240.00, 'Complete bridal prep: makeup trial, bridal makeup, bridal hair, and facial.', 'packages', 3),
  ('pk-4', 'Girls Day Out',        '90 min',  70.00,  'Facial + makeup + blow dry — perfect for a girls'' day treat.',               'packages', 4);

-- Nail Treatments
INSERT INTO services (id, name, duration, price, description, category_id, sort_order) VALUES
  ('nl-1', 'Classic Manicure',  '30 min', 16.00, 'Shape, buff, cuticle care, and polish application.',              'nails', 1),
  ('nl-2', 'Gel Manicure',      '45 min', 25.00, 'Long-lasting gel polish manicure with UV curing.',                'nails', 2),
  ('nl-3', 'Classic Pedicure',  '40 min', 20.00, 'Relaxing pedicure with foot soak, exfoliation, and polish.',      'nails', 3),
  ('nl-4', 'Gel Pedicure',      '50 min', 30.00, 'Luxury pedicure with long-lasting gel polish finish.',            'nails', 4);

-- Advanced Skincare
INSERT INTO services (id, name, duration, price, description, category_id, sort_order) VALUES
  ('sk-1', 'Chemical Peel',       '45 min', 45.00, 'Professional-grade peel to improve skin texture, tone, and clarity.',        'skincare', 1),
  ('sk-2', 'Microneedling',       '60 min', 75.00, 'Stimulate collagen production for firmer, smoother skin.',                   'skincare', 2),
  ('sk-3', 'LED Light Therapy',   '30 min', 30.00, 'Non-invasive light therapy for acne, anti-ageing, and skin rejuvenation.',   'skincare', 3);

-- ============================================================
-- Portfolio Items
-- ============================================================
INSERT INTO portfolio_items (id, title, category, image_url, gradient_from, gradient_to, sort_order) VALUES
  ('p1',  'Natural Brow Shaping',    'Eyebrows', '', '#EDE8E3', '#E0D9D3',  1),
  ('p2',  'Bridal Glam Makeup',      'Makeup',   '', '#E8E2DC', '#D9D0C7',  2),
  ('p3',  'Lash Lift & Tint',        'Lashes',   '', '#DDD8D3', '#CFC8C0',  3),
  ('p4',  'Blow Dry Styling',        'Hair',     '', '#E5DFD8', '#D6CEC5',  4),
  ('p5',  'Hydrating Facial Glow',   'Skincare', '', '#DBD6D0', '#CCC5BC',  5),
  ('p6',  'Brow Lamination',         'Eyebrows', '', '#F0EBE6', '#E0D9D3',  6),
  ('p7',  'Evening Glam Look',       'Makeup',   '', '#E2DDD7', '#D4CCC4',  7),
  ('p8',  'Henna Brows',             'Eyebrows', '', '#E8E0D8', '#D8CFC5',  8),
  ('p9',  'Full Face Threading',     'Eyebrows', '', '#EAE5E0', '#DCD5CD',  9),
  ('p10', 'Gel Nail Art',            'Nails',    '', '#DED9D4', '#D0C9C1', 10),
  ('p11', 'Updo Styling',            'Hair',     '', '#E6DDD5', '#D4C8BC', 11),
  ('p12', 'Deep Cleanse Facial',     'Skincare', '', '#E0DBD5', '#D2CBC3', 12);

-- ============================================================
-- Business Info (singleton row)
-- ============================================================
INSERT INTO business_info (id, name, phone, phone_display, email, instagram, instagram_handle, whatsapp, treatwell, location, google_maps_url, hours) VALUES
  (1,
   'JSS Beauty',
   '+447533046269',
   '+44 7533 046269',
   'swanju2003@yahoo.co.in',
   'https://www.instagram.com/jbeauty_j',
   '@jbeauty_j',
   'https://wa.me/447533046269',
   'https://widget.treatwell.co.uk/place/jss-beauty/',
   'Wellington, London SM6 8NF',
   'https://maps.google.com/?q=Wellington,+London+SM6+8NF',
   '{"monday":"9:00 AM - 6:00 PM","tuesday":"9:00 AM - 6:00 PM","wednesday":"9:00 AM - 6:00 PM","thursday":"9:00 AM - 8:00 PM","friday":"9:00 AM - 8:00 PM","saturday":"10:00 AM - 5:00 PM","sunday":"Closed"}'
  );
