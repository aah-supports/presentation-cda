# Correction TP - Mini app gestion de films

Version intermediaire pour un TP de 3h en **Node.js + TypeScript**.

## 1. Objectif

API **100% JSON** avec:
- Ajouter un film
- Lister les films
- Rechercher un film (`q`)
- Supprimer un film
- Servir des pages en JSON (`/api/pages/*`)

## 2. Lancer le projet

```bash
npm install
npm run dev
```

API locale:
- `http://localhost:3000/api`

## 3. Test avec Docker Compose

Depuis `Corrections/tp-node-ts-mvc-json`:

```bash
docker compose up --build -d
```

Verifier:

```bash
curl http://localhost:3000/api/health
```

Arreter:

```bash
docker compose down
```

## 4. Endpoints

- `GET /api/health`
- `GET /api/movies?q=inception`
- `POST /api/movies`
- `DELETE /api/movies/:id`
- `GET /api/pages/home`
- `GET /api/pages/catalog?q=para`

## 5. Architecture intermediaire (MVC)

Code actif dans `src/`:
- `movies/`:
  - `movie.model.ts`
  - `movie.repository.ts`
  - `movie.service.ts`
  - `movie.controller.ts`
- `pages/`:
  - `page.controller.ts`
- `shared/`:
  - `http-error.ts`
  - `error-handler.ts`
- `routes.ts`, `app.ts`, `server.ts`

Flux:
1. `routes` -> controller
2. controller -> service
3. service -> repository
4. reponse JSON

## 6. SOLID (pragmatique)

- **S**: controller, service et repository ont chacun un role clair.
- **O**: on peut changer de stockage (memoire -> DB) sans toucher aux routes.
- **D**: controller depend du service, service depend du repository.

## 7. Plan de realisation 3h

- 0h00-0h30: structure + routes
- 0h30-1h30: `POST` et `GET /movies`
- 1h30-2h00: recherche `q`
- 2h00-2h20: `DELETE /movies/:id`
- 2h20-2h40: `GET /pages/home` et `GET /pages/catalog`
- 2h40-3h00: tests manuels + README
