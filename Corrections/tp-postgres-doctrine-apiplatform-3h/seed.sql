-- Seed SQL minimal (option de secours)
-- A executer apres migration

INSERT INTO genre (code, label) VALUES
  ('SF', 'Science-Fiction'),
  ('THR', 'Thriller'),
  ('DRM', 'Drame'),
  ('ACT', 'Action')
ON CONFLICT (code) DO NOTHING;

INSERT INTO person (full_name, birth_date) VALUES
  ('Christopher Nolan', '1970-07-30'),
  ('Leonardo DiCaprio', '1974-11-11'),
  ('Hans Zimmer', '1957-09-12'),
  ('Greta Gerwig', '1983-08-04'),
  ('Saoirse Ronan', '1994-04-12')
ON CONFLICT (full_name, birth_date) DO NOTHING;

INSERT INTO movie (title, slug, release_year, duration_minutes) VALUES
  ('Inception', 'inception', 2010, 148),
  ('Lady Bird', 'lady-bird', 2017, 94)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO movie_genre (movie_id, genre_id)
SELECT m.id, g.id FROM movie m JOIN genre g ON m.slug = 'inception' AND g.code = 'SF'
ON CONFLICT DO NOTHING;

INSERT INTO movie_genre (movie_id, genre_id)
SELECT m.id, g.id FROM movie m JOIN genre g ON m.slug = 'inception' AND g.code = 'THR'
ON CONFLICT DO NOTHING;

INSERT INTO movie_genre (movie_id, genre_id)
SELECT m.id, g.id FROM movie m JOIN genre g ON m.slug = 'lady-bird' AND g.code = 'DRM'
ON CONFLICT DO NOTHING;

INSERT INTO casting (movie_id, person_id, role_name, billing_order)
SELECT m.id, p.id, 'Cobb', 1
FROM movie m
JOIN person p ON p.full_name = 'Leonardo DiCaprio'
WHERE m.slug = 'inception'
ON CONFLICT ON CONSTRAINT uq_casting DO NOTHING;

INSERT INTO casting (movie_id, person_id, role_name, billing_order)
SELECT m.id, p.id, 'Composer', 2
FROM movie m
JOIN person p ON p.full_name = 'Hans Zimmer'
WHERE m.slug = 'inception'
ON CONFLICT ON CONSTRAINT uq_casting DO NOTHING;

INSERT INTO casting (movie_id, person_id, role_name, billing_order)
SELECT m.id, p.id, 'Christine', 1
FROM movie m
JOIN person p ON p.full_name = 'Saoirse Ronan'
WHERE m.slug = 'lady-bird'
ON CONFLICT ON CONSTRAINT uq_casting DO NOTHING;

INSERT INTO casting (movie_id, person_id, role_name, billing_order)
SELECT m.id, p.id, 'Director', 2
FROM movie m
JOIN person p ON p.full_name = 'Greta Gerwig'
WHERE m.slug = 'lady-bird'
ON CONFLICT ON CONSTRAINT uq_casting DO NOTHING;
