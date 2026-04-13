# Sujet de cours - MVC pur TypeScript avec Service (TP 2h)

## 1. Objectif pedagogique

En 2 heures, realiser une mini application API en **architecture en couches** pour consolider:

- la separation des responsabilites,
- les termes techniques d'architecture,
- la demarche CDA (besoin -> implementation -> preuves).

## 2. Architecture cible (termes a maitriser)

1. **Router**: declare les routes HTTP et redirige vers les controllers.
2. **Controller**: couche HTTP, lit la requete et formate la reponse.
3. **Service**: logique metier (regles, validations, orchestration).
4. **Repository**: acces aux donnees (ici en memoire).
5. **Model**: structure des donnees (`Movie`).
6. **Middleware**: fonctions transverses (erreurs, auth, logs, validation).
7. **Error Handler**: middleware final qui centralise la gestion des erreurs.

## 3. Organisation en couches attendue

- `src/routes.ts`
- `src/movies/movie.controller.ts`
- `src/movies/movie.service.ts`
- `src/movies/movie.repository.ts`
- `src/movies/movie.model.ts`
- `src/shared/error-handler.ts`

## 4. Portee fonctionnelle (2h)

- `GET /api/health`
- `GET /api/movies`
- `POST /api/movies`
- `DELETE /api/movies/:id`
- `GET /api/pages/home`

## 5. Planning recommande (2h)

- 0h00-0h15: lancement starter + cadrage
- 0h15-0h45: couche repository + `GET /movies`
- 0h45-1h20: couche service + `POST /movies`
- 1h20-1h45: `DELETE /movies/:id` + erreurs
- 1h45-2h00: tests manuels + preuves

## 6. Lien avec le TP

Sujet pratique associe:

- `TPs/08_sujet-mvc-pur-typescript-2h.md`

Starter etudiant:

- `stater/`
