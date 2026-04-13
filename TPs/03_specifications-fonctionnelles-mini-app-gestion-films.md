# Specifications fonctionnelles - Mini API Gestion de films

## 1. Acteur

- Utilisateur technique (etudiant/formateur) qui consomme l'API.

## 2. Fonctions attendues

### SF-01 - Verifier la disponibilite API

- Endpoint: `GET /api/health`
- Resultat: statut 200 avec JSON `{ status: "ok" }`

### SF-02 - Lister les films

- Endpoint: `GET /api/movies`
- Resultat: tableau JSON de films

### SF-03 - Ajouter un film

- Endpoint: `POST /api/movies`
- Entree: `title`, `director`, `year`, `genre`
- Resultat: film cree + code 201

### SF-04 - Supprimer un film

- Endpoint: `DELETE /api/movies/:id`
- Resultat: confirmation de suppression

### SF-05 - Page d'accueil API

- Endpoint: `GET /api/pages/home`
- Resultat: message JSON de presentation

## 3. Regles metier minimales

- `title`, `director`, `genre` obligatoires
- `year` entier et >= 1888
- `id` unique genere cote serveur

## 4. Cas d'erreur

- payload invalide -> `400`
- film introuvable -> `404`
- erreur interne -> `500`

## 5. Matrice de tracabilite

| SF | User Story | Test manuel |
|---|---|---|
| SF-01 | US-04 | `GET /api/health` |
| SF-02 | US-01 | `GET /api/movies` |
| SF-03 | US-02 | `POST /api/movies` |
| SF-04 | US-03 | `DELETE /api/movies/:id` |
| SF-05 | US-04 | `GET /api/pages/home` |
