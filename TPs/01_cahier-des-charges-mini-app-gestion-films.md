# Cahier des charges - Mini API Gestion de films (TP 3h)

## 1. Contexte

Le TP part du starter `stater/` et vise une mini API JSON utilisable en local.

## 2. Objectif

Livrer un MVP qui permet:

- lister des films
- ajouter un film
- supprimer un film
- exposer une page d'accueil API

## 3. Perimetre

### 3.1 In scope

- `GET /api/health`
- `GET /api/movies`
- `POST /api/movies`
- `DELETE /api/movies/:id`
- `GET /api/pages/home`

### 3.2 Out of scope

- authentification
- base de donnees persistante
- interface front complete
- deploiement cloud

## 4. Donnees manipulees

Entite `Movie`:

- `id` (number)
- `title` (string)
- `director` (string)
- `year` (number)
- `genre` (string)

## 5. Exigences non fonctionnelles

- demarrage simple via Docker
- reponse JSON claire
- code lisible par un etudiant
- gestion d'erreurs de base

## 6. Criteres d'acceptation globaux

- le conteneur demarre
- `GET /api/health` retourne 200
- on peut ajouter puis relister un film
- on peut supprimer un film existant
- les cas invalides sont geres proprement

## 7. Planning 3h (guide)

- 0h00-0h20: lancement starter + cadrage
- 0h20-1h00: `GET /movies` + repository memoire
- 1h00-1h40: `POST /movies` + validations
- 1h40-2h10: `DELETE /movies/:id`
- 2h10-2h30: `GET /pages/home`
- 2h30-3h00: tests + README + preuves
