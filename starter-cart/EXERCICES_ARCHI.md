# Exercices proposes (simples)

## 1. Clean Architecture
- Dossier exercice: `start-clean-correction`
- But: completer un use case + repository pour exposer `GET /products`

## 2. MVC
- Dossier depart: `start-mvc`
- But: completer le model pour exposer `GET /products`

## Lancement
Depuis chaque dossier:

```bash
docker compose up --build
```

Ports:
- `start-clean-correction`: API `localhost:3002`, Postgres `localhost:5542`
- `start-mvc`: API `localhost:3003`, Postgres `localhost:5543`
