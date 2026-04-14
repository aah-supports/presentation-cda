# Starter MVC - TP 08

Starter dedie au sujet `TPs/08_sujet-mvc-pur-typescript-2h.md`.

## Demarrage

```bash
cd stater-mvc
docker compose up --build
```

URL:

- http://localhost:3003/

## Arret

```bash
docker compose down
```

## Option sans Docker

```bash
npm install
npm run dev
```

## Port choisi

Ce starter utilise `3003` pour ne pas entrer en conflit avec `stater/` (3002).

Si `3003` est deja pris:

```bash
docker compose down --remove-orphans
```

Puis adaptez le mapping de port dans `docker-compose.yml`.
