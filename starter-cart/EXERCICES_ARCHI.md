# Exercices proposes (simples)

## 1. Clean Architecture
- Dossier depart: `start-clean`
- Dossier correction: `start-clean-correction`
- But: completer un use case + repository pour exposer `GET /products`

## 2. MVC
- Dossier depart: `start-mvc`
- Dossier correction: `start-mvc-correction`
- But: completer le model pour exposer `GET /products`

## Lancement
Depuis chaque dossier:

```bash
docker compose up --build
```

Ports:
- `start-clean`: API `localhost:3001`, Postgres `localhost:5541`
- `start-clean-correction`: API `localhost:3002`, Postgres `localhost:5542`
- `start-mvc`: API `localhost:3003`, Postgres `localhost:5543`
- `start-mvc-correction`: API `localhost:3004`, Postgres `localhost:5544`
