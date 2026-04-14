# TP 13 - Conception MERISE & UML (Films d'art et essai)

Durée conseillée: 2h

Objectif: produire une conception cohérente du fil rouge en distinguant clairement MCD, MLD, MPD et les diagrammes UML principaux.

## 1. Contexte

Application cible: plateforme films d'art et essai pour passionnés.

Fonctions ciblées:

- consulter le catalogue
- rechercher un film
- noter/commenter
- administrer les fiches films

## 2. Livrables attendus

1. Un MCD avec vocabulaire correct.
2. Un MLD dérivé du MCD.
3. Un MPD SQL minimal.
4. Un diagramme UML de cas d'utilisation.
5. Un diagramme UML d'activité.
6. Un diagramme UML de séquence.

Fichiers de travail:

- `TPs/uml/13_01_mcd-films-art-essai.puml`
- `TPs/uml/13_02_mld-films-art-essai.puml`
- `TPs/uml/13_03_usecase-films-art-essai.puml`
- `TPs/uml/13_04_activite-poster-avis.puml`
- `TPs/uml/13_05_sequence-ajouter-film.puml`
- `TPs/uml/13_06_mpd-films-art-essai.sql`

## 3. Consignes MERISE

### MCD

- Employer `Entité`, `Association`, `Cardinalité`, `Identifiant`, `Attribut`.
- Ne pas parler de table/clé/champ.
- Expliquer au moins un exemple de cardinalité de chaque type présent (`0,1`, `1,1`, `0,n`, `1,n`).

### MLD

- Employer `Table`, `Clé primaire`, `Clé étrangère`.
- Expliquer la transformation MCD -> MLD:
  - `0,1/1,1` vers `0,n/1,n` => clé étrangère côté `n`
  - `0,n/1,n` vers `0,n/1,n` => table associative

### MPD

- Fournir le script SQL avec types + contraintes minimales.

## 4. Consignes UML

- Use Case: inclure `<<include>>`, `<<extend>>` et un exemple d'héritage d'acteur.
- Activité: montrer décisions et cas de refus.
- Séquence: montrer les interactions acteur -> API -> service -> base.

## 5. Planning recommandé (2h)

- 0h00-0h25: MCD
- 0h25-0h55: MLD
- 0h55-1h15: MPD SQL
- 1h15-1h40: UML Use Case + Activité
- 1h40-2h00: UML Séquence + vérification globale

## 6. Critères d'évaluation

- Distinction correcte MCD/MLD/MPD: 40%
- Qualité UML (choix du bon diagramme + lisibilité): 30%
- Cohérence globale (même fil rouge): 20%
- Vocabulaire exact: 10%

## 7. Référence correction

- `Corrections/tp-conception-merise-uml-films-art-essai/`
