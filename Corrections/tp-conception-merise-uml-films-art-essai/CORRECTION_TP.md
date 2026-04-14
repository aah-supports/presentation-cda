# Correction TP 13 - Notes de correction

## 1. Cohérence globale retenue

- Fil rouge: application de films d'art et essai.
- Domaine retenu: `Film`, `Realisateur`, `Genre`, `Utilisateur`, `Avis`.
- Logique MERISE: MCD (metier) -> MLD (relationnel) -> MPD (SQL).
- Logique UML: Use Case (qui fait quoi), Activite (flux), Sequence (interactions).

## 2. Vérifications attendues

### MCD

- Vocabulaire correct: entite, association, cardinalite, identifiant, attribut.
- Cardinalites explicites sur toutes les associations.
- Aucune notion technique de table/cle/SQL.

### MLD

- Tables et cles coherentes avec le MCD.
- Cle etrangere `id_realisateur` dans `film` (relation 1,n).
- Table associative `film_genre` pour la relation n,n.

### MPD

- Types SQL plausibles (`UUID`, `VARCHAR`, `SMALLINT`, `TEXT`).
- Contraintes minimales (`NOT NULL`, `CHECK`, `UNIQUE`, PK/FK).

### UML Use Case

- Acteurs corrects et heritage visible.
- Presence de `<<include>>` et `<<extend>>` justifiee.

### UML Activité

- Branches de validation et de refus explicites.
- Sorties lisibles (201, 401, 422).

### UML Séquence

- Chaine complete acteur -> controller -> service -> repository -> DB.
- Cas nominal + au moins une erreur metier.

## 3. Erreurs fréquentes à corriger

- MCD ecrit avec vocabulaire SQL (table, cle, champ).
- Oubli de cardinalites.
- Oubli de table associative pour n,n.
- `<<extend>>` utilise sans scenario optionnel clair.
- Sequence sans retour HTTP final.

## 4. Barème conseillé

- Distinction MCD/MLD/MPD: 40%
- Qualite UML et lisibilite: 30%
- Coherence inter-livrables: 20%
- Justification des choix: 10%
