# Cahier des charges - Mini application "Gestion de films" (POC 3h)

## 1. Contexte
L'objectif est de realiser une mini application web permettant de gerer un petit catalogue de films dans un temps limite (3 heures de developpement), pour demontrer une demarche CDA: besoin, perimetre, realisation, validation.

## 2. Objectif du projet
Livrer un MVP fonctionnel qui permet a un utilisateur de:
- ajouter un film,
- consulter la liste des films,
- rechercher un film par titre,
- supprimer un film.

## 3. Perimetre fonctionnel

### 3.1 Fonctionnalites incluses (In scope)
1. Formulaire d'ajout d'un film:
- Titre (obligatoire)
- Realisateur (obligatoire)
- Annee (obligatoire, numerique)
- Genre (obligatoire)

2. Liste des films:
- Affichage tableau (titre, realisateur, annee, genre)
- Tri alphabetique par titre (simple)

3. Recherche:
- Champ de recherche par titre (partiel, insensible a la casse)

4. Suppression:
- Suppression d'un film depuis la liste
- Confirmation simple avant suppression

### 3.2 Hors perimetre (Out of scope)
- Authentification / gestion des roles
- Upload d'affiche
- Pagination avancee
- API publique documentee
- Deploiement cloud

## 4. Utilisateurs cibles
- Utilisateur interne (formateur/etudiant) utilisant l'application en local.

## 5. Exigences non fonctionnelles
- Application utilisable sur navigateur desktop moderne.
- Temps de reponse percu < 1 seconde sur un petit volume (<= 200 films).
- Validation des champs obligatoire cote front (et idealement cote back).
- Messages d'erreur comprehensibles.

## 6. Donnees manipulees
Entite `Film`:
- `id` (identifiant unique)
- `title` (string, requis)
- `director` (string, requis)
- `year` (number, requis, >= 1888)
- `genre` (string, requis)

## 7. Criteres d'acceptation globaux
- Le parcours principal est realisable de bout en bout: ajout -> affichage -> recherche -> suppression.
- Les validations de champs obligatoires bloquent les entrees invalides.
- La recherche par titre retourne des resultats partiels et gere le cas "aucun resultat".
- La suppression retire immediatement l'element de la liste apres confirmation.

Note: le detail en User Stories, Product Backlog, Sprint Backlog et Definition of Done (DoD) est volontairement documente dans `02_backlog-et-sprint-mini-app-gestion-films.md`.

## 8. Livrables attendus
- Code source du MVP.
- README court (lancement + fonctionnalites).
- Capture ecran ou mini demo.

## 9. Planning previsionnel (3h)
- 0h00 - 0h20: cadrage + structure projet
- 0h20 - 1h20: ajout + listing films
- 1h20 - 1h50: recherche par titre
- 1h50 - 2h20: suppression + validations
- 2h20 - 2h45: tests manuels + corrections
- 2h45 - 3h00: README + preparation demo

## 10. Hypotheses et risques
Hypothèses:
- Stack simple et maitrisée
- Travail en local sans dependances complexes.

Risques:
- Depassement de temps si UI trop ambitieuse.
- Bugs de validation de formulaire.

Mesures:
- Prioriser le fonctionnel minimal.
- Garder une UI simple.
- Tester chaque fonctionnalite des son implémentation.
