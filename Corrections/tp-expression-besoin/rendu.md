# Correction TP 11 - J1 (Expression du besoin / CDC)

Projet : Mini application web Films d'art et essai  
Équipe : Exemple CDA  
Date : 14/04/2026

Référence modèle dossier CDA :
- `annexes/DossierProjet-CDA-modele-pro.md`

## 1. Contexte de départ

- Problème à résoudre : L'offre de films d'art et d'essai est en général peu lisible (sur les plateformes de streaming comme dans les salles de cinéma indépendantes), ce qui complique la recherche et la découverte pour le cinéphile passionné par ce genre.

- Public cible : passionnés de cinéma, utilisateurs occasionnels intéressés par le cinéma, exploitants de cinéma, ciné-clubs.
- Valeur attendue : proposer un catalogue clair, consultable et filtrable, avec une liste personnelle "À voir".
- Résultat attendu : un `MVP` démontrable qui couvre la découverte de films et la préparation d'un visionnage.

## 2. Objectifs mesurables

- Objectif 1 : permettre la consultation d'un catalogue initial de 20 films minimum.
- Objectif 2 : permettre la recherche d'un film par titre, mots clés, genre, réalisateur ou année.
- Objectif 3 : permettre l'ajout d'un film dans une liste "À voir" en moins de 3 clics/actions.

## 3. Périmètre

### 3.1 MVP (phase 1)

- Fonctionnalités incluses :
  - consulter le catalogue
  - rechercher/filtrer (titre, réalisateur, année)
  - consulter la fiche détaillée d'un film
  - ajouter/retirer un film de la liste "À voir"
  - administrer les fiches films (CRUD)
- Critère de succès MVP : un utilisateur trouve un film et l'ajoute à sa liste "À voir" sans assistance.

### 3.2 Hors périmètre 

- Fonctionnalités reportées :
  - commentaires et notes publiques
  - recommandations automatiques avancées
  - planning de séances/festivals
  - modération éditoriale avancée

## 4. Contraintes

- Délai : 1 semaine de cadrage.
- Contraintes techniques : aucune conception technique détaillée à ce stade.
- Ressources / organisation : travail en petite équipe ou individuel.

## 5. Acteurs et responsabilités

| Acteur | Objectif principal | Actions autorisées |
|---|---|---|
| Administrateur éditorial | Maintenir la qualité du catalogue | Créer, modifier, supprimer une fiche film, taguer un film |
| Passionné de cinéma | Trouver des films pertinents | Consulter, rechercher, ajouter/retirer de "À voir" |

Évolutions possibles :
- Modérateur : valider ou retirer du contenu utilisateur.
- Partenaire événementiel : proposer des événements liés aux films.

## 6. Parcours utilisateur principal (5 étapes max)

1. L'utilisateur arrive sur le catalogue.
2. Il applique une recherche/filtre.
3. Il ouvre une fiche film.
4. Il décide si le film l'intéresse.
5. Il ajoute le film à sa liste "À voir".

## 7. Questions ouvertes / risques / hypothèses

| Type | Point | Impact | Action proposée |
|---|---|---|---|
| Question | La liste "À voir" nécessite-t-elle un compte dès le MVP ? | Peut élargir le scope fonctionnel | Décision en revue de cadrage |
| Question | Qui fournit les 20 films initiaux ? | Retard possible de contenu | Préparer un lot de données de départ |
| Risque | MVP trop chargé | Perte de focus sur la valeur | Limiter le MVP aux fonctions cœur |
| Risque | Données hétérogènes | Recherche moins pertinente | Définir des règles de saisie minimales |
| Hypothèse | Un admin est disponible régulièrement | Maintenance catalogue sous-estimée | Formaliser un rythme de mise à jour |

## 8. Validation interne équipe

- [x] périmètre MVP clair
- [x] hors périmètre explicite
- [x] contraintes réalistes
- [x] acteurs et parcours cohérents
- [x] questions ouvertes tracées
- [x] rendu lisible pour un jury CDA

## 9. Positionnement dans le dossier CDA

Cette correction correspond au **chapitre CDC** (expression du besoin / périmètre) et peut être placée en premier dans la partie fonctionnelle du dossier projet.
