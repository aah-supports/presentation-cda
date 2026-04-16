# Clean Architecture Project

## Structure du projet

- `src/core` : Contient les entités métier et les cas d'utilisation.
- `src/adapters` : Implémentations concrètes des interfaces pour la persistance ou autres services externes.
- `src/interfaces` : Interfaces utilisateur comme les contrôleurs API.
- `src/config` : Configuration du projet (environnement, variables globales).
- `src/infrastructure` : Gestion de l'infrastructure (ex. : base de données).
- `src/tests` : Tests unitaires et d'intégration.

## Installation

1. Clonez le projet.
2. Installez les dépendances avec `npm install`.

## Commandes

- `npm start` : Lance l'application.
- `npm test` : Exécute les tests.

