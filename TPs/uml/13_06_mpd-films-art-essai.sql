CREATE TABLE realisateur (
  id_realisateur UUID PRIMARY KEY,
  nom VARCHAR(120) NOT NULL
);

CREATE TABLE film (
  id_film UUID PRIMARY KEY,
  titre VARCHAR(160) NOT NULL,
  annee_sortie SMALLINT NOT NULL CHECK (annee_sortie >= 1888),
  synopsis TEXT,
  id_realisateur UUID NOT NULL REFERENCES realisateur(id_realisateur)
);

CREATE TABLE genre (
  id_genre SERIAL PRIMARY KEY,
  libelle VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE film_genre (
  id_film UUID NOT NULL REFERENCES film(id_film),
  id_genre INT NOT NULL REFERENCES genre(id_genre),
  PRIMARY KEY (id_film, id_genre)
);

CREATE TABLE utilisateur (
  id_utilisateur UUID PRIMARY KEY,
  pseudo VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE avis (
  id_avis BIGSERIAL PRIMARY KEY,
  note SMALLINT NOT NULL CHECK (note BETWEEN 1 AND 5),
  commentaire TEXT,
  id_film UUID NOT NULL REFERENCES film(id_film),
  id_utilisateur UUID NOT NULL REFERENCES utilisateur(id_utilisateur)
);
