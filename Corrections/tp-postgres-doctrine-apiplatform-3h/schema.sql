-- Schema SQL cible pour TP PostgreSQL + Doctrine + API Platform
-- Scope: modelisation relationnelle et contraintes

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE genre (
  id SERIAL PRIMARY KEY,
  code VARCHAR(20) NOT NULL UNIQUE,
  label VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE movie (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(150) NOT NULL,
  slug VARCHAR(180) NOT NULL UNIQUE,
  release_year SMALLINT NOT NULL CHECK (release_year >= 1888),
  duration_minutes SMALLINT NOT NULL CHECK (duration_minutes > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE person (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(150) NOT NULL,
  birth_date DATE NULL,
  CONSTRAINT uq_person_identity UNIQUE (full_name, birth_date)
);

CREATE TABLE movie_genre (
  movie_id UUID NOT NULL,
  genre_id INT NOT NULL,
  PRIMARY KEY (movie_id, genre_id),
  CONSTRAINT fk_movie_genre_movie
    FOREIGN KEY (movie_id) REFERENCES movie(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_movie_genre_genre
    FOREIGN KEY (genre_id) REFERENCES genre(id)
    ON DELETE RESTRICT
);

CREATE TABLE casting (
  id BIGSERIAL PRIMARY KEY,
  movie_id UUID NOT NULL,
  person_id UUID NOT NULL,
  role_name VARCHAR(80) NOT NULL,
  billing_order SMALLINT NOT NULL CHECK (billing_order > 0),
  CONSTRAINT fk_casting_movie
    FOREIGN KEY (movie_id) REFERENCES movie(id)
    ON DELETE CASCADE,
  CONSTRAINT fk_casting_person
    FOREIGN KEY (person_id) REFERENCES person(id)
    ON DELETE CASCADE,
  CONSTRAINT uq_casting UNIQUE (movie_id, person_id, role_name)
);
