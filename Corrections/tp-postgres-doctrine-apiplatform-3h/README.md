# Correction TP 3h - PostgreSQL + Doctrine + API Platform

Correction de reference pour le sujet:

- `TPs/09_sujet-postgresql-doctrine-apiplatform-3h.md`
- `TPs/exercices/03-postgres-doctrine-apiplatform-3h/README.md`

## 1. Objectif

Montrer une implementation cible sur la partie:

- schema relationnel PostgreSQL
- contraintes de cles et d'integrite
- mapping Doctrine ORM
- exposition RESTful via API Platform
- documentation OpenAPI (`/docs`, `/docs.jsonopenapi`)

## 2. Fichiers de correction

- `docker-compose.yml`: PostgreSQL + Adminer (environnement de correction)
- `.env.example`: variables de ports et credentials Docker
- `schema.sql`: schema SQL cible avec contraintes
- `seed.sql`: jeu de donnees SQL (secours)
- `src/Entity/*.php`: entites Doctrine + contraintes + API Resource
- `src/DataFixtures/AppFixtures.php`: seed Doctrine (fixtures)
- `CORRECTION_TP.md`: deroule pas a pas

## 3. Ressources exposees

- `/api/movies`
- `/api/genres`
- `/api/people`
- `/api/castings`

## 4. Docker (correction)

Demarrage:

```bash
cd Corrections/tp-postgres-doctrine-apiplatform-3h
docker compose up -d
```

Ports par defaut:

- PostgreSQL: `localhost:5434`
- Adminer: `http://localhost:8084`

Arret:

```bash
docker compose down
```

## 5. Rappel

Cette correction est volontairement centree base de donnees/ORM/API.
Aucun frontend n'est requis.
