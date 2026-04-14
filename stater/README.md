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

## Parcours TP obligatoire (CDA)

La réalisation doit suivre **obligatoirement** les fichiers `00` à `07` du dossier `TPs`.

1. Étape 00 - Maquette du dossier final  
   [00_maquette-dossier-cda-mini-app-gestion-films.md](../TPs/00_maquette-dossier-cda-mini-app-gestion-films.md)

2. Étape 01 - Cahier des charges  
   [01_cahier-des-charges-mini-app-gestion-films.md](../TPs/01_cahier-des-charges-mini-app-gestion-films.md)

3. Étape 02 - Backlog et sprint  
   [02_backlog-et-sprint-mini-app-gestion-films.md](../TPs/02_backlog-et-sprint-mini-app-gestion-films.md)

4. Étape 03 - Spécifications fonctionnelles  
   [03_specifications-fonctionnelles-mini-app-gestion-films.md](../TPs/03_specifications-fonctionnelles-mini-app-gestion-films.md)

5. Étape 04 - Spécifications techniques  
   [04_specifications-techniques-mini-app-gestion-films.md](../TPs/04_specifications-techniques-mini-app-gestion-films.md)

6. Étape 05 - Veille sécurité  
   [05_veille-securite-mini-app-gestion-films.md](../TPs/05_veille-securite-mini-app-gestion-films.md)

7. Étape 06 - Situation de recherche  
   [06_situation-de-recherche-mini-app-gestion-films.md](../TPs/06_situation-de-recherche-mini-app-gestion-films.md)

8. Étape 07 - Diagrammes UML  
   [07_diagrammes-uml-mini-app-gestion-films.md](../TPs/07_diagrammes-uml-mini-app-gestion-films.md)

Critère attendu: chaque étape doit produire une preuve exploitable pour le dossier CDA (code, captures, tests, commits).

## Option sans Docker

```bash
npm install
npm run dev
```
