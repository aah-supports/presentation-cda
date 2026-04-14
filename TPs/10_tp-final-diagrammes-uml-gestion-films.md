# TP 10 - Atelier final UML (Gestion de films)

Duree conseillee: 2h30

Objectif: produire un dossier UML coherent sur le fil rouge "gestion de films".

## 1. Contexte

Vous travaillez sur une mini API de gestion de films.

User stories de reference:

- US-01: Lister les films.
- US-02: Ajouter un film.
- US-03: Associer un acteur a un film.

## 2. Production attendue

Vous devez produire 5 diagrammes UML (PlantUML):

1. Cas d'utilisation
2. Classes metier
3. Sequence (scenario US-02)
4. Activite (scenario US-03)
5. Composants (vision architecture)

Fichiers de travail:

- `TPs/uml/10_01_use-case-tp-final.puml`
- `TPs/uml/10_02_classes-tp-final.puml`
- `TPs/uml/10_03_sequence-ajouter-film-tp-final.puml`
- `TPs/uml/10_04_activite-associer-acteur-tp-final.puml`
- `TPs/uml/10_05_composants-tp-final.puml`

## 3. Methode (ordre recommande)

1. Use Case: qui fait quoi
2. Classes: quelles entites et relations
3. Sequence: comment se passe une action
4. Activite: quel flux metier
5. Composants: ou sont deployes les elements

## 4. Regles de qualite

- 1 diagramme = 1 question a laquelle il repond.
- Pas de details techniques inutiles dans le diagramme metier.
- Noms clairs et stables (Movie, Person, Casting, Genre).
- Cardinalites explicites sur les relations importantes.
- Chaque diagramme inclut un mini cartouche:
  - But
  - Hypotheses
  - Limites

## 5. Livrables

- Les 5 fichiers `.puml` completes
- 1 export image par diagramme (`.png` ou `.svg`)
- 1 courte note (10 lignes max) expliquant la coherence globale

## 6. Barème simple

- Coherence globale: 40%
- Lisibilite UML: 30%
- Couverture des user stories: 20%
- Justification des choix: 10%

## 7. Commandes utiles (optionnel)

Si PlantUML est installe en local:

```bash
plantuml TPs/uml/10_01_use-case-tp-final.puml
plantuml TPs/uml/10_02_classes-tp-final.puml
plantuml TPs/uml/10_03_sequence-ajouter-film-tp-final.puml
plantuml TPs/uml/10_04_activite-associer-acteur-tp-final.puml
plantuml TPs/uml/10_05_composants-tp-final.puml
```

## 8. Critere de reussite

- [ ] les 5 diagrammes existent
- [ ] ils sont lisibles sans commentaire oral
- [ ] ils sont coherents entre eux
- [ ] ils couvrent US-01, US-02, US-03
