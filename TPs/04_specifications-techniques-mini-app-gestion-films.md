# Specifications techniques - Mini API Gestion de films

## 1. Stack

- Node.js
- TypeScript
- Express
- Docker / Docker Compose

## 2. Architecture retenue (simple MVC)

- `src/routes.ts` : declaration routes
- `src/movies/movie.controller.ts` : couche HTTP
- `src/movies/movie.service.ts` : logique metier
- `src/movies/movie.repository.ts` : stockage memoire
- `src/pages/page.controller.ts` : endpoints pages JSON
- `src/shared/error-handler.ts` : gestion erreurs globale

## 3. Endpoints techniques

- `GET /api/health`
- `GET /api/movies`
- `POST /api/movies`
- `DELETE /api/movies/:id`
- `GET /api/pages/home`

## 4. Contrats JSON

### POST /api/movies

Requete:

```json
{
  "title": "Inception",
  "director": "Christopher Nolan",
  "year": 2010,
  "genre": "Science-fiction"
}
```

Reponse succes (exemple):

```json
{
  "message": "Film cree avec succes.",
  "data": {
    "id": 1,
    "title": "Inception",
    "director": "Christopher Nolan",
    "year": 2010,
    "genre": "Science-fiction"
  }
}
```

## 5. Securite minimale attendue

- validation stricte des champs
- erreurs maitrisees (`400`, `404`, `500`)
- pas de secret en dur dans le code
- `.env.example` si besoin

## 6. Tests minimaux

- health OK
- lister films
- ajout valide / invalide
- suppression existante / inexistante

## 7. Demarrage technique

Depuis `stater/`:

```bash
docker compose up --build
```

URL starter:

- `http://localhost:3002/`

Pour la correction en docker:

- `http://localhost:3001/api/health`
