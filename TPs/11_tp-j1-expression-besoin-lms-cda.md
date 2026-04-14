# TP 11 - Jour 1: Expression du besoin (LMS CDA)

Duree conseillee: 1 journee (6h a 7h)

Objectif: transformer un texte d'expression des besoins en livrables projet exploitables des le J2.

Contexte: plateforme LMS orientee titre RNCP CDA, avec 4 profils (administrateur, centre de formation, formateur, apprenant), contenus pedagogiques, evaluations, suivi de progression et logique de phases (MVP puis enrichissements).

## 1. Ce que vous recevez

Vous partez d'un texte d'expression des besoins brut (vision, cible, parcours apprenant, roles, modules, trame, dossiers transverses, roadmap par phases).

## 2. Ce que vous devez produire en fin de J1

1. Vision produit en 10 lignes max.
2. Perimetre MVP (phase 1) + hors perimetre (phase 2/3).
3. Acteurs et responsabilites (table claire).
4. Parcours apprenant simplifie (5 etapes max).
5. Backlog initial priorise (10 a 15 user stories).
6. Diagramme use case UML de niveau macro.
7. Liste des zones floues / risques / questions ouvertes.

## 3. Planning recommande

### Bloc 1 (45 min)

- Lecture collective du besoin.
- Reformulation du probleme a resoudre.

Sortie attendue: objectif produit + valeur metier.

### Bloc 2 (1h)

- Identification des acteurs et de leurs attentes.
- Clarification des interactions principales.

Sortie attendue: tableau acteurs / besoins / droits.

### Bloc 3 (1h)

- Reprise du scenario apprenant.
- Simplification en parcours lisible (de l'entree a la sortie).

Sortie attendue: parcours type en 5 etapes.

### Bloc 4 (1h)

- Decoupage MVP vs phases 2/3.
- Arbitrage must/should/could/wont.

Sortie attendue: perimetre valide.

### Bloc 5 (1h30)

- Redaction des user stories.
- Priorisation (MoSCoW ou WSJF simplifie).

Sortie attendue: backlog initial ordonne.

### Bloc 6 (45 min)

- Construction du use case global.
- Consolidation des risques et des questions.

Sortie attendue: use case + registre de questions.

## 4. Contraintes

- Pas de conception technique detaillee (pas de schema BDD, pas d'architecture cible complete).
- Niveau attendu: cadrage fonctionnel projet.
- Les livrables doivent etre lisibles par un PO, un formateur et un jury CDA.

## 5. Glossaire contextuel (termes du TP)

| Terme | Definition courte | Application dans ce TP |
|---|---|---|
| Expression du besoin | Description initiale du probleme, des attentes et du contexte. | Le texte LMS fourni en entree. |
| Vision produit | Intention globale du produit, pour qui et pour quelle valeur. | A rediger en 10 lignes max. |
| Perimetre | Ce qui est inclus dans la version visee. | Fonctionnalites retenues en phase 1. |
| Hors perimetre | Ce qui est explicitement reporte. | Fonctions phase 2/3 non traitees en J1. |
| MVP | Version minimale utile pour valider la valeur metier. | LMS de base: contenus + suivi essentiel. |
| Partie prenante | Acteur impacte par le projet. | Admin, centre, formateur, apprenant. |
| User story | Besoin formule du point de vue utilisateur. | Backlog initial de 10 a 15 US. |
| Backlog produit | Liste priorisee des besoins a realiser. | Livrable central de fin de J1. |
| Priorisation | Ordonnancement des besoins selon la valeur/urgence/risque. | MoSCoW ou WSJF simplifie. |
| MoSCoW | Methode Must/Should/Could/Won't pour trier les besoins. | Decoupage MVP vs phase 2/3. |
| WSJF | Priorisation par valeur relative sur effort (version simplifiee). | Alternative a MoSCoW pour trancher. |
| Use case | Diagramme des interactions acteurs-systeme. | Vue macro du LMS en fin de journee. |
| Hypothese | Point suppose vrai a valider ensuite. | Ex: authentification deja disponible. |
| Risque | Evenement incertain avec impact negatif possible. | Ex: perimetre trop large pour MVP. |
| Question ouverte | Point non tranche qui bloque ou fragilise la suite. | Ex: regles d'evaluation formateur. |
| Definition of Done | Conditions minimales pour considerer le travail termine. | Check-list J1 a valider en equipe. |

## 6. Definition of Done (J1)

- [ ] Vision produit claire
- [ ] MVP delimite et argumente
- [ ] Acteurs et droits explicites
- [ ] Backlog initial priorise
- [ ] Use case macro fourni
- [ ] Questions ouvertes tracees

## 7. Trame de rendu obligatoire

Utiliser la trame suivante:

- `TPs/11_trame-rendu-j1-expression-besoin-lms-cda.md`

## 8. Evaluation rapide

- Qualite du cadrage metier: 40%
- Coherence des priorites: 30%
- Clarte des livrables: 20%
- Qualite des questions ouvertes: 10%

## 9. Suite logique (J2)

A partir de ces livrables, vous pourrez enchaîner sur:

- cahier des charges cible
- specifications fonctionnelles
- specifications techniques
- backlog sprintable

## 10. Glossaire complet recommande

- `TPs/12_glossaire-technique-gestion-projet.md`
