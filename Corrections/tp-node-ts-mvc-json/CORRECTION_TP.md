# Correction TP - version intermediaire

## 1. Positionnement

Cette correction garde une architecture propre sans tomber dans une separation trop complexe.

## 2. Mapping User Stories -> code

- US-01 Ajouter un film
  - `POST /api/movies`
  - `src/movies/movie.controller.ts` -> `create`
  - `src/movies/movie.service.ts` -> `create`

- US-02 Lister les films
  - `GET /api/movies`
  - `src/movies/movie.controller.ts` -> `list`

- US-03 Rechercher un film
  - `GET /api/movies?q=...`
  - `src/movies/movie.service.ts` -> `list`

- US-04 Supprimer un film
  - `DELETE /api/movies/:id`
  - `src/movies/movie.controller.ts` -> `remove`

## 3. Structure cible

- `src/movies`
- `src/pages`
- `src/shared`
- `src/routes.ts`
- `src/app.ts`
- `src/server.ts`

Niveau adapte pour un rendu CDA en 3h: lisible, maintenable, sans sur-ingenierie.
