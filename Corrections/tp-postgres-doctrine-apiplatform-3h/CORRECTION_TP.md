# Correction TP 3h - pas a pas

## 1. Creation du projet

Demarrer d'abord la base de la correction:

```bash
cd Corrections/tp-postgres-doctrine-apiplatform-3h
docker compose up -d
```

Puis creer le projet Symfony:

```bash
composer create-project symfony/skeleton tp-bdd-3h
cd tp-bdd-3h
composer require api orm maker validator doctrine/doctrine-migrations-bundle
```

Configurer `.env`:

```dotenv
DATABASE_URL="postgresql://app:app@127.0.0.1:5434/tp_bdd_3h?serverVersion=15&charset=utf8"
```

## 2. Entites et relations

Entites a produire:

- `Movie`
- `Genre`
- `Person`
- `Casting`

Relations cibles:

- `Movie` N:N `Genre`
- `Movie` 1:N `Casting`
- `Person` 1:N `Casting`

Contraintes metier minimales:

- `movie.slug` unique
- `movie.releaseYear >= 1888`
- `movie.durationMinutes > 0`
- `person (fullName, birthDate)` unique
- `casting (movie, person, roleName)` unique
- `casting.billingOrder > 0`

## 3. Migration

```bash
php bin/console make:migration
php bin/console doctrine:migrations:migrate
```

Verifier dans PostgreSQL que les contraintes existent (`PRIMARY KEY`, `FOREIGN KEY`, `UNIQUE`, `CHECK`, `DEFAULT now()`).

## 4. API Platform

Avec `#[ApiResource]` sur chaque entite, API Platform expose automatiquement:

- `GET /api/movies`
- `POST /api/movies`
- `GET /api/movies/{id}`
- `PATCH /api/movies/{id}`
- `DELETE /api/movies/{id}`

Meme logique pour `genres`, `people`, `castings`.

## 5. Documentation API

Demarrer le serveur:

```bash
symfony server:start -d
```

Puis verifier:

- `http://127.0.0.1:8000/docs`
- `http://127.0.0.1:8000/docs.jsonopenapi`

## 6. Exemples de payload

### POST /api/genres

```json
{
  "code": "SF",
  "label": "Science-Fiction"
}
```

### POST /api/people

```json
{
  "fullName": "Christopher Nolan",
  "birthDate": "1970-07-30"
}
```

### POST /api/movies

```json
{
  "title": "Inception",
  "slug": "inception",
  "releaseYear": 2010,
  "durationMinutes": 148,
  "genres": ["/api/genres/1"]
}
```

### POST /api/castings

```json
{
  "movie": "/api/movies/6f6f5c3f-6c12-4fd9-9f9f-0f2c0c3f4f02",
  "person": "/api/people/41b8e341-cc68-4a9e-9cd2-fc86fa6a0055",
  "roleName": "Cobb",
  "billingOrder": 1
}
```

## 7. Critere de validation

- contraintes SQL presentes et fonctionnelles
- relations Doctrine coherentes
- endpoints CRUD disponibles
- erreurs de validation renvoient un statut 422
- documentation OpenAPI exploitable

## 8. Seeds Doctrine (fixtures)

Installer le bundle (dans le vrai projet Symfony):

```bash
composer require --dev doctrine/doctrine-fixtures-bundle
```

Le fichier de reference est:

- `src/DataFixtures/AppFixtures.php`

Chargement des donnees:

```bash
php bin/console doctrine:fixtures:load --no-interaction
```

Verification rapide:

- `GET /api/movies`
- `GET /api/genres`
- `GET /api/people`
- `GET /api/castings`

Option de secours SQL:

- executer `seed.sql` apres migration
