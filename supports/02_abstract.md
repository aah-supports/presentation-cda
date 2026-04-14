# Concepteur développeur d'applications

Note relative à la certification du titre Concepteur développeur d'applications.

documents annexes :

- https://www.francecompetences.fr/recherche/rncp/31678/
- RCV2_CDA_V03_03052018.pdf
- REAC_CDA_V03_03052018.pdf
- Dossier_professionnel_version_traitement_de_texte.docx

## Introduction

Les élèves suivant cette formation sont déjà des développeurs, l'objectif de ce titre est de les amener à un niveau leur permettant de répondre à un besoin client, d'analyser la demande, de conceptualiser une réponse et de mettre en oeuvre un développement qui a pour mission de répondre aux problématiques énoncées par la demande, avec pour fil rouge l'intégration des recommandations de sécurité, et la qualité de la solution apportée.

Dans ce contexte, se contenter d'une présentation finale de l'application, et par exemple juste du modèle physique de données serait un hors sujet, nous attendons des candidats de savoir exposer toute la démarche d'analyse, de conception, de mise en oeuvre et de contrôle.

Les compétences du titre sont classées dans 3 activités :

- Concevoir et développer des composants d'interface utilisateur en intégrant les recommandations de sécurité
- Concevoir et développer la persistance des données en intégrant les recommandations de sécurité
- Concevoir et développer une application multicouche répartie en intégrant les recommandations de sécurité


## Livrables attendus

Les livrables attendus sont un dossier professionnel (`DP`) et un dossier projet.

### Le dossier professionnel

Le dossier professionnel est un document déjà charté mis à disposition par le ministère du travail, ce document a pour but de lister toute expérience illustrant une compétence du titre (expérience réalisée en entreprise, en formation (si expérience en entreprise pas suffisamment riche), ou sur des expériences passées (stage), il doit être rempli régulièrement tout au long de l'année, tant que les sujets sont "chauds".

(cf: dans les annexes `Dossier_professionnel_version_traitement_de_texte.pdf`)

### Le dossier projet

Les diagrammes attendus fortement recommandés :

1. Diagramme de cas d'utilisation (qui fait quoi)
1. Diagramme de classes (modèle objet métier)
1. Diagramme de séquence (scénario clé, ex: ajouter un film)
1. Diagramme d'activité (flux fonctionnel)
1. diagramme de composants (architecture),
1. et côté données: MCD/MLD (même si ce n'est pas UML pur).

Dans votre dossier placez ces diagramme dans les sections suivantes :

```txt
1. Spécifications fonctionnelles

- Use Case (01_use-case-...)
- Activité (04_activite-...)

2. Spécifications techniques

- Classes (02_classes-...)
- Séquence (03_sequence-...)
- Composants (05_composants-...)
```

Le dossier projet est le document principal permettant la certification du titre. D'une volumétrie de minimum 70 pages, ce document sera une illustration de la démarche énoncée en introduction.

Le dossier de projet respecte ce plan type :

- Liste des compétences du référentiel qui sont couvertes par le projet.
- Résumé du projet en anglais d'une longueur d'environ 20 lignes soit 200 à 250 mots, ou environ 1200 caractères espaces non compris
- Cahier des charges ou expression des besoins du projet.
- Gestion de projet (planning et suivi, environnement humain et technique, objectifs de qualité)

```txt
  1. Créer le Product Backlog (US priorisées).
  2. Estimer (planning poker) en story points.
  3. Construire une roadmap (jalons mensuels).
  4. Préparer un sprint backlog (tâches + estimations temps).
  5. Suivre chaque semaine :
      - prévu vs réalisé,
      - blocages,
      - replanification.
  6. Garder des preuves (captures board, Gantt, historique commits).
```

- Spécifications fonctionnelles du projet.

```txt
  - cas d'usage / user stories,
  - entrées/sorties attendues,
  - critères d'acceptation,
  - gestion des erreurs côté métier.
```

Exemple dans votre dossier de ce que vous devez faire 

```txt
 1. Objectif fonctionnel

  - Ce que couvre le projet (périmètre métier).

  2. Acteurs

  - Qui utilise l'application (admin, utilisateur, etc.).

  3. Fonctionnalités (une sous-section par feature)

  - Description
  - Préconditions
  - Scénario nominal
  - Scénarios d'erreur
  - Critères d'acceptation

  4. Règles de gestion

  - Contraintes métier (ex: année >= 1888, champs obligatoires).

  5. Matrice de traçabilité

  - Exigence -> US -> Test (très apprécié en jury).
```

- Spécifications techniques du projet, élaborées par le candidat, y compris pour la sécurité.

`décision technique + preuves.`

```txt
 Plan simple qui marche bien en dossier CDA :

  1. Périmètre technique

  - Stack choisie (versions)
  - Contraintes techniques
  - Ce qui est hors scope

  2. Architecture

  - Schéma des composants (front, back, BDD)
  - Flux principaux
  - Justification des choix

  3. Modèle de données

  - Schéma des tables/entités
  - Types, contraintes, clés
  - Règles d'intégrité

  4. Spécifications API / composants

  - Endpoints, méthodes, payloads
  - Codes de réponse
  - Gestion des erreurs

  5. Sécurité (obligatoire dans cette section)

  - Validation stricte des entrées
  - Requêtes SQL paramétrées (anti-injection)
  - Gestion des erreurs sans fuite d'info
  - Journalisation minimale (logs utiles, pas de données sensibles)
  - Contrôles d'accès si auth prévue
  - Environnements/sécrets (.env, pas de secrets dans Git)

  6. Qualité et performance

  - Objectifs mesurables (ex: réponse < 1s sur 200 films)
  - Stratégie de tests (unitaires, intégration, manuel)
  - Outils qualité (lint, CI, Sonar si utilisé)

  7. Déploiement et exploitation

  - Environnements (dev/test/prod)
  - Procédure de build/run
  - Rollback basique

  8. Traçabilité

  - Besoin/SF -> choix technique -> test de validation

  Pour la partie sécurité, ajoutez un mini tableau :

  - Risque: injection SQL
    Mesure: requêtes préparées
    Preuve: extrait de code + test
  - Risque: entrée invalide
    Mesure: validation serveur
    Preuve: cas de test rejeté
  - Risque: fuite d'erreur interne
    Mesure: message générique côté client
    Preuve: capture/API response
```

- Réalisations du candidat comportant les extraits de code les plus significatifs et en les argumentant, y compris pour la sécurité.

- Exemples d'outils / stacks possibles (non imposés).

```txt
  Le jury n'impose pas une stack unique.
  Il évalue surtout la cohérence des choix techniques, la maîtrise et les preuves.

  Exemples possibles :
  - Gestion de projet : Jira, Trello, Notion, Confluence, Gantt.
  - Développement : Node/TypeScript, Symfony/PHP, Java/Spring, .NET.
  - Données : PostgreSQL, MySQL, MongoDB, Redis.
  - Tests / qualité : Jest, PHPUnit, Cypress, SonarQube.
  - CI/CD : GitHub Actions, GitLab CI, Jenkins, Docker.
  - Monitoring : ELK/Kibana, Grafana/Loki, Sentry.
```

- Plan de tests minimal attendu (recommandé pour le dossier).

```txt
  Objectif: expliquer clairement comment vous validez votre solution.

  1. Périmètre de test
  - quelles user stories / endpoints sont testés

  2. Types de tests
  - unitaire
  - intégration API
  - fonctionnel / E2E (ou manuel guidé)

  3. Jeux de données
  - cas nominal
  - cas limites
  - cas d'erreur

  4. Critères de réussite
  - statut HTTP attendu
  - résultat fonctionnel attendu
  - message d'erreur attendu

  5. Preuves
  - capture, log, sortie de test, tableau attendu/réel
```

- Présentation du jeu d'essai élaboré par le candidat de la fonctionnalité la plus représentative (données en entrée, données attendues, données obtenues).

```txt
  Vous devez présenter 3 choses :

  - Données en entrée : ce que tu envoies (ex: payload JSON, actions UI).
  - Données attendues : le résultat théorique prévu.
  - Données obtenues : le résultat réel observé (capture, réponse API, base mise à jour).

  Exemple (app films, fonction “Ajouter un film”) :

  - Entrée :

  {"title":"Inception","director":"Christopher Nolan","year":2010,"genre":"Sci-Fi"}

  - Attendu :
      - HTTP 201,
      - film ajouté dans la liste avec les mêmes valeurs.
  - Obtenu :
      - HTTP 201,
      - réponse API contient le film + id,
      - capture écran montrant le film dans le tableau.

  Le jury veut voir que vous savez concevoir un test, vérifier l'écart attendu/réel, et
  analyser le résultat.
```

**Vocabulaire de tests**
  - via l'interface complète : test fonctionnel / test E2E,
  - via endpoint API : test d'intégration API,
  - sur une fonction isolée : test unitaire.

- Description de la veille, effectuée par le candidat durant le projet, sur les vulnérabilités de sécurité.

### Exemple

  1. Objectif de veille

  - Pourquoi tu fais cette veille (réduire les risques sécurité du projet).

  2. Périmètre

  - Ce que tu surveilles : stack utilisée (Node/Express, dépendances npm, API web, auth,
    OWASP Top 10).

  3. Méthode

  - Sources : OWASP, CERT-FR/ANSSI, CVE, GitHub Advisories, npm audit.
  - Fréquence : ex. 1 fois/semaine + avant livraison.
  - Process : identifier -> qualifier -> décider -> corriger -> vérifier.

  4. Journal de veille (tableau)

  - Date
  - Source
  - Vulnérabilité / risque
  - Impact sur ton projet
  - Décision prise
  - Action réalisée
  - Preuve (commit, capture, rapport)

  5. Application concrète au projet

  - 1 à 3 cas réels max :
      - risque détecté,
      - correction appliquée,
      - résultat après correction.

  6. Bilan

  - Ce que la veille a amélioré (ex: dépendances mises à jour, validation renforcée).
  - Limites restantes / actions futures.

  Format de tableau prêt à l'emploi

  | Date | Source | Vulnérabilité/Risque | Impact projet | Action | Preuve |
  |---|---|---|---|---|---|
  | 2026-04-10 | npm audit | Dépendance vulnérable | API exposée | Upgrade package |
  commit + capture audit |
  | 2026-04-12 | OWASP | Injection | Endpoint recherche | Validation + requêtes
  paramétrées | extrait code + test |


- Description d'une situation de travail ayant nécessité une recherche et effectuée par le candidat durant le projet.

```txt
• Tu le rédiges comme un mini retour d'expérience technique, centré sur un blocage réel.

  Format simple (1 page max) :

  1. Contexte de travail
     Ce qui bloquait concrètement.
  3. Objectif de la recherche
     Ce que tu devais trouver/valider.
  4. Démarche de recherche
     Sources consultées, mots-clés, essais réalisés.
  5. Analyse des options
     Solutions envisagées + pourquoi tu en choisis une.
  6. Mise en œuvre
     Ce que tu as changé dans le projet.
  7. Résultat obtenu
     Avant/après, preuve (test, capture, log, commit).
  8. Capitalisation
     Ce que tu retiens pour les prochains projets.
```

Pour réaliser ce dossier, le candidat devra s'appuyer :

- soit sur un projet réalisé dans son entreprise, couvrant l'ensemble des compétences à évaluer
- soit 2 projets en entreprise couvrant (à eux deux) l'ensemble des compétences
- soit un projet d'entreprise et un projet perso couvrant (à eux deux) l'ensemble des compétences

#### Le projet perso (fil rouge)
Ce projet est initié en début de formation, et relève d'un travail personnel du candidat, ce projet peut être rattaché à une demande réelle dans l'entourage du candidat (milieu associatif, entreprenariat ...) ou une initiative personnelle.

Cependant ce projet doit être traité comme une demande dans le cadre professionnel, à savoir, partir d'un besoin et dérouler les différentes étapes énoncées plus haut.

Ce projet a 3 objectifs :

- permettre d'avoir une expérience complémentaire afin éventuellement de pallier à un manque de compétences dans l'alternance en entreprise.
- permettre de mettre en pratique, en plus des modules suivis pendant l'année, les notions de la formation.
- permettre d'avoir un projet supplémentaire à montrer pour toute démarche de recrutement après la formation.

__Remarque:__

j'insiste sur l'initiative de ce projet, et le travail personnel que doit fournir le candidat.

Suivant les profils, certains candidats n'auront sûrement pas besoin de ce projet perso pour valider leur certification, mais mon expérience en jury CDA m'a montré, à plusieurs reprises, que cette initiative peut sauver le candidat quand l'entreprise ne joue pas le rôle qui lui est demandé.

Autant les candidats sont à égalité sur la partie formation, autant en entreprise cela n'est pas tout le temps le cas.

## Epreuve orale

L'épreuve décrite sur RCV2_CDA_V03_03052018.pdf est divisée en 3 phases :

### Présentation projet

Durant cette partie de 40min, seul le candidat prendra la parole, et devra soutenir son dossier projet à l'aide d'un support de présentation numéroté.

Le candidat commence sa présentation au jury par un résumé en anglais de son projet.

Il présente ensuite son projet à l'aide d'un support de présentation réalisé en amont de l'épreuve, et selon ce canevas :

- Présentation de l'entreprise et/ou du service
- Contexte du projet (cahier des charges, contraintes, livrables attendus)
- Gestion de projet (planning et suivi, environnement humain et technique, objectifs de qualité)
- Analyse du besoin
- Conception et codage
- Présentation des éléments les plus significatifs de l'interface de l'application
- Présentation du jeu d'essai de la fonctionnalité la plus représentative (données en entrée, données attendues, données obtenues) et analyse des écarts éventuels
- Présentation d'un exemple de recherche effectuée à partir de site anglophone
- Synthèse et conclusion (satisfactions et difficultés rencontrées)

### L'entretien technique

D'une durée de 45 minutes, le jury reviendra sur la présentation du candidat, sur le dossier professionnel et éventuellement pourra le mettre en situation avec des questions fournies à l'ouverture de la session d'examens afin de valider des compétences non illustrées dans les livrables et lors de la soutenance du candidat.

### L'entretien final

D'une durée de 20 minutes, cet entretien a pour but d'évaluer la posture professionnelle et la compréhension des enjeux de la profession de la part du candidat.

## Conclusion

Vous trouverez en complément de cette note, 2 exemples de livrables d'anciens élèves comprenant :

- le dossier professionnel
- le dossier projet
- la fiche résumé
- le support de présentation
