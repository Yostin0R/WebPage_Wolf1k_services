-- DEVELOPMENT ONLY - placeholder reviews so the Reviews section is not empty
-- while you build. They are clearly labelled as samples and are NOT real
-- customer reviews. Do not run this file in production; delete these rows
-- (DELETE FROM reviews WHERE name LIKE 'Sample Customer%';) before going live.

INSERT INTO reviews (name, rating, comment, status) VALUES
  ('Sample Customer A', 5, '[Sample review - replace with a real one] Clean crown molding lines and a tidy job site every day.', 'approved'),
  ('Sample Customer B', 5, '[Sample review - replace with a real one] The new interior doors and casing fit perfectly.', 'approved'),
  ('Sample Customer C', 4, '[Sample review - replace with a real one] Great communication from start to finish on our trim package.', 'approved'),
  ('Sample Customer D', 5, '[Sample review - pending moderation example] This one should not appear on the site.', 'pending');
