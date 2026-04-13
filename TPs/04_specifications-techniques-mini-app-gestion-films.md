# Spécifications techniques - Mini application Gestion de films

## 1. Perimetre technique

### 1.1 Objectif technique
Implementer un MVP de gestion de films en 3h avec une architecture simple, maintenable et securisee.

### 1.2 Stack cible (exemple)
- Front: HTML, CSS, JavaScript
- Back: Node.js + Express
- Donnees: stockage en memoire (tableau) pour le TP
- Outils: Git, npm

### 1.3 Hors scope technique
- authentification complete,
- base de donnees persistante,
- deploiement cloud,
- gestion des roles avancee.

## 2. Architecture technique

### 2.1 Vue d'ensemble
- Client web (formulaire + liste + recherche)
- API locale Express
- Service de gestion des films
- Store en memoire

Flux principal:
1. Client envoie une requete HTTP vers l'API.
2. API valide les donnees.
3. Service applique la logique metier.
4. Reponse JSON retournee au client.

### 2.2 Decoupage conseille
- `routes/movies.js` : endpoints HTTP
- `services/movies.service.js` : logique metier
- `validators/movie.validator.js` : controles d'entree
- `data/store.js` : stockage en memoire

## 3. Modele de donnees

Entite `Movie`:
- `id`: number, unique
- `title`: string, obligatoire
- `director`: string, obligatoire
- `year`: number, obligatoire, >= 1888
- `genre`: string, obligatoire

Contraintes:
- tous les champs obligatoires,
- `year` doit etre numerique,
- `id` genere automatiquement.

## 4. API - Specifications des endpoints

### 4.1 Ajouter un film
- Methode: `POST`
- URL: `/movies`
- Requete JSON:
```json
{
  "title": "Inception",
  "director": "Christopher Nolan",
  "year": 2010,
  "genre": "Sci-Fi"
}
```
- Reponse succes: `201 Created`
- Reponse erreur: `400 Bad Request`

### 4.2 Lister les films
- Methode: `GET`
- URL: `/movies`
- Parametres optionnels: `q` (recherche titre)
- Reponse succes: `200 OK`

### 4.3 Supprimer un film
- Methode: `DELETE`
- URL: `/movies/:id`
- Reponse succes: `204 No Content`
- Reponse erreur: `404 Not Found`

## 5. Specification securite (obligatoire CDA)

### 5.1 Principes retenus
- validation stricte des entrees,
- aucune concatenation SQL (si BDD ajoutee ensuite),
- messages d'erreur non verbeux cote client,
- secrets hors code (`.env`),
- journalisation technique minimale sans donnees sensibles.

### 5.2 Tableau risques / mesures / preuves

| Risque | Mesure de securite | Preuve attendue dans le dossier |
|---|---|---|
| Entrees invalides ou malveillantes | Validation serveur des champs (`title`, `year`, etc.) | Extrait validator + test de rejet |
| Injection SQL (future evolution) | Requetes preparees/parametrees | Extrait code repository SQL parametre |
| Fuite d'informations techniques | Messages d'erreur generiques cote client | Capture reponse API en erreur |
| Exposition de secrets | Variables d'environnement, pas de secret dans Git | Extrait `.env.example` |
| Suppression non controlee | Verification format/existence `id` avant suppression | Test API `DELETE /movies/:id` |

### 5.3 Exemples de controles (pseudo-code)

```js
if (!title || !director || !genre) return res.status(400).json({ error: 'invalid payload' });
if (!Number.isInteger(year) || year < 1888) return res.status(400).json({ error: 'invalid year' });
```

## 6. Qualite, tests et performance

### 6.1 Tests minimaux
- test ajout valide,
- test ajout invalide,
- test recherche avec resultat,
- test recherche sans resultat,
- test suppression valide,
- test suppression inexistante.

### 6.2 Objectifs qualite
- zero erreur bloquante sur parcours principal,
- lint sans erreur,
- fonctionnalites in scope testees.

### 6.3 Objectif performance
- reponse percue < 1 seconde sur <= 200 films.

## 7. Deploiement et execution locale

### 7.1 Execution locale (exemple)
```bash
npm install
npm run dev
```

### 7.2 Variables d'environnement (exemple)
- `PORT=3000`
- `NODE_ENV=development`

## 8. Traçabilite fonctionnel -> technique -> test

| Spec fonctionnelle | Choix technique | Test associe |
|---|---|---|
| SF-01 Ajouter un film | `POST /movies` + validator payload | test `POST /movies` 201 / 400 |
| SF-02 Lister les films | `GET /movies` + tri titre | test liste et ordre |
| SF-03 Rechercher un film | filtre `q` sur titre | test recherche partielle |
| SF-04 Supprimer un film | `DELETE /movies/:id` | test suppression 204 / 404 |

## 9. Preuves a fournir au jury CDA
- schema d'architecture,
- extrait de code (route + validator + service),
- captures des requetes API (succes/erreur),
- extrait de tests executes,
- preuves des choix securite (tableau risques/mesures/preuves).
