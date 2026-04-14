# Correction detaillee - TP 14 Planning Poker

## 1. Reprise des features en User Stories

| ID | Feature brute | User Story reformulee |
|---|---|---|
| US-01 | Rechercher un film par titre | En tant que passionne, je veux rechercher un film par titre afin de le retrouver rapidement. |
| US-02 | Filtrer par realisateur | En tant que passionne, je veux filtrer les films par realisateur afin de decouvrir une filmographie. |
| US-03 | Consulter une fiche film | En tant que passionne, je veux consulter la fiche detaillee d'un film afin de decider si je veux le voir. |
| US-04 | Ajouter a "A voir" | En tant que passionne, je veux ajouter un film a ma liste "A voir" afin de preparer mes prochaines seances. |
| US-05 | Retirer de "A voir" | En tant que passionne, je veux retirer un film de ma liste "A voir" afin de garder une liste utile. |
| US-06 | Ajouter une fiche film (admin) | En tant qu'administrateur editorial, je veux creer une fiche film afin d'enrichir le catalogue. |
| US-07 | Modifier une fiche film (admin) | En tant qu'administrateur editorial, je veux modifier une fiche film afin de corriger des informations. |
| US-08 | Supprimer une fiche film (admin) | En tant qu'administrateur editorial, je veux supprimer une fiche film afin d'eviter les doublons/erreurs. |

## 2. Criteres d'acceptation minimaux

- US-01: si je saisis un titre existant, la liste affiche le film correspondant.
- US-02: si je selectionne un realisateur, seuls ses films sont affiches.
- US-03: la fiche affiche au minimum titre, realisateur, annee, synopsis.
- US-04: en cliquant "Ajouter a A voir", le film apparait dans ma liste.
- US-05: en cliquant "Retirer", le film disparait de ma liste.
- US-06: un admin peut creer une fiche valide avec les champs obligatoires.
- US-07: un admin peut modifier une fiche existante et sauvegarder les changements.
- US-08: un admin peut supprimer une fiche, qui n'apparait plus dans le catalogue.

## 3. Session Planning Poker - exemple de votes

Contexte session:

- Equipe: 4 personnes (PO, Dev 1, Dev 2, QA)
- Suite de points: 1,2,3,5,8,13
- Regle: si ecart >= 2 niveaux, discussion + revote

| ID | Votes initiaux | Discussion | Vote final | Point retenu |
|---|---|---|---|---|
| US-01 | 1,2,2,3 | Recherche simple, faible complexite | 2,2,2,2 | 2 |
| US-02 | 2,3,5,3 | Cas de filtres multiples a clarifier | 3,3,3,3 | 3 |
| US-03 | 2,3,3,3 | Fiche standard, champs clairs | 3,3,3,3 | 3 |
| US-04 | 3,5,5,3 | Gestion etat "A voir" + UX | 5,5,5,5 | 5 |
| US-05 | 2,3,3,2 | Operation inverse de US-04 | 3,3,3,3 | 3 |
| US-06 | 5,8,8,5 | Validation admin + formulaire complet | 8,8,8,8 | 8 |
| US-07 | 3,5,5,5 | Edition + contraintes validation | 5,5,5,5 | 5 |
| US-08 | 3,5,8,5 | Risque suppression accidentelle | 5,5,5,5 | 5 |

## 4. Priorisation finale (Must / Should / Could)

| ID | Point final | Priorite | Justification |
|---|---|---|---|
| US-01 | 2 | Must | indispensable pour trouver un film |
| US-02 | 3 | Must | fonctionnalite coeur de recherche |
| US-03 | 3 | Must | necessaire a la decision utilisateur |
| US-04 | 5 | Must | valeur directe utilisateur |
| US-05 | 3 | Should | important mais non bloquant MVP initial |
| US-06 | 8 | Should | utile au catalogue, peut etre decale si delai court |
| US-07 | 5 | Could | optimisation du back-office |
| US-08 | 5 | Could | peut etre remplace par archivage au debut |

## 5. Analyse pedagogique (ce qu'il faut montrer)

- Les points ne sont pas une duree en heures; ils representent effort + risque + incertitude.
- Les gros ecarts de votes revelent un manque de clarification.
- Une US "Must" trop grosse (ex: 13) doit etre decoupee.

## 6. Erreurs frequentes a eviter

- Estimer avant d'avoir clarifie la US.
- Confondre points et heures.
- Garder une US trop floue avec un point "au hasard".
- Oublier de tracer pourquoi le point final a ete retenu.

## 7. Trace utile pour le dossier CDA

A conserver comme preuve:

- tableau des votes initiaux / vote final
- criteres d'acceptation associes a chaque US
- priorisation finale et justification

Ceci montre une vraie pratique collaborative de gestion de projet agile.
