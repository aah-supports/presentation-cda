# Sujet TP - MVC pur TypeScript avec Service (2h)

## 1. Contexte

Vous partez du starter `stater/` et vous devez produire une mini API en couches.

## 2. Objectif

Construire une application simple avec separation claire:

- Router
- Controller
- Service
- Repository
- Model
- Middleware d'erreur

## 3. Contraintes

- Temps: 2h
- Langage: TypeScript
- Framework: Express
- Lancement: Docker Compose
- Donnees: en memoire

## 4. Endpoints a livrer

- `GET /api/health`
- `GET /api/movies`
- `POST /api/movies`
- `DELETE /api/movies/:id`
- `GET /api/pages/home`

## 5. Architecture imposee

Arborescence minimale:

```text
src/
  routes.ts
  movies/
    movie.model.ts
    movie.controller.ts
    movie.service.ts
    movie.repository.ts
  pages/
    page.controller.ts
  shared/
    error-handler.ts
    http-error.ts
```

## 6. Regles metier minimales

- `title`, `director`, `genre` obligatoires
- `year` entier et >= 1888
- `id` unique genere cote serveur

## 7. Critere de reussite (DoD)

- [ ] conteneur demarre
- [ ] `GET /api/health` retourne 200
- [ ] `POST /api/movies` cree un film
- [ ] `GET /api/movies` liste les films
- [ ] `DELETE /api/movies/:id` supprime un film
- [ ] erreurs invalides gerees (`400`, `404`)
- [ ] code range dans les bonnes couches

## 8. Planning recommande (2h)

- 0h00-0h15: setup et lecture sujet
- 0h15-0h45: repository + list
- 0h45-1h20: create + validations
- 1h20-1h45: delete + erreurs
- 1h45-2h00: tests + README

## 9. Commandes de demarrage

```bash
cd stater
docker compose up --build
```

URL de test (starter):

- `http://localhost:3002/`

## 10. Preuves attendues pour le rendu CDA

- captures endpoints (succes + erreur)
- extrait de code `controller/service/repository`
- mini tableau de tests manuels
- historique des commits

## 11. Reference correction (formateur)

- `Corrections/tp-mvc-pur-typescript-2h/`
