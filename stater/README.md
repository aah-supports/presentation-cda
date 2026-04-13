# Starter TP - Node.js + TypeScript + Docker

## Prérequis

- Docker Desktop

## Démarrage rapide (recommandé)

Depuis le dossier `stater`:

```bash
docker compose up --build
```

URL:

- http://localhost:3002/

Réponse attendue:

- `Hello World`

## Arrêter le projet

```bash
docker compose down
```

## Au cas ou (reset propre)

```bash
docker compose down --remove-orphans
docker compose up --build -d
```

## Travail étudiant

Les étudiants modifient directement:

- `server.ts`
- `router.ts`

Le conteneur recharge automatiquement le code.

## Lancer en parallele avec la correction

- `stater` (ce projet): `http://localhost:3002/`
- `Corrections/tp-node-ts-mvc-json` en Docker: `http://localhost:3001/api/health`

## Option sans Docker

```bash
npm install
npm run dev
```
