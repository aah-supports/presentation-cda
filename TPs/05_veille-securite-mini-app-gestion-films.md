# Veille securite - Mini application Gestion de films

## 1. Objectif de la veille
Mettre en place une veille securite pendant le projet pour identifier les vulnerabilites pertinentes, evaluer leur impact et appliquer des mesures de reduction du risque.

## 2. Perimetre de veille
- Stack technique: Node.js, Express, JavaScript, npm.
- Surface d'attaque: validation des entrees, API HTTP, gestion des erreurs, dependances.
- References ciblees: OWASP Top 10, advisories npm, CVE publiques, recommandations ANSSI/CERT-FR.

## 3. Methode de veille

### 3.1 Sources utilisees
- OWASP (Top 10, cheat sheets)
- npm audit (dependances)
- GitHub Security Advisories
- CERT-FR / ANSSI (alertes securite)

### 3.2 Frequence
- 1 passage de veille par semaine pendant le developpement
- 1 passage complet avant livraison du TP

### 3.3 Processus applique
1. Identifier la vulnerabilite ou la recommandation.
2. Evaluer l'impact possible sur le projet.
3. Decider de l'action (corriger, surveiller, accepter temporairement).
4. Implementer la correction.
5. Verifier et conserver une preuve (capture, commit, test, rapport).

## 4. Journal de veille (trace dossier CDA)

| Date | Source | Sujet / Risque | Impact sur le projet | Decision | Action appliquee | Preuve |
|---|---|---|---|---|---|---|
| 2026-04-08 | OWASP | Validation insuffisante des entrees | Donnees invalides ou malveillantes via API | Corriger | Validation stricte des champs `title`, `director`, `year`, `genre` | Extrait validator + test 400 |
| 2026-04-09 | npm audit | Dependance avec faille de securite | Risque potentiel via package tiers | Corriger | Mise a jour de la dependance mineure compatible | Capture audit avant/apres + commit |
| 2026-04-10 | OWASP API Security | Fuite d'informations en message d'erreur | Divulgation details techniques cote client | Corriger | Messages d'erreur generiques cote API | Capture reponse API erreur |
| 2026-04-11 | CERT-FR | Bonnes pratiques de gestion des secrets | Exposition possible de variables sensibles | Corriger | `.env` non committe + `.env.example` ajoute | Extrait `.gitignore` + fichier exemple |

## 5. Application concrete au projet

### Cas A - Validation des entrees
- Observation: les entrees utilisateur pouvaient etre incompletes ou invalides.
- Risque: incoherence de donnees, erreurs d'execution.
- Action: validation serveur de tous les champs obligatoires + controle `year >= 1888`.
- Resultat: les payloads invalides retournent `400 Bad Request`.

### Cas B - Gestion des erreurs API
- Observation: reponses d'erreur trop detaillees lors des tests.
- Risque: fuite d'informations internes.
- Action: standardisation des messages d'erreur client (`invalid payload`, `not found`).
- Resultat: aucune info technique sensible exposee aux utilisateurs.

### Cas C - Dependances npm
- Observation: alerte signalee par `npm audit`.
- Risque: exploitation d'une librairie vulnerable.
- Action: mise a jour de la dependance et retest du parcours principal.
- Resultat: reduction du risque sans regression fonctionnelle constatee.

## 6. Indicateurs de suivi
- Nombre d'alertes identifiees: 4
- Nombre d'actions correctives appliquees: 4
- Nombre d'alertes ouvertes en fin de TP: 0 bloquante

## 7. Limites et actions futures
- Limite: TP court, pas de scan SAST/DAST complet.
- Action future 1: ajouter scan automatique en CI.
- Action future 2: ajouter tests de securite API (cas d'entrees malveillantes).
- Action future 3: revoir la politique de dependances avant release.

## 8. Pieces justificatives a annexer
- captures `npm audit` (avant/apres),
- extrait des regles de validation,
- captures de reponses API d'erreur,
- capture du `.env.example` et du `.gitignore`,
- lien vers commits de correction.
