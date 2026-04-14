# Sujet TP - PostgreSQL + Doctrine + API Platform (3h)

## 1. Contexte

Vous devez concevoir la partie base de données d'une mini API de gestion de films.
Le TP est centre sur:

- modelisation relationnelle
- contraintes SQL
- mapping Doctrine
- exposition RESTful (API Platform)
- documentation OpenAPI

Aucun frontend n'est attendu.
Reference de demarrage: `stater-orm/README.md`.

## 2. Objectif

En 3h, vous devez livrer:

1. un schéma PostgreSQL avec contraintes
2. des entités Doctrine avec relations
3. une migration SQL appliquée
4. un jeu de seed Doctrine (fixtures)
5. une API `RESTful` operationnelle
6. une documentation API exploitable

## 3. Stacks proposées 

Bien sûr vous pouvez partir sur des stacks de votre choix.

- PHP 8.2+
- Symfony 7+
- API Platform 3+
- Doctrine ORM + migrations
- PostgreSQL 15+

## 4. Enonce detaille et diagramme

- Enonce complet: `TPs/exercices/03-postgres-doctrine-apiplatform-3h/README.md`
- Nom du schema UML: `class-diagram-postgres-doctrine.svg`
- Diagramme de classes (lien direct): [class-diagram-postgres-doctrine.svg](./class-diagram-postgres-doctrine.svg)
- Starter ORM (Docker): `stater-orm/README.md` (PostgreSQL sur `localhost:5433`)

![Schema UML class-diagram-postgres-doctrine.svg](./class-diagram-postgres-doctrine.svg)


## 5. Precisions seeds Doctrine (fixtures)

- Bundle a installer dans le projet Symfony:
  - `composer require --dev doctrine/doctrine-fixtures-bundle`
- Commande de chargement des seeds:
  - `php bin/console doctrine:fixtures:load --no-interaction`
- Fichier de reference correction:
  - `Corrections/tp-postgres-doctrine-apiplatform-3h/src/DataFixtures/AppFixtures.php`

## 6. Livrables obligatoires

- schema relationnel (avec PK/FK/UNIQUE/NOT NULL/CHECK/DEFAULT)
- code des entités Doctrine
- migration génerée
- fixtures Doctrine pour le jeu d'essai
- endpoints RESTful testés
- documentation `/docs` et `/docs.jsonopenapi`
- preuves (captures + commandes)
