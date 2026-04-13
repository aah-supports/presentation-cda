# Exercice 1 - MVC minimal TypeScript (liste de films)

## Objectif

Construire une mini API en architecture simple avec les dossiers:

- `controllers/`
- `models/`
- `routers/`
- `services/`

L'application doit afficher une liste de films.

## Structure

```text
src/
  controllers/
    movieController.ts
  models/
    Movie.ts
  routers/
    movieRouter.ts
  services/
    movieService.ts
  server.ts
```

## Démarrage

```bash
npm install
npm run dev
```

## Endpoint attendu

- `GET /movies`

Exemple:

```bash
curl http://localhost:3010/movies
```

## Ce que l'étudiant peut ajouter

- recherche `?q=`
- ajout d'un film (`POST /movies`)
- gestion d'erreurs
