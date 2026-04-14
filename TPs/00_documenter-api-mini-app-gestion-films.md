# 00 - Documenter une API (guide rapide CDA)

Objectif: produire une documentation API exploitable par un developpeur, un testeur et un jury CDA.

Contexte fil rouge: mini application de gestion de films.

## 1. Ce qu'une bonne doc API doit contenir

Pour chaque endpoint, documenter au minimum:

- methode HTTP (`GET`, `POST`, `PATCH`, `DELETE`)
- URL
- objectif metier
- parametres (path/query/header)
- body attendu
- reponses (succes + erreurs)
- codes HTTP (`200`, `201`, `400`, `404`, `422`, `500`)

## 2. Format recommande

Utiliser OpenAPI (Swagger) pour avoir:

- une doc lisible pour l'humain (`/docs`)
- une spec JSON exploitable par des outils (`/docs.jsonopenapi`)

## 3. Exemple (gestion de films)

### `GET /api/movies`

- But: lister les films.
- Reponse `200` (exemple):

```json
[
  {
    "id": "6f6f5c3f-6c12-4fd9-9f9f-0f2c0c3f4f02",
    "title": "Inception",
    "releaseYear": 2010
  }
]
```

### `POST /api/movies`

- But: creer un film.
- Body attendu (exemple):

```json
{
  "title": "Inception",
  "slug": "inception",
  "releaseYear": 2010,
  "durationMinutes": 148
}
```

- Reponse `201`: ressource creee.
- Reponse `422`: donnees invalides (champ manquant, format invalide, contrainte non respectee).

## 4. Template court a reutiliser

Copier ce bloc pour chaque endpoint:

```md
### METHOD /api/resource
- Objectif:
- Parametres:
- Body:
- Reponse succes:
- Erreurs possibles:
- Exemple requete:
- Exemple reponse:
```

## 5. Cas API Platform

Pour enrichir automatiquement la doc:

- exposer les entites avec `ApiResource`
- ajouter des contraintes de validation (`NotBlank`, `Length`, `GreaterThan`, etc.)
- ajouter descriptions/exemples de champs

Ensuite verifier:

- `http://localhost:8000/docs`
- `http://localhost:8000/docs.jsonopenapi`

## 6. Preuves attendues dans le dossier CDA

- capture de la doc Swagger
- 2 exemples de requetes/reponses (succes et erreur)
- tableau des endpoints et codes HTTP
- lien vers la spec OpenAPI exportee

## 7. Check-list etudiant

- [ ] chaque endpoint est documente
- [ ] les erreurs sont explicites
- [ ] les exemples JSON sont realistes
- [ ] la doc est a jour avec le code
- [ ] `/docs` et `/docs.jsonopenapi` fonctionnent
