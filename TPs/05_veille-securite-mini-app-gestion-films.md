# Veille securite - format simple CDA

## 1. Objectif

Documenter une veille securite courte mais reelle pendant le TP.

## 2. Sources conseillees

- OWASP Top 10
- npm audit
- GitHub Security Advisories
- CERT-FR

## 3. Journal de veille (a remplir)

| Date | Source | Sujet | Impact projet | Action | Preuve |
|---|---|---|---|---|---|
| [AAAA-MM-JJ] | [Source] | [Risque] | [Fort/Moyen/Faible] | [Correction] | [Capture/Commit] |

## 4. Exemple attendu

- Risque: absence de validation JSON
- Action: ajouter validations `title/director/year/genre`
- Preuve: extrait code + test `400`

## 5. Preuves a joindre

- capture npm audit
- extrait code de validation
- capture reponse API en erreur
