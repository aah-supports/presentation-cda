# Starter ORM - PostgreSQL (TP BDD 3h)

Starter dedie au sujet:

- `TPs/09_sujet-postgresql-doctrine-apiplatform-3h.md`
- `TPs/exercices/03-postgres-doctrine-apiplatform-3h/README.md`

## Services Docker

- PostgreSQL: `localhost:5433`
- Adminer: `http://localhost:8082`

## Demarrage

```bash
cd stater-orm
docker compose up -d
```

## Arret

```bash
docker compose down
```

## Connexion PostgreSQL

- Host: `127.0.0.1`
- Port: `5433`
- Database: `moviesdb`
- User: `app`
- Password: `app`

Exemple `DATABASE_URL` Symfony:

```dotenv
DATABASE_URL="postgresql://app:app@127.0.0.1:5433/moviesdb?serverVersion=15&charset=utf8"
```

## Seeds Doctrine (fixtures)

Dans votre projet Symfony/API Platform:

```bash
composer require --dev doctrine/doctrine-fixtures-bundle
php bin/console doctrine:fixtures:load --no-interaction
```

Reference de fixture:

- `Corrections/tp-postgres-doctrine-apiplatform-3h/src/DataFixtures/AppFixtures.php`

## Port choisi

Le port hote `5433` evite le conflit avec un PostgreSQL local sur `5432`.

Si un port est deja pris:

```bash
docker compose down --remove-orphans
```

Puis changez `POSTGRES_PORT` ou `ADMINER_PORT` dans `.env`.
