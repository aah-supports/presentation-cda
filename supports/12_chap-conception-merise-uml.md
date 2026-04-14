# Conception MERISE et UML (essentiel CDA)

Ce chapitre complète la gestion de projet par la partie conception.

## 1. MERISE: distinguer MCD, MLD, MPD

### MCD (Modèle Conceptuel de Données)

Le MCD décrit les données métier, sans parler technique base de données.

Vocabulaire MCD:

- `Entité` (et non table)
- `Association` / `Relation` entre entités
- `Cardinalité`
- `Identifiant` (et non clé)
- `Attribut` / `Propriété` (et non champ)

Cardinalités à connaître:

- `0,1`
- `1,1`
- `0,n`
- `1,n`

Exemple fil rouge (films d'art et essai):

- Entité `Film`
- Entité `Réalisateur`
- Association `Réaliser`
- Cardinalité possible: un film a `1,1` réalisateur, un réalisateur a `0,n` films.

### MLD (Modèle Logique de Données)

Le MLD traduit le MCD en structure relationnelle.

Vocabulaire MLD:

- `Table`
- `Clé primaire`
- `Clé étrangère`

Règles de transformation importantes:

- Si relation de type `0,1` ou `1,1` vers `0,n` ou `1,n`:
  - la clé étrangère se place du côté `n`.
- Si relation de type `0,n`/`1,n` vers `0,n`/`1,n`:
  - créer une table associative.

### MPD (Modèle Physique de Données)

Le MPD est l'implémentation réelle en SQL.

On y trouve:

- types SQL (`VARCHAR`, `INT`, `DATE`, etc.)
- contraintes (`NOT NULL`, `UNIQUE`, `CHECK`)
- index
- scripts `CREATE TABLE`

## 2. Exemple simple MCD -> MLD -> MPD

### MCD (idée)

- `Film` (identifiant, titre, année)
- `Genre` (identifiant, libellé)
- Association `Classer` entre Film et Genre en `n,n`

### MLD (résultat)

- `film(id, titre, annee)`
- `genre(id, libelle)`
- `film_genre(film_id, genre_id)` (table associative)

### MPD (SQL)

```sql
CREATE TABLE film (
  id UUID PRIMARY KEY,
  titre VARCHAR(150) NOT NULL,
  annee SMALLINT NOT NULL
);

CREATE TABLE genre (
  id SERIAL PRIMARY KEY,
  libelle VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE film_genre (
  film_id UUID NOT NULL REFERENCES film(id),
  genre_id INT NOT NULL REFERENCES genre(id),
  PRIMARY KEY (film_id, genre_id)
);
```

## 3. UML: quand utiliser quel diagramme

### Diagramme de cas d'utilisation (Use Case)

Question à laquelle il répond: `Qui fait quoi ?`

À utiliser pour:

- identifier les acteurs
- exprimer les services rendus par le système

Termes à maîtriser:

- `<<include>>`: un cas inclut systématiquement un autre cas
- `<<extend>>`: un cas ajoute un comportement optionnel/conditionnel
- `Héritage` d'acteurs: un acteur spécialisé hérite des capacités d'un acteur générique

### Diagramme d'activité

Question: `Quel est le flux métier ?`

À utiliser pour:

- décrire enchaînements, décisions, boucles, fins de parcours

### Diagramme de séquence

Question: `Comment les composants interagissent dans le temps ?`

À utiliser pour:

- visualiser les appels entre acteur, contrôleur, service, base, etc.

## 4. Erreurs fréquentes à éviter

- Dire `table` dans un MCD.
- Dire `champ`/`clé` dans un MCD.
- Oublier les cardinalités sur les associations.
- Oublier la table associative pour un `n,n`.
- Utiliser `include` et `extend` sans justification métier.

## 5. Attendu CDA (niveau soutenance)

Le jury attend:

- un vocabulaire exact selon le niveau de modèle
- une cohérence MCD -> MLD -> MPD
- un usage pertinent des diagrammes UML selon le besoin
- des exemples concrets reliés au projet présenté
