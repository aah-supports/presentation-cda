# Dossier TPs - version guidee CDA

Objectif: realiser un mini projet CDA simple a partir du starter, en gardant une logique complete:

- besoin
- backlog
- implementation
- preuves
- dossier

Projet cible: **Mini API Gestion de films** (Node.js + TypeScript + Docker).

Point de depart code:

- [Starter principal (TP 00 a 07)](../stater/README.md)
- [Starter MVC dedie TP 08](../stater-mvc/README.md)
- [Starter ORM dedie TP 09](../stater-orm/README.md)

Reference formateur:

- `Corrections/tp-mvc-pur-typescript-2h/` (correction du sujet 2h)
- `Corrections/tp-node-ts-mvc-json/` (version complete plus etoffee)
- `Corrections/tp-postgres-doctrine-apiplatform-3h/` (correction du sujet BDD 3h)

## Ordre conseille

1. [00_maquette-dossier-cda-mini-app-gestion-films.md](./00_maquette-dossier-cda-mini-app-gestion-films.md)
   - Trame finale du dossier CDA

2. [01_cahier-des-charges-mini-app-gestion-films.md](./01_cahier-des-charges-mini-app-gestion-films.md)
   - Cadrage simple du besoin et du scope

3. [02_backlog-et-sprint-mini-app-gestion-films.md](./02_backlog-et-sprint-mini-app-gestion-films.md)
   - User Stories, backlog, sprint 3h

4. [03_specifications-fonctionnelles-mini-app-gestion-films.md](./03_specifications-fonctionnelles-mini-app-gestion-films.md)
   - Ce que doit faire l'API (vue metier)

5. [04_specifications-techniques-mini-app-gestion-films.md](./04_specifications-techniques-mini-app-gestion-films.md)
   - Comment c'est implemente (vue technique + securite)

6. [05_veille-securite-mini-app-gestion-films.md](./05_veille-securite-mini-app-gestion-films.md)
   - Trace de veille pendant le TP

7. [06_situation-de-recherche-mini-app-gestion-films.md](./06_situation-de-recherche-mini-app-gestion-films.md)
   - Exemple de probleme resolu par recherche

8. [07_diagrammes-uml-mini-app-gestion-films.md](./07_diagrammes-uml-mini-app-gestion-films.md)
   - Diagrammes UML a joindre au dossier

9. [08_sujet-mvc-pur-typescript-2h.md](./08_sujet-mvc-pur-typescript-2h.md)
   - Sujet court 2h en architecture en couches (Router/Controller/Service/Repository)

10. [09_sujet-postgresql-doctrine-apiplatform-3h.md](./09_sujet-postgresql-doctrine-apiplatform-3h.md)
   - Sujet 3h base de donnees relationnelle (PostgreSQL + Doctrine + API Platform RESTful)
   - Schema UML: [class-diagram-postgres-doctrine.svg](./class-diagram-postgres-doctrine.svg)

## Annexes UML

- [01_use-case-gestion-films.puml](./uml/01_use-case-gestion-films.puml)
- [02_classes-gestion-films.puml](./uml/02_classes-gestion-films.puml)
- [03_sequence-ajouter-film.puml](./uml/03_sequence-ajouter-film.puml)
- [04_activite-rechercher-film.puml](./uml/04_activite-rechercher-film.puml)
- [05_composants-architecture.puml](./uml/05_composants-architecture.puml)

## Exercices TypeScript (courts)

- [TPs/exercices/README.md](./exercices/README.md)
  - Exo 1: MVC minimal (liste de films)
  - Exo 2: Panier SOLID
  - Exo 3: PostgreSQL + Doctrine + API Platform (3h)

## Critere de reussite TP

En fin de TP, l'etudiant doit pouvoir montrer:

- un projet demarrable avec Docker
- endpoints principaux operationnels
- backlog + sprint traces
- specs fonctionnelles et techniques coherentes
- preuves de tests et de securite
