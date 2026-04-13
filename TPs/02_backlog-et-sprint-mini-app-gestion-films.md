# Backlog et sprint - Mini API Gestion de films

## 1. User Stories

### US-01 - Lister les films
En tant qu'utilisateur
Je veux recuperer la liste des films
Afin de consulter le catalogue.

### US-02 - Ajouter un film
En tant qu'utilisateur
Je veux ajouter un film
Afin d'enrichir le catalogue.

### US-03 - Supprimer un film
En tant qu'utilisateur
Je veux supprimer un film
Afin de nettoyer le catalogue.

### US-04 - Voir une page API d'accueil
En tant qu'utilisateur
Je veux un endpoint d'accueil API
Afin de verifier que le service est operationnel.

## 2. Product Backlog priorise

| Priorite | ID | Story | Points |
|---:|---|---|---:|
| 1 | US-01 | Lister films | 2 |
| 2 | US-02 | Ajouter film | 3 |
| 3 | US-03 | Supprimer film | 2 |
| 4 | US-04 | Page home API | 1 |

Total: 8 points

## 3. Planning poker (exemple)

- Echelle: 1, 2, 3, 5, 8
- Discussion rapide si ecart > 2 points
- Consensus final dans le backlog

## 4. Sprint Goal (3h)

"Avoir une mini API films fonctionnelle, testable en Docker, avec preuves CDA minimales."

## 5. Sprint Backlog technique

| US | Tache | Fichier cible | Estimation |
|---|---|---|---:|
| US-01 | Implementer la lecture de films | `src/movies/movie.repository.ts` | 20 min |
| US-01 | Exposer `GET /api/movies` | `src/movies/movie.controller.ts`, `src/routes.ts` | 20 min |
| US-02 | Implementer creation film | `src/movies/movie.service.ts`, `src/movies/movie.repository.ts` | 35 min |
| US-02 | Exposer `POST /api/movies` | `src/movies/movie.controller.ts`, `src/routes.ts` | 20 min |
| US-03 | Implementer suppression film | `src/movies/movie.service.ts`, `src/movies/movie.repository.ts` | 25 min |
| US-03 | Exposer `DELETE /api/movies/:id` | `src/movies/movie.controller.ts`, `src/routes.ts` | 15 min |
| US-04 | Implementer page home | `src/pages/page.controller.ts`, `src/routes.ts` | 15 min |
| QA | Tests manuels API | `requests.http` | 20 min |
| DOC | README et preuves | `README.md` + captures | 10 min |

## 6. Definition of Done (DoD)

- [ ] endpoints fonctionnels
- [ ] erreurs principales gerees
- [ ] projet demarrable avec Docker
- [ ] tests manuels executes
- [ ] README de lancement complete

## 7. Traces CDA a conserver

- capture backlog
- capture board (To Do / In Progress / Done)
- captures requetes API
- liste commits
