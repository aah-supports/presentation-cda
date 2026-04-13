# Mapping correction TP 2h

## User Stories -> endpoints

- US-01 Lister films -> `GET /api/movies`
- US-02 Ajouter film -> `POST /api/movies`
- US-03 Supprimer film -> `DELETE /api/movies/:id`
- US-04 Home API -> `GET /api/pages/home`

## Responsabilites par couche

- Router: `src/routes.ts`
- Controller: `src/movies/movie.controller.ts`, `src/pages/page.controller.ts`
- Service: `src/movies/movie.service.ts`
- Repository: `src/movies/movie.repository.ts`
- Model: `src/movies/movie.model.ts`
- Middleware: `src/shared/error-handler.ts`
