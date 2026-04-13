# Correction TP 2h - MVC pur TypeScript avec Service

Correction de reference pour le sujet:

- `TPs/08_sujet-mvc-pur-typescript-2h.md`

## 1. Objectif

Livrer une mini API en couches avec:

- Router
- Controller
- Service
- Repository
- Model
- Middleware d'erreur

## 2. Endpoints couverts

- `GET /api/health`
- `GET /api/movies`
- `POST /api/movies`
- `DELETE /api/movies/:id`
- `GET /api/pages/home`

## 3. Lancer avec Docker (recommande)

```bash
cd Corrections/tp-mvc-pur-typescript-2h
docker compose up --build -d
```

Test:

```bash
curl http://localhost:3004/api/health
```

Arret:

```bash
docker compose down
```

## 4. Lancer en local (npm)

```bash
npm install
npm run dev
```

## 5. Structure

```text
src/
  routes.ts
  app.ts
  server.ts
  movies/
    movie.model.ts
    movie.controller.ts
    movie.service.ts
    movie.repository.ts
  pages/
    page.controller.ts
  shared/
    http-error.ts
    error-handler.ts
```
