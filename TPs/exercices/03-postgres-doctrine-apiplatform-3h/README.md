# Exercice 3 - PostgreSQL + Doctrine + API Platform (3h)

## Contexte

Vous devez concevoir et mettre en place une base de donnees relationnelle pour une mini API de catalogue de films.

Le sujet est limite a la partie **base de donnees + ORM + API RESTful + documentation API**.

Aucun frontend n'est demande.

## Objectif pedagogique

En 3h, vous devez:

1. Concevoir un schema relationnel PostgreSQL.
2. Appliquer les contraintes de cles (PK, FK, UNIQUE, NOT NULL, CHECK, DEFAULT).
3. Mapper le schema avec Doctrine ORM (entites + relations).
4. Exposer les ressources en API RESTful avec API Platform.
5. Documenter l'API via la doc OpenAPI integree.

## Stack imposee

- PHP 8.2+
- Symfony 7+
- API Platform 3+
- Doctrine ORM + Migrations
- PostgreSQL 15+

## Starter recommande

Avant le code Symfony, demarrer le starter ORM:

```bash
cd stater-orm
docker compose up -d
```

Ports a utiliser:

- PostgreSQL: `localhost:5433`
- Adminer: `http://localhost:8082`

## Diagramme de classes (image)

- Nom du schema UML: `class-diagram-postgres-doctrine.svg`
- [class-diagram-postgres-doctrine.svg](./class-diagram-postgres-doctrine.svg)
- Copie accessible depuis `TPs/`: [../class-diagram-postgres-doctrine.svg](../class-diagram-postgres-doctrine.svg)

![Schema UML class-diagram-postgres-doctrine.svg](./class-diagram-postgres-doctrine.svg)
<img src="./class-diagram-postgres-doctrine.svg" alt="Schema UML class-diagram-postgres-doctrine.svg" width="100%" />

## Modele relationnel attendu

### Table `movie`

- `id` UUID, **PK**
- `title` VARCHAR(150), **NOT NULL**
- `slug` VARCHAR(180), **NOT NULL**, **UNIQUE**
- `release_year` SMALLINT, **NOT NULL**, **CHECK (release_year >= 1888)**
- `duration_minutes` SMALLINT, **NOT NULL**, **CHECK (duration_minutes > 0)**
- `created_at` TIMESTAMPTZ, **NOT NULL**, **DEFAULT now()**

### Table `genre`

- `id` SERIAL, **PK**
- `code` VARCHAR(20), **NOT NULL**, **UNIQUE**
- `label` VARCHAR(100), **NOT NULL**, **UNIQUE**

### Table `movie_genre` (N:N)

- `movie_id` UUID, **FK -> movie(id)**
- `genre_id` INT, **FK -> genre(id)**
- **PK composite (`movie_id`, `genre_id`)**

### Table `person`

- `id` UUID, **PK**
- `full_name` VARCHAR(150), **NOT NULL**
- `birth_date` DATE, NULL
- **UNIQUE (`full_name`, `birth_date`)**

### Table `casting`

- `id` BIGSERIAL, **PK**
- `movie_id` UUID, **NOT NULL**, **FK -> movie(id)**
- `person_id` UUID, **NOT NULL**, **FK -> person(id)**
- `role_name` VARCHAR(80), **NOT NULL**
- `billing_order` SMALLINT, **NOT NULL**, **CHECK (billing_order > 0)**
- **UNIQUE (`movie_id`, `person_id`, `role_name`)**

## API RESTful attendue

Ressources minimales exposees:

- `/api/movies`
- `/api/genres`
- `/api/people`
- `/api/castings`

Exigences RESTful:

- URI basees sur les ressources (pas de verbes dans les routes)
- statuts HTTP coherents (`200`, `201`, `400`, `404`, `422`)
- JSON-LD/JSON standard d'API Platform

## Documentation API attendue

Vous devez montrer:

- interface docs: `/docs`
- spec OpenAPI JSON: `/docs.jsonopenapi`

A minima, documenter:

- description des ressources
- contraintes des champs (required, length, formats)
- exemples de payload create/update

## Decoupage 3h (impose)

### 0h00 -> 0h30: Setup projet

- creer projet Symfony/API Platform
- configurer `DATABASE_URL`
- verifier connexion PostgreSQL

### 0h30 -> 1h20: Modele + Doctrine

- creer entites Doctrine
- poser relations (`ManyToMany`, `ManyToOne`, `OneToMany`)
- poser contraintes via attributs ORM + validation

### 1h20 -> 1h50: Migration + base

- `make:migration`
- `doctrine:migrations:migrate`
- verifier schema SQL genere

### 1h50 -> 2h30: API Platform

- exposer les 4 ressources
- verifier CRUD principal sur `/api`
- tester les contraintes en erreur

### 2h30 -> 3h00: Documentation + preuves

- enrichir docs des ressources
- exporter/ouvrir `/docs` et `/docs.jsonopenapi`
- preparer captures et bilan

## Commandes guide (exemple)

```bash
composer create-project symfony/skeleton tp-bdd-3h
cd tp-bdd-3h
composer require api orm maker validator
composer require doctrine/doctrine-migrations-bundle
```

```dotenv
DATABASE_URL="postgresql://app:app@127.0.0.1:5433/tp_bdd_3h?serverVersion=15&charset=utf8"
```

```bash
php bin/console make:entity
php bin/console make:migration
php bin/console doctrine:migrations:migrate
```

```bash
composer require --dev doctrine/doctrine-fixtures-bundle
php bin/console doctrine:fixtures:load --no-interaction
```

```bash
symfony server:start -d
```

## Livrables obligatoires

1. Diagramme de classes relationnel (image).
2. Entites Doctrine avec relations et contraintes.
3. Migration SQL generee et appliquee.
4. Jeu de seed Doctrine (fixtures) pour jeu d'essai.
5. API RESTful operationnelle.
6. Documentation API visible (`/docs`) + spec OpenAPI (`/docs.jsonopenapi`).
7. Jeu de preuves (captures + commandes executees).

## Grille de validation rapide

- [ ] contraintes PK/FK/UNIQUE/NOT NULL/CHECK/DEFAULT presentes
- [ ] relations Doctrine correctes
- [ ] migration propre et rejouable
- [ ] fixtures chargeables sans erreur
- [ ] endpoints RESTful utilisables
- [ ] doc API exploitable
- [ ] travail termine en 3h
