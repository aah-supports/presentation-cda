# Glossaire technique - Gestion de projet (CDA)

Objectif: disposer d'un vocabulaire commun pour cadrer, piloter et livrer un projet de developpement.

## 1. Cadrage

| Terme | Definition courte | Exemple concret |
|---|---|---|
| Expression du besoin | Description initiale du probleme, contexte et objectifs. | "Nous voulons un LMS pour suivre la progression des apprenants." |
| Vision produit | Direction globale du produit et valeur cible. | "Rendre la formation CDA mesurable et personnalisable." |
| Partie prenante | Personne/entite impactee par le projet. | Centre, formateur, apprenant, equipe admin. |
| Objectif metier | Resultat attendu cote activite/metier. | Diminuer l'abandon de parcours de 15%. |
| Perimetre | Ce qui est inclus dans la version visee. | Gestion modules + QCM + suivi de base. |
| Hors perimetre | Ce qui est reporte a plus tard. | Marketplace de contenus en phase 3. |
| MVP | Version minimale livrable et utile. | Module, evaluation, suivi progression simple. |
| Hypothese | Point suppose vrai sans preuve definitive. | "Les formateurs utilisent deja un LMS." |

## 2. Backlog et priorisation

| Terme | Definition courte | Exemple concret |
|---|---|---|
| Epic | Grand besoin decoupe en stories. | "Pilotage de promotion" |
| User story | Besoin formule cote utilisateur. | "En tant que formateur..." |
| Critere d'acceptation | Conditions de validation d'une story. | "Le score QCM est visible apres soumission." |
| Backlog produit | Liste priorisee des besoins. | 40 stories ordonnees par valeur. |
| Sprint backlog | Sous-ensemble prevu pour un sprint. | 8 stories retenues pour 2 semaines. |
| Priorisation | Classement des items selon valeur/risque/effort. | Reordonner backlog apres retour terrain. |
| MoSCoW | Must/Should/Could/Won't. | Authentification = Must, forum = Could. |
| WSJF (simplifie) | Prioriser valeur relative sur effort. | Story A avant B car impact plus fort a cout proche. |

## 3. Estimation et planification

| Terme | Definition courte | Exemple concret |
|---|---|---|
| Estimation | Evaluation de l'effort/complexite. | Story estimee a 5 points. |
| Story point | Unite relative de complexite. | US-12 = 8 SP, plus complexe que US-03 (3 SP). |
| Planning Poker | Technique d'estimation collaborative par cartes. | Equipe vote 3/5/8 puis converge sur 5. |
| Capacite | Charge max realisable sur une periode. | 30 SP disponibles sur sprint. |
| Jalon (Milestone) | Point de controle sans duree. | "MVP valide". |
| Dependance | Tache conditionnee par une autre. | Tests API apres implementation endpoint. |
| Roadmap | Vue temporelle des objectifs majeurs. | Phase 1 MVP, phase 2 evaluations avancees. |
| Diagramme de Gantt | Planning de taches datees/dependantes. | Lot "QCM" du 1 au 10 avril. |

## 4. Execution Agile/Scrum

| Terme | Definition courte | Exemple concret |
|---|---|---|
| Sprint | Iteration time-boxee de production. | Sprint de 2 semaines. |
| Sprint Planning | Atelier de selection et plan sprint. | Choix des stories du sprint backlog. |
| Daily Stand-up | Point quotidien court d'alignement. | Avancement, blocages, plan du jour. |
| Sprint Review | Demonstration de l'increment livre. | Demo du module d'evaluation. |
| Retrospective | Amelioration continue du fonctionnement equipe. | Action: reduire les stories floues. |
| Increment | Valeur livree a la fin du sprint. | API QCM fonctionnelle et testee. |
| Definition of Ready (DoR) | Critere d'entree d'une story en sprint. | Story claire, criteres d'acceptation ecrits. |
| Definition of Done (DoD) | Critere de sortie "termine". | Code, tests, doc, revue OK. |

## 5. Pilotage, qualite et risque

| Terme | Definition courte | Exemple concret |
|---|---|---|
| KPI | Indicateur de performance projet/produit. | Taux de completion des modules. |
| Risque | Evenement incertain a impact negatif possible. | Retard integration SSO. |
| Mitigation | Action de reduction du risque. | Spike technique en avance de phase. |
| Dette technique | Choix technique court terme qui coute plus tard. | Contournement temporaire sans tests. |
| Non-regression | Verification qu'un ajout ne casse pas l'existant. | Rejouer suite de tests API. |
| Recette | Validation metier avant mise en service. | Formateur valide le parcours evaluation. |
| Go/No-Go | Decision de mise en production. | Report si critere securite non atteint. |
| Retour d'experience (REX) | Capitalisation des apprentissages projet. | Liste actions d'amelioration pour prochain lot. |

## 6. Utilisation conseillee en cours

- Utiliser ce glossaire pour harmoniser le vocabulaire des equipes.
- Citer les termes dans les livrables (CDC, backlog, specs, planning).
- Ajouter vos propres exemples lies a votre projet fil rouge.
