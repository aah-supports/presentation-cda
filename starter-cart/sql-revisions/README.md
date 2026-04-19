# SQL - Modele relationnel (boutique)

## Scripts

1. `01_schema.sql` : cree les tables et contraintes (PK, FK, UNIQUE, CHECK).
2. `02_seed.sql` : insere des donnees coherentes (sans API).
3. `03_exercises.sql` : 5 exercices PK/FK/CASCADE/UNIQUE/transactions.

## Execution (PostgreSQL Docker)

Depuis la racine du projet:

```bash
docker compose exec -T postgres psql -U cart -d cartdb < sql/01_schema.sql
docker compose exec -T postgres psql -U cart -d cartdb < sql/02_seed.sql
```

Pour les exercices:

```bash
docker compose exec -T postgres psql -U cart -d cartdb < sql/03_exercises.sql
```

Ou execute les blocs un par un dans psql pour observer chaque contrainte.
