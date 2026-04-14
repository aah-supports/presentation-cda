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

## Atelier J1 (a faire en premier)

- [11_tp-j1-expression-besoin-lms-cda.md](./11_tp-j1-expression-besoin-lms-cda.md)
  - Atelier cadrage: transformer l'expression des besoins en livrables projet (cas films d'art et essai)
- [11_trame-rendu-j1-expression-besoin-lms-cda.md](./11_trame-rendu-j1-expression-besoin-lms-cda.md)
  - Trame de rendu obligatoire (vision, MVP, backlog, risques)

## Glossaire gestion de projet

- [12_glossaire-technique-gestion-projet.md](./12_glossaire-technique-gestion-projet.md)
  - Definitions techniques (cadrage, backlog, agile, planification, risques, qualite)

## Support de cours conception

- [supports/12_chap-conception-merise-uml.md](../supports/12_chap-conception-merise-uml.md)
  - Base theorique MERISE + UML pour preparer le TP 13

## Ordre conseille

1. [00_documenter-api-mini-app-gestion-films.md](./00_documenter-api-mini-app-gestion-films.md)
   - Guide pour documenter l'API (OpenAPI/Swagger) avant implementation

2. [00_maquette-dossier-cda-mini-app-gestion-films.md](./00_maquette-dossier-cda-mini-app-gestion-films.md)
   - Trame finale du dossier CDA

3. [01_cahier-des-charges-mini-app-gestion-films.md](./01_cahier-des-charges-mini-app-gestion-films.md)
   - Cadrage simple du besoin et du scope

4. [02_backlog-et-sprint-mini-app-gestion-films.md](./02_backlog-et-sprint-mini-app-gestion-films.md)
   - User Stories, backlog, sprint 3h

5. [03_specifications-fonctionnelles-mini-app-gestion-films.md](./03_specifications-fonctionnelles-mini-app-gestion-films.md)
   - Ce que doit faire l'API (vue metier)

6. [04_specifications-techniques-mini-app-gestion-films.md](./04_specifications-techniques-mini-app-gestion-films.md)
   - Comment c'est implemente (vue technique + securite)

7. [05_veille-securite-mini-app-gestion-films.md](./05_veille-securite-mini-app-gestion-films.md)
   - Trace de veille pendant le TP

8. [06_situation-de-recherche-mini-app-gestion-films.md](./06_situation-de-recherche-mini-app-gestion-films.md)
   - Exemple de probleme resolu par recherche

9. [07_diagrammes-uml-mini-app-gestion-films.md](./07_diagrammes-uml-mini-app-gestion-films.md)
   - Diagrammes UML a joindre au dossier

10. [08_sujet-mvc-pur-typescript-2h.md](./08_sujet-mvc-pur-typescript-2h.md)
   - Sujet court 2h en architecture en couches (Router/Controller/Service/Repository)

11. [09_sujet-postgresql-doctrine-apiplatform-3h.md](./09_sujet-postgresql-doctrine-apiplatform-3h.md)
   - Sujet 3h base de donnees relationnelle (PostgreSQL + Doctrine + API Platform RESTful)
   - Schema UML: [class-diagram-postgres-doctrine.svg](./class-diagram-postgres-doctrine.svg)

12. [10_tp-final-diagrammes-uml-gestion-films.md](./10_tp-final-diagrammes-uml-gestion-films.md)
   - Atelier final 100% UML (use case, classes, sequence, activite, composants)

13. [13_tp-conception-merise-uml-films-art-essai.md](./13_tp-conception-merise-uml-films-art-essai.md)
   - Atelier conception 2h: MCD, MLD, MPD et UML (use case, activite, sequence)

14. [14_tp-atelier-planning-poker-films.md](./14_tp-atelier-planning-poker-films.md)
   - Atelier court 1h: transformation features -> US + estimation Planning Poker

## Annexes UML

- [01_use-case-gestion-films.puml](./uml/01_use-case-gestion-films.puml)
- [02_classes-gestion-films.puml](./uml/02_classes-gestion-films.puml)
- [03_sequence-ajouter-film.puml](./uml/03_sequence-ajouter-film.puml)
- [04_activite-rechercher-film.puml](./uml/04_activite-rechercher-film.puml)
- [05_composants-architecture.puml](./uml/05_composants-architecture.puml)
- [10_01_use-case-tp-final.puml](./uml/10_01_use-case-tp-final.puml)
- [10_02_classes-tp-final.puml](./uml/10_02_classes-tp-final.puml)
- [10_03_sequence-ajouter-film-tp-final.puml](./uml/10_03_sequence-ajouter-film-tp-final.puml)
- [10_04_activite-associer-acteur-tp-final.puml](./uml/10_04_activite-associer-acteur-tp-final.puml)
- [10_05_composants-tp-final.puml](./uml/10_05_composants-tp-final.puml)
- [11_01_use-case-j1-lms-cda.puml](./uml/11_01_use-case-j1-lms-cda.puml)
- [13_01_mcd-films-art-essai.puml](./uml/13_01_mcd-films-art-essai.puml)
- [13_02_mld-films-art-essai.puml](./uml/13_02_mld-films-art-essai.puml)
- [13_03_usecase-films-art-essai.puml](./uml/13_03_usecase-films-art-essai.puml)
- [13_04_activite-poster-avis.puml](./uml/13_04_activite-poster-avis.puml)
- [13_05_sequence-ajouter-film.puml](./uml/13_05_sequence-ajouter-film.puml)
- [13_06_mpd-films-art-essai.sql](./uml/13_06_mpd-films-art-essai.sql)

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
