#!/bin/bash

# Chemin de base du projet
BASE_DIR="./"

# Création des dossiers
mkdir -p $BASE_DIR/src/core       # Entités et cas d'utilisation
mkdir -p $BASE_DIR/src/adapters   # Adapteurs pour la base de données et autres services externes
mkdir -p $BASE_DIR/src/interfaces # Interfaces, routes, contrôleurs
mkdir -p $BASE_DIR/src/config     # Configuration générale
mkdir -p $BASE_DIR/src/tests      # Tests unitaires et intégration
mkdir -p $BASE_DIR/src/infrastructure # Infrastructure technique (base de données, services externes)

# Création des fichiers par défaut
touch $BASE_DIR/src/core/User.ts
touch $BASE_DIR/src/core/CreateUserUseCase.ts
touch $BASE_DIR/src/adapters/UserRepository.ts
touch $BASE_DIR/src/interfaces/UserController.ts
touch $BASE_DIR/src/config/config.ts
touch $BASE_DIR/src/infrastructure/database.ts
touch $BASE_DIR/src/tests/core/User.test.ts
touch $BASE_DIR/src/tests/adapters/UserRepository.test.ts

# Génération d'un README
cat <<EOL > $BASE_DIR/README.md
# Clean Architecture Project

## Structure du projet

- \`src/core\` : Contient les entités métier et les cas d'utilisation.
- \`src/adapters\` : Implémentations concrètes des interfaces pour la persistance ou autres services externes.
- \`src/interfaces\` : Interfaces utilisateur comme les contrôleurs API.
- \`src/config\` : Configuration du projet (environnement, variables globales).
- \`src/infrastructure\` : Gestion de l'infrastructure (ex. : base de données).
- \`src/tests\` : Tests unitaires et d'intégration.

## Installation

1. Clonez le projet.
2. Installez les dépendances avec \`npm install\`.

## Commandes

- \`npm start\` : Lance l'application.
- \`npm test\` : Exécute les tests.

EOL

echo "Structure du projet générée avec succès dans le dossier '$BASE_DIR'."
