# TP - Suite Agile : User Stories, Product Backlog et Sprint Backlog

## 1. Contexte du TP
Ce document complete le cahier des charges du TP "mini application gestion de films".

Reference : `TPs/cahier-des-charges-mini-app-gestion-films.md`

Objectif : passer du besoin au plan d'execution Scrum sur un sprint court de 3h.

## 2. User Stories (version exploitable)

### US-01 - Ajouter un film
En tant qu'utilisateur
Je veux ajouter un film (titre, realisateur, annee, genre)
Afin d'enrichir le catalogue.

Criteres d'acceptation :
- tous les champs sont obligatoires ;
- l'annee doit etre numerique et >= 1888 ;
- apres validation, le film apparait dans la liste.

### US-02 - Lister les films
En tant qu'utilisateur
Je veux voir la liste des films
Afin de consulter le catalogue.

Criteres d'acceptation :
- la liste affiche `title`, `director`, `year`, `genre` ;
- l'ordre par defaut est alphabetique sur `title`.

### US-03 - Rechercher un film
En tant qu'utilisateur
Je veux rechercher un film par titre
Afin de retrouver rapidement un film.

Criteres d'acceptation :
- la recherche est partielle et insensible a la casse ;
- si aucun resultat, afficher "Aucun film trouve".

### US-04 - Supprimer un film
En tant qu'utilisateur
Je veux supprimer un film
Afin de nettoyer le catalogue.

Criteres d'acceptation :
- une confirmation est demandee avant suppression ;
- apres suppression, le film disparait de la liste.

## 3. Refinement (clarification avant estimation)

Points clarifies pendant refinement :
- stockage local en memoire (tableau JS) pour tenir le timing 3h ;
- tri par titre realise cote front ;
- recherche uniquement sur le titre (pas filtre genre/annee dans ce TP) ;
- suppression logique immediate après confirmation navigateur.

Définition of Ready (DoR) validée pour chaque `US` :
- description claire,
- critères d'acceptation testables,
- pas de dépendance bloquante.

## 4. Estimation Planning Poker 

Echelle utilisee : Fibonacci (`1, 2, 3, 5, 8`).

| US | Vote A | Vote B | Vote C | Consensus | Motif principal |
|---|---:|---:|---:|---:|---|
| US-01 Ajouter un film | 3 | 5 | 3 | 3 | validation + formulaire simple |
| US-02 Lister les films | 2 | 2 | 3 | 2 | affichage simple + tri basique |
| US-03 Rechercher un film | 3 | 5 | 3 | 3 | filtrage partiel + gestion vide |
| US-04 Supprimer un film | 2 | 3 | 2 | 2 | action simple + confirmation |

Total Product Backlog initial : **10 story points**.

## 5. Product Backlog priorise

| Priorite | ID | Story | Story points | Valeur metier | Risque |
|---:|---|---|---:|---|---|
| 1 | US-01 | Ajouter un film | 3 | Critique | Moyen |
| 2 | US-02 | Lister les films | 2 | Critique | Faible |
| 3 | US-03 | Rechercher un film | 3 | Elevee | Moyen |
| 4 | US-04 | Supprimer un film | 2 | Moyenne | Faible |

Ou ca s'ecrit :
- Product Backlog (Jira/Trello): ID, story, criteres, priorite, story points.
- Documentation (Notion/Confluence): decisions de refinement et hypotheses.

## 6. Sprint Goal (3h)

**Sprint Goal** : "Permettre la gestion complete d'un petit catalogue de films en local (ajout, affichage, recherche, suppression)."

Capacite sprint : 3h (180 min).

Selection sprint : US-01, US-02, US-03, US-04 (10 SP).

## 7. Sprint Backlog (taches techniques + estimation en minutes)

| US | Tache technique | Estimation |
|---|---|---:|
| US-01 | Creer structure `Film` + store en memoire | 15 min |
| US-01 | Formulaire ajout film + validations | 35 min |
| US-01 | Liaison formulaire -> liste | 15 min |
| US-02 | Composant/tableau liste films | 20 min |
| US-02 | Tri alphabetique par titre | 10 min |
| US-03 | Champ recherche + filtre titre | 25 min |
| US-03 | Message "Aucun film trouve" | 10 min |
| US-04 | Bouton suppression + confirmation | 15 min |
| US-04 | Mise a jour liste apres suppression | 10 min |
| QA | Tests manuels parcours principal | 15 min |
| DOC | README + capture ecran | 10 min |

Total estime : **180 min**.

Où ça s'ecrit :
- Sprint Backlog (Jira/Trello board sprint): stories selectionnees + taches + estimation temps.

## 8. Board Kanban de depart (exemple)

### To Do
- US-01 formulaire + validation
- US-02 liste + tri
- US-03 recherche
- US-04 suppression
- README

### In Progress
- (vide au demarrage)

### In Review/Test
- (vide au demarrage)

### Done
- (vide au demarrage)

## 9. Plan de vérification rapide (Definition of Done du TP)
Checklist de fin de sprint :
- [ ] je peux ajouter un film valide ;
- [ ] je ne peux pas soumettre un film invalide ;
- [ ] la liste affiche correctement les 4 champs ;
- [ ] la recherche par titre fonctionne ;
- [ ] le message "Aucun film trouve" s'affiche correctement ;
- [ ] la suppression retire bien le film ;
- [ ] README present avec commande de lancement.

## 10. Traces a garder pour le dossier CDA

- capture du Product Backlog priorise,
- capture du Sprint Backlog,
- résultat planning poker (table des votes),
- capture de l'application fonctionnelle,
- historique Git des commits du sprint.
