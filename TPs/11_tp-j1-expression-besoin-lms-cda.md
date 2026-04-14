# TP 11 - Jour 1 : Expression du besoin (Films d'art et essai)

Durée conseillée : 1 journée (6h à 7h)

Objectif : transformer un texte d'expression des besoins en livrables projet exploitables dès le J2.

Contexte : application web "Films d'art et essai" destinée à des passionnés de cinéma.
La plateforme permet de découvrir des films, consulter des fiches, noter et commenter,
suivre une programmation (séances/festivals) et recevoir des recommandations.
Le projet est découpé en phases : `MVP` puis enrichissements.

## 1. Ce que vous recevez

Vous partez d'un texte d'expression des besoins brut (vision, cible, parcours utilisateur, rôles, fonctionnalités, contraintes, roadmap par phases).

### Traduction des termes 

- `Expression des besoins brut` : description initiale, encore non structurée.
- `Vision` : idée globale du projet (pourquoi on le fait).
- `Cible` : public visé (qui va utiliser l'application).
- `Parcours utilisateur` : étapes vécues par l'utilisateur dans l'application.
- `Rôles` : types d'utilisateurs et leurs droits (ex: admin, passionné, modérateur).
- `Fonctionnalités` : actions que l'application permet de faire.
- `Contraintes` : limites à respecter (temps, budget, technique, règles métier).
- `Roadmap par phases` : plan du projet en plusieurs étapes (MVP puis évolutions).

En résumé: votre travail J1 est de transformer ce texte "brut" en livrables clairs et utilisables par l'équipe.

### Outil conseillé pour débuter

- `Notion` (recommandé) : simple pour écrire la vision, les rôles, le backlog et partager avec l'équipe.
- `Google Docs` : très bien pour co-rédiger rapidement en groupe.
- `Trello` (option) : utile pour transformer ensuite vos user stories en backlog visuel.

Conseil pratique: commencez dans un document texte (Notion/Google Docs), puis passez sur Trello pour la priorisation.

## 2. Ce que vous devez produire en fin de J1

1. Vision produit en 10 lignes max.
2. Périmètre MVP (phase 1) + hors périmètre (phase 2/3).
3. Acteurs et responsabilités (table claire).
4. Parcours utilisateur simplifié (5 étapes max).
5. Backlog initial priorisé (10 à 15 user stories).
6. Diagramme use case UML de niveau macro.
7. Liste des zones floues / risques / questions ouvertes.

## 3. Exemple d'idée d'application (fil rouge)

### MVP possible

- Catalogue de films d'art et essai.
- Fiche film détaillée (réalisateur, pays, année, genre, synopsis).
- Recherche par réalisateur/pays/année.
- Liste utilisateur "À voir".

### Exemples de user stories

- En tant que passionné, je veux rechercher un film par réalisateur afin de trouver rapidement des références.
- En tant que passionné, je veux ajouter un film à ma liste "À voir" afin de préparer mes prochaines séances.
- En tant qu'administrateur éditorial, je veux ajouter/modifier une fiche film afin de maintenir le catalogue.

## 4. Planning recommandé

### Bloc 1 (45 min)

- Lecture collective du besoin.
- Reformulation du problème à résoudre.

Sortie attendue : objectif produit + valeur métier.

### Bloc 2 (1h)

- Identification des acteurs et de leurs attentes.
- Clarification des interactions principales.

Sortie attendue : tableau acteurs / besoins / droits.

### Bloc 3 (1h)

- Reprise du scénario utilisateur.
- Simplification en parcours lisible (de l'entrée à la sortie).

Sortie attendue : parcours type en 5 étapes.

### Bloc 4 (1h)

- Découpage MVP vs phases 2/3.
- Arbitrage must/should/could/won't.

Sortie attendue : périmètre validé.

### Bloc 5 (1h30)

- Rédaction des user stories.
- Priorisation (MoSCoW ou WSJF simplifié).

Sortie attendue : backlog initial ordonné.

### Bloc 6 (45 min)

- Construction du use case global.
- Consolidation des risques et des questions.

Sortie attendue : use case + registre de questions.

## 5. Contraintes

- Pas de conception technique détaillée (pas de schéma BDD, pas d'architecture cible complète).
- Niveau attendu : cadrage fonctionnel projet.
- Les livrables doivent être lisibles par un PO, un formateur et un jury CDA.

## 6. Glossaire contextuel (termes du TP)

| Terme | Définition courte | Application dans ce TP |
|---|---|---|
| Expression du besoin | Description initiale du problème, des attentes et du contexte. | Le texte "Films d'art et essai" fourni en entrée. |
| Vision produit | Intention globale du produit, pour qui et pour quelle valeur. | À rédiger en 10 lignes max. |
| Périmètre | Ce qui est inclus dans la version visée. | Fonctionnalités retenues en phase 1. |
| Hors périmètre | Ce qui est explicitement reporté. | Fonctions phase 2/3 non traitées en J1. |
| MVP | Version minimale utile pour valider la valeur métier. | Catalogue + fiche film + recherche + liste "À voir". |
| Partie prenante | Acteur impacté par le projet. | Admin éditorial, passionné, partenaire événementiel. |
| User story | Besoin formulé du point de vue utilisateur. | Backlog initial de 10 à 15 US. |
| Backlog produit | Liste priorisée des besoins à réaliser. | Livrable central de fin de J1. |
| Priorisation | Ordonnancement des besoins selon la valeur/urgence/risque. | MoSCoW ou WSJF simplifié. |
| MoSCoW | Méthode Must/Should/Could/Won't pour trier les besoins. | Découpage MVP vs phase 2/3. |
| WSJF | Priorisation par valeur relative sur effort (version simplifiée). | Alternative à MoSCoW pour trancher. |
| Use case | Diagramme des interactions acteurs-système. | Vue macro de l'application en fin de journée. |
| Hypothèse | Point supposé vrai à valider ensuite. | Ex : base films déjà disponible. |
| Risque | Événement incertain avec impact négatif possible. | Ex : périmètre trop large pour MVP. |
| Question ouverte | Point non tranché qui bloque ou fragilise la suite. | Ex : modération des commentaires. |
| Definition of Done | Conditions minimales pour considérer le travail terminé. | Check-list J1 à valider en équipe. |

## 7. Definition of Done (J1)

- [ ] Vision produit claire
- [ ] MVP délimité et argumenté
- [ ] Acteurs et droits explicites
- [ ] Backlog initial priorisé
- [ ] Use case macro fourni
- [ ] Questions ouvertes tracées

## 8. Trame de rendu obligatoire

Utiliser la trame suivante :

- `TPs/11_trame-rendu-j1-expression-besoin-lms-cda.md`

## 9. Évaluation rapide

- Qualité du cadrage métier : 40%
- Cohérence des priorités : 30%
- Clarté des livrables : 20%
- Qualité des questions ouvertes : 10%

## 10. Suite logique (J2)

À partir de ces livrables, vous pourrez enchaîner sur :

- cahier des charges cible
- spécifications fonctionnelles
- spécifications techniques
- backlog sprintable

## 11. Glossaire complet recommandé

- `TPs/12_glossaire-technique-gestion-projet.md`
